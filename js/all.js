var new_tab_editor = function(){
    "use strict";
    return {
        PREFIX:'newtabeditor',
        file_id: null,
        editor: null,
        info: document.getElementById('info'),
        files : [],
        loadFiles: function(){
            // get all files
            chrome.storage.sync.get(null, function(items) {
                new_tab_editor.files = items;
                var temp = Object.keys(items);
                temp = temp.reduce(function (sum, item){
                    if (item.indexOf(new_tab_editor.PREFIX)!==0){
                        return sum;
                    }
                    var name = items[item].name || 'empty name'
                    sum.files.push(
                        {
                            id: item, 
                            name: name, 
                            class: items[item].name==new_tab_editor.file_id?'active':''
                        });
                    return sum;
                }, {files: []});
                var rendered = Mustache.render(document.getElementById('template').innerHTML, temp);
                document.getElementById('files').innerHTML = rendered;
                var filesButtons = document.querySelectorAll('.file')
                filesButtons.forEach(function(item){
                    if (!item.onclick){
                        item.onclick = new_tab_editor.loadFile;
                        item.ondblclick = new_tab_editor.renameFile;
                    }
                });
                var closeButtons = document.querySelectorAll('.close')
                closeButtons.forEach(function(item){
                    item.onclick = new_tab_editor.deleteFile;
                });
            });
        },
        init: function(){
            new_tab_editor.editor = CodeMirror.fromTextArea(
                document.getElementById("editor"), {
                    lineNumbers: true
                });
            new_tab_editor.loadFiles()
        },
        newFile: function(text){
            var new_file_name = new_tab_editor.prefix+(+ new Date()).toString();
//            chrome.storage.sync.set(new_file_name
        },
        saveFile: function(){
            console.log('saved')
            try {
                var i = {};
                i[new_tab_editor.file_id] = {'name': '', 'value': editor.getValue()};
                chrome.storage.sync.set(i);
            } catch (err) {
               alert(err.message);
            }
        },
        timeout_id: null,
        keyup: function(){
            if (timeout_id != -1) {
                clearTimeout(new_tab_editor.timeout_id)
            }
            info.innerHTML = 'Length: '+editor.getValue().length;
            timeout_id = setTimeout(new_tab_editor.saveFile, 3000);
        },
        loadFile: function(item){
            item = item.srcElement.parentElement 
            var oldDoc = document.getElementById(new_tab_editor.file_id)
            if (oldDoc)
                oldDoc.classList.toggle('active')
            new_tab_editor.file_id = item.id
            chrome.storage.sync.get(new_tab_editor.file_id, function(i) {
                console.log(i)
                new_tab_editor.editor.setValue(i[new_tab_editor.file_id].value);
                new_tab_editor.editor.on("keyup", new_tab_editor.keyup);
            });
            item.classList.toggle('active')
        },
        deleteFile: function(item){
            console.log('deleting file')
        },
        renameFile: function(item){
            console.log('renaming file')
        }
    };
}();
window.onload = function() {
    new_tab_editor.init()
};


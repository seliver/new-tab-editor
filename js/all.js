window.onload = function() {
    var d = document.getElementById("editor"),
        info = document.getElementById('info'),
        editor = CodeMirror.fromTextArea(d, {
            lineNumbers: true
        }),
        filename = (+ new Date()).toString(),
        keyup = function(){
            info.innerHTML = 'Length: '+editor.getValue().length;
            try {
                var i = {};
                i[filename] = editor.getValue();
                chrome.storage.sync.set(i);
            } catch (err) {
               alert(err.message);
            }
        },
        loadFile = function(item){
            item = item.srcElement.parentElement
            console.log(item.dataset.filename)
            //TODO
        };
    keyup();
    chrome.storage.sync.get(filename, function(item) {
        editor.setValue(item[filename]);
        editor.on("keyup", keyup);
    });
    // get all files
    chrome.storage.sync.get(null, function(items) {
        var files = Object.keys(items);
        files = files.reduce(function (sum, item){
            sum.files.push({name: item, class: item==filename?'active':''});
            return sum;
        }, {files: []});
        var rendered = Mustache.render(document.getElementById('template').innerHTML, files);
        document.getElementById('files').innerHTML = rendered;
        var filesButtons = document.querySelectorAll('.file')
        filesButtons.forEach(function(item){
            if (!item.onclick)
                item.onclick = loadFile;
        });
    });
};


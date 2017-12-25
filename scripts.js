window.onload = function() {
    var d = document.getElementById("editor");
    var info = document.getElementById('info');
    var editor = CodeMirror.fromTextArea(d, {
        lineNumbers: true
    });
    var setLength = function(){
        info.innerHTML = 'Length: '+editor.getValue().length;
    };
    setLength();
    editor.on("keyup", setLength);
};


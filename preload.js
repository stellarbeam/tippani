const DarkReader = require('darkreader');
const {ipcRenderer} = require('electron');

var enabled = false;

function toggleMode() {

    if (!enabled) {
        DarkReader.enable();
    }
    else {
        DarkReader.disable();
    }
    enabled = !enabled;

}

window.document.addEventListener('DOMContentLoaded', async function () {
    DarkReader.enable();
    enabled = true;
});

ipcRenderer.on('toggle-dark-mode', toggleMode);



// ._505P6 ._2E922 => link tooltip bgcolor  #222
// ._2w5aE         => link tooltip txtcolor #bbb
// 
// ._27QmJ         => link creator txtcolor #bbb

// DarkReader invert
// ._2Q2je._2o-GV
// en-note > div.para
// .MinimalFormFrame-evernote-logo svg
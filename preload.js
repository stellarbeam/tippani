const DarkReader = require('darkreader');
const { ipcRenderer } = require('electron');
const arrive = require('arrive');
const fs = require('fs');

var enabled = false;
var css;
fs.readFile(`${__dirname}/styles/dark.css`, (err, readCss) => {
    if (err) {
        css = "";
        console.log("An error occured while trying to read CSS file.")
    }
    else {
        css = readCss;
    }
})

function toggleMode() {
    enabled ? DarkReader.disable() : DarkReader.enable();
    enabled = !enabled;
}

window.document.addEventListener('DOMContentLoaded', function () {
    DarkReader.setFetchMethod(window.fetch)
    DarkReader.enable();
    enabled = true;

    document.body.arrive("._2Y-P2XDvuz98aNMAhhYNJM", { onceOnly: true }, function (container) {
        this.arrive("iframe", function () {
            this.style.visibility = "hidden";
            this.addEventListener("load", function () {
                const style = document.createElement('style');
                style.textContent = css;
                this.contentDocument.head.append(style);
                this.style.visibility = "visible";
            })
        })
    })
});

ipcRenderer.on('toggle-dark-mode', toggleMode);



// DarkReader invert
// ._2Q2je._2o-GV
// en-note > div.para
// .MinimalFormFrame-evernote-logo svg

// setTimeout( function() {
// 	document.querySelector("#qa-NOTE_DETAIL_ACTIONS").parentElement.click()
// 	document.querySelector("#qa-ACTION_DELETE").click()
// 	// document.querySelector("#qa-DELETE_CONFIRM_DIALOG_SUBMIT").focus()
// }, 3000)
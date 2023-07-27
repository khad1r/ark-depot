const fetch = require("node-fetch");

const
    dropArea = document.querySelector(".drag-area"),
    filePicker = dropArea.querySelector("#file"),
    dragText = dropArea.querySelector(".drag-area-header"),
    exportSelect = document.querySelector("#export-select"),
    exportText = document.querySelector("#export-text"),
    exportCopy = document.querySelector("#export-copy"),
    loading = document.querySelector(".loading")
let FILES
filePicker.addEventListener("change", function () {
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    FILES = this.files;
    dropArea.classList.add("active");
    loadFile(); //calling function
});

//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.remove("active");
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    FILES = event.dataTransfer.files;
    loadFile(); //calling function
});


async function loadFile() {
    try {
        dropArea.parentNode.style.display = 'none';
        toggleLoader();
        for (const file of FILES)
            if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type))
                throw 'Selected File Include Non Image file'
        const data = importFromImage(FILES)
        console.log(data)
        // if (PDFJS_NEEDED) {
        //     const res = await load_script('/script/pdf.js', '/script/pdf.worker.js');
        //     if (res instanceof Error) {
        //         console.log(res);
        //         return;
        //     }
        //     PDFJS_NEEDED = false;
        // }
        // const res = await loadPDF(FILES);
        toggleLoader();
    } catch (e) {
        alert(e);
    } finally {
        // PAGES.forEach(page => {
        //     OVERALL_PAGES['overalPrice'] += page['price'];
        // })

    }

}

const toggleLoader = (() => {
    let loaderState = true;

    function toggle() {
        loading.style.display = (loaderState) ? "" : "none";
        loaderState = !loaderState
    }
    return toggle;
})();

exportCopy.addEventListener("click", () => {

    const range = document.createRange();
    range.selectNodeContents(exportText);

    // Create a selection object and add the range to it
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // Execute the copy command
    document.execCommand("copy");

    // Deselect the text after copying
    selection.removeAllRanges();
    alert('Copied To Clipboard');
})

exportSelect.addEventListener("change", () => {
    exportSelect.value
    switch (exportSelect.value) {
        case '0':
            exportPenguin()
            break;
        case '1':
            exportGamepress()
            break;

    }
})
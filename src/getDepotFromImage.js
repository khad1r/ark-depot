// Require necessary modules
const { DeportRecognizer, toSimpleTrustedResult } = require("@arkntools/depot-recognition");
const fetch = require("node-fetch");
const itemsJson = require("./items.json");
const { URL } = require("url");

function getSortId(id, items) {
    return items[id].orderId;
}

async function getMaterialsFromImage(fileList) {
    const items = itemsJson;
    const order = Object.keys(items).filter((id) => getSortId(id, items)).sort((a, b) => getSortId(a, items) - getSortId(b, items));
    const pkg = await fetch('items.zip').then((res) => res.arrayBuffer());
    const dr = new DeportRecognizer({ order, pkg });
    const result = [];
    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const url = URL.createObjectURL(file);
        const data = (await dr.recognize(url)).data;
        const simpleData = toSimpleTrustedResult(data);
        result.push(simpleData);
        URL.revokeObjectURL(url);
    }
    return result;
}

module.exports = getMaterialsFromImage;

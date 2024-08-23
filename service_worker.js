chrome.contextMenus.create({"title": "Hex Decode", "contexts":["selection"],"id":"hexDecode"});
chrome.contextMenus.onClicked.addListener(decodeHandler);


function decodeHandler(info, tab) {
    try {
        var decoded_text = decodeHex(info.selectionText.replace(/\s/gm, ''));
        chrome.tabs.create({ url: decoded_text });
    } catch (e) {
        chrome.tabs.sendMessage(tab.id, {action:"alert",text:"invalid hex string"});
    }
}

function decodeHex(input) {
    var hex = input.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}


var savedPages = [];
var tabToUrl = {};
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Note: this event is fired twice:
    // Once with `changeInfo.status` = "loading" and another time with "complete"
    tabToUrl[tabId] = tab.url;
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    parseUrlUpdateDisplay(tabToUrl[tabId]);

    // Remove information for non-existent tab
    delete tabToUrl[tabId];
    // chrome.tabs.query({'url': 'http://www.sefaria.org/*'}, function(tabs){         
    //     // updateTitles(tabs);   
    //     for (var i = 0; i < tabs.length; i++) {
    //         console.log(tabs[i]);
    //     };
             
    // }); 
});



function parseUrlUpdateDisplay(url) {
    if(url.indexOf("sefaria.org") < 0) {
        return 0;
    }
    if (/\d/.test(url) == false) {
        return 0;
    }
    var update = {};
    var seferExists = false;
    var path = url;
    var torahData = path.substr(path.indexOf('g') + 2, path.indexOf('?'));
    var sefer = torahData.substr(0, torahData.indexOf('.'));
    var perek = torahData.substr(torahData.indexOf('.') + 1, torahData.indexOf('?') - torahData.indexOf('.') - 1);
    for (var i = 0; i < savedPages.length; i++) {
        if(savedPages[i]['sefer'] == sefer) {
            seferExists = true;
            break;
        }
    }
    if (seferExists) {
        savedPages[i]['perek'] = perek;
        savedPages[i]['url'] = url;
    } else {
        // alert(savedPages.length);
        update['id'] = savedPages.length;
        update['sefer'] = sefer;
        update['perek'] = perek;
        update['url'] = url;
        savedPages.push(update);
    }
    console.log(savedPages);
}


document.addEventListener('DOMContentLoaded', function () {
    var background = chrome.extension.getBackgroundPage();
    var savedPages = background.savedPages;

    var bodySize = 300;
    
    var leftList = document.getElementById('left-list');
    var rightList = document.getElementById('right-list');
    // var list = document.getElementById('list');
    document.body.setAttribute('width', bodySize);
    for (var i = 0; i < savedPages.length; i++) {
        var image = document.createElement('img');
        image.setAttribute('src', 'delete.png');
        image.setAttribute('class', 'sefaria-delete');
        var li = document.createElement('li');
        newlink = document.createElement('a');
        newlink.innerHTML = savedPages[i].sefer.replace("_", " ") + " - " + savedPages[i].perek;// + " | " + savedPages[i].id;
        newlink.setAttribute('href', savedPages[i].url);
        newlink.setAttribute('class', 'sefaria-button');
        li.appendChild(newlink)
        // newButton = document.createElement('button');
        // newButton.innerHTML = 'delete';
        // newButton.setAttribute('id', i.toString());
        // newButton.setAttribute('class', 'sefaria-delete');
        // li.appendChild(newButton);
        image.setAttribute('id', i + "del");
        li.appendChild(image);
        if (i % 2 == 0) {
            leftList.appendChild(li);
        } else {
            rightList.appendChild(li);
        }
        // list.appendChild(li);
    };
    // var bc = document.body.getElementsByClassName('sefariabutton');//.onclick = deletePage(savedPages, this.id);
    // bc.addEventListener('click', function() {
    //     alert('other');
    // });
    $('.sefaria-delete').click(function(){
        deletePage(savedPages, parseInt($(this).attr('id')));
    });
});



$(document).ready(function(){
    // alert('loaded');
    var background = chrome.extension.getBackgroundPage();
    var savedPages = background.savedPages;
    $('body').on('click', 'a', function(){
        chrome.tabs.create({url: $(this).attr('href')});
        return false;
    });
    // $('.sefariabutton').click(function(){
        // chrome.tabs.create({url: $(this).attr('href')});
        // alert('other');
        // return false;
    // });
    // document.body.getElementsByClassName('sefariabutton').onclick = deletePage(savedPages, this.id);
});

function deletePage(dict, pageId) {
    // alert('delete');
    // alert(pageId);
    dict.splice(pageId, 1);
    for (var i = pageId; i < dict.length; i++) {
        dict[i]['id'] = i;
    }
    // console.log(dict);
    window.location.reload();
}
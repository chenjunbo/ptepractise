var fireflyasqcontent;

function fireFlyASQInit() {
    $.get(getGitContentPre()+"/data/asq/fireflyasq.txt"+getGitContentAccess(), function (response) {
        fireflyasqcontent=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
    })
}

function currentFireflyASQcontent() {
    return fireflyasqcontent;
}
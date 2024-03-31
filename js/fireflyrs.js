var fireflyrscontent;
function fireFlyRSInit() {
    $.get(getGitContentPre()+"/data/rs/fireflyrs.txt"+getGitContentAccess(), function (response) {
        fireflyrscontent=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
    })
}

function currentFireflyRScontent() {
    return fireflyrscontent;
}
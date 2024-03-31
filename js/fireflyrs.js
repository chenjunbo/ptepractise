var fireflyrscontent;
function fireFlyRSInit() {
    $.get(getGitContentPre()+"/data/rs/fireflyrs.txt"+getGitContentAccess(), function (response) {
        try {
            fireflyrscontent = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        } catch (e){
            fireflyrscontent = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
        }

        // fireflyrscontent=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
    })
}

function currentFireflyRScontent() {
    return fireflyrscontent;
}
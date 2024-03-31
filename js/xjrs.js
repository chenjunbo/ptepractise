var xjrsweekconten,xjrsmonthconten,xjrsallconten,xjrsallcontendesc;
function xjrsInit() {
    $.get(getGitContentPre()+"/data/rs/xjrsweek.txt"+getGitContentAccess(), function (response) {

        try {
            xjrsweekconten = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        } catch (e){
            xjrsweekconten = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
        }
        // xjrsweekconten=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
    })
    $.get(getGitContentPre()+"/data/rs/xjrsmonth.txt"+getGitContentAccess(), function (response) {
        try {
            xjrsmonthconten = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        } catch (e){
            xjrsmonthconten = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
        }
        // xjrsmonthconten=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
    })
    $.get(getGitContentPre()+"/data/rs/xjrsall.txt"+getGitContentAccess(), function (response) {
        try {
            xjrsallconten = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        } catch (e){
            xjrsallconten = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
        }
        // xjrsallconten=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
    })
    $.get(getGitContentPre()+"/data/rs/xjrsalldesc.txt"+getGitContentAccess(), function (response) {
        try {
            xjrsallcontendesc = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        } catch (e){
            xjrsallcontendesc = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
        }
        // xjrsallcontendesc=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
    })
}

function currentxjrsweekconten() {
    return xjrsweekconten;
}
function currentxjrsmonthconten() {
    return xjrsmonthconten;
}

function currentxjrsallcontent() {
    return xjrsallconten;
}
function currentxjrsallcontentdesc() {
    return xjrsallcontendesc;
}
var xjrsweekconten,xjrsmonthconten,xjrsallconten,xjrsallcontendesc;
function xjrsInit() {
    $.get("https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/rs/xjrsweek.txt?access_token=c87299575627265144b7db286d3bf673", function (response) {
        xjrsweekconten=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
    })
    $.get("https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/rs/xjrsmonth.txt?access_token=c87299575627265144b7db286d3bf673", function (response) {
        xjrsmonthconten=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
    })
    $.get("https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/rs/xjrsall.txt?access_token=c87299575627265144b7db286d3bf673", function (response) {
        xjrsallconten=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
    })
    $.get("https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/rs/xjrsalldesc.txt?access_token=c87299575627265144b7db286d3bf673", function (response) {
        xjrsallcontendesc=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
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
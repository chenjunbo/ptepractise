var fireflyrscontent;
function fireFlySSTInit() {
    $.get("https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/fireflyrs.txt?access_token=c87299575627265144b7db286d3bf673", function (response) {
        fireflyrscontent=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
    })
}

function currentFireflyRScontent() {
    return fireflyrscontent;
}
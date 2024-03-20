var fireflyasqcontent;

function fireFlyASQInit() {
    $.get("https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/asq/fireflyasq.txt?access_token=c87299575627265144b7db286d3bf673", function (response) {
        fireflyasqcontent=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
    })
}

function currentFireflyASQcontent() {
    return fireflyasqcontent;
}
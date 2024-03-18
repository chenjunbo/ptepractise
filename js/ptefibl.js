var xjfiblweekList, xjfiblMonthList, fireflygfiblList;
function ptefiblInit() {
    $.get("https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/fireflyfibl.txt?access_token=c87299575627265144b7db286d3bf673", function (response) {
        var result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        fireflygfiblList= JSON.parse(result);
    })
    $.get("https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/xjfiblweekdata.txt?access_token=c87299575627265144b7db286d3bf673", function (response) {
        var result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        xjfiblweekList= JSON.parse(result);
    })

    $.get("https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/xjfiblmonthdata.txt?access_token=c87299575627265144b7db286d3bf673", function (response) {
        var result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        xjfiblMonthList= JSON.parse(result);
    })




}

function currentFireflyfiblList(){
    return fireflygfiblList;
}

function currentxjweekFibLList(){
    return xjfiblweekList;
}

function currentxjmonthFibLList(){
    return xjfiblMonthList;
}
function createFireFlySSTPdfHtml(serNum, fiblData) {
    var num = fiblData.num;
    var name = fiblData.name;
    var questionDiv = document.createElement("div");
    $(questionDiv).attr("style", "padding-left: 20px;padding-right: 20px;line-height: 30px;font-size: larger");
    var h3 = document.createElement("h3");
    h3.innerHTML = serNum + "." + "&nbsp;" + "&nbsp;" + name + "&nbsp;" + "&nbsp;题号:" + num + "<br/>" ;
    $(questionDiv).append(h3);
    var text =fiblData.text;
    text = text + "<br/>"+ "<br/>";
    $(questionDiv).append(text);
    return questionDiv;
}

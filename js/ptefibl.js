var xjfiblweekList, xjfiblMonthList, fireflygfiblList;
function ptefiblInit() {
    $.get(getGitContentPre()+"/data/fibl/fireflyfibl.txt"+getGitContentAccess(), function (response) {
        var result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        fireflygfiblList= JSON.parse(result);
    })
    $.get(getGitContentPre()+"/data/fibl/xjfiblweekdata.txt"+getGitContentAccess(), function (response) {
        var result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        xjfiblweekList= JSON.parse(result);
    })

    $.get(getGitContentPre()+"/data/fibl/xjfiblmonthdata.txt"+getGitContentAccess(), function (response) {
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
function createpteFilbPdf(serNum, fiblData) {
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

var xjasqCurrentList;
let xjasqCnList, xjasqIdsList, xjasqunCompletedList;
var xjasqIdsSet = new Set();
const xjasqCnMap = new Map();
var xjasqIndex = 0;//当前第几条
var localStorageType = "xjasq";//类型key
var FavlocalStorageType = "xjqsqblue";//收藏夹类型key


function xjAsqInit() {
    $.get(getGitContentPre()+"/data/asq/xjasqall.txt"+getGitContentAccess(), function (response) {
        //xjasqCnList = JSON.parse(response);
        // xjasqCnList = response;
        var result
        try {
            result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        } catch (e){
            result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
        }

        xjasqCnList = JSON.parse(result);
        for (let i = 0; i < xjasqCnList.length; i++) {
            var xjasqData = xjasqCnList[i];
            xjasqCnMap.set(xjasqData.num, xjasqData);
            xjasqIdsSet.add(xjasqData.num);
        }
    })
}

function XjAsqCurrentTypedata(param) {
    var qNum = param.qNum;//题号
    var type = param.type;//类型
    var filePath;
    xjasqIndex = 0;
    xjasqCurrentList = new Array();
    switch (type) {
        case "5":
            //自定义数据
            filePath = getGitContentPre()+"/questions/asq/xjasqweek.txt"+getGitContentAccess()
            break;
        case "6":
            //自定义数据
            filePath = getGitContentPre()+"/questions/asq/xjxjasqmonth.txt"+getGitContentAccess()
            break;
        case "10":
            xjasqCurrentList=xjasqCnList;
            break;
    }
    //当前数据
    if (filePath) {
        $.ajaxSettings.async = false;
        let qNums;
        $.get(filePath, function (response) {
            try {
                qNums = decodeURIComponent(escape(window.atob(response.content))).split(/[(\r\n)\r\n]+/); // 根据换行或者回车进行识别
            }catch (e) {
                qNums = response.split(/[(\r\n)\r\n]+/);
            }
            qNums.forEach((item, xjasqIndex) => { // 删除空项
                if (qNum && qNum != item) {

                } else {
                    if (!item) {
                        qNums.splice(xjasqIndex, 1);
                    } else {
                            var xjasqData = xjasqCnMap.get(parseInt(item));
                            if (xjasqData) {
                                xjasqCurrentList.push(xjasqData);
                            }
                    }
                }
            })

        });
        $.ajaxSettings.async = true;
    }
    console.log(xjasqCurrentList.length);
    return xjasqCurrentList[0];
}

function currentXjAsqList() {
    return xjasqCurrentList;
}

function createXjAsqPdfHtml(serNum, xjasqdata) {
    var questionDiv = document.createElement("div");
    $(questionDiv).attr("style", "padding-left: 20px;padding-right: 20px;line-height: 30px;font-size: large;width:90%;");
    var answerInText = "";
        var contents = xjasqdata.contents;
        if (contents && contents.length > 0) {
            answerInText = answerInText + "<br/>" + "<br/>" + "<br/>" + "翻译:" + "<br/>"
            contents.forEach((eachContent, index) => {
                var type = eachContent.type;
                if (type == "option" || type == "caption"|| type == "break") {

                } else {
                    var content = eachContent.content;
                    answerInText = answerInText + "<br/>" + content + "<br/>";
                }
            });
        }

    $(questionDiv).innerHTML(answerInText);
    $(questionDiv).append("<br/>");
    return questionDiv;
}
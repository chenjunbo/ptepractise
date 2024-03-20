let fireFlyWFDList, fireFlyWFDCurrentList,categoryIdDataList;
const fireFlyWFDMap = new Map();
const firecategoryWFDMap = new Map();
var fireFlyWFDIndex = 0;//当前第几条
var isFullContent = true;

function fireFlyWFDInit() {
    $.get("https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/wfd/fireflywfd.txt?access_token=c87299575627265144b7db286d3bf673", function (response) {
        var result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        fireFlyWFDList = JSON.parse(result);
        for (let i = 0; i < fireFlyWFDList.length; i++) {
            var fireFlyWFDData = fireFlyWFDList[i];
            fireFlyWFDMap.set(fireFlyWFDData.qNum + "", fireFlyWFDData);
        }
    })
    $.get("https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/wfd/wfdcategoryid.txt?access_token=c87299575627265144b7db286d3bf673", function (response) {
        var result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        categoryIdDataList = JSON.parse(result);
        for (let i = 0; i < categoryIdDataList.length; i++) {
            var fireFlyWFDData = fireFlyWFDList[i];
            console.log(fireFlyWFDData);
        }
    })
}

function fireFlyGetWFDdata(param) {
    var qNum = param.qNum;//题号
    var type = param.type;//类型
    var localstoragedata;
    fireFlyWFDIndex = 0;
    fireFlyWFDCurrentList = new Array();
    switch (type) {
        case "1":
            if (qNum) {
                fireFlyWFDCurrentList.push(fireFlyWFDMap.get(qNum + ""));
                return fireFlyWFDCurrentList[0];
            }
            fireFlyWFDCurrentList = fireFlyWFDList;
            break;
        case "2":
            var content = getFromLocalStorage("fireflywfd");
            if (content) {
                var json = JSON.parse(content);
                localstoragedata = json.nums;
            }
            break;
    }

    if (localstoragedata) {
        //如果有数据
        localstoragedata.forEach(function (item) {
            if (qNum && qNum != item) {

            } else {
                if (!item) {
                    localstoragedata.splice(index, 1);
                } else {
                    var fibrwData = fireFlyWFDMap.get(item+"");
                    if (fibrwData) {
                        fireFlyWFDCurrentList.push(fibrwData);
                    }
                }
            }
        });
        return fireFlyWFDCurrentList[0];
    }

    return fireFlyWFDCurrentList[fireFlyWFDIndex];
}


function fireFlyWFDTranslateData(fireFlyWFDData) {
    var num = fireFlyWFDData.qNum;
    var text = fireFlyWFDData.en;
    var cn = fireFlyWFDData.cn;
    var title = "<div class=\"layui-form-item\"><label class=\"layui-form-label\" style=\"white-space:nowrap\">第" + (fireFlyWFDIndex + 1) + "题/共" + (fireFlyWFDCurrentList.length) + "题, 题号:" + num + "</label></div>"
    var lastIndex = text.lastIndexOf(".");
    if (lastIndex != -1) {
        text = text.substring(0, lastIndex);
    }
    var allWords = text.split(" ");
    var parent = $("<div class=\"layui-inline\" > </div>");
    for (var idx in allWords) {
        var word = allWords[idx];
        word = word.replace(" ", "");
        word = word.replace(",", "");
        var firstLetter = word.substring(0, 1);
        var otherLetters = word.substring(1);
        var parentin = $("<div class=\"layui-input-inline\"  > </div>");
        // var firstplace = document.createElement("input");
        // $(firstplace).attr("class", "layui-input");
        // $(firstplace).attr("value",firstLetter.toUpperCase());
        var firstplace = document.createElement("div");
        $(firstplace).attr("class", "layui-input-inline");
        $(firstplace).attr("style", "padding-left: 10px; color:red;");
        $(firstplace).html(firstLetter.toUpperCase());
        parent.append(firstplace);
        var input = document.createElement("input");

        $(input).attr("type", "text");
        $(input).attr("autocomplete", "off");
        $(input).attr("lay-verify", "required|answer");
        $(input).attr("class", "layui-input");
        $(input).attr("style", "width: 100px");
        //完整内容
        $(input).attr("realanswer", word)
        //首字母
        $(input).attr("realanswerunfull", otherLetters);
        $(input).attr("name", "answerinputs")
        $(input).attr("id", "answerblank" + idx)
        $(input).attr("oninput", "resetwrongcolor(event)")
        parentin.append(input);
        parent.append(parentin);

    }
    text = $(parent).html();
    var chinese = "<div class=\"layui-form-item\"><label class=\"layui-form-label\" style=\"white-space:nowrap\">" + cn + "</label></div>"
    return title + text + chinese;
}

function fireFlyWFDNextQuest() {
    if (fireFlyWFDIndex < fireFlyWFDCurrentList.length - 1) {
        fireFlyWFDIndex++;
    }
    return fireFlyWFDCurrentList[fireFlyWFDIndex];
}

function fireFlyWFDPreQuest() {
    if (fireFlyWFDIndex > 0) {
        fireFlyWFDIndex--;
    }
    return fireFlyWFDCurrentList[fireFlyWFDIndex];
}

function isFireFlyWFDFirst() {
    return fireFlyWFDIndex == 0;
}

function isFireFlyWFDLast() {
    return fireFlyWFDIndex == fireFlyWFDCurrentList.length - 1;
}

function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}

function getFireFlyWFDIndex() {
    return fireFlyWFDIndex;
}

function getFireFlyWFDTotalNum() {
    return fireFlyWFDCurrentList.length;
}

function setFireFlyWFDIndex(qindex) {
    fireFlyWFDIndex = qindex - 1;
}

function currentFireFlyWFDData() {
    return fireFlyWFDCurrentList[fireFlyWFDIndex];
}


function setNeedFirstLetter() {
    isFullContent = !isFullContent;
}

function isNeedFirstLetter() {
    return isFullContent;
}
let fireFlyList, fireFlyCurrentList;
const fireFlyMap = new Map();
var fireFlyIndex = 0;//当前第几条
var isFullContent = true;

function fireFlyInit() {
    $.get("https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/wfd/fireflywfd.txt?access_token=c87299575627265144b7db286d3bf673", function (response) {
        var result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        fireFlyList = JSON.parse(result);
        for (let i = 0; i < fireFlyList.length; i++) {
            var fireFlyData = fireFlyList[i];
            fireFlyMap.set(fireFlyData.qNum + "", fireFlyData);
        }
    })
}

function fireFlyGetdata(param) {
    var qNum = param.qNum;//题号
    var type = param.type;//类型
    var localstoragedata;
    fireFlyIndex = 0;
    fireFlyCurrentList = new Array();
    switch (type) {
        case "1":
            if (qNum) {
                fireFlyCurrentList.push(fireFlyMap.get(qNum + ""));
                return fireFlyCurrentList[0];
            }
            fireFlyCurrentList = fireFlyList;
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
                    var fibrwData = fireFlyMap.get(item+"");
                    if (fibrwData) {
                        fireFlyCurrentList.push(fibrwData);
                    }
                }
            }
        });
        return fireFlyCurrentList[0];
    }

    return fireFlyCurrentList[fireFlyIndex];
}


function fireFlyTranslateData(fireFlyData) {
    var num = fireFlyData.qNum;
    var text = fireFlyData.en;
    var cn = fireFlyData.cn;
    var title = "<div class=\"layui-form-item\"><label class=\"layui-form-label\" style=\"white-space:nowrap\">第" + (fireFlyIndex + 1) + "题/共" + (fireFlyCurrentList.length) + "题, 题号:" + num + "</label></div>"
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

function fireFlyNextQuest() {
    if (fireFlyIndex < fireFlyCurrentList.length - 1) {
        fireFlyIndex++;
    }
    return fireFlyCurrentList[fireFlyIndex];
}

function fireFlyPreQuest() {
    if (fireFlyIndex > 0) {
        fireFlyIndex--;
    }
    return fireFlyCurrentList[fireFlyIndex];
}

function isFireFlyFirst() {
    return fireFlyIndex == 0;
}

function isFireFlyLast() {
    return fireFlyIndex == fireFlyCurrentList.length - 1;
}

function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}

function getFireFlyIndex() {
    return fireFlyIndex;
}

function getFireFlyTotalNum() {
    return fireFlyCurrentList.length;
}

function setFireFlyIndex(qindex) {
    fireFlyIndex = qindex - 1;
}

function currentFireFlyData() {
    return fireFlyCurrentList[fireFlyIndex];
}


function setNeedFirstLetter() {
    isFullContent = !isFullContent;
}

function isNeedFirstLetter() {
    return isFullContent;
}
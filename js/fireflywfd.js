let fireFlyWFDList, fireFlyWFDCurrentList, categoryIdDataList, allQnums,allmp3listaddress;
const fireFlyWFDMap = new Map();
var fireFlyWFDIndex = 0;//当前第几条
var isFullContent = true;
var localStorageType = "fireflywfd";
var plaintxt;

function fireFlyWFDInit(form) {
    $.get(getGitContentPre() + "/data/wfd/fireflywfd.txt" + getGitContentAccess(), function (response) {
        var result
        try {
            result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        } catch (e) {
            result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
        }
        allQnums = new Array();
        allmp3listaddress = new Array();
        fireFlyWFDList = JSON.parse(result);
        for (let i = 0; i < fireFlyWFDList.length; i++) {
            var fireFlyWFDData = fireFlyWFDList[i];
            fireFlyWFDMap.set(fireFlyWFDData.qNum + "", fireFlyWFDData);
            allQnums.push(fireFlyWFDData.qNum + "");//保存所有id
            allmp3listaddress.push(getRawPre() + "/mp3/wfd/" + fireFlyWFDData.qNum + ".mp3");
        }
    })
    if (form) {
        $.get(getGitContentPre() + "/data/wfd/wfdcategoryid.txt" + getGitContentAccess(), function (response) {
            var result
            try {
                result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
            } catch (e) {
                result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
            }

            categoryIdDataList = JSON.parse(result);
            for (key in categoryIdDataList) {
                //分类名称,根据名称添加分类
                var option = "<option value=\"" + key + "\">" + key + "</option>";
                $("#typeselection").append(option);
            }
            form.render();
        });
    }
    $.get(getGitContentPre() + "/data/wfd/yhcwfdplaintxt.txt" + getGitContentAccess(), function (response) {
        try {
            plaintxt = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        } catch (e) {
            plaintxt = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
        }
        // plaintxt = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
    })
}

function fireFlyGetWFDdata(param) {
    var qNum = param.qNum;//题号
    var type = param.type;//类型
    var onlyundo = param.onlyundo;//仅未做
    var localstoragedata;
    fireFlyWFDIndex = 0;
    fireFlyWFDCurrentList = new Array();
    switch (type) {
        case "1":
            if (qNum) {
                fireFlyWFDCurrentList.push(fireFlyWFDMap.get(qNum + ""));
                return fireFlyWFDCurrentList[0];
            }
            if (onlyundo) {
                allQnums.forEach((item) => {
                    var rightLocal = getFromLocalStorage(item + "right" + localStorageType);
                    var faltlocal = getFromLocalStorage(item + "falt" + localStorageType);
                    if (rightLocal || faltlocal) {
                        //已经做了,不处理
                    } else {
                        fireFlyWFDCurrentList.push(fireFlyWFDMap.get(item + ""));
                        return fireFlyWFDCurrentList[0];
                    }
                })

            } else {
                fireFlyWFDCurrentList = fireFlyWFDList;
            }
            break;
        case "2":
            var content = getFromLocalStorage(localStorageType);
            if (content) {
                var json = JSON.parse(content);
                localstoragedata = json.nums;
            }
            break;
        case "9":
            var faltIds = getAllQuestionNumFromLocalStorageByFalt(localStorageType);
            if (faltIds) {
                faltIds.forEach((qNum, index) => {
                    fireFlyWFDCurrentList.push(fireFlyWFDMap.get(qNum + ""));
                })
            }

            break;
        default:
            //按照分类来获取数据
            var wfdIds = categoryIdDataList[type];
            if (wfdIds) {
                wfdIds.forEach(function (num) {
                    if (num) {
                        fireFlyWFDCurrentList.push(fireFlyWFDMap.get(num + ""));
                    }
                })
            }
            return fireFlyWFDCurrentList[0];
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
                    var fibrwData = fireFlyWFDMap.get(item + "");
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
    var param = $("#search-form").serializeJson();
    var showChinese = param.chinese;
    var num = fireFlyWFDData.qNum;
    var text = fireFlyWFDData.en;
    var cn = fireFlyWFDData.cn;
    var title = "<div class=\"layui-form-item\"><div class=\"layui-inline\"><label  style=\"white-space:nowrap\">第" + (fireFlyWFDIndex + 1) + "题/共" + (fireFlyWFDCurrentList.length) + "题, 题号:" + num + "&nbsp;&nbsp;</label><div class=\"layui-inline\"><span style=\"color: red\" id=\"timer\"></span></div></div></div>"
    var lastIndex = text.lastIndexOf(".");
    if (lastIndex != -1) {
        text = text.substring(0, lastIndex);
    }
    var allWords = text.split(" ");
    var parent = $("<div class=\"layui-inline\" > </div>");
    for (var idx in allWords) {
        var word = allWords[idx];
        if (!word) {
            continue;
        }
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
    var chinese = "";
    if (showChinese) {
        chinese = "<div class=\"layui-form-item\"><label class=\"layui-form-label\" style=\"white-space:nowrap\">" + cn + "</label></div>";
    }
    var audiosrc = "https://gitee.com/jackiechan/ptepractise/raw/webversion/mp3/wfd/" + num + ".mp3";
    var audio = "<audio id='wfdmp3' src=" + audiosrc + " controls></audio>"
    startTimer();
    return title + text + chinese + "<br/>" + audio;
}

function loadwfdpdfmd(filename,pdfname){
    $.ajaxSettings.async = false;
    $.get(getGitContentPre() + "/pdf/"+filename + getGitContentAccess(), function (response) {
        var result
        try {
            result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        } catch (e) {
            result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
        }
        var newPage = document.implementation.createHTMLDocument('New Page');
        var name = pdfname;
        var body = newPage.body;
        $(body).attr("style","margin-left: 20px")
        $(body).append(result);
        fillPdf(newPage, name);
        return result;
    })
    $.ajaxSettings.async = true;
}


function playwfdmp3() {
    var player = $("#wfdmp3").get(0);
    player.oncanplaythrough = function () {
        setTimeout(function () {
            player.play();
        }, 2000);
    }
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


function wfdrandomlucky() {
    fireFlyWFDIndex = 0;
    shuffle(allQnums);
    fireFlyWFDCurrentList = new Array();
    var nums = Math.floor(Math.random() * (4 - 3 + 1)) + 3;
    for (var i = 0; i < nums; i++) {
        fireFlyWFDCurrentList.push(fireFlyWFDMap.get(allQnums[i]));
    }
    return fireFlyWFDCurrentList[0];
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

function getWFDPlainTxt() {
    return plaintxt;
}

function getMp3url() {
    var str=""
    for (var i =0;i <allmp3listaddress.length;i++){
        if (i != allmp3listaddress.length - 1) {

            str += allmp3listaddress[i] + "\r\n";
        }else{
            str += allmp3listaddress[i];

        }
    }
    return str;
}
var fibrCurrentList;
let fibrCnList, fibrEnList;
const fibrCnMap = new Map();
const fibrEnMap = new Map();
var fibrIndex = 0;//当前第几条

function fibrInit() {
    $.get("https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/fibr/fibrallquestions.txt?access_token=c87299575627265144b7db286d3bf673", function (response) {
        //fibrCnList = JSON.parse(response);
       // fibrCnList = response;
        var result=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        fibrCnList= JSON.parse(result);
        for (let i = 0; i < fibrCnList.length; i++) {
            var fibrData = fibrCnList[i];
            fibrCnMap.set(fibrData.num, fibrData);
        }
    })
    $.get("https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/fibr/fibrallquestionsen.txt?access_token=c87299575627265144b7db286d3bf673", function (response) {
        // fibrEnList = JSON.parse(response);
       // fibrEnList = response;
        var result=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        fibrEnList= JSON.parse(result);
        for (let i = 0; i < fibrEnList.length; i++) {
            var fibrData = fibrEnList[i];
            fibrEnMap.set(fibrData.num, fibrData);
        }
    })
}

function fibRCurrentTypedata(param) {
    var qNum = param.qNum;//题号
    var type = param.type;//类型
    var filePath;
    fibrIndex = 0;
    fibrCurrentList = new Array();
    var localstoragedata;
    switch (type) {
        case "1":
            //C哥蓝色数据
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/fibr/cge_fib_r_lan.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "2":
            //C哥黄色数据
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/fibr/cge_fib_r_huang.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "3":
            //C哥白色数据
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/fibr/cge_fib_r_bai.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "4":
            //C哥所有数据
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/fibr/cge_fib_r_all.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "5":
            //自定义数据
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/fibr/xjfirweek.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "6":
            //自定义数据
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/fibr/xjfibrmonth.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "7":
            var content = getFromLocalStorage("fibrblue");
            if (content) {
                var json = JSON.parse(content);
                localstoragedata = json.nums;
            }
            break;
        case "8":
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/fibr/xjfib_r_withoutc.txt?access_token=c87299575627265144b7db286d3bf673"
            break
    }
    //当前数据
    if (filePath) {
        $.ajaxSettings.async = false;
        $.get(filePath, function (response) {
            let qNums = decodeURIComponent(escape(window.atob(response.content))).split(/[(\r\n)\r\n]+/); // 根据换行或者回车进行识别
            qNums.forEach((item, fibrIndex) => { // 删除空项
                if (qNum && qNum != item) {

                } else {
                    if (!item) {
                        qNums.splice(fibrIndex, 1);
                    } else {
                        var fibrData = fibrCnMap.get(parseInt(item));
                        if (!fibrData) {
                            fibrData = fibrEnMap.get(parseInt(item));
                        }
                        if (fibrData) {
                            fibrCurrentList.push(fibrData);
                        }
                    }
                }
            })

        });
        $.ajaxSettings.async = true;
    }else if (localstoragedata) {
        //如果有数据
        localstoragedata.forEach(function (item) {
            if (qNum && qNum != item) {

            } else {
                if (!item) {
                    localstoragedata.splice(fibrIndex, 1);
                } else {
                    var fibrData = fibrCnMap.get(parseInt(item));
                    if (!fibrData) {
                        fibrData = fibrEnMap.get(parseInt(item));
                    }
                    if (fibrData) {
                        fibrCurrentList.push(fibrData);
                    }
                }
            }
        });
    }

    console.log(fibrCurrentList.length);
    return fibrCurrentList;
}


function fibrTranslateData(fibrData) {
    //var fibrData = fibrCurrentList[fibrIndex];
    var nameWithoutNum = fibrData.name_without_num;
    nameWithoutNum = nameWithoutNum.replaceAll(" ", "&nbsp;");
    var num = fibrData.num;
    var text = fibrData.text;
    var choices = fibrData.choices;
    var title = "<div class=\"layui-form-item\"><label class=\"layui-form-label\" style=\"white-space:nowrap\">第" + (fibrIndex + 1) + "题/共"+(fibrCurrentList.length)+"题, 题号:" + num + "&nbsp;&nbsp;" + nameWithoutNum + "</label></div>"
    shuffle(choices);
    for (var key in choices) {
        var choice = choices[key];
        if (choice) {
            var serNum = choice.id;
            var option = choice.choice;
            var parent = $("<div class=\"layui-inline\" > </div>");
            var divid = "div" + serNum + option;
            divid = divid.replaceAll("'", "");
            var parentin = $("<div class=\"layui-input-inline\"  id=" + divid + "> </div>");
            var input = document.createElement("input");
            $(input).attr("type", "text");
            $(input).attr("disabled", "disabled");
            $(input).attr("autocomplete", "off");
            $(input).attr("lay-verify", "answer");
            $(input).attr("class", "layui-input");
            $(input).attr("name", "answeroptions");
            $(input).attr("style", "text-align:center");
            $(input).attr("ondrop", "drop(event)");
            $(input).attr("ondragover", "allowDrop(event)");
            $(input).attr("draggable", "true");
            $(input).attr("ondragstart", "drag(event)");
            $(input).attr("realanswer", option);
            parentin.append(input);
            parent.append(parentin);
            text = text.replace("{{" + serNum + "}}", $(parent).html())

        }
    }
    // fibrIndex++;
    return title + text;
}

function createFibRPdfHtml(parmas, serNum, fibrdata) {
    var highlight = parmas.highlight;//是否需要中文
    var analysis = parmas.analysis;//是否需要解析
    var questionDiv = document.createElement("div");
    $(questionDiv).attr("style", "padding-left: 20px;padding-right: 20px;line-height: 30px;font-size: large");
    var anserDive = document.createElement("div");
    $(anserDive).attr("class", "layui-form-item");
    var analysispre = document.createElement("pre");
    $(analysispre).attr("class", "layui-code answer-area");
    $(analysispre).attr("style", "font-size: 18px;font-family: Arial;background-color:#ecf8f2;");


    //内容
    var nameWithoutNum = fibrdata.name_without_num;//名字
    nameWithoutNum = nameWithoutNum.replaceAll(" ", "&nbsp;");
    var num = fibrdata.num;//题号
    var text = fibrdata.text;//内容
    var choices = fibrdata.choices;//选项
    var h3 = document.createElement("h3");
    h3.innerHTML = serNum + "." + "&nbsp;" + "&nbsp;" + nameWithoutNum + "&nbsp;" + "&nbsp;题号:" + num + "<br/>" + "<br/>";
    $(questionDiv).append(h3);
    console.log(choices);
    var allOptions = new StringBuffer();
    Object.keys(choices).forEach(function (key) {
        var choice = choices[key];
        if (choice) {//每一个答案的所有选项
            //遍历每一个选项
            var stringBuffer = new StringBuffer();
            stringBuffer.append("<span style=\"font-family:Arial;color:green;\">");
            stringBuffer.append(" 【");
            stringBuffer.append("</span>");

            var id = choice.id;
            var eachChoice = choice.choice;
            allOptions.append(eachChoice);
            allOptions.append(" , ");
            if (highlight && "none"!=id) {
                stringBuffer.append("<span style=\"font-family:Arial;font-style:italic;color:red;\">");
                stringBuffer.append(eachChoice);
                stringBuffer.append("</span>")
            } else {
                stringBuffer.append(eachChoice);
            }

            stringBuffer.append("<span style=\"font-family:Arial;color:green;\">");
            stringBuffer.append("】 ");
            stringBuffer.append("</span>");

            //将内容替换掉
            text = text.replace("{{" + id + "}}", stringBuffer.toString());
        }
    })
    $(questionDiv).append(text+"<br/>"+"<br/>");
    var answerInText =  allOptions.toString().substring(0, allOptions.toString().length-2);
    if (analysis) {
        var explanation_in_locale = fibrdata.explanation_in_locale;
        if (explanation_in_locale) {
            answerInText = "</br>" + "</br>" + answerInText + "</br>" + "</br>" + explanation_in_locale;
        }
    }
    $(analysispre).html(answerInText);
    $(anserDive).append(analysispre);
    $(questionDiv).append(anserDive);
    $(questionDiv).append("<br/>");
    return questionDiv;
}

function fibrNextQuest() {
    if (fibrIndex < fibrCurrentList.length - 1) {
        fibrIndex++;
    }
    // var result = fibrwTranslateData();
    // return result;
    return fibrCurrentList[fibrIndex];
}

function fibrPreQuest() {
    if (fibrIndex > 0) {
        fibrIndex--;
    }
    // var result = fibrwTranslateData();
    // return result;
    return fibrCurrentList[fibrIndex];
}

function isFibRFirst() {
    return fibrIndex == 0;
}

function isFibRLast() {
    return fibrIndex == fibrCurrentList.length - 1;
}

function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}

function getFibRfibrIndex() {
    return fibrIndex;
}

function getFibRTotalNum() {
    return fibrCurrentList.length;
}
function setFibRIndex(qindex) {
    fibrIndex = qindex - 1;
}
function currentFibRData() {
    return  fibrCurrentList[fibrIndex];
}
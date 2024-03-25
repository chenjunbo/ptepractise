var currentList;
let cnList, enList, fibrwIdsList, fibrwunCompletedList;
const cnMap = new Map();
var fibrwIdsSet = new Set();
const chineseContentMap = new Map();//存放中文注释的
const enMap = new Map();
var index = 0;//当前第几条

function fibrwInit() {
    $.ajax({
        url: "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/fibrw/fibrwallquestions.txt?access_token=c87299575627265144b7db286d3bf673",
        type: "GET",
        crossDomain: true, // 设置为true，则不发送Origin头部
        success: function (response) {
            // 处理响应数据
            var result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
            cnList = JSON.parse(result);
            for (let i = 0; i < cnList.length; i++) {
                var fibrwData = cnList[i];
                cnMap.set(fibrwData.num, fibrwData);
                fibrwIdsSet.add(fibrwData.num);
            }
        },
        error: function (xhr, status, error) {
            // 处理错误
        }
    });

    $.ajax({
        url: "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/fibrw/fibrwallquestionsen.txt?access_token=c87299575627265144b7db286d3bf673",
        type: "GET",
        crossDomain: true, // 设置为true，则不发送Origin头部
        success: function (response) {
            // 处理响应数据
            var result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
            enList = JSON.parse(result);
            for (let i = 0; i < enList.length; i++) {
                var fibrwData = enList[i];
                enMap.set(fibrwData.num, fibrwData);
                fibrwIdsSet.add(fibrwData.num);
            }
            $("#uncompleted").show();
        },
        error: function (xhr, status, error) {
            // 处理错误
        }
    });

    $.ajax({
        url: "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/fibrw/阅读答案.txt?access_token=c87299575627265144b7db286d3bf673",
        type: "GET",
        crossDomain: true, // 设置为true，则不发送Origin头部
        success: function (response) {
            let chineseContent = decodeURIComponent(escape(window.atob(response.content))).split(/[(\r\n)\r\n]+/); // 根据换行或者回车进行识别
            chineseContent.forEach((item, index) => { // 删除空项

                if (!item) {
                    chineseContent.splice(index, 1);
                } else {
                    var splitString = item.split("#");
                    chineseContentMap.set(splitString[0] + "", splitString[1]);
                }

            })
        },
        error: function (xhr, status, error) {
            // 处理错误
        }
    });
}

function fibRwCurrentTypedata(param) {
    var qNum = param.qNum;//题号
    var type = param.type;//类型
    var filePath;
    index = 0;
    currentList = new Array();
    var localstoragedata;
    switch (type) {
        case "1":
            //C哥蓝色数据
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/fibrw/cge_fib_rw_lan.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "2":
            //C哥黄色数据
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/fibrw/cge_fib_rw_huang.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "3":
            //C哥白色数据
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/fibrw/cge_fib_rw_bai.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "4":
            fibrwunCompletedList = new Array();
            //C哥所有数据
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/fibrw/cge_fib_rw_all.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "5":
            //自定义数据
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/fibrw/xjfibrwweek.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "6":
            //自定义数据
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/fibrw/xjfibrwmonth.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "7":
            var content = getFromLocalStorage("fibrwblue");
            if (content) {
                var json = JSON.parse(content);
                localstoragedata = json.nums;
            }
            break;
        case "8":
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/fibrw/xjfib_rw_withoutc.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "9":
            var faltIds = getAllQuestionNumFromLocalStorageByFalt("fibrw");
            if (faltIds) {
                faltIds.forEach((qNum, index) => {
                    var fibrwData = cnMap.get(parseInt(qNum));
                    if (!fibrwData) {
                        fibrwData = enMap.get(parseInt(qNum));
                    }
                    if (fibrwData) {
                        currentList.push(fibrwData);
                    }
                })
            }

            break;

    }
    //当前数据
    if (filePath) {
        $.ajaxSettings.async = false;
        $.get(filePath, function (response) {
            let qNums = decodeURIComponent(escape(window.atob(response.content))).split(/[(\r\n)\r\n]+/); // 根据换行或者回车进行识别
            qNums.forEach((item, index) => { // 删除空项
                if (qNum && qNum != item) {

                } else {
                    if (!item) {
                        qNums.splice(index, 1);
                    } else {
                        var fibrwData = cnMap.get(parseInt(item));
                        if (!fibrwData) {
                            fibrwData = enMap.get(parseInt(item));
                        }
                        if (fibrwData) {
                            currentList.push(fibrwData);
                        } else {
                            if ("4" == type) {
                                fibrwunCompletedList.push(item);
                            }
                        }

                    }
                }
            })

        });
        $.ajaxSettings.async = true;
    } else if (localstoragedata) {
        //如果有数据
        localstoragedata.forEach(function (item) {
            if (qNum && qNum != item) {

            } else {
                if (!item) {
                    localstoragedata.splice(index, 1);
                } else {
                    var fibrwData = cnMap.get(parseInt(item));
                    if (!fibrwData) {
                        fibrwData = enMap.get(parseInt(item));
                    }
                    if (fibrwData) {
                        currentList.push(fibrwData);
                    }
                }
            }
        });
    }
    console.log(currentList.length);
    // return fibrwTranslateData();
    // return currentList[index]
    return currentList;
}


function fibrwTranslateData(fibrwData) {
    //var fibrwData = currentList[index];
    var nameWithoutNum = fibrwData.name_without_num;
    nameWithoutNum = nameWithoutNum.replaceAll(" ", "&nbsp;");
    var num = fibrwData.num;
    var text = fibrwData.text;
    var choices = fibrwData.choices.allData;
    var title = "<div class=\"layui-form-item\"><div class=\"layui-inline\"><label  style=\"white-space:nowrap\">第" + (index + 1) + "题/共" + (currentList.length) + "题, 题号:" + num + "&nbsp;&nbsp;" + nameWithoutNum + "&nbsp;&nbsp;</label><div class=\"layui-inline\"><span style=\"color: red\" id=\"timer\"></span></div></div></div>"
    for (var key in choices) {
        var choice = choices[key];
        if (choice) {
            shuffle(choice);
            var parent = $("<div class=\"layui-inline\"> </div>");
            var parentin = $("<div class=\"layui-input-inline\"> </div>");
            var selectId = "answer" + key;
            var select = $("<select name=" + selectId + " lay-verify=\"required|answer\" id=" + selectId + "><option value=\"\">请选择</option></select>");

            for (var idx in choice) {
                var current = choice[idx];
                if (current) {
                    var choice1 = current.choice;
                    var correct = current.correct;
                    select.append($(" <option value=" + correct + idx + ">" + choice1 + "</option>"))
                }
            }
            parentin.append(select);
            parent.append(parentin);
            text = text.replace("{{" + key + "}}", $(parent).html())
        }
    }
    startTimer();
    // index++;
    return title + text;
}


function createFibRwPdfHtml(parmas, serNum, fibrwdata) {
    var analysis = parmas.analysis;//是否需要解析
    var needchinese = parmas.needchinese;//是否需要中文
    var highlight = parmas.highlight;//是否需要中文
    var needtrans = parmas.trans;//是否需要全文翻译

    var questionDiv = document.createElement("div");
    $(questionDiv).attr("style", "padding-left: 20px;padding-right: 20px;line-height: 30px;font-size: large;width:90%;");
    var anserDive = document.createElement("div");
    $(anserDive).attr("class", "layui-form-item");
    var analysispre = document.createElement("pre");
    $(analysispre).attr("class", "answer-area");
    $(analysispre).attr("style", "font-size: 18px;font-family: Arial;word-wrap:break-word;");


    //内容
    var nameWithoutNum = fibrwdata.name_without_num;//名字
    nameWithoutNum = nameWithoutNum.replaceAll(" ", "&nbsp;");
    var num = fibrwdata.num;//题号
    var text = fibrwdata.text;//内容
    var choices = fibrwdata.choices;//选项
    var h3 = document.createElement("h3");
    h3.innerHTML = serNum + "." + "&nbsp;" + "&nbsp;" + nameWithoutNum + "&nbsp;" + "&nbsp;题号:" + num + "<br/>" + "<br/>";
    $(questionDiv).append(h3);
    Object.keys(choices.allData).forEach(function (key) {
        var choice = choices[key];
        if (choice) {//每一个答案的所有选项
            //遍历每一个选项
            var stringBuffer = new StringBuffer();
            stringBuffer.append("<span style=\"font-family:Arial;color:green;\">");
            stringBuffer.append(" 【");
            stringBuffer.append("</span>");

            Object.keys(choice).forEach(function (key1, index) {
                var option = choice[key1];
                if (option) {
                    console.log(option);
                    var correct = option.correct;
                    var eachoptionText = option.choice;
                    console.log("eachoptionText---->" + eachoptionText);
                    eachoptionText = eachoptionText.replace(",", "");
                    if (highlight && correct) {
                        stringBuffer.append("<span style=\"font-family:Arial;font-style:italic;color:red;\">");
                        stringBuffer.append(eachoptionText);
                        stringBuffer.append("</span>")
                    } else {
                        stringBuffer.append(eachoptionText);
                    }
                    if (index != choice.length - 1) {
                        stringBuffer.append(" , ");
                    }
                }
            });
            stringBuffer.append("<span style=\"font-family:Arial;color:green;\">");
            stringBuffer.append("】 ");
            stringBuffer.append("</span>");

            //将内容替换掉
            text = text.replace("{{" + key + "}}", stringBuffer.toString());
        }
    })
    $(questionDiv).append(text + "<br/>" + "<br/>");


    if (needchinese) {
        var chinese = getChinese(fibrwdata.num + "");
        if (chinese) {
            var chinesepre = "<span  style=\"font-size:20px;font-family:AaManYuShouXieTi;color:red;margin: 40px\">";
            var chinesebiaoshipre = "<span style=\"font-size:20px;font-family:AaManYuShouXieTi;color:green;\">";
            var sPanend = "</span>"
            chinese = chinese.replaceAll("【", chinesebiaoshipre + "【" + sPanend)
            chinese = chinese.replaceAll("】", chinesebiaoshipre + "】" + sPanend);
            chinese = chinesepre + chinese + sPanend;
            $(anserDive).prepend(chinese);
        }
    }

    var answerInText = "<span  style=\"background-color:#ecf8f2;\">" + fibrwdata.answer_in_text + "</span>";
    if (analysis) {
        var explanation_in_locale = fibrwdata.explanation_in_locale;
        if (explanation_in_locale) {
            answerInText = "</br>" + "</br>" + answerInText + "</br>" + "</br>" + explanation_in_locale;
        }
    }
    if (needchinese) {
        var contents = xjroData.contents;
        if (contents&&contents.length>0) {
            contents.forEach((eachContent)=>{
                var content = eachContent.content;
                answerInText=answerInText+"<br/>"+content+"<br/>"
            });
        }
    }

    $(analysispre).html(answerInText);
    $(anserDive).append(analysispre);
    $(questionDiv).append(anserDive);
    $(questionDiv).append("<br/>");
    return questionDiv;

}

function fibrwRandomLucky() {
    if (!fibrwIdsList || fibrwIdsList.length == 0) {
        fibrwIdsList = Array.from(fibrwIdsSet);
    }
    index = 0;
    currentList = new Array();
    shuffle(fibrwIdsList);
    var nums = Math.floor(Math.random() * (6 - 5 + 1)) + 5;
    for (var i = 0; i < nums; i++) {
        var fibrwdata = cnMap.get(fibrwIdsList[i]);
        if (!fibrwdata) {
            fibrwdata = enMap.get(fibrwIdsList[i]);
        }
        currentList.push(fibrwdata);
    }
    return currentList[0];
}

function fibrwNextQuest() {
    if (index < currentList.length - 1) {
        index++;
    }
    // var result = fibrwTranslateData();
    // return result;
    return currentList[index];
}

function fibrwPreQuest() {
    if (index > 0) {
        index--;
    }
    // var result = fibrwTranslateData();
    // return result;
    return currentList[index];
}

function fibrwUncompleted() {
    if (fibrwunCompletedList&&fibrwunCompletedList.length>0) {
        $("#question-form").show();
        $("#question-div").html("不完整id:" + fibrwunCompletedList.join(", ")+"请根据id去⭐️中单独查询");
        $("#operationtools").hide();
    } else {
        fibrwunCompletedList = new Array();
        $.ajaxSettings.async = false;
        $.get("https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/fibrw/cge_fib_rw_all.txt?access_token=c87299575627265144b7db286d3bf673", function (response) {
            let qNums = decodeURIComponent(escape(window.atob(response.content))).split(/[(\r\n)\r\n]+/); // 根据换行或者回车进行识别
            qNums.forEach((item, index) => { // 删除空项

                    if (!item) {
                        qNums.splice(index, 1);
                    } else {
                        var fibrwData = cnMap.get(parseInt(item));
                        if (!fibrwData) {
                            fibrwData = enMap.get(parseInt(item));
                        }
                        if (fibrwData) {
                        } else {
                            fibrwunCompletedList.push(item);
                        }

                    }
            })
            $("#question-form").show();
            $("#question-div").html("不完整id:" + fibrwunCompletedList.join(", ")+"请根据id去⭐️中单独查询");
            $("#operationtools").hide();
        });
        $.ajaxSettings.async = true;
    }
}


function isFibRwFirst() {
    return index == 0;
}

function isFibRwLast() {
    return index == currentList.length - 1;
}

function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}

function getFibRwindex() {
    return index;
}

function getChinese(qNum) {
    return chineseContentMap.get(qNum);
}


function getFibRwTotalNum() {
    return currentList.length;
}

function setFibRWIndex(qindex) {
    index = qindex - 1;
}

function currentFibRWData() {
    return currentList[index];
}

function currentFibRWListData() {
    return currentList;
}
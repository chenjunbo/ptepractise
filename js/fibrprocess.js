var fibrCurrentList;
let fibrCnList, fibrEnList, fibrIdsList, fibrunCompletedList;
var fibrIdsSet = new Set();
const fibrCnMap = new Map();
const fibrEnMap = new Map();
var fibrIndex = 0;//当前第几条
var localStorageType = "fibr";//类型key
var XjFIBRFavlocalStorageType = "fibrblue";//收藏夹类型key

function fibrInit() {
    $.get(getGitContentPre()+"/data/fibr/fibrallquestions.txt"+getGitContentAccess(), function (response) {
        //fibrCnList = JSON.parse(response);
        // fibrCnList = response;
        var result
        try {
            result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        } catch (e){
            result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
        }

        fibrCnList = JSON.parse(result);
        for (let i = 0; i < fibrCnList.length; i++) {
            var fibrData = fibrCnList[i];
            fibrCnMap.set(fibrData.num, fibrData);
            fibrIdsSet.add(fibrData.num);
        }
    })
    $.get(getGitContentPre()+"/data/fibr/fibrallquestionsen.txt"+getGitContentAccess(), function (response) {
        // fibrEnList = JSON.parse(response);
        // fibrEnList = response;
        var result
        try {
            result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        } catch (e){
            result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
        }

        fibrEnList = JSON.parse(result);
        for (let i = 0; i < fibrEnList.length; i++) {
            var fibrData = fibrEnList[i];
            fibrEnMap.set(fibrData.num, fibrData);
            fibrIdsSet.add(fibrData.num);
        }
        $("#uncompleted").show();
    })
}

function fibRCurrentTypedata(param) {
    var qNum = param.qNum;//题号
    var type = param.type;//类型
    var onlyundo = param.onlyundo;//仅未做
    var filePath;
    fibrIndex = 0;
    fibrCurrentList = new Array();
    var localstoragedata;
    switch (type) {
        case "-1":
            //C哥蓝色数据
            filePath = getGitContentPre()+"/questions/fibr/cge_fib_r_hightest.txt"+getGitContentAccess()
            break;
        case "-2":
            //C哥蓝色数据
            filePath = getGitContentPre()+"/questions/fibr/xj_fib_r_huang.txt"+getGitContentAccess()
            break;
        case "-3":
            //C哥蓝色数据
            filePath = getGitContentPre()+"/questions/fibr/xj_fib_r_lv.txt"+getGitContentAccess()
            break;
        case "-4":
            //C哥蓝色数据
            filePath = getGitContentPre()+"/questions/fibr/xj_fib_r_bai.txt"+getGitContentAccess()
            break;
        case "1":
            //C哥蓝色数据
            filePath = getGitContentPre()+"/questions/fibr/cge_fib_r_lan.txt"+getGitContentAccess()
            break;
        case "2":
            //C哥黄色数据
            filePath = getGitContentPre()+"/questions/fibr/cge_fib_r_huang.txt"+getGitContentAccess()
            break;
        case "3":
            //C哥白色数据
            filePath = getGitContentPre()+"/questions/fibr/cge_fib_r_bai.txt"+getGitContentAccess()
            break;
        case "4":
            //C哥所有数据
            fibrunCompletedList = new Array();
            filePath = getGitContentPre()+"/questions/fibr/cge_fib_r_all.txt"+getGitContentAccess()
            break;
        case "5":
            //自定义数据
            filePath = getGitContentPre()+"/questions/fibr/xjfirweek.txt"+getGitContentAccess()
            break;
        case "6":
            //自定义数据
            filePath = getGitContentPre()+"/questions/fibr/xjfibrmonth.txt"+getGitContentAccess()
            break;
        case "7":
            var content = getFromLocalStorage(XjFIBRFavlocalStorageType);
            if (content) {
                var json = JSON.parse(content);
                localstoragedata = json.nums;
            }
            break;
        case "8":
            filePath = getGitContentPre()+"/questions/fibr/xjfib_r_withoutc.txt"+getGitContentAccess()
            break
        case "-5":
            filePath = getGitContentPre()+"/questions/fibr/cge_fib_r_without_xj.txt"+getGitContentAccess()
            break
        case "9":
            var faltIds = getAllQuestionNumFromLocalStorageByFalt("fibr");
            if (faltIds) {
                faltIds.forEach((qNum, index) => {
                    var fibrData = fibrCnMap.get(parseInt(qNum));
                    if (!fibrData) {
                        fibrData = fibrEnMap.get(parseInt(qNum));
                    }
                    if (fibrData) {
                        fibrCurrentList.push(fibrData);
                    }
                })
            }

            break;

        case "10":
            fibrCurrentList=fibrCnList;
            break;
        case "11":
            fibrCurrentList = fibrEnList;
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

            qNums.forEach((item, fibrIndex) => { // 删除空项
                if (qNum && qNum != item) {

                } else {
                    if (!item) {
                        qNums.splice(fibrIndex, 1);
                    } else {
                        if (onlyundo) {
                            var rightLocal = getFromLocalStorage(item + "right" + localStorageType);
                            var faltlocal = getFromLocalStorage(item + "falt" + localStorageType);
                            if (rightLocal || faltlocal) {
                                //已经做了,不处理
                            }else{
                                var fibrData = fibrCnMap.get(parseInt(item));
                                if (!fibrData) {
                                    fibrData = fibrEnMap.get(parseInt(item));
                                }
                                if (fibrData) {
                                    fibrCurrentList.push(fibrData);
                                } else {
                                    if ("4" == type) {
                                        fibrunCompletedList.push(item);
                                    }
                                }
                            }
                        }else{
                            var fibrData = fibrCnMap.get(parseInt(item));
                            if (!fibrData) {
                                fibrData = fibrEnMap.get(parseInt(item));
                            }
                            if (fibrData) {
                                fibrCurrentList.push(fibrData);
                            } else {
                                if ("4" == type) {
                                    fibrunCompletedList.push(item);
                                }
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
    var serializeJson = $("#fibrsearch-form").serializeJson();
    var usefibrwmodel = serializeJson["usefibrwmodel"];
    var result;
    if (usefibrwmodel) {
        result = fibrTranslateDataFibrwModel(fibrData)
        $("#fibroptions").hide();
    } else {
        result = fibrTranslateDataDefault(fibrData);
        $("#fibroptions").show();
    }
    fillfibrAnswer(fibrData);
    startTimer();
    // fibrIndex++;
    return result;
}

function fibrTranslateDataDefault(fibrData) {
    //var fibrData = fibrCurrentList[fibrIndex];
    var nameWithoutNum = fibrData.name_without_num;
    nameWithoutNum = nameWithoutNum.replaceAll(" ", "&nbsp;");
    var num = fibrData.num;
    var text = fibrData.text;
    var choices = fibrData.choices;
    var title = "<div class=\"layui-form-item\"><div class=\"layui-inline\"><label  style=\"white-space:nowrap\">第" + (fibrIndex + 1) + "题/共" + (fibrCurrentList.length) + "题, 题号:" + num + "&nbsp;&nbsp;" + nameWithoutNum + "&nbsp;&nbsp;</label><div class=\"layui-inline\"><span style=\"color: red\" id=\"timer\"></span></div></div></div>"
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
            //$(input).attr("disabled", "disabled");
            $(input).attr("autocomplete", "off");
            $(input).attr("lay-verify", "answer");
            $(input).attr("class", "layui-input");
            $(input).attr("name", "answeroptions");
            $(input).attr("style", "text-align:center");
            $(input).attr("ondrop", "fibrdrop(event)");
            $(input).attr("ondragover", "fibrallowDrop(event)");
            $(input).attr("draggable", "true");
            $(input).attr("ondragstart", "drag(event)");
            $(input).attr("realanswer", option);
            parentin.append(input);
            parent.append(parentin);
            text = text.replace("{{" + serNum + "}}", $(parent).html())

        }
    }
    fillfibrOptions(fibrData);
    return title + text;
}

function fibrTranslateDataFibrwModel(fibrData) {
    //var fibrData = currentList[index];
    var nameWithoutNum = fibrData.name_without_num;
    nameWithoutNum = nameWithoutNum.replaceAll(" ", "&nbsp;");
    var num = fibrData.num;
    var text = fibrData.text;
    var choices = fibrData.choices;

    var title = "<div class=\"layui-form-item\"><div class=\"layui-inline\"><label  style=\"white-space:nowrap\">第" + (fibrIndex + 1) + "题/共" + (fibrCurrentList.length) + "题, 题号:" + num + "&nbsp;&nbsp;" + nameWithoutNum +  "&nbsp;&nbsp;</label><div class=\"layui-inline\"><span style=\"color: red\" id=\"timer\"></span></div></div></div>"
    var selectionList = new Array();
    for (var key in choices) {
        var choice = choices[key];
        if (choice && "none" != choice.id) {
            selectionList.push(choice.id);
        }
    }
    selectionList.forEach((num,index)=>{
        shuffle(choices);
        var selectId = "answer" + num;
        var select = $("<select name=" + selectId + " lay-verify=\"required|answer\" id=" + selectId + "><option value=\"\">请选择</option></select>");
        var parent = $("<div class=\"layui-inline\"> </div>");
        var parentin = $("<div class=\"layui-input-inline\"> </div>");
        for (var key in choices) {
            var choice = choices[key];
            if (choice) {
                var serNum = choice.id;
                var option = choice.choice;
                select.append($(" <option value=" + serNum + ">" + option+ "</option>"))
                parentin.append(select);
                parent.append(parentin);
            }
        }
        text = text.replace("{{" + num + "}}", $(parent).html())
    })

    // index++;
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
            if (highlight && "none" != id) {
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
    $(questionDiv).append(text + "<br/>" + "<br/>");
    var answerInText = allOptions.toString().substring(0, allOptions.toString().length - 2);
    if (analysis) {
        var explanation_in_locale = fibrdata.explanation_in_locale;
        if (explanation_in_locale) {
            answerInText = "</br>" + "</br>" + answerInText + "</br>" + "</br>" + explanation_in_locale;
        }
    }
    var needTrans = parmas.trans;
    if (needTrans) {
        var contents = fibrdata.contents;
        if (contents && contents.length > 0) {
            answerInText = answerInText + "<br/>" + "<br/>"+ "<br/>"+ "翻译:" + "<br/>"
            contents.forEach((eachContent) => {
                var type = eachContent.type;
                if (type == "option" || type == "caption") {
                } else {
                    var content = eachContent.content;
                    answerInText = answerInText + "<br/>" + content + "<br/>";
                }
            });
        }else{
            answerInText = answerInText + "<br/>本题暂无翻译<br/>";
        }
    }

    $(analysispre).html(answerInText);
    $(anserDive).append(analysispre);
    $(questionDiv).append(anserDive);
    $(questionDiv).append("<br/>");
    return questionDiv;
}

function fibrRandomLucky() {
    if (!fibrIdsList || fibrIdsList.length == 0) {
        fibrIdsList = Array.from(fibrIdsSet);
    }
    fibrIndex = 0;
    fibrCurrentList = new Array();
    shuffle(fibrIdsList);
    var nums = Math.floor(Math.random() * (5 - 4 + 1)) + 4;
    for (var i = 0; i < nums; i++) {
        var fibrdata = fibrCnMap.get(fibrIdsList[i]);
        if (!fibrdata) {
            fibrdata = fibrEnMap.get(fibrIdsList[i]);
        }
        fibrCurrentList.push(fibrdata);
    }
    return fibrCurrentList[0];
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

function fibrsearch(obj, event) { // 左侧菜单事件
    // var json = JSON.stringify($("#fibrsearch-form").serializeJson())
    // alert("aaaaa" + json)
    event.preventDefault();
    $("#fibrpre").hide();
    // var content = fibRwGetdata($("#search-form").serializeJson());

    fibRCurrentTypedata($("#fibrsearch-form").serializeJson());
    var fibrdata = currentFibRData()
    if (!fibrdata) {
        $("#fibrquestion-form").hide();
        layer.msg('当前分类下不存在该题目', {icon: 0}, function () {
            // layer.msg('提示框关闭后的回调');
        });
        return false;
    } else {
        $("#fibrquestion-form").show();
    }
    var content = fibrTranslateData(fibrdata);
    $("#fibrquestion-div").html(content);
    // fillfibrAnswer(fibrdata);
    // fillfibrOptions(fibrdata);
    if (isFibRLast()) {
        $("#fibrnext").hide();
    } else {
        $("#fibrnext").show();
    }
    if (getFibRTotalNum() == 1) {
        $("#gotoarea").hide();
    } else {
        $("#gotoarea").show();
    }
    checkFav(fibrdata.num, localStorageType);
}

function testfibrlucky(obj, event) {
    event.preventDefault();
    $("#fibrpre").hide();
    // var content = fibRwGetdata($("#search-form").serializeJson());
    fibRCurrentTypedata($("#fibrsearch-form").serializeJson());
    var fibrdata = fibrRandomLucky();
    if (!fibrdata) {
        $("#fibrquestion-form").hide();
        layer.msg('加载资源中,等一下点击或者刷新一下重新测试', {icon: 0}, function () {
            // layer.msg('提示框关闭后的回调');
        });
        return false;
    } else {
        $("#fibrquestion-form").show();
    }
    var content = fibrTranslateData(fibrdata);
    $("#fibrquestion-div").html(content);
    // fillfibrAnswer(fibrdata);
    // fillfibrOptions(fibrdata);
    if (isFibRLast()) {
        $("#fibrnext").hide();
    } else {
        $("#fibrnext").show();
    }
    if (getFibRTotalNum() == 1) {
        $("#gotoarea").hide();
    } else {
        $("#gotoarea").show();
    }
    checkFav(fibrdata.num, localStorageType);
}


function deletefibrallrightorfalt(obj, event) {
    event.preventDefault();
    //移除所有数据
    layer.confirm('是否删清空本题型的对错记录？', {icon: 3}, function () {
        clearAllFaltByType(localStorageType);
        try {
            var fibrdata = currentFibRData();
            if (fibrdata) {
                setRightAndFaltNum(fibrdata.num, localStorageType);
            }
        } catch (e) {

        }
        layer.msg('操作完成', {icon: 0}, function () {
        });
    }, function () {
    });
}

function clearfibrrightorfalt(obj, event) {
    event.preventDefault();
    layer.confirm('是否删除本题的对错记录？', {icon: 3}, function () {
        var fibrdata = currentFibRData();
        if (fibrdata) {
            deleteRightOrFaltByQnum(fibrdata.num, localStorageType);
            setRightAndFaltNum(fibrdata.num, localStorageType);
        }
        layer.msg('操作完成', {icon: 0}, function () {
        });
    }, function () {
    });
}

function fibrUncompleted() {
    event.preventDefault();
    if (fibrunCompletedList && fibrunCompletedList.length > 0) {
        $("#fibrquestion-form").show();
        $("#fibrquestion-div").show();
        $("#fibrquestion-div").html("不完整id:" + fibrunCompletedList.join(", ") + "请根据id去🦍中单独查询");
        $("#operationtools").hide();
        $("#fibroptions").hide();
    } else {
        fibrunCompletedList = new Array();
        $.ajaxSettings.async = false;
        $.get(getGitContentPre()+"/questions/fibr/cge_fib_r_all.txt"+getGitContentAccess(), function (response) {
            var qNums;
            try {
                qNums = decodeURIComponent(escape(window.atob(response.content))).split(/[(\r\n)\r\n]+/); // 根据换行或者回车进行识别
            }catch (e) {
                 qNums = response.split(/[(\r\n)\r\n]+/);;
            }

            // let qNums = decodeURIComponent(escape(window.atob(response.content))).split(/[(\r\n)\r\n]+/); // 根据换行或者回车进行识别
            qNums.forEach((item, index) => { // 删除空项

                if (!item) {
                    qNums.splice(index, 1);
                } else {
                    var fibrData = fibrCnMap.get(parseInt(item));
                    if (!fibrData) {
                        fibrData = fibrEnMap.get(parseInt(item));
                    }
                    if (fibrData) {
                    } else {
                        fibrunCompletedList.push(item);
                    }

                }
            })
            $("#fibrquestion-form").show();
            $("#fibrquestion-div").show();
            $("#fibrquestion-div").html("不完整id:" + fibrunCompletedList.join(", ") + "请根据id去🦍中单独查询");
            $("#operationtools").hide();
            $("#fibroptions").hide();
        });
        $.ajaxSettings.async = true;
    }
}


function fibrpre(obj, event) {
    event.preventDefault();
    if (isFibRFirst()) {
        $("#fibrpre").hide();
        return false;
    }

    // var content = fibrwPreQuest();
    var fibrdata = fibrPreQuest();
    var content = fibrTranslateData(fibrdata);
    if (isFibRFirst()) {
        $("#fibrpre").hide();
    }
    if (!isFibRLast()) {
        $("#fibrnext").show();
    }
    $("#fibrquestion-div").html(content);
    // fillfibrAnswer(fibrdata);
    // fillfibrOptions(fibrdata);
    checkFav(fibrdata.num, localStorageType);
}

function fibrshowanswer(obj, event) {
    event.preventDefault();
    if ($("#fibranswer-area").is(":hidden")) {
        $("#fibranswer-area").show();
    } else {
        $("#fibranswer-area").hide();
    }
}

function fibrcheckanswer(obj, event,form) {
    event.preventDefault();
    var fibrdata = currentFibRData()
    var serializeJson = $("#fibrsearch-form").serializeJson();
    var usefibrwmodel = serializeJson["usefibrwmodel"];
    if (usefibrwmodel) {
        checkfibranswerbyfibrwmodel(obj, event, fibrdata,form)
    } else {
        checkfibranswerbyDefault(obj, event, fibrdata,form)
    }
    setRightAndFaltNum(fibrdata.num, localStorageType)
}

function checkfibranswerbyfibrwmodel(obj, event, fibrdata,form) {
    //var fibrdata = currentFibRData();
    var content = JSON.stringify($("#fibrquestion-form").serializeJson());
    var result = $("#fibrquestion-form").serializeJson();
    var isWrong = false;
    var selcetlist = new Array();
    for (var ans in result) {
        if (!ans || !ans.startsWith("answer")) {
            continue;
        }
        console.log(result[ans]);
        var answer = result[ans];//获取到当前选项对应的值
        var select = $("#" + ans);//根据select的name来查找select,因为name和id一样所以用#
        console.log($(select))
        if (!answer || !ans.endsWith(answer)) {//如果没有答案或者答案的值并不是select的结尾则认为是错的, 我们在生成数据的时候option的value就是代表这是第几个select的答案,select的name的结尾代表当前是第几个select
            // $(allSelects[i]).addClass("layui-form-danger");
            selcetlist.push(ans);
            isWrong = true;
        }

    }
    if (!isWrong) {
        addRightOrFalt(fibrdata.num, "right", localStorageType);
        layer.msg('全部正确,考试必过!', {icon: 0, time: 800}, function () {
            //添加正确次数,添加错误次数
            // layer.msg('提示框关闭后的回调');
            // if (!isFibRLast()) {
            //     nextFibRQuestion(obj, event);
            // }
        });
    } else {
        addRightOrFalt(fibrdata.num, "falt", localStorageType);
        selcetlist.forEach((select)=>{
            // $("#"+select).removeClass();
            $("#"+select).parent().attr("style", "border: 1px solid red;");
        })
        layer.msg('答案不小心选错了哟!', {icon: 0}, function () {
            // layer.msg('提示框关闭后的回调');
            //添加错误次数
        });
    }

}
function checkfibranswerbyDefault(obj, event,fibrdata,form) {
    var allInputs = $("#fibrquestion-div input[name='answeroptions']");
    // console.log(allInputs.length)
    var isWrong = false;
    if (!allInputs || allInputs.length == 0) {
        isWrong = true;
    }
    allInputs.each(function (index, currentInput) {
        var id = $(currentInput).attr("id");
        if (id && id.startsWith("option") && (id.endsWith("-"))) {
            var val = $(currentInput).val();
            val = val.replace("nbsp;", "");
            val = val.replace(" ", "");
            val = val.replace(/\s+/g, "");
            var realanswer = $(currentInput).attr("realanswer");
            realanswer = realanswer.replaceAll(" ", "").replaceAll("&nbsp;", "");
            realanswer = realanswer.replaceAll(/\s+/g, "");
            console.log(val + "====>" + realanswer);
            if (val != realanswer) {
                var attr = $(currentInput).attr("style");
                attr = "border: 1px solid red;" + attr;
                $(currentInput).attr("style", attr);
                isWrong = true;
                form.render();
            }
        } else {
            isWrong = true;
        }
    });
    if (!isWrong) {
        console.log("答案检查正确");
        addRightOrFalt(fibrdata.num, "right", localStorageType);
        layer.msg('全部正确,考试必过!', {icon: 0, time: 800}, function () {
            // layer.msg('提示框关闭后的回调');
            var serializeJson = $("#fibrsearch-form").serializeJson();
            var autonext = serializeJson.autonext;
            if (!isFibRLast()&&autonext) {
                nextFibRQuestion(obj, event);
                //form.render();
            }

        });
    } else {
        console.log("答案检查错误");
        addRightOrFalt(fibrdata.num, "falt", localStorageType);
        layer.msg('答案不小心选错了哟!', {icon: 0}, function () {
            // layer.msg('提示框关闭后的回调');
        });
    }
}

function firbgotoindex(obj, event) {
    event.preventDefault();
    var qIndex = $("#qindex").val();//想要跳转的题目
    console.log(qIndex);
    if (!qIndex || qIndex <= 0 || qIndex > getFibRTotalNum()) {

    } else {
        setFibRIndex(parseInt(qIndex));
        var fibrdata = currentFibRData();
        if (!fibrdata) {
            layer.msg('超出题目数量范围', {icon: 0}, function () {
            });
            return false;
        }
        var content = fibrTranslateData(fibrdata);
        if (isFibRFirst()) {
            $("#fibrpre").hide();
        } else {
            $("#fibrpre").show();
        }
        if (!isFibRLast()) {
            $("#fibrnext").show();
        } else {
            $("#fibrnext").hide();
        }
        $("#fibrquestion-div").html(content);
        // fillfibrAnswer(fibrdata);
        // fillfibrOptions(fibrdata);
        checkFav(fibrdata.num, localStorageType);
        return false;
    }


}


function adddeletefibrfav(obj, event) {
    event.preventDefault();
    var fibrdata = currentFibRData();
    if (!fibrdata) {
        layer.msg('题目无效', {icon: 0}, function () {
        });
        return false;
    }
    var isContains = containsValue(fibrdata.num, localStorageType);
    if (isContains) {
        layer.confirm('是否删除收藏？', {icon: 3}, function () {
            removeFavFromLocalStorage(fibrdata.num, localStorageType);
            layer.msg('操作完成', {icon: 0}, function () {
            });
            checkFav(fibrdata.num, localStorageType);
        }, function () {
        });

    } else {
        layer.confirm('是否添加到收藏？', {icon: 3}, function () {
            add2LocalStorage("fibrblue", fibrdata.num, localStorageType)
            layer.msg('操作完成', {icon: 0}, function () {
            });
            checkFav(fibrdata.num, localStorageType);
        }, function () {
        });

    }

}

function fillfibrOptions(fibrData) {
    $("#fibroptions").show();
    console.log(fibrData);
    $("#fibroptions").children().remove();
    var options = fibrData.choices;
    for (var key in options) {
        var option = options[key];
        var choice = option.choice;
        var id = option.id;
        var textId = "option" + id + choice.replaceAll(" ", "").replaceAll("'", "");
        //var optionInput="<div class=\"layui-inline\" id=\""+textId+"\" style=\"font-size: 20px;margin: 10px\" draggable=\"true\" ondragstart=\"drag(event)\"></div>"
        var div = document.createElement("div");
        $(div).attr("class", "layui-inline");
        $(div).attr("display", "inline-block");
        $(div).attr("id", textId);
        $(div).attr("style", "font-size: large ;margin: 10px;border:1px solid blue")
        $(div).attr("draggable", "true")
        $(div).attr("ondragstart", "drag(event)")
        var input = "<input  type=\"text\" style='text-align:center' disabled autocomplete=\"off\" lay-verify=\"required|answer\" class=\"layui-input\" name='answeroptions' value=" + choice.replaceAll(" ", "&nbsp;") + ">";
        $(div).append(input);
        $("#fibroptions").append(div);
    }

}

function fillfibrAnswer(fibrdata) {
    $("#operationtools").show();
    $("#fibranswer-area").hide();
    var answerInText = fibrdata.answer_in_text;
    var explanation_in_locale = fibrdata.explanation_in_locale;
    var answercontent = "</br>" + "</br>" + answerInText + "</br>" + "</br>" + explanation_in_locale;

    var params = $("#fibrsearch-form").serializeJson();
    var needTrans = params.trans;
    if (needTrans) {
        var contents = fibrdata.contents;
        if (contents && contents.length > 0) {
            answercontent = answercontent + "<br/>" + "<br/>"+ "<br/>"+ "翻译:" + "<br/>"
            contents.forEach((eachContent) => {
                var type = eachContent.type;
                if (type == "option" || type == "caption") {
                } else {
                    var content = eachContent.content;
                    answercontent = answercontent + "<br/>" + content + "<br/>";
                }
            });
        }else{
            answercontent = answercontent + "<br/>本题暂无翻译<br/>";
        }
    }


    $("#fibranswer-area").html(answercontent);
    setRightAndFaltNum(fibrdata.num, localStorageType);
}

function fibrallowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}


/**
 * 题目中的区域
 * @param ev
 */
function fibrdrop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    console.log(data);
    var target = ev.target;
    var id = target.id;
    //移除未填写的答案的红框,不管有没有
    $(target).attr("style", "text-align:center");
    console.log(id)
    var newData = $("#" + data).children("input").val();
    if (data.endsWith("-")) {
        //代表是从内容中其它位置移动过来的
        //获取到移动过来的数据
        var value = $("#" + data).val();
        newData = value;
        //清除原先位置的数据
        $("#" + data).val("");
        //设置到新的位置
        //  $(target).val(value);
        //移除之前的位置的id
        $("#" + data).removeAttr("id");
        //把id设置给新的位置
        //  $(target).attr("id", data);
        data = data.substring(0, data.length - 1);
        // return;
    }
    //将要放的新内容
    console.log(newData);
    if (id.startsWith("option")) {
        // //代表往一个答案里放答案
        // //先找到父亲,把自己移除
        // var parent = $(target).parent();
        // //加回到选项区
        // $("#fibroptions").append(target);
        // parent.append(document.getElementById(data));
        //根据当前id找到之前的input
        var newid = id.substring(0, id.length - 1);
        console.log(newid);
        //将现在的数据放回去
        var currentValue = $("#" + id).val;
        $("#" + newid).show();
        //设置新数据
    }
    $(target).attr("id", data + "-");
    $(target).val(newData)
    $("#" + data).hide();
}

/**
 * 所有选项区域
 * @param ev
 */
function fibrdrop1(ev) {
    ev.preventDefault();
    //往回拖的答案
    var dataTransfer = ev.dataTransfer;
    var data = dataTransfer.getData("Text");
    console.log(data);
    //如果有data则代表是放回来的,以 option开头和-结尾代表是从题目句子中拖回来的,只有这种情况才懂,如果不是-结尾在代表拖出去没放下就直接拉回来
    if (data && data.startsWith("option") &&data.endsWith("-")) {
        //获取到需要显示的选项的id
        var newid = data.substring(0, data.length - 1);
        //显示
        $("#" + newid).show();
        //移除自己的id
        $("#" + data).val("");//清除内容
        $("#" + data).removeAttr("id");
    }
    //如果没有id则不动
}


function nextFibRQuestion(obj, event) {
    event.preventDefault();
    if (isFibRLast()) {
        $("#fibrnext").hide();
        return false;
    }

    var fibrdata = fibrNextQuest();
    var content = fibrTranslateData(fibrdata);
    if (isFibRLast()) {
        $("#fibrnext").hide();
    }
    $("#fibrquestion-div").html(content);
    // fillfibrAnswer(fibrdata);
    // fillfibrOptions(fibrdata);
    if (!isFibRFirst()) {
        $("#fibrpre").show();
    }
    checkFav(fibrdata.num, localStorageType);
    return false;
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
    return fibrCurrentList[fibrIndex];
}

function cleanfibrfav() {

    layer.confirm('是否清空收藏夹？', {icon: 3}, function () {
        cleanFav(XjFIBRFavlocalStorageType,localStorageType)
        layer.msg('操作完成', {icon: 0}, function () {
        });
        checkFav(currentFibRData().num, localStorageType);
    }, function () {
    });

}
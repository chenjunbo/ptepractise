var currentROList,currentxjroQnumList;
let cnxjroList, enxjroList, xjroIdsList, xjRounCompletedList;
var xjroIdsSet = new Set();
const cnxjroMap = new Map();
const enxjroMap = new Map();
var xjroindex = 0;//当前第几条
var localStorageType = "xjroublue";
function xjroInit() {
    $.ajax({
        url: getGitContentPre()+"/data/ro/roallquestions.txt"+getGitContentAccess(),
        type: "GET",
        crossDomain: true, // 设置为true，则不发送Origin头部
        success: function (response) {
            // 处理响应数据
            var result
            try {
                result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
            } catch (e){
                result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
            }

            cnxjroList = JSON.parse(result);
            for (let i = 0; i < cnxjroList.length; i++) {
                var xjrodata = cnxjroList[i];
                cnxjroMap.set(xjrodata.num + "", xjrodata);
                xjroIdsSet.add(xjrodata.num + "");
            }
        },
        error: function (xhr, status, error) {
            // 处理错误
        }
    });

    $.ajax({
        url: getGitContentPre()+"/data/ro/roallquestionsen.txt"+getGitContentAccess(),
        type: "GET",
        crossDomain: true, // 设置为true，则不发送Origin头部
        success: function (response) {
            // 处理响应数据
            var result
            try {
                result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
            } catch (e){
                result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
            }

            enxjroList = JSON.parse(result);
            for (let i = 0; i < enxjroList.length; i++) {
                var xjrodata = enxjroList[i];
                enxjroMap.set(xjrodata.num + "", xjrodata);
                xjroIdsSet.add(xjrodata.num + "");
            }
            $("#uncompleted").show();

        },
        error: function (xhr, status, error) {
            // 处理错误
        }
    });

}


function xjroCurrentTypedata(param) {
    var qNum = param.qNum;//题号
    var type = param.type;//类型
    var onlyundo = param.onlyundo;//仅未做
    var filePath;
    xjroindex = 0;
    currentROList = new Array();
    currentxjroQnumList = new Array();
    var localstoragedata;
    switch (type) {
        case "-1":
            //猩际黄
            filePath = getGitContentPre()+"/questions/ro/cge_ro_hightest.txt"+getGitContentAccess()
            break;
        case "-2":
            //猩际黄
            filePath = getGitContentPre()+"/questions/ro/xj_fib_ro_huang.txt"+getGitContentAccess()
            break;
        case "-3":
            //猩际绿
            filePath = getGitContentPre()+"/questions/ro/xj_fib_ro_lv.txt"+getGitContentAccess()
            break;
        case "-4":
            //猩际bai
            filePath = getGitContentPre()+"/questions/ro/xj_fib_ro_bai.txt"+getGitContentAccess()
            break;
        case "1":
            //C哥蓝色数据
            filePath = getGitContentPre()+"/questions/ro/cge_xj_ro_lan.txt"+getGitContentAccess()
            break;
        case "2":
            //C哥黄色数据
            filePath = getGitContentPre()+"/questions/ro/cge_xj_ro_huang.txt"+getGitContentAccess()
            break;
        case "3":
            //C哥白色数据
            filePath = getGitContentPre()+"/questions/ro/cge_xj_ro_bai.txt"+getGitContentAccess()
            break;
        case "4":
            //C哥所有数据
            xjRounCompletedList = new Array();
            filePath = getGitContentPre()+"/questions/ro/cge_xj_ro_all.txt"+getGitContentAccess()
            break;
        case "5":
            //自定义数据
            filePath = getGitContentPre()+"/questions/ro/xj_ro_week.txt"+getGitContentAccess()
            break;
        case "6":
            //自定义数据
            filePath = getGitContentPre()+"/questions/ro/xj_ro_month.txt"+getGitContentAccess()
            break;
        case "7":
            var content = getFromLocalStorage("xjroublue");
            if (content) {
                var json = JSON.parse(content);
                localstoragedata = json.nums;
            }
            break;
        case "8":
            filePath = getGitContentPre()+"/questions/ro/xjxj_ro_withoutc.txt"+getGitContentAccess()
            break
        case "-5":
            filePath = getGitContentPre()+"/questions/ro/cge_fib_ro_without_xj.txt"+getGitContentAccess()
            break
        case "9":
            var faltIds = getAllQuestionNumFromLocalStorageByFalt("xjroublue");
            if (faltIds) {
                faltIds.forEach((qNum, index) => {
                    var xjroData = cnxjroMap.get(qNum + "");
                    if (!xjroData) {
                        xjroData = enxjroMap.get(qNum + "");
                    }
                    if (xjroData) {
                        currentROList.push(xjroData);
                        currentxjroQnumList.push(qNum);
                    }
                })
            }

            break;

    }
    //当前数据
    if (filePath) {
        $.ajaxSettings.async = false;
        $.get(filePath, function (response) {
            // let qNums = decodeURIComponent(escape(window.atob(response.content))).split(/[(\r\n)\r\n]+/); // 根据换行或者回车进行识别
            var qNums;
            try {
                qNums = decodeURIComponent(escape(window.atob(response.content))).split(/[(\r\n)\r\n]+/); // 根据换行或者回车进行识别
            }catch (e) {
                 qNums = response.split(/[(\r\n)\r\n]+/);;
            }


            qNums.forEach((item, index) => { // 删除空项
                if (qNum && qNum != item) {

                } else {
                    if (!item) {
                        qNums.splice(index, 1);
                    } else {
                        if (onlyundo) {
                            var rightLocal = getFromLocalStorage(item + "right" + localStorageType);
                            var faltlocal = getFromLocalStorage(item + "falt" + localStorageType);
                            if (rightLocal || faltlocal) {
                                //已经做了,不处理
                            }else{

                                var xjroData = cnxjroMap.get(item + "");
                                if (!xjroData) {
                                    xjroData = enxjroMap.get(item + "");
                                }
                                if (xjroData) {
                                    currentROList.push(xjroData);
                                    currentxjroQnumList.push(item);
                                } else {
                                    if ("4" == type) {
                                        xjRounCompletedList.push(item);
                                    }
                                }
                            }
                        }else{

                            var xjroData = cnxjroMap.get(item + "");
                            if (!xjroData) {
                                xjroData = enxjroMap.get(item + "");
                            }
                            if (xjroData) {
                                currentROList.push(xjroData);
                                currentxjroQnumList.push(item);
                            } else {
                                if ("4" == type) {
                                    xjRounCompletedList.push(item);
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
                    localstoragedata.splice(index, 1);
                } else {
                    var xjroData = cnxjroMap.get(item + "");
                    if (!xjroData) {
                        xjroData = enxjroMap.get(item + "");
                    }
                    if (xjroData) {
                        currentROList.push(xjroData);
                        currentxjroQnumList.push(item);
                    }
                }
            }
        });
    }
    console.log(currentROList.length);
    // return xjroTranslateData();
    // return currentROList[index]
    return currentROList;
}


function xjroTranslateData(xjrodata) {
    var nameWithoutNum = xjrodata.name_without_num;
    nameWithoutNum = nameWithoutNum.replaceAll(" ", "&nbsp;");
    var num = xjrodata.num;
    var paras = xjrodata.paras;
    $("#question-div").children("#biaotiquyu").remove();
    $("#parasdiv").html("")
    $("#resultdiv").html("")
    var title = "<div class=\"layui-form-item\" id='biaotiquyu'><div class=\"layui-inline\"><label  style=\"white-space:nowrap\">第" + (xjroindex + 1) + "题/共" + (currentROList.length) + "题, 题号:" + num + "&nbsp;&nbsp;" + nameWithoutNum + "&nbsp;&nbsp;</label><div class=\"layui-inline\"><span style=\"color: red\" id=\"timer\"></span></div></div></div>";
    // var parent = "<div class=\"layui-inline\" style=\"width: 45%; border:1px solid blue;\" id=\"parasdiv\" ondrop=\"rodrop1(event)\" ondragover=\"roallowDrop(event)\"></div>";
    // var resultdiv = "<div class=\"layui-inline\" style=\"width: 45%; border:1px solid blue;margin-left: 20px;\" id=\"resultdiv\" ondrop=\"rodrop(event)\" ondragover=\"roallowDrop(event)\"></div>";

    $("#question-div").prepend(title);
    // $("#question-div").append(parent);
    // $("#question-div").append(resultdiv);
    // shuffle(paras);
    var height = 0;
    for (var key in paras) {
        var choice = paras[key];
        if (choice) {
            var serNum = choice.order;//答案顺序
            var id = choice.id;//默认
            var option = choice.para;//顺序
            var divid = "div" + serNum;
            var parentin = $("<div style='margin-top: 5px;border: 1px solid blue;padding-left: 5px'  id=" + divid + "> </div>");
            // var input = document.createElement("input");
            // $(parentin).attr("type", "text");
            // $(parentin).attr("value", option);
            // $(parentin).attr("disabled", "disabled");
            // $(input).attr("autocomplete", "off");
            // $(input).attr("lay-verify", "answer");
            // $(input).attr("class", "layui-input");
            $(parentin).attr("name", "answeroptions");
            // $(input).attr("style", "text-align:center");
            $(parentin).attr("draggable", "true")
            $(parentin).attr("ondragstart", "rodrag(event)")
            $(parentin).attr("realanswer", serNum);
            $(parentin).html(id + ". " + option)
            // parentin.append(input);
            $("#parasdiv").append(parentin)
            var height1 = $(parentin).height();
            height = height + height1 + 7;
        }
    }
    // var height = $("#parasdiv").height();
    $("#parasdiv").height(height);
    $("#resultdiv").height(height);
    // fibrIndex++;
    $("#parasdiv").show();
    $("#resultdiv").show();
    startTimer();
    return title;
}


function createxjroPdfHtml(parmas, serNum, xjroData) {
    var shunkouliu = parmas.shunkouliu;//是否需要中文

    var questionDiv = document.createElement("div");
    $(questionDiv).attr("style", "padding-left: 20px;padding-right: 20px;line-height: 30px;font-size: large;width:90%;");
    var anserDive = document.createElement("div");
    $(anserDive).attr("class", "layui-form-item");
    var analysispre = document.createElement("pre");
    $(analysispre).attr("class", "answer-area");
    $(analysispre).attr("style", "font-size: 18px;font-family: Arial;word-wrap:break-word;");

    //内容
    var nameWithoutNum = xjroData.name_without_num;//名字
    nameWithoutNum = nameWithoutNum.replaceAll(" ", "&nbsp;");
    var num = xjroData.num;//题号
    var text = "";//
    var choices = xjroData.choices;//选项
    var h3 = document.createElement("h3");
    h3.innerHTML = serNum + "." + "&nbsp;" + "&nbsp;" + nameWithoutNum + "&nbsp;" + "&nbsp;题号:" + num + "<br/>" + "<br/>";
    $(questionDiv).append(h3);
    var contents = xjroData.contents;
    if (contents&&contents.length>0) {
        contents.forEach((eachContent)=>{
            var content = eachContent.content;
            text=text+content+"<br/>"
        });
    }else{
        text=xjroData.text+"<br/>";
    }
    if (shunkouliu) {
        var explanation_in_locale = xjroData.explanation_in_locale;
        if (!explanation_in_locale) {
            explanation_in_locale = "本题目无顺口溜";
        }
        text = text + "<br/>" +"<span style='color: red'>顺口溜:</span>" + "<br/>"+explanation_in_locale;
    }

    $(questionDiv).append(text + "<br/>" + "<br/>");

    return questionDiv;

}


function xjroRandomLucky() {
    if (!xjroIdsList || xjroIdsList.length == 0) {
        xjroIdsList = Array.from(xjroIdsSet);
    }
    xjroindex = 0;
    currentROList = new Array();
    shuffle(xjroIdsList);
    var nums = Math.floor(Math.random() * (5 - 4 + 1)) + 4;
    for (var i = 0; i < nums; i++) {
        var xjrodata = cnxjroMap.get(xjroIdsList[i]);
        if (!xjrodata) {
            xjrodata = enxjroMap.get(xjroIdsList[i]);
        }
        currentROList.push(xjrodata);
    }
    return currentROList[0];
}


function roallowDrop(ev) {
    ev.preventDefault();
}

function rodrag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}

/*

 */
/**
 * 移动到答案区已经存在的答案上面
 * @param ev
 */
function rodrop2(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    var sourceid = ev.dataTransfer.getData("Text");//被拖拽的组件的id
    console.log(sourceid);
    var target = ev.target;//目标区域的id
    var id = target.id;
    //放到自己的前面
    if (sourceid.startsWith("jieguoqu")) {
        //如果是自己的兄弟位置过来的,把兄弟先移除再放到自己前面
        // $("#"+sourceid).remove();
        $(target).before($("#" + sourceid));
    } else if (sourceid.startsWith("div")) {
        //如果是来自选项区域的,从选项区域隐藏后创建新的div放到自己前面
        //代表是从内容中其它位置移动过来的
        //获取到移动过来的数据
        var value = $("#" + sourceid).html();
        var resultdivin = $("<div style='margin-top: 5px;border: 1px solid blue;padding-left: 5px'> </div>");
        $(resultdivin).attr("ondrop", "rodrop2(event)");//设置组件放到自己身上时候的操作
        $(resultdivin).attr("ondragover", "roallowDrop(event)");
        $(resultdivin).attr("draggable", "true");
        $(resultdivin).attr("ondragstart", "rodrag(event)");
        $(resultdivin).attr("jieguorealanswer", $("#" + sourceid).attr("realanswer"));
        $(resultdivin).attr("id", "jieguoqu" + sourceid);
        $(resultdivin).html(value)
        $(target).before(resultdivin);
        // return;
        var height = $("#parasdiv").height();//获取之前的高度
        $("#" + sourceid).hide();
        $("#parasdiv").height(height);//重新设置高度.避免变矮
    }
}

/**
 * 答案区接收拖拽的操作
 * @param ev
 */
function rodrop(ev) {
    ev.preventDefault();
    var sourceid = ev.dataTransfer.getData("Text");//被拖拽的组件的id
    console.log(sourceid);
    var target = ev.target;//目标区域的id
    var id = target.id;
    //移除未填写的答案的红框,不管有没有
    console.log(id)
    if (sourceid.startsWith("div")) {//从选项区域移动过来的
        //代表是从内容中其它位置移动过来的
        //获取到移动过来的数据
        var value = $("#" + sourceid).html();
        newData = value;
        //清除原先位置的数据
        //  $("#" + sourceid).html("");
        //设置到新的位置
        //  $(target).val(value);
        //移除之前的位置的id
        // $("#" + data).removeAttr("id");
        //把id设置给新的位置
        //  $(target).attr("id", data);
        var resultdivin = $("<div style='margin-top: 5px;border: 1px solid blue;padding-left: 5px'> </div>");
        $(resultdivin).attr("ondrop", "rodrop2(event)");//设置组件放到自己身上时候的操作
        $(resultdivin).attr("ondragover", "roallowDrop(event)");
        $(resultdivin).attr("draggable", "true");
        $(resultdivin).attr("ondragstart", "rodrag(event)");
        $(resultdivin).attr("jieguorealanswer", $("#" + sourceid).attr("realanswer"));
        $(resultdivin).attr("id", "jieguoqu" + sourceid);
        $(resultdivin).html(value)
        $("#resultdiv").append(resultdivin);
        // return;
        var height = $("#parasdiv").height();//获取之前的高度
        $("#" + sourceid).hide();
        $("#parasdiv").height(height);//重新设置高度.避免变矮
    } else if (sourceid.startsWith("jieguoqu")) {
        //代表在结果区域内移动自己
        //先把自己移除,再把自己加到后面
        // $("#" + sourceid).remove();
        $("#resultdiv").append($("#" + sourceid));
    }


}

/**
 * 放回选项区
 * @param ev
 */
function rodrop1(ev) {
    ev.preventDefault();
    //往回拖的答案
    var dataTransfer = ev.dataTransfer;
    var sourceid = dataTransfer.getData("Text");
    console.log(sourceid);
    //如果有id说明是有内容,并且只能是从答案的结果区拖动回来
    if (sourceid && sourceid.startsWith("jieguoqu")) {
        //获取到需要显示的选项的在原始位置的id
        var newid = sourceid.substring(sourceid.indexOf("jieguoqu") + 8, sourceid.length);
        //显示原始区域
        $("#" + newid).show();
        //移除当前被拖动的
        $("#" + sourceid).remove();
    }
    //如果没有id则不动
}


function xjroNextQuest() {
    if (xjroindex < currentROList.length - 1) {
        xjroindex++;
    }
    // var result = xjroTranslateData();
    // return result;
    return currentROList[xjroindex];
}

function xjroPreQuest() {
    if (xjroindex > 0) {
        xjroindex--;
    }
    // var result = xjroTranslateData();
    // return result;
    return currentROList[xjroindex];
}


function rosearch(localStorageType) {
    $("#pre").hide();
    // var content = fibRwGetdata($("#xjrosearch-form").serializeJson());
    xjroCurrentTypedata($("#xjrosearch-form").serializeJson())
    var xjrodata = currentXjRoData();
    if (!xjrodata) {
        $("#question-form").hide();
        layer.msg('当前分类下不存在该题目', {icon: 0}, function () {
            // layer.msg('提示框关闭后的回调');
        });
        return false;
    } else {
        $("#question-form").show();
    }
    var content = xjroTranslateData(xjrodata);
    // $("#question-div").html(content);
    fillXjroAnswer(xjrodata, localStorageType);
    if (isXjRoLast()) {
        $("#next").hide();
    } else {
        $("#next").show();
    }
    if (getXjRoTotalNum() == 1) {
        $("#gotoarea").hide();
    } else {
        $("#gotoarea").show();
    }
    checkFav(xjrodata.num, localStorageType);

}
function checkxjrolastquestion() {
    var qnum = getlastquestion(localStorageType)
    if (qnum) {
        var qIndex = -1;
        if ((qIndex = currentxjroQnumList.indexOf(qnum)) == 1) {
            qIndex = currentxjroQnumList.indexOf(parseInt(qnum));
        }
        if (qIndex != -1) {
            layer.confirm('检查到上次刷题题号:'+qnum+" 是否跳转", {icon: 3}, function () {
                rogotoindex(qIndex + 1);
                layer.msg('操作完成', {icon: 0}, function () {
                });
            }, function () {
                return;
            });

        }
    }
}

function testlucky(localStorageType) {
    $("#pre").hide();
    // var content = fibRwGetdata($("#xjrosearch-form").serializeJson());
    var xjrodata = xjroRandomLucky();
    if (!xjrodata) {
        $("#question-form").hide();
        layer.msg('加载资源中,等一下点击或者刷新一下重新测试', {icon: 0}, function () {
            // layer.msg('提示框关闭后的回调');
        });
        return false;
    } else {
        $("#question-form").show();
    }
    var content = xjroTranslateData(xjrodata);
    // $("#question-div").html(content);
    fillXjroAnswer(xjrodata, localStorageType);
    if (isXjRoLast()) {
        $("#next").hide();
    } else {
        $("#next").show();
    }
    if (getXjRoTotalNum() == 1) {
        $("#gotoarea").hide();
    } else {
        $("#gotoarea").show();
    }
    checkFav(xjrodata.num, localStorageType);
}

function deleteallrorightorfalt(localStorageType) {
    //移除所有数据
    layer.confirm('是否删清空本题型的对错记录？', {icon: 3}, function () {
        clearAllFaltByType(localStorageType);
        try {
            var xjrodata = currentXjRoData();
            if (xjrodata) {
                setRightAndFaltNum(xjrodata.num, localStorageType);
            }
        } catch (e) {

        }
        layer.msg('操作完成', {icon: 0}, function () {
        });
    }, function () {
    });
}

function clearrorightorfalt(localStorageType) {
    layer.confirm('是否删除本题的对错记录？', {icon: 3}, function () {
        var xjrodata = currentXjRoData();
        if (xjrodata) {
            deleteRightOrFaltByQnum(xjrodata.num, localStorageType);
            setRightAndFaltNum(xjrodata.num, localStorageType);
        }
        layer.msg('操作完成', {icon: 0}, function () {
        });
    }, function () {
    });
}


function nextXjRoQuestion(obj, localStorageType) {
    if (isXjRoLast()) {
        $("#next").hide();
        return false;
    }

    var xjrodata = xjroNextQuest();
    var content = xjroTranslateData(xjrodata);
    if (isXjRoLast()) {
        $("#next").hide();
    }
    fillXjroAnswer(xjrodata, localStorageType);
    $("#operationtools").show();
    if (!isXjRoFirst()) {
        $("#pre").show();
    }
    checkFav(xjrodata.num, localStorageType);
}

function fillXjroAnswer(xjrodata, localStorageType) {
    $("#operationtools").show();
    $("#xjroanswer").hide();
    var answerInText = xjrodata.answer_in_text;
    var originalText = xjrodata.original_text;
    var explanation_in_locale = xjrodata.explanation_in_locale;
    if (!explanation_in_locale) {
        explanation_in_locale = "本题目无顺口溜";
    }
    explanation_in_locale = "<span style= \"color: red\">" + explanation_in_locale + "</span>";
    var answercontent = "</br>" + "</br>" + answerInText + "</br>" + "</br>" + explanation_in_locale + "</br>" + "</br>" + originalText+"<br/>"+"<br/>"+"<br/>";
    var param = $("#xjrosearch-form").serializeJson();
    var needChinese = param.chinese;
    if (needChinese) {
        var contents = xjrodata.contents;
        if (contents&&contents.length>0) {
            contents.forEach((eachContent)=>{
                var content = eachContent.content;
                answercontent=answercontent+content+"<br/>"
            });
        }


    }

    $("#xjroanswer").html(answercontent);
    setRightAndFaltNum(xjrodata.num, localStorageType);
}

function ropre(localStorageType) {
    if (isXjRoFirst()) {
        $("#pre").hide();
        return false;
    }

    var xjrodata = xjroPreQuest();
    var content = xjroTranslateData(xjrodata);
    if (isXjRoFirst()) {
        $("#pre").hide();
    }
    if (!isXjRoLast()) {
        $("#next").show();
    }
    fillXjroAnswer(xjrodata, localStorageType);
    checkFav(xjrodata.num, localStorageType);
}

function rocheckanswer(obj, localStorageType) {
    var xjrodata = currentXjRoData();
    var isWrong = false;
    var isEmpty = false;
    //获取选项区数据
    var parasdivElements = $("#parasdiv div");
    parasdivElements.each(function (index, currentdiv) {
        if ($(currentdiv).is(":hidden")) {
            //隐藏的说明已经放过去了
        } else {
            //说明没放过去
            isEmpty = true;
            //设置颜色
            $(currentdiv).attr("style", "margin-top: 5px;border: 1px solid red;padding-left: 5px");


        }
    })
    if (isEmpty) {
        layer.msg('需要全部排序!', {icon: 0}, function () {
            // layer.msg('提示框关闭后的回调');
            //添加错误次数
        });
        addRightOrFalt(xjrodata.num, "falt", localStorageType);
        setRightAndFaltNum(xjrodata.num, localStorageType);
        return;
    }

    var val = xjrodata.answer_in_text;//答案顺序
    var orderIdMap = new Map();
    var paras = xjrodata.paras;
    paras.forEach(function (item) {
        var order = item.order;
        var id = item.id;
        orderIdMap.set(order + "", id + "");
    })
    val = val.replace(/\s+/g, "");
    var allAnswers = val.split(",");//所有答案
    //获取结果区数据
    var resultdivElements = $("#resultdiv div");
    //遍历所有的选项,拿到每一个的应该是几,然后看看和答案对应位置的数据是不是一致

    resultdivElements.each(function (index, currentElement) {
        var answer = allAnswers[index];
        var jieguorealanswer = $(currentElement).attr("jieguorealanswer");
        var id = orderIdMap.get(jieguorealanswer + "");
        if (answer != id) {
            isWrong = true;
            $(currentElement).attr("style", "margin-top: 5px;border: 1px solid red;padding-left: 5px");
        } else {
            $(currentElement).attr("style", "margin-top: 10px;border: 1px solid blue;padding-left: 5px");
        }
    })

    if (!isWrong) {
        addRightOrFalt(xjrodata.num, "right", localStorageType);
        layer.msg('全部正确,考试必过!', {icon: 0, time: 800}, function () {
            var serializeJson = $("#xjrosearch-form").serializeJson();
            var autonext = serializeJson.autonext;
            //添加正确次数,添加错误次数
            // layer.msg('提示框关闭后的回调');
            if (!isXjRoLast()&&autonext) {
                nextXjRoQuestion(obj, localStorageType);
            }
        });
    } else {
        layer.msg('答案不小心选错了哟!', {icon: 0}, function () {
            // layer.msg('提示框关闭后的回调');
            //添加错误次数
        });
        addRightOrFalt(xjrodata.num, "falt", localStorageType);
        setRightAndFaltNum(xjrodata.num, localStorageType);
    }

}

function showroanswerarea() {
    if ($("#xjroanswer").is(":hidden")) {
        $("#xjroanswer").show();
    } else {
        $("#xjroanswer").hide();
    }
}

function rogotoindex(qIndex) {
    console.log(qIndex);
    if (!qIndex || qIndex <= 0 || qIndex > getXjRoTotalNum) {

    } else {
        setXjRoIndex(parseInt(qIndex));
        var xjrodata = currentXjRoData();
        if (!xjrodata) {
            layer.msg('超出题目数量范围', {icon: 0}, function () {
            });
            return false;
        }
        var content = xjroTranslateData(xjrodata);
        if (isXjRoFirst()) {
            $("#pre").hide();
        } else {
            $("#pre").show();
        }
        if (!isXjRoLast()) {
            $("#next").show();
        } else {
            $("#next").hide();
        }
        // $("#question-div").html(content);
        fillXjroAnswer(xjrodata, localStorageType);
        checkFav(xjrodata.num, localStorageType);
        return false;
    }
}

function roadddeletefav(localStorageType) {
    var xjrodata = currentXjRoData();
    if (!xjrodata) {
        layer.msg('题目无效', {icon: 0}, function () {
        });
        return false;
    }
    var isContains = containsValue(xjrodata.num, localStorageType);
    if (isContains) {
        layer.confirm('是否删除收藏？', {icon: 3}, function () {
            removeFavFromLocalStorage(xjrodata.num, localStorageType);
            layer.msg('操作完成', {icon: 0}, function () {
            });
            checkFav(xjrodata.num, localStorageType);
        }, function () {
        });

    } else {
        layer.confirm('是否添加到收藏？', {icon: 3}, function () {
            add2LocalStorage("xjroublue", xjrodata.num, localStorageType)
            layer.msg('操作完成', {icon: 0}, function () {
            });
            checkFav(xjrodata.num, localStorageType);
        }, function () {
        });

    }
}


function xjROUncompleted() {
    if (xjRounCompletedList && xjRounCompletedList.length > 0) {
        $("#question-form").show();
        $("#parasdiv").children().remove();
        $("#resultdiv").children().remove();
        $("#question-div").append("<br/>不完整id:" + xjRounCompletedList.join(", ")+"请根据id去🦍中单独查询");
        $("#operationtools").hide();
    } else {
        xjRounCompletedList = new Array();
        $.ajaxSettings.async = false;
        $.get(getGitContentPre()+"/questions/ro/cge_xj_ro_all.txt"+getGitContentAccess(), function (response) {
            var qNums;
            try {
                qNums = decodeURIComponent(escape(window.atob(response.content))).split(/[(\r\n)\r\n]+/); // 根据换行或者回车进行识别
            }catch (e) {
                qNums = response.split(/[(\r\n)\r\n]+/);;
            }
            qNums.forEach((item, index) => { // 删除空项

                if (!item) {
                    qNums.splice(index, 1);
                } else {
                    var xjrodata = cnxjroMap.get(item);
                    if (!xjrodata) {
                        xjrodata = enxjroMap.get(item);
                    }
                    if (xjrodata) {
                    } else {
                        xjRounCompletedList.push(item);
                    }

                }
            })
            $("#question-form").show();
            $("#parasdiv").children().remove();
            $("#resultdiv").children().remove();
            $("#question-div").append("<br/>不完整id:" + xjRounCompletedList.join(", ")+"请根据id去🦍中单独查询");
            $("#operationtools").hide();
        });
        $.ajaxSettings.async = true;
    }
}


function isXjRoFirst() {
    return xjroindex == 0;
}

function isXjRoLast() {
    return xjroindex == currentROList.length - 1;
}

function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}

function getXjRoindex() {
    return xjroindex;
}


function getXjRoTotalNum() {
    return currentROList.length;
}

function setXjRoIndex(qindex) {
    xjroindex = qindex - 1;
}

function currentXjRoData() {
    return currentROList[xjroindex];
}

function currentXjRoListData() {
    return currentROList;
}

$.fn.serializeJson = function () {
    var serializeObj = {};
    var array = this.serializeArray();
    $.each(array, function () {
        if (serializeObj[this.name] !== undefined) {
            if (!serializeObj[this.name].push) {
                serializeObj[this.name] = [serializeObj[this.name]];
            }
            serializeObj[this.name].push(this.value || '');
        } else {
            serializeObj[this.name] = this.value || '';
        }
    });
    return serializeObj;
}

function cleanxjrofav() {
    layer.confirm('是否清空收藏夹？', {icon: 3}, function () {
        cleanFav(localStorageType,localStorageType)
        layer.msg('操作完成', {icon: 0}, function () {
        });
        checkFav(currentXjRoData().num, localStorageType);
    }, function () {
    });

}
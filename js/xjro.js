var currentROList;
let cnxjroList, enxjroList;
const cnxjroMap = new Map();
const enxjroMap = new Map();
var xjroindex = 0;//当前第几条

function xjroInit() {
    $.ajax({
        url: "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/roallquestions.txt?access_token=c87299575627265144b7db286d3bf673",
        type: "GET",
        crossDomain: true, // 设置为true，则不发送Origin头部
        success: function (response) {
            // 处理响应数据
            var result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
            cnxjroList = JSON.parse(result);
            for (let i = 0; i < cnxjroList.length; i++) {
                var xjrodata = cnxjroList[i];
                cnxjroMap.set(xjrodata.num+"", xjrodata);
            }
        },
        error: function (xhr, status, error) {
            // 处理错误
        }
    });

    $.ajax({
        url: "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/roallquestionsen.txt?access_token=c87299575627265144b7db286d3bf673",
        type: "GET",
        crossDomain: true, // 设置为true，则不发送Origin头部
        success: function (response) {
            // 处理响应数据
            var result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
            enxjroList = JSON.parse(result);
            for (let i = 0; i < enxjroList.length; i++) {
                var xjrodata = enxjroList[i];
                enxjroMap.set(xjrodata.num+"", xjrodata);
            }
        },
        error: function (xhr, status, error) {
            // 处理错误
        }
    });
}


function xjroCurrentTypedata(param) {
    var qNum = param.qNum;//题号
    var type = param.type;//类型
    var filePath;
    index = 0;
    currentROList = new Array();
    var localstoragedata;
    switch (type) {
        case "1":
            //C哥蓝色数据
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/cge_xj_ro_lan.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "2":
            //C哥黄色数据
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/cge_xj_ro_huang.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "3":
            //C哥白色数据
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/cge_xj_ro_bai.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "4":
            //C哥所有数据
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/cge_xj_ro_all.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "5":
            //自定义数据
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/xj_ro_week.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "6":
            //自定义数据
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/xj_ro_month.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "7":
            var content = getFromLocalStorage("xjroublue");
            if (content) {
                var json = JSON.parse(content);
                localstoragedata = json.nums;
            }
            break;
        case "8":
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/xjxj_ro_withoutc.txt?access_token=c87299575627265144b7db286d3bf673"
            break

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
                        var xjroData = cnxjroMap.get(item+"");
                        if (!xjroData) {
                            xjroData = enxjroMap.get(item+"");
                        }
                        if (xjroData) {
                            currentROList.push(xjroData);
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
                    var xjroData = cnxjroMap.get(item+"");
                    if (!xjroData) {
                        xjroData = enxjroMap.get(item+"");
                    }
                    if (xjroData) {
                        currentROList.push(xjroData);
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



function xjroTranslateData(xjrodata){
    var nameWithoutNum = xjrodata.name_without_num;
    nameWithoutNum = nameWithoutNum.replaceAll(" ", "&nbsp;");
    var num = xjrodata.num;
    var paras = xjrodata.paras;
    $("#question-div").remove("#biaotiquyu");
    $("#parasdiv").children().remove();
    $("#resultdiv").children().remove();
    var title = "<div class=\"layui-form-item\" id='biaotiquyu'><label class=\"layui-form-label\" style=\"white-space:nowrap\">第" + (fibrIndex + 1) + "题/共" + (currentROList.length) + "题, 题号:" + num + "&nbsp;&nbsp;" + nameWithoutNum + "</label></div>";
    // var parent = "<div class=\"layui-inline\" style=\"width: 45%; border:1px solid blue;\" id=\"parasdiv\" ondrop=\"rodrop1(event)\" ondragover=\"roallowDrop(event)\"></div>";
    // var resultdiv = "<div class=\"layui-inline\" style=\"width: 45%; border:1px solid blue;margin-left: 20px;\" id=\"resultdiv\" ondrop=\"rodrop(event)\" ondragover=\"roallowDrop(event)\"></div>";

    $("#question-div").prepend(title);
    // $("#question-div").append(parent);
    // $("#question-div").append(resultdiv);
    // shuffle(paras);
    for (var key in paras) {
        var choice = paras[key];
        if (choice) {
            var serNum = choice.order;//顺序
            var option = choice.para;//顺序
            var divid = "div" + serNum;
            var parentin = $("<div style='margin-top: 10px;border: 1px solid red;padding-left: 5px'  id=" + divid + "> </div>");
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
            $(parentin).html(option)
            // parentin.append(input);
            $("#parasdiv").append(parentin)
        }
    }
    $("#resultdiv").height($("#parasdiv").height());
    // fibrIndex++;
    return title ;
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
        $(target).before($("#"+sourceid));
    }else if (sourceid.startsWith("div")) {
        //如果是来自选项区域的,从选项区域隐藏后创建新的div放到自己前面
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
        var resultdivin = $("<div style='margin-top: 10px;border: 1px solid red;padding-left: 5px'> </div>");
        $(resultdivin).attr("ondrop", "rodrop2(event)");//设置组件放到自己身上时候的操作
        $(resultdivin).attr("ondragover", "roallowDrop(event)");
        $(resultdivin).attr("draggable", "true");
        $(resultdivin).attr("ondragstart", "rodrag(event)");
        $(resultdivin).attr("id", "jieguoqu" + sourceid);
        $(resultdivin).html(value)
        $(target).before(resultdivin);
        // return;
        var height = $("#parasdiv" ).height();//获取之前的高度
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
    $(ev.dataTransfer).attr("style", "text-align:center");
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
        var resultdivin = $("<div style='margin-top: 10px;border: 1px solid red;padding-left: 5px'> </div>");
        $(resultdivin).attr("ondrop", "rodrop2(event)");//设置组件放到自己身上时候的操作
        $(resultdivin).attr("ondragover", "roallowDrop(event)");
        $(resultdivin).attr("draggable", "true");
        $(resultdivin).attr("ondragstart", "rodrag(event)");
        $(resultdivin).attr("id", "jieguoqu" + sourceid);
        $(resultdivin).html(value)
        $("#resultdiv").append(resultdivin);
        // return;
        var height = $("#parasdiv" ).height();//获取之前的高度
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
        var newid = sourceid.substring(sourceid.indexOf("jieguoqu")+8, sourceid.length);
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
    fillAnswer(xjrodata);
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

function nextXjRoQuestion(obj, event,localStorageType) {
    event.preventDefault();
    if (isXjRoLast()) {
        $("#next").hide();
        return false;
    }

    var xjrodata = xjroNextQuest();
    var content = xjroTranslateData(xjrodata);
    if (isXjRoLast()) {
        $("#next").hide();
    }
    $("#question-div").html(content);
    fillAnswer(xjrodata);
    if (!isXjRoFirst()) {
        $("#pre").show();
    }
    checkFav(xjrodata.num, localStorageType);
    return false;
}
function fillAnswer(xjrodata,localStorageType) {
    $("#xjroanswer").hide();
    var answerInText = xjrodata.answer_in_text;
    var originalText = xjrodata.original_text;
    var explanation_in_locale = xjrodata.explanation_in_locale;
    if (!explanation_in_locale) {
        explanation_in_locale = "本题目无顺口溜";
    }
    var answercontent = "</br>" + "</br>" + answerInText + "</br>" + "</br>" + originalText+ "</br>" + "</br>" + explanation_in_locale;
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
    $("#question-div").html(content);
    fillAnswer(xjrodata);
    checkFav(xjrodata.num, localStorageType);
}

function rocheckanswer(obj,event,localStorageType) {
    var xjrodata = currentXjRoData();
    var content = JSON.stringify($("#question-form").serializeJson());
    var result = $("#question-form").serializeJson();
    var isWrong = false;
    for (var ans in result) {
        if (!ans || !ans.startsWith("answer")) {
            continue;
        }
        console.log(result[ans]);
        var answer = result[ans];
        var select = $("#" + ans);
        console.log($(select))
        if (!answer || answer.startsWith("false")) {
            // $(allSelects[i]).addClass("layui-form-danger");
            $(select).removeClass();
            $(select).attr("class", "layui-form-danger");
            isWrong = true;
        }

    }
    if (!isWrong) {
        addRightOrFalt(xjrodata.num, "right", localStorageType);
        layer.msg('全部正确,考试必过!', {icon: 0, time: 800}, function () {
            //添加正确次数,添加错误次数
            // layer.msg('提示框关闭后的回调');
            if (!isXjRoLast()) {
                nextXjRoQuestion(obj, event,localStorageType);
                form.render();
            }
        });
    } else {
        addRightOrFalt(xjrodata.num, "falt", localStorageType);
        layer.msg('答案不小心选错了哟!', {icon: 0}, function () {
            // layer.msg('提示框关闭后的回调');
            //添加错误次数
        });
    }
    setRightAndFaltNum(xjrodata.num, localStorageType);
}

function showroanswerarea() {
    if ($("#xjroanswer").is(":hidden")) {
        $("#xjroanswer").show();
    } else {
        $("#xjroanswer").hide();
    }
}

function rogotoindex(localStorageType) {
    var qIndex = $("#qindex").val();//想要跳转的题目
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
        $("#question-div").html(content);
        fillAnswer(xjrodata);
        checkFav(xjrodata.num, localStorageType);
        form.render();
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
            removeFromLocalStorage(xjrodata.num, localStorageType);
            layer.msg('操作完成', {icon: 0}, function () {
            });
            checkFav(xjrodata.num, localStorageType);
        }, function () {
        });

    } else {
        layer.confirm('是否添加到收藏？', {icon: 3}, function () {
            add2LocalStorage("fibrwblue", xjrodata.num, localStorageType)
            layer.msg('操作完成', {icon: 0}, function () {
            });
            checkFav(xjrodata.num, localStorageType);
        }, function () {
        });

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

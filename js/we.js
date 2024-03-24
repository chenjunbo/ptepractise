var weCurrentList;
let weAllDataList;
const weMap = new Map();
var weIndex = 0;//当前第几条
function fireFlyWeInit() {
    $.get("https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/we/fireflywe.txt?access_token=c87299575627265144b7db286d3bf673", function (response) {
        var result=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        weAllDataList= JSON.parse(result);
        for (let i = 0; i < weAllDataList.length; i++) {
            var weData = weAllDataList[i];
            weMap.set(weData.id+"", weData);
        }
    })
}

function fireflyWeCurrentTypedata(param) {
    var qNum = param.qNum;//题号
    var type = param.type;//类型
    var filePath;
    weIndex = 0;
    weCurrentList = new Array();
    var localstoragedata;
    switch (type) {
        case "1":
            //高频预测
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/we/fireflyweprediction.txt?access_token=c87299575627265144b7db286d3bf673"
            break;
        case "2":

            break;
        case "3":
            var content = getFromLocalStorage("fireflywe");
            if (content) {
                var json = JSON.parse(content);
                localstoragedata = json.nums;
            }
            break;

    }

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
                        var weData = weMap.get(item+"");
                        if (weData) {
                            weCurrentList.push(weData);
                        }
                    }
                }
            })

        });
        $.ajaxSettings.async = true;
    }else if (localstoragedata) {
        localstoragedata.forEach((item, index) => { // 删除空项
            if (qNum && qNum != item) {

            } else {
                if (!item) {
                    localstoragedata.splice(index, 1);
                } else {
                    var weData = weMap.get(item+"");
                    if (weData) {
                        weCurrentList.push(weData);
                    }
                }
            }
        })
    }else{
        if (qNum) {
            var weData = weMap.get(qNum+"");
            if (weData) {
                weCurrentList.push(weData);
            }
        }else{
            weCurrentList = weAllDataList;
        }
    }
    //全部已经整理
    // weCurrentList = weAllDataList;
    console.log(weCurrentList.length);
    return weCurrentList;

}

function fireFlyWeTranslateData(fireflyWeData,params){
    var num = fireflyWeData.id;
    var name = fireflyWeData.title;
    var text = "";
    var title = "<div class=\"layui-form-item\"><label class=\"layui-form-label\" style=\"white-space:nowrap\">第" + (weIndex + 1) + "题/共" + (weCurrentList.length) + "题, 题号:" + num + "&nbsp;&nbsp;" + name +  "&nbsp;&nbsp;</label><div class=\"layui-inline\"><span style=\"color: red\" id=\"timer\"></span></div></div>"
    text = text + title+"<br>"  +fireflyWeData.question+"<br>";
    var example = params.example;
    var view = params.view;
    if (view) {
        text = text + "<br>观点:(仅供参考)" + "<br>" + "<pre className=\"answer-area\" lay-options=\"{}\" style=\"font-size: 20px;font-family: Arial\">" + fireflyWeData.views + "</pre>";
    }
    if (example) {
        var exampleContent = fireflyWeData.example;
        if (!exampleContent) {
            exampleContent="暂无范文"
        }
        text = text +"<br/>"+ "<br/>范文(仅供参考):" + "<br>" + exampleContent;
    }
    startTimer();
    return text;
}


function wesearch(localStorageType) {
    $("#pre").hide();
    var params = $("#fireflywe-form").serializeJson();
    fireflyWeCurrentTypedata(params);
    var fireFlyWeData = currentWeData();
    if (!fireFlyWeData) {
        $("#question-form").hide();
        layer.msg('当前分类下不存在该题目', {icon: 0}, function () {
            // layer.msg('提示框关闭后的回调');
        });
        return false;
    }else{
        $("#question-form").show();
    }
    var content = fireFlyWeTranslateData(fireFlyWeData,params);
    $("#question-div").html(content);
    if (isWeLast()) {
        $("#next").hide();
    } else {
        $("#next").show();
    }
    if (getWeTotalNum() == 1) {
        $("#gotoarea").hide();
    }else{
        $("#gotoarea").show();
    }
    checkFav(fireFlyWeData.id, localStorageType);
}


function getwenextQuestin(localStorageType) {
    if (isWeLast()) {
        $("#next").hide();
        return false;
    }
    var params = $("#fireflywe-form").serializeJson();
    var fireFlyWeData = weNextQuest();
    var content = fireFlyWeTranslateData(fireFlyWeData,params);
    if (isWeLast()) {
        $("#next").hide();
    }
    $("#question-div").html(content);
    if (!isWeFirst()) {
        $("#pre").show();
    }
    checkFav(fireFlyWeData.id, localStorageType);
}

function getwePreQuestion(localStorageType){
    if (isSSTFirst()) {
        $("#pre").hide();
        return false;
    }
    var params = $("#fireflywe-form").serializeJson();
    // var content = fireFlyPreQuest();
    var fireFlyWeData = wePreQuest();
    var content = fireFlyWeTranslateData(fireFlyWeData,params);
    if (isWeFirst()) {
        $("#pre").hide();
    }
    if (!isWeLast()) {
        $("#next").show();
    }
    $("#question-div").html(content);
    checkFav(fireFlyWeData.id, localStorageType);
    
}

function wegotoIndex(localStorageType) {
    var qIndex = $("#qindex").val();//想要跳转的题目
    console.log(qIndex);
    if (!qIndex || qIndex <= 0 || qIndex > getSSTTotalNum) {

    } else {
        setWeIndex(parseInt(qIndex));
        var fireFlyWeData = currentWeData();
        if (!fireFlyWeData) {
            layer.msg('超出题目数量范围', {icon: 0}, function () {
            });
            return false;
        }
        var params = $("#fireflywe-form").serializeJson();
        var content = fireFlyWeTranslateData(fireFlyWeData, params);
        if (isWeFirst()) {
            $("#pre").hide();
        } else {
            $("#pre").show();
        }
        if (!isWeLast()) {
            $("#next").show();
        } else {
            $("#next").hide();
        }
        $("#question-div").html(content);
        checkFav(fireFlyWeData.id, localStorageType);
    }
}

function addeletewefav(localStorageType) {
    var fireFlyWeData = currentWeData();
    if (!fireFlyWeData) {
        layer.msg('题目无效', {icon: 0}, function () {
        });
        return false;
    }
    var isContains = containsValue(fireFlyWeData.id, localStorageType);
    if (isContains) {
        layer.confirm('是否删除收藏？', {icon: 3}, function () {
            removeFavFromLocalStorage(fireFlyWeData.id, localStorageType);
            layer.msg('操作完成', {icon: 0}, function () {
            });
            checkFav(fireFlyWeData.id, localStorageType);
        }, function () {
        });

    } else {
        layer.confirm('是否添加到收藏？', {icon: 3}, function () {
            add2LocalStorage("fireflywe", fireFlyWeData.id, localStorageType)
            layer.msg('操作完成', {icon: 0}, function () {
            });
            checkFav(fireFlyWeData.id, localStorageType);
        }, function () {
        });

    }
}


function createFireFlyWePdfHtml(params, serNum, fireflyWeData) {

    var num = fireflyWeData.id;
    var name = fireflyWeData.title;
    var questionDiv = document.createElement("div");
    $(questionDiv).attr("style", "padding-left: 20px;padding-right: 20px;line-height: 30px;font-size: larger");
    var h3 = document.createElement("h3");
    h3.innerHTML = serNum + "." + "&nbsp;" + "&nbsp;" + name + "&nbsp;" + "&nbsp;题号:" + num + "<br/>"+ "<br/>"+fireflyWeData.question+"<br>" ;
    $(questionDiv).append(h3);
    var text = "";
    var example = params.example;
    var view = params.view;
    if (view) {
        text = text + "<br>观点(仅供参考):" + "<br>" + "<pre className=\"answer-area\" lay-options=\"{}\" style=\"font-size: 20px;font-family: Arial\">" + fireflyWeData.views + "</pre>";
    }
    if (example) {
        var exampleContent = fireflyWeData.example;
        if (!exampleContent) {
            exampleContent="暂无范文"
        }
        text = text +"<br/>"+ "<br/>范文(仅供参考):" + "<br>" + exampleContent;
    }
    text = text + "<br/>"+ "<br/>";

    $(questionDiv).append(text);
    return questionDiv;
}




function weNextQuest() {
    if (weIndex < weCurrentList.length - 1) {
        weIndex++;
    }
    return weCurrentList[weIndex];
}

function wePreQuest() {
    if (weIndex > 0) {
        weIndex--;
    }
    return weCurrentList[weIndex];
}

function isWeFirst() {
    return weIndex == 0;
}

function isWeLast() {
    return weIndex == weCurrentList.length - 1;
}

function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}

function getWeindex() {
    return weIndex;
}




function getWeTotalNum() {
    return weCurrentList.length;
}

function setWeIndex(qindex) {
    weIndex = qindex - 1;
}

function currentWeData() {
    return weCurrentList[weIndex];
}

function currentWeListData() {
    return weCurrentList;
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
};

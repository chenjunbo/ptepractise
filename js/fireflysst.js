var sstCurrentList,sstCurrentInfoList;
let sstAllDataList;
const sstMap = new Map();
const sstInfoMap = new Map();
var sstIndex = 0;//当前第几条
sstlocalstoragetype = "fireflysst";
isXJSST = false;

function fireFlySSTInit() {
    $.get(getGitContentPre() + "/data/sst/fireflysst.txt" + getGitContentAccess(), function (response) {
        var result
        try {
            result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        } catch (e) {
            result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
        }
        sstAllDataList = JSON.parse(result);
        for (let i = 0; i < sstAllDataList.length; i++) {
            var sstData = sstAllDataList[i];
            sstMap.set(sstData.id + "", sstData);
        }
    })
    $.get(getGitContentPre() + "/questions/sst/fireflysstinfo.txt" + getGitContentAccess(), function (response) {
        var result
        try {
            result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        } catch (e) {
            result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
        }
        sstCurrentInfoList = JSON.parse(result);
        for (let i = 0; i < sstCurrentInfoList.length; i++) {
            var sstInfo = sstCurrentInfoList[i];
            sstInfoMap.set(sstInfo.qNum + "", sstInfo.isSimilar);
        }
    })

}

function fireflySSTCurrentTypedata(param) {
    stopsstmp3();
    var qNum = param.qNum;//题号
    var type = param.type;//类型
    var randomindex = param.randomindex;//随机
    var filePath;
    sstIndex = 0;
    sstCurrentList = new Array();
    var localstoragedata;
    isXJSST = false;
    switch (type) {
        case "1":
            //高频预测
            filePath = getGitContentPre() + "/questions/sst/fireflysstprediction.txt" + getGitContentAccess()
            break;
        case "2":

            break;
        case "3":
            var content = getFromLocalStorage(sstlocalstoragetype);
            if (content) {
                var json = JSON.parse(content);
                localstoragedata = json.nums;
            }
            break;
        case "-1":
            filePath = getGitContentPre() + "/questions/sst/ce_sst_all.txt" + getGitContentAccess();
            isXJSST = true;
            break

    }

    if (filePath) {
        $.ajaxSettings.async = false;
        $.get(filePath, function (response) {
            // let qNums = decodeURIComponent(escape(window.atob(response.content))).split(/[(\r\n)\r\n]+/); // 根据换行或者回车进行识别
            let qNums;
            try {
                qNums = decodeURIComponent(escape(window.atob(response.content))).split(/[(\r\n)\r\n]+/); // 根据换行或者回车进行识别
            } catch (e) {
                qNums = response.split(/[(\r\n)\r\n]+/);
            }
            if (isXJSST) {
                sstCurrentList = qNums
            } else {
                qNums.forEach((item, index) => { // 删除空项
                    if (qNum && qNum != item) {

                    } else {
                        if (!item) {
                            qNums.splice(index, 1);
                        } else {
                            var sstData = sstMap.get(item + "");
                            if (sstData) {
                                sstCurrentList.push(sstData);
                            }
                        }
                    }
                });
            }
        });
        $.ajaxSettings.async = true;
    } else if (localstoragedata) {
        localstoragedata.forEach((item, index) => { // 删除空项
            if (qNum && qNum != item) {

            } else {
                if (!item) {
                    localstoragedata.splice(index, 1);
                } else {
                    var sstData = sstMap.get(item + "");
                    if (sstData) {
                        sstCurrentList.push(sstData);
                    }
                }
            }
        })
    } else {
        if (qNum) {
            var sstData = sstMap.get(qNum + "");
            if (sstData) {
                sstCurrentList.push(sstData);
            }
        } else {
            sstCurrentList = sstAllDataList;
        }
    }
    //全部已经整理
    // sstCurrentList = sstAllDataList;
    console.log(sstCurrentList.length);
    if (randomindex) {
        shuffle(sstCurrentList)
    }
    return sstCurrentList;

}

function fireFlySSTTranslateData(fireflySSTData, params) {
    stopsstmp3();
    if (isXJSST) {
        stopTimer();
        return "<div class=\"layui-form-item\"><div class=\"layui-inline\"><label  style=\"white-space:nowrap\">第" + (sstIndex + 1) + "题/共" + (sstCurrentList.length) + "题, 题号:" + fireflySSTData + "&nbsp;&nbsp;本分类主要用于C哥预测跳转到🦍&nbsp;&nbsp;</label><div class=\"layui-inline\"><span style=\"color: red\" id=\"timer\"></span></div></div></div>"
    } else {
        var num = fireflySSTData.id;
        var name = fireflySSTData.title;
        var text = "";
        var  mp3Type= sstInfoMap.get(num+"");
        var audioType = "";
        if (mp3Type == "1") {
            audioType = "近似音频";
        }else if (mp3Type == "2"){
            audioType = "原音频";
        }
        var title = "<div class=\"layui-form-item\"><div class=\"layui-inline\"><label  style=\"white-space:nowrap\">第" + (sstIndex + 1) + "题/共" + (sstCurrentList.length) + "题, 题号:" + num + "&nbsp;&nbsp;" + name + "&nbsp;&nbsp;<span style='color: rgba(76,236,72,0.8)'> " + audioType + "</span>&nbsp;&nbsp;</label><div class=\"layui-inline\"><span style=\"color: red\" id=\"timer\"></span></div></div></div>";
        text = text + title;
        var audiosrc = "https://gitee.com/jackiechan/ptepractise/raw/webversion/mp3/sst/" + num + ".mp3";
        var audio = "<audio id='sstmp3' src=" + audiosrc + " controls></audio>"
        text=text+"</br>"+audio
        var simpleanswer = params.simpleanswer;
        var keyword = params.keyword;
        var chinese = params.chinese;
        var logicpic = params.logicpic;
        if (simpleanswer) {
            text = text +"</br>"+ "简单答案:" + "<br>" + fireflySSTData.simpleAnswer;
        }
        if (keyword) {
            text = text + "<br>关键词:" + "<br>" + fireflySSTData.keyWords;
        }
        if (chinese) {
            text = text + "<br>中文速记:" + "<br>" + "<span style=\"font-size:16px;color:red;\">" + fireflySSTData.chineseContent + "</span>";
        }
        if (logicpic) {
            var sstPic = fireflySSTData.sstPic;
            if (!sstPic) {
                sstPic = "暂无梳理图"
                text = text + "<br>逻辑梳理图:" + "<br>" + "<span style=\"font-size:16px;color:red;\">暂无梳理图</span>";

            } else {
                text = text + '<br>逻辑梳理图:<br><img src=' + sstPic + '  width="40%">';
            }
        }

        startTimer();
        return text;

    }
}

function playsstmp3() {
    var player = $("#sstmp3").get(0);
    player.oncanplaythrough = function () {
        setTimeout(function () {
            player.play();
        }, 100);
    }
}
function stopsstmp3() {
    var player = $("#sstmp3").get(0);
    if (player) {
        player.pause();
    }

}

function createFireFlySSTPdfHtml(params, serNum, fireflySSTData) {
    var num = fireflySSTData.id;
    var name = fireflySSTData.title;
    var questionDiv = document.createElement("div");
    $(questionDiv).attr("style", "padding-left: 20px;padding-right: 20px;line-height: 30px;font-size: larger");
    var h3 = document.createElement("h3");
    h3.innerHTML = serNum + "." + "&nbsp;" + "&nbsp;" + name + "&nbsp;" + "&nbsp;题号:" + num + "<br/>";
    $(questionDiv).append(h3);
    var text = "";
    var simpleanswer = params.simpleanswer;
    var keyword = params.keyword;
    var chinese = params.chinese;
    var logicpic = params.logicpic;
    if (simpleanswer) {
        text = text + "简单答案:" + "<br>" + fireflySSTData.simpleAnswer;
    }
    if (keyword) {
        text = text + "<br>关键词:" + "<br>" + fireflySSTData.keyWords + "<br>";
    }
    if (chinese) {
        text = text + "<br>中文速记:" + "<br>" + "<span style=\"font-size:16px;color:red;\">" + fireflySSTData.chineseContent + "</span>";
    }
    if (logicpic) {
        var sstPic = fireflySSTData.sstPic;
        if (!sstPic) {
            sstPic = "暂无梳理图"
            text = text + "<br>逻辑梳理图:" + "<br>" + "<span style=\"font-size:16px;color:red;\">暂无梳理图</span>";

        } else {
            text = text + '<br>逻辑梳理图:<br><img src=' + sstPic + ' width="40%">';
        }
    }
    text = text + "<br/>" + "<br/>";

    $(questionDiv).append(text);
    return questionDiv;
}

function createFireFlySSTAnki(simple, index , fireflySSTData) {
    var num = fireflySSTData.id;
    var name = fireflySSTData.title;
    var text = "";
    if ("simple" == simple) {
        text = num + " "+name + ":" + fireflySSTData.simpleAnswer.replace(/<\/?.+?>/g,"") + fireflySSTData.chineseContent;
    } else if ("keyword" == simple) {
        text = num + " "+ name + ":" + fireflySSTData.keyWords;
    }

    text = text + "<br/>";
    return text;
}

function fireflysstsearch() {
    $("#pre").hide();
    var params = $("#fireflysst-form").serializeJson();
    fireflySSTCurrentTypedata(params);
    var fireFlySSTData = currentSSTData();
    if (!fireFlySSTData) {
        $("#question-form").hide();
        layer.msg('当前分类下不存在该题目', {icon: 0}, function () {
            // layer.msg('提示框关闭后的回调');
        });
        return false;
    } else {
        $("#question-form").show();
    }
    var content = fireFlySSTTranslateData(fireFlySSTData, params);
    $("#question-div").html(content);
    if (isSSTLast()) {
        $("#next").hide();
    } else {
        $("#next").show();
    }
    if (getSSTTotalNum() == 1) {
        $("#gotoarea").hide();
    } else {
        $("#gotoarea").show();
    }
    if (isXJSST) {
        checkFav(fireFlySSTData, sstlocalstoragetype);
    } else {

        checkFav(fireFlySSTData.id, sstlocalstoragetype);
    }
}

function sstNext() {
    if (isSSTLast()) {
        $("#next").hide();
        return false;
    }
    var params = $("#fireflysst-form").serializeJson();
    var fireFlySSTData = sstNextQuest();
    var content = fireFlySSTTranslateData(fireFlySSTData, params);
    if (isSSTLast()) {
        $("#next").hide();
    }
    $("#question-div").html(content);
    if (!isSSTFirst()) {
        $("#pre").show();
    }
    if (isXJSST) {
        checkFav(fireFlySSTData, sstlocalstoragetype);
    } else {

        checkFav(fireFlySSTData.id, sstlocalstoragetype);
    }
}

function sstPre() {
    if (isSSTFirst()) {
        $("#pre").hide();
        return false;
    }
    var params = $("#fireflysst-form").serializeJson();
    // var content = fireFlyPreQuest();
    var fireFlySSTData = sstPreQuest();
    var content = fireFlySSTTranslateData(fireFlySSTData, params);
    if (isSSTFirst()) {
        $("#pre").hide();
    }
    if (!isSSTLast()) {
        $("#next").show();
    }
    $("#question-div").html(content);
    if (isXJSST) {
        checkFav(fireFlySSTData, sstlocalstoragetype);
    } else {

        checkFav(fireFlySSTData.id, sstlocalstoragetype);
    }
}

function sstgotoindex() {
    var qIndex = $("#qindex").val();//想要跳转的题目
    console.log(qIndex);
    if (!qIndex || qIndex <= 0 || qIndex > getSSTTotalNum) {

    } else {
        setSSTIndex(parseInt(qIndex));
        var fireFlySSTData = currentSSTData();
        if (!fireFlySSTData) {
            layer.msg('超出题目数量范围', {icon: 0}, function () {
            });
            return false;
        }
        var params = $("#fireflysst-form").serializeJson();
        var content = fireFlySSTTranslateData(fireFlySSTData, params);
        if (isSSTFirst()) {
            $("#pre").hide();
        } else {
            $("#pre").show();
        }
        if (!isSSTLast()) {
            $("#next").show();
        } else {
            $("#next").hide();
        }
        $("#question-div").html(content);
        if (isXJSST) {
            checkFav(fireFlySSTData, sstlocalstoragetype);
        } else {

            checkFav(fireFlySSTData.id, sstlocalstoragetype);
        }
    }
}

function adddeletesstfav() {
    var fireFlySSTData = currentSSTData();
    if (!fireFlySSTData) {
        layer.msg('题目无效', {icon: 0}, function () {
        });
        return false;
    }
    if (isXJSST) {
        var isContains = containsValue(fireFlySSTData, sstlocalstoragetype);
        if (isContains) {
            layer.confirm('是否删除收藏？', {icon: 3}, function () {
                removeFavFromLocalStorage(fireFlySSTData, sstlocalstoragetype);
                layer.msg('操作完成', {icon: 0}, function () {
                });
                checkFav(fireFlySSTData, sstlocalstoragetype);
            }, function () {
            });

        } else {
            layer.confirm('是否添加到收藏？', {icon: 3}, function () {
                add2LocalStorage("fireflysst", fireFlySSTData, sstlocalstoragetype)
                layer.msg('操作完成', {icon: 0}, function () {
                });
                checkFav(fireFlySSTData, sstlocalstoragetype);
            }, function () {
            });

        }
    } else {
        var isContains = containsValue(fireFlySSTData.id, sstlocalstoragetype);
        if (isContains) {
            layer.confirm('是否删除收藏？', {icon: 3}, function () {
                removeFavFromLocalStorage(fireFlySSTData.id, sstlocalstoragetype);
                layer.msg('操作完成', {icon: 0}, function () {
                });
                checkFav(fireFlySSTData.id, sstlocalstoragetype);
            }, function () {
            });

        } else {
            layer.confirm('是否添加到收藏？', {icon: 3}, function () {
                add2LocalStorage("fireflysst", fireFlySSTData.id, sstlocalstoragetype)
                layer.msg('操作完成', {icon: 0}, function () {
                });
                checkFav(fireFlySSTData.id, sstlocalstoragetype);
            }, function () {
            });

        }
    }

}

function sstgotoaepui() {
    if (isXJSST) {
        var data = currentSSTData();
        var local = "cn";
        gotoxj(local, "ssts", data);
    } else {
        layer.msg('SST跳转暂时只针对🦍题目,请选择🦍分组', {icon: 0}, function () {
        });
    }
}

function sstNextQuest() {
    if (sstIndex < sstCurrentList.length - 1) {
        sstIndex++;
    }
    return sstCurrentList[sstIndex];
}

function sstPreQuest() {
    if (sstIndex > 0) {
        sstIndex--;
    }
    return sstCurrentList[sstIndex];
}

function isSSTFirst() {
    return sstIndex == 0;
}

function isSSTLast() {
    return sstIndex == sstCurrentList.length - 1;
}

function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}

function getSSTindex() {
    return sstIndex;
}


function getSSTTotalNum() {
    return sstCurrentList.length;
}

function setSSTIndex(qindex) {
    sstIndex = qindex - 1;
}

function currentSSTData() {
    return sstCurrentList[sstIndex];
}

function currentSSTListData() {
    return sstCurrentList;
}

function cleanfireflysstfav() {
    layer.confirm('是否清空收藏夹？', {icon: 3}, function () {
        cleanFav(sstlocalstoragetype, sstlocalstoragetype)
        layer.msg('操作完成', {icon: 0}, function () {
        });
        checkFav(currentSSTData().id, sstlocalstoragetype);
    }, function () {
    });

}
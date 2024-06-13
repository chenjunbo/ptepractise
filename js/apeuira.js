var racurrentList;
let racnList, raenList, xjraIdsList, xjraunCompletedList;
const racnMap = new Map();
var xjraIdsSet = new Set();
const xjraenMap = new Map();
var raindex = 0;//当前第几条
var xjralocalStorageType = "xjra";
var excWords = ["it","their","from","of", "to", "as", "at", "on", "in", "for", "by", "about", "with", "up", "a", "an", "the", "this", "that", "is", "are", "was", "were", "has", "have", "had", "been", "be", "can", "could", "would", "should", "I", "you", "he", "she", "his", "her", "your", "and", "or","they","more","but","our","which","not","people","we","we","also","one","new","these","than","when","such","will","how","many","may","most","into","other","all","some","its","who","study","there","if","what","while","water","resea","over","so","like","years","year","time","them","often","use","used","us","do","out","now","where","two","one","yes","no","it's",]

function raInit() {
    $.ajax({
        url: getGitContentPre()+"/data/ra/raallquests.txt"+getGitContentAccess(),
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

            // var result = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
            racnList = JSON.parse(result);
            for (let i = 0; i < racnList.length; i++) {
                var raData = racnList[i];
                racnMap.set(raData.num, raData);
                xjraIdsSet.add(raData.num);
            }
        },
        error: function (xhr, status, error) {
            // 处理错误
        }
    });

    $.ajax({
        url: getGitContentPre()+"/data/ra/raallquestsen.txt"+getGitContentAccess(),
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
            raenList = JSON.parse(result);
            for (let i = 0; i < raenList.length; i++) {
                var raData = raenList[i];
                xjraenMap.set(raData.num, raData);
                xjraIdsSet.add(raData.num);
            }
            $("#uncompleted").show();
        },
        error: function (xhr, status, error) {
            // 处理错误
        }
    });
}

function fibRaCurrentTypedata(param) {
    var qNum = param.qNum;//题号
    var type = param.type;//类型
    var onlyundo = param.onlyundo;//类型
    var filePath;
    raindex = 0;
    racurrentList = new Array();
    var localstoragedata;
    switch (type) {
        case "1":
            //C哥蓝色数据
            filePath = getGitContentPre()+"/questions/ra/cge_ra_lan.txt"+getGitContentAccess()
            break;
        case "2":
            //C哥黄色数据
            filePath = getGitContentPre()+"/questions/ra/cge_ra_huang.txt"+getGitContentAccess()
            break;
        case "3":
            //C哥白色数据
            filePath = getGitContentPre()+"/questions/ra/cge_ra_bai.txt"+getGitContentAccess()
            break;
        case "4":
            xjraunCompletedList = new Array();
            //C哥所有数据
            filePath = getGitContentPre()+"/questions/ra/cge_ra_all.txt"+getGitContentAccess()
            break;
        case "5":
            //自定义数据
            filePath = getGitContentPre()+"/questions/ra/xjraweek.txt"+getGitContentAccess()
            break;
        case "6":
            //自定义数据
            filePath = getGitContentPre()+"/questions/ra/xjramonth.txt"+getGitContentAccess()
            break;
        case "7":
            onlyundo = "";
            var content = getFromLocalStorage(xjralocalStorageType);
            if (content) {
                var json = JSON.parse(content);
                localstoragedata = json.nums;
            }
            break;
        case "8":
            filePath = getGitContentPre()+"/questions/ra/xj_ra_withoutc.txt"+getGitContentAccess()
            break;
        case "9":
            onlyundo = "";
            var faltIds = getAllQuestionNumFromLocalStorageByFalt(xjralocalStorageType);
            if (faltIds) {
                faltIds.forEach((qNum, raindex) => {
                    getFromLocalStorage()
                    var raData = racnMap.get(parseInt(qNum));
                    if (!raData) {
                        raData = xjraenMap.get(parseInt(qNum));
                    }
                    if (raData) {
                        racurrentList.push(raData);
                    }
                })
            }

            break;
        case "10":
            if (qNum) {
                racurrentList.push(racnMap.get(parseInt(qNum)));
            }else{
                racurrentList = racnList;
            }
            break;
        case "11":
            if (qNum) {
                racurrentList.push(xjraenMap.get(parseInt(qNum)))
            }else{
                racurrentList = raenList;
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

            qNums.forEach((item, raindex) => { // 删除空项
                if (qNum && qNum != item) {

                } else {
                    if (!item) {
                        qNums.splice(raindex, 1);
                    } else {
                        //检查是不是选择了仅做未做的题目
                        if (onlyundo) {
                            var rightLocal = getFromLocalStorage(item + "right" + xjralocalStorageType);
                            var faltlocal = getFromLocalStorage(item + "falt" + xjralocalStorageType);
                            if (rightLocal || faltlocal) {
                                //已经做了,不处理
                            } else {
                                var raData = racnMap.get(parseInt(item));
                                if (!raData) {
                                    raData = xjraenMap.get(parseInt(item));
                                }
                                if (raData) {
                                    racurrentList.push(raData);
                                } else {
                                    if ("4" == type) {
                                        xjraunCompletedList.push(item);
                                    }
                                }
                            }
                        } else {
                            var raData = racnMap.get(parseInt(item));
                            if (!raData) {
                                raData = xjraenMap.get(parseInt(item));
                            }
                            if (raData) {
                                racurrentList.push(raData);
                            } else {
                                if ("4" == type) {
                                    xjraunCompletedList.push(item);
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
                    localstoragedata.splice(raindex, 1);
                } else {
                    var raData = racnMap.get(parseInt(item));
                    if (!raData) {
                        raData = xjraenMap.get(parseInt(item));
                    }
                    if (raData) {
                        racurrentList.push(raData);
                    }
                }
            }
        });
    }
    console.log(racurrentList.length);
    // return raTranslateData();
    // return racurrentList[raindex]
    return racurrentList;
}



function xjrasearch(obj, event) { // 左侧菜单事件
    // var json = JSON.stringify($("#fibrsearch-form").serializeJson())
    // alert("aaaaa" + json)
    event.preventDefault();
    $("#rapre").hide();
    fibRaCurrentTypedata($("#rasearch-form").serializeJson());
    var xjradata = currentRaData()
    if (!xjradata) {
        $("#raquestion-form").hide();
        layer.msg('当前分类下不存在该题目', {icon: 0}, function () {
            // layer.msg('提示框关闭后的回调');
        });
        return false;
    } else {
        $("#raquestion-form").show();
        $("#operationtools").show();
    }
    var content = raTranslateData(xjradata);
    $("#raquestion-div").html(content);
    // fillfibrAnswer(xjradata);
    // fillfibrOptions(xjradata);
    if (isRaLast()) {
        $("#ranext").hide();
    } else {
        $("#ranext").show();
    }
    if (getRaTotalNum() == 1) {
        $("#gotoarea").hide();
    } else {
        $("#gotoarea").show();
    }
    checkFav(xjradata.num, xjralocalStorageType);
}


function raTranslateData(raData) {
    stopTimer();
    var nameWithoutNum = raData.name_without_num;
    nameWithoutNum = nameWithoutNum.replaceAll(" ", "&nbsp;");
    var num = raData.num;
    var title = "<div class=\"layui-form-item\"><div class=\"layui-inline\"><label  style=\"white-space:nowrap\">第" + (raindex + 1) + "题/共" + (racurrentList.length) + "题, 题号:" + num + "&nbsp;&nbsp;" + nameWithoutNum + "&nbsp;&nbsp;</label><div class=\"layui-inline\"><span style=\"color: red\" id=\"timer\"></span></div></div></div>"
    return title+"<br/><br/>本页面主要用于跳转到🦍刷题用,不显示题目具体内容";
}


function createRaPdfHtml(parmas, serNum, radata) {
    var needtrans = parmas.trans;//是否需要全文翻译
    var questionDiv = document.createElement("div");
    $(questionDiv).attr("style", "padding-left: 20px;padding-right: 20px;line-height: 30px;font-size: large;width:90%;");
    //内容
    var nameWithoutNum = radata.name_without_num;//名字
    nameWithoutNum = nameWithoutNum.replaceAll(" ", "&nbsp;");
    var num = radata.num;//题号
    var text = radata.text;//内容
    var h3 = document.createElement("h3");
    h3.innerHTML = serNum + "." + "&nbsp;" + "&nbsp;" + nameWithoutNum + "&nbsp;" + "&nbsp;题号:" + num + "<br/>" + "<br/>";
    $(questionDiv).append(h3);
    if (needtrans) {
        var contents = radata.contents;
        if (contents && contents.length > 0) {
            text = text + "<br/>" + "<br/>" + "<br/>" + "翻译:" + "<br/>"
            contents.forEach((eachContent, index) => {
                var type = eachContent.type;
                if (type == "option" || type == "caption") {

                } else {
                    var content = eachContent.content;
                    text = text + "<br/>" + content + "<br/>";
                }
            });
        }
    }
    $(questionDiv).append(text);
    return questionDiv;

}

function nextxjraQuestion(obj, event) {
    event.preventDefault();
    if (isRaLast()) {
        $("#ranext").hide();
        return false;
    }

    var xjradata = raNextQuest();
    var content = raTranslateData(xjradata);
    if (isRaLast()) {
        $("#ranext").hide();
    }
    $("#raquestion-div").html(content);
    // fillfibrAnswer(xjradata);
    // fillfibrOptions(xjradata);
    if (!isRaFirst()) {
        $("#rapre").show();
    }
    checkFav(xjradata.num, xjralocalStorageType);
    return false;
}

function xjrapre(obj, event) {
    event.preventDefault();
    if (isRaFirst()) {
        $("#rapre").hide();
        return false;
    }

    // var content = fibrwPreQuest();
    var xjradata = raPreQuest();
    var content = raTranslateData(xjradata);
    if (isRaFirst()) {
        $("#rapre").hide();
    }
    if (!isRaLast()) {
        $("#ranext").show();
    }
    $("#raquestion-div").html(content);
    // fillfibrAnswer(xjradata);
    // fillfibrOptions(xjradata);
    checkFav(xjradata.num, xjralocalStorageType);
}

function xjragotoindex(obj, event) {
    event.preventDefault();
    var qIndex = $("#qindex").val();//想要跳转的题目
    console.log(qIndex);
    if (!qIndex || qIndex <= 0 || qIndex > getRaTotalNum()) {

    } else {
        setRaIndex(parseInt(qIndex));
        var xjradata = currentRaData();
        if (!xjradata) {
            layer.msg('超出题目数量范围', {icon: 0}, function () {
            });
            return false;
        }
        var content = raTranslateData(xjradata);
        if (isRaFirst()) {
            $("#rapre").hide();
        } else {
            $("#rapre").show();
        }
        if (!isRaLast()) {
            $("#ranext").show();
        } else {
            $("#ranext").hide();
        }
        $("#raquestion-div").html(content);
        // fillfibrAnswer(xjradata);
        // fillfibrOptions(xjradata);
        checkFav(xjradata.num, xjralocalStorageType);
        return false;
    }

}


function adddeleterafav(obj, event) {
    event.preventDefault();
    var xjradata = currentRaData();
    if (!xjradata) {
        layer.msg('题目无效', {icon: 0}, function () {
        });
        return false;
    }
    var isContains = containsValue(xjradata.num, xjralocalStorageType);
    if (isContains) {
        layer.confirm('是否删除收藏？', {icon: 3}, function () {
            removeFavFromLocalStorage(xjradata.num, xjralocalStorageType);
            layer.msg('操作完成', {icon: 0}, function () {
            });
            checkFav(xjradata.num, xjralocalStorageType);
        }, function () {
        });

    } else {
        layer.confirm('是否添加到收藏？', {icon: 3}, function () {
            add2LocalStorage(xjralocalStorageType, xjradata.num, xjralocalStorageType)
            layer.msg('操作完成', {icon: 0}, function () {
            });
            checkFav(xjradata.num, xjralocalStorageType);
        }, function () {
        });

    }

}

    function raRandomLucky() {
    if (!xjraIdsList || xjraIdsList.length == 0) {
        xjraIdsList = Array.from(xjraIdsSet);
    }
    raindex = 0;
    racurrentList = new Array();
    shuffle(xjraIdsList);
    var nums = Math.floor(Math.random() * (6 - 5 + 1)) + 5;
    for (var i = 0; i < nums; i++) {
        var radata = racnMap.get(xjraIdsList[i]);
        if (!radata) {
            radata = xjraenMap.get(xjraIdsList[i]);
        }
        racurrentList.push(radata);
    }
    return racurrentList[0];
}

function raNextQuest() {
    if (raindex < racurrentList.length - 1) {
        raindex++;
    }
    // var result = raTranslateData();
    // return result;
    return racurrentList[raindex];
}

function raPreQuest() {
    if (raindex > 0) {
        raindex--;
    }
    // var result = raTranslateData();
    // return result;
    return racurrentList[raindex];
}

function raUncompleted() {
    if (xjraunCompletedList && xjraunCompletedList.length > 0) {
        $("#question-form").show();
        $("#question-div").html("不完整id:" + xjraunCompletedList.join(", ") + "请根据id去🦍中单独查询");
        $("#operationtools").hide();
    } else {
        xjraunCompletedList = new Array();
        $.ajaxSettings.async = false;
        $.get(getGitContentPre()+"/questions/ra/cge_ra_all.txt"+getGitContentAccess(), function (response) {
            // let qNums = decodeURIComponent(escape(window.atob(response.content))).split(/[(\r\n)\r\n]+/); // 根据换行或者回车进行识别
            var qNums;
            try {
                qNums = decodeURIComponent(escape(window.atob(response.content))).split(/[(\r\n)\r\n]+/); // 根据换行或者回车进行识别
            }catch (e) {
                 qNums = response.split(/[(\r\n)\r\n]+/);;
            }


            qNums.forEach((item, raindex) => { // 删除空项

                if (!item) {
                    qNums.splice(raindex, 1);
                } else {
                    var raData = racnMap.get(parseInt(item));
                    if (!raData) {
                        raData = xjraenMap.get(parseInt(item));
                    }
                    if (raData) {
                    } else {
                        xjraunCompletedList.push(item);
                    }

                }
            })
            $("#question-form").show();
            $("#question-div").html("不完整id:" + xjraunCompletedList.join(", ") + "请根据id去🦍中单独查询");
            $("#operationtools").hide();
        });
        $.ajaxSettings.async = true;
    }
}


function isRaFirst() {
    return raindex == 0;
}

function isRaLast() {
    return raindex == racurrentList.length - 1;
}

function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}

function getraindex() {
    return raindex;
}

function getRaTotalNum() {
    return racurrentList.length;
}

function setRaIndex(qraindex) {
    raindex = qraindex - 1;
}

function currentRaData() {
    return racurrentList[raindex];
}

function currentRaListData() {
    return racurrentList;
}



function create_ra_all_words_order_by_dic(order_by_count) {
    var allWords = ""
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var thead_tr = document.createElement("tr");
    var word_th = document.createElement("th");
    var count_th = document.createElement("th");
    word_th.innerHTML = "单词"
    count_th.innerHTML = "频率"
    thead_tr.appendChild(word_th)
    thead_tr.appendChild(count_th)
    thead.appendChild(thead_tr)
    table.appendChild(thead)

    var tbody = document.createElement("tbody");
    raenList.forEach((ra, ind) => {
        allWords += (ra.text.toLowerCase().replace(".", "").replace(",", "")) + " "
    })
    let result = allWords.split(" ").reduce((temp, data) => {
        if (excWords.indexOf(data) > -1 || !data) {

        } else {
            temp[data] = temp[data] ? temp[data] + 1 : 1;
        }
        return temp;
    }, {})
    var sorted_result_by_count = Object.keys(result).sort((key1, key2) => result[key1] - result[key2]);
    var sorted_result_by_count_daoxu = Object.keys(result).sort((key1, key2) => result[key2] - result[key1]);
    var sorted_result_by_char = Object.keys(result).sort((key1, key2) => {
        let a = key1.toLowerCase();
        let b = key2.toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    console.log(sorted_result_by_count)
    console.log(sorted_result_by_char)
    var array = sorted_result_by_char;
    if (order_by_count==0) {
        array = sorted_result_by_count;
    }else if (order_by_count == 1) {
        array = sorted_result_by_count_daoxu;
    }
    array.forEach((word, index) => {
        var wordTd = document.createElement("td");
        var tr = document.createElement("tr");
        var countTd = document.createElement("td");
        wordTd.innerHTML = word;
        countTd.innerHTML = result[word];
        tr.appendChild(wordTd)
        tr.appendChild(countTd)
        tbody.appendChild(tr)
    });
    table.appendChild(tbody)
    return table;
}


function cleanxjrafav() {
    layer.confirm('是否清空收藏夹？', {icon: 3}, function () {
        cleanFav(xjralocalStorageType,xjralocalStorageType)
        layer.msg('操作完成', {icon: 0}, function () {
        });
        checkFav(currentRaData().num, xjralocalStorageType);
    }, function () {
    });

}
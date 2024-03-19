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
                cnxjroMap.set(xjrodata.num, xjrodata);
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
                enxjroMap.set(xjrodata.num, xjrodata);
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
                        var xjroData = cnxjroMap.get(parseInt(item));
                        if (!xjroData) {
                            xjroData = enxjroMap.get(parseInt(item));
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
                    var xjroData = cnxjroMap.get(parseInt(item));
                    if (!xjroData) {
                        xjroData = enxjroMap.get(parseInt(item));
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
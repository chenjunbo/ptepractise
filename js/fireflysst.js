var sstCurrentList;
let sstAllDataList;
const sstMap = new Map();
var sstIndex = 0;//当前第几条
function fireFlySSTInit() {
    // $.get("https://gitee.com/jackiechan/ptepractise/raw/main/data/fireflysst.txt", function (response) {
    $.get("https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/data/fireflysst.txt?access_token=2fd4d53480c117fa597505cebeceee9d", function (response) {
        //fibrCnList = JSON.parse(response);
        // fibrCnList = response;
        var result=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        sstAllDataList= JSON.parse(result);
        for (let i = 0; i < sstAllDataList.length; i++) {
            var sstData = sstAllDataList[i];
            sstMap.set(sstData.id+"", sstData);
        }
    })
}

function fireflySSTCurrentTypedata(param) {
    var qNum = param.qNum;//题号
    var type = param.type;//类型
    var filePath;
    sstIndex = 0;
    sstCurrentList = new Array();
    var localstoragedata;
    switch (type) {
        case "1":
            //高频预测
            // filePath = "https://gitee.com/jackiechan/ptepractise/raw/main/questions/fireflysstprediction.txt"
            filePath = "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/questions/fireflysstprediction.txt?access_token=2fd4d53480c117fa597505cebeceee9d"
            break;
        case "2":
            //全部已经整理
            sstCurrentList = sstAllDataList;
            break;
        case "3":
            var content = getFromLocalStorage("fireflysst");
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
                        var sstData = sstMap.get(item+"");
                        if (sstData) {
                            sstCurrentList.push(sstData);
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
                    var sstData = sstMap.get(item+"");
                    if (sstData) {
                        sstCurrentList.push(sstData);
                    }
                }
            }
        })
    }
    console.log(sstCurrentList.length);
    return sstCurrentList;

}

function fireFlySSTTranslateData(fireflySSTData,params){
    var num = fireflySSTData.id;
    var name = fireflySSTData.title;
    var text = "";
    var title = "<div class=\"layui-form-item\"><label class=\"layui-form-label\" style=\"white-space:nowrap\">第" + (sstIndex + 1) + "题/共" + (sstCurrentList.length) + "题, 题号:" + num + "&nbsp;&nbsp;" + name + "</label></div>"
    text = text + title;
    var simpleanswer = params.simpleanswer;
    var keyword = params.keyword;
    var chinese = params.chinese;
    if (simpleanswer) {
        text = text + "<br>简单答案:"+ "<br>"  + fireflySSTData.simpleAnswer;
    }
    if (keyword) {
        text = text + "<br>关键词:"+ "<br>"  + fireflySSTData.keyWords;
    }
    if (chinese) {
        text = text + "<br>中文速记:" + "<br>" + "<span style=\"font-size:16px;font-family:AaManYuShouXieTi;color:red;\">"+fireflySSTData.chineseContent+"</span>";
    }

    return text;
}

function createFireFlySSTPdfHtml(params, serNum, fireflySSTData) {

    var num = fireflySSTData.id;
    var name = fireflySSTData.title;
    var questionDiv = document.createElement("div");
    $(questionDiv).attr("style", "padding-left: 20px;padding-right: 20px;line-height: 30px;font-size: larger");
    var h3 = document.createElement("h3");
    h3.innerHTML = serNum + "." + "&nbsp;" + "&nbsp;" + name + "&nbsp;" + "&nbsp;题号:" + num + "<br/>" ;
    $(questionDiv).append(h3);
    var text = "";
    var simpleanswer = params.simpleanswer;
    var keyword = params.keyword;
    var chinese = params.chinese;
    if (simpleanswer) {
        text = text + "<br>简单答案:"+ "<br>"  + fireflySSTData.simpleAnswer;
    }
    if (keyword) {
        text = text + "<br>关键词:"+ "<br>"  + fireflySSTData.keyWords+ "<br>";
    }
    if (chinese) {
        text = text + "<br>中文速记:" + "<br>" + "<span style=\"font-size:16px;font-family:AaManYuShouXieTi;color:red;\">"+fireflySSTData.chineseContent+"</span>";
    }
    text = text + "<br/>"+ "<br/>";

    $(questionDiv).append(text);
    return questionDiv;
}




function sstNextQuest() {
    if (sstIndex < sstCurrentList.length - 1) {
        sstIndex++;
    }
    // var result = sstTranslateData();
    // return result;
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
function StringBuffer() {
    this.__strings__ = new Array;
}

StringBuffer.prototype.append = function (str) {
    this.__strings__.push(str);
};

StringBuffer.prototype.toString = function () {
    return this.__strings__.join("");
}
var isNeedLoadFont = true;

function createMenu() {
    $(".layui-header").remove();

    var ul =$("<ul class=\"layui-nav \"> </ul>");
    var dl = $("<dl class=\"layui-nav-child layui-anim layui-anim-upbit\" id=\"left-menu\"></dl>");
    var li=$(" <li class=\"layui-nav-item\"></li>")
    var a=$("<a href=\"javascript:;\">点击这里选择功能<i class=\"layui-icon layui-icon-down layui-nav-more\"></i></a>")



    $("#main").attr("class", "layui-fluid");
    $("#main").attr("style", "margin-top: 10px");
    $(".layui-side").remove();

    var allPages = [
        {
            "menuName": "FIB-RW阅读下拉",
            "url": getGitContentPre()+"/fibrw.html?access_token=c87299575627265144b7db286d3bf673"
        },
        {
            "menuName": "FIB-R阅读拖拽",
            "url": getGitContentPre()+"/fibr.html?access_token=c87299575627265144b7db286d3bf673"
        },
        {
            "menuName": "RO阅读排序",
            "url": getGitContentPre()+"/xjro.html?access_token=c87299575627265144b7db286d3bf673"
        },
        {
            "menuName": "WFD",
            "url": getGitContentPre()+"/fireflywfd.html?access_token=c87299575627265144b7db286d3bf673"
        },
        {
            "menuName": "SST",
            "url": getGitContentPre()+"/fireflysst.html?access_token=c87299575627265144b7db286d3bf673"
        },
        {
            "menuName": "WE",
            "url": getGitContentPre()+"/fireflywe.html?access_token=c87299575627265144b7db286d3bf673"
        },

        {
            "menuName": "生成PDF",
            "url": getGitContentPre()+"/createpdf.html?access_token=c87299575627265144b7db286d3bf673"
        },
        {
            "menuName": "乱序小工具",
            "url": getGitContentPre()+"/tools.html?access_token=c87299575627265144b7db286d3bf673"
        },
        {
            "menuName": "导出导入记录",
            "url": getGitContentPre()+"/processlocalstorage.html"+getGitContentAccess()
        }

    ]
    // var str = "";
    // allPages.forEach(function (obj) {
    //     str += '<li class="layui-nav-item layui-nav-itemed">';
    //     //拼接每一个地址
    //     str += '<a class="" href="javascript:;" onclick="openRight(\'' + obj.url + '\')">' + obj.menuName + '</a>';
    //     str += '</li>'
    // })
    var str = "";
    allPages.forEach(function (obj) {
        str += '<dd>';
        //拼接每一个地址
        str += '<a class="" href="javascript:;" onclick="openRight(\'' + obj.url + '\')">' + obj.menuName + '</a>';
        str += '</dd>'
    })
   // $("#left-menu").html(str);
    dl.html(str);
    li.prepend(a);
    li.append(dl);
    ul.append(li);
    var header=$("<div class=\"layui-header\"></div>")
    header.append(ul)
    $("body").prepend(header);
}


function createNav() {
    var allPages = [
        {
            "menuName": "FIB-RW阅读下拉",
            "url": getGitContentPre()+"/fibrw.html"+getGitContentAccess()
        },
        {
            "menuName": "FIB-R阅读拖拽",
            "url": getGitContentPre()+"/fibr.html"+getGitContentAccess()
        },
        {
            "menuName": "RO阅读排序",
            "url": getGitContentPre()+"/xjro.html"+getGitContentAccess()
        },
        {
            "menuName": "WFD",
            "url": getGitContentPre()+"/fireflywfd.html"+getGitContentAccess()
        },
        {
            "menuName": "SST",
            "url": getGitContentPre()+"/fireflysst.html"+getGitContentAccess()
        },
        {
            "menuName": "WE",
            "url": getGitContentPre()+"/fireflywe.html"+getGitContentAccess()
        },

        {
            "menuName": "生成PDF",
            "url": getGitContentPre()+"/createpdf.html"+getGitContentAccess()
        },
        {
            "menuName": "乱序小工具",
            "url": getGitContentPre()+"/tools.html"+getGitContentAccess()
        }
        ,
        {
            "menuName": "导出导入记录",
            "url": getGitContentPre()+"/processlocalstorage.html"+getGitContentAccess()
        }
    ]
    var str = "";
    allPages.forEach(function (obj) {
        str += '<dd>';
        //拼接每一个地址
        str += '<a class="" href="javascript:;" onclick="openRightNew(\'' + obj.url + '\')">' + obj.menuName + '</a>';
        str += '</dd>'
    })
    str += '<dd>';
    //拼接每一个地址
    str += '<a class="" href="javascript:;" onclick="resetLocation()">重置区域位置</a>';
    str += '</dd>'

    $("#left-menu").html(str);

}

function resetLocation() {
    layer.alert('请选择您所在区域', {
        btn: ['国内', '国外且可访问github'],
        btnAlign: 'c', // 按钮居中显示
        btn1: function(){
            window.localStorage.setItem("currentlocaltion", "china");
            location.reload();//刷新页面
        },
        btn2: function(){
            window.localStorage.setItem("currentlocaltion", "oversea");
            location.reload();//刷新页面
        }
    });
}
function openRightNew(url) {
    $.ajax({
        type:"get",
        async: false,
        url: url,
        success:function (data){
            var content;
            try {
                content = decodeURIComponent(escape(window.atob(data.content)));
            }catch (e){
                content = data;
            }
            // var content = decodeURIComponent(escape(window.atob(data.content)));
            $("#main").html(content);
        }
    });
    // $("#main").load(url)
}


function loadNotice() {
    var currentlocaltion = window.localStorage.getItem("currentlocaltion");
    if ("china" == currentlocaltion) {
        $("#main").load("https://gitee.com/api/v5/repos/jackiechan/ptepractise/raw/notice.html?access_token=c87299575627265144b7db286d3bf673&ref=webversion")
    }else if ("oversea" == currentlocaltion) {
        $("#main").load(getRawPre()+"/notice.html")
    }else{
        $("#main").load("https://gitee.com/api/v5/repos/jackiechan/ptepractise/raw/notice.html?access_token=c87299575627265144b7db286d3bf673&ref=webversion")
    }
    // $("#main").load("https://gitee.com/api/v5/repos/jackiechan/ptepractise/raw/notice.html?access_token=c87299575627265144b7db286d3bf673&ref=webversion")
    var version="4.5";
    var currentversion = window.localStorage.getItem("currentversion");
    if (version == currentversion) {
        layer.msg('祝你八炸九炸心想事成', {icon: 0}, function () {
        });
    }else{
        layer.confirm('功能发生变化,请看更新日志', {icon: 3}, function () {
            layer.msg('祝你八炸九炸心想事成', {icon: 0}, function () {
            });
            window.localStorage.setItem("currentversion", version);
        }, function () {
        });
    }
}

function initOthers() {
    loadNotice();
}

function getAlljs(version) {
    if (!version) {
        var time = new Date().getTime();
        var js = [
            "https://gitee.com/jackiechan/ptepractise/raw/main/js/fibrwprocess.js?time=" + time,
            "https://gitee.com/jackiechan/ptepractise/raw/main/js/fibrprocess.js?time=" + time,
            "https://gitee.com/jackiechan/ptepractise/raw/main/js/fireflywfd.js?time=" + time,
            "https://gitee.com/jackiechan/ptepractise/raw/main/js/fireflysst.js?time=" + time,
            "https://gitee.com/jackiechan/ptepractise/raw/main/js/xjrs.js?time=" + time,
            "https://gitee.com/jackiechan/ptepractise/raw/main/js/ptefibl.js?time=" + time,
            "https://gitee.com/jackiechan/ptepractise/raw/main/js/pteasq.js?time=" + time,
            "https://gitee.com/jackiechan/ptepractise/raw/main/js/xjro.js?time=" + time,
            "https://gitee.com/jackiechan/ptepractise/raw/main/js/we.js?time=" + time,
            "https://gitee.com/jackiechan/ptepractise/raw/main/js/fireflyrs.js?time=" + time,
            "https://gitee.com/jackiechan/ptepractise/raw/main/js/utils2.js?time=" + time
        ]
        return js;
    }else if (version == "1") {
        var currentlocaltion = window.localStorage.getItem("currentlocaltion");
        if (!currentlocaltion) {
            //还没有设置
            layer.alert('请选择您所在区域', {
                btn: ['国内', '国外且可访问github'],
                btnAlign: 'c', // 按钮居中显示
                btn1: function(){
                    window.localStorage.setItem("currentlocaltion", "china");
                    location.reload();//刷新页面
                },
                btn2: function(){
                    window.localStorage.setItem("currentlocaltion", "oversea");
                    location.reload();//刷新页面
                }
            });
        }else{
                var time = new Date().getTime();
                var js = [
                    getRawPre()+"/js/fibrwprocess.js?time="+time,
                    getRawPre()+"/js/fibrprocess.js?time="+time,
                    getRawPre()+"/js/fireflywfd.js?time="+time,
                    getRawPre()+"/js/fireflysst.js?time="+time,
                    getRawPre()+"/js/xjrs.js?time="+time,
                    getRawPre()+"/js/ptefibl.js?time="+time,
                    getRawPre()+"/js/pteasq.js?time="+time,
                    getRawPre()+"/js/xjro.js?time="+time,
                    getRawPre()+"/js/we.js?time="+time,
                    getRawPre()+"/js/fireflyrs.js?time="+time,
                    getRawPre()+"/js/utils2.js?time="+time
                ]
                return js;
        }


        // else if ("china" == currentlocaltion) {
        //     var time = new Date().getTime();
        //     var js = [
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/fibrwprocess.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/fibrprocess.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/fireflywfd.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/fireflysst.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/xjrs.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/ptefibl.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/pteasq.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/xjro.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/we.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/fireflyrs.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/utils2.js?time="+time
        //     ]
        //     return js;
        // }else if ("oversea" == currentlocaltion) {
        //     var time = new Date().getTime();
        //     var js = [
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/fibrwprocess.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/fibrprocess.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/fireflywfd.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/fireflysst.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/xjrs.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/ptefibl.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/pteasq.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/xjro.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/we.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/fireflyrs.js?time="+time,
        //         "https://gitee.com/jackiechan/ptepractise/raw/webversion/js/utils2.js?time="+time
        //     ]
        //     return js;
        // }

    }

}

function getRawPre() {
    var currentlocaltion = window.localStorage.getItem("currentlocaltion");
    if ("china" == currentlocaltion) {
        return "https://gitee.com/jackiechan/ptepractise/raw/webversion";
    }else if ("oversea" == currentlocaltion) {
        return "https://chenjunbo.github.io/ptepractise";
    }
}

function getGitContentPre() {
    var currentlocaltion = window.localStorage.getItem("currentlocaltion");
    if ("china" == currentlocaltion) {
        return "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents";
    }else if ("oversea" == currentlocaltion) {
        return "https://raw.githubusercontent.com/chenjunbo/ptepractise/webversion";
    }
}
function getGitContentAccess() {
    var currentlocaltion = window.localStorage.getItem("currentlocaltion");
    if ("china" == currentlocaltion) {
        return "?access_token=c87299575627265144b7db286d3bf673&ref=webversion";
    }else if ("oversea" == currentlocaltion) {
        return "";
    }
}

/**
 *
 * @param key
 * @param qNum
 * @param type 是fibrw还是fibr还是其他
 */
function add2LocalStorage(key, qNum, type) {
    window.localStorage.setItem(qNum + type, key);//根据题号保存,方便检查题目在不在
    var data = window.localStorage.getItem(key);
    if (!data) {
        data = {"nums": [qNum]};
        data = JSON.stringify(data);
    } else {
        var json = JSON.parse(data);
        var array = json.nums;
        const index = array.indexOf(qNum); // 找到要删除的元素的索引
        if (index == -1) {
            array.push(qNum);
            json.nums = array;
        }
        data = JSON.stringify(json);
    }
    window.localStorage.setItem(key, data);
}

function removeFavFromLocalStorage(qNum, type) {
    //数据保存的key
    var key = window.localStorage.getItem(qNum + type);
    var data = window.localStorage.getItem(key);
    if (data) {
        var json = JSON.parse(data);
        var array = json.nums;
        const index = array.indexOf(qNum); // 找到要删除的元素的索引
        if (index !== -1) {
            array.splice(index, 1); // 删除题号
            json.nums = array;
            window.localStorage.setItem(key, JSON.stringify(json))
        }
    }
    //删除题号的映射关系
    window.localStorage.removeItem(qNum + type);
}

function clearLocalStorageByKey(key, type) {
    var data = window.localStorage.getItem(key);
    if (data) {
        var json = JSON.parse(data);
        json.nums.push(qNum);
        var nums = json.nums;
        nums.forEach(function (qNum) {
            //删除所有的题号对应的位置
            window.localStorage.removeItem(qNum + type);
        });
    }
    window.localStorage.removeItem(key);
}

function getFromLocalStorage(key) {
    var value = window.localStorage.getItem(key);
    return value;
}

function removeFromLocalStorage(key) {
    window.localStorage.removeItem(key);
}

/**
 * 检查某个题号在不在localstorage,注意题哈需要添加类型区分,避免不同类型题目题号一样,value是这个题号在另外一个localstorage中的key
 * @param qNum
 */
function containsValue(qNum, type) {
    return window.localStorage.getItem(qNum + type);
}

function checkFav(qNum, type) {
    var value = window.localStorage.getItem(qNum + type);
    if (value) {
        $("#adddeletefav").html("从收藏中移除")
    } else {
        $("#adddeletefav").html("添加到收藏")
    }

}

function clearAllFaltByType(localStorageType) {
    removeFromLocalStorage(localStorageType + "falt");
    removeFromLocalStorage(localStorageType + "right");
    const keys = Object.keys(window.localStorage);
    keys.forEach((key) => {
        if (key.endsWith("falt" + localStorageType) || key.endsWith("right" + localStorageType)) {
            removeFromLocalStorage(key);
        }
    });
}

/**
 *
 * @param qNum 题号
 * @param rightorfalt 正确"right" 错误"falt"
 * @param localStroageType 题型类型
 */
function addRightOrFalt(qNum, rightorfalt, localStroageType) {
    var num = window.localStorage.getItem(qNum + rightorfalt + localStroageType);
    if (!num) {
        // window.localStorage.setItem(qNum + rightorfalt + localStroageType, 1);
        num = 1;
    } else {
        num = parseInt(num) + 1;
    }
    window.localStorage.setItem(qNum + rightorfalt + localStroageType, num);
    saveRightAndFaltByType(qNum, localStorageType + "right");
    saveRightAndFaltByType(qNum, localStorageType + "falt");
}

function saveRightAndFaltByType(qNum, key) {
    var data = window.localStorage.getItem(key);
    if (!data) {
        data = {"nums": [qNum]};
        data = JSON.stringify(data);
    } else {
        var json = JSON.parse(data);
        var array = json.nums;
        const index = array.indexOf(qNum); // 找到要删除的元素的索引
        if (index == -1) {
            array.push(qNum);
            json.nums = array;
        }
        data = JSON.stringify(json);
    }
    window.localStorage.setItem(key, data);
}


function deleteRightOrFaltByQnum(qNum, localStroageType) {
    window.localStorage.removeItem(qNum + "right" + localStroageType);
    window.localStorage.removeItem(qNum + "falt" + localStroageType);
}

function setRightAndFaltNum(qNum, localStroageType) {
    var rightNum = window.localStorage.getItem(qNum + "right" + localStroageType);
    if (!rightNum) {
        rightNum = "0";
    }
    var faltNum = window.localStorage.getItem(qNum + "falt" + localStroageType);
    if (!faltNum) {
        faltNum = "0";
    }
    var content = "<span style=\"color: #00b050;font-size: 18px; font-family: Arial, sans-serif;\">正确:</span><span style=\"color: red; font-size: 18px; font-family: Arial, sans-serif;\">" + rightNum + "</span><span style=\"font-family: Arial, sans-serif; font-size: 18px;\">次&nbsp;&nbsp;</span><span style=\"color: #00b050; font-family: Arial, sans-serif;font-size: 18px;\">错误:</span><span style=\"color: red; font-family: Arial, sans-serif;font-size: 18px;\">" + faltNum + "</span><span style=\"font-family: Arial, sans-serif;font-size: 18px;\">次</span>";
    $("#rightandfalt").html(content);
}

function getAllQuestionNumFromLocalStorageByFalt(localStroageType) {
    const keys = Object.keys(window.localStorage);
    var countMap = new Map();
    keys.forEach((key) => {
        if (key.endsWith("falt" + localStorageType)) {
            countMap.set(key.substring(0,key.indexOf("falt")), window.localStorage.getItem(key));
        }
    });
    const sortedEntries = Array.from(countMap).sort(([keyA, valueA], [keyB, valueB]) => {
        return valueB - valueA; // 或者使用其他比较算法来确定排序优先级
    });
    var resultList = new Array();
    sortedEntries.forEach(function (item,index){
        resultList.push(item[0]);
    })
    return resultList;
}

function exportAllLocalStorage() {
    const storage = {};
    for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        storage[key] = window.localStorage.getItem(key);
    }
    return storage;
}

function import2LocalStorage(storage) {
    for (key in storage) {
        window.localStorage.setItem(key, storage[key]);
    }
}
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
    var allPages = [
        {
            "menuName": "FIB-RW阅读下拉",
            "url": "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/fibrw.html?access_token=c87299575627265144b7db286d3bf673"
        },
        {
            "menuName": "FIB-R阅读拖拽",
            "url": "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/fibr.html?access_token=c87299575627265144b7db286d3bf673"
        },
        {
            "menuName": "WFD",
            "url": "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/fireflywfd.html?access_token=c87299575627265144b7db286d3bf673"
        },
        {
            "menuName": "SST",
            "url": "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/fireflysst.html?access_token=c87299575627265144b7db286d3bf673"
        },
        {
            "menuName": "生成PDF",
            "url": "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/createpdf.html?access_token=c87299575627265144b7db286d3bf673"
        }

    ]
    var str = "";
    allPages.forEach(function (obj) {
        str += '<li class="layui-nav-item layui-nav-itemed">';
        //拼接每一个地址
        str += '<a class="" href="javascript:;" onclick="openRight(\'' + obj.url + '\')">' + obj.menuName + '</a>';
        str += '</li>'
    })
    $("#left-menu").html(str);

    if (isNeedLoadFont) {
        // 字体文件的URL
        const fontURL = 'https://gitee.com/api/v5/repos/jackiechan/ptepractise/raw/font%2FAaManYuShouXieTi3.ttf?access_token=c87299575627265144b7db286d3bf673';

        // 创建一个新的FontFace对象
        const fontFace = new FontFace('AaManYuShouXieTi', `url(${fontURL})`, {
            weight: 'normal',
            style: 'normal',
            // 其他字体属性
        });

        // 加载字体
        fontFace.load().then(() => {
            // 字体加载成功后，将其安装到FontFaceSet中
            document.fonts.add(fontFace);
        }).catch(error => {
            // 字体加载失败的处理
            console.error('Font loading failed:', error);
        });

    }
    loadNotice();
}

function loadNotice() {
    $("#main").load("https://gitee.com/api/v5/repos/jackiechan/ptepractise/raw/notice.html?access_token=c87299575627265144b7db286d3bf673")
}
function initOthers() {
    isNeedLoadFont = false;
}

function getAlljs() {
    var js = [
        "https://gitee.com/jackiechan/ptepractise/raw/main/js/fibrwprocess.js",
        "https://gitee.com/jackiechan/ptepractise/raw/main/js/fibrprocess.js",
        "https://gitee.com/jackiechan/ptepractise/raw/main/js/fireflywfd.js",
        "https://gitee.com/jackiechan/ptepractise/raw/main/js/fireflysst.js",
        "https://gitee.com/jackiechan/ptepractise/raw/main/js/xjrs.js",
        "https://gitee.com/jackiechan/ptepractise/raw/main/js/ptefibl.js",
        "https://gitee.com/jackiechan/ptepractise/raw/main/js/pteasq.js",
        "https://gitee.com/jackiechan/ptepractise/raw/main/js/xjro.js",
        "https://gitee.com/jackiechan/ptepractise/raw/main/js/fireflyrs.js"
    ]
    return js;
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

function removeFromLocalStorage(qNum, type) {
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

/**
 *
 * @param qNum 题号
 * @param rightorfalt 正确"right" 错误"falt"
 * @param localStroageType 题型类型
 */
function addRightOrFalt(qNum, rightorfalt, localStroageType) {
    var num = window.localStorage.getItem(qNum+rightorfalt+localStroageType);
    if (!num) {
       // window.localStorage.setItem(qNum + rightorfalt + localStroageType, 1);
        num = 1;
    }else{
        num = parseInt(num) + 1;
    }
    window.localStorage.setItem(qNum + rightorfalt + localStroageType, num);
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
    var content = "<span style=\"color: #00b050;font-size: 18px; font-family: Arial, sans-serif;\">正确:</span><span style=\"color: red; font-size: 18px; font-family: Arial, sans-serif;\">"+rightNum+"</span><span style=\"font-family: Arial, sans-serif; font-size: 18px;\">次&nbsp;&nbsp;</span><span style=\"color: #00b050; font-family: Arial, sans-serif;font-size: 18px;\">错误:</span><span style=\"color: red; font-family: Arial, sans-serif;font-size: 18px;\">"+faltNum+"</span><span style=\"font-family: Arial, sans-serif;font-size: 18px;\">次</span>";
    $("#rightandfalt").html(content);
}


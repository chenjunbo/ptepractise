function StringBuffer() {
    this.__strings__ = new Array;
}

StringBuffer.prototype.append = function (str) {
    this.__strings__.push(str);
};

StringBuffer.prototype.toString = function () {
    return this.__strings__.join("");
}

function createMenu() {
    var allPages = [
        {
            "menuName": "FIB-RW阅读下拉",
            "url": "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/fibrw.html?access_token=2fd4d53480c117fa597505cebeceee9d"
        },
        {
            "menuName": "FIB-R阅读拖拽",
            "url": "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/fibr.html?access_token=2fd4d53480c117fa597505cebeceee9d"
        },
        {
            "menuName": "WFD",
            "url": "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/fireflywfd.html?access_token=2fd4d53480c117fa597505cebeceee9d"
        },
        {
            "menuName": "SST",
            "url": "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/fireflysst.html?access_token=2fd4d53480c117fa597505cebeceee9d"
        },
        {
            "menuName": "生成PDF",
            "url": "https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/createpdf.html?access_token=2fd4d53480c117fa597505cebeceee9d"
        }

    ]
    var str = "";
    allPages.forEach(function (obj) {
        str += '<li class="layui-nav-item layui-nav-itemed">';
        //拼接每一个地址
        str += '<a class="" href="javascript:;" onclick="openRight(\'' + obj.url + '\')">' + obj.menuName + '</a>';
        // if (obj.children.length > 0) {
        //     makeMenu(obj.children)
        // }
        str += '</li>'
    })
    $("#left-menu").html(str);
}

function getAlljs() {
    var js = [
        "https://gitee.com/jackiechan/ptepractise/raw/main/js/fibrwprocess.js",
        "https://gitee.com/jackiechan/ptepractise/raw/main/js/fibrprocess.js",
        "https://gitee.com/jackiechan/ptepractise/raw/main/js/fireflywfd.js",
        "https://gitee.com/jackiechan/ptepractise/raw/main/js/fireflysst.js"
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
    $.localStorage.set(qNum + type, key);//根据题号保存,方便检查题目在不在
    var data = $.localStorage.get(key);
    if (!data) {
        data = {"nums": [qNum]};
    } else {
        data.nums.push(qNum);
    }
    $.localStorage.set(key, data);
}

function removeFromLocalStorage(qNum, type) {
    //数据保存的key
    var key = $.localStorage.get(qNum + type);
    var data = $.localStorage.get(key);
    if (data) {
        var array = data.nums;
        const index = array.indexOf(qNum); // 找到要删除的元素的索引
        if (index !== -1) {
            array.splice(index, 1); // 删除题号
            data.nums = array;
            $.localStorage.set(key, data)
        }
    }
    //删除题号的映射关系
    $.localStorage.remove(qNum + type);
}

function clearLocalStorageByKey(key, type) {
    var data = $.localStorage.get(key);
    if (data) {
        var nums = data.nums;
        nums.forEach(function (qNum) {
            //删除所有的题号对应的位置
            $.localStorage.remove(qNum + type);
        });
    }
    $.localStorage.remove(key);
}

function getFromLocalStorage(key) {
    return $.localStorage.get(key);
}

/**
 * 检查某个题号在不在localstorage,注意题哈需要添加类型区分,避免不同类型题目题号一样,value是这个题号在另外一个localstorage中的key
 * @param qNum
 */
function containsValue(qNum, type) {
    return $.localStorage.get(qNum + type);
}

function checkFav(qNum, type) {
    var value = $.localStorage.get(qNum + type);
    if (value) {
        $("#adddeletefav").val("从收藏中移除")
    }else{
        $("#adddeletefav").val("添加到收藏")
    }

}
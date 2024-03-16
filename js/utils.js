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
    var allPages=[
        {"menuName":"FIB-RW阅读下拉","url":"https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/fibrw.html?access_token=2fd4d53480c117fa597505cebeceee9d"},
        {"menuName":"FIB-R阅读拖拽","url":"https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/fibr.html?access_token=2fd4d53480c117fa597505cebeceee9d"},
        {"menuName":"WFD","url":"https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/fireflywfd.html?access_token=2fd4d53480c117fa597505cebeceee9d"},
        {"menuName":"SST","url":"https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/fireflysst.html?access_token=2fd4d53480c117fa597505cebeceee9d"},
        {"menuName":"生成PDF","url":"https://gitee.com/api/v5/repos/jackiechan/ptepractise/contents/createpdf.html?access_token=2fd4d53480c117fa597505cebeceee9d"}

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
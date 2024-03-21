function loadNotice() {
    $("#main").load("https://gitee.com/api/v5/repos/jackiechan/ptepractise/raw/notice.html?access_token=c87299575627265144b7db286d3bf673")
    var version="1";
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
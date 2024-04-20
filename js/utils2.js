var interval;
function startTimer() {
    if (interval) {
        clearInterval(interval);
    }
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var showhours="", showminutes="", showseconds="";
    interval= setInterval(() => {
        seconds++; // 增加秒数
        if (seconds >= 60) {
            seconds = 0; // 重置秒数
            minutes++; // 增加分钟
        }
        if (minutes >= 60) {
            minutes = 0; // 重置分钟
            hours++; // 增加小时
        }

        // 格式化时间

        showhours = hours < 10 ? '0' + hours : hours;
        showminutes = minutes < 10 ? '0' + minutes : minutes;
        showseconds = seconds < 10 ? '0' + seconds : seconds;

        // 更新显示的时间
        $("#timer").html(showhours + ':' + showminutes + ':' + showseconds);
    }, 1000);
}

function gotoxj(local,type, qNum) {
    var url = "https://www.ptexj.com/zh-CN/practice/{{type}}/{{qNum}}";
    var msg="即将跳转到⭐️中文区答题,请确认已经登录⭐️,同一账号无法同时登录中英文双区"
    if (local == "en") {
        url = "https://www.apeuni.com/en/practice/{{type}}/{{qNum}}";
         msg="即将跳转到⭐️英文区答题,请确认已经登录⭐️,同一账号无法同时登录中英文双区";
    }
    url = url.replace("{{type}}", type)
    url = url .replace("{{qNum}}", qNum);
    var alwaysshowgotoxjtip = window.localStorage.getItem("alwaysshowgotoxjtip");

    if (!alwaysshowgotoxjtip) {
        layer.alert(msg, {
            btn: ['跳转', '跳转并下次不再提示','取消'],
            btnAlign: 'c', // 按钮居中显示
            btn1: function(){
                window.open(url, '_blank');
            },
            btn2: function(){
                window.open(url, '_blank');
                window.localStorage.setItem("alwaysshowgotoxjtip", "false");
            },
            btn3: function(){

            }
        });
    }else{
        window.open(url, '_blank');
    }



    // layer.confirm(msg, {icon: 3}, function () {
    //     url = url.replace("{{type}}", type)
    //     url = url .replace("{{qNum}}", qNum);
    //     window.open(url, '_blank');
    //     layer.msg('努力刷刷刷', {icon: 0}, function () {
    //     });
    // }, function () {
    // });

}
function copystring(value, onError, onSuccess) {
    if (value === undefined) return;
    const input = document.createElement("textarea");
    // 设置 display为none会导致无法复制
    // input.style.display = "none";
    // 所以只能用其他方法隐藏
    input.style.opacity = 0;
    // 为了不影响布局
    input.style.position = 'fixed';
    input.style.left = "-100%";
    input.style.top = "-100%";
    input.value = value;
    document.body.appendChild(input);
    input.select()
    const success = document.execCommand("copy");
    document.body.removeChild(input);
    if (!success) {
        onError && onError();
        return;
    }
    onSuccess && onSuccess();
}
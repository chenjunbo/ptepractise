function startTimer() {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    var showhours="", showminutes="", showseconds="";
    setInterval(() => {
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
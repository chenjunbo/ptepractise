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
    var version="4.15.4";
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

function loadWFDChangeLog() {
    var currentlocaltion = window.localStorage.getItem("currentlocaltion");
    if ("china" == currentlocaltion) {
        $("#main").load("https://gitee.com/api/v5/repos/jackiechan/ptepractise/raw/wfdchangelog.html?access_token=c87299575627265144b7db286d3bf673&ref=webversion")
    }else if ("oversea" == currentlocaltion) {
        $("#main").load(getRawPre()+"/notice.html")
    }else{
        $("#main").load("https://gitee.com/api/v5/repos/jackiechan/ptepractise/raw/wfdchangelog.html?access_token=c87299575627265144b7db286d3bf673&ref=webversion")
    }
    // layer.open({
    //     type: 1,
    //     // area: ['420px', '240px'], // 宽高
    //     content: '<!DOCTYPE html>\n' +
    //         '<html lang="en">\n' +
    //         '<head>\n' +
    //         '    <meta charset="UTF-8">\n' +
    //         '    <title>WFD换题季变化</title>\n' +
    //         '</head>\n' +
    //         '<body>\n' +
    //         '<h2>2024.04.15 萤火虫相较于上周190句更新:</h2>\n' +
    //         '<span style="font-size: 26px; color: red">\n' +
    //         '新增:131110:Organization plays an important role in academic literature.\n' +
    //         '新增:131245:The summer course is canceled due to insufficient enrollment.\n' +
    //         '新增:131303:When parents talk to children, the tense tends to be simplified.\n' +
    //         '新增:131834:This course places considerable emphasis on critical thinking skills.\n' +
    //         '新增:131016:All students are expected to attend ten lab sessions per semester.\n' +
    //         '新增:131235:The results of study underscored the importance of early detection.\n' +
    //         '新增:131259:The visiting speaker used to be a lecturer in this department.\n' +
    //         '新增:1311025:Visual aid can be really helpful when you are revising.\n' +
    //         '新增:131412:The economy is now showing the first sign of recovery.\n' +
    //         '新增:131265:There is clearly a need for further research in this field.\n' +
    //         '新增:131295:We can work together to achieve high educational standard.\n' +
    //         '更新:131476:更新前Some vocational courses at institutions are funded by private enterprises. ->更新后 Many vocational courses at institutions are funded by private enterprises.\n' +
    //         '新增:131122:Please note that the submission deadlines are only negotiable in exceptional circumstances.\n' +
    //         '新增:131153:Some students find that true or false questions are harder than short answers.\n' +
    //         '新增:131330:Speak to your tutor if you require further assistance.\n' +
    //         '新增:131118:Peer group pressure has a significant effect on young people.\n' +
    //         '新增:131211:The history of the university is a long and interesting one.\n' +
    //         '新增:131434:You should submit your term papers to the general office.\n' +
    //         '新增:131633:New media journalism is an exciting area of study.\n' +
    //         '升频:1311015:Any gain on sales of property must be allocated promptly.\n' +
    //         '新增:131093:Many birds migrate to warmer areas for the winter.<br/>\n' +
    //         '新增:131107:Nurses can specialize in clinical work or management.<br/>\n' +
    //         '新增:131111:Organizational failure is considered from various perspectives in academic literature.<br/>\n' +
    //         '新增:131142:The supposed benefits of space exploration are frequently questioned.<br/>\n' +
    //         '新增:131146:She has made a significant contribution to the field of chemistry.<br/>\n' +
    //         '新增:131150:Some economists argue that the entire financial system is fatally flawed.<br/>\n' +
    //         '新增:131173:A bar chart provides a useful means of data comparison.<br/>\n' +
    //         '新增:131183:The business policy seminar includes an internship with a local firm.<br/>\n' +
    //         '新增:131196:The rising inflation rate indicates a decrease in demand for consumer products.<br/>\n' +
    //         '新增:131198:The earth\'s atmosphere is primarily composed of oxygen and nitrogen gases.<br/>\n' +
    //         '新增:131230:The qualification will be assessed by using a criterion-referenced approach.<br/>\n' +
    //         '新增:131239:The school’s summer programs help students to accelerate their studies.<br/>\n' +
    //         '新增:131249:The new technician dropped the microscope in the biology lab.<br/>\n' +
    //         '新增:131285:Traveling by boat on the river is not possible in winter.<br/>\n' +
    //         '新增:131293:Water filters on campus will discourage the unnecessary use of plastic bottles.<br/>\n' +
    //         '新增:131309:Upload your assignments to the website by Tuesday.<br/>\n' +
    //         '新增:131313:You must submit your assignments by next Friday at the latest.<br/>\n' +
    //         '新增:131334:Education and training provide important skills for the labor force.<br/>\n' +
    //         '新增:131336:Find out how to get resources before your research.<br/>\n' +
    //         '新增:131339:Global connections thrived in academic communities, thanks to social media.<br/>\n' +
    //         '新增:131346:Several candidates would be qualified as the greatest scientists of all time.<br/>\n' +
    //         '新增:131348:The Industrial Revolution in Europe was driven by steam technology.<br/>\n' +
    //         '新增:131375:New credit cards will soon use fingerprint technology.<br/>\n' +
    //         '新增:131380:Collaboration between departments is a feature of successful companies.<br/>\n' +
    //         '新增:131393:This course provides the opportunity to get valuable industry experience.<br/>\n' +
    //         '新增:131401:The ability to work with fellow students cannot be stressed enough.<br/>\n' +
    //         '新增:131409:The elective course introduces engineering students to construction practices and concepts.<br/>\n' +
    //         '新增:131483:Distance learning allows you to develop a career around your commitments.<br/>\n' +
    //         '新增:131506:It takes a long time to walk to university.<br/>\n' +
    //         '新增:131535:Many food crops require large amounts of water and fertilizer.<br/>\n' +
    //         '新增:131844:A typical part of the course involves the study of society.<br/>\n' +
    //         '新增:131896:This new camera can identify your eyes and focus on them.<br/>\n' +
    //         '新增:131929:The dance department stages elaborated performances each semester.<br/>\n' +
    //         '新增:131936:Read the first section before the next meeting.<br/>\n' +
    //         '新增:131990:One student representative will be selected from each class.<br/>\n' +
    //         '新增:131992:All answers must be thoroughly researched and supported by relevant theories.<br/>\n' +
    //         '新增:1311017:Efforts are being made to reduce harmful emissions.<br/>\n' +
    //         '新增:1311054:She began by giving an outline of the previous lecture.<br/>\n' +
    //         '更新:131308:更新前Years of training are required to become a medical specialist.->更新后 Years of training is needed to become a medical specialist.<br/>\n' +
    //         '</span>\n' +
    //         '</body>\n' +
    //         '</html>'
    // });
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
            "https://gitee.com/jackiechan/ptepractise/raw/main/js/utils2.js?time=" + time,
            "https://gitee.com/jackiechan/ptepractise/raw/main/js/xjasq.js?time=" + time
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
                    getRawPre()+"/js/xjasq.js?time="+time,
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
var xjrsweekconten,xjrsmonthconten,xjrsallconten,xjrsallcontendesc;
var excWords = ["it","their","from","of", "to", "as", "at", "on",
    "in", "for", "by", "about", "with", "up", "a", "an", "the", "this", "that", "is", "are",
    "was", "were", "has", "have", "had", "been", "be", "can", "could", "would", "should", "I",
    "you", "he", "she", "his", "her", "your", "and", "or","they","more","but","our","which","not",
    "people","we","we","also","one","new","these","than","when","such","will","how","many","may",
    "most","into","other","all","some","its","who","study","there","if","what","while","water","reset",
    "age","add","after","before","afternoon","ago","air","am",
    "the","it","must","this","a","get","me","very","good","make","student","book","books","most","want","class","don't","our","your","many","lot","food","start","day","find","go","here","to",
    "over","so","like","years","year","time","them","often","use","used","us","do","out","now","where",
    "two","one","yes","no","it's","—"]

function xjrsInit() {
    $.get(getGitContentPre()+"/data/rs/xjrsweek.txt"+getGitContentAccess(), function (response) {

        try {
            xjrsweekconten = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        } catch (e){
            xjrsweekconten = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
        }
        // xjrsweekconten=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
    })
    $.get(getGitContentPre()+"/data/rs/xjrsmonth.txt"+getGitContentAccess(), function (response) {
        try {
            xjrsmonthconten = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        } catch (e){
            xjrsmonthconten = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
        }
        // xjrsmonthconten=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
    })
    $.get(getGitContentPre()+"/data/rs/xjrsall.txt"+getGitContentAccess(), function (response) {
        try {
            xjrsallconten = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        } catch (e){
            xjrsallconten = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
        }
        // xjrsallconten=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
    })
    $.get(getGitContentPre()+"/data/rs/xjrsalldesc.txt"+getGitContentAccess(), function (response) {
        try {
            xjrsallcontendesc = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        } catch (e){
            xjrsallcontendesc = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
        }
        // xjrsallcontendesc=decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
    })
}

function create_all_xj_rs_words_order_by_dic(order_by_count,newPage,name) {
    $.get(getGitContentPre()+"/data/rs/xjrsallpinlv.txt"+getGitContentAccess(), function (response) {
        var allWords = ""
        try {
            allWords = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response.content)))))))));
        } catch (e){
            allWords = decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(response))))));
        }
        allWords = allWords.replaceAll(".", "").replaceAll(",", "").replaceAll("?", "").replaceAll("(", "").replaceAll(")", "").toLowerCase();
        var table = document.createElement("table");
        var thead = document.createElement("thead");
        var thead_tr = document.createElement("tr");
        var word_th = document.createElement("th");
        var count_th = document.createElement("th");
        word_th.innerHTML = "单词"
        count_th.innerHTML = "频率"
        thead_tr.appendChild(word_th)
        thead_tr.appendChild(count_th)
        thead.appendChild(thead_tr)
        table.appendChild(thead)
        var tbody = document.createElement("tbody");
        let result = allWords.split(" ").reduce((temp, data) => {
            if (!data||excWords.indexOf(data) > -1 || startsWithNumber(data) ) {

            } else {
                temp[data] = temp[data] ? temp[data] + 1 : 1;
            }
            return temp;
        }, {})
        var sorted_result_by_count = Object.keys(result).sort((key1, key2) => result[key2] - result[key1]);
        var sorted_result_by_char = Object.keys(result).sort((key1, key2) => {
            let a = key1.toLowerCase();
            let b = key2.toLowerCase();
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });
        console.log(sorted_result_by_count)
        console.log(sorted_result_by_char)
        var array = sorted_result_by_char;
        if (order_by_count) {
            array = sorted_result_by_count;
        }
        array.forEach((word, index) => {
            var wordTd = document.createElement("td");
            var tr = document.createElement("tr");
            var countTd = document.createElement("td");
            wordTd.innerHTML = word;
            countTd.innerHTML = result[word];
            tr.appendChild(wordTd)
            tr.appendChild(countTd)
            tbody.appendChild(tr)
        })
        table.appendChild(tbody)
        var body = newPage.body;
        body.appendChild(table);
        fillPdf(newPage, name);
    })
}
function currentxjrsweekconten() {
    return xjrsweekconten;
}
function currentxjrsmonthconten() {
    return xjrsmonthconten;
}

function currentxjrsallcontent() {
    return xjrsallconten;
}
function currentxjrsallcontentdesc() {
    return xjrsallcontendesc;
}

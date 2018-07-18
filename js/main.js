// ファイル読み込み
$(function (handleload) {
    var req = new XMLHttpRequest();

    req.addEventListener("load", handleload, false);
    req.open("GET", "csv/dat_book.csv", true);
    req.send(null);     // httpリクエストの発行

    req.onload = function() {
        convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
    };
});


// CSVをいい感じに変換
function convertCSVtoArray(str) {
    var result = [];
    var tmp = str.split("\n");
    console.log(tmp.length);
    for (var i = 1; i < tmp.length; ++i) {
        result[i] = tmp[i].split('\t');
    }
    initVue(result);
}

// 必要最低限の情報に絞る
function creatData(data){
    var result = [];
    
}

// Vue.jsでかきこむ
function initVue(info) {
    new Vue({
        el: "#book",
        data: {
            infos: info
        }
    });
}
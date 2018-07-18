// ファイル読み込み
// $(function (handleload) {
//     var req = new XMLHttpRequest();

//     req.addEventListener("load", handleload, false);
//     req.open("GET", "csv/dat_book.csv", true);
//     req.send(null);     // httpリクエストの発行

//     req.onload = function() {
//         convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
//     };
// });

// openbdで本のデータを取得
function getBookData(isbn){
    // const url = 'https://api.openbd.jp/v1/get?isbn=' + isbn;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function()
    {
        if( this.readyState == 4 && this.status == 200 )
        {
            if( this.response )
            {
                console.log(this.response);
                // 読み込んだ後処理したい内容をかく

            }
        }
    }

    req.open( 'GET', 'https://api.openbd.jp/v1/get?isbn='+isbn, true );
    req.responseType = 'json';
    req.send( null );
}


// main
$(function(handleload){
    // readFile("csv/dat_book.csv", handleload);
    getBookData("9784043878024");
});

// ファイルの読み込み
function readFile(file, handleload){
    var req = new XMLHttpRequest();
    req.addEventListener("load", handleload, false);
    req.open("GET", file, true);
    req.send(null);
    req.onload = function(){
        convertCSVtoArray(req.responseText);
    };
}

// CSVをいい感じに変換
function convertCSVtoArray(str) {
    var result = [];
    var tmp = str.split("\n");
    console.log(tmp.length);
    for (var i = 1; i < tmp.length; i++) {
        result[i] = tmp[i].split('\t');
    }
    for(var j = 0; j< tmp.length; j++){
        for(var i = 2; i< tmp.length; i++){
            if(result[i][1] < result[i-1][1]){
                var temp = result[i-1];
                result[i-1] = result[i];
                result[i] = temp;
                getBookData(result[5]);
            }
        }
    }

    
    
    // result[1].sort();
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
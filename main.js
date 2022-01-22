"use strict";

const   FONT = "48px monospace";
let gImgMap;

//タイマーイベント発生時の処理
function WimTimer()
{
    const ca = document.getElementById("main");     //mainキャンバスの要素を追加
    const g = ca.getContext( "2d" );                //2D描画今ｔ系ストを取得

    for( let y = 0; y < 16; y++){
        for( let x = 0;x < 16; x++){
            g.drawImage( gImgMap, x * 32, y * 32);
        }
    }

    g.font = FONT;                                  //文字フォントを指定
    g.fillText( "鉄血のオルフェンズ", 0, 64);       
}
//ブラウザ起動イベント
window.onload = function()
{
    gImgMap = new Image();
    gImgMap.src = "img/tile1.png"
    setInterval( function() { WimTimer();}, 33);     //33ms間隔で、WimTimer()を呼び出す
}


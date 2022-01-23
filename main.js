"use strict";

const   FONT = "48px monospace";
const   HEIGHT = 120;
const   WIDTH = 128;
let gScreen;
let gImgMap;

function DrawMain()
{
    const g = gScreen.getContext( "2d" );                //2D描画今ｔ系ストを取得

    for( let y = 0; y < 32; y++){
        for( let x = 0;x < 64; x++){
            g.drawImage( gImgMap, x * 32, y * 32);
        }
    }

    g.font = FONT;                                  //文字フォントを指定
    g.fillText( "鉄血のオルフェンズ", 0, 64);  
}

function WimPaint()
{
        
    DrawMain();

    const ca = document.getElementById("main");     //mainキャン
    const g = ca.getContext( "2d" );                //2D描画今ｔ系ストを取得
    g.drawImage( gScreen, 0, 0, gScreen.width, gScreen.height, 0, 0, ca.width, ca.height);
}

//タイマーイベント発生時の処理
function WimTimer()
{
    WimPaint();
}

function WimSize()
{
    const ca = document.getElementById("main");     //mainキャンバスの要素を追加
    ca.width = window.innerWidth;
    ca.height = window.innerHeight;
}

//ブラウザ起動イベント
window.onload = function()
{
    gImgMap = new Image();    gImgMap.src = "img/tile1.png"
    
    gScreen = document.createElement( "canvas" ) ;  //仮想画面を作成
    gScreen.width = WIDTH;
    gScreen.height = HEIGHT;
    
    WimSize();                                      //画面サイズ初期化
    window.addEventListener( "reize", function(){WimSize()});       //プラウザサイズ変更時にWimSize呼び出し
    setInterval( function() { WimTimer();}, 33);     //33ms間隔で、WimTimer()を呼び出す
}


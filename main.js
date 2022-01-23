"use strict";

const   FONT = "48px monospace";
const   HEIGHT = 120;
const   WIDTH = 128;
const   SMOOTH = 0;
let gScreen;        //仮想画面
let gWidth;         //実画面の幅
let gHeight;        //実画面の高さ
let gImgMap;        //画面

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
    g.drawImage( gScreen, 0, 0, gScreen.width, gScreen.height, 0, 0, gWidth, gHeight);
}

//タイマーイベント発生時の処理
function WimTimer()
{
    WimPaint();
}

//ブラウザサイズ変更イベント
function WimSize()
{
    const ca = document.getElementById("main");     //mainキャンバスの要素を追加
    ca.width = window.innerWidth;
    ca.height = window.innerHeight;

    const g = ca.getContext( "2d" );            //2D描写コンテキストを取得
    g.imageSmoothingEnabled = g.msImageSmoothingEnabled = SMOOTH;    //補間処理

    // 実画面サイズを測定。ドットのアスペクト比を維持したままでの最大サイズを計測する。
    gWidth = ca.width;
    gHeight = ca.height;
    if( gWidth / WIDTH < gHeight / HEIGHT ){
        gHeight = gWidth * HEIGHT / WIDTH;
    }else{
        gWidth = gHeight * WIDTH / HEIGHT;
    }
    
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


"use strict";

const   CHRHEIGHT = 32;             //キャラの高さ
const   CHRWIDTH = 32;              //キャラの幅
const   FONT = "48px monospace";    //使用フォント
const   WIDTH = 32 * 25;            //仮想画面サイズ。高さ
const   HEIGHT = 32 * 14;           //仮想画面サイズ。幅
const   MAP_WIDTH = 26;             //マップの高さ
const   MAP_HEIGHT = 15;            //マップの幅
const   SMOOTH = 1;                 //補間処理
const   TILESIZE = 32;              //タイルサイズ
const   TILECOLUMN = 36;            //タイル桁数
const   TILEROW = 12;               //タイル行数

let gScreen;        //仮想画面
let gWidth;         //実画面の幅
let gHeight;        //実画面の高さ
let gImgMap;        //画面
let gImgPlayer;     //画像。プレイヤー
let gPlayerX = 0;   //プレイヤーX座標
let gPlayerY = 0;   //プレイヤーY座標

const gFileMap      = "img/Outside_A2.png";
const gFilePlayer   = "img/Tekkadan.png";


const gMap = [
0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2

];

function DrawMain()
{
    const g = gScreen.getContext( "2d" );                //2D描画今ｔ系ストを取得

    for( let y = 0; y < 32; y++){
        for( let x = 0; x < 32; x++){
            let px = gPlayerX + x;
            let py = gPlayerY + y;
            DrawTile(g, x * TILESIZE, y * TILESIZE - TILESIZE / 2, gMap[ py * MAP_WIDTH + px]);
            
        }
    }

    g.fillStyle = "#ff0000";
    g.fillRect( 0, HEIGHT / 2 - 1, WIDTH, 2);
    g.fillRect( WIDTH / 2 -1, 0, 2, HEIGHT )

    g.drawImage( gImgPlayer, 
                 CHRWIDTH, 0,
                 CHRWIDTH, CHRHEIGHT,
                 WIDTH / 2 - CHRWIDTH / 2, HEIGHT / 2 - CHRHEIGHT / 2, CHRWIDTH, CHRHEIGHT);

    // g.font = FONT;                                  //文字フォントを指定
    // g.fillText( "鉄血のオルフェンズ", 0, 64);  
}

function DrawTile(g, x, y, idx){
    const ix = (idx % TILECOLUMN) * TILESIZE;
    const iy = Math.floor(idx / TILECOLUMN) * TILESIZE;
    g.drawImage( gImgMap, ix, iy, TILESIZE, TILESIZE, x, y, TILESIZE, TILESIZE);
}

function LoadImage()
{
    gImgMap     = new Image(); gImgMap.src = gFileMap     //マップ画像読み込み
    gImgPlayer  = new Image(); gImgPlayer.src = gFilePlayer  //プレイヤー
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

// キー入力(DOWN)イベント
window.onkeydown = function ( ev )
{
    let c = ev.keyCode;

    if( c == 37 )  gPlayerX--;     //左
    if( c == 38 )  gPlayerY--;     //上
    if( c == 39 )  gPlayerX++;     //右
    if( c == 40 )  gPlayerY++;     //下
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
    LoadImage();
    
    gScreen = document.createElement( "canvas" ) ;  //仮想画面を作成
    gScreen.width = WIDTH;
    gScreen.height = HEIGHT;
    
    WimSize();                                      //画面サイズ初期化
    window.addEventListener( "reize", function(){WimSize()});       //プラウザサイズ変更時にWimSize呼び出し
    setInterval( function() { WimTimer();}, 33);     //33ms間隔で、WimTimer()を呼び出す
}


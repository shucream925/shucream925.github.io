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
const   TILECOLUMN = 26;            //タイル桁数
const   TILEROW = 15;               //タイル行数

let gScreen;        //仮想画面
let gWidth;         //実画面の幅
let gHeight;        //実画面の高さ
let gImgMap;        //画面
let gImgPlayer;     //画像。プレイヤー
let gPlayerX = 0;   //プレイヤーX座標
let gPlayerY = 0;   //プレイヤーY座標

const gFileMap      = "img/Outside2.png";
const gFilePlayer   = "img/Tekkadan.png";


const gMap = [
1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453
];

function DrawMain()
{
    const g = gScreen.getContext( "2d" );                //2D描画今ｔ系ストを取得

    for( let y = 0; y < 32; y++){
        for( let x = 0; x < 32; x++){
            let px = gPlayerX + x;
            let py = gPlayerY + y;
            DrawTile(g, x * TILESIZE, y * TILESIZE, gMap[ py * MAP_WIDTH + px]);
            
        }
    }

    g.drawImage( gImgPlayer, 
                 CHRWIDTH, 0,
                 CHRWIDTH, CHRHEIGHT,
                 WIDTH/2, HEIGHT/2, CHRWIDTH, CHRHEIGHT);

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


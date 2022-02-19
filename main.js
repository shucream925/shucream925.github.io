"use strict";

const   CHRHEIGHT = 32;                 //キャラの高さ
const   CHRWIDTH = 32;                  //キャラの幅
const   FONT = "24px monospace";        //使用フォント
const   FONT_MARGE_SIZE = 30;                 //フォントサイズ
const   FONTSTYLE = "#FFFFFF"
const   HP_BAR_STYLE = "#3eb370"        //HPバーの色
const   WIDTH = 32 * 25;                //仮想画面サイズ。高さ
const   HEIGHT = 32 * 14;               //仮想画面サイズ。幅
const   INTERVAL = 33;                  //フレーム呼出し間隔
const   SCR_HEIGHT = 15;                //画面タイルサイズの半分の高さ
const   SCR_WIDTH = 13;                 //画面タイルサイズの半分の幅
const   SCR_SPEED = 8;                  //スクロール速度
const   SMOOTH = 0;                     //補間処理
const   START_HP = 20;                  //初期HP           
const	START_X = 12;			        //スタート位置X	
const	START_Y	= 1;	                //スタート位置Y
const   TILESIZE = 32;                  //タイルサイズ(ドット)
const   WNDSTYLE = "rgba(0, 0, 0, 0.7)";//ウィンドウの色

const   gKey = new Uint8Array( 0x100 );    //キー入力バッファ

var audio_menu = new Audio('./sound/menu.mp3');
var audio_op = new Audio('./sound/Iron-Blooded-Orphans.mp3');

let init = false;
let gFrame = 0;
let gAngle = 0;     //プレイヤーの角度

let gEx = 0;        //初期経験値
let gHP = START_HP;  //初期HP
let gMAXHP = START_HP;  //最大HP
let gLv = 5;        //プレイヤーのレベル

let gScreen;        //仮想画面
let gWidth;         //実画面の幅
let gHeight;        //実画面の高さ
let	gMessage1 = null;					//	表示メッセージ１
let	gMessage2 = null;					//	表示メッセージ２
let gMoveX = 0;     //移動量X
let gMoveY = 0;     //移動量Y
let gImgMap;        //画面
let gImgPlayer;     //画像。プレイヤー
let gImgMessage;    //メッセージ画像
let gImgCommand;    //メッセージ画像
let gImgMenu;    //メッセージ画像
let gPlayerX = START_X * TILESIZE + TILESIZE /2 ;   //プレイヤーX座標
let gPlayerY = START_Y * TILESIZE + TILESIZE /2 ;   //プレイヤーY座標
let gImgFight_Background;       //戦闘背景
let MS_num;
let fadeout_count = 1.0;
let count_fadein = 0;

let   MAP_WIDTH = 0;                 //マップの高さ
let   MAP_HEIGHT = 0;                //マップの幅
let   TILECOLUMN = 0;                //タイル桁数
let   TILEROW = 0;                   //タイル行数

//キャラクター画像
const gChar_MIka = 'img/MIka.png';
let gImg_Mika;
const gChar_Akihiro = 'img/Akihiro.png';
let gImg_Akihiro;
const gChar_Sino = 'img/Sino.png';
let gImg_Sino;
const gOP = 'img/op.jpg';
let gImg_OP;


let Fight_command = [
    //tblFight_command, 
    [0, 0],     //MS1 
    [0, 0],     //MS2
    [0, 0],     //MS3
    [0, 0]      //MAX
];

let gPlayer;

let gPhase = 0;     //戦闘フェーズ
let gStatus = 0;
let gCursor = 0;        //カーソル位置

//画像読み込み
const gFileMap      = "img/Outside_A2.png";
const gFilePlayer   = "img/Tekkadan.png";
const gMessage_window = 'img/Message_window2.png';
const gCommand_window = 'img/command_window.png';
const gMenu_window = 'img/Menu_window.png';
const gFight_Background = 'img/Fight_Background1.png';
const gFight_Mind_status = 'img/Mind_status.png'
const gFight_Enemy_status = 'img/Enemy_status.png'

const Player = class{
    constructor( MS1, MS2, MS3, MS4 ){
    this.MS1 = MS1;       //搭乗MS1
    this.MS2 = MS2;       //搭乗MS2
    this.MS3 = MS3;       //搭乗MS3
    }
}

// メインステータス
var tblStatus = {
    op : 0,
    map : 1,
    battle : 2,
    menu : 3
};

//マップ定義
let gMap;
let gMap_object;

//Main描写
function DrawMain()
{
    const g = gScreen.getContext( "2d" );   //2D描画コンテキストを取得
    
    if(init == false){
        SetUpMS( );       //MS情報の設定
        gPlayer     = new Player(Barbtos1, null, null);
        map_set1();
        gMap_state = Map_list.load;
        MS_num = 1;
        init = true;
    }

    if( gStatus == tblStatus.op){
        // gStatus = tblStatus.map          //OP飛ばし
        DrawOp( g );       //OP描写
    }
    else if( gStatus == tblStatus.map){
        DrawMap( g );       //マップ描写
    }
    else if( gStatus == tblStatus.battle )
    {
        // audio_op.play();
        // audio_op.volume = 0.2;
        DrawFight( g );     //戦闘描写
    }
    else if( gStatus == tblStatus.menu )
    {
        DrawMap( g );       //マップ描写
        DrawMenu( g );
    }

}

function DrawOp( g ){
    
    g.drawImage( gImg_OP ,0,0, 1280, 956, 0, 0, WIDTH, HEIGHT);
    
    if( fadeout_count > 0){
        ani_imagefadein( g );
    }else{
        // audio_op.play();
    }
    g.globalAlpha = 1.0;
}

//メッセージ描画
function DrawMessage( g )
{
    if( !gMessage1 )
    {
        return;
    }

    g.fillStyle = FONTSTYLE;
    g.fillText( gMessage1, tblMessageposition[0], tblMessageposition[1]);					//	メッセージ１行目描画
	if( gMessage2 ){
		g.fillText( gMessage2, tblMessageposition[0], tblMessageposition[1] + 20);			//	メッセージ２行目描画
	}
    
}



function SetMessage( v1, v2 )
{
	gMessage1 = v1;
	gMessage2 = v2;
}

//フィールド進行処理
function TickField()
{
    map_init();
    
    if( gMoveX != 0 || gMoveY != 0){}       //移動中の場合
    else if( gKey[37] ){ gAngle = 1; gMoveX = - TILESIZE }     //左
    else if( gKey[38] ){ gAngle = 3; gMoveY = - TILESIZE }     //上
    else if( gKey[39] ){ gAngle = 2; gMoveX =  TILESIZE }     //右
    else if( gKey[40] ){ gAngle = 0; gMoveY =  TILESIZE };     //下

    //移動後のタイル座標判定
    let mx = Math.floor( ( gPlayerX + gMoveX ) / TILESIZE);  //タイル座標X 
    let my = Math.floor( ( gPlayerY + gMoveY ) / TILESIZE);  //タイル座標Y
    mx += MAP_WIDTH;        //マップループ処理X
    mx %= MAP_WIDTH;        //マップループ処理X
    my += MAP_HEIGHT;       //マップループ処理Y
    my %= MAP_HEIGHT;       //マップループ処理Y

    let m = gMap1_object[ my * MAP_WIDTH + mx ];        //タイル番号

    if( Math.abs( gMoveX ) + Math.abs( gMoveY ) >= SCR_SPEED )	//	マス目移動が終わる直前
    {
        
        switch( gMap_state ){
            case Map_list.town:
                TickField_town( m );
                break;

            case Map_list.load:
                TickField_load( m );
                break;
        }
    }

    gPlayerX += SCR_SPEED * Math.sign( gMoveX );        //プレイヤー座標移動X
    gPlayerY += SCR_SPEED * Math.sign( gMoveY );        //プレイヤー座標移動Y
    gMoveX -= SCR_SPEED * Math.sign( gMoveX );          //移動消費量X
    gMoveY -= SCR_SPEED * Math.sign( gMoveY );          //移動消費量Y

    //マップループ処理
    gPlayerX += ( MAP_WIDTH * TILESIZE );
    gPlayerX %= ( MAP_WIDTH * TILESIZE );
    gPlayerY += ( MAP_HEIGHT * TILESIZE );
    gPlayerY %= ( MAP_HEIGHT * TILESIZE );
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
    gFrame++;
    if(gStatus == tblStatus.map ){
        TickField();            //フィールド進行処理
    }
    WimPaint();
}

function DrawMenu( g )
{
    if((count_fadein > 0.20)&&(count_fadein < 0.40)){
        //audio_menu.play();
    }
    // メニューウィンドウ表示
    if(count_fadein <= 1){
        fadeout( g );
    }else{
        g.fillStyle = 'rgba(0,0,0,1)';
        g.fillRect( 0, 0, WIDTH, HEIGHT);
        g.drawImage(gImgMenu, 0, 0, 1830, 1007, 10, 10, WIDTH-20, HEIGHT-20);

        g.font = FONT;          //文字フォントを指定
        g.fillStyle = FONTSTYLE;

        if( gPlayer.MS1 != null){
            gImg_Mika = new Image();    gImg_Mika.src = gChar_MIka; //戦闘自分ステータス画像
            g.drawImage(gImg_Mika, 0, 0, 79, 80, 50, 40 + Math.floor(HEIGHT/3) * 0, 79, 80);
            g.fillText( gPlayer.MS1.NAME, 200, 50 + Math.floor(HEIGHT/3) * 0);
            g.fillText( " Lv." + gPlayer.MS1.Lv, 220, 80 + Math.floor(HEIGHT/3) * 0);
            g.fillText( " ATT:" + gPlayer.MS1.ATT + "   DFF:" + gPlayer.MS1.DEF + "   SPD:" + gPlayer.MS1.SPD, 400, 80 + Math.floor(HEIGHT/3) * 0);
            g.fillText( " HP:" + gPlayer.MS1.HP + "/" + gPlayer.MS1.MAXHP, 220, 110 + Math.floor(HEIGHT/3) * 0);
        }
        if( gPlayer.MS2 != null){
            gImg_Akihiro = new Image();    gImg_Akihiro.src = gChar_Akihiro; //戦闘自分ステータス画像
            g.drawImage(gImg_Akihiro, 0, 0, 79, 80, 50, 40 + Math.floor(HEIGHT/3) * 1, 79, 80);
            g.fillText( gPlayer.MS2.NAME, 200, 50 + Math.floor(HEIGHT/3) * 1);
            g.fillText( " Lv." + gPlayer.MS2.Lv, 220, 80 + Math.floor(HEIGHT/3) * 1);
            g.fillText( " ATT:" + gPlayer.MS2.ATT + "   DFF:" + gPlayer.MS2.DEF, 400, 80 + Math.floor(HEIGHT/3) * 1);
            g.fillText( " HP:" + gPlayer.MS2.HP + "/" + gPlayer.MS2.MAXHP, 220, 110 + Math.floor(HEIGHT/3) * 1);
        }
        if( gPlayer.MS3 != null){
            gImg_Sino = new Image();    gImg_Sino.src = gChar_Sino; //戦闘自分ステータス画像
            g.drawImage(gImg_Sino, 0, 0, 79, 80, 50, 40 + Math.floor(HEIGHT/3) * 2, 79, 80);
            g.fillText( gPlayer.MS3.NAME, 200, 50 + Math.floor(HEIGHT/3) * 2);
            g.fillText( " Lv." + gPlayer.MS3.Lv, 220, 80 + Math.floor(HEIGHT/3) * 2);
            g.fillText( " ATT:" + gPlayer.MS3.ATT + "   DFF:" + gPlayer.MS3.DEF, 400, 80 + Math.floor(HEIGHT/3) * 2);
            g.fillText( " HP:" + gPlayer.MS3.HP + "/" + gPlayer.MS3.MAXHP, 220, 110 + Math.floor(HEIGHT/3) * 2);
        }
    }
}

// キー入力(DOWN)イベント
window.onkeydown = function ( ev )
{
    let c = ev.keyCode;

    gKey[ c ] = 1;

    if(( gStatus == tblStatus.op)&&(CHK_CLICK_ENTER(c) == true)){
        // g.globalAlpha = 1.0;
        gStatus = tblStatus.map
        count_fadein = 0;
    }

    if(( gStatus == tblStatus.map)||( gStatus == tblStatus.menu )){
        gStatus = keydown_map( c, gStatus );
    }else if( gStatus == tblStatus.battle){
        battle_onkeydown( c );
    }

}

function keydown_map( prm_c, prm_gStatus )
{
    
    if( prm_c == 77 ){
        return tblStatus.menu;
    }else{
        count_fadein = 0;       //フェードインカウントのリセット
        return tblStatus.map;
    }
    
    // return prm_gStatus;
}

window.onkeyup = function( ev )
{
    gKey[ ev.keyCode] = 0;
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
    
    gScreen = document.createElement( "canvas" );  //仮想画面を作成
    gScreen.width = WIDTH;
    gScreen.height = HEIGHT;
    
    WimSize();                                      //画面サイズ初期化
    window.addEventListener( "reize", function(){WimSize()});       //プラウザサイズ変更時にWimSize呼び出し
    setInterval( function() { WimTimer();}, INTERVAL);     //33ms間隔で、WimTimer()を呼び出す
}

function fadeout( g ){
    g.fillStyle = 'rgba(0,0,0,1)';
    count_fadein += 0.1
    g.globalAlpha = count_fadein;

    g.fillRect( 0, 0, WIDTH, HEIGHT);

}

function ani_imagefadein( g ){
    g.fillStyle = 'rgba(0,0,0,1)';
    fadeout_count -= 0.01
    g.globalAlpha = fadeout_count;

    g.fillRect( 0, 0, WIDTH, HEIGHT);
}

"use strict";

const   CHRHEIGHT = 32;                 //キャラの高さ
const   CHRWIDTH = 32;                  //キャラの幅
const   FONT = "24px monospace";        //使用フォント
const   FONT_MARGE_SIZE = 30;                 //フォントサイズ
const   FONTSTYLE = "#FFFFFF"
const   WIDTH = 32 * 25;                //仮想画面サイズ。高さ
const   HEIGHT = 32 * 14;               //仮想画面サイズ。幅
const   INTERVAL = 33;                  //フレーム呼出し間隔
const   MAP_WIDTH = 26;                 //マップの高さ
const   MAP_HEIGHT = 30;                //マップの幅
const   SCR_HEIGHT = 15;                //画面タイルサイズの半分の高さ
const   SCR_WIDTH = 13;                 //画面タイルサイズの半分の幅
const   SCR_SPEED = 8;                  //スクロール速度
const   SMOOTH = 0;                     //補間処理
const   START_HP = 20;                  //初期HP           
const	START_X = 1;			        //スタート位置X	
const	START_Y	= 15;	                //スタート位置Y
const   TILESIZE = 32;                  //タイルサイズ(ドット)
const   TILECOLUMN = 16;                //タイル桁数
const   TILEROW = 12;                   //タイル行数
const   WNDSTYLE = "rgba(0, 0, 0, 0.7)";//ウィンドウの色

const   gKey = new Uint8Array( 0x100 );    //キー入力バッファ


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
let gPlayerX = START_X * TILESIZE + TILESIZE /2 ;   //プレイヤーX座標
let gPlayerY = START_Y * TILESIZE + TILESIZE /2 ;   //プレイヤーY座標
let gImgFight_Background;       //戦闘背景
let CommandCount;
let Enemy_target;
let MS_name;
let MS_damage;
let Enemy_target_MS;

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
    map : 0,
    battle : 1,
    menu : 2
};

// 戦闘コマンドステータス
var tblFight_command = {
    Attack : 1,
    Special : 2,
    Deffence : 3,
    Item : 4
};

//マップ定義
const gMap = [
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,18,19,0,20,21,0,0,0,0,0,22,23,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,34,35,0,36,37,0,0,0,0,0,38,39,0,0,0,0,0,0,0,48,48,48,48,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,0,0,48,48,48,48,0,0,
0,48,48,48,48,0,4,4,4,0,0,0,0,0,0,5,5,5,0,0,48,48,48,48,0,0,
0,48,48,48,48,0,4,4,4,0,0,4,4,4,0,0,0,0,0,0,48,48,48,48,0,0,
0,48,48,48,48,0,4,4,4,0,0,4,4,4,0,0,0,0,0,0,48,48,48,48,0,0,
0,48,48,48,48,0,4,4,4,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,
0,48,48,48,48,0,4,4,4,0,0,48,48,48,48,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,4,4,4,0,0,48,48,48,48,0,0,4,4,4,0,0,0,0,0,0,
0,20,21,0,0,0,4,4,4,0,0,48,48,48,48,0,0,4,4,4,0,0,0,0,0,0,
0,36,37,0,0,0,4,4,4,0,0,48,48,48,48,0,0,4,4,4,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,48,48,48,48,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,0,0,
0,22,23,0,0,0,0,0,0,0,0,0,0,0,0,19,0,20,21,0,0,5,5,5,0,0,
0,38,39,0,0,0,0,0,0,0,48,48,48,48,0,35,0,36,37,0,0,5,5,5,0,0,
0,0,0,0,0,5,5,5,0,0,48,48,48,48,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,5,5,5,0,0,48,48,48,48,0,48,48,48,0,0,0,0,0,0,0,0,
0,4,4,4,0,0,0,0,0,0,48,48,48,48,0,48,48,48,0,0,0,0,0,5,5,0,
0,4,4,4,0,0,0,0,0,0,48,48,48,48,0,48,48,48,0,0,0,0,0,5,5,0,
0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,48,48,48,0,0,0,0,0,5,5,0,
0,48,48,48,48,0,0,0,0,0,0,0,0,0,0,48,48,48,0,0,0,0,0,5,5,0,
0,48,48,48,48,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,
0,48,48,48,48,0,0,4,4,4,0,0,0,0,0,21,0,0,0,0,0,0,0,5,5,0,
0,48,48,48,48,0,0,4,4,4,0,0,0,0,0,37,0,0,0,0,0,0,0,5,5,0,
0,48,48,48,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
];



//Main描写
function DrawMain()
{
    const g = gScreen.getContext( "2d" );   //2D描画コンテキストを取得
    
    if(init == false){
        SetUpMS( );       //MS情報の設定
        gPlayer     = new Player(Barbtos1, GusionRebake, Ryuseigo2);
        init = true;
    }

    if( gStatus == tblStatus.map){
        DrawMap( g );       //マップ描写
    }
    else if( gStatus == tblStatus.battle )
    {
        if(gPhase == tblFightPhase.begin){ init_Fight() }
        DrawFight( g );     //戦闘描写
    }
    else if( gStatus == tblStatus.menu )
    {
        DrawMap( g );       //マップ描写
        DrawMenu( g );
    }

}

//マップ描画
function DrawMap( g ){
    let		mx = Math.floor( gPlayerX / TILESIZE );
	let		my = Math.floor( gPlayerY / TILESIZE );

    for( let dy = -SCR_HEIGHT; dy <= SCR_HEIGHT; dy++){
        let ty = my + dy;           //タイル座標Y
        let py = ( ty + MAP_HEIGHT ) % MAP_HEIGHT;  //ループ後のタイル座標
        for( let dx = -SCR_WIDTH; dx <= SCR_WIDTH; dx++){
			let	tx = mx + dx;	    //タイル座標X
            let px = ( tx + MAP_WIDTH ) % MAP_WIDTH;     //ループ後のタイル座標
            DrawTile(g,
                     tx * TILESIZE + WIDTH / 2 - gPlayerX,
                     ty * TILESIZE + HEIGHT / 2 - gPlayerY,
                     gMap[ py * MAP_WIDTH + px]);
            
        }
    }

    //プレイヤー
    g.drawImage( gImgPlayer, 
                 ( gFrame >> 3 & 1) * CHRWIDTH, gAngle * CHRHEIGHT,
                 CHRWIDTH, CHRHEIGHT,
                 WIDTH / 2 - CHRWIDTH / 2, 
                 HEIGHT / 2 - CHRHEIGHT / 2, 
                 CHRWIDTH, CHRHEIGHT);
    
    DrawMessage( g );               //メッセージ描画
}

//メッセージ描画
function DrawMessage( g )
{
    if( !gMessage1 )
    {
        return;
    }

    g.fillStyle = FONTSTYLE;

    let tblMessageposition = [10, 348 + FONT_MARGE_SIZE];
    
    //メッセージウィンドゥ描写
    g.drawImage( gImgMessage, 0, 0, 2000, 248, 0, 348, 800, 100 );

    //機体名表示
    if( gPhase != tblFightPhase.end )
    {
        if( gPlayer.MS1 != null){
            g.fillStyle = FONTSTYLE;
            if( CommandCount == 0){
                g.font = FONT; 
            }else{
                g.font = "18px monospace";
            }
            g.fillText( gPlayer.MS1.NAME, tblMessageposition[0], tblMessageposition[1]);       //機体名
            g.font = FONT;
            g.fillText( "Lv" + gPlayer.MS1.Lv , 500, 348 + FONT_MARGE_SIZE);
            g.fillText( gPlayer.MS1.HP + "/" + gPlayer.MS1.MAXHP, 575, 348 + FONT_MARGE_SIZE);                      //HP
            g.fillStyle = "#000000";    g.fillRect( 575, 382, 100, 4);
            g.fillStyle = "#3eb370";    g.fillRect( 575, 382, 100 * (gPlayer.MS1.HP / gPlayer.MS1.MAXHP), 4);      //HPバー
        }
        if( gPlayer.MS2 != null){
            g.fillStyle = FONTSTYLE;
            if( CommandCount == 1){
                g.font = FONT; 
            }else{
                g.font = "18px monospace";
            }
            g.fillText( gPlayer.MS2.NAME, tblMessageposition[0], tblMessageposition[1] + FONT_MARGE_SIZE);       //機体名
            g.font = FONT;
            g.fillText( "Lv" + gPlayer.MS2.Lv , 500, 348 + FONT_MARGE_SIZE * 2);
            g.fillText( gPlayer.MS2.HP + "/" + gPlayer.MS2.MAXHP, 575, 348 + FONT_MARGE_SIZE * 2);                      //HP
            g.fillStyle = "#000000";    g.fillRect( 575, 382+ FONT_MARGE_SIZE, 100, 4);
            g.fillStyle = "#3eb370";    g.fillRect( 575, 382 + FONT_MARGE_SIZE, 100 * (gPlayer.MS2.HP / gPlayer.MS2.MAXHP), 4);      //HPバー
        }
        if( gPlayer.MS3 != null){
            g.fillStyle = FONTSTYLE;
            if( CommandCount == 2){
                g.font = FONT; 
            }else{
                g.font = "18px monospace";
            }
            g.fillText( gPlayer.MS3.NAME, tblMessageposition[0], tblMessageposition[1] + FONT_MARGE_SIZE * 2);       //機体名
            g.font = FONT;
            g.fillText( "Lv" + gPlayer.MS3.Lv , 500, 348 + FONT_MARGE_SIZE * 3);
            g.fillText( gPlayer.MS3.HP + "/" + gPlayer.MS3.MAXHP, 575, 348 + FONT_MARGE_SIZE * 3);                      //HP
            g.fillStyle = "#000000";    g.fillRect( 575, 382+ FONT_MARGE_SIZE*2, 100, 4);
            g.fillStyle = "#3eb370";    g.fillRect( 575, 382 + FONT_MARGE_SIZE*2, 100 * (gPlayer.MS3.HP / gPlayer.MS3.MAXHP), 4);      //HPバー
        }
        g.fillText( Greize.HP + "/" + Greize.MAXHP, 400, 100);                      //HP
        g.fillText( Fight_order_count, 400, 125);                      //HP
        g.fillText( gPhase, 400, 150);                      //HP
    }

    //バトルコマンド表示
    if( gPhase == tblFightPhase.continue )
    {
        g.drawImage(gImgCommand, 0, 0, 435, 249, 300, 348, 175, 100);
        tblMessageposition[0] += 300; 
    }

    if(( gPhase >= tblFightPhase.myturn )||( gPhase <= tblFightPhase.preend ))
    {           
        if((Fight_order_count >= 0 )&&(Fight_order_count < 5 )){
            g.drawImage(gImgCommand, 0, 0, 435, 249, 200, 348, 275, 100);
            g.font = "18px monospace";;          //文字フォントを指定
            SetMessage(MS_name + "の攻撃", Enemy_target_MS + "に" + MS_damage +"ダメージ");
            tblMessageposition[0] += 200; 
        }
    }


    g.fillStyle = FONTSTYLE;
    g.fillText( gMessage1, tblMessageposition[0], tblMessageposition[1]);					//	メッセージ１行目描画
	if( gMessage2 ){
		g.fillText( gMessage2, tblMessageposition[0], tblMessageposition[1] + 20);			//	メッセージ２行目描画
	}
    
}

function DrawTile(g, x, y, idx)
{
    const ix = (idx % TILECOLUMN) * TILESIZE;
    const iy = Math.floor(idx / TILECOLUMN) * TILESIZE;
    g.drawImage( gImgMap, ix, iy, 
                 TILESIZE, TILESIZE,
                 x, y, 
                 TILESIZE, TILESIZE);
}

function SetMessage( v1, v2 )
{
	gMessage1 = v1;
	gMessage2 = v2;
}

//フィールド進行処理
function TickField()
{
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

    let m = gMap[ my * MAP_WIDTH + mx ];        //タイル番号

    if( Math.abs( gMoveX ) + Math.abs( gMoveY ) == SCR_SPEED )	//	マス目移動が終わる直前
    {
        if(( m != 0 )&&( m != 48 )){
            gMoveX = 0;     //移動禁止
            gMoveY = 0;     //移動禁止
        }

        // if(m == 48){
        //     SetMessage("止まるんじゃねぇぞ...", null);
        // }

        if(( Math.random() * 4 < 1 )&&(gPhase == tblFightPhase.pre)){        //ランダムエンカウント
            gPhase = tblFightPhase.begin;         //摘出現
            gStatus = tblStatus.battle;
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
    // メニューウィンドウ表示
    g.fillStyle = 'rgba(0,0,0,0.4)';
    g.fillRect( 10, 10, 400, 150);

    g.font = "18px monospace";          //文字フォントを指定
    g.fillStyle = FONTSTYLE;
    
    //項目表示
    g.fillText( "機体名", 15, 30 + 18 * 0);
    g.fillText( "レベル", 220, 30 + 18 * 0);
    g.fillText( "HP", 300, 30 + 18 * 0);

    if( gPlayer.MS1 != null){
        g.fillText( gPlayer.MS1.NAME, 15, 30 + 18 * 1);
        g.fillText( " Lv." + gPlayer.MS1.Lv, 220, 30 + 18 * 1);
        g.fillText( " HP:" + gPlayer.MS1.HP + "/" + gPlayer.MS1.MAXHP, 300, 30 + 18 * 1);
    }
    if( gPlayer.MS2 != null){
        g.fillText( gPlayer.MS2.NAME, 15, 30 + 18 * 2);
        g.fillText( " Lv." + gPlayer.MS2.Lv, 220, 30 + 18 * 2);
        g.fillText( " HP:" + gPlayer.MS2.HP + "/" + gPlayer.MS2.MAXHP, 300, 30 + 18 * 2);
    }
    if( gPlayer.MS3 != null){
        g.fillText( gPlayer.MS3.NAME, 15, 30 + 18 * 3);
        g.fillText( " Lv." + gPlayer.MS3.Lv, 220, 30 + 18 * 3);
        g.fillText( " HP:" + gPlayer.MS3.HP + "/" + gPlayer.MS3.MAXHP, 300, 30 + 18 * 3);
    }
}

// キー入力(DOWN)イベント
window.onkeydown = function ( ev )
{
    let c = ev.keyCode;

    gKey[ c ] = 1;

    switch( gPhase ){
        case tblFightPhase.pre:       //
            gStatus = keydown_map( c, gStatus );
            break;

        case tblFightPhase.begin:       //	戦闘コマンド選択フェーズ
            gPhase = tblFightPhase.continue;
            SetMessage( " ", " " );
            break;

        case tblFightPhase.continue:
            //コマンドウィンドウ
            if(( c == 38 )&&( gCursor > 0 )){
                gCursor = gCursor - 1 ;
                break;
            }else if(( c == 38 )&&( gCursor <= 0 )){
                gCursor = 3 ;
                break;
            }else if( c == 40 ){
                gCursor = (gCursor + 1 ) %  4;
                break;
            }
            
            if(( c == 13)&&(CommandCount < 2)){      //Enterキー
                Fight_command[ CommandCount ][ 1 ] = gCursor  + 1;
                gCursor = 0;
                CommandCount += 1;
                break;
            }
            if(( c == 13)&&(CommandCount >= 2)){
                gPhase = tblFightPhase.start;
                //SetMessage( " ", " " );
                CommandCount = 4;
                break;
            }
            break;
        

        case tblFightPhase.start:
            if( Greize.HP <= 0 ){
                gPhase = tblFightPhase.preend;
                break;
            }
            if(Fight_order_count >= 4){
                Fight_order_count = 0;
            }
            if(Fight_order[Fight_order_count] == 11){
                gPhase = tblFightPhase.enemyturn;
            }else{
                gPhase = tblFightPhase.myturn;
            }
            break;

        case tblFightPhase.myturn:
            if( c = 13){
                
                if(Fight_order[Fight_order_count] == gPlayer.MS1.ID){
                    Greize.HP -= damage_val( Greize, gPlayer.MS1);
                    MS_name = gPlayer.MS1.NAME;
                    MS_damage = damage_val( Greize, gPlayer.MS1);
                    CommandCount = 0;
                }
                if(Fight_order[Fight_order_count] == gPlayer.MS2.ID){
                    Greize.HP -= damage_val( Greize, gPlayer.MS2);
                    MS_name = gPlayer.MS2.NAME;
                    MS_damage = damage_val( Greize, gPlayer.MS2);
                    CommandCount = 1;
                }
                if(Fight_order[Fight_order_count] == gPlayer.MS3.ID){
                    Greize.HP -= damage_val( Greize, gPlayer.MS3);
                    MS_name = gPlayer.MS3.NAME;
                    MS_damage = damage_val( Greize, gPlayer.MS3);
                    CommandCount = 2;
                }
                Enemy_target_MS = Greize.NAME;
                Fight_order_count++;

                gPhase = tblFightPhase.start;
                break;
            }
            break;
        case tblFightPhase.enemyturn:
            if( c = 13){ 

                Enemy_target = 1;//Math.floor((Math.random()*3) % 3);
                CommandCount = Enemy_target;
                gPhase = tblFightPhase.start;

                if( Enemy_target == 0){
                    gPlayer.MS1.HP -= damage_val( gPlayer.MS1, Greize );
                    MS_name = Greize.NAME;
                    MS_damage = damage_val( gPlayer.MS1, Greize );
                    Enemy_target_MS = gPlayer.MS1.NAME;
                }
                if( Enemy_target == 1){
                    gPlayer.MS2.HP -= damage_val( gPlayer.MS2, Greize );
                    MS_name = Greize.NAME;
                    MS_damage = damage_val( gPlayer.MS2, Greize );
                    Enemy_target_MS = gPlayer.MS2.NAME;
                }
                if( Enemy_target == 2){
                    gPlayer.MS3.HP -= damage_val( gPlayer.MS3, Greize );
                    MS_name = Greize.NAME;
                    MS_damage = damage_val( gPlayer.MS3, Greize );
                    Enemy_target_MS = gPlayer.MS3.NAME;
                }
                Fight_order_count++;
                gPhase = tblFightPhase.start;
            }
            break;
        
        case tblFightPhase.preend:
            if(c == 13){
                SetMessage("敵機を倒した", null);
                AddExp( gPlayer.MS1, 1 );    //経験値加算
                AddExp( gPlayer.MS2, 1 );    //経験値加算
                AddExp( gPlayer.MS3, 1 );    //経験値加算
                gPlayer = new Player(CHK_Evolve( gPlayer.MS1 ), 
                                    CHK_Evolve( gPlayer.MS2 ),
                                    CHK_Evolve( gPlayer.MS3 ));
                gPhase = tblFightPhase.end;
            }
            break;
        case tblFightPhase.end:
            if(c == 13){
                gPhase = tblFightPhase.pre;
                gStatus = tblStatus.map;
                SetMessage(null,null);
            }
            break;
    }
}

function keydown_map( prm_c, prm_gStatus )
{

    if( prm_c == 77 ){
        return tblStatus.menu;
    }

    if( prm_c == 8 ){
        return tblStatus.map;
    }

    return prm_gStatus;
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
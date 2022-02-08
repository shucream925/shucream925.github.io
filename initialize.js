"use strict";
// MS定義
let Barbtos1;
let Barbtos2;
let Barbtos3;
let Barbtos4;
let Barbtos5space;
let Barbtos5ground;
let Barbtos6;
let BarbtosRups;
let BarbtosRupsRecs;
let GusionRebake;
let Ryuseigo2;
let Greize;



// 画像変数定義
let gImgFight_Greize_MS;
let gImgFight_Barbatos1_MS;
let gImgFight_Barbatos2_MS;
let gImgFight_Barbatos3_MS;
let gImgFight_Barbatos4_MS;
let gImgFight_Barbatos5space_MS;
let gImgFight_Barbatos5ground_MS;
let gImgFight_Barbatos6_MS;
let gImgFight_BarbatosRups_MS;
let gImgFight_BarbatosRupsRecs_MS;
let gImgFight_GusionRebake_MS;
let gImgFight_Ryuseigo2_MS;

let gImgFight_Mind_status;
let gImgFight_Enemy_status;

//機体画像
const gFight_Greize_MS = 'img/Greize.png';
const gFight_Barbatos1_MS = 'img/Barbtos1.png';
const gFight_Barbatos2_MS = 'img/Barbtos2.png';
const gFight_Barbatos3_MS = 'img/Barbtos3.png';
const gFight_Barbatos4_MS = 'img/Barbtos4.png';
const gFight_Barbatos5space_MS = 'img/Barbtos5space.png';
const gFight_Barbatos5ground_MS = 'img/Barbtos5ground.png';
const gFight_Barbatos6_MS = 'img/Barbtos6.png';
const gFight_BarbatosRups_MS = 'img/BarbtosRups.png';
const gFight_BarbatosRupsRecs_MS = 'img/BarbtosRupsRecs.png';
const gFight_GusionRebake_MS = 'img/GusionRebake.png';
const gFight_Ryuseigo2_MS = 'img/Ryuseigo2.png';



//Class定義
const MS = class{
    constructor(ID, NAME, HP, MAXHP, ATT, DEF, SPD, Ex, Lv, IMG, EVO){
       this.ID = ID;            //ID
       this.NAME = NAME;        //NAME
       this.HP = HP;            //HP
       this.MAXHP = MAXHP;      //HPの最大値
       this.ATT = ATT;      //攻撃力
       this.DEF = DEF;      //守備力
       this.SPD = SPD;      //すばやさ
       this.Ex = Ex;      //初期経験値
       this.Lv = Lv;      //初期レベル
       this.IMG = IMG;      //画像
       this.EVO = EVO;      //進化先MS
    }
}

//技定義
var arrayBarbatos = new Array(
    ["メイス", 30], ["滑空砲",40], ["太刀", 50],
);

/*************************************************** 
概要 : 画像の初期読み込み
引数 : 無し
戻値 : 無し
***************************************************/
function LoadImage()
{
    gImgMap     = new Image();
    gImgMap.src = gFileMap;     //マップ画像読み込み
    
    gImgPlayer  = new Image();
    gImgPlayer.src = gFilePlayer;  //プレイヤー画像
    
    gImgMessage = new Image();
    gImgMessage.src = gMessage_window; //メッセージウィンドゥ

    gImgCommand = new Image();
    gImgCommand.src = gCommand_window; //コマンドウィンドゥ
    
    gImgMenu = new Image();
    gImgMenu.src = gMenu_window; //コマンドウィンドゥ

    gImgFight_Background = new Image();
    gImgFight_Background.src = gFight_Background; //戦闘背景
    
    gImgFight_Mind_status = new Image();
    gImgFight_Mind_status.src = gFight_Mind_status; //戦闘自分ステータス画像

    gImgFight_Enemy_status = new Image();
    gImgFight_Enemy_status.src = gFight_Enemy_status; //戦闘自分ステータス画像

    //機体画像
    gImgFight_Greize_MS = new Image();
    gImgFight_Greize_MS.src = gFight_Greize_MS; //グレイズ

    gImgFight_Barbatos1_MS = new Image();
    gImgFight_Barbatos1_MS.src = gFight_Barbatos1_MS; //バルバトス1
    
    gImgFight_Barbatos2_MS = new Image();
    gImgFight_Barbatos2_MS.src = gFight_Barbatos2_MS; //バルバトス2

    gImgFight_Barbatos3_MS = new Image();
    gImgFight_Barbatos3_MS.src = gFight_Barbatos3_MS; //バルバトス3

    gImgFight_Barbatos4_MS = new Image();
    gImgFight_Barbatos4_MS.src = gFight_Barbatos4_MS; //バルバトス4

    gImgFight_Barbatos5space_MS = new Image();
    gImgFight_Barbatos5space_MS.src = gFight_Barbatos5space_MS; //バルバトス5

    gImgFight_Barbatos5ground_MS = new Image();
    gImgFight_Barbatos5ground_MS.src = gFight_Barbatos5ground_MS; //バルバトス5

    gImgFight_Barbatos6_MS = new Image();
    gImgFight_Barbatos6_MS.src = gFight_Barbatos6_MS; //バルバトス6

    gImgFight_BarbatosRups_MS = new Image();
    gImgFight_BarbatosRups_MS.src = gFight_BarbatosRups_MS; //バルバトスルプス

    gImgFight_BarbatosRupsRecs_MS = new Image();
    gImgFight_BarbatosRupsRecs_MS.src = gFight_BarbatosRupsRecs_MS; //バルバトスルプスレクス

    gImgFight_GusionRebake_MS = new Image();
    gImgFight_GusionRebake_MS.src = gFight_GusionRebake_MS; //グシオンリベイク

    gImgFight_Ryuseigo2_MS = new Image();
    gImgFight_Ryuseigo2_MS.src = gFight_Ryuseigo2_MS; //流星号２
}

/*************************************************** 
概要 : MS情報呼出し
引数 : g
戻値 : 無し
***************************************************/
function SetUpMS( ){
    BarbtosRupsRecs = new MS(1, "バルバトスルプスレクス", gHP, gMAXHP, 70, 50, 65, gEx, gLv, gImgFight_BarbatosRupsRecs_MS, null);
    BarbtosRups     = new MS(1, "バルバトスルプス", gHP, gMAXHP, 60, 40, 55, gEx, gLv, gImgFight_BarbatosRups_MS, BarbtosRupsRecs);
    Barbtos6        = new MS(1, "バルバトス第六形態", gHP, gMAXHP, 52, 45, 45, gEx, gLv, gImgFight_Barbatos6_MS, BarbtosRups);
    Barbtos5ground  = new MS(1, "バルバトス第五地上形態", gHP, gMAXHP, 48, 36, 45, gEx, gLv, gImgFight_Barbatos5ground_MS, Barbtos6);
    Barbtos5space   = new MS(1, "バルバトス第五宇宙形態", gHP, gMAXHP, 48, 45, 45, gEx, gLv, gImgFight_Barbatos5space_MS, Barbtos5ground);
    Barbtos4        = new MS(1, "バルバトス第四形態", gHP, gMAXHP, 48, 36, 45, gEx, gLv, gImgFight_Barbatos4_MS, Barbtos5space);
    Barbtos3        = new MS(1, "バルバトス第三形態", gHP, gMAXHP, 44, 30, 40, gEx, gLv, gImgFight_Barbatos3_MS, Barbtos4);
    Barbtos2        = new MS(1, "バルバトス第二形態", gHP, gMAXHP, 42, 30, 40, gEx, gLv, gImgFight_Barbatos2_MS, Barbtos3);
    Barbtos1        = new MS(1, "バルバトス第一形態", 35, 35, 40, 30, 40, gEx, gLv, gImgFight_Barbatos1_MS, Barbtos2);

    GusionRebake    = new MS(2, "グシオンリベイク", 40, 40, 42, 50, 40, gEx, gLv, gImgFight_GusionRebake_MS, null);
    Ryuseigo2       = new MS(3, "流星号", 30, 30, 37, 40, 35, gEx, gLv, gImgFight_Ryuseigo2_MS, null);
    
}
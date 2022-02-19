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
var Abilty_list = new Array(
    //[ID, HP, ATT, DEF, SPD]
    [0,  65, 60, 50, 55],    //バルバトス1st
    [1,  65, 60, 55, 55],    //バルバトス2st
    [2,  65, 65, 55, 55],    //バルバトス3st
    [3,  75, 75, 70, 70],    //バルバトス4st
    [4,  75, 85, 80, 70],    //バルバトス5st space
    [5,  75, 85, 80, 70],    //バルバトス5st ground
    [6,  80, 90, 85, 70],    //バルバトス6st
    [7,  45, 35, 35, 40],    //グレイズ改
    [8,  70, 80, 75, 70],    //グシオンリベイク
    [9,  50, 45, 55, 50],    //流星号

    [10, 90, 80, 85, 45],    //グシオン
    [11, 85, 80, 70, 90],    //キマリス
    [12, 85, 80, 75, 85],    //キマリストルーパー

    [13, 40, 20, 20, 20],    //グレイズ


);

/*************************************************** 
概要 : 画像の初期読み込み
引数 : 無し
戻値 : 無し
***************************************************/
function LoadImage()
{
    gImg_OP     = new Image();
    gImg_OP.src = gOP;     //マップ画像読み込み

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

    gImgFight_GusionRebake_MS = new Image();
    gImgFight_GusionRebake_MS.src = gFight_GusionRebake_MS; //グシオンリベイク

    gImgFight_Ryuseigo2_MS = new Image();
    gImgFight_Ryuseigo2_MS.src = gFight_Ryuseigo2_MS; //流星号２
}

/*************************************************** 
概要 : MS情報呼出し
引数 : 
戻値 : 無し
***************************************************/
function SetUpMS( ){

    Barbtos6        = new MS(6, "バルバトス第六形態", null, null, null, null, null, gEx, gLv, gImgFight_Barbatos6_MS, null);
    Set_Prm(Barbtos6);

    Barbtos5ground  = new MS(5, "バルバトス第五地上形態", null, null, null, null, null, gEx, gLv, gImgFight_Barbatos5ground_MS, Barbtos6);
    Set_Prm(Barbtos5ground);
    
    Barbtos5space   = new MS(4, "バルバトス第五宇宙形態", null, null, null, null, null, gEx, gLv, gImgFight_Barbatos5space_MS, Barbtos5ground);
    Set_Prm(Barbtos5space);

    Barbtos4        = new MS(3, "バルバトス第四形態", null, null, null, null, null, gEx, gLv, gImgFight_Barbatos4_MS, Barbtos5space);
    Set_Prm(Barbtos4);

    Barbtos3        = new MS(2, "バルバトス第三形態", null, null, null, null, null, gEx, gLv, gImgFight_Barbatos3_MS, Barbtos4);
    Set_Prm(Barbtos3);

    Barbtos2        = new MS(1, "バルバトス第二形態", null, null, null, null, null, gEx, gLv, gImgFight_Barbatos2_MS, Barbtos3);
    Set_Prm(Barbtos2);

    Barbtos1        = new MS(0, "バルバトス第一形態", null, null, null, null, null, 0, 5, gImgFight_Barbatos1_MS, Barbtos2);
    Set_Prm(Barbtos1);

    GusionRebake    = new MS(8, "グシオンリベイク", null, null, null, null, null, gEx, gLv, gImgFight_GusionRebake_MS, null);
    Set_Prm(GusionRebake);

    Ryuseigo2       = new MS(9, "流星号", null, null, null, null, null, gEx, gLv, gImgFight_Ryuseigo2_MS, null);
    Set_Prm(Ryuseigo2);
}

/*************************************************** 
概要 : 攻撃力、守備力、素早さを設定するMS
引数 : prm_MS : 設定するMS
戻値 : 無し
***************************************************/
function Set_Prm( prm_MS ){

    prm_MS.MAXHP    = Math.floor(Abilty_list[prm_MS.ID][1] * prm_MS.Lv / 100 + prm_MS.Lv + 10); //MAX HP
    prm_MS.HP       = prm_MS.MAXHP;
    prm_MS.ATT      = Math.floor(Abilty_list[prm_MS.ID][2] * prm_MS.Lv / 100 + 5); //攻撃力
    prm_MS.DEF      = Math.floor(Abilty_list[prm_MS.ID][3] * prm_MS.Lv / 100 + 5); //守備力
    prm_MS.SPD      = Math.floor(Abilty_list[prm_MS.ID][4] * prm_MS.Lv / 100 + 5); //素早さ

}
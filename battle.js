"use strict";

const MS_HEIGHT = 150;

let Fight_order;
let Fight_order_count;

// 戦闘フェイズテーブル
var tblFightPhase = {
    pre : 0,
    begin : 1,
    continue : 2,
    start : 3,
    myturn : 4,
    enemyturn : 5,
    preend : 6,
    end : 7
};

//戦闘描写
function DrawFight( g )
{
    SetMessage( " ", null);
    
    g.drawImage( gImgFight_Background, 0, 0, 800, 350);                     //背景画像描写

    //機体画像表示
    if(gPlayer.MS3 != null){
        g.drawImage( gPlayer.MS3.IMG, 0, 0, 
                    gPlayer.MS3.IMG.naturalWidth, gPlayer.MS3.IMG.naturalHeight, 
                    120, 60, 
                    Math.floor(gPlayer.MS3.IMG.naturalWidth * MS_HEIGHT / gPlayer.MS3.IMG.naturalHeight), MS_HEIGHT);   //自機画像描写
    }
    if(gPlayer.MS2 != null){
        g.drawImage( gPlayer.MS2.IMG, 0, 0, 
                    gPlayer.MS2.IMG.naturalWidth, gPlayer.MS2.IMG.naturalHeight, 
                    70, 140, 
                    Math.floor(gPlayer.MS2.IMG.naturalWidth * MS_HEIGHT / gPlayer.MS2.IMG.naturalHeight), MS_HEIGHT);   //自機画像描写
    }
    if(gPlayer.MS1 != null){
        g.drawImage( gPlayer.MS1.IMG, 0, 0, 
                    gPlayer.MS1.IMG.naturalWidth, gPlayer.MS1.IMG.naturalHeight, 
                    20, 220, 
                    Math.floor(gPlayer.MS1.IMG.naturalWidth * MS_HEIGHT / gPlayer.MS1.IMG.naturalHeight), MS_HEIGHT);   //自機画像描写
    }                               
                                    
    g.drawImage( Greize.IMG , 0, 0, 257, 240, 600, 150, Math.floor(257 * 0.8), Math.floor(240 * 0.8));     //敵画像描写
    
    DrawMessage( g );               //メッセージ描画
    
    //カーソル表示
    if(gPhase == tblFightPhase.continue )
    {
        g.fillText("こうげき ", 326,373 + 23 * 0);
        g.fillText("とくぎ", 326,373 + 23 * 1);
        g.fillText("ぼうぎょ", 326,373 + 23 * 2);
        g.fillText("アイテム", 326,373 + 23 * 3);
        g.fillText("⇒", 306, 373 + 23 * gCursor)    //カーソル描画
    }

}

/*************************************************** 
概要 : 経験値を加算する
引数 : prm_val 加算する経験値
戻値 : 無し
***************************************************/
function AddExp( prm_MS, prm_val )
{
    prm_MS.Ex += prm_val;             //経験値加算
    LvUP( prm_MS );
}

/*************************************************** 
概要 : レベルアップするか確認する
引数 : prm_charactor 
戻値 : 無し
***************************************************/
function LvUP( prm_MS ){

    while( prm_MS.Lv < prm_MS.Ex ){
        prm_MS.Lv++;              //レベルアップ
        let HPpercent = prm_MS.HP / prm_MS.MAXHP;
        prm_MS.MAXHP += 4;        //HP加算
        prm_MS.HP = Math.floor( HPpercent * prm_MS.MAXHP ); 
    }
}

/*************************************************** 
概要 : 進化するか確認する
引数 : prm_charactor 
戻値 : true
***************************************************/
function CHK_Evolve( prm_MS ){

    if(( prm_MS.Lv >= 1 + prm_MS.ID)&&(prm_MS.EVO != null)){ 
        prm_MS.EVO.HP = prm_MS.MAXHP;           //HP更新
        prm_MS.EVO.MAXHP = prm_MS.MAXHP;        //MAXHP更新ん
        prm_MS.EVO.Lv = prm_MS.Lv;              //Lv引継ぎ
        prm_MS.EVO.Ex = prm_MS.Ex;              //経験値引継ぎ         
        SetMessage("敵機を倒した", prm_MS.EVO.NAME + "に進化した");
        return prm_MS.EVO;  
    }
    else
    {
        return prm_MS;
    }
}

function damage_val( prm_defence_MS, prm_Attack_MS ){
    
    let damage;

    damage = Math.floor((prm_Attack_MS.ATT * 2) * ( prm_Attack_MS.Lv / 100)
             - prm_defence_MS.DEF / 4 * ( prm_defence_MS.Lv / 100));
    
    return damage; 
}

function init_Fight(){
    CommandCount = 0;
    Fight_order = [11,gPlayer.MS1.ID,gPlayer.MS2.ID,gPlayer.MS3.ID,null,null];
    Fight_order_count = 5;
    Fight_command = [[0,0],[0,0],[0,0],[0,0]];
    Greize          = new MS(11, "グレイズ", 10, 10, 20, 20, 20, 0, 5, gImgFight_Greize_MS, null);
}
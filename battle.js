"use strict";


// 戦闘フェイズテーブル
var tblFightPhase = {
    pre : 0,
    begin : 1,
    continue : 2,
    myturn : 3,
    enemyturn : 4,
    end : 5
};

//戦闘描写
function DrawFight( g )
{
    switch( gPhase ){
        case tblFightPhase.begin:       //戦闘開始
            SetMessage( " ", null);
            g.drawImage( gImgFight_Background, 0, 0, 800, 350);                     //背景画像描写
            g.drawImage( gPlayer.MS1.IMG, 0, 0, 
                                         gPlayer.MS1.IMG.naturalWidth, gPlayer.MS1.IMG.naturalHeight, 
                                         50, 150, 
                                         Math.floor( 200 ), Math.floor(gPlayer.MS1.IMG.naturalHeight * 200 / gPlayer.MS1.IMG.naturalWidth));   //自機画像描写
            g.drawImage( Greize.IMG , 0, 0, 257, 240, 600, 150, Math.floor(257 * 0.8), Math.floor(240 * 0.8));     //敵画像描写
                        
    }

    DrawMessage( g );               //メッセージ描画

    //カーソル表示
    if(gPhase == tblFightPhase.continue )
    {
        g.fillText(arrayBarbatos[0][0], 326,378 + 23 * 0)
        g.fillText(arrayBarbatos[1][0], 326,378 + 23 * 1)
        g.fillText(arrayBarbatos[2][0], 326,378 + 23 * 2)
        g.fillText("⇒", 306, 378 + 23 * gCursor)    //カーソル描画
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
戻値 : prm_charactor
***************************************************/
function CHK_Evolve( prm_MS ){

    if(( prm_MS.Lv >= 1 + prm_MS.ID)&&(prm_MS.EVO != null)){ 
        prm_MS.EVO.HP = prm_MS.MAXHP;           //HP更新
        prm_MS.EVO.MAXHP = prm_MS.MAXHP;        //MAXHP更新ん
        prm_MS.EVO.Lv = prm_MS.Lv;              //Lv引継ぎ
        prm_MS.EVO.Ex = prm_MS.Ex;              //経験値引継ぎ         
        SetMessage("敵機を倒した", prm_MS.EVO.NAME + "に進化した");
        return new Player(prm_MS.EVO);  
    }
    else
    {
        return new Player(prm_MS);
    }
}
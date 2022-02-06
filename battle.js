"use strict";

const MS_HEIGHT = 150;

let Battle_order;
let Battle_order_count;

let Order_MS_num;
let Enemy_target;
let MS_name = null;
let MS_damage;
let Enemy_target_MS;

// 戦闘フェイズテーブル
var tblFightPhase = {
    pre : 0,
    begin : 1,
    command : 2,
    start : 3,
    myturn : 4,
    enemyturn : 5,
    preend : 6,
    end : 7
};

// 戦闘コマンドステータス
var tblFight_command = {
    Attack : 0,
    Special : 1,
    Deffence : 2,
    Item : 3
};

//戦闘描写
function DrawFight( g )
{
    let tblMessageposition = [10, 348 + FONT_MARGE_SIZE];
    
    SetMessage( " ", null);
    
    /**** 常時表示内容 ****/ 
    g.drawImage( gImgFight_Background, 0, 0, 800, 350);                     //背景画像描写

    //機体画像描写
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
    

    g.fillStyle = FONTSTYLE;
    
    //メッセージウィンドゥ描写
    g.drawImage( gImgMessage, 0, 0, 2000, 248, 0, 348, 800, 100 );

    //機体名とLv、HP表示
    if( gPhase != tblFightPhase.end )
    {
        if( gPlayer.MS1 != null){
            g.fillStyle = FONTSTYLE;
            if( Order_MS_num == 0){
                g.font = FONT; 
            }else{
                g.font = "18px monospace";
            }
            g.fillText( gPlayer.MS1.NAME, tblMessageposition[0], tblMessageposition[1]);       //機体名
            g.font = FONT;
            g.fillText( "Lv" + gPlayer.MS1.Lv , 500, 348 + FONT_MARGE_SIZE);
            g.fillText( gPlayer.MS1.HP + "/" + gPlayer.MS1.MAXHP, 575, 348 + FONT_MARGE_SIZE);                      //HP
            g.fillStyle = "#000000";    g.fillRect( 575, 382, 100, 4);
            g.fillStyle = HP_BAR_STYLE;    g.fillRect( 575, 382, 100 * (gPlayer.MS1.HP / gPlayer.MS1.MAXHP), 4);      //HPバー
        }
        if( gPlayer.MS2 != null){
            g.fillStyle = FONTSTYLE;
            if( Order_MS_num == 1){
                g.font = FONT; 
            }else{
                g.font = "18px monospace";
            }
            g.fillText( gPlayer.MS2.NAME, tblMessageposition[0], tblMessageposition[1] + FONT_MARGE_SIZE);       //機体名
            g.font = FONT;
            g.fillText( "Lv" + gPlayer.MS2.Lv , 500, 348 + FONT_MARGE_SIZE * 2);
            g.fillText( gPlayer.MS2.HP + "/" + gPlayer.MS2.MAXHP, 575, 348 + FONT_MARGE_SIZE * 2);                      //HP
            g.fillStyle = "#000000";    g.fillRect( 575, 382+ FONT_MARGE_SIZE, 100, 4);
            g.fillStyle = HP_BAR_STYLE;    g.fillRect( 575, 382 + FONT_MARGE_SIZE, 100 * (gPlayer.MS2.HP / gPlayer.MS2.MAXHP), 4);      //HPバー
        }
        if( gPlayer.MS3 != null){
            g.fillStyle = FONTSTYLE;
            if( Order_MS_num == 2){
                g.font = FONT; 
            }else{
                g.font = "18px monospace";
            }
            g.fillText( gPlayer.MS3.NAME, tblMessageposition[0], tblMessageposition[1] + FONT_MARGE_SIZE * 2);       //機体名
            g.font = FONT;
            g.fillText( "Lv" + gPlayer.MS3.Lv , 500, 348 + FONT_MARGE_SIZE * 3);
            g.fillText( gPlayer.MS3.HP + "/" + gPlayer.MS3.MAXHP, 575, 348 + FONT_MARGE_SIZE * 3);                      //HP
            g.fillStyle = "#000000";    g.fillRect( 575, 382+ FONT_MARGE_SIZE*2, 100, 4);
            g.fillStyle = HP_BAR_STYLE;    g.fillRect( 575, 382 + FONT_MARGE_SIZE*2, 100 * (gPlayer.MS3.HP / gPlayer.MS3.MAXHP), 4);      //HPバー
        }
        // g.fillText( Greize.HP + "/" + Greize.MAXHP, 400, 100);                      //HP
        // g.fillText( Battle_order_count, 400, 125);                      //HP
        // g.fillText( gPhase, 400, 150);                      //HP
    }


    //DrawMessage( g );               //メッセージ描画

    switch( gPhase ){
        case tblFightPhase.command:
            //コマンドウィンドゥ表示
            g.drawImage(gImgCommand, 0, 0, 435, 249, 300, 348, 175, 100);
            tblMessageposition[0] += 300; 

            //カーソルと選択肢の表示
            g.font = FONT;
            g.fillStyle = FONTSTYLE;
            g.fillText("こうげき ", 326,373 + 23 * 0);
            g.fillText("とくぎ", 326,373 + 23 * 1);
            g.fillText("ぼうぎょ", 326,373 + 23 * 2);
            g.fillText("アイテム", 326,373 + 23 * 3);
            g.fillText("⇒", 306, 373 + 23 * gCursor)    //カーソル描画
            break;
        case tblFightPhase.start:
            if((Battle_order_count < 5 )&&(MS_name != null)){
                g.fillStyle = "#000000";
                g.fillRect( 30, 30, WIDTH-60, 25);
                g.font = "18px monospace";;          //文字フォントを指定
                g.fillStyle = "#FFFFFF";
                g.fillText(MS_name + "は"+Enemy_target_MS + "に" + MS_damage +"のダメージを与えた", 30, 50);
                break;
            }
            break;

        case tblFightPhase.preend:
            g.fillStyle = "#000000";
            g.fillRect( 30, 30, WIDTH-60, 25);
            g.font = "18px monospace";;          //文字フォントを指定
            g.fillStyle = "#FFFFFF";
            g.fillText("敵機を倒した", 30, 50);
            break;

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
        //SetMessage("敵機を倒した", prm_MS.EVO.NAME + "に進化した");
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
    //敵機設定
    Greize = new MS(11, "グレイズ", 10, 10, 20, 20, 20, 0, 5, gImgFight_Greize_MS, null);
    MS_name = null;
    Order_MS_num = 0;
    Battle_order = [[11,Greize],
                [0, gPlayer.MS1],
                [0, gPlayer.MS2],
                [0, gPlayer.MS3],
                [null, null],
                [null, null]  //戦闘の順番
    ];
    Battle_order_count = 0;
    Fight_command = [[0,0],[0,0],[0,0],[0,0]];
    
}

function battle_onkeydown( c ){

    switch( gPhase ){
        case tblFightPhase.begin:   //	戦闘コマンド選択フェーズ
            if( CHK_CLICK_ENTER(c) == true ){
                gPhase = tblFightPhase.command;
                SetMessage( " ", " " );
            }
            break;

        case tblFightPhase.command:
            //キー判定
            //コマンド選択 カーソルの上下移動
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
            
            if( CHK_CLICK_ENTER(c) == true ){   //Enterキー判定   
                if(Order_MS_num < 2){
                    Fight_command[ Order_MS_num ][ 1 ] = gCursor;
                    gCursor = 0;        //カーソル位置リセット
                    Order_MS_num += 1;  //MS番号更新
                    break;
                }else if(Order_MS_num >= 2){
                    Fight_command[ Order_MS_num ][ 1 ] = gCursor;
                    gPhase = tblFightPhase.start;
                    Order_MS_num = 4;
                    break;
                }
            }
            break;
        
        case tblFightPhase.start:
            if( CHK_CLICK_ENTER(c) == true ){
                if( Battle_order[0][1].HP <= 0 ){
                    gPhase = tblFightPhase.preend;
                    Order_MS_num = 4;
                    break;   
                }

                if(Battle_order_count >= 4){
                    gPhase = tblFightPhase.command;
                    Battle_order_count = 0;
                    Order_MS_num = 0;
                    MS_name = null;
                    break;
                }
                let Enemy_target;
                if( Battle_order[Battle_order_count][0] == 0 ){   //敵機か味方か
                    //味方の場合 Battle_order[0][2]
                    Enemy_target = Battle_order[0][1];
                    switch( Battle_order[Battle_order_count][1].ID ){
                        case 1:
                            Enemy_target.HP -= damage_val( Enemy_target, gPlayer.MS1);
                            MS_name = gPlayer.MS1.NAME;
                            MS_damage = damage_val( Enemy_target, gPlayer.MS1);
                            Order_MS_num = 0;
                            break;
                        case 2:
                            Enemy_target.HP -= damage_val( Enemy_target, gPlayer.MS2);
                            MS_name = gPlayer.MS2.NAME;
                            MS_damage = damage_val( Enemy_target, gPlayer.MS2);
                            Order_MS_num = 1;
                            break;
                        case 3:
                            Enemy_target.HP -= damage_val( Enemy_target, gPlayer.MS3);
                            MS_name = gPlayer.MS3.NAME;
                            MS_damage = damage_val( Enemy_target, gPlayer.MS3);
                            Order_MS_num = 2;
                            break;
                    }
                    Enemy_target_MS = Enemy_target.NAME;
                    Battle_order_count++;

                }else{
                    //敵の場合
                    //ターゲット機のランダム選択
                    Enemy_target = Math.floor((Math.random()*3) % 3);
                    switch( Enemy_target ){
                        case 0:
                            gPlayer.MS1.HP -= damage_val( gPlayer.MS1, Greize );
                            MS_name = Greize.NAME;
                            MS_damage = damage_val( gPlayer.MS1, Greize );
                            Enemy_target_MS = gPlayer.MS1.NAME;
                            break;
                        case 1:
                            gPlayer.MS2.HP -= damage_val( gPlayer.MS2, Greize );
                            MS_name = Greize.NAME;
                            MS_damage = damage_val( gPlayer.MS2, Greize );
                            Enemy_target_MS = gPlayer.MS2.NAME;
                            break;
                        case 2:
                            gPlayer.MS3.HP -= damage_val( gPlayer.MS3, Greize );
                            MS_name = Greize.NAME;
                            MS_damage = damage_val( gPlayer.MS3, Greize );
                            Enemy_target_MS = gPlayer.MS3.NAME;
                            break;
                    }
                    Battle_order_count++;
                }
                
            }
            break;
        case tblFightPhase.preend:
            if( CHK_CLICK_ENTER(c) == true){
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
            if(CHK_CLICK_ENTER(c) == true){
                gPhase = tblFightPhase.pre;
                gStatus = tblStatus.map;
                SetMessage(null,null);
            }
            break;
    }

}

function CHK_CLICK_ENTER(c){
    if( c == 13 ){
        return true;
    }else{
        return false;
    }
}
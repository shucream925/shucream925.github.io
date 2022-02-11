"use strict";

/*************************************************** 
概要 : 変数定義
***************************************************/
const MS_HEIGHT = 150;              //描写するMSの高さ

let Battle_order;
let Battle_order_count;

let Order_MS_num;
let Enemy_target;
let MS_name = null;
let MS_damage;
let Enemy_target_MS;
let toatl_MS_num;
let toatl_enemyMS_num;
var Enemy_MS_list = [3];            // 敵MSリスト
var Target_Enemy_MS = [3];          // 
var Tbl_Enemy_number = [3];
let command_state;
var break_enemy_MS;
var command_select = 0;

/*************************************************** 
概要 : テーブル定義
***************************************************/
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

/*************************************************** 
概要 : 戦闘描写
引数 :  
戻値 : 
***************************************************/
function DrawFight( g )
{
    let tblMessageposition = [10, 348 + FONT_MARGE_SIZE];
    
    SetMessage( " ", null);
    
    /**** 常時表示内容 ****/ 
    g.drawImage( gImgFight_Background, 0, 0, 800, 350);                     //背景画像描写

    /**** 自軍機体画像描写 ****/
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

        /**** 敵軍機体画像描写 ****/
    for( var i = 0; i < toatl_enemyMS_num; i++){
        if(Enemy_MS_list[i] != null){
            g.drawImage( Enemy_MS_list[i].IMG , 0, 0, 257, 240, 
                        500+50*i, 60+80*i, 
                        Math.floor( Enemy_MS_list[i].IMG.naturalWidth * MS_HEIGHT / Enemy_MS_list[i].IMG.naturalHeight ), MS_HEIGHT);     //敵画像描写
            g.fillText( i + " : " + Enemy_MS_list[i].HP, 600, 30+30*i);     //デバッグ用
        }
    }

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
        g.fillText( toatl_enemyMS_num, 400, 150);                      //HP
    }

    switch( gPhase ){
        case tblFightPhase.command:
            //カーソルと選択肢の表示
            if(command_state == 0){
                //コマンドウィンドゥ表示
                g.drawImage(gImgCommand, 0, 0, 435, 249, 300, 348, 175, 100);
                tblMessageposition[0] += 300; 
                g.font = FONT;
                g.fillStyle = FONTSTYLE;
                g.fillText("こうげき ", 326,373 + 23 * 0);
                g.fillText("とくぎ", 326,373 + 23 * 1);
                g.fillText("ぼうぎょ", 326,373 + 23 * 2);
                g.fillText("アイテム", 326,373 + 23 * 3);
                g.fillStyle = "#ffea00";
                g.fillText("▶", 306, 373 + 23 * gCursor)    //カーソル描画
            }
            if(command_state == 1){
                g.font = FONT;
                g.fillStyle = FONTSTYLE;

                for( var i = 0; i < toatl_enemyMS_num; i++){
                    if(Enemy_MS_list[i] != null){
                        command_select = i;
                    }
                }
                g.font = "48px monospace ";
                g.fillStyle = "#ffea00";
                g.fillText("▶", 500, 150 + 100 * gCursor)    //カーソル描画
            }
            break;

        case tblFightPhase.start:
            if((Battle_order_count <= toatl_MS_num )&&(MS_name != null)){
                g.fillStyle = "#000000";  
                g.globalAlpha = 0.7;          
                g.fillRect( 30, 30, WIDTH-60, 30);  //枠描写
                

                g.font = "18px monospace";;          //文字フォントを指定
                g.fillStyle = "#FFFFFF";
                g.globalAlpha = 1.0;
                g.fillText(MS_name + "は"+ Enemy_target_MS + "に" + MS_damage +"のダメージを与えた", 35, 50);

                // //ダメージ描写
                // g.font = "32px monospace";;          //文字フォントを指定
                // g.fillStyle = "yellow";
                // g.strokeStyle = 'black';
                // g.fillText(MS_damage,500+50*gCursor, 60+80*gCursor);

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
    let random_number = 1 + Math.floor((Math.random()*3) % 3);

    //敵機設定
    Greize = new MS(11, "グレイズ", 10, 10, 20, 20, 20, 0, 5, gImgFight_Greize_MS, null);
    
    /**** 初期化 ****/
    command_state = 0;
    Battle_order_count = 0;
    toatl_enemyMS_num = 0;
    break_enemy_MS = 0; 
    MS_name = null;
    Fight_command = [[0,0],[0,0],[0,0],[0,0]];

    Order_MS_num = 0;
    // Battle_order = [[11,Greize],
    //             [0, gPlayer.MS1],
    //             [0, gPlayer.MS2],
    //             [0, gPlayer.MS3],
    //             [null, null],
    //             [null, null]  //戦闘の順番
    // ];

    Battle_order = [[0, gPlayer.MS1]];
    toatl_MS_num = 1;

    if( gPlayer.MS2 != null ){
        Battle_order.push([0, gPlayer.MS2]);
        toatl_MS_num++;
    }
    if( gPlayer.MS3 != null ){
        Battle_order.push([0, gPlayer.MS3]);
        toatl_MS_num++;
    }
    
    //敵機ランダム出現
    for( var i=0; i < random_number; i++){
        // ID, NAME, HP, MAXHP, ATT, DEF, SPD, Ex, Lv, IMG, EVO
        Enemy_MS_list[i] = new MS(Greize.ID,Greize.NAME,Greize.HP,Greize.MAXHP,Greize.ATT,Greize.DEF,Greize.SPD,0,5,Greize.IMG,null);
        
        Battle_order.push([1, Enemy_MS_list[i]]);
        toatl_enemyMS_num++;
        toatl_MS_num++;
    }
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
            Command_select( c ,gCursor);

            //コマンド選択
            if(( CHK_CLICK_ENTER(c) == true )&&(command_state == 0)){
                Fight_command[ Order_MS_num ][ 1 ] = gCursor+1;
                command_state = 1;
                gCursor = Battle_chk_existEnemy_topnumber( Enemy_MS_list );
                break;
            }
            
            //敵選択
            if(( CHK_CLICK_ENTER(c) == true )&&(command_state == 1)){   //Enterキー判定
                command_state = 0;   
                if(Order_MS_num < MS_num - 1){
                    Target_Enemy_MS[Order_MS_num] = gCursor;
                    gCursor = 0;        //カーソル位置リセット
                    Order_MS_num += 1;  //MS番号更新
                    break;
                }else{
                    Target_Enemy_MS[Order_MS_num] = gCursor;
                    gPhase = tblFightPhase.start;
                    gCursor = 0;
                    Order_MS_num = 0;
                    command_state = 2;
                    break;
                }
            }
            break;
        
        case tblFightPhase.start:
            if( CHK_CLICK_ENTER(c) == true ){
                /**** 戦闘終了 処理確認****/
                if((Enemy_MS_list[0] != null)&&( Enemy_MS_list[0].HP <= 0 )){
                    Enemy_MS_list[0] = null;
                    break_enemy_MS++;
                    toatl_MS_num--;
                    break;   
                }
                if((Enemy_MS_list[1] != null)&&( Enemy_MS_list[1].HP <= 0 )){
                    Enemy_MS_list[1] = null;
                    break_enemy_MS++;
                    toatl_MS_num--;
                    break;   
                }
                if((Enemy_MS_list[2] != null)&&( Enemy_MS_list[2].HP <= 0 )){
                    Enemy_MS_list[2] = null;
                    break_enemy_MS++;
                    toatl_MS_num--;
                    break;   
                }

                /**** 一巡したかの確認 ****/
                if( break_enemy_MS == toatl_enemyMS_num ){
                    gPhase = tblFightPhase.preend
                    break;
                }else if(Battle_order_count >= toatl_MS_num){
                    gPhase = tblFightPhase.command;     //選択肢に戻る
                    Battle_order_count = 0;             //順番数
                    Order_MS_num = 0;                   //自軍の選択リセット
                    MS_name = null;
                    command_state = 0;
                    break;
                }

                /**** 戦闘処理 ****/
                //Battle_order_countが順番
                let Enemy_target;
                let Own_army_MS;
                if( Battle_order[Battle_order_count][0] == 0 ){   //敵機か味方か
                    // Enemy_target = Battle_order[toatl_MS_num-1][1]; 
                    //             敵MSリスト[ 選んだ敵MS [  ] ]
                    // Battle_order[Battle_order_count][0]
                    Enemy_target = Enemy_MS_list[Target_Enemy_MS[ Battle_order_count ]];     //攻撃対象の決定
                    Own_army_MS = Battle_order[Battle_order_count][1];                  //自機の取得

                    //ダメージ計算
                    if( Enemy_target != null ){
                        Enemy_target.HP -= damage_val( Enemy_target, Own_army_MS);
                        MS_name = Own_army_MS.NAME;
                        MS_damage = damage_val( Enemy_target, Own_army_MS);
                        Enemy_target_MS = Enemy_target.NAME;
                    }
                    Order_MS_num++;
                    Battle_order_count++;
                    break;
                }else{
                    //敵の場合
                    //ターゲット機のランダム選択
                    Enemy_target = Math.floor((Math.random()*MS_num) % MS_num);
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
                let tmp_MS1 = null;
                let tmp_MS2 = null;
                let tmp_MS3 = null;
                if(gPlayer.MS1 != null){
                    AddExp( gPlayer.MS1, 1 );    //経験値加算
                    tmp_MS1 = CHK_Evolve( gPlayer.MS1 );
                }
                if(gPlayer.MS2 != null){
                    AddExp( gPlayer.MS2, 1 );    //経験値加算
                    tmp_MS2 = CHK_Evolve( gPlayer.MS2 );
                }
                if(gPlayer.MS3 != null){
                    AddExp( gPlayer.MS3, 1 );    //経験値加算
                    tmp_MS3 = CHK_Evolve( gPlayer.MS3 );
                }
                gPlayer = new Player(tmp_MS1, 
                                     tmp_MS2,
                                     tmp_MS3);
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

function Command_select(c){

    if( command_state == 0){
        if(( c == 38 )&&( gCursor > 0 )){       //通常の上移動
            gCursor = gCursor - 1 ;
            
        }else if(( c == 38 )&&( gCursor <= 0 )){    //コマンド以上は変わらない
            gCursor = 3 ;
            
        }else if( c == 40 ){        //下には移動できる
            gCursor = (gCursor + 1 ) %  4;
        }
    }else if( command_state == 1){
        if(( c == 38 )&&( Enemy_MS_list[ gCursor - 1 ] != null )){       //通常の上移動
            gCursor = gCursor - 1 ;
        }else if(( c == 38 )&&( gCursor <= 0 )){        //コマンド以上は変わらない
            gCursor = Battle_chk_existEnemy_topnumber( Enemy_MS_list ) ;
            
        }else if(( c == 40 )&&( Enemy_MS_list[ gCursor + 1 ] != null )){                //下には移動できる
            gCursor = gCursor + 1;
        }
    }
}

/*************************************************** 
概要 : 存在している敵機の中で一番小さい数を渡す
引数 :  
戻値 : 0,1,2のどれか
***************************************************/
function Battle_chk_existEnemy_topnumber( Enemy_MS_list ){

    for( var i = 0; i < toatl_enemyMS_num;i++  ){
        if(Enemy_MS_list[i] != null){
            return i;
        }
    }

}
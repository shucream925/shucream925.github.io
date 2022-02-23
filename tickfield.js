"use strict";

function TickField_town( m ){
    if( m != 0 ){
        gMoveX = 0;     //移動禁止
        gMoveY = 0;     //移動禁止
    }
}

function TickField_load( m ){

    // if( m == 66){
    //     gMap_state = Map_list.town;
    // }
    
    if( m == 75 ){
        gPlayer.MS1.HP = gPlayer.MS1.MAXHP;
        if( gPlayer.MS2 != null){
            gPlayer.MS2.HP = gPlayer.MS2.MAXHP;
        }
        if( gPlayer.MS3 != null){
            gPlayer.MS3.HP = gPlayer.MS3.MAXHP;
        }
        // SetMessage("HPが全回復した",null)
    }

    if( m != 0 ){
        gMoveX = 0;     //移動禁止
        gMoveY = 0;     //移動禁止
    }

    // if(( Math.random() * 50 < 1 )&&(gPhase == tblFightPhase.pre)){        //ランダムエンカウント
    //     gPhase = tblFightPhase.begin;         //摘出現
    //     init_Fight();
    //     gStatus = tblStatus.battle;
    // }

}
"use strict";


let Skill_Barbtos;
let Skill_Gusion;
let Skill_Ryuseigo2;

/*************************************************** 
概要 : メイス
引数 : prm_val 加算する経験値
***************************************************/
function Skill_Mace(prm_ally_MS, prm_enemy_MS){



    // ダメージ計算
    prm_enemy_MS.HP -= damage_val( prm_enemy_MS, prm_ally_MS);

};

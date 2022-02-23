"use strict";

let gMap_state;

const Map_list = {
    town : 0,
    load : 1
}

let gImgMap0_ground;
let gImgMap0_object;
let gImgMap1_ground;
let gImgMap1_object;

const gFileMap0_ground      = "map/Map0.png";
const gFileMap0_object      = "map/Map0_object.png";
const gFileMap1_ground      = "map/Map1.png";
const gFileMap1_object      = "map/Map1_object.png";


//マップ描画
function DrawMap( g ){

    let		mx = Math.floor( gPlayerX / TILESIZE );
	let		my = Math.floor( gPlayerY / TILESIZE );

    for( let dy = -SCR_HEIGHT; dy <= SCR_HEIGHT; dy++){
        let ty = my + dy;           //タイル座標Y
        let py = ( ty ) % MAP_HEIGHT;  //ループ後のタイル座標
        for( let dx = -SCR_WIDTH; dx <= SCR_WIDTH; dx++){
			let	tx = mx + dx;	    //タイル座標X
            let px = ( tx ) % MAP_WIDTH;     //ループ後のタイル座標
            if((( tx < 0 )||( tx >= MAP_WIDTH))||(( ty < 0 )||( ty >= MAP_HEIGHT))){
                g.fillStyle = "#000000";           
                g.fillRect( tx * TILESIZE + WIDTH / 2 - gPlayerX, ty * TILESIZE + HEIGHT / 2 - gPlayerY, 32, 32);  //枠描写
            }else{
                DrawTile(g,
                    tx * TILESIZE + WIDTH / 2 - gPlayerX,
                    ty * TILESIZE + HEIGHT / 2 - gPlayerY,
                    gMap0_ground[ py * MAP_WIDTH + px], gImgMap0_ground);
                DrawTile(g,
                    tx * TILESIZE + WIDTH / 2 - gPlayerX,
                    ty * TILESIZE + HEIGHT / 2 - gPlayerY,
                    gMap0_object[ py * MAP_WIDTH + px], gImgMap0_object);
            }
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

function DrawTile(g, x, y, idx, gImgMap)
{
    const ix = (idx % TILECOLUMN) * TILESIZE;
    const iy = Math.floor(idx / TILECOLUMN) * TILESIZE;
    g.drawImage( gImgMap, ix, iy, 
                 TILESIZE, TILESIZE,
                 x, y, 
                 TILESIZE, TILESIZE);
}

function map_init(){

    switch( gMap_state ){
        case Map_list.town:
            MAP_WIDTH = 45;                 //マップの幅
            MAP_HEIGHT = 20;                //マップの高さ
            break;
        case Map_list.load:
            MAP_WIDTH = 25;                 //マップの幅
            MAP_HEIGHT = 40;                //マップの高さ
            break;
    }
}

function map_set1( ){

    gImgMap1_ground     = new Image();     gImgMap1_ground.src = gFileMap1_ground;     //マップ画像読み込み
    gImgMap1_object     = new Image();     gImgMap1_object.src = gFileMap1_object;     //マップ画像読み込み
    
    TILECOLUMN = 10;                //タイル桁数
    TILEROW = 10;                   //タイル行数

    gMap_object = gImgMap1_object;

}

function map_set0( ){

    gImgMap0_ground     = new Image();     gImgMap0_ground.src = gFileMap0_ground;     //マップ画像読み込み
    gImgMap0_object     = new Image();     gImgMap0_object.src = gFileMap0_object;     //マップ画像読み込み
    
    TILECOLUMN = 10;                //タイル桁数
    TILEROW = 10;                   //タイル行数

    gMap_object = gImgMap0_object;
    
}
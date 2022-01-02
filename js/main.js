'use strict';

{
    const menuItems = document.querySelectorAll('.menu li a');
    const contents = document.querySelectorAll('.content');

    menuItems.forEach(clickeditem => {
        clickeditem.addEventListener('click', e =>{
            e.preventDefault();

            menuItems.forEach(item =>{
                item.classList.remove('active');
            });
            clickeditem.classList.add('active');

            contents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(clickeditem.dataset.id).classList.add('active');
        });
    });
}

var ctx = document.getElementById("myRadarChart");
var myChart = new Chart(ctx, {
    type: 'radar',
    data: {
        //データの各項目のラベル(上から時計回り)
        labels: ["集中力", "説明力", "視野", "先見", "メンタル", "再起"],
        //データ設定
        datasets: [
          {
              //グラフのデータ(上から時計回り)
              data: [1,2,3,4,5,10],
              //グラフ全体のラベル
              label: "現在値",
              //背景色
              backgroundColor: "rgba(0,176,80,0.5)",
              //線の終端を四角にするか丸めるかの設定。デフォルトは四角(butt)。
              borderCapStyle: "butt",
              //線の色
              borderColor: "rgba(30,30,30,1)",
              //線を破線にする
              borderDash: [],
              //破線のオフセット(基準点からの距離)
              borderDashOffset: 0.0,
              //線と線が交わる箇所のスタイル。初期値は'miter'
              borderJoinStyle: 'miter',
              //線の幅。ピクセル単位で指定。初期値は3。
              borderWidth: 0,
              //グラフを塗りつぶすかどうか。初期値はtrue。falseにすると枠線だけのグラフになります。
              fill: true,
              //複数のグラフを重ねて描画する際の重なりを設定する。z-indexみたいなもの。初期値は0。
              order: 0,
              //0より大きい値にすると「ベジェ曲線」という数式で曲線のグラフになります。初期値は0。
              lineTension: 0
          }
        ]
      },
    options: {
        scales: {
          r: {
            //グラフの最小値・最大値
            min: 0,
            max: 10,
            //背景色
            backgroundColor: 'snow',
            //グリッドライン
            grid: {
              color: 'gray',
            },
            //アングルライン
            angleLines: {
              color: 'black',
            },
            //各項目のラベル
            pointLabels: {
              color: 'black',
            },
          },
        },
    }
});
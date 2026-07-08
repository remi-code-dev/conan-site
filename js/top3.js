'use strict';

/* -----------------------------------
映画データ（タイトル & ポスター画像）
----------------------------------- */
const movieData = {
  "1":  { title: "時計じかけの摩天楼", img: "images/1.jpg" },
  "2":  { title: "14番目の標的", img: "images/2.jpg" },
  "3":  { title: "世紀末の魔術師", img: "images/3.jpg" },
  "4":  { title: "瞳の中の暗殺者", img: "images/4.jpg" },
  "5":  { title: "天国へのカウントダウン", img: "images/5.jpg" },
  "6":  { title: "ベイカー街の亡霊", img: "images/6.jpg" },
  "7":  { title: "迷宮の十字路", img: "images/7.jpg" },
  "8":  { title: "銀翼の奇術師", img: "images/8.jpg" },
  "9":  { title: "水平線上の陰謀", img: "images/9.jpg" },
  "10": { title: "探偵たちの鎮魂歌", img: "images/10.jpg" },
  "11": { title: "紺碧の棺", img: "images/11.jpg" },
  "12": { title: "戦慄の楽譜", img: "images/12.jpg" },
  "13": { title: "漆黒の追跡者", img: "images/13.jpg" },
  "14": { title: "天空の難破船", img: "images/14.jpg" },
  "15": { title: "沈黙の15分", img: "images/15.jpg" },
  "16": { title: "11人目のストライカー", img: "images/16.jpg" },
  "17": { title: "絶海の探偵", img: "images/17.jpg" },
  "18": { title: "異次元の狙撃手", img: "images/18.jpg" },
  "19": { title: "業火の向日葵", img: "images/19.jpg" },
  "20": { title: "純黒の悪夢", img: "images/20.jpg" },
  "21": { title: "から紅の恋歌", img: "images/21.jpg" },
  "22": { title: "ゼロの執行人", img: "images/22.jpg" },
  "23": { title: "紺青の拳", img: "images/23.jpg" },
  "24": { title: "緋色の弾丸", img: "images/24.jpg" },
  "25": { title: "ハロウィンの花嫁", img: "images/25.jpg" },
  "26": { title: "黒鉄の魚影", img: "images/26.jpg" },
  "27": { title: "100万ドルの五稜星", img: "images/27.jpg" },
  "28": { title: "隻眼の残像", img: "images/28.jpg" },
  "29": { title: "ハイウェイの堕天使", img: "images/29.jpg" }
};

/* -----------------------------------
URL から top3 の映画IDを取得
----------------------------------- */
const params = location.search.replace("?", "").split(",");
const [first, second, third] = params;

/* -----------------------------------
ランク表示処理（理由なし）
----------------------------------- */
function setRank(id, movieId, label) {
  const box = document.getElementById(id);
  const data = movieData[movieId];

  if (!data) {
    box.innerHTML = `<div class="rank-title">${label}</div><p>データなし</p>`;
    return;
  }

  box.innerHTML = `
    <div class="rank-title">${label}</div>

    <a href="${movieId}.html" class="rank-link">
      <img src="${data.img}" class="rank-img">
    </a>

    <div class="rank-sub">
      <a href="${movieId}.html" class="rank-link-title">
        ${data.title}
      </a>
    </div>
  `;
}

/* -----------------------------------
実行
----------------------------------- */
setRank("rank1", first, "🥇第1位");
setRank("rank2", second, "🥈第2位");
setRank("rank3", third, "🥉第3位");

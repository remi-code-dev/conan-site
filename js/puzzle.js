// ライフとステージ管理
let life = 5;
let currentStageIndex = 0;

// DOM取得（nullでもエラーにならないように後でチェックする）
const lifeEl = document.getElementById("life");
const stageNumberEl = document.getElementById("stage-number");
const stageTitleEl = document.getElementById("stage-title");
const stageTextEl = document.getElementById("stage-text");
const hintEl = document.getElementById("hint");
const choicesEl = document.getElementById("choices");
const messageEl = document.getElementById("message");
const nextBtn = document.getElementById("next-btn");
const resultSection = document.getElementById("result-section");
const resultTitleEl = document.getElementById("result-title");
const resultTextEl = document.getElementById("result-text");

// ステージデータ（省略せず全部入れてOK）
const stages = [
  {
    title: "STAGE 1：監視カメラの異常",
    text: `端末には3つの監視カメラ映像が表示されている。<br>
A：白衣の研究員。入館時と同じ服装。<br>
B：作業服の技術者。入館時より「腕章が増えている」。<br>
C：清掃員。入館時と同じ。`,
    hint: "不正アクセスをした可能性が最も高いのは誰か。",
    choices: ["A：研究員", "B：技術者", "C：清掃員"],
    correctIndex: 1,
    correctMessage: "腕章は施設内で支給されるもの。入館時に持っているはずがない。"
  },
  {
    title: "STAGE 2：入館ログの矛盾",
    text: `端末に入館ログが表示されている。<br>
09:12 研究員A<br>
09:13 技術者B<br>
09:14 清掃員C<br>
09:15 技術者B（再入館）`,
    hint: "このログの“おかしな点”はどこか。",
    choices: ["研究員Aが早すぎる", "技術者Bが2回入館している", "清掃員Cの時間が不自然"],
    correctIndex: 1,
    correctMessage: "同じ人物が短時間で2回入館しているのは不自然だ。"
  },
  {
    title: "STAGE 3：暗号通信の解析",
    text: `端末に謎の暗号が届く。<br><br>
<code>KHOOR ZRUOG</code><br><br>
ヒント：3文字ずらす古典暗号。`,
    hint: "この暗号の意味は？",
    choices: ["HELLO WORLD", "DANGER ROOM", "ACCESS OPEN"],
    correctIndex: 0,
    correctMessage: "シーザー暗号で3文字戻すと「HELLO WORLD」になる。"
  },
  {
    title: "STAGE 4：施設マップのパズル",
    text: `あなたは施設の地図を見ている。<br>
A：研究室<br>
B：サーバールーム<br>
C：メンテナンスルーム<br><br>
侵入者は「腕章を拾った」。<br>
腕章はサーバールーム前で落とされていた。<br>
侵入者は“再入館”している。`,
    hint: "侵入者が最初に向かった部屋はどこか。",
    choices: ["A：研究室", "B：サーバールーム", "C：メンテナンスルーム"],
    correctIndex: 1,
    correctMessage: "腕章がサーバールーム前で落ちていたことから、最初の目的地はBだ。"
  },
  {
    title: "STAGE 5：最終推理",
    text: `あなたは全ての証拠を並べる。<br><br>
・技術者Bは入館時と腕章が違う<br>
・入館ログが2回<br>
・サーバールーム前で腕章が落ちていた<br>
・暗号通信「HELLO WORLD」は外部との通信テストの合図`,
    hint: "侵入者の正体は？",
    choices: ["技術者B本人", "技術者Bになりすました人物", "外部から侵入したハッカー"],
    correctIndex: 1,
    correctMessage: "偽の腕章と再入館ログから、Bになりすました人物だとわかる。"
  }
];

// 初期表示
updateLifeDisplay();
loadStage();

// ライフ表示更新
function updateLifeDisplay() {
  if (lifeEl) {
    lifeEl.textContent = "❤️".repeat(life) + "🖤".repeat(5 - life);
  }
}

// ステージ読み込み
function loadStage() {
  const stage = stages[currentStageIndex];

  stageTitleEl.innerHTML = stage.title;
  stageTextEl.innerHTML = stage.text;
  hintEl.textContent = stage.hint;
  stageNumberEl.textContent = `${currentStageIndex + 1} / ${stages.length}`;
  messageEl.textContent = "";
  nextBtn.disabled = true;

  // 選択肢生成
  choicesEl.innerHTML = "";
  stage.choices.forEach((choiceText, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choiceText;
    btn.addEventListener("click", () => handleChoice(index, btn));
    choicesEl.appendChild(btn);
  });
}

// 選択肢クリック
function handleChoice(index, btn) {
  const stage = stages[currentStageIndex];

  // 正解後は押せない
  if (!nextBtn.disabled) return;

  if (index === stage.correctIndex) {
    btn.classList.add("correct");
    messageEl.textContent = stage.correctMessage;
    nextBtn.disabled = false;

    // 他の選択肢を無効化
    document.querySelectorAll(".choice-btn").forEach(b => (b.disabled = true));

  } else {
    btn.classList.add("wrong");
    messageEl.textContent = "……観察が甘い。ライフ -1";
    loseLife();
  }
}

// ライフ減少
function loseLife() {
  life--;
  updateLifeDisplay();
  if (life <= 0) {
    gameOver();
  }
}

// ゲームオーバー
function gameOver() {
  document.querySelector(".puzzle-main").classList.add("hidden");
  resultSection.classList.remove("hidden");
  resultTitleEl.textContent = "事件は迷宮入りした……";
  resultTextEl.innerHTML = `あなたの推理は途中で途切れてしまった。<br>
もう一度最初から挑戦してみよう。`;
}

// 次のステージへ
nextBtn.addEventListener("click", () => {
  currentStageIndex++;
  if (currentStageIndex >= stages.length) {
    clearGame();
  } else {
    loadStage();
  }
});

// クリア
function clearGame() {
  document.querySelector(".puzzle-main").classList.add("hidden");
  resultSection.classList.remove("hidden");

  if (life >= 4) {
    resultTitleEl.textContent = "完全解決：真実にたどり着いた";
    resultTextEl.innerHTML = `あなたはほとんどミスなく事件を解決した。<br>
鋭い観察力と推理力が光っている。`;
  } else {
    resultTitleEl.textContent = "事件は解決した";
    resultTextEl.innerHTML = `あなたは見事、侵入者の正体を暴いた。<br>
しかし、いくつかの見落としもあったようだ。<br>
もう一度挑戦すれば、さらに深い真相に気づけるかもしれない。`;
  }
}
 

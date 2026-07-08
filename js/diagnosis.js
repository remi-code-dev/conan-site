'use strict';

/*29作品スコア箱*/
let score = {};
for (let i = 1; i <= 29; i++) {
  score[String(i)] = 0;
}

/*29作品のタグ辞書*/
const movies = {
  "1":  ["no", "love", "kudo", "ran", "logic"],
  "2":  ["no", "mystery", "kudo", "ran", "thrill"],
  "3":  ["no", "mystery", "kid", "ran", "action"],
  "4":  ["no", "love", "kudo", "ran", "thrill"],
  "5":  ["no", "mystery", "kudo", "ai", "emotion"],
  "6":  ["no", "mystery", "kudo", "ai", "logic"],
  "7":  ["no", "action", "heiji", "kazuha", "emotion"],
  "8":  ["no", "action", "kid", "ran", "thrill"],
  "9":  ["no", "mystery", "kudo", "ran", "logic"],
  "10": ["no", "mystery", "kid", "sonoko", "logic"],
  "11": ["no", "action", "kudo", "sonoko", "thrill"],
  "12": ["no", "mystery", "kudo", "ai", "thrill"],
  "13": ["so", "action", "kudo", "ai", "thrill"],
  "14": ["so", "love", "kid", "ran", "thrill"],
  "15": ["no", "action", "kudo", "ran", "emotion"],
  "16": ["no", "mystery", "kudo", "ai", "thrill"],
  "17": ["no", "action", "kudo", "ran", "thrill"],
  "18": ["so", "mystery", "akai", "sera","thrill"],
  "19": ["so", "mystery", "kid", "sonoko","emotion"],
  "20": ["yes", "action", "amuro","akai","ran", "thrill"],
  "21": ["so", "love", "heiji", "kazuha", "thrill"],
  "22": ["so", "action","amuro", "ran", "thrill"],
  "23": ["yes", "action","kid","sonoko", "thrill"],
  "24": ["yes", "mystery","akai","sera", "logic"],
  "25": ["yes", "action","amuro","ran", "emotion"],
  "26": ["yes", "action", "akai", "amuro", "ai", "thrill"],
  "27": ["yes", "love", "kid", "heiji", "kazuha", "logic"],
  "28": ["yes", "love", "kudo", "ran", "emotion"],
  "29": ["yes", "action", "kudo", "ran", "emotion"]
};

/*質問データ*/
const questions = [
  {
    text:"コナンについてどれくらい知ってる？",
    choices: [
      { text: "全然知らない", value: "no" },
      { text: "まあまあ知ってる", value: "so" },
      { text: "結構知ってる", value: "yes" },
    ]
  },
  {
    text: "好きなジャンルは？",
    choices: [
      { text: "アクション", value: "action" },
      { text: "恋愛", value: "love" },
      { text: "ミステリー", value: "mystery" },
    ]
  },
  {
    text: "好きな男性キャラクターは？",
    type:"image",
    choices: [
      { text: "工藤新一", value: "kudo", img: "images/kudo.jpg" },
      { text: "怪盗キッド", value: "kid", img: "images/kid.jpg" },
      { text: "安室透", value: "amuro", img: "images/amuro.jpg" },
      { text: "赤井秀一", value: "akai", img: "images/akai.jpg" },
      { text: "服部平次", value: "heiji", img: "images/heiji.jpg" }
    ]
  },
  {
    text: "好きな女性キャラクターは？",
    type:"image",
    choices: [
      { text: "毛利蘭", value: "ran", img: "images/ran.jpg" },
      { text: "灰原哀", value: "ai", img: "images/ai.jpg" },
      { text: "世良真純", value: "sera", img: "images/sera.jpg" },
      { text: "遠山和葉", value: "kazuha", img: "images/kazuha.jpg" },
      { text: "鈴木園子", value: "sonoko", img: "images/sonoko.jpg" }
    ]
  },
  {
    text: "映画に求めるものは？",
    choices: [
      { text: "ドキドキ", value: "thrill" },
      { text: "感動", value: "emotion" },
      { text: "頭脳戦", value: "logic" }
    ]
  }
];

/*タグマッチ型スコア加算*/
function addScore(value) {
  for (let id in movies) {
    if (movies[id].includes(value)) {
      score[id] += 1;
    }
  }
}

/*質問表示*/
let current = 0;

const questionText = document.getElementById("question-text");
const choicesBox = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");

function showQuestion() {
  const q = questions[current];
  questionText.textContent = q.text;

  choicesBox.innerHTML = "";
  nextBtn.style.display = "none";

  q.choices.forEach(choice => {
    const btn = document.createElement("div");
    btn.className = "choice-btn";

    if (q.type === "image") {
      btn.innerHTML = `
      <img src="${choice.img}">
      <p>${choice.text}</p>
      `;
    } else {
      btn.innerHTML = `<p>${choice.text}</p>`;
    }

    btn.onclick = () => {
      addScore(choice.value);
      nextBtn.style.display = "inline-block";
    };

    choicesBox.appendChild(btn);
  });
}

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

/*最終結果(TOP3)*/
function showResult() {
  let ranking = Object.entries(score);

  ranking.sort((a, b) => b[1] - a[1]);

  let top3 = ranking.slice(0, 3).map(item => item[0]);

  window.location.href = `top3.html?${top3.join(",")}`;
}

showQuestion();

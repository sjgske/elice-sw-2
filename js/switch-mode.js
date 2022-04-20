const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function switchMode(mode) {
  if (mode === "night") {
    $("body").style.backgroundColor = "#000";
    $("body").style.color = "#eee";
    $("a").style.color = "#eee";
    // jquery chaining
    // $("body").css("background-color", "black").css("color", "#eee");
    // querySelectorAll, 반복문 필요 없음! 그냥 똑같이 쓴다.
  } else {
    $("body").style.backgroundColor = "transparent";
    $("body").style.color = "#000";
    $("a").style.color = "#000";
  }
}

const btn = document.querySelector(".button");
btn.addEventListener("click", (e) => {
  if (e.target.value === "night") {
    switchMode("night");
    e.target.value = "day"; // this: 버튼을 가리킴
  } else {
    switchMode("day");
    e.target.value = "night";
  }
});

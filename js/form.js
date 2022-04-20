let topics = [
  {
    id: 1,
    title: "html",
    body: "html is ..",
  },
  {
    id: 2,
    title: "css",
    body: "css is ..",
  },
  {
    id: 3,
    title: "javascript",
    body: "javascript is ..",
  },
];
let nextId = 4;
let selectedId = null;

// TODO: 새로 추가한 아이템 클릭 시 오류 해결

// Show update & delete buttons
function handleButtons() {
  // 홈일 때 버튼 hidden ON
  // 메뉴 선택되었을 때 버튼 hidden 해제
  // selectedId -> 전역변수 (메뉴 클릭 시 obj의 아이디 값이 할당됨)
  $$(".handle").forEach((button) => {
    if (selectedId !== null) {
      button.classList.remove("hidden");
    } else {
      button.classList.add("hidden");
    }
  });
}

// Return to home
function handleTitle(e) {
  e.preventDefault();
  $(".article").innerHTML = `<h2>Welcome</h2><p>Hello, WEB!!</p>`;
  selectedId = null;
  handleButtons();
}

// Show contents of menu
function handleMenu(e) {
  // 메뉴를 클릭하면 e.target과 id가 같은 요소(obj)의 title, body를 article에 그려준다.
  e.preventDefault();
  selectedId = parseInt(e.target.id);
  topics.forEach((el) => {
    if (el.id === selectedId) {
      $(".article h2").innerText = el.title;
      $(".article p").innerText = el.body;
    }
  });
  handleButtons();
}

// Render list item
function render(obj) {
  const li = document.createElement("li");
  li.innerHTML = `<a id="${obj.id}" href="/read/${obj.id}">${obj.title}</a>`;

  $(".menu-list").appendChild(li);
}

// Add list item
function handleCreateItem(e) {
  e.preventDefault();
  const newObj = {
    id: nextId, // topics.length + 1 => 기존 아이템을 삭제했을 경우 id가 덮어씌워질 수 있음
    title: $(".input-title").value,
    body: $(".input-desc").value,
  };
  topics.push(newObj);
  render(newObj);
  nextId++;
  $(".input-title").value = "";
  $(".input-desc").value = "";
}

// Show form
$(".create-btn").addEventListener("click", () =>
  $(".form").classList.toggle("hidden")
);

// Event handlers
function initEventHandlers() {
  $(".form").addEventListener("submit", handleCreateItem);

  $$(".menu-list a").forEach((el) => {
    el.addEventListener("click", handleMenu);
  });

  $(".title").addEventListener("click", handleTitle);
}

initEventHandlers();

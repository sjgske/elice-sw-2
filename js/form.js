let nextId = 4;
let selectedId = null;

// TODO: 다른 부분도 fetch로 json data 연결해주기

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
function render() {
  fetch("http://localhost:3000/topics")
    .then((response) => response.json()) // response의 데이터 타입 표기해준다.
    .then((topics) => {
      // 받아온 json 데이터를 사용한다!
      topics.forEach((el) => {
        const li = document.createElement("li");
        li.innerHTML = `<a id="${el.id}" href="/read/${el.id}">${el.title}</a>`;
        $(".menu-list").appendChild(li);
      });
    });
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
  render();
  toggleFormClass();
  initEventHandlers();
  selectedId = nextId;
  nextId++;
  $(".input-title").value = "";
  $(".input-desc").value = "";
}

// Show form
function toggleFormClass() {
  $(".form").classList.toggle("hidden");
}

// Event handlers
function initEventHandlers() {
  $(".form").addEventListener("submit", handleCreateItem);

  $$(".menu-list a").forEach((el) => {
    el.addEventListener("click", handleMenu);
  });

  $(".title").addEventListener("click", handleTitle);

  $(".create-btn").addEventListener("click", toggleFormClass);
}

initEventHandlers();
render();

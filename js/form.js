let nextId = 4;
let selectedId = null;

// Delete Item
async function deleteItem() {
  const response = await fetch(`http://localhost:3000/topics/${selectedId}`, {
    method: "delete",
  });
  selectedId = null;
  render();
  handleTitle();
}

// Update contents
async function handleUpdate() {
  const title = $(".input-title").value;
  const body = $(".input-desc").value;
  const response = await fetch(`http://localhost:3000/topics/${selectedId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title, body: body }),
  });
  const data = await response.json();
  render();
  toggleFormClass(".update-form");
  selectedId = data.id;
}

// Update form toggle
async function toggleUpdate() {
  const response = await fetch(`http://localhost:3000/topics/${selectedId}`);
  const topics = await response.json();
  toggleFormClass(".update-form");
  $("form input").value = topics.title;
  $("form textarea").innerText = topics.title;
}

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
  $$("form").forEach((form) => {
    form.classList.add("hidden");
  });
}

// Show contents of menu
async function handleMenu(e) {
  e.preventDefault();
  const response = await fetch("http://localhost:3000/topics/");
  const topics = await response.json();
  topics.forEach((el) => {
    selectedId = parseInt(e.target.id);
    if (selectedId === el.id) {
      $(".article h2").innerText = el.title;
      $(".article p").innerText = el.body;
    }
    handleButtons();
  });
}

// Render list item
async function render() {
  $("nav ol").innerText = "Loading...";

  const response = await fetch("http://localhost:3000/topics");
  const topics = await response.json();
  $("nav ol").innerText = "";
  topics.forEach((el) => {
    const li = document.createElement("li");
    li.innerHTML = `<a id="${el.id}" href="/read/${el.id}">${el.title}</a>`;
    $(".menu-list").appendChild(li);
  });
  initEventHandlers();
  $$("form").forEach((form) => {
    form.classList.add("hidden");
  });
}

// Add list item
async function handleCreateItem(e) {
  e.preventDefault();
  const title = $(".input-title").value;
  const body = $(".input-desc").value;
  const response = await fetch("http://localhost:3000/topics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title, body: body }),
  });
  const data = await res.json();
  render();
  toggleFormClass(".create-form");
  selectedId = data.id;
}

// Show form
function toggleFormClass(form) {
  $(form).classList.toggle("hidden");
}

// Event handlers
function initEventHandlers() {
  $(".create-form").addEventListener("submit", handleCreateItem);
  $(".update-form").addEventListener("submit", handleUpdate);
  $$(".menu-list a").forEach((el) => {
    el.addEventListener("click", handleMenu);
  });
  $(".title").addEventListener("click", handleTitle);
  $(".create-btn").addEventListener("click", toggleFormClass(".create-form"));
  $(".update-btn").addEventListener("click", toggleUpdate);
  $(".delete-btn").addEventListener("click", deleteItem);
}

render();

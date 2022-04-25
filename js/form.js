let nextId = 4;
let selectedId = null;

// TODO: 중복되는 코드 정리
// TODO: toggleFormClass 다시 짜기

// Delete Item
function deleteItem() {
  fetch(`http://localhost:3000/topics/${selectedId}`, {
    method: "delete",
  })
    .then((res) => res.json())
    .then(() => {
      selectedId = null;
      render();
      handleTitle();
    });
}

// Update contents
function handleUpdate() {
  const title = $(".input-title").value;
  const body = $(".input-desc").value;
  fetch(`http://localhost:3000/topics/${selectedId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title, body: body }),
  })
    .then((res) => res.json())
    .then((data) => {
      render();
      toggleFormClass(".update-form");
      selectedId = data.id;
    });
}

// Update form toggle
function toggleUpdate() {
  fetch(`http://localhost:3000/topics/${selectedId}`)
    .then((response) => response.json())
    .then((topics) => {
      toggleFormClass(".update-form");
      $("form input").value = topics.title;
      $("form textarea").innerText = topics.title;
    });
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
}

// Show contents of menu
function handleMenu(e) {
  e.preventDefault();
  fetch("http://localhost:3000/topics/")
    .then((response) => response.json())
    .then((topics) => {
      topics.forEach((el) => {
        selectedId = parseInt(e.target.id);
        if (selectedId === el.id) {
          $(".article h2").innerText = el.title;
          $(".article p").innerText = el.body;
        }
        handleButtons();
      });
    });
}

// Render list item
function render() {
  fetch("http://localhost:3000/topics")
    .then((response) => response.json())
    .then((topics) => {
      // 받아온 json 데이터를 사용한다!
      // 데이터를 받은 후에 호출된다.
      $("nav ol").innerText = "";
      topics.forEach((el) => {
        const li = document.createElement("li");
        li.innerHTML = `<a id="${el.id}" href="/read/${el.id}">${el.title}</a>`;
        $(".menu-list").appendChild(li);
        initEventHandlers();
      });
    });
  $("nav ol").innerText = "Loading...";
}

// Add list item
function handleCreateItem(e) {
  e.preventDefault();
  const title = $(".input-title").value;
  const body = $(".input-desc").value;
  fetch("http://localhost:3000/topics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title, body: body }),
  })
    .then((res) => res.json())
    .then((data) => {
      render();
      toggleFormClass(".create-form");
      selectedId = data.id;
    });
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

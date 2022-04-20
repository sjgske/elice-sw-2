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
// TODO: 홈화면, 메뉴 상세 화면 버튼 다르게 나타나기 구현!

// Show contents of menu
function handleMenu(e) {
  // 메뉴를 클릭하면 e.target과 id가 같은 요소(obj)의 title, body를 article에 그려준다.
  e.preventDefault();
  let selectedId = parseInt(e.target.id);
  topics.forEach((el) => {
    if (el.id === selectedId) {
      $(".article h2").innerText = el.title;
      $(".article p").innerText = el.body;
    }
  });
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
    id: topics.length + 1,
    title: $(".input-title").value,
    body: $(".input-desc").value,
  };
  topics.push(newObj);
  render(newObj);
  $(".input-title").value = "";
  $(".input-desc").value = "";
}

// Show create form
$(".create-btn").addEventListener("click", () =>
  $(".form").classList.toggle("hidden")
);

// Event handlers
$(".form").addEventListener("submit", handleCreateItem);

$$(".menu-list a").forEach((el) => {
  el.addEventListener("click", handleMenu);
});

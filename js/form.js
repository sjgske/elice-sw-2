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

function render() {
  $("ol").innerHTML = "";
  for (let i = 0; i < topics.length; i++) {
    let navTag = `<li><a class="link" href="${topics[i].id}.html">${topics[i].title}</a></li>`;
    $("ol").innerHTML += navTag;
  }
}

// show form
$(".create-btn").addEventListener("click", () => {
  $(".form").classList.toggle("hidden");
});

// add list item
$(".form").addEventListener("submit", (e) => {
  let count = 4;
  e.preventDefault();
  const newObj = {
    id: count,
    title: $(".title").value,
    body: $(".desc").value,
  };

  topics.push(newObj);
  render();
  $(".title").value = "";
  $(".desc").value = "";
  count++;
});

render();

// show article
document.querySelectorAll(".link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    $(".article h2").innerText = e.target.innerText;
  });
});

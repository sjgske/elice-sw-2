import "./App.css";

function Header() {
  return (
    <header>
      <h1>
        <a href="/">Web</a>
      </h1>
    </header>
  );
}

function Nav({ data }) {
  const list = data.map((el) => (
    <li key={el.id}>
      <a href={`/read/${el.id}`}>{el.title}</a>
    </li>
  ));
  // const list = [
  //   <li>
  //     <a href="/read/1">html</a>
  //   </li>,
  //   <li>
  //     <a href="/read/2">css</a>
  //   </li>,
  // ];
  return (
    <nav>
      <ol>{list}</ol>
    </nav>
  );
}

function Article({ title, body }) {
  return (
    <article>
      <h2>{title}</h2>
      {body}
    </article>
  );
}

function App() {
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
  ];
  return (
    <div>
      <Header />
      <Nav data={topics} />
      <Article title="Welcome" body="Hello, WEB!" />
      <Article title="HTML" body="HTML is ..." />
    </div>
  );
}

export default App;

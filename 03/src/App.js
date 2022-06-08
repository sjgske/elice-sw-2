import "./App.css";
import { useState } from "react";
// use가 붙어있는 함수들을 hook이라고 한다.
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function Header({ onSelect }) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onSelect();
          }}
        >
          Web
        </a>
      </h1>
    </header>
  );
}

function Nav({ data, onSelect }) {
  const list = data.map((el) => (
    <li key={el.id}>
      <a
        href={`/read/${el.id}`}
        onClick={(e) => {
          e.preventDefault();
          onSelect(el.id);
          // onSelect의 인자로 el.id 전달
          // el.id는 map함수의 인자(data 배열 각각의 원소)의 id 속성
        }}
      >
        {el.title}
      </a>
    </li>
  ));
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
  const data = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
  ];

  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  // 'WELCOME' = 상태의 default 값
  // useState('값')는 ['값', 함수] 리턴한다.
  // 함수는 값을 바꾸는 역할

  // mode 값에 따라 content 동적으로 바꾸기 -> state!
  let content = null;
  if (mode === "WELCOME") {
    console.log(mode, id);
    content = <Article title="Welcome" body="Hello, WEB!" />;
  } else if (mode === "READ") {
    const topic = data.filter((el) => el.id === id)[0];
    content = <Article title={topic.title} body={topic.body} />;
  }

  return (
    <div>
      <Header
        onSelect={() => {
          setMode("WELCOME");
        }}
      />
      <Nav
        data={data}
        onSelect={(id) => {
          setMode("READ");
          setId(id);
        }}
      />
      {content}
      <ButtonGroup variant="outlined" aria-label="text button group">
        <Button
          onClick={() => {
            alert("create!");
          }}
        >
          CREATE
        </Button>
        <Button>UPDATE</Button>
        <Button>DELETE</Button>
      </ButtonGroup>
    </div>
  );
}

export default App;

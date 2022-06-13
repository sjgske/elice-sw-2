import "./App.css";
import { useState } from "react";
// use가 붙어있는 함수들을 hook이라고 한다.
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import styled from "styled-components";

function Header({ className, onSelect }) {
  return (
    <header className={className}>
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

const HeaderStyled = styled(Header)`
  border-bottom: 1px solid gray;
  padding: 20px 0;
  font-size: 20px;
`;

function Nav({ data, onSelect }) {
  const list = data.map((el) => (
    <li key={el.id}>
      <a
        href={`/read/${el.id}`}
        onClick={(e) => {
          e.preventDefault();
          onSelect(el.id);
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

function Create({ onCreate }) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const body = e.target.body.value;
          onCreate(title, body);
        }}
      >
        <input name="title" type="text" placeholder="title" />
        <textarea name="body" placeholder="body" />
        <button type="submit">Create</button>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
  ]);
  const [nextId, setNextId] = useState(3);

  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, WEB!" />;
  } else if (mode === "READ") {
    const topic = topics.filter((el) => el.id === id)[0];
    content = <Article title={topic.title} body={topic.body} />;
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(title, body) => {
          const newTopic = { id: nextId, title, body };
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setId(nextId);
          setMode("READ");
          setNextId(nextId + 1);
        }}
      />
    );
  }

  return (
    <div className="App">
      <HeaderStyled
        onSelect={() => {
          setMode("WELCOME");
        }}
      />
      <Nav
        data={topics}
        onSelect={(id) => {
          setMode("READ");
          setId(id);
        }}
      />
      {content}
      <ButtonGroup variant="outlined" aria-label="text button group">
        <Button
          onClick={() => {
            setMode("CREATE");
          }}
        >
          CREATE
        </Button>
        <Button>UPDATE</Button>
        <Button
          onClick={() => {
            const newTopics = topics.filter((el) => el.id !== id);
            setTopics(newTopics);
            setMode("WELCOME");
          }}
        >
          DELETE
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default App;

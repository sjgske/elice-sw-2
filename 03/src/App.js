import "./App.css";
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
        Click={(e) => {
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

function EgoingButton({ onClick }) {
  return <button onClick={onClick}>버튼</button>;
}

function App() {
  const data = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
  ];
  return (
    <div>
      <Header
        onSelect={() => {
          alert("header!!");
        }}
      />
      <Nav
        data={data}
        // onSelect: 받아온 인자 값을 alert창에 찍어준다.
        onSelect={(id) => {
          alert("Nav!!" + id);
        }}
      />
      <Article title="HTML" body="HTML is ..." />
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
      <EgoingButton
        onClick={() => {
          alert("click!");
        }}
      />
    </div>
  );
}

export default App;

import "./App.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link, Route, Routes } from "react-router-dom";
import { HeaderStyled } from "./Header";
import { Nav } from "./Nav";
import { Article } from "./Article";
import { Create } from "./Create";
import { Read } from "./Read";

function App() {
  const [id, setId] = useState(null); // TODO: 삭제예정
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
  ]);
  const [nextId, setNextId] = useState(3);

  const onCreateHandler = () => {
    return (title, body) => {
      const newTopic = { id: nextId, title, body };
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setId(nextId);
      setNextId(nextId + 1);
    };
  };

  return (
    <div className="App">
      <HeaderStyled />
      <Nav
        data={topics}
        onSelect={(id) => {
          setId(id);
        }}
      />
      <Routes>
        <Route
          path="/"
          element={<Article title="Welcome" body="Hello, WEB!" />}
        />
        <Route path="/create" element={<Create onCreate={onCreateHandler} />} />
        <Route path="/read/:id" element={<Read topics={topics} />} />
      </Routes>
      <ButtonGroup variant="outlined" aria-label="text button group">
        <Button component={Link} to="/create">
          CREATE
        </Button>
        <Button>UPDATE</Button>
        <Button
          onClick={() => {
            // setState 안에 콜백함수로 state를 가져오는게 바람직하다.
            // 최신 state 값을 보장할수있기때문
            setTopics((curr) => curr.filter((el) => el.id !== id));
          }}
        >
          DELETE
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default App;

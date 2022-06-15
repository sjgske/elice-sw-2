import "./App.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();

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

  const deleteHander = (id) => {
    setTopics((curr) => curr.filter((el) => el.id !== id));
    navigate("/");
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
        <Route
          path="/create"
          element={<Create onCreate={onCreateHandler()} />}
        />
        <Route path="/read/:id" element={<Read topics={topics} />} />
      </Routes>

      <Routes>
        {["/", "/read/:id", "/update/:id"].map((path) => {
          return (
            <Route
              key={path}
              path={path}
              element={
                <Control
                  onDelete={(id) => {
                    deleteHander(id);
                  }}
                />
              }
            ></Route>
          );
        })}
      </Routes>
    </div>
  );
}

function Control({ onDelete }) {
  const params = useParams();
  const id = Number(params.id);
  let contextUI = null;
  if (id) {
    contextUI = (
      <>
        <Button variant="outlined">UPDATE</Button>
        <Button
          variant="outlined"
          onClick={() => {
            onDelete(id);
          }}
        >
          DELETE
        </Button>
      </>
    );
  }
  return (
    <>
      <Button component={Link} to="/create" variant="outlined">
        CREATE
      </Button>
      {contextUI}
    </>
  );
}

export default App;

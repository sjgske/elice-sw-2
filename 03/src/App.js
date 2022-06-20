import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { HeaderStyled } from "./Header";
import { Nav } from "./Nav";
import { Article } from "./Article";
import { Create } from "./Create";
import { Read } from "./Read";
import { Control } from "./Control";
import { Update } from "./Update";

function App() {
  const [topics, setTopics] = useState([]);
  const refreshTopics = async () => {
    const res = await fetch("http://localhost:3333/topics");
    const data = await res.json();
    setTopics(data);
  };
  useEffect(() => {
    refreshTopics();
  }, []);
  const navigate = useNavigate();

  const createHandler = async (title, body) => {
    const res = await fetch("http://localhost:3333/topics", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });
    const data = await res.json();
    navigate("/read/" + data.id);
    refreshTopics();
  };

  const deleteHandler = async (id) => {
    const res = await fetch(`http://localhost:3333/topics/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    navigate("/");
    refreshTopics();
  };

  const updateHandler = async (id, title, body) => {
    const res = await fetch(`http://localhost:3333/topics/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });
    const data = await res.json();
    navigate("/read/" + data.id);
    refreshTopics();
  };

  return (
    <div className="App">
      <HeaderStyled />
      <Nav data={topics} />
      <Routes>
        <Route
          path="/"
          element={<Article title="Welcome" body="Hello, WEB!" />}
        />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/create" element={<Create onCreate={createHandler} />} />
        <Route
          path="/update/:id"
          element={<Update onUpdate={updateHandler} />}
        />
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
                    deleteHandler(id);
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

export default App;

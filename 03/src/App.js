import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { HeaderStyled } from "./Header";
import { Nav } from "./Nav";
import { Article } from "./Article";
import { Create } from "./Create";
import { Read } from "./Read";
import { Control } from "./Control";

function App() {
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
  ]);
  const refreshTopics = async () => {
    const res = await fetch("http://localhost:3333/topics");
    const data = await res.json();
    setTopics(data);
  };
  useEffect(() => {
    refreshTopics();
  }, []);
  const navigate = useNavigate();

  const onCreateHandler = async (title, body) => {
    const res = await fetch("http://localhost:3333/topics", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });
    const data = res.json();
    navigate(`/read/${data.id}`);
    refreshTopics();
  };

  const deleteHander = (id) => {
    setTopics((curr) => curr.filter((el) => el.id !== id));
    navigate("/");
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
        <Route path="/create" element={<Create onCreate={onCreateHandler} />} />
        <Route path="/read/:id" element={<Read />} />
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

export default App;

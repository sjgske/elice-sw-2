import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function Update({ onUpdate }) {
  const params = useParams();
  const id = Number(params.id);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const refreshTopic = async () => {
    const res = await fetch(`http://localhost:3333/topics/${id}`);
    const data = await res.json();
    setTitle(data.title);
    setBody(data.body);
  };
  useEffect(() => {
    refreshTopic();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;
    onUpdate(id, title, body);
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Update</h2>
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></textarea>
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}

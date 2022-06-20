import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Article } from "./Article";

export function Read() {
  const params = useParams();
  const id = Number(params.id);
  const [topic, setTopic] = useState({});
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3333/topics/${id}`);
      const data = await res.json();
      setTopic(data);
    })();
  }, [id]);
  return <Article title={topic.title} body={topic.body} />;
}

import { useParams } from "react-router-dom";
import { Article } from "./Article";

export function Read({ topics }) {
  const params = useParams();
  const id = Number(params.id);
  const topic = topics.filter((el) => el.id === id)[0];
  return <Article title={topic.title} body={topic.body} />;
}

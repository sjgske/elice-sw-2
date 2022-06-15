import { Link } from "react-router-dom";

export function Nav({ data, onSelect }) {
  const list = data.map((el) => (
    <li key={el.id}>
      <Link
        to={`/read/${el.id}`}
        onClick={() => {
          onSelect(el.id);
        }}
      >
        {el.title}
      </Link>
    </li>
  ));
  return (
    <nav>
      <ol>{list}</ol>
    </nav>
  );
}

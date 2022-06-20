import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";

export function Control({ onDelete }) {
  const params = useParams();
  const id = Number(params.id);
  let contextUI = null;
  if (id) {
    contextUI = (
      <>
        <Button component={Link} to={`/update/${id}`} variant="outlined">
          UPDATE
        </Button>
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
      {/* component={Link} 버튼인데 링크처럼 하는거.. */}
      <Button component={Link} to="/create" variant="outlined">
        CREATE
      </Button>
      {contextUI}
    </>
  );
}

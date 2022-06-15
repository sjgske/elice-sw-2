import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";

export function Control({ onDelete }) {
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

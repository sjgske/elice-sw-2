import styled from "styled-components";
import { Link } from "react-router-dom";

function Header({ className, onSelect }) {
  return (
    <header className={className}>
      <h1>
        <Link to="/" onClick={onSelect}>
          Web
        </Link>
      </h1>
    </header>
  );
}
export const HeaderStyled = styled(Header)`
  border-bottom: 1px solid gray;
  padding: 20px 0;
  font-size: 20px;
`;

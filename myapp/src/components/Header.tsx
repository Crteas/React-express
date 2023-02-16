import { Link } from "react-router-dom";
import styled from "styled-components";

const Menu = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: greenyellow;
  padding-left: 100px;
  box-sizing: border-box;
`;

const MenuItem = styled.li`
  list-style: none;
  font-size: 28px;
  margin-right: 28px;

  a {
    text-decoration: none;
    color: black;
  }
`;

function Header() {
  return (
    <Menu>
      <MenuItem>
        <Link to="/">HOME</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/book">BOOK</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/upload">UPLOAD</Link>
      </MenuItem>
    </Menu>
  );
}

export default Header;

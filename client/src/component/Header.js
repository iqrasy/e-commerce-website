import styled from "styled-components";
import { BsHouse } from "react-icons/bs";

const Header = () => {
  return (
    <Head>
      <h1>
        Fülhaus <BsHouse />
      </h1>
    </Head>
  );
};

const Head = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #847577;
  color: #fbfbf2;
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  font-family: "Montserrat", sans-serif;
`;

export default Header;

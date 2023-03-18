import Cart from "./Cart";
import styled from "styled-components";
import { useState } from "react";

const CartContainer = ({ cartItems, setCartItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Main>
      <Toggle onClick={toggle}>&#9776;</Toggle>
      <Box>
        <Cart
          isOpen={isOpen}
          cartItems={cartItems}
          setCartItems={setCartItems}
          toggle={toggle}
        />
      </Box>
    </Main>
  );
};

const Main = styled.div`
  position: fixed;
  width: 200px;
  left: 95%;
  top: 10%;
  height: 90px;
  z-index: 1;
`;

const Toggle = styled.div`
  border-radius: 20px;
  background: black;
  color: white;
  position: absolute;
  padding: 8px;
  z-index: 20px;
`;

const Box = styled.div`
  padding: 20px;
`;

export default CartContainer;

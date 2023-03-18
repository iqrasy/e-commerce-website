import { useEffect, useState } from "react";
import styled from "styled-components";
import { RiStarSFill } from "react-icons/ri";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BiLoader } from "react-icons/bi";
import Cart from "./Cart";
import Header from "./Header";
import CartContainer from "./CartContainer";

const HomePage = () => {
  const [items, setItems] = useState();
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
    console.log("clicked", cartItems);
    console.log(item);
  };

  useEffect(() => {
    fetch("/items")
      .then((res) => res.json())
      .then((resItems) => {
        setItems(resItems.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!items) {
    return (
      <LoadingContainer>
        Loading <BiLoader />
      </LoadingContainer>
    );
  }

  return (
    <>
      <Header />
      <CartContainer setCartItems={setCartItems} cartItems={cartItems} />
      <Main>
        {items &&
          items.map((data, id) => (
            <Div key={id}>
              {data.newData &&
                Object.values(data.newData).map((key) => (
                  <Container key={key._id}>
                    <div>
                      <Img src={key.images[0]} />
                    </div>
                    <Name>{key.fulhausProductName}</Name>
                    <Price>${key.retailPrice}</Price>
                    <AddToCart onClick={() => handleAddToCart(key)}>
                      <BsFillCartCheckFill />
                    </AddToCart>

                    <IconsContainer>
                      {[...Array(5)].map((stars, i) => (
                        <RiStarSFill key={i} />
                      ))}
                    </IconsContainer>
                  </Container>
                ))}
            </Div>
          ))}
      </Main>
    </>
  );
};

const LoadingContainer = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 100px;
  font-size: 40px;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 130vh;
  font-family: "Montserrat", sans-serif;
`;

const Div = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 70px;
  justify-content: center;
  align-content: center;

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 260px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 200px;
  object-fit: cover;
`;

const IconsContainer = styled.p`
  display: flex;
  position: relative;
  right: 30%;
  /* top: 5%; */
  z-index: -5;
`;

const Price = styled.p`
  margin: 10px;
  display: flex;
  position: relative;
  right: 35%;
  top: 10%;
  z-index: -15px;
`;

const AddToCart = styled.button`
  display: flex;
  border: none;
  margin-left: 10px;
  background-color: white;
  font-size: 22px;
  position: relative;
  left: 40%;
  top: 8%;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #3f51b5;
    cursor: pointer;
  }
`;

const Name = styled.p`
  font-size: 13px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  z-index: -5;
`;

export default HomePage;

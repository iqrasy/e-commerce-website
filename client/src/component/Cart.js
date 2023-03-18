import styled from "styled-components";

const Cart = ({ isOpen, cartItems, setCartItems, toggle }) => {
  //
  const total = cartItems.reduce((price, item) => price + item.retailPrice, 0);

  const add = (item) => {
    const product = cartItems.findIndex(
      (furniture) => furniture._id === item._id
    );
    if (product >= 0) {
      const update = [...cartItems];
      update[product].quantity += 1;
      setCartItems(update);
    } else {
      setCartItems((previous) => [...previous, { ...item, quantity: 1 }]);
    }
  };

  const remove = (items) => {
    setCartItems((previous) => previous.filter((item) => item._id !== items));
  };

  return (
    <div>
      {isOpen && (
        <CartContainer>
          <Header>
            <h2>My Order</h2>
            <Button onClick={toggle}>Close</Button>
          </Header>
          <Container>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <Item key={item._id}>
                  <Img src={item.images[0]} />
                  <div>
                    <Name>{item.fulhausProductName}</Name>
                    <Price>${item.retailPrice}</Price>
                    <p
                      onClick={() =>
                        setCartItems(
                          cartItems.filter((items) => items._id !== item._id)
                        )
                      }
                    ></p>
                    <Minus onClick={() => remove(item._id)}>-</Minus>
                    <Plus onClick={() => add(item)}>+</Plus>
                    <p>{item.quantity}X</p>
                  </div>
                </Item>
              ))
            )}
            <Total>TOTAL: ${total}</Total>
            <Checkout>Checkout</Checkout>
          </Container>
        </CartContainer>
      )}
    </div>
  );
};

const CartContainer = styled.div`
  position: fixed;
  top: 10%;
  right: 0;
  bottom: 0;
  width: 400px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
  overflow: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Container = styled.div`
  padding: 20px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Img = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 20px;
`;

const Name = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  font-family: "Montserrat", sans-serif; ;
`;

const Price = styled.div`
  font-size: 14px;
  color: #666;
  font-family: "Montserrat", sans-serif; ;
`;

const Total = styled.p`
  display: flex;
  position: relative;
  top: 480px;
  font-size: 25px;
  font-family: "Montserrat", sans-serif; ;
`;

const Checkout = styled.button`
  background-color: black;
  color: white;
  border: none;
  width: 300px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 500px;
  margin: 0 auto;
`;

const Button = styled.button`
  border: none;
  border-radius: 10px;
  color: black;
`;

const Minus = styled.button`
  background-color: white;
  width: 30px;
  border: none;
  border-radius: 10px;
  color: black;
`;

const Plus = styled.button`
  background-color: white;
  width: 30px;
  border: none;
  border-radius: 10px;
  color: black;
`;

export default Cart;

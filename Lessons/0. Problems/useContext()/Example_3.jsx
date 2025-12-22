/*
3. Shopping Cart (Global State)
In an e-commerce app, many components (Navbar, Product List, Checkout) need to know how many items are in the cart.
*/
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

function Header() {
  const { cart } = useContext(CartContext);
  return <header>🛒 Cart Items: {cart.length}</header>;
}

function ProductList() {
  const { addToCart } = useContext(CartContext);
  const products = [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Phone' }];

  return (
    <div>
      {products.map(p => (
        <div key={p.id}>
          {p.name} <button onClick={() => addToCart(p)}>Add</button>
        </div>
      ))}
    </div>
  );
}

export default function ShopApp() {
  return (
    <CartProvider>
      <Header />
      <ProductList />
    </CartProvider>
  );
}
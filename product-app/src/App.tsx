import { useState } from 'react';
import './App.css'
import NavBar from './components/NavBar'
import Products from './components/Products'
import Cart from './components/Cart';
import { CartProvider } from './Context/CartContext';

function App() {
  const [view, setView] = useState<string>('products');

  return (
    <>
      <CartProvider>
        <NavBar 
          view={view}
          setView={setView}
        />
        {view === 'products' ? <Products />: <Cart />}
      </CartProvider>
    </>
  )
}

export default App

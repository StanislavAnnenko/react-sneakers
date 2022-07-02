import { BrowserRouter as Router,
  Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";
import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    axios.get('https://62bdfd3bbac21839b60e840e.mockapi.io/items')
    .then(res => {
      setItems(res.data)
    });

    axios.get('https://62bdfd3bbac21839b60e840e.mockapi.io/cart')
    .then(res => {
      setCartItems(res.data)
    });

    axios.get('https://62bdfd3bbac21839b60e840e.mockapi.io/favorites')
    .then(res => {
      setFavorites(res.data)
    });
  },[]);

  const onAddToCart = (obj) => {
    const alreadyAdded = cartItems.some(function(e){ 
      return e.title === obj.title;
    });
    if(!alreadyAdded) {
      setCartItems(prev => [...prev, obj]);
      axios.post('https://62bdfd3bbac21839b60e840e.mockapi.io/cart',
      obj);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const onRemoveFromCart = (id) => {
    axios.delete(`https://62bdfd3bbac21839b60e840e.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(function(item) { return item.id !== id }));
  };

  const onAddToFavorite = async (obj) => {
    if(favorites.find(item => item.id === obj.id)){
      axios.delete(`https://62bdfd3bbac21839b60e840e.mockapi.io/favorites/${obj.id}`);
    } else {
      const { data } = await axios.post('https://62bdfd3bbac21839b60e840e.mockapi.io/favorites',
      obj);
      
      setFavorites(prev => [...prev, data]);
    }
  }

  return (
    <Router>
      <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={(obj) => onRemoveFromCart(obj)}/> }
        <Header onClickCart={() => setCartOpened(true)} />
        
        <Routes>
          <Route path="/" element={<Home items={items} searchValue={searchValue} onChangeSearchInput={onChangeSearchInput} setSearchValue={searchValue} onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite} />} />
          <Route path="/favorites" element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { useState, useEffect } from "react";
import { BrowserRouter as Router,
  Routes, Route } from 'react-router-dom';
import axios from 'axios';
import AppContext from "./context";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const cartResponse = await axios.get('https://62bdfd3bbac21839b60e840e.mockapi.io/cart');
      const favoritesRespose = await axios.get('https://62bdfd3bbac21839b60e840e.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://62bdfd3bbac21839b60e840e.mockapi.io/items');

      setIsLoading(false);
      
      setCartItems(cartResponse.data);
      setFavorites(favoritesRespose.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  },[]);

  const onAddToCart = (obj) => {

    if(cartItems.find(item => Number(item.id) === Number(obj.id))){
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      axios.delete(`https://62bdfd3bbac21839b60e840e.mockapi.io/cart/${obj.id}`);
    } else {
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
    try {
      if(favorites.find(item => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://62bdfd3bbac21839b60e840e.mockapi.io/favorites/${obj.id}`);
        setFavorites(prev => prev.filter(function(item) { return Number(item.id) !== Number(obj.id) }));
      } else {
        const { data } = await axios.post('https://62bdfd3bbac21839b60e840e.mockapi.io/favorites',
        obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch(error) {
      alert('Error!');
    }
  }

  const isItemAdded = (id) => {
      return cartItems.some(obj => Number(obj.id) === Number(id))
  };

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems }}>
      <Router>
        <div className="wrapper clear">
          {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={(obj) => onRemoveFromCart(obj)}/> }
          <Header onClickCart={() => setCartOpened(true)} />
          
          <Routes>
            <Route path="/" element={<Home items={items} cartItems={cartItems} searchValue={searchValue} onChangeSearchInput={onChangeSearchInput} setSearchValue={searchValue} onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite} isLoading={isLoading} />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;

import { useContext, useState } from "react";
import axios from 'axios';
import Info from "../Info";
import AppContext from "../../context";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({onClose, onRemove, items = []}) {

  const { cartItems, setCartItems } = useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('https://62bdfd3bbac21839b60e840e.mockapi.io/orders', {items: cartItems});
     
      setOrderId(data.id)
      setIsOrderComplete(true);
      setCartItems([]);

      for(let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://62bdfd3bbac21839b60e840e.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
      
    }
    catch {
      alert('Error!');
    }
    setIsLoading(false);
  }

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">Корзина <img className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Remove" onClick={onClose}/></h2>

        {
          items.length > 0 ? (
            <div className="d-flex flex-column flex">
              <div className="items">
                {items.map((obj, key) => (
                  <div className="cartItem d-flex align-center mb-20" key={key}>
                    <div style={{ backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg">
                    </div>
                    <div className="mr-20 flex">
                        <p className="mb-5">{obj.title}</p>
                        <b>{obj.price} руб.</b>
                      </div>
                      <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" onClick={() => onRemove(obj.id )}/>
                  </div>
                ))} 
              </div>
              <div className="cartTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Итого</span>
                  <div></div>
                  <b>21 498 руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} className="greenButton" onClick={onClickOrder}>Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
            </div>
          </div>
          ) : (
            <Info title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"} description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"} image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"} />
          )
        }
      </div>
    </div>
  );
}

export default Drawer;

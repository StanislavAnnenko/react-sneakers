import { useState } from 'react';
import styles from './Card.module.scss';

function Card({id, title, imageUrl, price, onPlus, onFavorite, favorited = false}) {

  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickPlus = () => {
      setIsAdded(!isAdded);
      onPlus({id, title, imageUrl, price});
  }

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite({id, title, imageUrl, price})
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'} alt="Unliked" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
          
          <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus" />
      </div>
    </div>
  );
};

export default Card;
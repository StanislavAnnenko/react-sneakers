import { Link } from 'react-router-dom';
function Header({onClickCart}) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="headerLeft d-flex align-center">
        <Link to="/">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
        </Link>
        <div className="headerInfo">
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className="d-flex align-center">
        <li className="mr-30 cu-p" onClick={onClickCart}>
          <img width={18} height={18} src="/img/cart.svg" alt="Корзина" />
          <span>1205 руб.</span>
        </li>
        <li>
          <Link to="/favorites">
            <img width={18} height={18} src="/img/heart.svg" alt="Закладки" />
          </Link>
        </li>
        <li>
          <img width={18} height={18} src="/img/user.svg" alt="Пользователь" />
        </li>
      </ul>
    </header>
  );
};

export default Header;
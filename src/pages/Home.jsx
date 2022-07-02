import Card from '../components/Card/Card';

function Home({items, searchValue, onChangeSearchInput, setSearchValue, onAddToCart, onAddToFavorite}) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input type="text" value={searchValue} placeholder="Поиск ..." onChange={onChangeSearchInput}/>
          {
            searchValue && 
            <img className="clear removeBtn cu-p" src="/img/btn-remove.svg" alt="Clear" onClick={()=>setSearchValue('')}/>
          }
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {items
          .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item, key) => {
            return <Card onPlus={(obj) => onAddToCart(obj)} onFavorite={(obj) => onAddToFavorite(obj)} key={key} {...item}/>
          })
        }
      </div>
    </div>
  );
}

export default Home;
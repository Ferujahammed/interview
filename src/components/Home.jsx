import { useContext } from "react";
import ProductItem from "./ProductItem";
import MyContext from "../context/MyContext";

function Home() {
  const {
    products,
    search,
    setSearch,
    call,
    setCall,
    sortedProducts,
    SetSortedProducts,
  } = useContext(MyContext);

  const handlePriceChange = (data) => {
    let res;
    if (data === "") res = products;
    if (data === "a") res = products.sort((a, b) => a.priceR - b.priceR);
    if (data === "d") res = products.sort((a, b) => b.priceR - a.priceR);
    SetSortedProducts(res);
    setCall(!call);
  };

  let allsizes = [];
  products?.map((product) => {
    return product.sizes?.map((size) => {
      allsizes.push(size);
      return true;
    });
  });
  console.log(allsizes);

  let sizes = allsizes.filter((item, index, array) => array.indexOf(item) === index);
  console.log(sizes);

  let nums = sizes
    .filter((number) => parseInt(number) === number * 1)
    .sort((a, b) => a - b);
  // console.log(nums);

  let letters = sizes.filter((item) => !nums.includes(item));
  // console.log(letters);

  const handleSizeChange = (data) => {
    let items = [];
    products?.filter((product) => {
      return product.sizes.map((size) => {
        if (data === size) {
          items.push(product);
          SetSortedProducts(items);
          setCall(!call);
        }
        if (data === "default") {
          SetSortedProducts(products);
          setCall(!call);
        }
        return items;
      });
    });
  };

  return (
    <div className="App">
      <div className="heading">
        <h1>Peek & Cloppenburg</h1>
      </div>
      <div className="search-sort">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => handleSizeChange(e.target.value)}>
          <option value="default">Search By Size (Number)</option>
          {nums.map((size, key) => {
            return (
              <option key={key} value={size}>
                {size}
              </option>
            );
          })}
        </select>
        <select onChange={(e) => handleSizeChange(e.target.value)}>
          <option value="default">Search By Size</option>
          {letters.map((size, key) => {
            return (
              <option key={key} value={size}>
                {size}
              </option>
            );
          })}
        </select>
        <select onChange={(e) => handlePriceChange(e.target.value)}>
          <option value="">Default</option>
          <option value="a">Price Low to High</option>
          <option value="d">Price High to Low</option>
        </select>
      </div>
      <div className="products">
        {sortedProducts
          ? sortedProducts
              .filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.brand.toLowerCase().includes(search.toLocaleLowerCase())
                ) {
                  return item;
                }
              })
              .map((item) => <ProductItem key={item.id} product={item} />)
          : products
              .filter((item) => {
                if (search === "") {
                  return item;
                }
                if (
                  item.brand.toLowerCase().includes(search.toLocaleLowerCase())
                ) {
                  return item;
                }
              })
              .map((item) => {
                return <ProductItem key={item.id} product={item} />;
              })}
      </div>
    </div>
  );
}

export default Home;

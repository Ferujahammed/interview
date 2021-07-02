import React from "react";
import Slider from "./Slider";

const ProductItem = ({ product }) => {
  return (
    <div className="product_card">
      <Slider data={product.images}></Slider>
      <div className="product_box">
        <h2 title={product.brand}>{product.brand}</h2>
        {product.priceR ? (
          <>
            <p>{product.priceR} €</p>
            <span>{product.priceO} €</span>
          </>
        ) : (
          <p>{product.priceO} €</p>
        )}
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductItem;

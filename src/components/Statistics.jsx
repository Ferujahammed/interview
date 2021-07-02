import React, { useContext } from "react";
import MyContext from "../context/MyContext";

const Statistics = () => {
  const { products } = useContext(MyContext);
  // console.log(products);

  /* which brand has the most products that cost less than 40 EUR */
  let price40s = products.filter((product) => product.priceO < 40);
  const brands = {};

  for (let i = 0; i < price40s.length; i++) {
    const current = price40s[i];
    if (brands[current.brand] === undefined) {
      brands[current.brand] = 1;
    } else {
      brands[current.brand]++;
    }
  }
  // console.log(brands);
  const brandFound = Math.max(...Object.values(brands));
  // console.log(brandFound);

  let brandName = "";
  for (const key in brands) {
    if (brands[key] === brandFound) {
      brandName = key;
    }
  }
  // console.log(brandName);

  /* which brand offers the largest selection of sizes to the customer */

  const productSizes = {};
  const brandSizes = {};

  products.forEach((product) => {
    let sizes = product.sizes.length;
    let brand = product.brand;
    if (productSizes[brand] === undefined) {
      productSizes[brand] = sizes;
      brandSizes[brand] = 1;
    } else {
      productSizes[brand] = productSizes[brand] + sizes;
      brandSizes[brand]++;
    }
  });
  for (let brand in productSizes) {
    productSizes[brand] = productSizes[brand] / brandSizes[brand];
  }
  const maxSizeOffered = Math.max(...Object.values(productSizes));
  let brandWithmaxSizes = "";
  for (const key in productSizes) {
    if (productSizes[key] === maxSizeOffered) {
      brandWithmaxSizes = key;
    }
  }
  // console.log(brandWithmaxSizes);

  /* which brand offers the lowest average price for customers wearing size “32” */
  const product32s = products.filter((product) => product.sizes.includes("32"));
  const productPrice = {};
  const productBrand = {};

  product32s.forEach(({ brand, priceO }) => {
    if (productPrice[brand] === undefined) {
      productPrice[brand] = priceO;
      productBrand[brand] = 1;
    } else {
      productPrice[brand] = productPrice[brand] + priceO;
      productBrand[brand]++;
    }
  });
  for (let brand in productPrice) {
    productPrice[brand] = productPrice[brand] / productBrand[brand];
  }
  let resultObject = { resultBrand: "", minPrice: Infinity };
  for (const brand in productPrice) {
    const price = productPrice[brand];
    if (price < resultObject.minPrice) {
      resultObject.minPrice = price;
      resultObject.resultBrand = brand;
    }
  }
  // console.log("resultObject", resultObject);

  return (
    <div className="App">
      <div className="heading">
        <h1>Peek & Cloppenburg</h1>
        <li>
          Brand <span style={{ fontWeight: "bold" }}>{brandName}</span> has the
          most products that cost less than 40 EUR.
        </li>
        <li>
          <span style={{ fontWeight: "bold" }}>{brandWithmaxSizes}</span> Brand
          offers the largest selection of sizes to the customer in average size
          of <span style={{ fontWeight: "bold" }}>{Math.ceil(maxSizeOffered)}</span>.
        </li>
        <li>
          Brand{" "}
          <span style={{ fontWeight: "bold" }}>{resultObject.resultBrand}</span>{" "}
          offers the lowest average price with{" "}
          <span style={{ fontWeight: "bold" }}>{resultObject.minPrice} € </span>{" "}
          for customers wearing size “32”.
        </li>
      </div>
    </div>
  );
};

export default Statistics;

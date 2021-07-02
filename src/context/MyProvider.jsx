import React, { useState, useEffect } from "react";
import MyContext from "./MyContext";
import axios from "axios";
const Myprovider = (props) => {
  const [call, setCall] = useState(false)
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    
    const [sortedProducts, SetSortedProducts] = useState()

    useEffect(() => {
        const getData = async () => {
          const response = await axios.get(
            "/fid-recruiting/fid-task-4-ffront-products.json", {headers: {"Access-Control-Allow-Origin": "https://frontend-gyjg597vc-ferujahammed.vercel.app"}}
          );
          setProducts((response.data).sort((a, b) => (a.brand > b.brand ? 1 : -1)))
        };
        getData();
      }, [call]);

  return (
    <MyContext.Provider
      value={{
        products, setProducts, search, setSearch, call, setCall, sortedProducts, SetSortedProducts
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default Myprovider;

import { createContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const MasterContext = createContext();

const MasterProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const products = collection(db, "products");
      const snapshot = await getDocs(products);
      const actualProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(actualProducts);
      setProducts(actualProducts);
    } catch (error) {
      console.log(error);
    }
    };


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <MasterContext.Provider value={{ products, fetchProducts }}>
      {children}
    </MasterContext.Provider>
  );
};

export default MasterProvider;

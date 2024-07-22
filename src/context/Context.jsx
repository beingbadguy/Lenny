import { createContext, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { InfinitySpin } from "react-loader-spinner";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const MasterContext = createContext();

const MasterProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const fetchUser = async (user) => {
    if (user) {
      const useRef = doc(db, "users", user.uid);
      const docRef = await getDoc(useRef);
      const tempUser = docRef.data();
      setUser(tempUser);
      localStorage.setItem("user", JSON.stringify(tempUser));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUser(user);
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

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

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    if (user) {
      // console.log(user);
    }
  }, []);

  return (
    <MasterContext.Provider
      value={{ products, fetchProducts, user, setUser, logout }}
    >
      {children}
    </MasterContext.Provider>
  );
};

export default MasterProvider;

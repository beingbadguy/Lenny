import { createContext, useEffect, useState } from "react";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { InfinitySpin } from "react-loader-spinner";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const MasterContext = createContext();

const MasterProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [fav, setFav] = useState([]);
  const [cart, setCart] = useState([]);
  // console.table(cart);
  const fetchUser = async (user) => {
    if (user) {
      const useRef = doc(db, "users", user.uid);
      const docRef = await getDoc(useRef);
      const tempUser = docRef.data();
      setUser(tempUser);
      setFav(tempUser.favourites);
      setCart(tempUser.carts);
      localStorage.setItem("user", JSON.stringify(tempUser));
    }
  };

  const addToFavourites = async (product) => {
    // console.log(product);
    if (!user) {
      // alert("Please sign in to add items to your favourites");

      return;
    }
    try {
      const collectionRef = doc(db, "users", user.userId);
      const userDoc = await getDoc(collectionRef);
      const userNew = userDoc.data();
      setFav(userNew.favourites);

      const response = fav.some((item) => item.id === product.id);
      console.log(response);
      if (response) {
        return;
      } else {
        await updateDoc(collectionRef, {
          favourites: arrayUnion(product),
        });
        setFav((prevFav) => [...prevFav, product]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addToCart = async (product) => {
    // console.log(product);
    if (!user) {
      // alert("Please sign in to add items to your cart");
      return;
    }
    try {
      const collectionRef = doc(db, "users", user.userId);
      const userDoc = await getDoc(collectionRef);
      const userNew = userDoc.data();
      setCart(userNew.carts);

      const response = cart.filter((item) => {
        item.name.includes(product.name);
      });
      console.log(response.length);

      if (response.length > 0) {
        console.log("already Exists in Cart");
      } else {
        await updateDoc(collectionRef, {
          carts: arrayUnion({ ...product }),
        });
        setCart((prevCart) => [...prevCart, product]);
        console.log(cart);
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
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
  }, []);

  return (
    <MasterContext.Provider
      value={{
        products,
        fetchProducts,
        user,
        setUser,
        logout,
        fav,
        setFav,
        addToFavourites,
        addToCart,
        cart,
      }}
    >
      {children}
    </MasterContext.Provider>
  );
};

export default MasterProvider;

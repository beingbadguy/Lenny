import { createContext, useEffect, useState } from "react";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const MasterContext = createContext();

const MasterProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [fav, setFav] = useState([]);
  const [cart, setCart] = useState([]);

  const [orderid, setOrderid] = useState(null);
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

  const deleteFromFav = async (product) => {
    if (!user) {
      alert("Please login first");
      return;
    }
    const collectionRef = doc(db, "users", user.userId);

    try {
      const snapshot = await getDoc(collectionRef);

      if (snapshot.exists()) {
        const userData = snapshot.data();
        const favourites = userData.favourites || [];

        const updatedFavourites = favourites.filter(
          (item) => item.id !== product.id
        );

        await updateDoc(collectionRef, {
          favourites: updatedFavourites,
        });

        setFav(updatedFavourites);

        console.log("Item successfully removed from Firestore and local state");
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addToCart = async (product) => {
    if (!user) {
      alert("Please sign in to add items to your cart");
      return;
    }
    try {
      const collectionRef = doc(db, "users", user.userId);
      const userDoc = await getDoc(collectionRef);

      if (userDoc.exists()) {
        const userNew = userDoc.data();
        const userCarts = userNew.carts || [];
        const response = userCarts.findIndex((item) => {
          return (
            item.name === product.name && item.location === product.location
          );
        });

        const thatProduct = products.find((item) => {
          return (
            item.name === product.name && item.location === product.location
          );
        });

        if (response === -1) {
          const newCart = [
            ...userCarts,
            {
              ...product,
              quantity: 1,
              itemtotalPrice: thatProduct.price * (thatProduct.quantity || 1),
            },
          ];
          await updateDoc(collectionRef, { carts: newCart });
          setCart(newCart);
        } else {
          const updatedCart = [...userCarts];
          updatedCart[response] = {
            ...updatedCart[response],
            quantity: updatedCart[response].quantity + 1,
            itemtotalPrice:
              thatProduct.price * (userCarts[response].quantity + 1),
          };

          await updateDoc(collectionRef, { carts: updatedCart });
          setCart(updatedCart);
        }
      }
      // console.log(cart);
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

  const cartRemove = async (product) => {
    // console.log(product);
    if (!user) {
      alert("Please login first");
      return;
    }

    const docRef = doc(db, "users", user.userId);
    try {
      const userDoc = await getDoc(docRef);
      if (!userDoc.exists()) {
        console.error("User document does not exist");
        return;
      }

      const userData = userDoc.data();
      const cartItems = userData.carts || [];

      const itemRemove = cartItems.find((item) => item.name === product.name);
      // console.log(itemRemove);

      if (itemRemove) {
        await updateDoc(docRef, {
          carts: arrayRemove(itemRemove),
        });

        setCart((prevCart) =>
          prevCart.filter((item) => item.name !== product.name)
        );
      }

      // console.log(cart);
    } catch (error) {
      console.log(error);
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
        setCart,
        deleteFromFav,
        cartRemove,
        orderid,
        setOrderid,
      }}
    >
      {children}
    </MasterContext.Provider>
  );
};

export default MasterProvider;

import React, { useContext, useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { db, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { MasterContext } from "../context/Context";

const Dashboard = () => {
  const { fetchProducts } = useContext(MasterContext);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    rating: "",
    location: "",
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  //   console.log(form);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const submitHandle = async (e) => {
    e.preventDefault();
    if (images.length === 0 || images.length > 3) {
      return setError("Please select at least 1 and no more than 3 images.");
    }
    if (
      form.name != "" &&
      form.price != "" &&
      form.category != "" &&
      form.description != "" &&
      form.rating != "" &&
      form.location != ""
    ) {
      try {
        setLoader(true);

        const uploadData = async (images) => {
          const promises = Array.from(images).map(async (image) => {
            const storageRef = ref(storage, `productImages/${image.name}`);
            return uploadBytes(storageRef, image).then(async (snapshot) => {
              return getDownloadURL(snapshot.ref);
            });
          });

          const downloadURLs = await Promise.all(promises);

          await addDoc(collection(db, "products"), {
            name: form.name,
            price: parseFloat(form.price),
            category: form.category,
            description: form.description,
            rating: parseInt(form.rating),
            location: form.location,
            images: downloadURLs,
          });
        };
        await uploadData(images);

        setForm({
          name: "",
          price: "",
          category: "",
          description: "",
          rating: "",
          location: "",
        });
        setImages([]);
        setError("Product added successfully!");
        setLoader(false);
        fetchProducts();
      } catch (error) {
        setLoader(false);

        setError(error.message);
      }
    } else {
      setLoader(false);
      setError("All the fields are required.");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-[65vh] flex items-center justify-center  ">
      <div className="w-[270px] md:w-full pt-10 pb-10">
        {error && <div className="text-red-500">{error}</div>}
        <form className="flex flex-col gap-3" onSubmit={submitHandle}>
          <div className="flex flex-col gap-2">
            <label>
              Images <span className="text-green-500">*</span>
            </label>
            <input
              type="file"
              onChange={(e) => {
                setImages(e.target.files);
              }}
              multiple
              accept="image/jpg, image/jpeg, image/png"
              className="border-black border rounded px-2 py-1 outline-green-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>
              Name <span className="text-green-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(e) => {
                changeHandler(e);
              }}
              className="border-black border rounded px-2 py-1 outline-green-500"
            />
          </div>

          <div className="flex flex-col">
            <label>
              Price <span className="text-green-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={(e) => {
                changeHandler(e);
              }}
              className="border-black border rounded px-2 py-1 outline-green-500"
              placeholder=""
            />
          </div>
          <div className="flex flex-col">
            <label>
              Category <span className="text-green-500">*</span>
            </label>
            <select
              id="product-category"
              name="category"
              value={form.category}
              onChange={(e) => {
                changeHandler(e);
              }}
              className="border-black border rounded px-2 py-1 outline-green-500"
            >
              <option value="fashion">Fashion</option>
              <option value="electronics">Electronics</option>
              <option value="home-kitchen">Home & Kitchen</option>
              <option value="beauty-health">Beauty & Health</option>
              <option value="sports-outdoors">Sports & Outdoors</option>
              <option value="toys-games">Toys & Games</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Automotive">Automotive</option>
              <option value="Office-Supplies">Office Supplies</option>
              <option value="Pet-Supplies">Pet Supplies</option>
              <option value="Groceries">Groceries</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label>
              Decription <span className="text-green-500">*</span>
            </label>
            <textarea
              type="text"
              name="description"
              value={form.description}
              onChange={(e) => {
                changeHandler(e);
              }}
              className="border-black border rounded px-2 py-1 outline-green-500"
              placeholder=""
            />
          </div>

          <div className="flex flex-col">
            <label>
              Rating <span className="text-green-500">*</span>
            </label>
            <input
              type="number"
              name="rating"
              value={form.rating}
              onChange={(e) => {
                changeHandler(e);
              }}
              className="border-black border rounded px-2 py-1 outline-green-500"
              placeholder=""
            />
          </div>

          <div className="flex flex-col">
            <label>
              Location <span className="text-green-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={(e) => {
                changeHandler(e);
              }}
              className="border-black border rounded px-2 py-1 outline-green-500"
              placeholder=""
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 px-2 py-2 text-white rounded font-bold flex items-center justify-center"
          >
            {loader ? (
              <InfinitySpin
                visible={true}
                width="50"
                height="50"
                color="white"
                ariaLabel="infinity-spin-loading"
              />
            ) : (
              "Upload Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;

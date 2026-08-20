import React, { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";

const AddItem = () => {
  const [images, setImages] = useState([null, null, null, null]);
 const { serverurl } = useContext(AuthContext);
  const handleAddProduct = async (e) => {
  e.preventDefault();

  if (images.some((image) => !image)) {
    alert("Please upload all 4 product images");
    return;
  }

  try {
    const Data = new FormData();

    Data.append("name", formData.name);
    Data.append("description", formData.description);
    Data.append("price", formData.price);
    Data.append("category", formData.category);
    Data.append("subcategory", formData.subcategory);
    Data.append("size", formData.size);
    Data.append("bestseller", formData.bestseller);

    images.forEach((image, index) => {
      Data.append(`image${index + 1}`, image);
    });

    const response = await axios.post(
      `${serverurl}/api/product/addproduct`,
      Data
    );

    if (response.status === 200 || response.status === 201) {
      alert("Product added successfully!");

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        subcategory: "",
        size: "",
        bestseller: false,
      });

      setImages([null, null, null, null]);
    }

  } catch (error) {
    console.error("Add product error:", error);
    console.error("Backend response:", error.response?.data);

    alert(
      error.response?.data?.message ||
      "Something went wrong while adding the product"
    );
  }
};

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    size: "",
    bestseller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (index, file) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };


  return (
    <div className="min-h-screen bg-[#f8f1e8] px-6 py-10 md:px-12 lg:px-20">

      {/* Heading */}
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[3px] text-gray-500">
          Admin Panel
        </p>

        <h1 className="mt-2 text-4xl font-semibold text-[#111]">
          Add Product
        </h1>

        <p className="mt-2 text-gray-600">
          Add a new product to your shopping store.
        </p>
      </div>

      <form
        onSubmit={handleAddProduct}
        className="max-w-6xl rounded-2xl bg-white p-6 shadow-sm md:p-10"
      >

        {/* Images */}
        <div className="mb-10">
          <h2 className="mb-5 text-xl font-semibold">
            Product Images
          </h2>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">

            {images.map((image, index) => (
              <label
                key={index}
                className="group flex aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-[#465c4a]"
              >

                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Product ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <div className="mb-3 text-4xl text-gray-400">
                      +
                    </div>

                    <span className="text-sm text-gray-500">
                      Image {index + 1}
                    </span>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(index, e.target.files[0])
                  }
                />
              </label>
            ))}

          </div>
        </div>

        {/* Product Information */}
        <div className="grid gap-8 md:grid-cols-2">

          {/* Product Name */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#465c4a]"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="5"
              required
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#465c4a]"
            />
          </div>

          {/* Price */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="₹ 0.00"
              min="0"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#465c4a]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#465c4a]"
            >
              <option value="">Select category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Subcategory
            </label>

            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#465c4a]"
            >
              <option value="">Select subcategory</option>
              <option value="T-Shirts">T-Shirts</option>
              <option value="Shirts">Shirts</option>
              <option value="Jeans">Jeans</option>
              <option value="Dresses">Dresses</option>
              <option value="Jackets">Jackets</option>
              <option value="Shoes">Shoes</option>
              <option value="Bags">Bags</option>
            </select>
          </div>

          {/* Size */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Size
            </label>

            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#465c4a]"
            >
              <option value="">Select size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
              <option value="Free Size">Free Size</option>
            </select>
          </div>

          {/* Bestseller */}
          <div className="flex items-center gap-3 md:col-span-2">
            <input
              type="checkbox"
              name="bestseller"
              checked={formData.bestseller}
              onChange={handleChange}
              className="h-5 w-5 accent-[#465c4a]"
            />

            <label className="text-sm font-medium">
              Add this product to Bestsellers
            </label>
          </div>

        </div>

        {/* Submit */}
        <div className="mt-10 flex justify-end">
          <button
            type="submit"
            className="rounded-full bg-[#465c4a] px-10 py-3 text-sm font-medium text-white transition hover:bg-[#35483a]"
          >
            Add Product
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddItem;
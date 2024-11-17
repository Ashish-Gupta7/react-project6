import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = () => {
  const [products, setproducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setproduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  const ChangeHandler = (e) => {
    setproduct((prevProduct) => ({
      ...prevProduct,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const pi = products.findIndex((p) => p.id == id);

    const copyData = [...products];
    copyData[pi] = { ...products[pi], ...product };

    setproducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData));
    toast.success("Product Updated Successfully");
    navigate(-1);
  };

  useEffect(() => {
    setproduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  return (
    <form
      onSubmit={handleFormSubmit}
      className="w-screen h-screen flex flex-col items-center"
    >
      <div className="w-[80%] ml-72 flex flex-col mt-24 gap-3">
        <h1 className="text-3xl font-semibold mb-3">Edit Product</h1>
        <input
          className="w-1/2 px-2 py-1 rounded font-semibold text-xl border border-zinc-700"
          type="text"
          placeholder="title"
          name="title"
          required
          minLength={6}
          maxLength={32}
          onChange={ChangeHandler}
          value={product && product.title}
        />
        <input
          className="w-1/2 px-2 py-1 rounded font-semibold text-xl border border-zinc-700"
          type="url"
          placeholder="image URL"
          name="image"
          required
          onChange={ChangeHandler}
          value={product && product.image}
        />
        <div className="w-1/2 flex items-center justify-between">
          <select
            className="w-[49%] px-2 py-1 rounded font-semibold text-xl border border-zinc-700"
            type="text"
            placeholder="category"
            name="category"
            required
            onChange={ChangeHandler}
            readOnly
            value={product && product.category}
          >
            <option className="bg-black text-white" value="">
              Select Category
            </option>
            <option value="electronics">Electronics</option>
            <option value="men's clothing">Men's clothing</option>
            <option value="women's clothing">Women's clothing</option>
            <option value="jewelery">Jewelery</option>
          </select>
          <input
            className="w-[49%] px-2 py-1 rounded font-semibold text-xl border border-zinc-700"
            type="number"
            placeholder="price"
            name="price"
            required
            min={20}
            max={500}
            onChange={ChangeHandler}
            value={product && product.price}
          />
        </div>
        <textarea
          rows={8}
          className="w-1/2 px-2 py-1 rounded font-semibold text-xl border border-zinc-700 resize-none"
          type="text"
          required
          minLength={20}
          maxLength={500}
          placeholder="description"
          onChange={ChangeHandler}
          value={product && product.description}
        />
        <input
          type="submit"
          value="Update Product"
          className="w-max px-6 py-2 bg-blue-500 cursor-pointer text-white rounded"
        />
      </div>

      <div className="mt-6">
        {product.title.trim().length < 6 && (
          <p className="text-red-500 text-xs mt-1">
            Title is too short. Minimum length is 6.
          </p>
        )}
        {product.title.trim().length > 32 && (
          <p className="text-red-500 text-xs mt-1">
            Title is too long. Maximum length is 32.
          </p>
        )}
        {product.description.trim().length < 20 && (
          <p className="text-red-500 text-xs mt-1">
            Description is too short. Minimum length is 20.
          </p>
        )}
        {product.description.trim().length > 500 && (
          <p className="text-red-500 text-xs mt-1">
            Description is too long. Maximum length is 500.
          </p>
        )}
      </div>
    </form>
  );
};

export default Edit;

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();

  const [products, setproducts] = useContext(ProductContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    const updatedData = { id: nanoid(), ...data };
    setproducts([...products, updatedData]);
    localStorage.setItem(
      "products",
      JSON.stringify([...products, updatedData])
    );
    toast.success("Product Created Successfully");
    reset();
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-screen h-screen flex flex-col items-center"
    >
      <div className="w-[80%] ml-72 flex flex-col mt-24 gap-3">
        <h1 className="text-3xl font-semibold mb-3">Add New Product</h1>
        <input
          {...register("title", {
            required: "Title is required.",
            minLength: {
              value: 6,
              message: "Minimum length of title is 6.",
            },
            maxLength: {
              value: 32,
              message: "Maximum length of title is 32.",
            },
          })}
          className="w-1/2 px-2 py-1 rounded font-semibold text-xl border border-zinc-700"
          type="text"
          placeholder="title"
        />
        <input
          {...register("image", {
            required: "Image URL is required.",
            pattern: {
              value:
                /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*.*$/i,
              message:
                "Please enter a valid image URL (jpg, jpeg, png, gif, webp)",
            },
          })}
          className="w-1/2 px-2 py-1 rounded font-semibold text-xl border border-zinc-700"
          type="url"
          placeholder="image URL"
        />
        <div className="w-1/2 flex items-center justify-between">
          <select
            {...register("category", {
              required: "category is required.",
            })}
            className="w-[49%] px-2 py-1 rounded font-semibold text-xl border border-zinc-700"
            placeholder="category"
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
            {...register("price", {
              required: "Price is required.",
              min: {
                value: 20,
                message: "Minimum price is 20 doller.",
              },
              max: {
                value: 500,
                message: "Maximum price is 500 doller.",
              },
            })}
            className="w-[49%] px-2 py-1 rounded font-semibold text-xl border border-zinc-700"
            type="number"
            placeholder="price"
          />
        </div>
        <textarea
          {...register("description", {
            required: "Description is required.",
            minLength: {
              value: 20,
              message: "Minimum length of name is 20.",
            },
            maxLength: {
              value: 500,
              message: "Maximum length of name is 500.",
            },
          })}
          rows={8}
          className="w-1/2 px-2 py-1 rounded font-semibold text-xl border border-zinc-700 resize-none"
          type="text"
          placeholder="description"
        />
        <input
          type="submit"
          value="Add New Product"
          className="w-max px-6 py-2 bg-blue-500 cursor-pointer text-white rounded"
        />
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="w-[60%] mt-8 flex flex-col gap-1">
          <h1 className="text-red-600 text-xl font-semibold">Errors: </h1>
          {errors.title && (
            <p className="w-1/2 px-2 py-1  bg-red-500 text-white">
              {errors.title.message}
            </p>
          )}
          {errors.image && (
            <p className="w-1/2 px-2 py-1  bg-red-500 text-white">
              {errors.image.message}
            </p>
          )}
          {errors.price && (
            <p className="w-1/2 px-2 py-1  bg-red-500 text-white">
              {errors.price.message}
            </p>
          )}
          {errors.description && (
            <p className="w-1/2 px-2 py-1  bg-red-500 text-white">
              {errors.description.message}
            </p>
          )}
          {errors.category && (
            <p className="w-1/2 px-2 py-1  bg-red-500 text-white">
              {errors.category.message}
            </p>
          )}
        </div>
      )}
    </form>
  );
};

export default Create;

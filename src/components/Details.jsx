import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";

const Details = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);

  const [product, setproduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!product) {
      setproduct(products.filter((p) => p.id == id)[0]);
    }
  }, []);

  const productDeleteHandler = (id) => {
    const filteredProducts = products.filter((p) => p.id !== id);
    setproducts(filteredProducts);
    localStorage.setItem("products", JSON.stringify(filteredProducts));
    toast.success("Product Deleted Successfully");
    navigate("/");
  };

  return product ? (
    <>
      <div className="w-[60%] h-full m-auto flex">
        <div className="flex items-center gap-16">
          <div className="h-80 w-96">
            <img
              className="w-full h-full object-contain"
              src={`${product.image}`}
              alt=""
            />
          </div>
          <div className="w-96 flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">{product.title}</h1>
            <h4 className="text-zinc-400">{product.category}</h4>
            <h4 className="text-red-500">$ {product.price}</h4>
            <h5>{product.description}</h5>
            <div className="flex items-center gap-3 mt-4">
              <Link
                to={`/edit/${product.id}`}
                className="px-3 py-1 border border-blue-300 text-blue-500"
              >
                Edit
              </Link>
              <button
                onClick={() => productDeleteHandler(product.id)}
                className="px-3 py-1 border border-red-300 text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Details;

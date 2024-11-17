import { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";

const Nav = () => {
  const [products] = useContext(ProductContext);

  let categories =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  categories = [...new Set(categories)];
  const getColor = () => {
    return `rgba(
    ${(Math.random() * 255).toFixed()}, 
    ${(Math.random() * 255).toFixed()},
    ${(Math.random() * 255).toFixed()}, 0.4)`;
  };

  return (
    <nav className="w-[15%] h-full bg-zinc-100 px-4 py-3">
      <div className="flex flex-col">
        <Link
          to="/create"
          className="w-max px-4 py-2 border border-blue-300 text-blue-500 font-semibold m-auto"
        >
          Add New Product
        </Link>
        <hr className="border border-zinc-300 mt-2" />
        <div className="mt-4">
          <h1 className="text-xl font-semibold mb-2">Category Filter</h1>
          <div className="flex flex-col gap-1">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={`/?category=${cat}`}
                className="flex items-center"
              >
                <div
                  style={{ backgroundColor: getColor() }}
                  className="w-4 h-4 bg-red-200 rounded-full"
                ></div>
                <h4 className="text-sm ml-2 tracking-wide font-medium capitalize">
                  {cat}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

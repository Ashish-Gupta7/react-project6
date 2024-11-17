import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";

const Home = () => {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);
  const [filteredProducts, setfilteredProducts] = useState(null);

  useEffect(() => {
    if (!filteredProducts || category == "undefined")
      setfilteredProducts(products);
    if (category != "undefined")
      setfilteredProducts(products.filter((p) => p.category == category));
  }, [category, products]);

  return products ? (
    <>
      <Nav />
      <div className="w-[85%] h-full overflow-x-hidden overflow-y-auto">
        <div className="p-6 pt-16 flex flex-wrap gap-4">
          {filteredProducts &&
            filteredProducts.map((product, index) => (
              <Link
                key={index}
                to={`/details/${product.id}`}
                className="w-56 flex flex-col items-center justify-center gap-2 shadow p-4"
              >
                <div className="w-24 h-32">
                  <img
                    className="w-full h-full object-contain hover:scale-110"
                    src={`${product.image}`}
                    alt=""
                  />
                </div>
                <h2 className="hover:text-blue-500">{product.title}</h2>
              </Link>
            ))}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;

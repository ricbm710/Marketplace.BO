//*dummy data
import { products } from "../assets/data";
//components
import ProductCard from "../components/UI/ProductCard";

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 mt-2 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    </>
  );
};

export default Home;

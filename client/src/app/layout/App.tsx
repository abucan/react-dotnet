import { useState } from "react";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  return (
    <>
      <Catalog />
      <h2>Client</h2>
    </>
  );
}

export default App;

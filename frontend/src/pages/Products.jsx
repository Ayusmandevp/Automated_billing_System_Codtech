import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add Product
  const addProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        {
          name,
          price,
          stock,
        }
      );

      setName("");
      setPrice("");
      setStock("");

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };
  const editProduct = (product) => {
  setEditingId(product._id);
  setName(product.name);
  setPrice(product.price);
  setStock(product.stock);
};
const updateProduct = async (e) => {
  e.preventDefault();

  try {
    await axios.put(
      `http://localhost:5000/api/products/${editingId}`,
      {
        name,
        price,
        stock,
      }
    );

    setEditingId(null);
    setName("");
    setPrice("");
    setStock("");

    fetchProducts();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📦 Product Management</h2>

      <div className="card p-4 shadow mb-4">
        <form onSubmit={addProduct}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />

          {editingId ? (
  <button
    className="btn btn-warning w-100"
    onClick={updateProduct}
  >
    Update Product
  </button>
) : (
  <button className="btn btn-success w-100">
    Add Product
  </button>
)}
        </form>
      </div>

      <div className="card p-3 shadow">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.stock}</td>

                <td>
                 <td>
  <button
    className="btn btn-primary btn-sm me-2"
    onClick={() => editProduct(product)}
  >
    Edit
  </button>

  <button
    className="btn btn-danger btn-sm"
    onClick={() => deleteProduct(product._id)}
  >
    Delete
  </button>
</td>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
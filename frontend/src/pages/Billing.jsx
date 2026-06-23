import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function Billing() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

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

 const addToCart = async () => {
  const product = products.find(
    (p) => p._id === selectedProduct
  );

  if (!product) {
    alert("Please select a product");
    return;
  }

  const item = {
    ...product,
    quantity,
    total: product.price * quantity,
  };

  setCart([...cart, item]);

  // Stock Update
  await axios.put(
    `http://localhost:5000/api/products/stock/${product._id}`,
    {
      quantity,
    }
  );

  fetchProducts();
};

  const grandTotal = cart.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Automated Billing System", 20, 20);

    doc.setFontSize(14);
    doc.text("Invoice", 20, 35);

    let y = 50;

    cart.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} | Qty: ${
          item.quantity
        } | Price: ₹${item.price} | Total: ₹${item.total}`,
        20,
        y
      );

      y += 10;
    });

    doc.text(
      `Grand Total: ₹${grandTotal}`,
      20,
      y + 15
    );

    doc.save("Invoice.pdf");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🧾 Billing System</h2>

      <div className="card p-4 shadow mb-4">
        <select
          className="form-control mb-3"
          value={selectedProduct}
          onChange={(e) =>
            setSelectedProduct(e.target.value)
          }
        >
          <option value="">
            Select Product
          </option>

          {products.map((product) => (
            <option
              key={product._id}
              value={product._id}
            >
              {product.name} - ₹{product.price}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) =>
            setQuantity(Number(e.target.value))
          }
        />

        <button
          className="btn btn-success"
          onClick={addToCart}
        >
          Add To Bill
        </button>
      </div>

      <div className="card p-3 shadow">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity}</td>
                <td>₹{item.total}</td>
              </tr>
            ))}

            {cart.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center"
                >
                  No Items Added
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <h3 className="mt-3">
          Grand Total: ₹{grandTotal}
        </h3>

        <div className="mt-3">
          <button
            className="btn btn-primary me-2"
            onClick={() => window.print()}
          >
            Print Invoice
          </button>

          <button
            className="btn btn-dark"
            onClick={downloadPDF}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default Billing;
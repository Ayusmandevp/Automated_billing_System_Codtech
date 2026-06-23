import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">📊 Automated Billing Dashboard</h1>

      <div className="row">

        <div className="col-md-4">
          <div className="card shadow p-4 mb-3">
            <h4>📦 Products</h4>
            <p>Manage your products</p>

            <Link
              to="/products"
              className="btn btn-primary"
            >
              Open Products
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-4 mb-3">
            <h4>🧾 Billing</h4>
            <p>Create customer bills</p>

            <Link
              to="/billing"
              className="btn btn-success"
            >
              Open Billing
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-4 mb-3">
            <h4>🚪 Logout</h4>
            <p>Exit account</p>

            <button
              className="btn btn-danger"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
import { formatCurrency } from "../utils/formatCurrency";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { pizzaCart } from "../utils/pizza.js";

const Navigation = () => {
  const total = pizzaCart.reduce(
  (sum, pizza) => sum + pizza.price * pizza.count,
  0
);
  return (
    <Navbar bg="dark" variant="dark">
      <Container className="justify-content-start">
        <Navbar.Brand className="h1 fw-bold mb-2"> Pizzería Mamma Mía!</Navbar.Brand>
        <Link to="/" className="text-white ms-3 text-decoration-none">Home</Link>
        <Link to="/login" className="text-white ms-3 text-decoration-none">Login</Link>
        <Link to="/register" className="text-white ms-3 text-decoration-none">Register</Link>
        <Link to="/cart" className="text-white ms-3 text-decoration-none">Cart</Link>
        <Link to="/profile" className="text-white ms-3 text-decoration-none">Profile</Link>
        <Link to="/pizza/p001" className="text-white ms-3 text-decoration-none">Pizza</Link>
        <Link to="/404" className="text-white ms-3 text-decoration-none">NotFound</Link>
        <Link to="/cart" className="btn btn-outline-info ms-3"> 🛒 Total: ${formatCurrency(total)}</Link>
      </Container>
    </Navbar>

  );
};

export default Navigation;
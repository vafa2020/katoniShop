import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartProvider";

const Navigation = () => {
  const { cart } = useCart();
  const Auth = useAuth();
  return (
    <header className="w-full h-20 bg-purple-200">
      <nav className="flex justify-center h-full">
        <div className="flex justify-between items-center w-full max-w-6xl">
          <ul className="h-full flex justify-center items-center">
            <li className="mr-2">
              <NavLink to="/" className="link">
                Ketone Store
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "link" + (isActive ? " activated" : "")
                }
                end
              >
                home
              </NavLink>
            </li>
          </ul>
          <ul className="h-full flex justify-center items-center">
            <li className="relative mr-4">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  "link" + (isActive ? " activated" : "")
                }
              >
                cart
              </NavLink>
              <div className="badge">{cart.length}</div>
            </li>
            <li>
              <NavLink
                to={Auth ? "/profile" : "/login"}
                className={({ isActive }) =>
                  "link" + (isActive ? " activated" : "")
                }
              >
                {Auth ? "profile" : "login/signup"}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;

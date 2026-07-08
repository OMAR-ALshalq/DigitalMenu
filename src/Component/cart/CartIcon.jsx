// import { useCart } from "../../context/CartContext";
// import { FiShoppingCart } from "react-icons/fi";
// import { useState } from "react";
// import CartSidebar from "./CartSidebar"; // ✅ استيراد المكون المنفصل

// export default function CartIcon() {
//   const { totalItems } = useCart();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <>
//       <div className="cart-icon-fixed" onClick={() => setSidebarOpen(true)}>
//         <FiShoppingCart className="cart-icon-svg" />
//         {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
//       </div>
//       <CartSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//     </>
//   );
// }

import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="cart-icon-fixed">
      <FiShoppingCart className="cart-icon-svg" />
      {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
    </Link>
  );
}
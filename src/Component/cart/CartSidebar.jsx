// import "./CartSidebar.css";
// import { useCart } from "../../context/CartContext";
// import { useState } from "react";
// import CheckoutModal from "./CheckoutModal";
// import useLockBodyScroll from "../../hooks/useLockBodyScroll";
// // Icon
// import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
// import { IoIosCloseCircle } from "react-icons/io";

// export default function CartSidebar({ isOpen, onClose }) {
//   const {
//     cartItems,
//     removeFromCart,
//     updateQuantity,
//     totalPrice,
//     toggleDescription
//   } = useCart();
//   const [checkoutOpen, setCheckoutOpen] = useState(false);
//   useLockBodyScroll(isOpen);
//   const cleanDesc = (text) => {
//     if (!text) return "";
//     // يزيل جميع الأحرف من بداية النص حتى يصل إلى أول حرف عربي أو إنجليزي
//     return text.replace(/^[^ء-يa-zA-Z]+/, "").trim();
//   };
//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="cart-overlay" onClick={onClose}></div>
//       <div className="cart-sidebar">
//         <div className="cart-header">
//           <h3>سلة الطلبات</h3>
//           <IoIosCloseCircle className="Close-Icon" onClick={onClose} />
//         </div>

//         <div className="cart-items">
//           {cartItems.length === 0 && <p className="empty-cart">السلة فارغة</p>}
//           {cartItems.map((item) => (
//             <div key={item.cartId} className="cart-item">
//               <div className="header-cart-item">
//                 <div className="column-one">
//                   <div className="box-img">
//                     <img
//                       src={item.image || "/placeholder.png"}
//                       alt={item.name}
//                       className="cart-item-img"
//                     />
//                   </div>
//                   <div className="box-name-pris">
//                     <h4>{item.name}</h4>
//                     <p dir="rtl">{item.price.toLocaleString()} ل.س</p>
//                   </div>
//                 </div>
//                 <div className="column-tow">
//                   <div className="box-icon-delete">
//                     <FiTrash2
//                       onClick={() => removeFromCart(item.cartId)}
//                       className="remove-item-btn"
//                     ></FiTrash2>
//                   </div>

//                   <div className="quantity-control">
//                     <button
//                       className="qty-btn"
//                       onClick={() =>
//                         updateQuantity(item.cartId, item.quantity - 1)
//                       }
//                       disabled={item.quantity <= 1}
//                     >
//                       <FiMinus />
//                     </button>
//                     <span className="quantity-value">{item.quantity}</span>
//                     <button
//                       className="qty-btn"
//                       onClick={() =>
//                         updateQuantity(item.cartId, item.quantity + 1)
//                       }
//                     >
//                       <FiPlus />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="cart-item-info">
//                 {/* المكونات كـ checkboxes */}
//                 {item.originalDescription &&
//                   item.originalDescription.length > 0 && (
//                     <div className="description-checkboxes">
//                       <p className="desc-title" dir="rtl">
//                         المكونات:
//                       </p>
//                       {item.originalDescription.map((desc, idx) => {
//                         const isChecked =
//                           !item.customizations.removedDescs.includes(desc);
//                         return (
//                           <label key={idx} className="checkbox-label">
//                             <input
//                               type="checkbox"
//                               checked={isChecked}
//                               onChange={() =>
//                                 toggleDescription(item.cartId, desc)
//                               }
//                             />
//                             <span>{cleanDesc(desc)}</span>
//                           </label>
//                         );
//                       })}
//                     </div>
//                   )}
//                 <p className="item-total">
//                   الإجمالي: {(item.price * item.quantity).toLocaleString()} ل.س
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {cartItems.length > 0 && (
//           <div className="cart-footer">
//             <p dir="rtl">
//               الإجمالي: <strong>{totalPrice.toLocaleString()} ل.س</strong>
//             </p>
//             <button
//               className="checkout-btn"
//               onClick={() => setCheckoutOpen(true)}
//             >
//               متابعة الطلب
//             </button>
//           </div>
//         )}
//       </div>

//       {checkoutOpen && <CheckoutModal onClose={() => setCheckoutOpen(false)} />}
//     </>
//   );
// }

import "./CartSidebar.css";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
// Icon
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";

export default function CartSidebar({ isOpen, onClose }) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
    toggleDescription
  } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  useLockBodyScroll(isOpen);

  const cleanDesc = (text) => {
    if (!text) return "";
    return text.replace(/^[^ء-يa-zA-Z]+/, "").trim();
  };

  // ✅ دالة مساعدة لاستخراج السعر الفعلي للعنصر
  const getItemPrice = (item) => item.selectedSize?.price || item.price || 0;

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose}></div>
      <div className="cart-sidebar">
        <div className="cart-header">
          <h3>سلة الطلبات</h3>
          <IoIosCloseCircle className="Close-Icon" onClick={onClose} />
        </div>

        <div className="cart-items">
          {cartItems.length === 0 && <p className="empty-cart">السلة فارغة</p>}
          {cartItems.map((item) => (
            <div key={item.cartId} className="cart-item">
              <div className="header-cart-item">
                <div className="column-one">
                  <div className="box-img">
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      className="cart-item-img"
                    />
                  </div>
                  <div className="box-name-pris">
                    <h4>{item.name}</h4>
                    {/* ✅ عرض الحجم المختار إن وجد */}
                    {item.selectedSize && (
                      <p className="selected-size" dir="rtl">
                        ({item.selectedSize.name})
                      </p>
                    )}
                    <p dir="rtl">{getItemPrice(item).toLocaleString()} ل.س</p>
                  </div>
                </div>
                <div className="column-tow">
                  <div className="box-icon-delete">
                    <FiTrash2
                      onClick={() => removeFromCart(item.cartId)}
                      className="remove-item-btn"
                    ></FiTrash2>
                  </div>

                  <div className="quantity-control">
                    <button
                      className="qty-btn"
                      onClick={() =>
                        updateQuantity(item.cartId, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() =>
                        updateQuantity(item.cartId, item.quantity + 1)
                      }
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
              </div>

              <div className="cart-item-info">
                {/* المكونات كـ checkboxes */}
                {item.originalDescription &&
                  item.originalDescription.length > 0 && (
                    <div className="description-checkboxes">
                      <p className="desc-title" dir="rtl">
                        المكونات:
                      </p>
                      {item.originalDescription.map((desc, idx) => {
                        const isChecked =
                          !item.customizations.removedDescs.includes(desc);
                        return (
                          <label key={idx} className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() =>
                                toggleDescription(item.cartId, desc)
                              }
                            />
                            <span>{cleanDesc(desc)}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                <p className="item-total">
                  الإجمالي:{" "}
                  {(getItemPrice(item) * item.quantity).toLocaleString()} ل.س
                </p>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <p dir="rtl">
              الإجمالي: <strong>{totalPrice.toLocaleString()} ل.س</strong>
            </p>
            <button
              className="checkout-btn"
              onClick={() => setCheckoutOpen(true)}
            >
              متابعة الطلب
            </button>
          </div>
        )}
      </div>

      {checkoutOpen && <CheckoutModal onClose={() => setCheckoutOpen(false)} />}
    </>
  );
}
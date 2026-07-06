// import "./CheckoutModal.css";
// import { useState } from "react";
// import { useCart } from "../../context/CartContext";
// import countryCodes from "./countryCodes";
// import axios from "axios";

// export default function CheckoutModal({ onClose }) {
//   const { cartItems, totalPrice, clearCart } = useCart();
//   const [orderType, setOrderType] = useState("internal");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [countryCode, setCountryCode] = useState("+963");
//   const [tableNumber, setTableNumber] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [successOrder, setSuccessOrder] = useState(null);
//   const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

//   const handleSubmit = async () => {
//     if (!name.trim()) return alert("يرجى إدخال الاسم");
//     if (orderType === "external" && !phone.trim())
//       return alert("يرجى إدخال رقم الهاتف");
//     if (orderType === "internal" && !tableNumber.trim())
//       return alert("يرجى إدخال رقم الطاولة");

//     const orderItems = cartItems.map((item) => ({
//       menuItem: item._id,
//       name: item.name,
//       price: item.price,
//       quantity: item.quantity,
//       description: item.description,
//       removedDescs: item.customizations?.removedDescs || []
//     }));

//     const orderData = {
//       type: orderType,
//       customerName: name.trim(),
//       customerPhone:
//         orderType === "external" ? `${countryCode}${phone.trim()}` : null,
//       tableNumber: orderType === "internal" ? tableNumber.trim() : null,
//       items: orderItems,
//       total: totalPrice
//     };

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/orders`,
//         orderData
//       );
//       setSuccessOrder(res.data.data);
//       clearCart();
//     } catch (error) {
//       alert(error.response?.data?.message || "حدث خطأ أثناء إرسال الطلب");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (successOrder) {
//     return (
//       <div className="modal-overlay">
//         <div className="checkout-modal">
//           <h3>تم الطلب بنجاح! 🎉</h3>
//           <p>
//             رقم الطلب: <strong>{successOrder.orderNumber}</strong>
//           </p>
//           <p>
//             الحالة:{" "}
//             {successOrder.status === "new"
//               ? "قيد المراجعة"
//               : successOrder.status}
//           </p>
//           <p>تتبع طلبك من خلال الرقم أعلاه</p>
//           <button onClick={onClose} className="btn-primary">
//             حسناً
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="modal-overlay">
//       <div className="checkout-modal">
//         <h3>إتمام الطلب</h3>

//         <div className="order-type-checkboxes">
//           <label
//             className={`type-option ${orderType === "internal" ? "selected" : ""}`}
//           >
//             <input
//               type="checkbox"
//               checked={orderType === "internal"}
//               onChange={() => setOrderType("internal")}
//             />
//             <span className="checkmark"></span>
//             <span className="type-text">داخلي</span>
//           </label>
//           <label
//             className={`type-option ${orderType === "takeaway" ? "selected" : ""}`}
//           >
//             <input
//               type="checkbox"
//               checked={orderType === "takeaway"}
//               onChange={() => setOrderType("takeaway")}
//             />
//             <span className="checkmark"></span>
//             <span className="type-text">سفري</span>
//           </label>
//           <label
//             className={`type-option ${orderType === "external" ? "selected" : ""}`}
//           >
//             <input
//               type="checkbox"
//               checked={orderType === "external"}
//               onChange={() => setOrderType("external")}
//             />
//             <span className="checkmark"></span>
//             <span className="type-text">استلام</span>
//           </label>
//         </div>

//         <div className="input-group">
//           <input
//             type="text"
//             placeholder="الاسم الكريم"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="input-field"
//             required
//           />
//         </div>

//         {orderType === "internal" && (
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="رقم الطاولة"
//               value={tableNumber}
//               onChange={(e) => setTableNumber(e.target.value)}
//               className="input-field"
//               required
//             />
//           </div>
//         )}

//         {orderType === "external" && (
//           <div className="phone-row">
//             {/* قائمة منسددة مخصصة بدلاً من select */}
//             <div className="custom-dropdown">
//               <button
//                 type="button"
//                 className="dropdown-button"
//                 onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
//               >
//                 <span>{countryCode}</span>
//                 <span className={`arrow ${countryDropdownOpen ? "open" : ""}`}>
//                   ▼
//                 </span>
//               </button>

//               {countryDropdownOpen && (
//                 <ul className="dropdown-options">
//                   {countryCodes.map((c) => (
//                     <li
//                       key={c.code}
//                       className={`dropdown-option ${countryCode === c.dial_code ? "active" : ""}`}
//                       onClick={() => {
//                         setCountryCode(c.dial_code);
//                         setCountryDropdownOpen(false);
//                       }}
//                     >
//                       <span className="dial-code">{c.dial_code}</span>
//                       <span className="country-name">{c.name}</span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//             <input
//               type="tel"
//               placeholder="رقم الهاتف"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="input-field"
//             />
//           </div>
//         )}

//         <div className="checkout-actions">
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="btn-primary"
//           >
//             {loading ? "جاري الإرسال..." : "تأكيد الطلب"}
//           </button>
//           <button onClick={onClose} className="btn-secondary">
//             رجوع
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import "./CheckoutModal.css";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import countryCodes from "./countryCodes";
import axios from "axios";

export default function CheckoutModal({ onClose }) {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [orderType, setOrderType] = useState("internal");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+963");
  const [tableNumber, setTableNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) return alert("يرجى إدخال الاسم");
    if (orderType === "external" && !phone.trim())
      return alert("يرجى إدخال رقم الهاتف");
    if (orderType === "internal" && !tableNumber.trim())
      return alert("يرجى إدخال رقم الطاولة");

    // ✅ تضمين الحجم المختار (إن وجد) مع السعر الصحيح
    const orderItems = cartItems.map((item) => ({
      menuItem: item._id,
      name: item.name,
      price: item.selectedSize?.price || item.price, // سعر الحجم أو السعر الأساسي
      quantity: item.quantity,
      description: item.description,
      removedDescs: item.customizations?.removedDescs || [],
      selectedSize: item.selectedSize || null // ✅ بيانات الحجم
    }));

    const orderData = {
      type: orderType,
      customerName: name.trim(),
      customerPhone:
        orderType === "external" ? `${countryCode}${phone.trim()}` : null,
      tableNumber: orderType === "internal" ? tableNumber.trim() : null,
      items: orderItems,
      total: totalPrice
    };

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        orderData
      );
      setSuccessOrder(res.data.data);
      clearCart();
    } catch (error) {
      alert(error.response?.data?.message || "حدث خطأ أثناء إرسال الطلب");
    } finally {
      setLoading(false);
    }
  };

  if (successOrder) {
    return (
      <div className="modal-overlay">
        <div className="checkout-modal">
          <h3>تم الطلب بنجاح! 🎉</h3>
          <p>
            رقم الطلب: <strong>{successOrder.orderNumber}</strong>
          </p>
          <p>
            الحالة:{" "}
            {successOrder.status === "new"
              ? "قيد المراجعة"
              : successOrder.status}
          </p>
          <p>تتبع طلبك من خلال الرقم أعلاه</p>
          <button onClick={onClose} className="btn-primary">
            حسناً
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="checkout-modal">
        <h3>إتمام الطلب</h3>

        <div className="order-type-checkboxes">
          <label
            className={`type-option ${orderType === "internal" ? "selected" : ""}`}
          >
            <input
              type="checkbox"
              checked={orderType === "internal"}
              onChange={() => setOrderType("internal")}
            />
            <span className="checkmark"></span>
            <span className="type-text">داخلي</span>
          </label>
          <label
            className={`type-option ${orderType === "takeaway" ? "selected" : ""}`}
          >
            <input
              type="checkbox"
              checked={orderType === "takeaway"}
              onChange={() => setOrderType("takeaway")}
            />
            <span className="checkmark"></span>
            <span className="type-text">سفري</span>
          </label>
          <label
            className={`type-option ${orderType === "external" ? "selected" : ""}`}
          >
            <input
              type="checkbox"
              checked={orderType === "external"}
              onChange={() => setOrderType("external")}
            />
            <span className="checkmark"></span>
            <span className="type-text">استلام</span>
          </label>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="الاسم الكريم"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />
        </div>

        {orderType === "internal" && (
          <div className="input-group">
            <input
              type="text"
              placeholder="رقم الطاولة"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="input-field"
              required
            />
          </div>
        )}

        {orderType === "external" && (
          <div className="phone-row">
            {/* قائمة منسددة مخصصة بدلاً من select */}
            <div className="custom-dropdown">
              <button
                type="button"
                className="dropdown-button"
                onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
              >
                <span>{countryCode}</span>
                <span className={`arrow ${countryDropdownOpen ? "open" : ""}`}>
                  ▼
                </span>
              </button>

              {countryDropdownOpen && (
                <ul className="dropdown-options">
                  {countryCodes.map((c) => (
                    <li
                      key={c.code}
                      className={`dropdown-option ${countryCode === c.dial_code ? "active" : ""}`}
                      onClick={() => {
                        setCountryCode(c.dial_code);
                        setCountryDropdownOpen(false);
                      }}
                    >
                      <span className="dial-code">{c.dial_code}</span>
                      <span className="country-name">{c.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <input
              type="tel"
              placeholder="رقم الهاتف"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field"
            />
          </div>
        )}

        <div className="checkout-actions">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? "جاري الإرسال..." : "تأكيد الطلب"}
          </button>
          <button onClick={onClose} className="btn-secondary">
            رجوع
          </button>
        </div>
      </div>
    </div>
  );
}
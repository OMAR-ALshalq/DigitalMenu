// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import "./TrackOrder.css";
// import useLockBodyScroll from "../../hooks/useLockBodyScroll";
// // Icon
// import { IoIosCloseCircle } from "react-icons/io";

// const statusMap = {
//   new: "قيد المراجعة",
//   preparing: "قيد التحضير",
//   ready: "جاهز",
//   completed: "مكتمل",
//   cancelled: "ملغي"
// };

// export default function TrackOrderModal({ isOpen, onClose }) {
//   const [orderNumber, setOrderNumber] = useState("");
//   const [order, setOrder] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const intervalRef = useRef(null); // لتخزين مؤشر التحديث الدوري

//   useLockBodyScroll(isOpen);

//   // دالة التحديث الصامت (بدون loading أو error للمستخدم)
//   const fetchOrderSilently = async (orderId) => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/orders/track/${orderId}`
//       );
//       // تحديث حالة الطلب فقط (أو أي تغيير آخر) دون التأثير على loading
//       setOrder((prev) => {
//         if (prev && prev.orderNumber === res.data.data.orderNumber) {
//           return { ...prev, status: res.data.data.status };
//         }
//         return prev;
//       });
//     } catch (err) {
//       // فشل صامت – لا نعرض شيئاً للمستخدم
//       console.warn("فشل التحديث الصامت لتتبع الطلب", err);
//     }
//   };

//   // بدء التحديث الدوري بعد نجاح البحث الأول
//   useEffect(() => {
//     if (order && orderNumber.trim() !== "") {
//       // إلغاء أي فاصل سابق
//       if (intervalRef.current) clearInterval(intervalRef.current);
//       // بدء فاصل جديد كل 2 ثانية
//       intervalRef.current = setInterval(() => {
//         fetchOrderSilently(orderNumber);
//       }, 2000);
//     }
//     // تنظيف الفاصل عند تغير order أو orderNumber أو إغلاق المودال
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//     };
//   }, [order, orderNumber, isOpen]);

//   const handleTrack = async () => {
//     if (!orderNumber.trim()) return;
//     // إلغاء أي تحديث دوري سابق
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//     setError("");
//     setOrder(null);
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/orders/track/${orderNumber}`
//       );
//       setOrder(res.data.data);
//     // eslint-disable-next-line no-unused-vars
//     } catch (err) {
//       setError("الطلب غير موجود أو رقم الطلب خطأ");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ عند الإغلاق: لا نمسح الحقول، فقط نوقف الفاصل الزمني
//   const handleClose = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay" onClick={handleClose}>
//       <div className="track-modal" onClick={(e) => e.stopPropagation()}>
//         <div className="headr-track-modal">
//           <IoIosCloseCircle className="Icon-close" onClick={handleClose} />
//           <h3>تتبع طلبك</h3>
//         </div>

//         <div className="track-input">
//           <input
//             type="number"
//             placeholder="أدخل رقم الطلب (مثال 1)"
//             value={orderNumber}
//             onChange={(e) => setOrderNumber(e.target.value)}
//             min="1"
//           />
//           <button onClick={handleTrack} disabled={loading}>
//             {loading ? "جاري..." : "بحث"}
//           </button>
//         </div>
//         {error && <p className="error-msg">{error}</p>}
//         {order && (
//           <div className="order-details">
//             <p>
//               الطلب: <strong>{order.orderNumber}</strong>
//             </p>
//             <p>
//               الحالة:{" "}
//               <span className="status-badge">{statusMap[order.status]}</span>
//             </p>
//             <p>الاسم: {order.customerName}</p>
//             {order.customerPhone && <p>الهاتف: {order.customerPhone}</p>}
//             <p>الإجمالي: {order.total.toLocaleString()} ل.س</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TrackOrder.css";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
// Icon
import { IoIosCloseCircle } from "react-icons/io";

const STORAGE_KEY = "trackOrderState"; // مفتاح التخزين

const statusMap = {
  new: "قيد المراجعة",
  preparing: "قيد التحضير",
  ready: "جاهز",
  completed: "مكتمل",
  cancelled: "ملغي"
};

// دوال مساعدة للتخزين والاسترجاع
const loadState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  // eslint-disable-next-line no-unused-vars
  } catch (e) {
    /* فشل صامت */
  }
  return null;
};

const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  // eslint-disable-next-line no-unused-vars
  } catch (e) {
    /* فشل صامت */
  }
};

export default function TrackOrderModal() {
  const navigate = useNavigate();
  const savedState = loadState();

  const [orderNumber, setOrderNumber] = useState(savedState?.orderNumber || "");
  const [order, setOrder] = useState(savedState?.order || null);
  const [error, setError] = useState(savedState?.error || "");
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef(null);

  useLockBodyScroll(true);

  // حفظ الحالة عند تغير أي من هذه القيم
  useEffect(() => {
    saveState({ orderNumber, order, error });
  }, [orderNumber, order, error]);

  // تنظيف التخزين عند العودة للرئيسية
  const handleClose = () => {
    // لا نمسح التخزين حتى يحتفظ بالقيم عند العودة
    navigate("/", { replace: true });
  };

  // دالة التحديث الصامت
  const fetchOrderSilently = async (orderId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/track/${orderId}`
      );
      setOrder((prev) => {
        if (prev && prev.orderNumber === res.data.data.orderNumber) {
          return { ...prev, status: res.data.data.status };
        }
        return prev;
      });
    } catch (err) {
      console.warn("فشل التحديث الصامت لتتبع الطلب", err);
    }
  };

  useEffect(() => {
    if (order && orderNumber.trim() !== "") {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        fetchOrderSilently(orderNumber);
      }, 2000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [order, orderNumber]);

  const handleTrack = async () => {
    if (!orderNumber.trim()) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setError("");
    setOrder(null);
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/track/${orderNumber}`
      );
      setOrder(res.data.data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("الطلب غير موجود أو رقم الطلب خطأ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="track-modal" onClick={(e) => e.stopPropagation()}>
        <div className="headr-track-modal">
          <IoIosCloseCircle className="Icon-close" onClick={handleClose} />
          <h3>تتبع طلبك</h3>
        </div>

        <div className="track-input">
          <input
            type="number"
            placeholder="أدخل رقم الطلب (مثال 1)"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            min="1"
          />
          <button onClick={handleTrack} disabled={loading}>
            {loading ? "جاري..." : "بحث"}
          </button>
        </div>
        {error && <p className="error-msg">{error}</p>}
        {order && (
          <div className="order-details">
            <p>
              الطلب: <strong>{order.orderNumber}</strong>
            </p>
            <p>
              الحالة:{" "}
              <span className="status-badge">{statusMap[order.status]}</span>
            </p>
            <p>الاسم: {order.customerName}</p>
            {order.customerPhone && <p>الهاتف: {order.customerPhone}</p>}
            <p>الإجمالي: {order.total.toLocaleString()} ل.س</p>
          </div>
        )}
      </div>
    </div>
  );
}
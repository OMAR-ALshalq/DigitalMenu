import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./TrackOrder.css";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
// Icon
import { IoIosCloseCircle } from "react-icons/io";

const statusMap = {
  new: "قيد المراجعة",
  preparing: "قيد التحضير",
  ready: "جاهز",
  completed: "مكتمل",
  cancelled: "ملغي"
};

export default function TrackOrderModal({ isOpen, onClose }) {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const intervalRef = useRef(null); // لتخزين مؤشر التحديث الدوري

  useLockBodyScroll(isOpen);

  // دالة التحديث الصامت (بدون loading أو error للمستخدم)
  const fetchOrderSilently = async (orderId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/track/${orderId}`
      );
      // تحديث حالة الطلب فقط (أو أي تغيير آخر) دون التأثير على loading
      setOrder((prev) => {
        if (prev && prev.orderNumber === res.data.data.orderNumber) {
          return { ...prev, status: res.data.data.status };
        }
        return prev;
      });
    } catch (err) {
      // فشل صامت – لا نعرض شيئاً للمستخدم
      console.warn("فشل التحديث الصامت لتتبع الطلب", err);
    }
  };

  // بدء التحديث الدوري بعد نجاح البحث الأول
  useEffect(() => {
    if (order && orderNumber.trim() !== "") {
      // إلغاء أي فاصل سابق
      if (intervalRef.current) clearInterval(intervalRef.current);
      // بدء فاصل جديد كل 2 ثانية
      intervalRef.current = setInterval(() => {
        fetchOrderSilently(orderNumber);
      }, 2000);
    }
    // تنظيف الفاصل عند تغير order أو orderNumber أو إغلاق المودال
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [order, orderNumber, isOpen]);

  const handleTrack = async () => {
    if (!orderNumber.trim()) return;
    // إلغاء أي تحديث دوري سابق
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

  // ✅ عند الإغلاق: لا نمسح الحقول، فقط نوقف الفاصل الزمني
  const handleClose = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    onClose();
  };

  if (!isOpen) return null;

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

import { useState } from "react";
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
  useLockBodyScroll(isOpen); 
  const handleTrack = async () => {
    if (!orderNumber.trim()) return;
    setError("");
    setOrder(null);
    setLoading(true);
    try {
      const res = await axios.get(
        `https://server-digitalmenu.onrender.com/api/orders/track/${orderNumber}`
      );
      setOrder(res.data.data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("الطلب غير موجود أو رقم الطلب خطأ");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="track-modal" onClick={(e) => e.stopPropagation()}>
        <div className="headr-track-modal">
          <IoIosCloseCircle
          className="Icon-close"
            onClick={onClose}
          ></IoIosCloseCircle>
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

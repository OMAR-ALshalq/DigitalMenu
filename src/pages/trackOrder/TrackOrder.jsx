import { useState } from "react";
import axios from "axios";
import "./TrackOrder.css"
const statusMap = {
  new: "قيد المراجعة",
  preparing: "قيد التحضير",
  ready: "جاهز",
  completed: "مكتمل",
  cancelled: "ملغي"
};

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    setError("");
    setOrder(null);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders/track/${orderNumber}`
      );
      setOrder(res.data.data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("الطلب غير موجود أو رقم الطلب خطأ");
    }
  };

  return (
    <div className="track-container">
      <h2>تتبع طلبك</h2>
      <div className="track-input">
        <input
          type="text"
          placeholder="أدخل رقم الطلب (مثال ORD-0001)"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />
        <button onClick={handleTrack}>بحث</button>
      </div>
      {error && <p className="error">{error}</p>}
      {order && (
        <div className="order-details">
          <p>
            الطلب: <strong>{order.orderNumber}</strong>
          </p>
          <p>
            الحالة: <strong>{statusMap[order.status]}</strong>
          </p>
          <p>الاسم: {order.customerName}</p>
          {order.customerPhone && <p>الهاتف: {order.customerPhone}</p>}
        </div>
      )}
    </div>
  );
}

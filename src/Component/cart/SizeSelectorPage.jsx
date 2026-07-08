import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import { FaTimes } from "react-icons/fa";
import "./SizeSelectorPage.css"; // سننشئه بعد قليل

export default function SizeSelectorPage() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { items, addToCart } = useOutletContext();

  // منع التمرير خلف الصفحة
  useLockBodyScroll(true);

  // البحث عن الصنف في البيانات المحملة
  const item = items.find((i) => i._id === itemId);

  const handleClose = () => {
    navigate(-1); // يرجع خطوة للخلف (يغلق الصفحة)
  };

  const handleSelectSize = (size) => {
    if (item) {
      addToCart(item, size);
      navigate(-1); // يغلق الصفحة بعد الإضافة
    }
  };

  if (!item) {
    return (
      <div className="size-modal-overlay" onClick={handleClose}>
        <div className="size-modal">
          <p>الصنف غير موجود</p>
          <button onClick={handleClose}>رجوع</button>
        </div>
      </div>
    );
  }

  return (
    <div className="size-modal-overlay" onClick={handleClose}>
      <div className="size-modal" onClick={(e) => e.stopPropagation()}>
        <div className="size-modal-header">
          <h4>اختر الحجم</h4>
          <button className="size-modal-close" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
        <p className="size-modal-item-name">{item.name}</p>
        <div className="size-options">
          {item.sizes.map((size, idx) => (
            <button
              key={idx}
              className="size-option-btn"
              onClick={() => handleSelectSize(size)}
            >
              <span className="size-name">{size.name}</span>
              <span className="size-price">
                {size.price.toLocaleString()} ل.س
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

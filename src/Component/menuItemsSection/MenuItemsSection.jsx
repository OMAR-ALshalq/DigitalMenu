// import "./MenuItemsSection.css";
// import { FaImage } from "react-icons/fa";
// import { useCart } from "../../context/CartContext"; // ✅ استيراد الكارت

// // Icon
// import { FaPlusSquare } from "react-icons/fa";

// export default function MenuItemsSection({
//   items,
//   categories,
//   selectedCategory,
//   searchQuery
// }) {
//   const { addToCart } = useCart(); // ✅ استخراج addToCart

//   // تجميع الأصناف حسب التصنيف
//   const groupedItems = () => {
//     let filteredItems = items;

//     // فلترة البحث
//     if (searchQuery && searchQuery.trim() !== "") {
//       const q = searchQuery.trim().toLowerCase();
//       filteredItems = items.filter((item) => {
//         const nameMatch = item.name && item.name.toLowerCase().includes(q);
//         const descMatch =
//           item.description &&
//           item.description.some((desc) => desc.toLowerCase().includes(q));
//         return nameMatch || descMatch;
//       });
//     }

//     if (filteredItems.length === 0) return [];

//     const groups = {};

//     if (selectedCategory) {
//       const cat = categories.find((c) => c._id === selectedCategory);
//       if (!cat) return [];
//       const catItems = filteredItems.filter(
//         (item) =>
//           item.category === selectedCategory ||
//           (item.category && item.category._id === selectedCategory)
//       );
//       return catItems.length > 0 ? [{ category: cat, items: catItems }] : [];
//     }

//     categories.forEach((cat) => {
//       const catItems = filteredItems.filter(
//         (item) =>
//           item.category === cat._id ||
//           (item.category && item.category._id === cat._id)
//       );
//       if (catItems.length > 0) {
//         groups[cat._id] = { category: cat, items: catItems };
//       }
//     });

//     return Object.values(groups).sort(
//       (a, b) => a.category.order - b.category.order
//     );
//   };

//   const groups = groupedItems();

//   return (
//     <div className="menu-items-section">
//       {searchQuery && searchQuery.trim() !== "" && (
//         <p className="search-result-info">
//           {groups.length === 0
//             ? "لا توجد نتائج للبحث"
//             : `نتائج البحث عن "${searchQuery}"`}
//         </p>
//       )}

//       {groups.length === 0 && searchQuery ? (
//         <p className="no-items">جرّب كلمة أخرى</p>
//       ) : groups.length === 0 && !searchQuery ? (
//         <p className="no-items">لا توجد أصناف بعد</p>
//       ) : (
//         groups.map((group) => (
//           <div key={group.category._id} className="category-group">
//             <div className="category-header">
//               <div className="category-header-img">
//                 <img
//                   src={group.category.image || "/placeholder.png"}
//                   alt={group.category.name}
//                 />
//               </div>
//               <h2 className="category-header-name">{group.category.name}</h2>
//             </div>

//             <div className="items-grid">
//               {group.items.map((item) => (
//                 <div key={item._id} className="item-card">
//                   <div className="item-card-img">
//                     {item.image ? (
//                       <img src={item.image} alt={item.name} />
//                     ) : (
//                       <div className="no-item-image">
//                         <FaImage />
//                         <span>لا صورة</span>
//                       </div>
//                     )}
//                   </div>
//                   <div className="item-card-body">
//                     <h4>{item.name}</h4>
//                     {item.description && item.description.length > 0 && (
//                       <p className="item-desc">
//                         {item.description.join(" _ ")}
//                       </p>
//                     )}
//                     <div className="item-price">
//                       <span> {item.price.toLocaleString()} ل.س</span>
//                       <FaPlusSquare
//                         className="add-to-cart-btn"
//                         onClick={() => addToCart(item)}
//                         title="أضف الى السلة"
//                       ></FaPlusSquare>
//                     </div>
//                     {/* ✅ زر الإضافة إلى السلة خارج item-price لكي لا يتأثر بتنسيق السعر */}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import "./MenuItemsSection.css";
import { FaImage } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

// Icon
import { FaPlusSquare, FaTimes } from "react-icons/fa";

export default function MenuItemsSection({
  items,
  categories,
  selectedCategory,
  searchQuery
}) {
  const { addToCart } = useCart();

  // ✅ حالة المودال الصغير لاختيار الحجم
  const [sizeModalItem, setSizeModalItem] = useState(null);

  // تجميع الأصناف حسب التصنيف
  const groupedItems = () => {
    let filteredItems = items;

    // فلترة البحث
    if (searchQuery && searchQuery.trim() !== "") {
      const q = searchQuery.trim().toLowerCase();
      filteredItems = items.filter((item) => {
        const nameMatch = item.name && item.name.toLowerCase().includes(q);
        const descMatch =
          item.description &&
          item.description.some((desc) => desc.toLowerCase().includes(q));
        return nameMatch || descMatch;
      });
    }

    if (filteredItems.length === 0) return [];

    const groups = {};

    if (selectedCategory) {
      const cat = categories.find((c) => c._id === selectedCategory);
      if (!cat) return [];
      const catItems = filteredItems.filter(
        (item) =>
          item.category === selectedCategory ||
          (item.category && item.category._id === selectedCategory)
      );
      return catItems.length > 0 ? [{ category: cat, items: catItems }] : [];
    }

    categories.forEach((cat) => {
      const catItems = filteredItems.filter(
        (item) =>
          item.category === cat._id ||
          (item.category && item.category._id === cat._id)
      );
      if (catItems.length > 0) {
        groups[cat._id] = { category: cat, items: catItems };
      }
    });

    return Object.values(groups).sort(
      (a, b) => a.category.order - b.category.order
    );
  };

  const groups = groupedItems();

  // ✅ دالة معالجة الضغط على زر الإضافة
  const handleAddToCart = (item) => {
    if (item.sizes && item.sizes.length > 0) {
      // فتح مودال اختيار الحجم
      setSizeModalItem(item);
    } else {
      // إضافة مباشرة بدون حجم
      addToCart(item);
    }
  };

  // ✅ دالة اختيار حجم معين والإضافة إلى السلة
  const handleSizeSelect = (size) => {
    if (sizeModalItem) {
      addToCart(sizeModalItem, size);
      setSizeModalItem(null);
    }
  };

  return (
    <div className="menu-items-section">
      {searchQuery && searchQuery.trim() !== "" && (
        <p className="search-result-info">
          {groups.length === 0
            ? "لا توجد نتائج للبحث"
            : `نتائج البحث عن "${searchQuery}"`}
        </p>
      )}

      {groups.length === 0 && searchQuery ? (
        <p className="no-items">جرّب كلمة أخرى</p>
      ) : groups.length === 0 && !searchQuery ? (
        <p className="no-items">لا توجد أصناف بعد</p>
      ) : (
        groups.map((group) => (
          <div key={group.category._id} className="category-group">
            <div className="category-header">
              <div className="category-header-img">
                <img
                  src={group.category.image || "/placeholder.png"}
                  alt={group.category.name}
                />
              </div>
              <h2 className="category-header-name">{group.category.name}</h2>
            </div>

            <div className="items-grid">
              {group.items.map((item) => (
                <div key={item._id} className="item-card">
                  <div className="item-card-img">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="no-item-image">
                        <FaImage />
                        <span>لا صورة</span>
                      </div>
                    )}
                  </div>
                  <div className="item-card-body">
                    <h4>{item.name}</h4>
                    {item.description && item.description.length > 0 && (
                      <p className="item-desc">
                        {item.description.join(" _ ")}
                      </p>
                    )}
                    <div className="item-price">
                      <span> {item.price.toLocaleString()} ل.س</span>
                      <FaPlusSquare
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(item)}
                        title="أضف الى السلة"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* ✅ مودال اختيار الحجم */}
      {sizeModalItem && (
        <div
          className="size-modal-overlay"
          onClick={() => setSizeModalItem(null)}
        >
          <div className="size-modal" onClick={(e) => e.stopPropagation()}>
            <div className="size-modal-header">
              <h4>اختر الحجم</h4>
              <button
                className="size-modal-close"
                onClick={() => setSizeModalItem(null)}
              >
                <FaTimes />
              </button>
            </div>
            <p className="size-modal-item-name">{sizeModalItem.name}</p>
            <div className="size-options">
              {sizeModalItem.sizes.map((size, idx) => (
                <button
                  key={idx}
                  className="size-option-btn"
                  onClick={() => handleSizeSelect(size)}
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
      )}
    </div>
  );
}
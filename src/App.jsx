// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css";
// import Hero from "./pages/hero/Hero";
// import CategoriesBar from "./Component/categoriesBar/CategoriesBar";
// import MenuItemsSection from "./Component/menuItemsSection/MenuItemsSection";
// import { CartProvider } from "./context/CartContext";
// import CartIcon from "./Component/cart/CartIcon";
// import CartSidebar from "./Component/cart/CartSidebar";
// import TrackOrderIcon from "./Component/cart/TrackOrderIcon";

// // ✅ سكيلتون لودرز
// import CategoriesBarSkeleton from "./Component/categoriesBar/CategoriesBarSkeleton";
// import MenuItemsSectionSkeleton from "./Component/menuItemsSection/MenuItemsSectionSkeleton";

// function App() {
//   const [categories, setCategories] = useState([]);
//   const [items, setItems] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [categoriesRes, itemsRes] = await Promise.all([
//           axios.get(`${import.meta.env.VITE_API_URL}/categories`),
//           axios.get(`${import.meta.env.VITE_API_URL}/items`)
//         ]);
//         setCategories(categoriesRes.data.data);
//         setItems(
//           itemsRes.data.data.filter((item) => item.isAvailable !== false)
//         );
//       } catch (err) {
//         console.error("فشل جلب البيانات", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSelectCategory = (categoryId) => setSelectedCategory(categoryId);
//   const handleSearch = (query) => setSearchQuery(query);

//   return (
//     <CartProvider>
//       <Hero onSearch={handleSearch} />
//       <CartIcon />
//       <TrackOrderIcon />

//       {loading ? (
//         <>
//           <div className="Box">
//             <CategoriesBarSkeleton />
//           </div>
//           <MenuItemsSectionSkeleton />
//         </>
//       ) : (
//         <>
//           <div className="Box">
//             <CategoriesBar
//               categories={categories}
//               selectedCategory={selectedCategory}
//               onSelectCategory={handleSelectCategory}
//             />
//           </div>
//           <MenuItemsSection
//             items={items}
//             categories={categories}
//             selectedCategory={selectedCategory}
//             searchQuery={searchQuery}
//           />
//         </>
//       )}
//       <CartSidebar />
//     </CartProvider>
//   );
// }

// export default App;
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Hero from "./pages/hero/Hero";
import CategoriesBar from "./Component/categoriesBar/CategoriesBar";
import MenuItemsSection from "./Component/menuItemsSection/MenuItemsSection";
import { CartProvider, useCart } from "./context/CartContext";
import CartIcon from "./Component/cart/CartIcon";
import CartSidebar from "./Component/cart/CartSidebar";
import CheckoutModal from "./Component/cart/CheckoutModal";
import TrackOrderModal from "./Component/cart/TrackOrderModal";
import TrackOrderIcon from "./Component/cart/TrackOrderIcon";
import SizeSelectorPage from "./Component/cart/SizeSelectorPage"; // ✅ سننشئه

// سكيلتون لودرز
import CategoriesBarSkeleton from "./Component/categoriesBar/CategoriesBarSkeleton";
import MenuItemsSectionSkeleton from "./Component/menuItemsSection/MenuItemsSectionSkeleton";

function MainLayout() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart(); // ✅ نحتاجه لتمريره للمودال

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, itemsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/categories`),
          axios.get(`${import.meta.env.VITE_API_URL}/items`)
        ]);
        setCategories(categoriesRes.data.data);
        setItems(
          itemsRes.data.data.filter((item) => item.isAvailable !== false)
        );
      } catch (err) {
        console.error("فشل جلب البيانات", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelectCategory = (categoryId) => setSelectedCategory(categoryId);
  const handleSearch = (query) => setSearchQuery(query);

  return (
    <>
      <Hero onSearch={handleSearch} />
      <CartIcon />
      <TrackOrderIcon />

      {loading ? (
        <>
          <div className="Box">
            <CategoriesBarSkeleton />
          </div>
          <MenuItemsSectionSkeleton />
        </>
      ) : (
        <>
          <div className="Box">
            <CategoriesBar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>
          <MenuItemsSection
            items={items}
            categories={categories}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
          />
        </>
      )}
      {/* ✅ نمرر items و addToCart إلى المسارات الفرعية */}
      <Outlet context={{ items, addToCart }} />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="cart" element={<CartSidebar />} />
            <Route path="cart/checkout" element={<CheckoutModal />} />
            <Route path="track-order" element={<TrackOrderModal />} />
            {/* ✅ مسار اختيار الحجم الجديد */}
            <Route path="select-size/:itemId" element={<SizeSelectorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
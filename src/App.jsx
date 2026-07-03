import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Hero from "./pages/hero/Hero";
import CategoriesBar from "./Component/categoriesBar/CategoriesBar";
import MenuItemsSection from "./Component/menuItemsSection/MenuItemsSection";
import { CartProvider } from "./context/CartContext";
import CartIcon from "./Component/cart/CartIcon";
import CartSidebar from "./Component/cart/CartSidebar";
import TrackOrderIcon from "./Component/cart/TrackOrderIcon";

// ✅ سكيلتون لودرز
import CategoriesBarSkeleton from "./Component/categoriesBar/CategoriesBarSkeleton";
import MenuItemsSectionSkeleton from "./Component/menuItemsSection/MenuItemsSectionSkeleton";

function App() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, itemsRes] = await Promise.all([
          axios.get("https://server-digitalmenu.onrender.com/api/categories"),
          axios.get("https://server-digitalmenu.onrender.com/api/items")
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
    <CartProvider>
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
      <CartSidebar />
    </CartProvider>
  );
}

export default App;

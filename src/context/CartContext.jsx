import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

// ✅ دالة مساعدة لتحميل السلة من localStorage
const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem("cart");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error("خطأ في قراءة السلة من التخزين", e);
  }
  return [];
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCartFromStorage());

  // ✅ حفظ السلة في localStorage عند كل تغيير
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const cartItem = {
        ...item,
        cartId: Date.now() + Math.random(),
        quantity: 1,
        originalDescription: item.description ? [...item.description] : [],
        customizations: {
          removedDescs: []
        }
      };
      return [...prev, cartItem];
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => {
    localStorage.removeItem("cart"); // ✅ مسح التخزين مع السلة
    setCartItems([]);
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleDescription = (cartId, descText) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartId !== cartId) return item;
        const isRemoved = item.customizations.removedDescs.includes(descText);
        let newRemovedDescs;
        let newDescription;
        if (isRemoved) {
          newRemovedDescs = item.customizations.removedDescs.filter(
            (d) => d !== descText
          );
          newDescription = item.originalDescription.filter(
            (d) => !newRemovedDescs.includes(d)
          );
        } else {
          newRemovedDescs = [...item.customizations.removedDescs, descText];
          newDescription = item.originalDescription.filter(
            (d) => !newRemovedDescs.includes(d)
          );
        }
        return {
          ...item,
          description: newDescription,
          customizations: {
            ...item.customizations,
            removedDescs: newRemovedDescs
          }
        };
      })
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        totalItems,
        totalPrice,
        toggleDescription
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

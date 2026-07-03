import "./CategoriesBar.css";

export default function CategoriesBar({
  categories,
  selectedCategory,
  onSelectCategory
}) {
  return (
    <div className="categories-bar">
      <div className="categories-list">
        {/* زر "الكل" */}
        <div
          className={`category-item ${selectedCategory === null ? "active" : ""}`}
          onClick={() => onSelectCategory(null)}
        >
          <div className="category-img all-img">🍽️</div>
          <span className="category-name">الكل</span>
        </div>

        {categories.map((cat) => (
          <div
            key={cat._id}
            className={`category-item ${selectedCategory === cat._id ? "active" : ""}`}
            onClick={() => onSelectCategory(cat._id)}
          >
            <div className="category-img">
              <img src={cat.image || "/placeholder.png"} alt={cat.name} />
            </div>
            <span className="category-name">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

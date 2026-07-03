import "./CategoriesBar.css"; // نستخدم نفس التنسيقات
import "../Skeleton.css"; // تأثير النبض

export default function CategoriesBarSkeleton() {
  return (
    <div className="categories-bar">
      <div className="categories-list">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="category-item skeleton">
            <div className="category-img skeleton-circle"></div>
            <span className="category-name skeleton-text"></span>
          </div>
        ))}
      </div>
    </div>
  );
}

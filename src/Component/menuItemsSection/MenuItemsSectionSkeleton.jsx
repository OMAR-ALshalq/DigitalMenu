import "./MenuItemsSection.css";
import "../Skeleton.css"; // تأثير النبض

function SkeletonGroupHeader() {
  return (
    <div className="category-header">
      <div className="category-header-img skeleton-circle"></div>
      <div className="category-header-name skeleton-text skeleton-text-large"></div>
    </div>
  );
}

function SkeletonItemCard() {
  return (
    <div className="item-card skeleton">
      <div className="item-card-img skeleton-rect"></div>
      <div className="item-card-body">
        <div className="skeleton-text skeleton-text-medium"></div>
        <div className="skeleton-text skeleton-text-small"></div>
        <div className="item-price">
          <span className="skeleton-text skeleton-text-price"></span>
          <span className="skeleton-text skeleton-text-icon"></span>
        </div>
      </div>
    </div>
  );
}

export default function MenuItemsSectionSkeleton() {
  return (
    <div className="menu-items-section">
      {Array.from({ length: 3 }).map((_, groupIdx) => (
        <div key={groupIdx} className="category-group">
          <SkeletonGroupHeader />
          <div className="items-grid">
            {Array.from({ length: 4 }).map((_, itemIdx) => (
              <SkeletonItemCard key={itemIdx} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// import { useState } from "react";
// import { FiMapPin } from "react-icons/fi"; // أيقونة مناسبة للتتبع
// import TrackOrderModal from "./TrackOrderModal";
// import "./TrackOrderIcon.css";

// export default function TrackOrderIcon() {
//   const [modalOpen, setModalOpen] = useState(false);

//   return (
//     <>
//       <div className="track-icon-fixed" onClick={() => setModalOpen(true)}>
//         <FiMapPin className="track-icon-svg" />
//       </div>
//       <TrackOrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
//     </>
//   );
// }

import { Link } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import "./TrackOrderIcon.css";

export default function TrackOrderIcon() {
  return (
    <Link to="/track-order" className="track-icon-fixed">
      <FiMapPin className="track-icon-svg" />
    </Link>
  );
}
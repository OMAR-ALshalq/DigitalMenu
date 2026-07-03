import { useState } from "react";
import "./Hero.css";

// icons ...
import { MdWhatsapp } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { LiaSearchSolid } from "react-icons/lia";

export default function Hero({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    onSearch(val); // ✅ يرسل النص إلى App
  };

  return (
    <div className="Main-box-Hero">
      <div className="box-Logo">
        <img src="/Imag/أيس كريم بالورد.jpg" alt="شعار" />
      </div>
      <div className="box-title">
        <h3>DigitalMenu</h3>
        <p>خيارك الافضل لنقل مطعمك الى عالم الانترنت</p>
      </div>
      <div className="box-SocialMedia">
        <a href="">
          <FaFacebook className="Icon-SocialMedia" />
        </a>
        <a href="">
          <MdWhatsapp className="Icon-SocialMedia" />
        </a>
        <a href="">
          <AiFillInstagram className="Icon-SocialMedia" />
        </a>
        <a href="">
          <FaLocationDot className="Icon-SocialMedia" />
        </a>
        <a href="">
          <IoCall className="Icon-SocialMedia" />
        </a>
      </div>
      <div className="box-Search">
        <div className="box-search-icon">
          <input
            type="text"
            placeholder="ابحث الان"
            value={inputValue}
            onChange={handleInputChange}
          />
          <LiaSearchSolid className="Icon-search" />
        </div>
      </div>
    </div>
  );
}

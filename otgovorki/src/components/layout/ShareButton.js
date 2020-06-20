import React, { useState } from "react";
import { MdShare } from "react-icons/md";
import SharePopup from "./SharePopup";

const ShareButton = (props) => {
  const [isPopupShown, setIsPopupShown] = useState(false);

  const shareData = {
    url: props.url,
    title: props.title,
    text: props.text,
  };

  const share = () => {
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      console.log("cant share!");
      setIsPopupShown(true);
    }
  };

  const cancelShare = () => {
    setIsPopupShown(false);
  };

  return (
    <div
      role="button"
      tabIndex="0"
      onFocus={share}
      onBlur={cancelShare}
      className="custom-btn custom-btn-outline btn-div"
      variant="outline-secondary"
      title="Поделиться"
    >
      <MdShare />
      {isPopupShown && <SharePopup shareData={shareData} />}
    </div>
  );
};

export default ShareButton;

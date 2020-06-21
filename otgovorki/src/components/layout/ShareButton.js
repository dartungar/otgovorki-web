import React, { Fragment, useState } from "react";
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
    if (isPopupShown) {
      setIsPopupShown(false);
    }
  };

  return (
    <div
      role="button"
      tabIndex="0"
      onFocus={share}
      onBlur={cancelShare}
      title="Поделиться"
      className={
        props.isSmall
          ? "share-btn-small"
          : "custom-btn custom-btn-outline btn-div"
      }
    >
      <MdShare />
      {isPopupShown && (
        <SharePopup shareData={shareData} isSmall={props.isSmall} />
      )}
    </div>
  );
};

export default ShareButton;

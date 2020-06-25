import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { MdShare } from "react-icons/md";
import SharePopup from "./SharePopup";

const ShareButton = ({ url, title, text, isSmall }) => {
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [showNativeShare, setShowNativeShare] = useState(true);

  const shareData = {
    url: url,
    title: title,
    text: text,
  };

  // share
  const share = () => {
    // if native share abailable & user did not cancel share - show native share
    if (navigator.share && showNativeShare) {
      navigator.share(shareData).catch(setShowNativeShare(false)); // catch native share promise rejection
      // else show custom share popup
    } else if (!navigator.share) {
      console.log("cant share!");
      setIsPopupShown(true);
    }
  };

  // hide custom share popup, if it is shown
  const cancelShare = () => {
    if (isPopupShown) {
      setIsPopupShown(false);
    }
  };

  // props.isSmall determines style of share button
  // big for Generator page, small for Ranking
  return (
    <div
      role="button"
      tabIndex="0"
      onFocus={share}
      onBlur={cancelShare}
      title="Поделиться"
      className={
        isSmall ? "share-btn-small" : "custom-btn custom-btn-outline btn-div"
      }
    >
      <MdShare />
      {isPopupShown && <SharePopup shareData={shareData} isSmall={isSmall} />}
    </div>
  );
};

ShareButton.propTypes = {
  isSmall: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ShareButton;

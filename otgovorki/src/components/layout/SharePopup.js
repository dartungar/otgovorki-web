import React from "react";
import PropTypes from "prop-types";
import {
  TwitterShareButton,
  FacebookShareButton,
  VKShareButton,
  TelegramShareButton,
} from "react-share";
import {
  FaTwitter,
  FaFacebookSquare,
  FaVk,
  FaTelegramPlane,
} from "react-icons/fa";

const SharePopup = ({ isSmall, shareData }) => {
  // prevent popup from losing focus when popup is clicked
  const preventBlur = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={
        isSmall ? "share-popup-container-small" : "share-popup-container"
      }
      onMouseDown={preventBlur}
    >
      <TwitterShareButton
        url={shareData.url}
        title={shareData.text}
        className={
          isSmall ? "share-popup-element-small" : "share-popup-element"
        }
      >
        <FaTwitter title="Твитнуть" />
      </TwitterShareButton>
      <FacebookShareButton
        url={shareData.url}
        quote={shareData.text}
        className={
          isSmall ? "share-popup-element-small" : "share-popup-element"
        }
      >
        <FaFacebookSquare title="Отправить в Facebook" />
      </FacebookShareButton>
      <VKShareButton
        url={shareData.url}
        title={shareData.text}
        className={
          isSmall ? "share-popup-element-small" : "share-popup-element"
        }
      >
        <FaVk title="Отправить в VK" />
      </VKShareButton>
      <TelegramShareButton
        url={shareData.url}
        title={shareData.text}
        className={
          isSmall ? "share-popup-element-small" : "share-popup-element"
        }
      >
        <FaTelegramPlane title="Отправить в Telegram" />
      </TelegramShareButton>
    </div>
  );
};

SharePopup.propTypes = {
  isSmall: PropTypes.bool.isRequired,
  shareData: PropTypes.object.isRequired,
};

export default SharePopup;

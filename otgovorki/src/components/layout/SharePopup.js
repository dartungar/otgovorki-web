import React from "react";
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

const SharePopup = (props) => {
  // prevent popup from losing focus when popup is clicked
  const preventBlur = (e) => {
    e.preventDefault();
  };

  return (
    <div className="share-popup-container" onMouseDown={preventBlur}>
      <TwitterShareButton
        url={props.shareData.url}
        title={props.shareData.text}
        className="share-popup-element"
      >
        <FaTwitter title="Твитнуть" />
      </TwitterShareButton>
      <FacebookShareButton
        url={props.shareData.url}
        quote={props.shareData.text}
        className="share-popup-element"
      >
        <FaFacebookSquare title="Отправить в Facebook" />
      </FacebookShareButton>
      <VKShareButton
        url={props.shareData.url}
        title={props.shareData.text}
        className="share-popup-element"
      >
        <FaVk title="Отправить в VK" />
      </VKShareButton>
      <TelegramShareButton
        url={props.shareData.url}
        title={props.shareData.text}
        className="share-popup-element"
      >
        <FaTelegramPlane title="Отправить в Telegram" />
      </TelegramShareButton>
    </div>
  );
};

export default SharePopup;

import React, { Fragment, useState } from "react";
import { RiArrowUpCircleLine } from "react-icons/ri";

const ScrollToTopBtn = () => {
  const [showScrollToTopBtn, setShowScrollToTopBtn] = useState(false);

  // check if we should show the button
  const checkShowScrollBtn = () => {
    // if user scrolled a bit, show him the button
    if (!showScrollToTopBtn && window.pageYOffset > 400) {
      setShowScrollToTopBtn(true);
      // else hide it
    } else if (showScrollToTopBtn && window.pageYOffset <= 400) {
      setShowScrollToTopBtn(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkShowScrollBtn);

  return (
    <Fragment>
      {showScrollToTopBtn && (
        <RiArrowUpCircleLine
          className="scroll-to-top-btn"
          onClick={scrollToTop}
          title="Наверх"
        />
      )}
    </Fragment>
  );
};

export default ScrollToTopBtn;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { FaRedoAlt } from "react-icons/fa";

const SubmitMessage = ({ isSubmitSuccessful }) => {
  const [buttonTitle, setButtonTitle] = useState();

  // change button's hover text according to submit's result
  useEffect(() => {
    if (isSubmitSuccessful) {
      setButtonTitle("Предложить ещё");
    } else {
      setButtonTitle("Попробовать ещё раз");
    }
  }, [isSubmitSuccessful]);

  // guess what this does
  function handleRefreshButtonClick() {
    window.location.reload();
  }

  return (
    <div>
      {isSubmitSuccessful ? (
        <p className="submit-success-message">
          Получили вашу отговорку. Спасибо!
        </p>
      ) : (
        <p className="submit-error-message">
          Отговорка не дошла :( <br /> Попробуйте ещё раз!
        </p>
      )}
      <Button
        className="custom-btn custom-btn-filled"
        variant="dark"
        onClick={handleRefreshButtonClick}
        title={buttonTitle}
      >
        <FaRedoAlt />
      </Button>
    </div>
  );
};

SubmitMessage.propTypes = {
  isSubmitSuccessful: PropTypes.object.isRequired,
};

export default SubmitMessage;

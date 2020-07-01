import React from "react";
import { FaTelegramPlane, FaEnvelope } from "react-icons/fa";

const Feedback = () => {
  return (
    <div className="container-narrow">
      <h4 style={{ marginBottom: "25px" }}>Обратная связь</h4>
      <p>Есть идеи, предложения, советы? Пишите:</p>
      <p>
        <FaTelegramPlane />{" "}
        <a className="custom-link" href="https://t.me/dartungar">
          @dartungar
        </a>
      </p>
      <p title="адрес покалечен, чтобы его не собрали в базу данных спамеры">
        <FaEnvelope /> dartungar 🐶 gmail ⚫ com
      </p>
    </div>
  );
};

export default Feedback;

import React from "react";

const About = () => {
  return (
    <div className="container-narrow">
      <h4 style={{ marginBottom: "25px" }}>О проекте</h4>
      <p className="justified">
        В 2019 году я разработал простого telegram-бота (
        <a className="custom-link" href="https://t.me/otgovorki_bot">
          @otgovorki_bot
        </a>
        ). Бот генерировал отговорки на разные темы. Людям понравилось, и я
        развил идею. Теперь можно голосовать, предлагать свои отговорки, есть
        топ.
      </p>

      <p className="justified">
        Отговорки генерируются по принципу Mad Libs. Генерация старается
        учитывать выбранный в настройках контекст. Если вы знаете, как улучшить
        генерацию с помощью ML, нашли ошибку в коде, или готовы провести code
        review - пишите (
        <a className="custom-link" href="https://t.me/dartungar">
          @dartungar
        </a>
        ).
      </p>
      <p className="justified">
        Генерация и API - Python (Flask, Pymorphy2, Pandas), клиент - React.js.{" "}
      </p>
      <p className="justified">
        {" "}
        Исходный код:{" "}
        <a
          className="custom-link"
          href="https://github.com/dartungar/otgovorki-web"
        >
          github.com/dartungar/otgovorki-web
        </a>
      </p>
      <p className="justified">Другие проекты:</p>
      <ul>
        <li style={{ textAlign: "left" }}>
          <a className="custom-link" href="https://t.me/PerfectWeatherBot">
            Perfect Weather Bot
          </a>
          : подскажет, где есть погода на ваш вкус
        </li>
        <li style={{ textAlign: "left" }}>
          <a className="custom-link" href="https://t.me/notion_so_bot">
            Notion Bot
          </a>
          : быстро отправить текст из Telegram в Notion
        </li>
      </ul>
    </div>
  );
};

export default About;

import { useState, useEffect } from "react";

import { getRandomColorPairs } from "./helpers/colorHelpers";
import GAME_STATE from "./constants/game.constants";
import failSound from "./assets/music/fail.mp3";
import tickSound from "./assets/music/tick.mp3";
import clockSound from "./assets/music/clock.mp3";
import youWin from "./assets/music/win.mp3";

import "./App.css";
import FireworksComponent from "./components/FireworksComponent";

const Game = () => {
  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [matchedColors, setMatchedColors] = useState([]);
  const [timer, setTimer] = useState(30);
  const [selectedImage, setSelectedImage] = useState("");
  const [gameState, setGameState] = useState(GAME_STATE.PENDING);

  const failAudio = new Audio(failSound);
  const tickAudio = new Audio(tickSound);
  const clockAudio = new Audio(clockSound);
  const winAudio = new Audio(youWin);

  useEffect(() => {
    if (timer === 10) {
      clockAudio.play();
    }
  }, [timer, matchedColors, colors.length]);

  useEffect(() => {
    let interval = null;
    if (gameState === GAME_STATE.PLAYING) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (
      gameState === GAME_STATE.FINISHED &&
      matchedColors.length === colors.length
    ) {
      winAudio.play();
    }
    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    if (timer === 0) {
      setGameState(GAME_STATE.FINISHED);
    }
    if (matchedColors.length === colors.length && colors.length > 0) {
      setGameState(GAME_STATE.FINISHED);
    }
  }, [timer, matchedColors, colors.length]);

  const startGame = () => {
    setColors(getRandomColorPairs(8));
    setGameState(GAME_STATE.PLAYING);
    setTimer(40); // Reset timer to 30 seconds
    setSelectedColors([]);
    setMatchedColors([]);
    setSelectedImage("");
  };

  const handleColorClick = (index) => {
    if (gameState !== GAME_STATE.PLAYING) return;
    if (
      selectedColors.length < 2 &&
      !selectedColors.includes(index) &&
      !matchedColors.includes(index)
    ) {
      const newSelectedColors = [...selectedColors, index];
      setSelectedColors(newSelectedColors);

      if (newSelectedColors.length === 2) {
        const [firstIndex, secondIndex] = newSelectedColors;
        if (
          firstIndex !== secondIndex &&
          colors[firstIndex] === colors[secondIndex]
        ) {
          setMatchedColors((prev) => [...prev, firstIndex, secondIndex]);
          setSelectedImage(colors[firstIndex]);
          tickAudio.play();
        } else {
          failAudio.play();
        }
        setTimeout(() => {
          setSelectedColors([]);
        }, 1000);
      }
    }
  };

  return (
    <section
      className="color-background"
      style={{
        backgroundImage: selectedImage ? `url(${selectedImage})` : undefined,
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        objectFit: "cover",
      }}
    >
      <div className="game">
        <h1>Game Language Matching</h1>
        {gameState === GAME_STATE.PENDING && (
          <div className="game__button-wrapper">
            <button className="game__button" onClick={startGame}>
              Start Game
            </button>
          </div>
        )}
        {gameState === GAME_STATE.PLAYING && (
          <p className="game__timer">
            Time left:
            <p className={`${timer <= 10 ? "timer-danger" : ""}`}>{timer}</p>
          </p>
        )}
        {gameState === GAME_STATE.FINISHED &&
          matchedColors.length === colors.length && (
            <p
              className="game__timer"
              style={{
                color: "green",
                fontWeight: "bold",
              }}
            >
              <FireworksComponent />
              You Win!
              <div className="game__button-wrapper">
                <button className="game__button" onClick={startGame}>
                  Chơi tiếp ^^
                </button>
              </div>
            </p>
          )}
        {gameState === GAME_STATE.FINISHED &&
          matchedColors.length !== colors.length && (
            <>
              <p className="game__timer">Game Over</p>
              <div className="game__button-wrapper">
                <button className="game__button" onClick={startGame}>
                  Chơi lại
                </button>
              </div>
            </>
          )}
        <ul className="color-list" id="colorList">
          {colors.map((color, index) => (
            <li
              key={index}
              className={`color-item ${
                selectedColors.includes(index) || matchedColors.includes(index)
                  ? "flipping-start"
                  : "flipping"
              } ${matchedColors.includes(index) ? "matched" : ""}`}
              onClick={() => handleColorClick(index)}
              style={
                matchedColors.includes(index)
                  ? { backgroundImage: `url(${color})` }
                  : {}
              }
            >
              {selectedColors.includes(index) ||
              matchedColors.includes(index) ? (
                <img src={color} alt="Programming Language" />
              ) : (
                <div className="color-item__cover"></div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <footer>
        Created by{" "}
        <a
          href="https://profile-forme.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          Nguyen Tien Tai
        </a>{" "}
        with ❤. Show me on{" "}
        <a
          href="https://github.com/fdhhhdjd/Game-Language-Matching"
          target="_blank"
          rel="noreferrer noopener"
        >
          Github
        </a>
      </footer>
    </section>
  );
};

export default Game;

import type { NextPage } from "next";
import React from "react";
import Test from "../components/test";
import {
  GAME_STATE,
  handleGameStart,
  handleKeysPress,
} from "../helpers/moving";
import {
  clearBoard,
  drawObject,
  generateRandomPosition,
  randomNumber,
} from "../utils/helpers";

const Home: NextPage = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const handleSetGame = React.useCallback(() => {
    if (canvasRef.current) {
      drawObject(
        canvasRef.current.getContext("2d"),
        GAME_STATE.snakePos,
        "black",
        "white"
      );
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("keypress", handleKeysPress);
    return () => window.removeEventListener("keypress", handleKeysPress);
  }, []);

  React.useEffect(() => {
    handleSetGame();
    setInterval(() => {
      handleGameStart(canvasRef.current!.getContext("2d"));
    }, GAME_STATE.tickSpeed);
  }, []);

  return (
    <div className="game-wrapper">
      <canvas
        ref={canvasRef}
        id="game"
        width={GAME_STATE.gameWidth}
        height={GAME_STATE.gameHeight}
      />
    </div>
  );
};

export default Home;

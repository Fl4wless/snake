import { generateRandomPosition } from "./../utils/helpers";
import { clearBoard, drawObject } from "../utils/helpers";

const GAME_WIDTH = 1200;
const GAME_HEIGHT = 600;

export enum DirectionsEnum {
  MOVE_UP = "w",
  MOVE_RIGHT = "d",
  MOVE_DOWN = "s",
  MOVE_LEFT = "a",
}

export const GAME_STATE = {
  snakePos: [
    { x: 400, y: 300 },
    { x: 420, y: 300 },
    { x: 440, y: 300 },
    { x: 460, y: 300 },
    { x: 480, y: 300 },
  ],
  direction: DirectionsEnum.MOVE_LEFT,
  applePos: generateRandomPosition(GAME_WIDTH, GAME_HEIGHT),
  gameWidth: GAME_WIDTH,
  gameHeight: GAME_HEIGHT,
  tickSpeed: 100,
  allowedDirections: [DirectionsEnum.MOVE_UP, DirectionsEnum.MOVE_DOWN],
};

export const moveSnake = (dx: number, dy: number) => {
  let snakeCopy = [...GAME_STATE.snakePos];
  snakeCopy = [
    { x: GAME_STATE.snakePos[0].x + dx, y: GAME_STATE.snakePos[0].y + dy },
    ...snakeCopy,
  ];
  snakeCopy.pop();
  GAME_STATE.snakePos = snakeCopy;
};

export const handleKeysPress = (e: KeyboardEvent) => {
  if (!GAME_STATE.allowedDirections.includes(e.key as any)) {
    return;
  }
  switch (e.key) {
    case DirectionsEnum.MOVE_UP:
      GAME_STATE.direction = DirectionsEnum.MOVE_UP;
      break;
    case DirectionsEnum.MOVE_LEFT:
      GAME_STATE.direction = DirectionsEnum.MOVE_LEFT;
      break;
    case DirectionsEnum.MOVE_DOWN:
      GAME_STATE.direction = DirectionsEnum.MOVE_DOWN;
      break;
    case DirectionsEnum.MOVE_RIGHT:
      GAME_STATE.direction = DirectionsEnum.MOVE_RIGHT;
      break;
    default:
      return;
  }
};

export const handleGameStart = (context: CanvasRenderingContext2D | null) => {
  handleEdge();
  handleAllowedDirections();
  // console.log("allowedDirections", GAME_STATE.allowedDirections);
  handleScorePoint();

  switch (GAME_STATE.direction) {
    case DirectionsEnum.MOVE_UP:
      moveSnake(0, -20);
      break;
    case DirectionsEnum.MOVE_LEFT:
      moveSnake(-20, 0);
      break;
    case DirectionsEnum.MOVE_DOWN:
      moveSnake(0, 20);
      break;
    case DirectionsEnum.MOVE_RIGHT:
      moveSnake(20, 0);
      break;
  }
  clearBoard(context);
  drawObject(context, GAME_STATE.snakePos, "black", "white");
  drawObject(context, [GAME_STATE.applePos], "green", "white");
  return;
};

const handleAllowedDirections = () => {
  if (
    GAME_STATE.direction === DirectionsEnum.MOVE_UP ||
    GAME_STATE.direction === DirectionsEnum.MOVE_DOWN
  ) {
    GAME_STATE.allowedDirections = [
      DirectionsEnum.MOVE_LEFT,
      DirectionsEnum.MOVE_RIGHT,
    ];
  } else if (
    GAME_STATE.direction === DirectionsEnum.MOVE_RIGHT ||
    GAME_STATE.direction === DirectionsEnum.MOVE_LEFT
  ) {
    GAME_STATE.allowedDirections = [
      DirectionsEnum.MOVE_UP,
      DirectionsEnum.MOVE_DOWN,
    ];
  }
};

const handleScorePoint = () => {
  const headPositionCoords = GAME_STATE.snakePos[0];
  if (
    JSON.stringify(GAME_STATE.applePos) === JSON.stringify(headPositionCoords)
  ) {
    GAME_STATE.applePos = generateRandomPosition(GAME_WIDTH, GAME_HEIGHT);
    GAME_STATE.snakePos.push({
      x: GAME_STATE.snakePos[0].x,
      y: GAME_STATE.snakePos[0].y,
    });
  }
};

const handleEdge = () => {
  if (GAME_STATE.snakePos[0].x === 0) {
    GAME_STATE.snakePos[0].x = GAME_STATE.gameWidth;
  } else if (GAME_STATE.snakePos[0].x === GAME_STATE.gameWidth) {
    GAME_STATE.snakePos[0].x = 0;
  } else if (GAME_STATE.snakePos[0].y === 0) {
    GAME_STATE.snakePos[0].y = GAME_STATE.gameHeight;
  } else if (GAME_STATE.snakePos[0].y === GAME_STATE.gameHeight) {
    GAME_STATE.snakePos[0].y = 0;
  }
};

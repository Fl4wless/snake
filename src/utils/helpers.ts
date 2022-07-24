export const clearBoard = (context: CanvasRenderingContext2D | null) => {
  if (context) {
    context.clearRect(0, 0, 1200, 600);
  }
};

export interface IObjectBody {
  x: number;
  y: number;
}

export const drawObject = (
  context: CanvasRenderingContext2D | null,
  objectBody: IObjectBody[],
  fillColor: string,
  borderColor: string
) => {
  if (context) {
    objectBody.forEach((coord) => {
      context.fillStyle = fillColor;
      context.strokeStyle = borderColor;
      context.fillRect(coord.x, coord.y, 20, 20);
      context.strokeRect(coord.x, coord.y, 20, 20);
    });
  }
};

export const randomNumber = (max: number) => {
  const random = Math.random() * max;
  return random - (random % 20);
};

export const generateRandomPosition = (width: number, height: number) => {
  return {
    x: randomNumber(width),
    y: randomNumber(height),
  };
};

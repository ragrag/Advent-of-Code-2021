import { parseInput } from "./input.ts";
import { Events, eventEmitter } from "./event-emitter.ts";
import Board from "./board.ts";

try {
  const boardScores: number[] = [];
  const { numbers, boardData } = await parseInput();

  boardData.forEach((b) => {
    new Board(b).joinBingoGame();
  });

  eventEmitter.on(Events.finish, (totalScore: number) => {
    boardScores.push(totalScore);
  });

  numbers.forEach((n) => {
    eventEmitter.emit(Events.turn, n);
  });

  console.log(
    `First board score ${boardScores[0]} last board score ${boardScores.pop()}`
  );
} catch (err) {
  console.error(`${err}`);
}

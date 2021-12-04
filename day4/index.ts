import { parseInput } from "./input.ts";
import { Events, eventEmitter } from "./event-emitter.ts";
import Board from "./board.ts";

try {
  const boardScores: number[] = [];
  const { numbers, boardData } = await parseInput();

  boardData.forEach((b) => {
    new Board(b);
  });

  eventEmitter.on(Events.finish, (totalScore: number) => {
    boardScores.push(totalScore);
  });

  for (const n of numbers) {
    eventEmitter.emit(Events.turn, n);
  }

  console.log(
    `First board score ${boardScores[0]} last board score ${boardScores.pop()}`
  );
} catch (err) {
  console.error(`${err}`);
}

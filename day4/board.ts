import { eventEmitter, Events } from "./event-emitter.ts";

type Position = {
  row: number;
  col: number;
};

export default class Board {
  private data: (number | "#")[][];
  private finished = false;
  private readonly boardPositionsMap: Map<number, Position>;

  constructor(boardData: number[][]) {
    if (!(boardData?.length === 5) || !(boardData?.[0].length === 5)) {
      throw new Error("Invalid board");
    }
    this.boardPositionsMap = new Map();
    this.data = boardData;

    for (let i = 0; i < boardData.length; i++) {
      for (let j = 0; j < boardData.length; j++) {
        this.boardPositionsMap.set(boardData[i][j], { row: i, col: j });
      }
    }
  }

  public joinBingoGame = () => {
    eventEmitter.on(Events.turn, (n: number) => {
      this.evaluateTurn(n);
    });
  };

  private evaluateTurn = (n: number) => {
    if (this.finished) {
      return;
    }
    const numberPositionInBoard = this.boardPositionsMap.get(n);
    if (numberPositionInBoard) {
      const { row, col } = numberPositionInBoard;
      this.data[row][col] = "#";
      if (this.isWinningPosition(numberPositionInBoard)) {
        this.finished = true;
        const totalScore = this.calculateTotalScore() * n;
        eventEmitter.emit(Events.finish, totalScore);
      }
    }
  };

  private isWinningPosition({ row, col }: Position) {
    if (
      this.data[row].every((cell) => cell === "#") ||
      this.data.every((row) => row[col] === "#")
    ) {
      return true;
    }
    return false;
  }

  private calculateTotalScore() {
    return this.data
      .flat()
      .reduce<number>((acc, cur) => acc + (cur !== "#" ? cur : 0), 0);
  }
}

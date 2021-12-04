import { chunk as _chunk } from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

const parseNumberInput = (input: string): number[] => {
  return input
    .trim()
    .split(",")
    .map((n) => Number(n));
};

const parseBoardInput = (input: string): number[][] => {
  const flatBoard: number[] = input
    .replaceAll("\n", " ")
    .replaceAll("  ", " ")
    .trim()
    .split(" ")
    .map((n) => Number(n));
  return _chunk(flatBoard, 5, {});
};

export const parseInput = async (): Promise<{
  numbers: number[];
  boardData: number[][][];
}> => {
  const input = await Deno.readTextFile("./input.txt");
  const [numbersInput, ...boardsInput] = input.split("\n\n");
  const numbers = parseNumberInput(numbersInput);
  const boardData = boardsInput.map((b) => parseBoardInput(b));

  return { numbers, boardData };
};

import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

/**
 * Returns width percentage of the screen
 * @param percentage number (0–100)
 */
export const vw = (percentage: number): number => {
  return (width * percentage) / 100;
};

/**
 * Returns height percentage of the screen
 * @param percentage number (0–100)
 */
export const vh = (percentage: number): number => {
  return (height * percentage) / 100;
};

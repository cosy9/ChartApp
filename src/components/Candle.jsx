import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Line, Rect } from "react-native-svg";
import COLORS from "../contants/colors";

const MARGIN = 4;
const RADIUS = 4;

const Candle = ({
  candle: { low, high, open, close },
  caliber,
  scaleY,
  scaleBody,
  index,
}) => {
  const x = caliber * index + 0.5 * caliber;
  const color = open > close ? COLORS.redShade : COLORS.greenShade2;
  return (
    <>
      <Line
        x1={x}
        x2={x}
        y1={scaleY(high)}
        y2={scaleY(low)}
        stroke={color}
        strokeWidth={1}
      />
      <Rect
        x={caliber * index + MARGIN}
        y={scaleY(Math.max(open, close))}
        width={caliber - MARGIN}
        height={scaleBody(Math.max(open, close) - Math.min(open, close))}
        fill={color}
        rx={RADIUS}
        ry={RADIUS}
      />
    </>
  );
};

export default Candle;

const styles = StyleSheet.create({});

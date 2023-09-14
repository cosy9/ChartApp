import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Svg } from "react-native-svg";
import Candle from "./Candle";
import { scaleLinear } from "d3-scale";

const Chart = ({ candles, size, caliber, domain }) => {
  const scaleY = scaleLinear().domain(domain).range([size, 0]);
  const scaleBody = scaleLinear()
    .domain([0, domain[1] - domain[0]])
    .range([0, size]);
  return (
    <Svg width={size} height={size}>
      {candles.map((candle, index) => (
        <Candle
          {...{ candle, caliber, scaleY, scaleBody, index }}
          key={index}
        />
      ))}
    </Svg>
  );
};

export default Chart;

const styles = StyleSheet.create({});

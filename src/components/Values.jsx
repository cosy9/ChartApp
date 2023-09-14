import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import Row from "./Row";
import COLORS from "../contants/colors";
import {
  call,
  divide,
  floor,
  onChange,
  useCode,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const formatValue = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export default ({ candles, x, caliber }) => {
  const [{ date, open, close, high, low }, setCandle] = useState(candles[0]);
  const diff = `${((close - open) * 100) / open}`;
  const change = close - open < 0 ? diff.substring(0, 5) : diff.substring(0, 4);
  useCode(
    () =>
      onChange(
        x,
        call([floor(divide(x, caliber))], ([index]) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setCandle(candles[index]);
        })
      ),
    [x, candles]
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.table}>
        <View style={styles.column}>
          <Row label="Open" value={formatValue(open)} />
          <Row label="Close" value={formatValue(close)} />
          <Row label="Volume" value="" />
        </View>
        <View style={styles.separator} />
        <View style={styles.column}>
          <Row label="High" value={formatValue(high)} />
          <Row label="Low" value={formatValue(low)} />
          <Row
            label="Change"
            value={`${change}%`}
            color={close - open > 0 ? COLORS.greenShade2 : COLORS.redShade}
          />
        </View>
      </View>
      <Text style={styles.date}>
        {moment(date).format("h:mm MMM Do, YYYY")}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  table: {
    flexDirection: "row",
    padding: 16,
  },
  date: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
  },
  column: {
    flex: 1,
  },
  separator: {
    width: 16,
  },
});

import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import COLORS from "../contants/colors";

const Loader = ({ isTransparent = false }) => {
  return isTransparent ? (
    <ActivityIndicator
      color={COLORS.black2}
      animating={true}
      style={styles.loaderStyle}
    />
  ) : (
    <ActivityIndicator
      color={COLORS.black2}
      animating={true}
      style={styles.loader}
    />
  );
};

export default Loader;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.black1,
  },
  loaderStyle: {
    backgroundColor: COLORS.transparentBGColor,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

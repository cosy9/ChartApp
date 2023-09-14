import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ReactNativeModal from "react-native-modal";
import COLORS from "../contants/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TextInput } from "react-native-gesture-handler";

const BuyModal = ({ setIsBuyModalVisible, isBuyModalVisible, stockData }) => {
  const { title, price, percentage_variation } = stockData;
  const [value, setValue] = useState("");
  return (
    <ReactNativeModal
      style={styles.wrapper}
      onRequestClose={() => setIsBuyModalVisible(false)}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      hasBackdrop={true}
      backdropColor={COLORS.black2}
      backdropOpacity={0.5}
      useNativeDriver={true}
      onBackdropPress={() => setIsBuyModalVisible(false)}
      hideModalContentWhileAnimating={true}
      isVisible={isBuyModalVisible}
    >
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Text style={styles.alarm}>Set Alarm</Text>
          <TouchableOpacity
            style={styles.cross}
            onPress={() => setIsBuyModalVisible(false)}
          >
            <AntDesign name="close" size={28} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.arrowWrapper}>
            <View style={{ flexDirection: "row", marginRight: "auto" }}>
              <View style={styles.arrow}>
                <AntDesign name="arrowup" size={28} color={COLORS.darkShade2} />
              </View>
              <View style={[styles.arrow, styles.arrowMargin]}>
                <AntDesign
                  name="arrowdown"
                  size={28}
                  color={COLORS.darkShade2}
                />
              </View>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="0,00"
              placeholderTextColor={COLORS.darkShade2}
              value={value}
              onChangeText={(text) => setValue(text)}
              keyboardType="number-pad"
              returnKeyType="done"
              maxLength={10}
            />
            <View style={styles.dollarWrapper}>
              <Text style={styles.dollar}>$</Text>
            </View>
          </View>
          <View style={styles.line} />
        </View>
        <View style={styles.stockRow}>
          <Text style={styles.textStyles}>{title}</Text>
          <View style={styles.priceRow}>
            <View
              style={[
                percentage_variation < 0
                  ? { backgroundColor: COLORS.redShade }
                  : { backgroundColor: COLORS.greenShade2 },
                styles.priceStyles,
              ]}
            />
            <Text style={styles.textStyles}>{percentage_variation}%</Text>
          </View>
          <Text style={styles.textStyles}>{price}$</Text>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default BuyModal;

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "center",
    width: "100%",
    margin: 0,
  },
  container: {
    width: "100%",
    height: "80%",
    top: 60,
    backgroundColor: COLORS.darkShade,
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  alarm: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: "auto",
  },
  arrowWrapper: {
    flexDirection: "row",
    marginTop: 15,
  },
  arrow: {
    borderWidth: 1,
    borderColor: COLORS.darkShade2,
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
  cross: { marginLeft: "auto" },
  arrowMargin: { marginLeft: 8 },
  textInput: {
    backgroundColor: COLORS.darkShade,
    marginLeft: 10,
    fontSize: 28,
    justifyContent: "flex-end",
    textAlign: "right",
    marginRight: 8,
  },
  dollarWrapper: {
    backgroundColor: COLORS.blueShade,
    borderRadius: 4,
    alignSelf: "center",
  },
  dollar: {
    color: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontSize: 24,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.black2,
    marginTop: 14,
  },
  stockRow: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  textStyles: {
    color: COLORS.darkShade2,
    fontSize: 20,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  priceStyles: {
    padding: 3,
    width: 2,
    height: 2,
    borderRadius: 4,
  },
});

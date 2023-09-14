import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Loader from "../components/Loader";
import { stockData as stockStoredData } from "../data/chartData";
import Values from "../components/Values";
import Chart from "../components/Chart";
import COLORS from "../contants/colors";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  add,
  diffClamp,
  eq,
  modulo,
  sub,
} from "react-native-reanimated";
import { onGestureEvent, useValues } from "react-native-redash";
import AntDesign from "react-native-vector-icons/AntDesign";
import Line from "../components/Line";
import Header from "../components/Header";
import BuyModal from "../components/BuyModal";

const getDomain = (rows) => {
  const values = rows.map(({ high, low }) => [high, low]).flat();
  return [Math.min(...values), Math.max(...values)];
};

const StockChartScreen = () => {
  const { width: size } = Dimensions.get("window");
  const [candles, setCandles] = useState([]);
  const [stockData, setStockData] = useState({});
  const [isBuyModalVisible, setIsBuyModalVisible] = useState(false);
  const navigation = useNavigation();
  const {
    params: { id },
  } = useRoute();

  useEffect(() => {
    const fetchedGraphData = stockStoredData["Watchlist"].find(
      (item) => item.id === id
    );
    setCandles(fetchedGraphData.stock_data);
    setStockData(fetchedGraphData);
  }, []);

  let domain = getDomain(candles);
  let [x, y, state] = useValues(0, 0, State.UNDETERMINED);
  let gestureHandler = onGestureEvent({
    x,
    y,
    state,
  });
  let caliber = size / candles.length;
  let translateY = diffClamp(y, 0, size);
  let translateX = add(sub(x, modulo(x, caliber)), caliber / 2);
  let opacity = eq(state, State.ACTIVE);

  return (
    <SafeAreaView style={styles.containerWrapper}>
      <View style={styles.stockHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={22} color={COLORS.white} />
        </TouchableOpacity>
        {stockData ? (
          <Text style={styles.textStyle}>{stockData.title}</Text>
        ) : (
          <></>
        )}
        <Text style={styles.textStyle}>...</Text>
      </View>
      {!candles || candles.length === 0 ? (
        <Loader />
      ) : (
        <View style={{ flex: 1, backgroundColor: COLORS.black2 }}>
          <Header stockData={stockData} />
          <Animated.View style={{ opacity }}>
            <Values
              caliber={caliber}
              x={translateX}
              {...{ caliber, candles }}
            />
          </Animated.View>
          <View>
            <Chart {...{ candles, size, caliber, domain }} />
            <PanGestureHandler minDist={0} {...gestureHandler}>
              <Animated.View style={StyleSheet.absoluteFill}>
                <Animated.View
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    opacity,
                    transform: [{ translateY: translateY }],
                  }}
                >
                  <Line x={size} y={0} />
                </Animated.View>
                <Animated.View
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    opacity,
                    transform: [{ translateX: translateX }],
                  }}
                >
                  <Line x={0} y={size} />
                </Animated.View>
              </Animated.View>
            </PanGestureHandler>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              onPress={() => setIsBuyModalVisible(true)}
              style={styles.buyWrapper}
            >
              <Text style={styles.buy}>Buy</Text>
            </TouchableOpacity>
          </View>
          <BuyModal
            isBuyModalVisible={isBuyModalVisible}
            setIsBuyModalVisible={setIsBuyModalVisible}
            stockData={stockData}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default StockChartScreen;

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    paddingTop: 15,
  },
  stockHeader: {
    backgroundColor: COLORS.black2,
    paddingTop: 16,
    paddingBottom: 36,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  online: {
    backgroundColor: "blue",
    borderWidth: 2,
    borderColor: COLORS.darkShade,
    width: 12,
    height: 12,
    borderRadius: 6,
    position: "absolute",
    bottom: 0,
    left: 30,
  },
  textStyle: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 22,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
  buyWrapper: {
    backgroundColor: COLORS.blueShade,
    width: "96%",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 4,
  },
  buy: {
    color: COLORS.white,
    fontSize: 16,
  },
});

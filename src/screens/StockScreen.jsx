import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import COLORS from "../contants/colors";
import { TabBar, TabView } from "react-native-tab-view";
import { stockData } from "../data/chartData";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const initialLayout = { width: Dimensions.get("window").width };

const StockScreen = () => {
  const [index, setIndex] = useState(1);
  const navigation = useNavigation();
  const sceneMap = {};
  const keys = Object?.keys(stockData);
  const routes = keys?.map((categoryTitle, index) => {
    sceneMap[`${index}`] = categoryTitle;
    return {
      key: index.toString(),
      title: categoryTitle,
    };
  });

  const handleStockPress = (id) => {
    navigation.navigate("StockChartScreen", { id });
  };

  const renderScene = ({ route }) => {
    return <TabPanel id={sceneMap[route.key]} stockData={stockData} />;
  };

  const renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        scrollEnabled={keys?.length >= 3 ? true : false}
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
        activeColor={COLORS.darkShade}
        inactiveColor={COLORS.gray}
        renderLabel={({ route, focused, color }) => (
          <View
            style={[
              focused ? styles.activeTabTextColor : styles.tabTextColor,
              styles.tabBarViewWrapper,
            ]}
          >
            <Text
              style={[
                focused ? styles.activeTabTextColor : styles.tabTextColor,
              ]}
            >
              {route.title}
            </Text>
          </View>
        )}
      />
    );
  };

  const TabPanel = ({ stockData, id }) => {
    if (!id || !stockData) {
      return null;
    }
    const stockSectionItem = stockData[id];

    const renderSectionList = ({ item, index }) => {
      const { id, title, price, percentage_variation } = item;
      return (
        <TouchableOpacity
          style={[
            styles.row,
            index % 2 && { backgroundColor: COLORS.darkShade },
          ]}
          onPress={() => handleStockPress(id)}
        >
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.price}>{price} $</Text>
          {percentage_variation < 0 ? (
            <Text style={[styles.percentage, { color: COLORS.redShade }]}>
              {percentage_variation} %
            </Text>
          ) : (
            <Text style={[styles.percentage, { color: COLORS.greenShade }]}>
              {percentage_variation} %
            </Text>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.listWrapper}>
        <FlatList
          data={stockSectionItem}
          renderItem={renderSectionList}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.containerWrapper}>
      <StatusBar backgroundColor={COLORS.darkShade} />
      <View style={styles.stockHeader}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
            }}
            resizeMode="contain"
            style={styles.image}
          />
          <View style={styles.online} />
        </View>
        <Text style={styles.textStyle}>Dashboard</Text>
        <Text style={styles.textStyle}>...</Text>
      </View>
      <View style={{ flex: 1 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={renderTabBar}
        />
      </View>
    </SafeAreaView>
  );
};

export default StockScreen;

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    paddingTop: 15,
  },
  stockHeader: {
    backgroundColor: COLORS.darkShade,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: 40,
    height: 40,
    position: "relative",
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

  scene: {
    flex: 1,
  },
  wrapper: {
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    flex: 1,
  },

  tabbar: {
    backgroundColor: COLORS.darkShade,
    paddingVertical: 10,
  },
  tab: {
    width: "auto",
  },
  indicator: {
    backgroundColor: COLORS.blueShade,
  },

  borderStyle: {
    borderRightWidth: 1,
    borderColor: COLORS.gray,
    width: "100%",
  },
  label: {
    color: COLORS.darkShade,
    textTransform: "capitalize",
    fontSize: 14,
    width: "100%",
  },
  panel: {
    width: "100%",
    padding: 10,
    backgroundColor: COLORS.green,
  },
  tabBarViewWrapper: {
    paddingHorizontal: 20,
  },
  activeTabTextColor: {
    color: COLORS.white,
    fontSize: 14,
  },
  tabTextColor: {
    color: COLORS.darkShade2,
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    backgroundColor: COLORS.darkShade2,
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 6,
  },
  title: {
    color: COLORS.white,
    fontSize: 14,
    flex: 1,
    paddingRight: 10,
  },
  price: {
    color: COLORS.white,
    fontSize: 14,
    marginHorizontal: "auto",
    flex: 1,
  },
  percentage: {
    fontSize: 14,
  },
  listWrapper: {
    width: "100%",
    flex: 1,
  },
});

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../contants/colors';

const Tabs = ({tabs}) => (
  <View style={styles.tabContainer}>
    {tabs.map((tab, index) => (
      <View
        style={[index === 0 ? styles.activeTab : styles.tabAll]}
        key={index}>
        <Text style={index === 0 ? styles.tabLabelActive : styles.tabLabel}>
          {tab}
        </Text>
      </View>
    ))}
  </View>
);

export default ({stockData}) => {
  const {title, price, percentage_variation} = stockData;
  return (
    <View style={StyleSheet.absoluteFill}>
      <SafeAreaView style={styles.container}>
        <View style={styles.tabs}>
          <Tabs tabs={['Profile', 'News', 'Chart']} />
        </View>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.rightColumn}>
              <Text style={styles.title}>Name</Text>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.leftColumn}>
              <Text style={styles.title}>Price</Text>
              <Text style={styles.title}>${price}</Text>
              {percentage_variation < 0 ? (
                <Text style={[styles.percentage, {color: COLORS.redShade}]}>
                  {percentage_variation} %
                </Text>
              ) : (
                <Text style={[styles.percentage, {color: COLORS.greenShade}]}>
                  +{percentage_variation} %
                </Text>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: 10,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
  },
  rightColumn: {
    flex: 1,
  },
  leftColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 16,
  },
  tabContainer: {
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkShade,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkShade2,
  },
  tabLabel: {
    fontSize: 18,
    color: COLORS.gray,
    textTransform: 'none',
  },
  tabLabelActive: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
  percentage: {
    fontSize: 14,
  },
  tabAll: {
    paddingHorizontal: 18,
    paddingBottom: 16,
  },
});

import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import COLORS from '../contants/colors';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

const AppHeader = ({title = '', onBackPress, backDisabled = false}) => {
  const navigation = useNavigation();
  const onPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      {backDisabled ? null : (
        <TouchableOpacity onPress={onPress}>
          <Feather color={COLORS.white} name="arrow-left" size={28} />
        </TouchableOpacity>
      )}
      <Text style={styles.text} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black2,
    marginTop: Platform.OS === 'android' ? 30 : 0,
    height: 66,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    fontWeight: '500',
    fontSize: 20,
  },
});

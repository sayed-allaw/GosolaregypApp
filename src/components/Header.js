import React from 'react';
import {View, Text} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
const Header = ({
  containerStyle,
  title,
  leftComponent,
  rightComponent,
  twoRight,
  fill,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        ...containerStyle,
        backgroundColor: COLORS.primary,
      }}>
      {/* Left */}
      <View
        style={{
          flex: twoRight ? 0.25 : null,
        }}>
        {leftComponent}
      </View>
      {/* Title */}
      <View
        style={{
          flex: twoRight ? 0.5 : 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontFamily: FONTS.fontFamily,
            fontSize: SIZES.h3,
            color: fill ? COLORS.white : COLORS.black,
          }}>
          {title}
        </Text>
      </View>
      {/* Right */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flex: twoRight ? 0.25 : null,
        }}>
        {rightComponent}
      </View>
    </View>
  );
};
export default Header;

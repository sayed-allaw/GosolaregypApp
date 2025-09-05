import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FormInput, Header, TextIconButton } from '../../../components';
import { COLORS, FONTS, icons, images, SIZES } from '../../../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import { Button } from 'react-native-paper';
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';

const FilterFuelStation = ({ navigation }) => {
  const [myOptions, setMyOptions] = useState([
    {
      id: 1,
      name: 'طلب إمداد منزلى',
      icon: images.homeSupply,
    },
    {
      id: 2,
      name: 'عرض المحطات القريبة',
      icon: images.nearbyStation,
    },
    {
      id: 3,
      name: 'تأجير محطة',
      icon: images.rentStation,
    },
  ]);
  function renderHeader() {
    return (
      <Header
        title={'محطات الوقود المتنقلة'}
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 25,
        }}
        twoRight={true}
      />
    );
  }

  function renderMyFuel() {
    return (
      <View>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.black,
          }}>
          إختر الخدمة المناسبة لك
        </Text>
        {myOptions.map((item, index) => {
          return (
            <Animatable.View
              delay={index * 100}
              animation={'fadeInUp'}
              useNativeDriver>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  height: RFValue(80),
                  alignItems: 'center',
                  marginTop: SIZES.radius,
                  paddingHorizontal: SIZES.padding,
                  borderWidth: 2,
                  borderRadius: SIZES.radius,
                  borderColor: COLORS.primary,
                }}
                onPress={() => {
                  if (item.id == 3) {
                    navigation.navigate('StationOption', {
                      psItem: item,
                      index,
                    });
                  } else {
                    navigation.navigate('NearbeStation', {
                      psItem: item,
                      index,
                    });
                  }
                }}>

                <View
                  style={{
                    width: RFValue(60),
                    height: RFValue(45),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                    borderRadius: SIZES.radius,
                    borderColor: COLORS.lightGray2,
                  }}>
                  <Image
                    source={item.icon}
                    resizeMode="center"
                    style={{
                      width: RFValue(35),
                      height: RFValue(35),
                    }}
                  />
                </View>

                <SharedElement
                  id={`item.${item.id}.text`}
                  style={{
                    marginLeft: SIZES.radius,
                    ...FONTS.h3,
                    textAlign: 'left',
                  }}>
                  <Text
                    style={{
                      ...FONTS.h3,
                      textAlign: 'left',
                    }}>
                    {item.name}
                  </Text>
                </SharedElement>
              </TouchableOpacity>
            </Animatable.View>
          );
        })}
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.radius,
        }}
        showsVerticalScrollIndicator={false}>
        {renderMyFuel()}
      </ScrollView>
    </View>
  );
};

export default FilterFuelStation;

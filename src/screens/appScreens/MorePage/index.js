import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {FormInput, Header, TextIconButton} from '../../../components';
import {COLORS, FONTS, icons, images, SIZES} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import {Button} from 'react-native-paper';
import {SharedElement} from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';

const MorePage = ({navigation}) => {
  const [myOptions, setMyOptions] = useState([
    {
      id: 1,
      name: 'نجاحات الشركة',
      icon: images.success,
      nav: 'CompanySuccess',
    },
    {
      id: 2,
      name: 'شركاؤنا',
      icon: images.Partener,
      nav: 'CompanyPartener',
    },
  ]);
  function renderHeader() {
    return (
      <Header
        title={'أخري'}
        containerStyle={{
          height: RFValue(65),

          // marginHorizontal: SIZES.padding,
          // marginTop: 25,
        }}
        twoRight={true}
        fill={true}
      />
    );
  }

  function renderMyFuel() {
    return (
      <View>
        {/* <Text
                    style={{
                        ...FONTS.h3,
                        color: COLORS.black,
                    }}>
                    إختر الخدمة المناسبة لك
                </Text> */}
        {myOptions.map((item, index) => {
          return (
            <Animatable.View
              delay={index * 100}
              animation={'fadeInUp'}
              useNativeDriver>
              <TouchableOpacity
                style={{
                  // flexDirection: 'row',
                  height: RFValue(250),
                  // alignItems: 'center',
                  // justifyContent: "center",
                  marginTop: SIZES.radius,
                  // paddingHorizontal: SIZES.padding,
                  borderWidth: 2,
                  borderRadius: SIZES.radius + 2,
                  borderColor: COLORS.primary,
                }}
                onPress={() => {
                  navigation.navigate(myOptions[index].nav);
                }}>
                <ImageBackground
                  source={item.icon}
                  style={{
                    flex: 1,
                    flexDirection: 'row',

                    alignItems: 'center',
                    justifyContent: 'center',

                    paddingHorizontal: SIZES.padding,
                  }}
                  resizeMode="cover"
                  borderRadius={SIZES.radius}>
                  {/* Card Image */}

                  {/* <View
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
                                    // tintColor={COLORS.primary}
                                    />
                                </View> */}

                  {/* <SharedElement
                                    id={`item.${item.id}.text`}
                                    style={{
                                        // flex: 1,
                                        marginLeft: SIZES.radius,
                                        ...FONTS.h3,
                                        textAlign: 'center',
                                        alignItems: "center"
                                    }}> */}
                  <Text
                    style={{
                      ...FONTS.h2,
                      textAlign: 'center',
                      color: COLORS.white,
                    }}>
                    {item.name}
                  </Text>
                  {/* </SharedElement> */}
                </ImageBackground>
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

export default MorePage;

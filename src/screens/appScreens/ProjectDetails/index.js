import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {COLORS, SIZES, FONTS, images, icons} from '../../../constants';
import {Header, IconButton} from '../../../components';
import {SharedElement} from 'react-navigation-shared-element';
import {RFValue} from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import {Shadow} from 'react-native-shadow-2';
import * as Animatable from 'react-native-animatable';

const ProjectDetails = ({navigation, route}) => {
  const {psItem} = route.params;

  function renderHeader() {
    return (
      <Header
        title={psItem?.name}
        containerStyle={{
          height: RFValue(65),

          // marginHorizontal: SIZES.padding,
          // marginTop: 25,
          alignItems: 'center',
          paddingHorizontal: SIZES.base,
        }}
        twoRight={true}
        fill={true}
        rightComponent={
          <IconButton
            icon={icons.back}
            containerStyle={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              // transform: [{rotate: '180deg'}],

              borderWidth: 1,
              borderRadius: SIZES.radius,
              borderColor: COLORS.gray2,
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray2,
            }}
            onPress={() => navigation.goBack()}
          />
        }
        leftComponent={<View style={{width: 40}} />}
      />
    );
  }
  function renderBoday() {
    return (
      <View>
        <SharedElement
          id={`item.${psItem?.station_id}.img`}
          style={{
            width: '100%',
            height: RFValue(150),
            marginBottom: RFValue(10),
          }}>
          <FastImage
            source={{uri: psItem?.image}}
            style={{
              width: '100%',
              height: RFValue(150),
              borderRadius: SIZES.base,
            }}
            resizeMode="stretch"
          />
        </SharedElement>
        <View>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.black,
              fontWeight: 'bold',
              marginBottom: SIZES.margin,
              textAlign: 'right',
            }}>
            تفاصيل المشروع
          </Text>

          <View
            style={{
              flexDirection: 'row', 
              flexWrap: 'wrap',
              justifyContent: 'flex-end', 
              alignItems: 'center',
            }}>
            <Text style={styles.description}>{psItem.name}</Text>

            <Text style={styles.name}>{'العنوان: '}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text style={styles.description}>{psItem?.station_capacity}</Text>

            <Text style={styles.name}>{'قدرة المحطة: '}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text style={styles.description}>{psItem?.details}</Text>

            <Text style={styles.name}>{'قدرة الخلايا: '}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text style={styles.description}>{psItem?.Inverter}</Text>

            <Text style={styles.name}>{'انفرتر: '}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text style={styles.description}>{psItem?.cables}</Text>

            <Text style={styles.name}>{'كابلات: '}</Text>
          </View>

          <View>
            {psItem?.difficulties?.map((item, index) => (
              <Text key={index} style={styles.content}>
                {index + 1 + ' - ' + item}
              </Text>
            ))}
          </View>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView
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
        {renderBoday()}
      </ScrollView>
    </SafeAreaView>
  );
};

ProjectDetails.sharedElements = route => {
  const {psItem} = route.params;
  return [
    {
      id: `item.${psItem.station_id}.img`,
      animation: 'move',
      resize: 'clip',
    },
  ];
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: COLORS.white,
  },
  icon: {
    width: '100%',
    height: RFValue(200),
    resizeMode: 'cover',
    marginBottom: RFValue(20),
    color: COLORS.black,
  },
  name: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    marginBottom: RFValue(10),
    color: COLORS.black,
  },
  description: {
    fontSize: RFValue(16),
    marginBottom: RFValue(10),
    color: COLORS.black,
    alignSelf: 'flex-start',
    textAlign: 'justify',
    // marginLeft: RFValue(25)
  },
  heading: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    // marginTop: RFValue(10),
    color: COLORS.white,
  },
  content: {
    fontSize: RFValue(16),
    // marginTop: RFValue(5),
    marginBottom: RFValue(10),
    // lineHeight: RFValue(24),
    color: COLORS.black,
    alignSelf: 'flex-start',
  },
  requirements: {
    color: COLORS.black,
  },
});
export default ProjectDetails;

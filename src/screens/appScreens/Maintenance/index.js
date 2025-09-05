import React from 'react';
import {View} from 'react-native';
import {COLORS, icons} from '../../../constants';
import {Header, IconButton} from '../../../components';
import {RFValue} from 'react-native-responsive-fontsize';
const Maintenance = () => {
  function renderHeader() {
    return (
      <Header
        title={'طلب صيانه'}
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
              // tintColor: COLORS.white,
            }}
            onPress={() => navigation.goBack()}
          />
        }
        leftComponent={<View style={{width: 40}} />}
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}
    </View>
  );
};
export default Maintenance;

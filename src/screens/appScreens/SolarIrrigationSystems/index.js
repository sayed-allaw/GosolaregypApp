import React from 'react';
import {View} from 'react-native';
import {COLORS, SIZES, FONTS, images, icons} from '../../../constants';
import {Header, IconButton} from '../../../components';
function SolarIrrigationSystems() {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <Header
          title={'Solar System'}
          containerStyle={{
            height: RFValue(65),
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
      </View>
    </>
  );
}
export default SolarIrrigationSystems;

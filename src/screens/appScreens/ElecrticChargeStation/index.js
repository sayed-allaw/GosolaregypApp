import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import {Header, IconButton} from '../../../components';

const ElecrticChargeStation = ({navigation}) => {
  const buttonAnim = new Animated.Value(0); 

  useEffect(() => {
    Animated.spring(buttonAnim, {
      toValue: 1,
      friction: 6,
      tension: 50,
      useNativeDriver: true,
    }).start();
  }, []);

  function renderHeader() {
    return (
      <Header
        title={'محطات شحن السيارات الكهربية'}
        containerStyle={{
          height: RFValue(65),
          alignItems: 'center',
          paddingHorizontal: SIZES.base,
          backgroundColor: COLORS.primary,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 5},
          shadowOpacity: 0.3,
          shadowRadius: 10,
        }}
        titleStyle={{color: COLORS.white, ...FONTS.h2, fontSize: RFValue(22)}}
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
              borderWidth: 1,
              borderRadius: SIZES.radius,
              borderColor: COLORS.gray2,
            }}
            iconStyle={{
              width: 20,
              height: 20,
            }}
            onPress={() => navigation.goBack()}
          />
        }
        leftComponent={<View style={{width: 40}} />}
      />
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../../assets/images/commingSoon.png')} 
        style={styles.background}
        resizeMode="cover">
        {renderHeader()}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F6FA', 
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: RFValue(20),
  },
  subtitle: {
    fontSize: RFValue(20),
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: RFValue(40),
    ...FONTS.h3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
  },
  buttonContainer: {
    width: '90%',
    marginBottom: SIZES.padding * 2,
  },
  button: {
    paddingVertical: RFValue(15),
    paddingHorizontal: RFValue(30),
    borderRadius: RFValue(25),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  buttonText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: COLORS.white,
    ...FONTS.h2,
  },
});

export default ElecrticChargeStation;

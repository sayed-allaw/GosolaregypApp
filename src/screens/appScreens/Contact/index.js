import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import {Header, IconButton} from '../../../components';
import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';

const Contact = ({navigation}) => {
  const buttonAnims = [
    new Animated.Value(0), 
    new Animated.Value(0), 
    new Animated.Value(0), 
    new Animated.Value(0), 
  ];

  useEffect(() => {
    buttonAnims.forEach((anim, index) => {
      Animated.sequence([
        Animated.delay(index * 150), 
        Animated.spring(anim, {
          toValue: 1,
          friction: 7,
          tension: 50,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  const handleOpenLink = url => {
    Linking.openURL(url).catch(error => {
      console.error('Error opening URL:', error);
    });
  };

  function renderHeader() {
    return (
      <Header
        title={'تواصل معانا'}
        containerStyle={{
          height: RFValue(80),
          alignItems: 'center',
          paddingHorizontal: SIZES.base,
          backgroundColor: COLORS.primary,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 5},
          shadowOpacity: 0.3,
          shadowRadius: 10,
        }}
        titleStyle={{color: COLORS.white, ...FONTS.h1, fontSize: RFValue(28)}}
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
      {renderHeader()}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>راسلنا الآن!</Text>

        <Animated.View
          style={[
            styles.buttonContainer,
            {transform: [{scale: buttonAnims[0]}]},
          ]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              handleOpenLink(
                'https://www.facebook.com/people/Go-Solar/100063821541998/?mibextid=LQQJ4d',
              )
            }
            activeOpacity={0.9}>
            <Image source={icons.facebook} style={styles.icon} />
            <Text style={styles.buttonText}>فيسبوك</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {transform: [{scale: buttonAnims[1]}]},
          ]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleOpenLink('https://wa.me/+201024443678')}
            activeOpacity={0.9}>
            <Image source={icons.whatsapp} style={styles.icon} />
            <Text style={styles.buttonText}>واتساب</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {transform: [{scale: buttonAnims[2]}]},
          ]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              handleOpenLink(
                'https://www.instagram.com/go.solar1?igsh=MTRnd2tiZmIxa2MzMg==',
              )
            }
            activeOpacity={0.9}>
            <Image source={icons.instagram} style={styles.icon} />
            <Text style={styles.buttonText}>إنستغرام</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {transform: [{scale: buttonAnims[3]}]},
          ]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleOpenLink('https://www.gosolaregypt.com/')}
            activeOpacity={0.9}>
            <Image source={icons.logoGo} style={styles.iconLogo} />
            <Text style={styles.buttonText}>موقع الشركة</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F6FA', 
  },
  container: {
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(30),
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 40,
    ...FONTS.h1,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: SIZES.padding * 2,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RFValue(16),
    paddingHorizontal: RFValue(20),
    borderRadius: RFValue(15),
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.primary, 
    elevation: 8, 
    shadowColor: COLORS.primary, 
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  icon: {
    width: RFValue(30),
    height: RFValue(30),
    marginRight: 15,
    tintColor: COLORS.primary, 
  },
  iconLogo: {
    width: RFValue(40),
    height: RFValue(32),
    marginRight: 15,
    tintColor: COLORS.primary,
  },
  buttonText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: COLORS.primary, 
    ...FONTS.h2,
  },
});

export default Contact;

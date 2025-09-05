import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {CheckBox, FormInput, IconButton, TextButton} from '../../../components';
// import {MotiView} from 'moti';
import {Shadow} from 'react-native-shadow-2';
import {FONTS, SIZES, COLORS, icons, images} from '../../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import utils from '../../../utils';
import {useDispatch} from 'react-redux';
import {setUser} from '../../../redux/reducers/UserReducer';
import Auth from '../../../Services';
const AuthMain = ({navigation}) => {
  const dispatch = useDispatch();
  // States
  const [mode, setMode] = useState('signIn');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isVisable, setIsVisable] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);

  // Animation height based on mode
  const getAnimationHeight = () => {
    return mode === 'signIn' ? SIZES.height * 0.5 : SIZES.height * 0.65;
  };

  async function _checkSignin() {
    if (phone == '010101010' && password == '123') {
      let uData = {
        user_id: 1,
        user_name: 'عادل الخميسى',
        user_email: 'adel@gmail.com',
        user_password: '123',
        user_phone: '01012312231',
      };
      dispatch(setUser(uData));
      await Auth.setAccount(uData);
    } else {
      utils.toastAlert('error', 'بيانات الدخول غير صحيحة');
    }
  }

  async function _checkSignup() {
    if (email == 'adel@gmail.com') {
      let uData = {
        user_id: 1,
        user_name: 'محمد خالد',
        user_email: 'test@gmail.com',
        user_password: '123',
        user_phone: phone,
      };
      navigation.navigate('SignOTP', {
        uData,
      });
    } else {
      utils.toastAlert('error', 'برجاء إدخال بريد إلكترونى صحيح');
    }
  }

  function renderSignIn() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          alignSelf: 'center',
          height: SIZES.height * 0.5,
        }}>
        <Shadow>
          <View style={styles.authContainer}>
            <Text
              style={{
                width: '60%',
                lineHeight: 45,
                color: COLORS.darkBlue,
                ...FONTS.h2,
              }}>
              تسجيل الدخول للمتابعة
            </Text>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              enableOnAndroid={true}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              extraScrollHeight={-300}
              contentContainerStyle={
                {
                  // flexGrow: 1,
                  // justifyContent: 'center',
                }
              }>
              <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                keyboardType="phone-pad"
                placeholder="رقم الهاتف"
                value={phone}
                onChange={text => setPhone(text)}
                prependComponent={
                  <FastImage
                    source={icons.phone}
                    style={{width: 25, height: 24, marginRight: SIZES.base}}
                  />
                }
              />
              <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                placeholder="كلمة المرور"
                value={password}
                secureTextEntry={!isVisable}
                onChange={text => setPassword(text)}
                prependComponent={
                  <FastImage
                    source={icons.lock}
                    style={{width: 25, height: 24, marginRight: SIZES.base}}
                  />
                }
                appendComponent={
                  <IconButton
                    icon={isVisable ? icons.eye : icons.eye_off}
                    iconStyle={{
                      tintColor: COLORS.gray,
                    }}
                    onPress={() => setIsVisable(!isVisable)}
                  />
                }
              />

              {/* <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                keyboardType="email-address"
                placeholder="البريد الإلكترونى"
                value={email}
                onChange={text => setEmail(text)}
                prependComponent={
                  <FastImage
                    source={icons.email}
                    style={{width: 25, height: 24, marginRight: SIZES.base}}
                  />
                }
              /> */}

              {/* <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                placeholder="كلمة المرور"
                value={password}
                secureTextEntry={!isVisable}
                onChange={text => setPassword(text)}
                prependComponent={
                  <FastImage
                    source={icons.lock}
                    style={{width: 25, height: 24, marginRight: SIZES.base}}
                  />
                }
                appendComponent={
                  <IconButton
                    icon={isVisable ? icons.eye : icons.eye_off}
                    iconStyle={{
                      tintColor: COLORS.gray,
                    }}
                    onPress={() => setIsVisable(!isVisable)}
                  />
                }
              /> */}

              {/* <View style={{alignItems: 'flex-start'}}>
                <TextButton
                  label={'هل نيست كلمة المرور'}
                  buttonContainerStyle={{
                    marginTop: SIZES.radius,
                    backgroundColor: null,
                  }}
                  labelStyle={{
                    color: COLORS.support4,
                    ...FONTS.h4,
                  }}
                />
              </View> */}
            </KeyboardAwareScrollView>
            <TextButton
              label={'تسجيل الدخول'}
              buttonContainerStyle={{
                height: 55,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
                marginTop: RFValue(20),
              }}
              labelStyle={{
                ...FONTS.h3,
                color: COLORS.white,
              }}
              onPress={() => _checkSignin()}
            />
          </View>
        </Shadow>
      </View>
    );
  }

  function renderSignUp() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          alignSelf: 'center',
          height: SIZES.height * 0.65,
        }}>
        <Shadow>
          <View style={styles.authContainer}>
            <Text
              style={{
                width: '60%',
                lineHeight: 45,
                color: COLORS.darkBlue,
                ...FONTS.h2,
              }}>
              إنشاء حساب جديد
            </Text>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              extraScrollHeight={-300}
              contentContainerStyle={{
                flexGrow: 1,
                marginTop: SIZES.padding,
                paddingBottom: SIZES.padding * 2,
              }}>
              <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                placeholder="الإسم"
                value={name}
                onChange={text => setName(text)}
                prependComponent={
                  <FastImage
                    source={icons.person}
                    style={{width: 25, height: 24, marginRight: SIZES.base}}
                  />
                }
              />
              <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                keyboardType="email-address"
                placeholder="البريد الإلكترونى"
                value={email}
                onChange={text => setEmail(text)}
                prependComponent={
                  <FastImage
                    source={icons.email}
                    style={{width: 25, height: 24, marginRight: SIZES.base}}
                  />
                }
              />
              <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                placeholder="كلمة المرور"
                value={password}
                secureTextEntry={!isVisable}
                onChange={text => setPassword(text)}
                prependComponent={
                  <FastImage
                    source={icons.lock}
                    style={{width: 25, height: 24, marginRight: SIZES.base}}
                  />
                }
                appendComponent={
                  <IconButton
                    icon={isVisable ? icons.eye : icons.eye_off}
                    iconStyle={{
                      tintColor: COLORS.gray,
                    }}
                    onPress={() => setIsVisable(!isVisable)}
                  />
                }
              />
              <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                keyboardType="phone-pad"
                placeholder="رقم الهاتف"
                value={phone}
                onChange={text => setPhone(text)}
                prependComponent={
                  <FastImage
                    source={icons.phone}
                    style={{width: 25, height: 24, marginRight: SIZES.base}}
                  />
                }
              />
              {/* Terms & conditions */}
              <CheckBox
                containerStyle={{
                  marginTop: SIZES.radius,
                }}
                isSelected={termsChecked}
                onPress={() => setTermsChecked(!termsChecked)}
              />
            </KeyboardAwareScrollView>
            <TextButton
              label={'إنشاء الحساب'}
              buttonContainerStyle={{
                height: 55,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
                marginTop: RFValue(20),
              }}
              labelStyle={{
                ...FONTS.h3,
                color: COLORS.white,
              }}
              onPress={() => _checkSignup()}
            />
          </View>
        </Shadow>
      </View>
    );
  }
  function renderAuthContainer() {
    if (mode == 'signIn') {
      return renderSignIn();
    } else {
      return renderSignUp();
    }
  }

  function renderAuthContainerFooter() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 80,
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginTop: -30,
          marginHorizontal: SIZES.radius,
          paddingBottom: SIZES.radius,
          borderBottomLeftRadius: SIZES.radius,
          borderBottomRightRadius: SIZES.radius,
          backgroundColor: COLORS.light60,
          zIndex: 0,
        }}>
        <Text
          style={{
            color: COLORS.gray,
            ...FONTS.body5,
          }}>
          {mode == 'signIn' ? 'ليس لديك حساب؟' : 'لدى حساب بالفعل.'}
        </Text>
        <TextButton
          label={mode == 'signIn' ? 'إنشاء حساب جديد' : 'تسجيل دخول'}
          buttonContainerStyle={{
            marginLeft: SIZES.base,
            backgroundColor: null,
          }}
          labelStyle={{
            color: COLORS.support4,
            ...FONTS.h5,
          }}
          onPress={() => {
            if (mode === 'signIn') {
              setMode('signUp');
            } else {
              setMode('signIn');
            }
          }}
        />
      </View>
    );
  }

  function renderSocialLogins() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -30,
          zIndex: -1,
        }}>
        <Text
          style={{
            color: COLORS.dark,
            ...FONTS.body3,
          }}>
          او سجل دخول بواسطة
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
          }}>
          <IconButton
            icon={icons.google}
            iconStyle={{
              tintColor: COLORS.dark,
            }}
            containerStyle={{
              ...styles.socialButtonContainer,
              marginLeft: SIZES.radius,
            }}
          />
          <IconButton
            icon={icons.facebook}
            iconStyle={{
              tintColor: COLORS.dark,
            }}
            containerStyle={{
              ...styles.socialButtonContainer,
              marginLeft: SIZES.radius,
            }}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FastImage
        source={images.main_logo_full}
        style={{
          alignSelf: 'center',
          marginTop: SIZES.padding * 2,
          width: RFValue(80),
          height: RFValue(80),
        }}
      />
      {/* Auth Container */}
      <View
        style={{
          zIndex: 1,
        }}>
        {renderAuthContainer()}
      </View>

      {renderAuthContainerFooter()}

      {mode === 'signIn' && renderSocialLogins()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.lightGray,
  },
  authContainer: {
    flex: 1,
    width: SIZES.width - SIZES.padding * 2,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.light,
    // alignSelf: 'center',
    zIndex: 1,
  },
  socialButtonContainer: {
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.gray3,
  },
});

export default AuthMain;

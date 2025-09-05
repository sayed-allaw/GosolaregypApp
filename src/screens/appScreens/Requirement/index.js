import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import {Header, IconButton, TextButton} from '../../../components';
import {RFValue} from 'react-native-responsive-fontsize';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Toast from 'react-native-toast-message';
// import ServiceDetails from '../ServiceDetails';
import SelectDevice from '../SelectDevice';
import utils from '../../../utils';
const Requirement = ({navigation, route}) => {
  const {title} = route?.params || {};
  const [price, setPrice] = useState();
  const [space, setSpace] = useState();
  const [showelse, setShowelse] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [Oder, setOrder] = useState('');
  const [powerStation, setPowerStation] = useState();
  const [lightType, setLightType] = useState();
  const [lightPower, setLightPower] = useState();
  const [immersion, setimmersion] = useState(0);
  const [spray, setspray] = useState(0);
  const [dotting, setdotting] = useState(0);
  const [NumberOfacres, setNumberOfacres] = useState(0);
  const [Totalnumberofacres, setTotalnumberofacres] = useState(0);
  const [Farmlocation, setFarmlocation] = useState('');
  const [Croptype, setCroptype] = useState('');
  const [Spraying_water, setSpraying_water] = useState(0);
  const [furthest_point, setfurthest_point] = useState(0);
  const [Well_depth, setWell_depth] = useState('');
  const [Landing_well, setLanding_well] = useState('');
  const [selectedType, setselectedType] = useState('dotting');
  const [waterValue, setwaterValue] = useState(0);
  const [pressure, setpressure] = useState(0);

  const [model2, setModel2] = useState(false);
  function calcPowerOfStation() {
    if (price < 1100) {
      Toast.show({
        type: 'error',
        text1: 'يجب ان لا يقل السعر عن 1100 ج',
      });
    } else {
      let eq1 = price / 1.5;
      let eq2 = eq1 / 30;
      let power = eq2 / 4.5;
      setPowerStation(power);
    }
  }

  function calculateWater() {
    if (selectedType == 'immersion') {
      const waterQuantity = (NumberOfacres * 40) / 6;
      const TDH =
        1 * Spraying_water + 10 + (1 * furthest_point) / 100 + 1 * Landing_well;
      setwaterValue(waterQuantity);
      setpressure(TDH);
    } else if (selectedType == 'dotting') {
      const waterQuantity = (NumberOfacres * 25) / 6;
      const TDH =
        1 * Spraying_water + 20 + (1 * furthest_point) / 100 + 1 * Landing_well;
      setwaterValue(waterQuantity);
      setpressure(TDH);
    } else if (selectedType == 'spraying') {
      const waterQuantity = (NumberOfacres * 30) / 6;
      const TDH =
        1 * Spraying_water + 30 + (1 * furthest_point) / 100 + 1 * Landing_well;
      setwaterValue(waterQuantity);
      setpressure(TDH);
    }
  }

  function renderHeader() {
    return (
      <Header
        title={'المتطلبات'}
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
              //   transform: [{rotate: '180deg'}],

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

  function renderBody() {
    return title === 'الكشافات' ? (
      <View
        style={{
          padding: 20,
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: 15,
            color: COLORS.black,
            alignSelf: 'center',
            fontWeight: 'bold',
            marginBottom: 5,
          }}>
          الكشافات{' '}
        </Text>
        <Text style={styles.label}>نوع الكشاف:</Text>

        <View
          style={{
            flexDirection: 'row',
            height: 55,
            paddingHorizontal: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: '#f5f5f5',
            alignItems: 'center',
            marginVertical: SIZES.radius,
            borderRadius: SIZES.radius,
          }}>
          <TextInput
            style={styles.input}
            placeholder="أدخل  نوع الكشاف"
            placeholderTextColor={COLORS.gray}
            onChangeText={text => setLightPower(text)}
          />
        </View>

        <Text style={styles.label}>قدرة الكشاف:</Text>

        <View
          style={{
            flexDirection: 'row',
            height: 55,
            paddingHorizontal: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: '#f5f5f5',
            alignItems: 'center',
            marginVertical: SIZES.radius,
            borderRadius: SIZES.radius,
          }}>
          <TextInput
            style={styles.input}
            placeholder="أدخل  قدرة الكشاف"
            placeholderTextColor={COLORS.gray}
            onChangeText={text => setLightPower(text)}
          />
        </View>
        <View
          style={{
            // position: 'absolute',
            // bottom: 50,
            width: '100%',
            alignSelf: 'center',
            marginTop: 100,
          }}>
          <TouchableOpacity
            onPress={() => {
              setOpenModal(true);
            }}
            style={{
              width: '100%',
              padding: RFValue(10),
              borderRadius: RFValue(50),
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.heading}>خدمات أخرى</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : title === 'الأنظمة الشمسية المنفصله عن الشبكة' ? (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <ScrollView>
          <SelectDevice></SelectDevice>
        </ScrollView>
        <View
          style={{
            // position: 'absolute',
            // bottom: 10,
            width: '100%',
            alignSelf: 'center',
            marginTop: RFValue(30),
            paddingHorizontal: 10,
            marginBottom: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Contact');
            }}
            style={{
              width: '100%',
              padding: RFValue(10),
              borderRadius: RFValue(50),
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <Text style={styles.heading}> تواصل مع الشركه</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setOpenModal(true);
            }}
            style={{
              width: '100%',
              padding: RFValue(10),
              borderRadius: RFValue(50),
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.heading}>خدمات أخرى</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : title.trim() === 'أنظمة الرى بالطاقة الشمسيه' ? (
      <View
        style={{
          flex: 1,
          padding: SIZES.padding,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              maxWidth: RFValue(200),
              color: COLORS.primary,
              ...FONTS.body3,
              marginLeft: RFValue(80),
            }}>
            {' '}
            طريقة الري :
          </Text>
          <View
            style={{
              flexDirection: 'row',
              padding: RFValue(10),
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: RFValue(10),
            }}>
            <TouchableOpacity
              style={{
                backgroundColor:
                  selectedType == 'immersion'
                    ? COLORS.primary
                    : COLORS.lightGray3,
                paddingVertical: RFValue(8),
                borderRadius: RFValue(20),
                width: RFValue(80),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setselectedType('immersion');
              }}>
              <Text
                style={{
                  maxWidth: RFValue(100),
                  color:
                    selectedType == 'immersion' ? COLORS.white : COLORS.primary,
                  ...FONTS.body3,
                }}>
                غمر
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor:
                  selectedType == 'spraying'
                    ? COLORS.primary
                    : COLORS.lightGray3,
                paddingVertical: RFValue(8),
                borderRadius: RFValue(20),
                width: RFValue(80),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setselectedType('spraying');
              }}>
              <Text
                style={{
                  maxWidth: RFValue(100),
                  color:
                    selectedType == 'spraying' ? COLORS.white : COLORS.primary,
                  ...FONTS.body3,
                }}>
                رش
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor:
                  selectedType == 'dotting'
                    ? COLORS.primary
                    : COLORS.lightGray3,
                paddingVertical: RFValue(8),
                borderRadius: RFValue(20),
                width: RFValue(80),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setselectedType('dotting');
              }}>
              <Text
                style={{
                  maxWidth: RFValue(100),
                  color:
                    selectedType == 'dotting' ? COLORS.white : COLORS.primary,
                  ...FONTS.body3,
                }}>
                تنقيط
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              maxWidth: RFValue(200),
              color: COLORS.primary,
              ...FONTS.body4,
              marginLeft: RFValue(80),
            }}>
            موقع المزرعة:
          </Text>
          <TextInput
            style={{
              padding: RFValue(10),
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: RFValue(30),
              marginBottom: RFValue(20),
              paddingHorizontal: RFValue(20),
              ...FONTS.body5,
              backgroundColor: COLORS.white,
              maxWidth: RFValue(300),
              marginTop: RFValue(10),
              color: COLORS.third,
            }}
            placeholder="موقع المزرعة.."
            placeholderTextColor={COLORS.gray2}
            onChangeText={val => {
              setFarmlocation(val);
            }}
          />

          <Text
            style={{
              maxWidth: RFValue(200),
              color: COLORS.primary,
              ...FONTS.body4,
              marginLeft: RFValue(80),
            }}>
            عدد اجمالي الأفدان:
          </Text>
          <TextInput
            style={{
              padding: RFValue(10),
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: RFValue(30),
              marginBottom: RFValue(20),
              paddingHorizontal: RFValue(20),
              ...FONTS.body5,
              backgroundColor: COLORS.white,
              maxWidth: RFValue(300),
              marginTop: RFValue(10),
              color: COLORS.third,
            }}
            placeholder="اجمالي الأفدان.."
            placeholderTextColor={COLORS.gray2}
            keyboardType="numeric"
            onChangeText={val => {
              setTotalnumberofacres(val);
            }}
          />

          <Text
            style={{
              maxWidth: RFValue(200),
              color: COLORS.primary,
              ...FONTS.body4,
              marginLeft: RFValue(80),
            }}>
            عدد الافدان المستهدفة للرى يوميا :
          </Text>
          <TextInput
            style={{
              padding: RFValue(10),
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: RFValue(30),
              marginBottom: RFValue(20),
              paddingHorizontal: RFValue(20),
              ...FONTS.body5,
              backgroundColor: COLORS.white,
              maxWidth: RFValue(300),
              marginTop: RFValue(10),
              color: COLORS.third,
            }}
            placeholder="عدد الافدان المستهدفة للرى يوميا .."
            placeholderTextColor={COLORS.gray2}
            keyboardType="numeric"
            onChangeText={val => {
              setNumberOfacres(val);
            }}
          />

          <Text
            style={{
              maxWidth: RFValue(200),
              color: COLORS.primary,
              ...FONTS.body4,
              marginLeft: RFValue(80),
            }}>
            نوع المحصول:
          </Text>
          <TextInput
            style={{
              padding: RFValue(10),
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: RFValue(30),
              marginBottom: RFValue(20),
              paddingHorizontal: RFValue(20),
              ...FONTS.body5,
              backgroundColor: COLORS.white,
              maxWidth: RFValue(300),
              marginTop: RFValue(10),
              color: COLORS.third,
            }}
            placeholder="نوع المحصول.."
            placeholderTextColor={COLORS.gray2}
            onChangeText={val => {
              setCroptype(val);
            }}
          />
          <Text
            style={{
              maxWidth: RFValue(200),
              color: COLORS.primary,
              ...FONTS.body4,
              marginLeft: RFValue(80),
            }}>
            وش المياه:
          </Text>
          <TextInput
            style={{
              padding: RFValue(10),
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: RFValue(30),
              marginBottom: RFValue(20),
              paddingHorizontal: RFValue(20),
              ...FONTS.body5,
              backgroundColor: COLORS.white,
              maxWidth: RFValue(300),
              marginTop: RFValue(10),
              color: COLORS.third,
            }}
            placeholder="وش المياه .."
            keyboardType="numeric"
            placeholderTextColor={COLORS.gray2}
            onChangeText={val => {
              setSpraying_water(val);
            }}
          />
          <Text
            style={{
              maxWidth: RFValue(200),
              color: COLORS.primary,
              ...FONTS.body4,
              marginLeft: RFValue(80),
            }}>
            ابعد نقطة من البئر لاخر خط مواسير الرى:
          </Text>
          <TextInput
            style={{
              padding: RFValue(10),
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: RFValue(30),
              marginBottom: RFValue(20),
              paddingHorizontal: RFValue(20),
              ...FONTS.body5,
              backgroundColor: COLORS.white,
              maxWidth: RFValue(300),
              marginTop: RFValue(10),
              color: COLORS.third,
            }}
            placeholder="ابعد نقطة من البئر لاخر خط مواسير الرى .."
            placeholderTextColor={COLORS.gray2}
            keyboardType="numeric"
            onChangeText={val => {
              setfurthest_point(val);
            }}
          />
          <Text
            style={{
              maxWidth: RFValue(200),
              color: COLORS.primary,
              ...FONTS.body4,
              marginLeft: RFValue(80),
            }}>
            عمق البئر:
          </Text>
          <TextInput
            style={{
              padding: RFValue(10),
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: RFValue(30),
              marginBottom: RFValue(20),
              paddingHorizontal: RFValue(20),
              ...FONTS.body5,
              backgroundColor: COLORS.white,
              maxWidth: RFValue(300),
              marginTop: RFValue(10),
              color: COLORS.third,
            }}
            placeholder="عمق البئر .."
            placeholderTextColor={COLORS.gray2}
            keyboardType="numeric"
            onChangeText={val => {
              setWell_depth(val);
            }}
          />
          <Text
            style={{
              maxWidth: RFValue(200),
              color: COLORS.primary,
              ...FONTS.body4,
              marginLeft: RFValue(80),
            }}>
            مقدار الهبوط فى البئر :
          </Text>
          <TextInput
            style={{
              padding: RFValue(10),
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: RFValue(30),
              marginBottom: RFValue(20),
              paddingHorizontal: RFValue(20),
              ...FONTS.body5,
              backgroundColor: COLORS.white,
              maxWidth: RFValue(300),
              marginTop: RFValue(10),
              color: COLORS.third,
            }}
            placeholder="مقدار الهبوط فى البئر.."
            placeholderTextColor={COLORS.gray2}
            keyboardType="numeric"
            onChangeText={val => {
              setLanding_well(val);
            }}
          />

          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              padding: RFValue(10),
              borderRadius: RFValue(20),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              calculateWater();
              console.log(waterValue);
              console.log(pressure);
            }}>
            <Text
              style={{
                maxWidth: RFValue(100),
                color: COLORS.white,
                ...FONTS.body3,
              }}>
              حساب الري
            </Text>
          </TouchableOpacity>
          {waterValue && pressure ? (
            <>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  <Text style={styles.label}> water Quantity: </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginBottom: 5,
                      color: COLORS.black,
                    }}>
                    {waterValue.toFixed(3)}{' '}
                  </Text>
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  <Text style={styles.label}> TDH : </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginBottom: 5,
                      color: COLORS.black,
                    }}>
                    {pressure}
                  </Text>
                </Text>
              </View>
            </>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              setOpenModal(true);
            }}
            style={{
              width: '100%',
              padding: RFValue(10),
              borderRadius: RFValue(50),
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: RFValue(10),
            }}>
            <Text style={styles.heading}>خدمات أخرى</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModel2(true);
            }}
            style={{
              width: '100%',
              padding: RFValue(10),
              borderRadius: RFValue(50),
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: RFValue(10),
            }}>
            <Text style={styles.heading}> خانة العميل</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    ) : title.trim() === 'الأنظمة الشمسية المتصلة بالشبكه' ? (
      <>
        <View
          style={{
            padding: 20,
            flex: 1,
          }}>
          <Text
            style={{
              fontSize: 15,
              color: COLORS.black,
              alignSelf: 'center',
              fontWeight: 'bold',
              marginBottom: 5,
            }}>
            حساب قدرة المحطه المطلوبه{' '}
          </Text>
          <Text
            style={{
              fontSize: 13,
              marginTop: -5,
              marginBottom: 5,
              color: COLORS.gray,
              alignSelf: 'center',
              marginBottom: 20,
            }}>
            (من 5 إلى حتى 10 كيلو واط){' '}
          </Text>
          <Text style={styles.label}>مبلغ الفاتوره الشهرية:</Text>
          <Text
            style={{
              fontSize: 13,
              marginTop: -5,
              marginBottom: 5,
              color: COLORS.gray,
            }}>
            يجب أن لا يقل عن 1100 ج
          </Text>

          <View
            style={{
              flexDirection: 'row',
              height: 55,
              paddingHorizontal: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: '#f5f5f5',
              alignItems: 'center',
              marginVertical: SIZES.radius,
              borderRadius: SIZES.radius,
            }}>
            <TextInput
              style={styles.input}
              placeholder="أدخل المبلغ"
              placeholderTextColor={COLORS.gray}
              onChangeText={text => setPrice(text)}
              keyboardType="decimal-pad"
            />
          </View>

          <Text style={styles.label}> مساحة السطح المتاحه:</Text>

          <View
            style={{
              flexDirection: 'row',
              height: 55,
              paddingHorizontal: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: '#f5f5f5',
              alignItems: 'center',
              marginVertical: SIZES.radius,
              borderRadius: SIZES.radius,
            }}>
            <TextInput
              style={styles.input}
              placeholder="أدخل  المساحه"
              placeholderTextColor={COLORS.gray}
              onChangeText={text => setSpace(text)}
              keyboardType="decimal-pad"
            />
          </View>

          {powerStation && (
            <Text
              style={{
                alignSelf: 'center',
                marginTop: 10,
              }}>
              <Text style={styles.label}> قدرة المحطة: </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 5,
                  color: COLORS.black,
                }}>
                {powerStation} كيلو وات
              </Text>
            </Text>
          )}

          <View
            style={{
              // position: 'absolute',
              // bottom: 10,
              width: '100%',
              alignSelf: 'center',
              marginTop: 150,
            }}>
            <TouchableOpacity
              onPress={() => {
                {
                  if (space == null || price == null) {
                    utils.toastAlert('error', 'من فضلك ادخل البينات المطلوبه');
                  } else {
                    calcPowerOfStation();
                  }
                  // navigation.navigate('SelectDevice')
                }
              }}
              style={{
                width: '100%',
                padding: RFValue(10),
                borderRadius: RFValue(50),
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <Text style={styles.heading}>حساب قدرة المحطة</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Contact');
              }}
              style={{
                width: '100%',
                padding: RFValue(10),
                borderRadius: RFValue(50),
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <Text style={styles.heading}> تواصل مع الشركه</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setOpenModal(true);
              }}
              style={{
                width: '100%',
                padding: RFValue(10),
                borderRadius: RFValue(50),
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.heading}>خدمات أخرى</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    ) : null;
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}
      <View
        style={{
          flex: 1,
        }}>
        {renderBody()}
      </View>
      <Modal
        visible={openModal}
        transparent={true}
        onRequestClose={() => {
          setOpenModal(false);
        }}>
        <View style={styles.modalBackground}>
          <View
            style={{
              width: '90%',
              backgroundColor: COLORS.white,
              paddingHorizontal: 20,
              alignSelf: 'center',
              height: RFValue(200),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: RFValue(10),
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Previeew', {
                  psData: 'طلب معاينه',
                });
                setOpenModal(false);
              }}
              style={{
                width: '100%',
                padding: RFValue(10),
                borderRadius: RFValue(50),
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <Text style={styles.heading}>طلب معاينه</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Previeew', {
                  psData: 'طلب صيانه',
                });
                setOpenModal(false);
              }}
              style={{
                width: '100%',
                padding: RFValue(10),
                borderRadius: RFValue(50),
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.heading}>طلب صيانه</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={model2}
        transparent={true}
        onRequestClose={() => {
          setModel2(false);
        }}>
        <View style={styles.modalBackground}>
          <View
            style={{
              width: '90%',
              backgroundColor: COLORS.white,
              // paddingHorizontal: 20,
              alignSelf: 'center',
              padding: RFValue(20),
              // height: RFValue(200),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: RFValue(10),
            }}>
            <TouchableOpacity
              style={{
                width: '100%',
                padding: RFValue(10),
                borderRadius: RFValue(50),
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <Text style={styles.heading}>
                {' '}
                توصيف قدرة الطلمبةوالموتور فقط
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '100%',
                padding: RFValue(10),
                borderRadius: RFValue(50),
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: RFValue(20),
              }}>
              <Text style={styles.heading}> عرض السعر</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Contact');
                setModel2(false);
              }}
              style={{
                width: '100%',
                padding: RFValue(10),
                borderRadius: RFValue(50),
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <Text style={styles.heading}> تواصل مع الشركه</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.primary,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: COLORS.third,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    ...FONTS.h3,

    textAlign: 'right',
    color: COLORS.black,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    alignSelf: 'center',
  },
  image: {
    width: RFValue(100),
    height: RFValue(100),
    marginRight: RFValue(10),
    marginBottom: RFValue(10),
  },
  heading: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    // marginTop: RFValue(10),
    color: COLORS.white,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContainer: {
    width: '50%',
    backgroundColor: 'white', 
    padding: 20,
    borderRadius: 10, 
  },
});
export default Requirement;

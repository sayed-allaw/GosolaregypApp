import React, {useState, useEffect} from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../../constants';
import DropDownPicker from 'react-native-dropdown-picker';

import {RFValue} from 'react-native-responsive-fontsize';
import {Image} from 'react-native-animatable';
import {Header} from '../../../components';

function SelectDevice({route, navigation}) {
  items = [
    {label: 'تلفزيون', value: 'تلفزيون'},
    {label: 'ريسيفر', value: 'ريسيفر'},
    {label: 'لمبات', value: 'لمبات'},
    {label: 'كشافات', value: 'كشافات'},
    {label: 'مروحة', value: 'مروحة'},
    {label: 'ثلاجة', value: 'ثلاجة'},
    {label: 'غسالة', value: 'غسالة'},
    {label: 'سخان ماء', value: 'سخان ماء'},
  ];
  //  item1
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  //   item2
  const [selectedItem2, setSelectedItem2] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [pickerItems, setPickerItems] = useState(items);
  const [pickerItems2, setPickerItems2] = useState(items);

  const [openModal, setOpenModal] = useState(false);
  const [capacity, setCapacity] = useState('');
  const [capacity2, setCapacity2] = useState('');

  const [numDevices, setNumDevices] = useState('');
  const [numDevices2, setNumDevices2] = useState('');

  const [devicesOn, setDevicesOn] = useState('');
  const [devicesOn2, setDevicesOn2] = useState('');

  const [nightHours, setNightHours] = useState('');
  const [nightHours2, setNightHours2] = useState('');

  const [total, setTotal] = useState(0);
  const [total2, setTotal2] = useState(0);

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const [ArrTotal, setArrTotal] = useState(0);
  const [ArrTotal2, setArrTotal2] = useState(0);

  const [TotalCapacity, setTotalCapacity] = useState(0);
  const [TotalCapacity2, setTotalCapacity2] = useState(0);

  const handleValueChange = item => {
    setValue(item);
    setSelectedItem(item);
    setSelectedDrop('نموذج 1');
    setOpenModal(true);
  };
  const handleValueChange2 = item => {
    setValue2(item);
    setSelectedItem2(item);
    setSelectedDrop('نموذج 2');

    setOpenModal(true);
  };

  const [selectedDrop, setSelectedDrop] = useState('');
  const handleSave = () => {
    if (capacity && numDevices && devicesOn && nightHours) {
      const calculatedTotal =
        (parseFloat(devicesOn) + parseFloat(nightHours)) *
        parseFloat(numDevices) *
        parseFloat(capacity);
      if (!isNaN(calculatedTotal)) {
        let element = {
          itemName: selectedItem,
          itemTotal: calculatedTotal,
        };

        if (!data.some(item => item.itemName === selectedItem)) {
          setData(prevData => [...prevData, element]);
          console.log(data);
          setCapacity('');
          setDevicesOn('');
          setNightHours('');
          setNumDevices('');

          const sum = data.reduce((acc, item) => acc + item.itemTotal, 0);
          setArrTotal(sum + calculatedTotal);
          setTotalCapacity(((sum + calculatedTotal) / 4.05).toFixed(3));
        } else {
          console.warn('Item already exists in the list');
        }
      } else {
        console.error('Invalid input values');
      }
    } else {
      console.error('Empty input fields');
    }
    setOpenModal(false);
  };

  const handleSave2 = () => {
    if (capacity2 && numDevices2 && devicesOn2 && nightHours2) {
      const Totalcalculated =
        (parseFloat(devicesOn2) + parseFloat(nightHours2)) *
        parseFloat(numDevices2) *
        parseFloat(capacity2);
      if (!isNaN(Totalcalculated)) {
        let element = {
          itemName: selectedItem2,
          itemTotal: Totalcalculated,
        };

        if (!data2.some(item => item.itemName === selectedItem2)) {
          setData2(prevData => [...prevData, element]);
          setCapacity2('');
          setDevicesOn2('');
          setNightHours2('');
          setNumDevices2('');

          const sum = data2.reduce((acc, item) => acc + item.itemTotal, 0);
          setArrTotal2(sum + Totalcalculated);
          setTotalCapacity2(((sum + Totalcalculated) / 4.05).toFixed(3));
        } else {
          console.warn('Item already exists in the list');
        }
      } else {
        console.error('Invalid input values');
      }
    } else {
      console.error('Empty input fields');
    }
    setOpenModal(false);
  };
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          //   borderWidth: 1,
        }}>
        <View
          style={
            {
              // borderWidth: 1,
            }
          }>
          <DropDownPicker
            open={open}
            value={value}
            items={pickerItems}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setPickerItems}
            placeholder={'نموذج 1 اسطبل /ستوديو / منزل'}
            placeholderStyle={{
              color: COLORS.primary,
              fontWeight: '900',
            }}
            style={{color: COLORS.primary}}
            containerStyle={{
              width: RFValue(300),
              alignSelf: 'center',
              marginTop: RFValue(60),
              zIndex: 1000, 
            }}
            dropDownMaxHeight={200}
            selectedItemContainerStyle={{backgroundColor: COLORS.primary}}
            onChangeValue={handleValueChange}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.length > 0 ? (
              <View
                style={{
                  maxWidth: RFValue(300),
                  padding: RFValue(25),
                  backgroundColor: COLORS.primary,
                  borderRadius: RFValue(30),
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  marginTop: open ? RFValue(200) : RFValue(50),
                  marginLeft: SIZES.padding,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: RFValue(15),
                    borderBottomWidth: 1,
                    borderColor: COLORS.primaryLite,
                    paddingBottom: RFValue(10),
                  }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.body4,
                    }}>
                    اسم الجهاز
                  </Text>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.body4,
                    }}>
                    اجمالى عدد الألواح{' '}
                  </Text>
                </View>
                {data.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: RFValue(20),
                      borderBottomWidth: 1,
                      borderColor: COLORS.white,
                      paddingBottom: RFValue(10),
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.body3,
                      }}>
                      {item.itemName}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.body3,
                      }}>
                      {item.itemTotal}
                    </Text>
                  </View>
                ))}
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.white,
                    borderRadius: RFValue(10),
                    padding: RFValue(10),
                    paddingBottom: RFValue(10),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: RFValue(15),
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.body4,
                        maxWidth: RFValue(120),
                      }}>
                      اجمالى عدد الألواح{' '}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.body4,
                        maxWidth: RFValue(100),
                      }}>
                      {ArrTotal}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.body4,
                        maxWidth: RFValue(200),
                      }}>
                      اجمالى القدرة المستخدمة{' '}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.body4,
                        maxWidth: RFValue(100),
                      }}>
                      {TotalCapacity}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <>
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.primary,
                    marginTop: RFValue(50),
                    alignSelf: 'center',
                  }}>
                  لا يوجد عناصر
                </Text>
              </>
            )}
          </ScrollView>
        </View>
        <View
          style={{
            // borderWidth: 1,
            borderColor: COLORS.bag10Bg,
            marginTop: RFValue(50),
          }}>
          <DropDownPicker
            open={open2}
            value={value2}
            items={pickerItems}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setPickerItems2}
            placeholder={'نموذج 2 استراحه صغيره'}
            placeholderStyle={{
              color: COLORS.primary,
              fontWeight: '900',
            }}
            style={{color: COLORS.primary}}
            containerStyle={{
              width: RFValue(300),
              alignSelf: 'center',
              marginTop: RFValue(60),
              zIndex: 1000, 
            }}
            dropDownMaxHeight={200}
            selectedItemContainerStyle={{backgroundColor: COLORS.primary}}
            onChangeValue={handleValueChange2}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {data2.length > 0 ? (
              <View
                style={{
                  maxWidth: RFValue(300),
                  padding: RFValue(25),
                  backgroundColor: COLORS.primary,
                  borderRadius: RFValue(30),
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  marginTop: open2 ? RFValue(200) : RFValue(50),
                  marginLeft: SIZES.padding,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: RFValue(15),
                    borderBottomWidth: 1,
                    borderColor: COLORS.primaryLite,
                    paddingBottom: RFValue(10),
                  }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.body4,
                    }}>
                    اسم الجهاز
                  </Text>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.body4,
                    }}>
                    اجمالى عدد الألواح{' '}
                  </Text>
                </View>
                {data2.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: RFValue(20),
                      borderBottomWidth: 1,
                      borderColor: COLORS.white,
                      paddingBottom: RFValue(10),
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.body3,
                      }}>
                      {item.itemName}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.body3,
                      }}>
                      {item.itemTotal}
                    </Text>
                  </View>
                ))}
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.white,
                    borderRadius: RFValue(10),
                    padding: RFValue(10),
                    paddingBottom: RFValue(10),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: RFValue(15),
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.body4,
                        maxWidth: RFValue(120),
                      }}>
                      اجمالى عدد الألواح{' '}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.body4,
                        maxWidth: RFValue(100),
                      }}>
                      {ArrTotal2}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.body4,
                        maxWidth: RFValue(200),
                      }}>
                      اجمالى القدرة المستخدمة{' '}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.body4,
                        maxWidth: RFValue(100),
                      }}>
                      {TotalCapacity2}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <>
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.primary,
                    marginTop: RFValue(50),
                    marginBottom: RFValue(60),
                    alignSelf: 'center',
                  }}>
                  لا يوجد عناصر
                </Text>
              </>
            )}
          </ScrollView>
        </View>
        <Modal
          visible={openModal}
          animationType="fade"
          onRequestClose={() => {
            setOpenModal(false);
          }}>
          <SafeAreaView
            style={{
              height: RFValue(70),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.primary,
            }}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body3,
              }}>
              تفاصيل الجهاز{' '}
            </Text>
          </SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.white,
                marginTop: RFValue(100),
              }}>
              <View
                style={{
                  width: RFValue(300),
                  padding: RFValue(25),
                  backgroundColor: COLORS.primary,
                  borderRadius: RFValue(30),
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                }}>
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
                    color: COLORS.third,
                  }}
                  placeholder="قدره الجهاز.."
                  placeholderTextColor={COLORS.gray2}
                  keyboardType="numeric"
                  onChangeText={val => {
                    if (selectedDrop === 'نموذج 1') {
                      setCapacity(val);
                    } else {
                      setCapacity2(val);
                    }
                  }}
                />
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
                    color: COLORS.third,
                  }}
                  placeholder="عدد كل جهاز.."
                  placeholderTextColor={COLORS.gray2}
                  keyboardType="numeric"
                  onChangeText={val => {
                    if (selectedDrop === 'نموذج 1') {
                      setNumDevices(val);
                    } else {
                      setNumDevices2(val);
                    }
                  }}
                />
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
                    color: COLORS.third,
                  }}
                  placeholder="عدد الساعات المراد بها تشغيل الأجهزة.."
                  placeholderTextColor={COLORS.gray2}
                  keyboardType="numeric"
                  onChangeText={val => {
                    if (selectedDrop === 'نموذج 1') {
                      setDevicesOn(val);
                    } else {
                      setDevicesOn2(val);
                    }
                  }}
                />
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
                    color: COLORS.third,
                  }}
                  placeholder="عدد ساعات التشغيل الليلي.."
                  placeholderTextColor={COLORS.gray2}
                  keyboardType="numeric"
                  onChangeText={val => {
                    if (selectedDrop === 'نموذج 1') {
                      setNightHours(val);
                    } else {
                      setNightHours2(val);
                    }
                  }}
                />
                <TouchableOpacity
                  style={{
                    paddingHorizontal: RFValue(25),
                    backgroundColor: COLORS.white,
                    borderRadius: RFValue(40),
                    maxWidth: RFValue(100),
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    height: RFValue(35),
                  }}
                  onPress={() => {
                    // Check which dropdown item is selected
                    if (selectedDrop === 'نموذج 1') {
                      console.log('save 1');

                      handleSave();
                    } else if (selectedDrop === 'نموذج 2') {
                      console.log('save 2');
                      handleSave2();
                    } else {
                      console.warn('No dropdown item selected');
                    }
                  }}
                  //   onPress={handleSave}
                >
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.primary,
                    }}>
                    حفظ
                  </Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </ScrollView>
        </Modal>
      </SafeAreaView>
    </>
  );
}

export default SelectDevice;

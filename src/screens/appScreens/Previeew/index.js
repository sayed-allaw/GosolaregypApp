import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SIZES, FONTS, icons } from '../../../constants';
import { Header, IconButton } from '../../../components';
import { RFValue } from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';
import utils from '../../../utils';

const Previeew = ({ navigation, route }) => {
  const { psData } = route.params;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  function renderHeader() {
    return (
      <Header
        title={psData}
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
              borderWidth: 1,
              borderRadius: SIZES.radius,
              borderColor: COLORS.gray2,
            }}
            iconStyle={{ width: 20, height: 20 }}
            onPress={() => navigation.goBack()}
          />
        }
        leftComponent={<View style={{ width: 40 }} />}
      />
    );
  }

  const send = async () => {
    if (!name || !phone || !email || !address) {
      utils.toastAlert('error', 'يرجى ملء جميع الحقول');
      return;
    }

    setLoading(true);
    try {
      await firestore().collection('requests').add({
        name: name,
        phone: phone,
        email: email,
        location: address,
        service_id: '',
        sub_services_id: '',
        is_preview: psData === 'طلب معاينه' ? 0 : 1,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      utils.toastAlert('success', 'تم تقديم الطلب بنجاح');
      navigation.goBack();
    } catch (error) {
      console.error('Error submitting request:', error);
      utils.toastAlert('error', 'حدث خطأ أثناء تقديم الطلب');
    }
    setLoading(false);
  };

  function renderBody() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>الاسم:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="أدخل الاسم"
            placeholderTextColor={COLORS.gray}
            onChangeText={setName}
          />
        </View>

        <Text style={styles.label}>الموقع:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="أدخل الموقع"
            placeholderTextColor={COLORS.gray}
            onChangeText={setAddress}
          />
        </View>

        <Text style={styles.label}>رقم الهاتف:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="أدخل رقم الهاتف"
            placeholderTextColor={COLORS.gray}
            keyboardType="phone-pad"
            onChangeText={setPhone}
          />
        </View>

        <Text style={styles.label}>البريد الإلكتروني:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="أدخل البريد الإلكتروني"
            placeholderTextColor={COLORS.gray}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </View>

        <TouchableOpacity onPress={send} style={styles.button}>
          <Text style={styles.heading}>
            {loading ? <ActivityIndicator size={35} /> : 'إرسال الطلب'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {renderHeader()}
      {renderBody()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: COLORS.third,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    height: 55,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    marginVertical: SIZES.radius,
    width: '100%',
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    ...FONTS.h3,
    textAlign: 'right',
    color: COLORS.black,
  },
  button: {
    width: '100%',
    padding: RFValue(10),
    borderRadius: RFValue(50),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RFValue(40),
  },
  heading: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default Previeew;

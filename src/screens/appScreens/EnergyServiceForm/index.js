import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import { Header, IconButton, TextButton } from '../../../components';
import { COLORS, SIZES, icons, FONTS } from '../../../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import utils from '../../../utils';

const EnergyServiceForm = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const { psData } = route.params;

  const handleSubmit = () => {
    if (!name || !phone || !email) {
      utils.toastAlert('error', 'يرجى ملء جميع الحقول الأساسية (الاسم، الهاتف، الإيميل)');
      return;
    }

    const recipientEmail = 'santaallaw@gmail.com';
    const subject = 'طلب خدمة الطاقة من ' + name;
    const body = `الاسم: ${name}\nرقم الهاتف: ${phone}\nالبريد الإلكتروني: ${email}\nالعنوان: ${address || 'غير محدد'}\nالخدمة: ${psData?.name || 'غير محدد'}`;

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoLink)
      .then(() => {
        utils.toastAlert('success', 'تم فتح الإيميل لإرسال الطلب');
        navigation.goBack();
      })
      .catch(error => {
        utils.toastAlert('error', 'حدث خطأ أثناء فتح الإيميل');
        console.error('Error opening email:', error);
      });
  };

  function renderHeader() {
    return (
      <Header
        title={'طلب خدمة الطاقة'}
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

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {renderHeader()}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>طلب خدمة الطاقة</Text>

        <Text style={styles.label}>الاسم:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="أدخل الاسم"
            placeholderTextColor={COLORS.black}
            value={name}
            onChangeText={setName}
          />
        </View>

        <Text style={styles.label}>رقم الهاتف:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="أدخل رقم الهاتف"
            placeholderTextColor={COLORS.black}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <Text style={styles.label}>البريد الإلكتروني:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="أدخل البريد الإلكتروني"
            placeholderTextColor={COLORS.black}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Text style={styles.label}>العنوان:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="أدخل العنوان "
            placeholderTextColor={COLORS.black}
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <TextButton
          label="إرسال"
          onPress={handleSubmit}
          buttonContainerStyle={styles.button}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
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
    padding: RFValue(10),
    borderRadius: RFValue(50),
    marginBottom: SIZES.padding * 2,
    marginTop: 20,
    width: '80%',
  },
});

export default EnergyServiceForm;
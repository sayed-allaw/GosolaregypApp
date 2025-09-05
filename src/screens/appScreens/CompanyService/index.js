import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  Modal,
  TextInput,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import { FormInput, Header, TextIconButton } from '../../../components';
import { COLORS, FONTS, icons, images, SIZES, lotties } from '../../../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Animatable from 'react-native-animatable';
import NetInfo from '@react-native-community/netinfo';
import AnimatedLottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

// استيراد Firebase Firestore ودواله
import { db } from '../../../config/firebaseConfig'; // **تأكد من المسار الصحيح لملف الإعداد بتاع Firebase**
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';

const CompanyService = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [connection_Status, setConnection_Status] = useState(true);

  // حالة للتحكم في ظهور مودال تسجيل/عرض بيانات الشركة التفصيلية
  const [showCompanyDetailsModal, setShowCompanyDetailsModal] = useState(false);
  // حالة للتحكم في ظهور مودال التسجيل الأولي فقط (للمستخدمين الجدد)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [clientNumber, setClientNumber] = useState('');
  const [commercialRegister, setCommercialRegister] = useState('');

  const [companyDocId, setCompanyDocId] = useState(null); // Firestore Document ID
  const [isApproved, setIsApproved] = useState(false);
  const [hasCompanyRegisteredWithFirestore, setHasCompanyRegisteredWithFirestore] = useState(false);

  const [myOptions, setMyOptions] = useState([
    { id: 1, name: 'الأفراد', image: images.persons },
    { id: 2, name: 'الشركات', image: images.company },
    { id: 5, name: 'محطات شحن السيارات الكهربية', image: images.SolarRechargeStation },
  ]);

  useEffect(() => {
    setLoading(true);
    NetInfo.addEventListener(state => {
      setConnection_Status(state.isInternetReachable);
      setLoading(false);
    });
    checkCompanyDataAndApprovalStatus();
  }, []);

  const checkCompanyDataAndApprovalStatus = async () => {
    try {
      setLoading(true); // إعادة تعيين حالة التحميل
      const savedDocId = await AsyncStorage.getItem('companyDocId');

      if (savedDocId) {
        setCompanyDocId(savedDocId);
        setHasCompanyRegisteredWithFirestore(true);

        const companyRef = doc(db, 'companies', savedDocId);
        const companySnap = await getDoc(companyRef);

        if (companySnap.exists()) {
          const data = companySnap.data();
          setCompanyName(data.companyName || '');
          setClientNumber(data.clientNumber || '');
          setCommercialRegister(data.commercialRegister || '');
          setIsApproved(data.isApproved || false);

          if (data.isApproved) {
            Toast.show({ type: 'success', text1: 'تمت الموافقة على شركتك.' });
          } else {
            Toast.show({ type: 'info', text1: 'شركتك بانتظار الموافقة من المسؤول.' });
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'بيانات شركتك غير موجودة في السجل.',
            text2: 'يرجى إعادة التسجيل.',
          });
          clearLocalCompanyData();
        }
      } else {
        setHasCompanyRegisteredWithFirestore(false);
        setIsApproved(false);
        setCompanyName('');
        setClientNumber('');
        setCommercialRegister('');
      }
    } catch (error) {
      console.error('Error checking company data from Firestore:', error);
      Toast.show({
        type: 'error',
        text1: 'حدث خطأ أثناء الاتصال بالخادم.',
      });
    } finally {
      setLoading(false);
    }
  };

  const registerCompanyDataToFirestore = async () => {
    if (!companyName || !clientNumber) {
      Toast.show({ type: 'error', text1: 'يرجى إدخال اسم الشركة ورقم العميل' });
      return;
    }

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'companies'), {
        companyName,
        clientNumber,
        commercialRegister: commercialRegister || '',
        isApproved: false,
        timestamp: new Date(),
      });

      await AsyncStorage.setItem('companyDocId', docRef.id);
      await AsyncStorage.setItem('companyName', companyName);
      await AsyncStorage.setItem('clientNumber', clientNumber);
      if (commercialRegister) {
        await AsyncStorage.setItem('commercialRegister', commercialRegister);
      } else {
        await AsyncStorage.removeItem('commercialRegister');
      }

      setCompanyDocId(docRef.id);
      setHasCompanyRegisteredWithFirestore(true);
      setIsApproved(false);

      Toast.show({
        type: 'success',
        text1: 'تم إرسال بيانات شركتك بنجاح!',
        text2: 'الخدمات ستتفعل بعد موافقة المسؤول.',
      });
      setShowRegistrationModal(false); 
      setShowCompanyDetailsModal(true); 
    } catch (error) {
      console.error('Error adding document to Firestore:', error);
      Toast.show({
        type: 'error',
        text1: 'حدث خطأ أثناء إرسال البيانات.',
        text2: 'الرجاء التحقق من اتصال الإنترنت وقواعد أمان Firestore.',
      });
    } finally {
      setLoading(false);
    }
  };

  
  const updateCompanyDataInFirestore = async () => {
    if (!companyDocId) {
      Toast.show({ type: 'error', text1: 'لا يوجد بيانات شركة للتحديث.' });
      return;
    }

    setLoading(true);
    try {
      const companyRef = doc(db, 'companies', companyDocId);
      await updateDoc(companyRef, {
        companyName,
        clientNumber,
        commercialRegister: commercialRegister || '',
      });

      await AsyncStorage.setItem('companyName', companyName);
      await AsyncStorage.setItem('clientNumber', clientNumber);
      if (commercialRegister) {
        await AsyncStorage.setItem('commercialRegister', commercialRegister);
      } else {
        await AsyncStorage.removeItem('commercialRegister');
      }

      Toast.show({ type: 'success', text1: 'تم تحديث البيانات بنجاح.' });
      setShowCompanyDetailsModal(false); 
      await checkCompanyDataAndApprovalStatus(); 
    } catch (error) {
      console.error('Error updating document in Firestore:', error);
      Toast.show({
        type: 'error',
        text1: 'فشل تحديث البيانات.',
        text2: 'قد تكون الصلاحيات لا تسمح بالتعديل.',
      });
    } finally {
      setLoading(false);
    }
  };


  const clearLocalCompanyData = async () => {
    try {
      await AsyncStorage.removeItem('companyDocId');
      await AsyncStorage.removeItem('companyName');
      await AsyncStorage.removeItem('clientNumber');
      await AsyncStorage.removeItem('commercialRegister');
      setCompanyDocId(null);
      setCompanyName('');
      setClientNumber('');
      setCommercialRegister('');
      setIsApproved(false);
      setHasCompanyRegisteredWithFirestore(false);
      Toast.show({
        type: 'info',
        text1: 'تم مسح البيانات المحلية.',
        text2: 'يمكنك الآن تسجيل شركة جديدة.',
      });
      setShowCompanyDetailsModal(false); 
    } catch (error) {
      console.error('Error clearing local company data:', error);
    }
  };

  function renderHeader() {
    return (
      <Header
        title={'الخدمات'}
        containerStyle={{ height: RFValue(65) }}
        twoRight={true}
        fill={true}
      />
    );
  }

  function renderMyFuel() {
    return (
      <View style={{ paddingBottom: SIZES.padding * 4 }}>
        {myOptions.map((item, index) => {
          return (
            <Animatable.View
              key={item.id}
              delay={index * 100}
              animation={'fadeInUp'}
              useNativeDriver>
              <TouchableOpacity
                style={{
                  height: RFValue(250),
                  marginTop: SIZES.radius,
                  borderWidth: 2,
                  borderRadius: SIZES.radius + 2,
                  borderColor: COLORS.primary,
                }}
                onPress={() => {
                  if (item.id === 2) {
                    if (hasCompanyRegisteredWithFirestore) {
                      if (isApproved) {
                        navigation.navigate('PersonsService', {
                          type: 2,
                          service: 'الشركات',
                          service_id: 2,
                          companyData: { companyName, clientNumber, commercialRegister, companyDocId },
                        });
                      } else {
                        Alert.alert(
                          "خدمة الشركات",
                          "بيانات شركتك بانتظار الموافقة من المسؤول.",
                          [
                            { text: "فهمت", style: "cancel" }, 
                            { text: "التحقق الآن", onPress: () => {
                                setShowCompanyDetailsModal(true); 
                                checkCompanyDataAndApprovalStatus();
                            }},
                          ]
                        );
                      }
                    } else {
                      setShowRegistrationModal(true);
                    }
                  } else if (index === myOptions.length - 1) {
                    navigation.navigate('ElecrticChargeStation', {
                      psData: item,
                    });
                  } else {
                    navigation.navigate('PersonsService', {
                      type: index + 1,
                      service: item.name,
                      service_id: item.id,
                    });
                  }
                  console.log(item.name);
                }}>
                <ImageBackground
                  source={item.image}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: SIZES.padding,
                  }}
                  resizeMode="cover"
                  borderRadius={SIZES.radius}>
                  <Text
                    style={{
                      ...FONTS.h2,
                      textAlign: 'center',
                      color: COLORS.white,
                    }}>
                    {item.name}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </Animatable.View>
          );
        })}
      </View>
    );
  }

  function LoadComponent() { /* ... نفس الكود ... */ }
  function NoInternet() { /* ... نفس الكود ... */ }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {renderHeader()}
      {connection_Status ? (
        <>
          {loading ? (
            LoadComponent()
          ) : (
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                marginTop: SIZES.radius,
                paddingHorizontal: SIZES.padding,
                paddingBottom: SIZES.radius,
              }}
              showsVerticalScrollIndicator={false}>
              {renderMyFuel()}
            </ScrollView>
          )}
        </>
      ) : (
        NoInternet()
      )}

      <Modal
        visible={showRegistrationModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRegistrationModal(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>تسجيل بيانات الشركات</Text>
            <TextInput
              style={styles.input}
              placeholder="اسم الشركة"
              placeholderTextColor={COLORS.gray}
              value={companyName}
              onChangeText={setCompanyName}
            />
            <TextInput
              style={styles.input}
              placeholder="رقم العميل"
              placeholderTextColor={COLORS.gray}
              value={clientNumber}
              onChangeText={setClientNumber}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="السجل التجاري (اختياري)"
              placeholderTextColor={COLORS.gray}
              value={commercialRegister}
              onChangeText={setCommercialRegister}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={registerCompanyDataToFirestore}>
              <Text style={styles.submitButtonText}>تسجيل الشركة</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cancelButton, { marginTop: SIZES.base }]}
              onPress={() => setShowRegistrationModal(false)}>
              <Text style={styles.cancelButtonText}>إلغاء</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showCompanyDetailsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCompanyDetailsModal(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>بيانات شركتك</Text>
            <Text style={styles.displayField}>
              <Text style={styles.fieldLabel}>اسم الشركة:</Text> {companyName}
            </Text>
            <Text style={styles.displayField}>
              <Text style={styles.fieldLabel}>رقم العميل:</Text> {clientNumber}
            </Text>
            {commercialRegister ? (
              <Text style={styles.displayField}>
                <Text style={styles.fieldLabel}>السجل التجاري:</Text> {commercialRegister}
              </Text>
            ) : null}
            {isApproved ? (
              <Text style={[styles.displayField, { color: COLORS.success, ...FONTS.h3 }]}>
                ✔️ تمت الموافقة على شركتك.
              </Text>
            ) : (
              <Text style={[styles.displayField, { color: COLORS.error, ...FONTS.h3 }]}>
                ⚠️ بانتظار الموافقة من المسؤول.
              </Text>
            )}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={checkCompanyDataAndApprovalStatus}>
              <Text style={styles.submitButtonText}>تحديث حالة الموافقة</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cancelButton, { marginTop: SIZES.base }]}
              onPress={clearLocalCompanyData}>
              <Text style={styles.cancelButtonText}>مسح البيانات المحلية</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cancelButton, { marginTop: SIZES.base }]}
              onPress={() => setShowCompanyDetailsModal(false)}>
              <Text style={styles.cancelButtonText}>إغلاق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  modalTitle: {
    ...FONTS.h2,
    color: COLORS.primary,
    marginBottom: SIZES.padding,
  },
  input: {
    width: '100%',
    height: RFValue(50),
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
    ...FONTS.body3,
    color: COLORS.black,
    textAlign: 'right',
  },
  displayField: {
    width: '100%',
    paddingVertical: RFValue(5),
    textAlign: 'right',
    ...FONTS.body3,
    color: COLORS.black,
    marginBottom: SIZES.base / 2,
  },
  fieldLabel: {
    ...FONTS.h4,
    color: COLORS.darkGray,
  },
  submitButton: {
    width: '100%',
    padding: RFValue(10),
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  submitButtonText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  cancelButton: {
    width: '100%',
    padding: RFValue(10),
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.gray,
    alignItems: 'center',
  },
  cancelButtonText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
});

export default CompanyService;
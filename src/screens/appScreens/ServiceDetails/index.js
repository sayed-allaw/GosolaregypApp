import React, { useState } from 'react';
import { 
    View, 
    Text, 
    Image, 
    ScrollView, 
    TouchableOpacity, 
    StyleSheet, 
    Linking, 
    Alert,
    Modal,
    TextInput 
} from 'react-native';
import { COLORS, SIZES, icons, FONTS } from '../../../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { SharedElement } from 'react-navigation-shared-element';
import { IconButton, TextButton } from '../../../components';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DocumentPicker from 'react-native-document-picker';

const ServiceDetails = ({ navigation, route }) => {
    const { psData, mainService } = route.params;

    const [showBenefits, setShowBenefits] = useState(false);
    const [showrequire, setShowrequire] = useState(false);
    const [cvFile, setCvFile] = useState(null);

    const [isQuestionModalVisible, setQuestionModalVisible] = useState(false);
    const [isMotorModalVisible, setMotorModalVisible] = useState(false);
    const [motorPower, setMotorPower] = useState('');
    const [isResultModalVisible, setIsResultModalVisible] = useState(false);
    const [calculatedStationPower, setCalculatedStationPower] = useState(null);

    const pickCV = async () => {
        try {
            const res = await DocumentPicker.pick({ type: [DocumentPicker.types.pdf] });
            setCvFile(res[0]);
            sendCVEmail(res[0]);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.log('Error picking CV:', err);
            }
        }
    };

    const sendCVEmail = (file) => {
        const email = 'your-email@gmail.com';
        const subject = 'CV Upload from User';
        const body = 'Attached is the CV uploaded by the user.';
        const fileUri = file.uri;
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&attachment=${fileUri}`;
        Linking.openURL(mailtoLink).catch(err => console.log('Error opening email app:', err));
    };

    const handleMotorPowerSubmit = () => {
        const powerInHp = parseFloat(motorPower);
        if (isNaN(powerInHp) || powerInHp <= 0) {
            Alert.alert("خطأ", "يرجى إدخال قدرة الماتور كرقم صحيح.");
            return;
        }
        const stationPower = powerInHp * 0.746 * 1.3;
        setCalculatedStationPower(stationPower);
        setMotorModalVisible(false);
        setIsResultModalVisible(true);
        setMotorPower('');
    };
    
    const handleRequirementsPress = () => {
        if (psData.name === 'أنظمة الرى بالطاقة الشمسيه') {
            setQuestionModalVisible(true); 
        } else if (psData.name === 'خدمات التوظيف') {
            setShowrequire(!showrequire); 
        } else {
            navigation.navigate('Requirement', { title: psData.name });
        }
    };

    const ServiceComponent = ({ service }) => {
        return (
            <ScrollView style={styles.container}>
                <SharedElement id={`item.${psData.sub_services_id}.photo`} style={{ flex: 1 }}>
                    <Image source={service.image} style={styles.icon} />
                    <View style={styles.backButtonWrapper}>
                        <IconButton
                            icon={icons.back}
                            containerStyle={styles.backButtonContainer}
                            iconStyle={styles.backButtonIcon}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                </SharedElement>

                <View style={{ paddingHorizontal: SIZES.margin }}>
                    <Text style={styles.name}>{service.name}</Text>
                    <Text style={styles.description}>{service.description}</Text>

                    {service?.benefits?.length > 0 && (
                        <>
                            <TouchableOpacity onPress={() => setShowBenefits(!showBenefits)} style={styles.touchableSection}>
                                <SimpleLineIcons name={showBenefits ? 'arrow-down' : 'arrow-left'} size={RFValue(15)} color={COLORS.white} />
                                <Text style={styles.heading}>المميزات والخصائص</Text>
                            </TouchableOpacity>
                            {showBenefits && service.benefits.map((item, index) => (
                                <Text key={index} style={styles.content}>
                                    {index + 1 + ' - ' + item}
                                </Text>
                            ))}
                        </>
                    )}

                    {service?.requirements?.length > 0 && (
                        <TouchableOpacity onPress={handleRequirementsPress} style={styles.touchableSection}>
                            <SimpleLineIcons name={showrequire && service.name === 'خدمات التوظيف' ? 'arrow-down' : 'arrow-left'} size={RFValue(15)} color={COLORS.white} />
                            <Text style={styles.heading}>المتطلبات</Text>
                        </TouchableOpacity>
                    )}

                    {showrequire && service.name === 'خدمات التوظيف' && (
                        service.requirements.map((item, index) => (
                            <Text key={index} style={styles.content}>{index + 1 + ' - ' + item}</Text>
                        ))
                    )}
                    
                    {(service.name === 'خدمات الابار' || service.name === 'توريد جميع مكونات الطاقة الشمسية') && (
                        <View style={{ padding: 20, flex: 1 }}>
                            {Array.isArray(service.components) && service.components.map((component, index) => (
                                <View key={index} style={styles.componentContainer}>
                                    <Text style={styles.componentTitle}>{component.com_name}</Text>
                                    {component.comItems.map((item, itemIndex) => (
                                        <View key={itemIndex} style={styles.itemContainer}>
                                            <Text style={styles.itemName}>{item.itemName}</Text>
                                            {item.ItemTypes.map((type, typeIndex) => (
                                                <View key={typeIndex} style={styles.typeContainer}>
                                                    {type.watt ? (
                                                        <View style={styles.typeRow}><Text style={styles.typeLabel}>Watt:</Text><Text style={styles.itemType}>{type.watt}</Text></View>
                                                    ) : null}
                                                    {type.type ? (
                                                        <View style={styles.typeRow}><Text style={styles.typeLabel}>Type:</Text><Text style={styles.itemType}>{type.type}</Text></View>
                                                    ) : null}
                                                </View>
                                            ))}
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={() => {
                            if (service.name === 'صندوق زمالة الطاقة الشمسية') {
                                navigation.navigate('EnergyServiceForm', { serviceId: psData.sub_services_id });
                            } else if (service.name === 'خدمات التوظيف') {
                                pickCV();
                            } else {
                                navigation.navigate('Contact');
                            }
                        }}
                        style={styles.contactButton}>
                        <Text style={styles.heading}>
                            {service.name === 'صندوق زمالة الطاقة الشمسية' ? 'طلب إستفادة'
                                : service.name === 'خدمات التوظيف' ? 'رفع السيره الذاتيه'
                                : 'تواصل معنا'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Modal visible={isQuestionModalVisible} transparent={true} animationType="fade" onRequestClose={() => setQuestionModalVisible(false)}>
                <View style={styles.modalBackground}><View style={styles.modalView}><SimpleLineIcons name="energy" size={RFValue(40)} color={COLORS.primary} style={{marginBottom: RFValue(15)}} /><Text style={styles.questionModalTitle}>هل لديك مضخة مياه (ماتور) بالفعل؟</Text><Text style={styles.questionModalSubtitle}>أخبرنا لنتمكن من مساعدتك بشكل أفضل.</Text><View style={styles.questionButtonContainer}><TouchableOpacity style={[styles.questionModalButton, styles.yesButton]} onPress={() => { setQuestionModalVisible(false); setMotorModalVisible(true); }}><Text style={styles.yesButtonText}>نعم، لدي ماتور</Text></TouchableOpacity><TouchableOpacity style={[styles.questionModalButton, styles.noButton]} onPress={() => { setQuestionModalVisible(false); navigation.navigate('Requirement', { title: psData.name }); }}><Text style={styles.noButtonText}>لا، أحتاج للمساعدة</Text></TouchableOpacity></View></View></View>
            </Modal>
            <Modal visible={isMotorModalVisible} transparent={true} animationType="fade" onRequestClose={() => setMotorModalVisible(false)}>
                <View style={styles.modalBackground}><View style={styles.modalView}><Text style={styles.modalTitle}>إدخال قدرة الماتور</Text><TextInput style={styles.modalInput} placeholder="ادخل قدرة الماتور بالحصان" placeholderTextColor={COLORS.gray2} keyboardType="numeric" value={motorPower} onChangeText={setMotorPower} /><TouchableOpacity style={styles.modalButton} onPress={handleMotorPowerSubmit}><Text style={styles.heading}>حساب قدرة المحطة</Text></TouchableOpacity></View></View>
            </Modal>
            <Modal visible={isResultModalVisible} transparent={true} animationType="fade" onRequestClose={() => setIsResultModalVisible(false)}>
                <View style={styles.modalBackground}><View style={styles.modalView}><Text style={styles.modalTitle}>القدرة المطلوبة للمحطة</Text>{calculatedStationPower && (<View style={styles.resultContainer}><Text style={styles.resultText}>{'بناءً على قدرة الماتور، فإن قدرة المحطة الشمسية المطلوبة هي:'}</Text><Text style={styles.resultValue}>{calculatedStationPower.toFixed(2)}<Text style={styles.resultUnit}> كيلوواط</Text></Text></View>)}<TouchableOpacity style={styles.modalButton} onPress={() => { setIsResultModalVisible(false); navigation.navigate('Contact'); }}><Text style={styles.heading}>تواصل معنا للبدء</Text></TouchableOpacity></View></View>
            </Modal>

            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: SIZES.padding * 3 }}>
                <ServiceComponent key={psData?.id} service={psData} />
            </ScrollView>

            {psData?.benefits?.length > 0 || psData?.requirements?.length > 0 ? (
                <View style={styles.bottomSubmitContainer}><TextButton onPress={() => navigation.navigate('EnergyServiceForm', { psData: psData })} label={'تقديم'} buttonContainerStyle={styles.bottomSubmitButton} /></View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white },
    icon: { width: '100%', height: RFValue(200), resizeMode: 'cover', marginBottom: RFValue(20) },
    backButtonWrapper: { position: 'absolute', top: 0, padding: RFValue(10) },
    backButtonContainer: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: SIZES.radius, borderColor: COLORS.third },
    backButtonIcon: { width: 20, height: 20, tintColor: COLORS.third },
    name: { fontSize: RFValue(24), fontWeight: 'bold', marginBottom: RFValue(10), color: COLORS.black, textAlign: 'right' },
    description: { fontSize: RFValue(16), marginBottom: RFValue(10), color: COLORS.black, textAlign: 'right' },
    heading: { fontSize: RFValue(18), fontWeight: 'bold', color: COLORS.white },
    content: { fontSize: RFValue(16), marginTop: RFValue(5), marginBottom: RFValue(10), lineHeight: RFValue(24), color: COLORS.black, textAlign: 'right' },
    touchableSection: { width: '100%', padding: SIZES.base, backgroundColor: COLORS.primary, alignItems: 'center', borderRadius: RFValue(10), marginBottom: SIZES.margin, flexDirection: 'row-reverse', justifyContent: 'space-between' },
    contactButton: { width: '100%', padding: RFValue(10), borderRadius: RFValue(50), backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginTop: RFValue(20), alignSelf: 'center' },
    bottomSubmitContainer: { width: '100%', padding: RFValue(15), backgroundColor: COLORS.white, position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center' },
    bottomSubmitButton: { padding: SIZES.base, width: '60%', borderRadius: RFValue(50) },
    componentContainer: { marginBottom: RFValue(20) },
    componentTitle: { fontSize: RFValue(15), fontWeight: 'bold', color: COLORS.primary, marginBottom: RFValue(10), textAlign: 'right' },
    itemContainer: { borderRadius: RFValue(20), borderWidth: 1, borderColor: COLORS.primary, padding: RFValue(10), marginBottom: RFValue(10) },
    itemName: { fontSize: RFValue(16), fontWeight: '900', color: COLORS.primary, marginBottom: RFValue(5), textAlign: 'right' },
    typeContainer: { flexDirection: 'row', justifyContent: 'space-around', borderWidth: 1, borderColor: COLORS.primary, padding: RFValue(10), marginBottom: RFValue(10), borderRadius: RFValue(20) },
    typeRow: { flexDirection: 'row-reverse', maxWidth: RFValue(150) },
    typeLabel: { ...FONTS.body4, color: COLORS.black, marginLeft: RFValue(5) },
    itemType: { fontSize: RFValue(14), color: COLORS.black },

    // --- أنماط المودالات ---
    modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)' },
    modalView: { width: '90%', backgroundColor: COLORS.white, borderRadius: RFValue(15), padding: RFValue(20), alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
    modalTitle: { ...FONTS.h3, color: COLORS.black, marginBottom: RFValue(20) },
    modalInput: { width: '100%', height: 55, paddingHorizontal: SIZES.padding, borderRadius: SIZES.radius, backgroundColor: '#f5f5f5', textAlign: 'right', fontFamily: FONTS.fontFamily, fontSize: RFValue(14), color: COLORS.black, marginBottom: RFValue(20), borderWidth: 1, borderColor: COLORS.primary },
    modalButton: { width: '100%', padding: RFValue(12), borderRadius: RFValue(50), backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginTop: RFValue(10) },
    resultContainer: { alignItems: 'center', marginVertical: RFValue(15) },
    resultText: { ...FONTS.body4, color: COLORS.black, textAlign: 'center', marginBottom: RFValue(10) },
    resultValue: { fontSize: RFValue(32), color: COLORS.primary, fontWeight: 'bold' },
    resultUnit: { fontSize: RFValue(20), color: COLORS.primary, fontWeight: 'normal' },
    questionModalTitle: { fontSize: RFValue(18), fontWeight: 'bold', color: COLORS.black, textAlign: 'center' },
    questionModalSubtitle: { fontSize: RFValue(14), color: COLORS.gray, marginTop: RFValue(5), marginBottom: RFValue(25), textAlign: 'center' },
    questionButtonContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between' },
    questionModalButton: { flex: 1, paddingVertical: RFValue(12), borderRadius: RFValue(10), alignItems: 'center', justifyContent: 'center', marginHorizontal: RFValue(5) },
    yesButton: { backgroundColor: COLORS.primary },
    yesButtonText: { color: COLORS.white, fontSize: RFValue(15), fontWeight: 'bold' },
    noButton: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.primary },
    noButtonText: { color: COLORS.primary, fontSize: RFValue(15), fontWeight: 'bold' },
});

export default ServiceDetails;
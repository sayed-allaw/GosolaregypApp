import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Header} from '../../../components';
import {COLORS, FONTS, images, SIZES} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';

const companyData = {
  location: 'العبور، الحي التاسع، محافظة القليوبية، مصر',
  locationUrl: 'https://maps.app.goo.gl/JMuNPyiczQw9VHjk8', 
  phoneNumber: 'tel:+201024443678', 
  vision: [
    'تشكيل مستقبل مستدام بقيادة الطاقة الشمسية المبتكرة.',
    'تمكين المجتمعات بحلول صديقة للبيئة لأجيال مزدهرة.',
  ],
  goals: [
    'تصميم أنظمة طاقة شمسية متطورة وذات كفاءة عالية.',
    'خفض الانبعاثات الكربونية من خلال حلول طاقة نظيفة.',
    'تقديم تجربة عملاء متميزة تدعم التحول للطاقة المتجددة.',
    'المساهمة في تحقيق رؤية مصر للطاقة المستدامة.',
    'نشر الوعي بأهمية الطاقة الشمسية لمستقبل أفضل.',
  ],
};

const AboutCompany = ({navigation}) => {
  function renderHeader() {
    return (
      <Header
        title="عن الشركة"
        containerStyle={{
          height: RFValue(65),
          paddingHorizontal: SIZES.padding,
          paddingTop: SIZES.base,
        }}
        twoRight={true}
        fill={true}
      />
    );
  }

  function renderCompanyInfo() {
    return (
      <View style={styles.infoContainer}>
        <Image
          source={images.mainLogo}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>جو سولار</Text>
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => Linking.openURL(companyData.locationUrl)}
            activeOpacity={0.7}>
            <Icon
              name="location-on"
              size={RFValue(18)}
              color={COLORS.primary}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>الموقع</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => Linking.openURL(companyData.phoneNumber)}
            activeOpacity={0.7}>
            <Icon
              name="phone"
              size={RFValue(18)}
              color={COLORS.white}
              style={styles.icon}
            />
            <Text style={styles.buttonTextContact}>تواصل</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.locationText}>{companyData.location}</Text>

        <Text style={styles.sectionTitle}>الرؤية</Text>
        <Animatable.View animation="fadeIn" duration={800} useNativeDriver>
          <View style={styles.infoBox}>
            {companyData.vision.map((item, index) => (
              <Text key={index} style={styles.itemText}>
                {item}
              </Text>
            ))}
          </View>
        </Animatable.View>

        <Text style={styles.sectionTitle}>الأهداف</Text>
        <Animatable.View animation="fadeIn" duration={800} useNativeDriver>
          <View style={styles.infoBox}>
            {companyData.goals.map((goal, index) => (
              <Text key={index} style={styles.itemText}>
                {goal}
              </Text>
            ))}
          </View>
        </Animatable.View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {renderCompanyInfo()}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding * 4,
  },
  infoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: RFValue(80),
    height: RFValue(80),
    marginBottom: SIZES.base,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SIZES.base,
  },
  locationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    marginRight: SIZES.base / 2,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    marginLeft: SIZES.base / 2,
  },
  buttonText: {
    ...FONTS.h3,
    color: COLORS.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextContact: {
    ...FONTS.h3,
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  locationText: {
    ...FONTS.h3,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  sectionTitle: {
    ...FONTS.h2,
    color: COLORS.third,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: SIZES.margin,
  },
  infoBox: {
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.margin,
    width: '100%',
    minHeight: RFValue(50),
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  itemText: {
    ...FONTS.h3,
    color: COLORS.black,
    textAlign: 'right',
    lineHeight: RFValue(22),
    marginBottom: SIZES.base,
  },
  icon: {
    marginRight: SIZES.base,
  },
};

export default AboutCompany;
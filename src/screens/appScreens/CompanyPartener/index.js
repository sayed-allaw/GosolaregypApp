// import React from 'react';
// import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import { COLORS, SIZES, icons, images } from '../../../constants';
// import { Header, IconButton } from '../../../components';
// import { RFValue } from 'react-native-responsive-fontsize';

// // بيانات ثابتة مع 4 شركات داعمة لكل خدمة
// const staticData = [
//   {
//     id: 1,
//     adress: 'توريد جميع مكونات الطاقة الشمسية',
//     description:
//       'توفير وتوريد جميع المكونات الضرورية لصناعة الطاقة الشمسية، بما في ذلك الخلايا الشمسية والكابلات والإنفرترات والشاسيهات وجميع المستلزمات الأخرى.',
//     persons: [
//       {
//         id: 1,
//         name: 'شريك الطاقة 1',
//         image: 'https://th.bing.com/th/id/OIP.iqMHDFbfONAXLIBrimCNdQHaHa?rs=1&pid=ImgDetMain',
//         description: 'خلايا شمسية عالية الكفاءة وكابلات وإنفرترات ذات جودة.',
//       },
//       {
//         id: 2,
//         name: 'شريك الطاقة 2',
//         image: 'https://static.vecteezy.com/system/resources/previews/004/603/369/non_2x/tech-solar-logo-template-creative-solar-panel-energy-logo-design-concepts-vector.jpg',
//         description: 'حلول شاملة لتصميم وتركيب الأنظمة الشمسية.',
//       },
//       {
//         id: 3,
//         name: 'شريك الطاقة 3',
//         image: 'https://th.bing.com/th/id/OIP.APS71ZOENFZ1UtO-CQJcFgHaFT?w=680&h=487&rs=1&pid=ImgDetMain',
//         description: 'توريد شاسيهات معتمدة ومكونات إضافية.',
//       },
//       {
//         id: 4,
//         name: 'شريك الطاقة 4',
//         image: 'https://image.shutterstock.com/image-vector/solar-panel-energy-electric-electricity-260nw-1664934694.jpg',
//         description: 'دعم فني لتركيب مكونات الطاقة الشمسية.',
//       },
//     ],
//   },
//   {
//     id: 2,
//     adress: 'توريد معدات تصنيع الخلايا الشمسية',
//     description:
//       'توفير معدات عالية الجودة لصناعة خلايا الطاقة الشمسية، بما في ذلك خطوط الإنتاج والمعدات اللازمة.',
//     persons: [
//       {
//         id: 5,
//         name: 'شريك الطاقة 5',
//         image: 'https://th.bing.com/th/id/OIP.ynu69Y_3RaE6nOfaQfdKfAHaHa?w=2000&h=2000&rs=1&pid=ImgDetMain',
//         description: 'خطوط إنتاج متطورة لتصنيع الخلايا الشمسية.',
//       },
//       {
//         id: 6,
//         name: 'شريك الطاقة 6',
//         image: 'https://png.pngtree.com/png-vector/20220816/ourmid/pngtree-solar-power-logo-design-template-energize-your-brand-with-solar-tech-logos-vector-png-image_38416390.png',
//         description: 'معدات فعّالة لتحسين عمليات التصنيع.',
//       },
//       {
//         id: 7,
//         name: 'شريك الطاقة 7',
//         image: 'https://th.bing.com/th/id/OIP.B5VCcu6Qsws9poVIAsuSBAAAAA?w=400&h=400&rs=1&pid=ImgDetMain',
//         description: 'تقنيات حديثة لإنتاج الخلايا الشمسية.',
//       },
//       {
//         id: 8,
//         name: 'شريك الطاقة 8',
//         image: 'https://img.freepik.com/premium-vector/solar-energy-logo-designs-vector_559774-560.jpg?w=360',
//         description: 'دعم تصنيع الخلايا بجودة عالية.',
//       },
//     ],
//   },
//   {
//     id: 3,
//     adress: 'توريد مواد خام لصناعة الألواح الشمسية',
//     description:
//       'توفير المواد الخام الضرورية لإنتاج الألواح الشمسية، بما في ذلك السيليكون والزجاج الشمسي.',
//     persons: [
//       {
//         id: 9,
//         name: 'شريك الطاقة 9',
//         image: 'https://th.bing.com/th/id/OIP.8y8eRMVEVofTwZlWNrvghgAAAA?rs=1&pid=ImgDetMain',
//         description: 'سيليكون عالي النقاوة للألواح الشمسية.',
//       },
//       {
//         id: 10,
//         name: 'شريك الطاقة 10',
//         image: 'https://image.shutterstock.com/image-vector/colorful-solar-logo-vector-template-260nw-2079480187.jpg',
//         description: 'زجاج شمسي ذو جودة عالية للأداء المثالي.',
//       },
//       {
//         id: 11,
//         name: 'شريك الطاقة 11',
//         image: 'https://th.bing.com/th/id/OIP.8y8eRMVEVofTwZlWNrvghgAAAA?rs=1&pid=ImgDetMain',
//         description: 'مواد خام إضافية للألواح الشمسية.',
//       },
//       {
//         id: 12,
//         name: 'شريك الطاقة 12',
//         image: 'https://www.shutterstock.com/image-vector/creative-solar-energy-logo-design-260nw-1676985901.jpg',
//         description: 'توريد مواد مبتكرة للصناعة الشمسية.',
//       },
//     ],
//   },
// ];

// const CompanyPartener = ({ navigation }) => {
//   function renderHeader() {
//     return (
//       <Header
//         title={'شركاؤنا'}
//         containerStyle={{
//           height: RFValue(65),
//           alignItems: 'center',
//           paddingHorizontal: SIZES.base,
//           backgroundColor: COLORS.primary,
//           borderBottomLeftRadius: 20,
//           borderBottomRightRadius: 20,
//           elevation: 5,
//         }}
//         titleStyle={{ color: COLORS.white, fontSize: RFValue(22) }}
//         twoRight={true}
//         fill={true}
//         rightComponent={
//           <IconButton
//             icon={icons.back}
//             containerStyle={{
//               width: 40,
//               height: 40,
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: COLORS.white,
//               borderRadius: SIZES.radius,
//               elevation: 3,
//             }}
//             iconStyle={{
//               width: 20,
//               height: 20,
//               tintColor: COLORS.primary,
//             }}
//             onPress={() => navigation.goBack()}
//           />
//         }
//         leftComponent={<View style={{ width: 40 }} />}
//       />
//     );
//   }

//   return (
//     <>
//       {renderHeader()}
//       {staticData.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Text style={styles.emptyText}>لا توجد بيانات متاحة حاليًا</Text>
//         </View>
//       ) : (
//         <ScrollView style={styles.container}>
//           {staticData.map((service, index) => (
//             <Animatable.View
//               key={index}
//               animation="fadeInUp"
//               delay={index * 100}
//               style={[
//                 styles.card,
//                 {
//                   marginBottom:
//                     index === staticData.length - 1 ? RFValue(60) : RFValue(20),
//                 },
//               ]}
//             >
//               <Text style={styles.title}>
//                 {service.adress || 'عنوان غير متوفر'}
//               </Text>
//               <Text style={styles.intro}>
//                 {service.description || 'وصف غير متوفر'}
//               </Text>
//               <ScrollView
//                 horizontal
//                 showsHorizontalScrollIndicator={false} // إخفاء شريط الـ scroll الأفقي
//               >
//                 <View style={styles.companyContainer}>
//                   {(service.persons || []).map((company, cIndex) => (
//                     <Animatable.View
//                       key={cIndex}
//                       animation="zoomIn"
//                       delay={cIndex * 200}
//                       style={styles.companyCard}
//                     >
//                       <Text style={styles.companyTitle}>
//                         {company.name || 'اسم غير متوفر'}
//                       </Text>
//                       <Image
//                         source={{ uri: company.image }}
//                         style={styles.companyImage}
//                         defaultSource={icons.placeholder}
//                       />
//                       <Text style={styles.companyDescription}>
//                         {company.description || 'وصف غير متوفر'}
//                       </Text>
//                     </Animatable.View>
//                   ))}
//                 </View>
//               </ScrollView>
//             </Animatable.View>
//           ))}
//         </ScrollView>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: RFValue(10),
//     paddingHorizontal: RFValue(10),
//     backgroundColor: '#F5F6FA',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyText: {
//     fontSize: RFValue(18),
//     color: COLORS.gray,
//   },
//   card: {
//     backgroundColor: COLORS.white,
//     borderRadius: RFValue(15),
//     padding: RFValue(15),
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     marginBottom: RFValue(20),
//   },
//   title: {
//     fontSize: RFValue(20),
//     fontWeight: 'bold',
//     marginBottom: RFValue(10),
//     color: COLORS.primary,
//   },
//   intro: {
//     fontSize: RFValue(16),
//     marginBottom: RFValue(15),
//     color: COLORS.black,
//     lineHeight: RFValue(22),
//   },
//   companyContainer: {
//     flexDirection: 'row',
//     paddingBottom: RFValue(15), // مسافة سفلية عشان الكروت تبقى منفصلة من تحت
//   },
//   companyCard: {
//     width: RFValue(180),
//     backgroundColor: '#F9F9F9',
//     borderRadius: RFValue(10),
//     padding: RFValue(10),
//     marginRight: RFValue(10),
//     alignItems: 'center',
//     elevation: 2,
//   },
//   companyImage: {
//     width: RFValue(80),
//     height: RFValue(80),
//     borderRadius: RFValue(40),
//     marginVertical: RFValue(10),
//   },
//   companyTitle: {
//     fontSize: RFValue(16),
//     fontWeight: 'bold',
//     color: COLORS.primary,
//     textAlign: 'center',
//   },
//   companyDescription: {
//     fontSize: RFValue(14),
//     color: COLORS.gray,
//     textAlign: 'center',
//   },
// });

// export default CompanyPartener;

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
        title={'شركاؤنا'}
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

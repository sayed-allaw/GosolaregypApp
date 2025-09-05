import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {
  FormInput,
  Header,
  IconButton,
  TextIconButton,
} from '../../../components';
import {COLORS, FONTS, icons, images, SIZES} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {SharedElement} from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';

const PersonsService = ({navigation, route}) => {
  const {type, service} = route.params;

  const [myOptions, setMyOptions] = useState(
    type == 1
      ? [
          {
            id: 1,
            sub_services_id: 1,
            name: 'الأنظمة الشمسية المتصلة بالشبكه',
            image: images.solar_energy_for_agriculture, 
            description:
              'تصميم وتركيب أنظمة طاقة متصلة بالشبكة للأماكن المنزلية باستخدام تكنولوجيا الأون جريد. يهدف النظام إلى توليد الكهرباء باستخدام مصادر طاقة متجددة، مع إمكانية توصيل الزيادة إلى شبكة الكهرباء العامة. يساهم النظام في تقليل تكاليف الكهرباء وتحسين استدامة الطاقة.',
            benefits: [
              'تقليل استهلاك الفاتوره الشهريه للمنازل من الشبكه الحكوميه باستخدام نظام صافى القياس لقيم فواتير بمعدل أعلى من 1100 جنيه مصرى شهريا',
            ],
            requirements: ['حساب قدرة المحطه'],
          },
          {
            id: 2,
            sub_services_id: 2,
            name: 'الأنظمة الشمسية المنفصله عن الشبكة',
            image: images.station7,
            description:
              'تصميم وتركيب أنظمة طاقة مستقلة للأماكن المنزلية باستخدام تكنولوجيا الأوف جريد. يهدف النظام إلى توفير مصادر طاقة متجددة وغير متصلة بالشبكة لتلبية احتياجات المنزل بشكل كامل. يشمل ذلك توليد الكهرباء وتأمين مياه الشرب والتدفئة وتحلية المياه إذا كان ذلك ضروريًا.',
            benefits: [
              'يستخدم هذا النظام فى المواقع البعيده عن الشبكة الحكومية لتعذر وصول الشبكة فى هذه الأماكن وأيضا يمكن استخدامها لتغطية أوقات انقطاع الكهرباء المتعارف عليها يوميا',
            ],
            requirements: ['نماذج'],
          },
          {
            id: 3,
            sub_services_id: 3,
            name: 'أنظمة الرى بالطاقة الشمسيه',
            image: images.solarirrigation,
            description:
              'توفير وتركيب نظام ري فعال باستخدام الطاقة الشمسية لضمان توفير المياه بشكل مستدام للمزروعات. يتميز التصميم بفاعلية الاستهلاك والتوجيه الصحيح للمياه، مما يحسن من كفاءة الري ويقلل من التكلفة البيئية.',
            benefits: [
              'المساهمة فى تقليل إستهلاك الوقود الأحفورى المستخدم فى مولدات الديزل لتشغيل طلمبات الرى واستبداله بمصدر طاقة نظيف ومستدام حفاظا على البيئه وأيضا توفير نفقات نقل الوقود وصيانة المولدات على المدى البعيد',
              'ضمان توفير المياه المطلوبة للرى طوال فترة تشغيل المحطة يوميا',
              'إسترجاع رأس المال المدفوع فى المحطات بحد أقصى 3 سنوات',
            ],
            requirements: ['جداول'],
          },
          {
            id: 4,
            sub_services_id: 4,
            name: 'الكشافات',
            image: images.solar_lighting_system,
            description:
              'توفير وتركيب كشافات تعمل بالطاقة الشمسية لتوفير إضاءة فعالة ومستدامة في المناطق النائية أو أماكن الطوارئ. تتيح تلك الكشافات استفادة من ضوء الشمس للشحن وتشغيلها خلال الليل، مما يسهم في تحسين السلامة وتوفير حلاً بيئياً للإضاءة.',
            benefits: [
              'الاعتماد على مصادر الطاقة المتجددة.',
              'الاستقلالية عن شبكات الكهرباء التقليدية.',
              'توفير مصادر مستدامة للطاقة للأماكن النائية.',
            ],
            requirements: [
              'تحديد احتياجات الطاقة اليومية للمنزل.',
              'توفر مساحة لتركيب لوحات الطاقة الشمسية أو مصادر الطاقة الأخرى.',
              'تقييم الظروف المناخية لضمان الكفاءة الأمثل.',
            ],
          },

          {
            id: 5,
            sub_services_id: 5,
            name: 'سخانات الطاقة الشمسية',
            image: images.solarpanel,
            description:
              'سخان تركى 200 لتر simsek\n\n سخان تركى 300 لتر simsek\n\n',
            benefits: [
              'تتميز سخانات الطاقة الشمسية بتوفير المياه طوال اليوم في الليل أو النهار، وايضا عند انقطاع الكهرباء، تعتبر السخانات الشمسية أطول عمراً من السخانات التقليدية وأقل اعطالاً، كما أنها تساهم في تقليل نسبة التلوث التي تسببها انواع السخانات الأخرى.',
            ],
            requirements: [],
          },
          {
            id: 6,
            sub_services_id: 6,
            name: 'خدمات التوظيف',
            image: images.solarjobplatform,
            description:
              'توفر جو سولار خدمات التوظيف للأفراد للباحثين عن عمل في مجال الطاقة الشمسية وفتح باب البحث للشركات علي منصة جو سولار لتنزيل ال CV المقدم من قبل المهندسين والفنيين الباحثين عن الفرصة',
            requirements: ['cv'],
          },
          {
            id: 8,
            sub_services_id: 8,
            name: 'استشارات الطاقة',
            image: images.energy_consultation,
            description:
              'تقديم خدمات استشارية في مجال الطاقة لتحليل وتحسين استخدام وتوفير الطاقة في مختلف القطاعات. يشمل ذلك تقديم حلاول مخصصة لتحسين الكفاءة الطاقية وتبني تقنيات متقدمة لتوليد واستهلاك الطاقة بشكل أكثر فعالية.',
          },
          {
            id: 9,
            sub_services_id: 9,
            name: 'التدريب والتوعيه',
            image: images.education_and_awareness,
            description:
              'تسعى جو سولار لتكون أولى الشركات المساهمه فى مجال التدريب والتوعيه بمجال الطاقة المتجدده لكل المهتمين والعاملين بالمجال \n تقدم جو سولار خدمات التدريب والتوعيه للشركات والمدارس وحديثى التخؤج والعاملين بالمجال الباحثين عن إضافة المزيد من الخبرات',
          },
        ]
      : type == 2
      ? [
          {
            id: 1,
            sub_services_id: 1,
            name: 'توريد جميع مكونات الطاقة الشمسية',
            image: images.solarpanel,
            description:
              'توفير وتوريد جميع المكونات الضرورية لأنظمة الطاقة الشمسية، بما في ذلك الخلايا الشمسية والكابلات والإنفرترات والشاسيهات وجميع المستلزمات الأخرى المتعلقة بتنصيب وتشغيل الأنظمة الشمسية.',
            components: [
              {
                com_name: 'الألواح الشمسية',
                comItems: [
                  {
                    itemName: 'Trina',
                    ItemTypes: [
                      {watt: 675, type: 'bifacial'},
                      {watt: 545, type: 'Mono PERC'},
                    ],
                  },
                  {
                    itemName: 'Jinko',
                    ItemTypes: [
                      {watt: 550, type: 'P Type'},
                      {watt: 560, type: 'N Type'},
                    ],
                  },
                  {itemName: 'JA', ItemTypes: [{watt: 550, type: 'P Type'}]},
                  {
                    itemName: 'Suntech',
                    ItemTypes: [{watt: 555, type: 'Mono PERC'}],
                  },
                  {
                    itemName: 'Tongwe',
                    ItemTypes: [{watt: 560, type: 'Mono PERC'}],
                  },
                ],
              },
              {
                com_name: 'انفرتر',
                comItems: [
                  {
                    itemName: 'On Grid',
                    ItemTypes: [
                      {watt: '', type: 'Sungrow'},
                      {watt: '', type: 'Huawei'},
                    ],
                  },
                  {
                    itemName: 'Off Grid',
                    ItemTypes: [
                      {watt: '', type: 'Must'},
                      {watt: '', type: 'Eastman'},
                    ],
                  },
                  {
                    itemName: 'pump',
                    ItemTypes: [
                      {watt: '', type: 'Saj'},
                      {watt: '', type: 'invt'},
                      {watt: '', type: 'Vechi'},
                      {watt: '', type: 'Delexi'},
                      {watt: '', type: 'Frecon'},
                    ],
                  },
                ],
              },
              {
                com_name: 'كابلات DC',
                comItems: [
                  {itemName: 'HIS', ItemTypes: []},
                  {itemName: 'KBE', ItemTypes: []},
                  {itemName: 'SEVAL', ItemTypes: []},
                  {itemName: 'PRYSMAN', ItemTypes: []},
                ],
              },
              {
                com_name: 'لوحات حماية جاهزة',
                comItems: [
                  {
                    itemName:
                      'متاح جميع القدرات من 7.5hp ل 150hp لمزيد من التفاصيل تواصل مع الشركة',
                    ItemTypes: [],
                  },
                ],
              },
              {
                com_name: 'مكونات حماية وإكسسوارات اخرى',
                comItems: [
                  {itemName: 'Fuses', ItemTypes: []},
                  {itemName: 'Circuit Breakers', ItemTypes: []},
                  {itemName: 'MC4', ItemTypes: []},
                  {itemName: 'Surge arresto مانع صواعق', ItemTypes: []},
                ],
              },
              {
                com_name: 'نطام تثبيت الألواح الشمسية',
                comItems: [
                  {
                    itemName: 'ثابت',
                    ItemTypes: [
                      {watt: '', type: 'قطاع 3*2.5 قطاع 3مم مجلفن ساخن'},
                      {watt: '', type: 'قطاع 4*6 سمك 2مم مجلفن ساخن'},
                    ],
                  },
                  {
                    itemName: 'متحرك',
                    ItemTypes: [
                      {watt: '', type: 'صينية'},
                      {watt: '', type: 'ماسورة'},
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            sub_services_id: 2,
            name: 'خدمات الابار',
            image: images.solarpanel,
            description: '',
            components: [
              {
                com_name: 'توريد مكونات البئر',
                comItems: [
                  {
                    itemName: 'موتور وطلمبة',
                    ItemTypes: [
                      {watt: '', type: 'KPS'},
                      {watt: '', type: 'VANSAN'},
                      {watt: '', type: 'SP&MAX'},
                      {watt: '', type: 'Gold'},
                      {watt: '', type: 'Power tec'},
                    ],
                  },
                  {
                    itemName: 'مواسير UPVC',
                    ItemTypes: [
                      {watt: '', type: 'Bore power(هندى)'},
                      {watt: '', type: 'NIAGRA (هندى)'},
                      {watt: '', type: 'FABA (تركى)'},
                      {watt: '', type: 'PURELIFE'},
                    ],
                  },
                  {
                    itemName: 'كابلات البئر',
                    ItemTypes: [
                      {watt: '', type: 'SEVAL(تركى)'},
                      {watt: '', type: 'TORAN(تركى)'},
                    ],
                  },
                  {
                    itemName: 'اكسسوارات البئر',
                    ItemTypes: [
                      {watt: '', type: 'بدايه'},
                      {watt: '', type: 'نهايه'},
                      {watt: '', type: 'كوع'},
                      {watt: '', type: 'فلنشة'},
                      {watt: '', type: 'وش البئر'},
                    ],
                  },
                  {
                    itemName: 'Tongwe',
                    ItemTypes: [{watt: 560, type: 'Mono PERC'}],
                  },
                ],
              },
              {
                com_name: 'خدمة حفر الأبار',
                comItems: [],
              },
            ],
          },
          {
            id: 3,
            sub_services_id: 3,
            name: 'خدمة الاستشارات',
            image: images.energy_consultation_for_companies,
            description:
              'تقدم جو سولار خدمة الاستشارات للشركات الراغبة في تقييم المواصفات الفنية والتركيبات للمشروعات المقدمة بفريق من الكوادر المتخصصة والخبرات الممتازة في مجال الطاقة الشمسية',
          },
          {
            id: 4,
            sub_services_id: 4,
            name: 'خدمات التركيب والصيانة',
            image: images.maintenance_and_post_installation_services,
            description:
              'تقدم جو سولار خدمات التركيب والصيانة للمشروعات الخاصة بالشركة أو مشروعات منفذة وبحاجه إلي خدمات الصيانة بعقود منفصلة بفريق من أفضل الخبرات في مجال التركيبات والصيانة',
          },
          {
            id: 5,
            sub_services_id: 5,
            name: 'صندوق زمالة الطاقة الشمسية',
            image: images.solar_financing_programs,
            description:
              'تدعم جو سولار جميع العاملين في مجال الطاقة الشمسية بالسوق المصري عن طريق صندوق الزمالة بالتعاون مع شركائنا وعملائنا ونساهم بشكل كبير في حماية العاملين بالمجال ضد مخاطر العمل وتوابعه',
          },
          /* تم إزالة محطات شحن السيارات من خدمات الشركات
          {
            id: 6,
            sub_services_id: 6,
            name: 'محطات شحن السيارات',
            image: images.solarfellowshipfund,
            description: 'قريبا',
          },
          */
          /* تم إزالة خدمات التوظيف من خدمات الشركات
          {
            id: 7,
            sub_services_id: 7,
            name: 'خدمات التوظيف',
            image: images.solarjobplatform,
            description:
              'توفر جو سولار خدمات التوظيف للأفراد للباحثين عن عمل في مجال الطاقة الشمسية وفتح باب البحث للشركات علي منصة جو سولار لتنزيل ال CV المقدم من قبل المهندسين والفنيين الباحثين عن الفرصة',
            requirements: ['cv'],
          },
          */
        ]
      : [],
  );

  function renderHeader() {
    return (
      <Header
        title={
          type == 1
            ? 'خدمات الافراد'
            : type == 2
            ? 'خدمات الشركات'
            : `خدمات ${service}`
        }
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

  function renderService() {
    return (
      <View>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.black,
          }}>
          إختر الخدمة المناسبة لك
        </Text>
        {myOptions.map((item, index) => {
          return (
            <Animatable.View
              delay={index * 100}
              animation={'fadeInUp'}
              useNativeDriver>
              <TouchableOpacity
                style={{
                  height: RFValue(180),
                  marginTop: SIZES.radius,
                  borderWidth: 2,
                  borderRadius: SIZES.radius + 2,
                  borderColor: COLORS.primary,
                }}
                onPress={() => {
                  navigation.navigate('ServiceDetails', {
                    psData: item,
                    mainService: service,
                  });
                  console.log('item==' + JSON.stringify(item));
                }}>
                <SharedElement
                  style={{
                    flex: 1,
                  }}
                  id={`item.${item.sub_services_id}.photo`}>
                  <ImageBackground
                    source={item.image} 
                    style={{
                      flex: 1,
                    }}
                    resizeMode="cover"
                    borderRadius={SIZES.radius}>
                    <View
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: SIZES.padding,
                        borderRadius: SIZES.radius,
                        flex: 1,
                      }}>
                      <Text
                        style={{
                          ...FONTS.h2,
                          textAlign: 'center',
                          color: COLORS.white,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  </ImageBackground>
                </SharedElement>
              </TouchableOpacity>
            </Animatable.View>
          );
        })}
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.padding,
        }}
        showsVerticalScrollIndicator={false}>
        {renderService()}
      </ScrollView>
    </View>
  );
};

export default PersonsService;

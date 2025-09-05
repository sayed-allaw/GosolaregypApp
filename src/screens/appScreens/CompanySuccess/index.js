import React from 'react';
import { View, Text, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SIZES, icons } from '../../../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { Header, IconButton } from '../../../components';

const AnimatedView = Animatable.createAnimatableComponent(View);

const CompanySuccess = ({ navigation }) => {
  const successStories = [
    {
      success_story_id: 1,
      company_name: 'جو سولار',
      project_name: 'محطة بور سعيد أون جريد الصناعية',
      description:
        'نفّذت جو سولار محطة طاقة شمسية متصلة بالشبكة في بور سعيد لدعم القطاع الصناعي، مما ساهم في توفير طاقة مستدامة وتقليل الاعتماد على الوقود الأحفوري.',
      benefits: [
        'توفير طاقة نظيفة ومستدامة للمنشآت الصناعية.',
        'تقليل تكاليف التشغيل للمصانع.',
        'تعزيز الاستدامة البيئية في المنطقة.',
      ],
      results: {
        energy_generated: '200,000 كيلوواط-ساعة سنويًا',
        cost_reduction: 'تقليل تكاليف الطاقة بنسبة 30٪',
        carbon_reduction: 'تقليل انبعاثات الكربون بنسبة 15٪',
      },
      testimonial:
        'محطة بور سعيد غيّرت قواعد اللعبة في مصنعنا. الطاقة المستدامة ساعدتنا على خفض التكاليف وزيادة كفاءتنا، ونحن ممتنون لجو سولار.',
    },
    {
      success_story_id: 2,
      company_name: 'جو سولار',
      project_name: 'الضبعة ري للاستثمار الزراعي',
      description:
        'ساهمت جو سولار في تنفيذ نظام ري بالطاقة الشمسية في الصبعة لدعم شركة استثمار زراعي، مما أدى إلى تحسين إنتاجية الأراضي الزراعية وتقليل تكاليف الري.',
      benefits: [
        'تحسين كفاءة الري وتقليل استهلاك المياه.',
        'زيادة الإنتاجية الزراعية بنسبة كبيرة.',
        'توفير تكاليف الطاقة للشركة الزراعية.',
      ],
      results: {
        water_saved: '100,000 لتر ماء سنويًا',
        crop_yield_increase: 'زيادة إنتاج المحاصيل بنسبة 25٪',
        financial_savings: 'توفير 15,000 دولار سنويًا',
      },
      testimonial:
        'نظام الري بالطاقة الشمسية في الصبعة جعل عملياتنا الزراعية أكثر كفاءة واستدامة. شكرًا لجو سولار على هذا التحول الإيجابي.',
    },
    {
      success_story_id: 3,
      company_name: 'جو سولار',
      project_name: 'المغرة ري للأراضي الزراعية',
      description:
        'قامت جو سولار بتطوير نظام ري بالطاقة الشمسية في المغرة لدعم الأراضي الزراعية، مما ساعد على تحسين إنتاج المحاصيل وتقليل التأثير البيئي.',
      benefits: [
        'توفير طاقة مستدامة لأنظمة الري.',
        'زيادة كفاءة استخدام الموارد الزراعية.',
        'تقليل البصمة الكربونية للعمليات الزراعية.',
      ],
      results: {
        energy_saved: '80,000 كيلوواط-ساعة سنويًا',
        crop_yield_increase: 'تحسين إنتاج المحاصيل بنسبة 20٪',
        carbon_reduction: 'تقليل انبعاثات الكربون بنسبة 10٪',
      },
      testimonial:
        'بفضل جو سولار، أصبحت أراضينا في المغرة أكثر إنتاجية واستدامة. نظام الري الجديد ساعدنا على تحقيق نتائج مذهلة.',
    },
  ];

  function renderHeader() {
    return (
      <Header
        title={'نجاحات الشركة'}
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
        leftComponent={<View style={{ width: 40 }} />}
      />
    );
  }

  const renderSuccessStory = ({ item }) => (
    <AnimatedView animation="fadeInUp" duration={1000} delay={500}>
      <View
        style={{
          padding: 16,
          marginBottom: SIZES.base,
          backgroundColor: 'white',
          margin: 10,
          padding: 15,
          borderRadius: 8,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 2,
        }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.primary }}>
          {item.project_name || 'اسم المشروع غير متوفر'}
        </Text>
        <Text style={{ marginTop: 8, color: COLORS.black }}>
          {item.description || 'وصف غير متوفر'}
        </Text>
        <View style={{ marginTop: 8 }}>
          <Text style={{ fontWeight: 'bold', color: COLORS.third }}>
            المميزات:
          </Text>
          {(item.benefits || []).map((benefit, index) => (
            <Text key={index} style={{ color: COLORS.black }}>
              - {benefit}
            </Text>
          ))}
        </View>
        <View style={{ marginTop: 8 }}>
          <Text style={{ fontWeight: 'bold', color: COLORS.third }}>
            النتائج:
          </Text>
          {item.results ? (
            Object.entries(item.results).map(([key, value], index) => (
              <Text key={index} style={{ color: COLORS.black }}>
                - {value}
              </Text>
            ))
          ) : (
            <Text style={{ color: COLORS.black }}>- لا توجد نتائج متاحة</Text>
          )}
        </View>
        <Text style={{ fontWeight: 'bold', color: COLORS.third, marginTop: 8 }}>
          الآراء:
        </Text>
        <Text style={{ color: COLORS.black }}>
          {item.testimonial || 'رأي غير متوفر'}
        </Text>
      </View>
    </AnimatedView>
  );

  return (
    <View style={{ flex: 1 }}>
      {renderHeader()}
      {successStories.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: RFValue(16), color: COLORS.black }}>
            لا توجد قصص نجاح متاحة حاليًا
          </Text>
        </View>
      ) : (
        <FlatList
          data={successStories}
          keyExtractor={item => item.success_story_id.toString()}
          renderItem={renderSuccessStory}
          contentContainerStyle={{ paddingBottom: RFValue(60) }} // مسافة سفلية للـ FlatList
        />
      )}
    </View>
  );
};

export default CompanySuccess;
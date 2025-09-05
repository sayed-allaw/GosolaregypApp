import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image as FastImage,
} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {COLORS, SIZES, FONTS, icons} from '../constants';
import {CompanyService, Home, MorePage} from '../screens/appScreens';
import AboutCompany from '../screens/appScreens/AboutCompany';
import images from '../constants/images';

const Tab = createBottomTabNavigator();

const TabArr = [
  {
    route: 'Home',
    label: 'Home',
    ArLabel: 'أعمال الشركة',
    type: Ionicons,
    activeIcon: icons.team,
    inActiveIcon: icons.team,
    tabBarColor: COLORS.primary,
    component: Home,
  },
  {
    route: 'AboutCompany',
    label: 'AboutCompany',
    ArLabel: 'عن الشركة',
    type: Ionicons,
    activeIcon: images.mainLogo,
    inActiveIcon: images.mainLogo,
    tabBarColor: COLORS.primary,
    component: AboutCompany,
  },
  {
    route: 'CompanyService',
    label: 'CompanyService',
    ArLabel: 'الخدمات',
    type: Ionicons,
    activeIcon: icons.customer_service,
    inActiveIcon: icons.customer_service,
    tabBarColor: COLORS.primary,
    component: CompanyService,
  },
  {
    route: 'MorePage',
    label: 'MorePage',
    ArLabel: 'أخري',
    type: Ionicons,
    activeIcon: icons.info,
    inActiveIcon: icons.info,
    tabBarColor: COLORS.primary,
    component: MorePage,
  },
];

const MARGIN = 16;
const TAB_BAR_WIDTH = SIZES.width - MARGIN;
const TAB_WIDTH = TAB_BAR_WIDTH / TabArr.length;

function MyTabBar({state, descriptors, navigation}) {
  const [translateX] = useState(new Animated.Value(0));
  const translateTab = index => {
    Animated.spring(translateX, {
      toValue: -index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    translateTab(state.index);
  }, [state.index]);

  return (
    <View style={styles.tabBarContainer}>
      <Animated.View
        style={[
          styles.slidingTabContainer,
          {backgroundColor: COLORS.white, borderRadius: SIZES.radius},
        ]}>
        <Animated.View
          style={[
            styles.slidingTab,
            {
              transform: [{translateX}],
              backgroundColor: TabArr[state.index].tabBarColor,
            },
          ]}
        />
      </Animated.View>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const tabBarIcon = options.tabBarIcon;

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center'}}
            key={index}>
            <TabIcon
              tabBarIcon={tabBarIcon}
              isFocused={isFocused}
              label={label}
              tabColor={options.tabColor}
              index={state.index}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabIcon = ({isFocused, tabBarIcon, label, tabColor, index}) => {
  const [translateY] = useState(new Animated.Value(0));

  const translateIcon = val => {
    Animated.spring(translateY, {
      toValue: val,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isFocused) {
      translateIcon(-14); // move up
    } else {
      translateIcon(0); // centered
    }
  }, [isFocused]);

  return (
    <>
      <Animated.View style={{transform: [{translateY}]}}>
        <View
          style={{
            backgroundColor: isFocused ? COLORS.primary : 'transparent',
            borderRadius: RFValue(25),
            padding: RFValue(7),
            borderWidth: isFocused ? 4 : 0,
            borderColor: COLORS.white,
          }}>
          <FastImage
            source={isFocused ? tabBarIcon.activeIcon : tabBarIcon.inActiveIcon}
            style={{
              width: index == 1 ? RFValue(30) : RFValue(24),
              height: index == 1 ? RFValue(30) : RFValue(24),
              tintColor: isFocused ? COLORS.white : tabColor,
            }}
            resizeMode={'contain'}
          />
        </View>
      </Animated.View>
      <Text
        style={{
          color: isFocused ? COLORS.primary : COLORS.darkGray,
          fontFamily: FONTS.fontFamily,
          marginBottom:15,
        }}>
        {label}
      </Text>
    </>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <MyTabBar {...props} />}>
      {TabArr.map((_, index) => {
        return (
          <Tab.Screen
            key={index}
            name={_.label}
            component={_.component}
            options={{
              tabBarLabel: _.ArLabel,
              tabBarColor: _.tabBarColor,
              tabColor: _.tabBarColor,
              tabBarIcon: {
                activeIcon: _.activeIcon,
                inActiveIcon: _.inActiveIcon,
                type: _.type,
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    width: TAB_BAR_WIDTH,
    height: RFValue(60),
    position: 'absolute',
    alignSelf: 'center',
    bottom: MARGIN,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  slidingTabContainer: {
    width: TAB_WIDTH,
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },

});

export default BottomTab;
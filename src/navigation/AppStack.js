import React from 'react';
import {TransitionPresets} from '@react-navigation/stack';
import BottomTab from './BottomTab';
import {
  NearbeStation,
  StationDetails,
  StationOption,
  PersonsService,
  ServiceDetails,
  ProjectDetails,
  CompanySuccess,
  CompanyPartener,
  EnergyServiceForm,
  ElecrticChargeStation,
  Contact,
  Requirement,
  SolarIrrigationSystems,
  Maintenance,
  Previeew,
} from '../screens/appScreens';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import ChatScreen from '../screens/appScreens/EnergyServiceForm/ChatScreen';

const Stack = createSharedElementStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      }}
      initialRouteName="MainStack">
      <Stack.Screen name="MainStack" component={BottomTab} />
      <Stack.Screen
        name="PersonsService"
        component={PersonsService}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="ServiceDetails"
        component={ServiceDetails}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="ProjectDetails"
        component={ProjectDetails}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="CompanyPartener"
        component={CompanyPartener}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />{' '}
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="Requirement"
        component={Requirement}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="SolarIrrigationSystems"
        component={SolarIrrigationSystems}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="Maintenance"
        component={Maintenance}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="Previeew"
        component={Previeew}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="EnergyServiceForm"
        component={EnergyServiceForm}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="CompanySuccess"
        component={CompanySuccess}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />{' '}
      <Stack.Screen
        name="ElecrticChargeStation"
        component={ElecrticChargeStation}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="StationOption"
        component={StationOption}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="StationDetails"
        component={StationDetails}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="NearbeStation"
        component={NearbeStation}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />{' '}
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

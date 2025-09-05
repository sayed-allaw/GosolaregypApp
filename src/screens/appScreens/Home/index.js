import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Animated,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import FastImage from 'react-native-fast-image';
import {SharedElement} from 'react-navigation-shared-element';
import {COLORS, FONTS, SIZES} from '../../../constants';
import {db} from '../../../../src/config/firebaseConfig';
import {collection, getDocs} from 'firebase/firestore';

const SOLAR_ICON = require('../../../assets/icons/charging_location.png');

const CARD_WIDTH = SIZES.width * 0.8;
const CARD_MARGIN = 10;
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN * 2;

const MainMap = ({navigation}) => {
  const [stationsArr, setStationsArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mapView = useRef();
  const scrollViewRef = useRef();
  const mapAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getStations();
  }, []);

  useEffect(() => {
    if (stationsArr.length > 0 && stationsArr[selectedIndex]) {
      const station = stationsArr[selectedIndex];
      mapView.current.animateToRegion({
        latitude: station.latitude,
        longitude: station.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [stationsArr, selectedIndex]);

  const getStations = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'newstations'));
      const stations = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      console.log('Stations before sorting:', stations);
      const sortedStations = stations.sort((a, b) => a.ID - b.ID);
      console.log('Sorted stations:', sortedStations);
      setStationsArr(sortedStations);
      if (sortedStations.length > 0) {
        requestLocationPermission(sortedStations);
      }
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
    setLoading(false);
  };

  const requestLocationPermission = async stations => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        position => {
          mapView.current.animateToRegion({
            latitude: stations[0]?.latitude || position.coords.latitude,
            longitude: stations[0]?.longitude || position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        },
        error => console.error(error),
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  const handleScrollEnd = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SNAP_INTERVAL);
    if (index !== selectedIndex && index >= 0 && index < stationsArr.length) {
      setSelectedIndex(index);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <MapView
        ref={mapView}
        provider={PROVIDER_GOOGLE}
        style={styles.container}
        showsUserLocation>
        {stationsArr
          .filter(
            marker =>
              marker.latitude != null &&
              marker.longitude != null &&
              marker.latitude >= -90 &&
              marker.latitude <= 90 &&
              marker.longitude >= -180 &&
              marker.longitude <= 180,
          )
          .map((marker, index) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.name}>
              <View style={styles.markerContainer}>
                <Image
                  source={SOLAR_ICON}
                  style={[
                    styles.markerIcon,
                    selectedIndex === index && styles.selectedMarkerIcon,
                  ]}
                  resizeMode="contain"
                />
              </View>
            </Marker>
          ))}
      </MapView>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={styles.loader}
        />
      ) : (
        <Animated.FlatList
          ref={scrollViewRef}
          data={stationsArr}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={SNAP_INTERVAL}
          snapToAlignment="center"
          decelerationRate="fast"
          style={styles.cardContainer}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: mapAnimation}}}],
            {useNativeDriver: true},
          )}
          onMomentumScrollEnd={handleScrollEnd} 
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setSelectedIndex(index);
                scrollViewRef.current.scrollToIndex({index, animated: true});
                mapView.current.animateToRegion({
                  latitude: item.latitude,
                  longitude: item.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                });
                navigation.navigate('ProjectDetails', {psItem: item});
              }}
              style={styles.card}>
              <SharedElement
                id={`item.${item.id}.img`}
                style={styles.cardImage}>
                <FastImage
                  source={{uri: item.image}}
                  style={styles.cardImage}
                  resizeMode="stretch"
                />
              </SharedElement>
              <View style={styles.textContent}>
                <Text
                  numberOfLines={1}
                  style={{...FONTS.h3, color: COLORS.black}}>
                  {item.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{...FONTS.h4, color: COLORS.darkGray}}>
                  {item.station_capacity}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  cardContainer: {
    position: 'absolute',
    bottom: 130,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginHorizontal: CARD_MARGIN,
    height: 220,
    width: CARD_WIDTH,
    overflow: 'hidden',
    elevation: 5,
  },
  cardImage: {flex: 3, width: '100%', height: '100%'},
  textContent: {flex: 2, padding: 10},
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -25}, {translateY: -25}],
  },
  markerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerIcon: {
    width: 24,
    height: 24,
  },
  selectedMarkerIcon: {
    width: 32,
    height: 32,
  },
});

export default MainMap;

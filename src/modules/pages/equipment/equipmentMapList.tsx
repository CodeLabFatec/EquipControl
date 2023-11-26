import React, {useState} from 'react';
import {PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {equipmentController} from '../../../services';
import {useFocusEffect} from '@react-navigation/native';
import {alertError} from '../../../helpers/utils';
import SearchBar from '../../components/base/search-bar';
import Dropdown from '../../components/base/dropdown';

interface MapItem {
  id: string;
  name?: string;
  latitude: number;
  longitude: number;
  status?: boolean;
}

const availableDistances = {
  OneKm: 1,
  TwoKm: 2,
  FiveKm: 5,
  TenKm: 10,
  NoLimit: 0,
};

function convertDistance(distance: number) {
  let distanceString = '';
  switch (distance) {
    case 1:
      distanceString = '1 KM';
      break;
    case 2:
      distanceString = '2 KM';
      break;
    case 5:
      distanceString = '5 KM';
      break;
    case 10:
      distanceString = '10 KM';
      break;
    case 0:
      distanceString = 'Sem Limite';
      break;
  }

  return distanceString;
}

export default function EquipmentMapList({navigation}) {
  const [entities, setEntities] = useState<MapItem[]>([]);
  const [userLocation, setUserLocation] = useState<MapItem | null>(null);
  const [filterText, setFilterText] = useState('');
  const [filterDistance, setFilterDistance] = useState(
    availableDistances.FiveKm,
  );

  const dropdownItems: any[] = [
    {
      value: null,
      label: '1 KM',
      onPress: () => setFilterDistance(availableDistances.OneKm),
    },
    {
      value: null,
      label: '2 KM',
      onPress: () => setFilterDistance(availableDistances.TwoKm),
    },
    {
      value: null,
      label: '5 KM',
      onPress: () => setFilterDistance(availableDistances.FiveKm),
    },
    {
      value: null,
      label: '10 KM',
      onPress: () => setFilterDistance(availableDistances.TenKm),
    },
    {
      value: null,
      label: 'Sem Limite',
      onPress: () => setFilterDistance(availableDistances.NoLimit),
    },
  ];

  const fetchData = async () => {
    const data = await equipmentController.listOnlyLocation();
    const entidades = data.map(i => {
      return {
        id: i._id,
        latitude: parseFloat(i.latitude),
        longitude: parseFloat(i.longitude),
        name: i.name,
        status: i.isActive,
      };
    });
    setEntities(entidades);
  };

  const checkLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            setUserLocation({
              id: 'user',
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          error => console.log(error),
          {enableHighAccuracy: true, timeout: 5000},
        );
      } else {
        navigation.navigate('Home');
        console.log('Permissão de localização negada');
      }
    } catch (err) {
      navigation.navigate('Home');
      alertError('Ocorreu um erro ao carregar sua localização.');
      console.warn(err);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      checkLocationPermission();
      fetchData();
    }, []),
  );

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const R = 6371; // raio médio da Terra em quilômetros
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  const toRad = (value: number) => (value * Math.PI) / 180;

  function filtrarNome(entity: MapItem) {
    if (!filterText) return true;
    if (!entity.name) return false;
    return entity.name.toLowerCase().includes(filterText.toLowerCase());
  }

  function filtrarDistancia(entity: MapItem) {
    if (!userLocation) return false;
    if (filterDistance === availableDistances.NoLimit) return true;

    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      entity.latitude,
      entity.longitude,
    );
    return distance <= filterDistance;
  }

  return (
    <View style={mapStyles.map}>
      <View style={mapStyles.searchContainer}>
        <SearchBar
          maxWidth="100%"
          value={filterText}
          onChangeText={e => setFilterText(e)}
        />
      </View>
      <View>
        <Dropdown
          containerStyle={mapStyles.distanceFilterContainer}
          items={dropdownItems}>
          <Text style={mapStyles.distanceFilterItem}>
            {convertDistance(filterDistance)}
          </Text>
        </Dropdown>
      </View>
      <View style={mapStyles.mapContainer}>
        {userLocation ? (
          <MapView
            style={mapStyles.map}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              pinColor="#77A490"
              title="Sua Localização"
              description="Você está aqui!"
            />
            {entities
              .filter(e => filtrarNome(e) && filtrarDistancia(e))
              .map((entity, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: entity.latitude,
                    longitude: entity.longitude,
                  }}
                  title={entity.name ?? 'Equipamento'}
                  description={`${entity.status ? 'Ativo' : 'Inativo'}`}
                />
              ))}
          </MapView>
        ) : (
          <Text style={{textAlign: 'center'}}>Carregando...</Text>
        )}
      </View>
    </View>
  );
}

const mapStyles = StyleSheet.create({
  map: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    margin: 20,
    maxHeight: '76%',
  },
  searchContainer: {
    marginRight: 20,
  },
  distanceFilterContainer: {
    marginTop: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  distanceFilterItem: {
    borderColor: '#E2D7C1',
    borderWidth: 1,
    borderRadius: 20,
    width: 100,
    textAlign: 'center',
  },
});

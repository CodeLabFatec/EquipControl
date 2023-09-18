import React, {useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListRenderItem,
  Image,
  FlatList,
} from 'react-native';
import {Equipment, Files} from '../../helpers/models';

const EquipmentComponent: ListRenderItem<Equipment> = ({item}) => {
  return (
    <View style={styles.equipment}>
      <Carousel files={item.files ?? []} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.serial}>Nº Série: {item.serial}</Text>
    </View>
  );
};

const Slide: ListRenderItem<Files> = ({item, index}) => {
  return (
    <View key={`carousel_${index}`} style={styles.carouselItem}>
      <Image
        source={{uri: `data:${item.type};base64,${item.base64}`}}
        style={styles.image}></Image>
    </View>
  );
};

interface CarouselProps {
  files: Files[];
}

function Carousel({files}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback(event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: (item, index) => index,
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: 300,
        offset: index * 300,
      }),
      [],
    ),
  };

  return (
    <FlatList
      data={files}
      style={{flex: 1}}
      renderItem={Slide}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      {...flatListOptimizationProps}
    />
  );
}

const styles = StyleSheet.create({
  equipment: {
    width: '48%',
    height: 200,
    paddingLeft: 5,
    zIndex: 1,
  },
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 200,
    zIndex: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    zIndex: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  serial: {
    fontSize: 16,
    color: 'gray',
  },
});

export default EquipmentComponent;

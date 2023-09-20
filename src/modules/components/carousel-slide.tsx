import React from 'react';

import {ListRenderItem} from 'react-native';
import {Files} from '../../helpers/models';
import {View, Image, StyleSheet} from 'react-native';

const Slide: ListRenderItem<Files> = ({item, index}) => {
  return (
    <View key={`carousel_${index}`} style={styles.carouselItem}>
      <Image
        source={{uri: `data:${item.type};base64,${item.base64}`}}
        style={styles.image}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 220,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Slide;

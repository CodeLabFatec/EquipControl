import React from 'react';

import {View, Image, StyleSheet} from 'react-native';

const Slide = ({item, index, width}) => {
  return (
    <View
      key={`carousel_${index}`}
      style={{...styles.carouselItem, width: width}}>
      <Image
        source={{uri: `data:${item.type};base64,${item.base64}`}}
        style={styles.image}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 220,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
});

export default Slide;

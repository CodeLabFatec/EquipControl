import React, {useState, useRef, useCallback} from 'react';

import {Files} from '../../helpers/models';
import {FlatList} from 'react-native';
import Slide from './carousel-slide';

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

export default Carousel;

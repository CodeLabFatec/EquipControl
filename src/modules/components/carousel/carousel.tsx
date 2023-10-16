import React, {useRef, useCallback, useState} from 'react';

import {Files} from '../../../helpers/models';
import {FlatList} from 'react-native';
import Slide from './carousel-slide';

interface CarouselProps {
  files: Files[];
  width: number;
  index?: number;
  setIndex?: React.Dispatch<React.SetStateAction<number>>;
}

function Carousel({files, width, index, setIndex}: CarouselProps) {
  const [indexImage, setIndexImage] = useState(0);
  const indexRef = useRef(index ?? indexImage);
  indexRef.current = index ?? indexImage;
  const onScroll = useCallback(event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index ?? indexImage);

    const distance = Math.abs(roundIndex - (index ?? indexImage));

    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      if (setIndex) {
        setIndex(roundIndex);
      } else {
        setIndexImage(roundIndex);
      }
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
        length: width,
        offset: index * width,
      }),
      [],
    ),
  };

  return (
    <FlatList
      data={files}
      style={{flex: 1}}
      renderItem={item => (
        <Slide item={item.item} index={item.index} width={width} />
      )}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      {...flatListOptimizationProps}
    />
  );
}

export default Carousel;

import React, {createContext, useState} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';

interface LoadContextData {
  isLoading: boolean;
  setLoading: (x: boolean) => void;
}

type Props = {
  children: React.ReactNode;
};

const LoadContext = createContext<LoadContextData>({} as LoadContextData);

export const LoadProvider = ({children}: Props) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadContext.Provider value={{isLoading, setLoading}}>
      <Modal transparent={true} animationType="fade" visible={isLoading}>
        <View style={styles.modalBackground}>
          <ActivityIndicator size="large" color="#77A490" />
        </View>
      </Modal>
      {children}
    </LoadContext.Provider>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadContext;

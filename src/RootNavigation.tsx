import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export default function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    (navigationRef as any).navigate(name, params);
  }
}

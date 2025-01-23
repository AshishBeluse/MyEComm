import {NativeModules} from 'react-native';

const {CameraModule} = NativeModules;

export const openCamera = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    CameraModule.openCamera()
      .then((result: string) => resolve(result))
      .catch((error: string) => reject(error));
  });
};

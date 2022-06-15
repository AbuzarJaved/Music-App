import Share from 'react-native-share';
import base64 from 'react-native-base64';
import {DEFAULT_IMAGE_URI} from './ImagePicker';
import Image from '../assests/images/caro1.jpg';
import RNFS from 'react-native-fs';

export const SharePost = async options => {
  try {
    const res = await Share.open({
      message: options.message,
      // url: `data:${options.type};base64/${base64.encode(options.url)}`,
      // url: `data:image/png;base64,${image}`,
      url: `${DEFAULT_IMAGE_URI}`,
    });
    return res;
  } catch (error) {
    console.log(error, 'SHARE ERROR');
    return error;
  }
};

export const encode = async options => {
  const image = base64.encode(`${Image}`);
  try {
    const res = await Share.open({
      message: options.message,
      // url: `data:${options.type};base64/${base64.encode(options.url)}`,
      url: `data:image/jpg;base64,${image}`,
      // url: `${DEFAULT_IMAGE_URI}`,
    });
    return res;
  } catch (error) {
    a;
    console.log(error, 'SHARE ERROR');
    a;
  }
};

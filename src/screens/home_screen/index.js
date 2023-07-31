import React, {useState} from 'react';
import {Platform} from 'react-native';
import {
  getFcmToken,
  PitelSDK,
  registerDeviceToken,
  removeDeviceToken,
} from 'react-native-pitel-voip';
import {HomeScreenComponent} from './home_screen';

//! ANDROID OR IOS
const ext = Platform.OS == 'android' ? '121' : '120';
const sipPass = Platform.OS == 'android' ? 'Agent21@@2023' : 'Agent20@@2023';

export const HomeScreen = ({navigation}) => {
  // useState & useRegister
  const [iosPushToken, setIOSPushToken] = useState('');
  const [sdkOptions, setSdkOptions] = useState();

  const _registerDeviceToken = async () => {
    const fcmToken = await getFcmToken();
    const deviceToken = Platform.OS == 'android' ? fcmToken : iosPushToken;
    const res = await registerDeviceToken({
      pn_token: deviceToken,
      pn_type: Platform.OS == 'android' ? 'android' : 'ios',
      app_id: 'com.pitel.pitelconnect.dev',
      domain: 'ccp-demo.tel4vn.com',
      extension: ext,
      app_mode: 'dev',
      fcm_token: fcmToken,
    });
    console.log('===========res===========');
    console.log(res);
    console.log('========================');
  };

  const _removeDeviceToken = async () => {
    const fcmToken = await getFcmToken();
    const deviceToken = Platform.OS == 'android' ? fcmToken : iosPushToken;
    removeDeviceToken({
      pn_token: deviceToken,
      domain: 'ccp-demo.tel4vn.com',
      extension: ext,
    });
  };

  const sdkOptionsInit = {
    sipDomain: 'ccp-demo.tel4vn.com',
    port: '50061',
    wssServer: 'wss://psbc02.tel4vn.com:7444',
    sipPassword: sipPass,
    extension: ext,
    bundleId: 'com.pitel.pitelconnect.dev',
    packageId: 'com.pitel.pitelconnect.dev',
    teamId: 'XP2BMU4626',
  };

  return (
    <PitelSDK
      sdkOptionsInit={sdkOptionsInit}
      iosPushToken={iosPushToken}
      setSdkOptions={setSdkOptions}>
      <HomeScreenComponent
        navigation={navigation}
        sdkOptions={sdkOptions}
        handleRegisterToken={_registerDeviceToken}
        handleRemoveToken={_removeDeviceToken}
        setIOSPushToken={setIOSPushToken}
      />
    </PitelSDK>
  );
};

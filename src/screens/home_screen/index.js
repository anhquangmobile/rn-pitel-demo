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
const ext = `${EXTENSION}`;
const sipPass = `${EXTENSION_SIP_PASSWORD}`;
const appId = `${BUNDLE_ID}`;
const domainUrl = `${DOMAIN}`;

export const HomeScreen = ({navigation}) => {
  const sdkOptionsInit = {
    sipDomain: `${DOMAIN}:${PORT}`,
    wssServer: `${WSS_URL}`,
    sipPassword: sipPass,
    bundleId: appId, // Bundle id for IOS
    packageId: appId, // Package id for Android
    teamId: `${TEAM_ID}`, // Team id of Apple developer account
  };

  // useState & useRegister
  const [iosPushToken, setIOSPushToken] = useState('');
  const [sdkOptions, setSdkOptions] = useState();

  const _registerDeviceToken = async () => {
    const fcmToken = await getFcmToken();
    const deviceToken = Platform.OS == 'android' ? fcmToken : iosPushToken;
    await registerDeviceToken({
      pn_token: deviceToken,
      pn_type: Platform.OS == 'android' ? 'android' : 'ios',
      app_id: appId,
      domain: domainUrl,
      extension: ext,
      app_mode: __DEV__ ? 'dev' : 'production',
      fcm_token: fcmToken,
    });
  };

  const _removeDeviceToken = async () => {
    const fcmToken = await getFcmToken();
    const deviceToken = Platform.OS == 'android' ? fcmToken : iosPushToken;
    removeDeviceToken({
      pn_token: deviceToken,
      domain: domainUrl,
      extension: ext,
    });
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

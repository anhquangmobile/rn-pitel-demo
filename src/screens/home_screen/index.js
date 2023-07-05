import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View, Platform} from 'react-native';
import {
  PitelCallOut,
  PitelCallNotif,
  useRegister,
  getFcmToken,
  NotificationListener,
  registerDeviceToken,
  removeDeviceToken,
} from 'react-native-pitel-voip';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import RNCallKeep from 'react-native-callkeep';
import BackgroundTimer from 'react-native-background-timer';
import {HomeScreenComponent} from './home_screen';

import styles from './styles';

BackgroundTimer.start();
const getRandomNumber = () => String(Math.floor(Math.random() * 100000));
const getNewUuid = () => uuidv4();
const hitSlop = {top: 10, left: 10, right: 10, bottom: 10};
const format = uuid => uuid.split('-')[0];

export const HomeScreen = ({navigation}) => {
  //! SDK
  // sdkOptions config
  // const sdkOptions = {
  //   sipOnly: true,
  //   sipDomain: `${domain}`,
  //   wsServer: `${wssServer}`,
  //   sipPassword: `${extensionPassword}`,
  //   debug: true,
  // };

  //! SUPPORT TEST
  // const sdkOptions = {
  //   sipOnly: true,
  //   sipDomain: 'ccp-demo.tel4vn.com',
  //   wsServer: 'wss://psbc01.tel4vn.com:7444',
  //   sipPassword: 'Agent20@@2023',
  //   debug: true,
  //   contactParams: {
  //     transport: 'ws',
  //     'pn-provider': Platform.OS == 'android' ? 'fcm' : 'apns',
  //     'pn-prid':
  //       '1b433bd00ffac5aedb6f79e652891d3c8b2119b69c691b365878457cc3f239bc',
  //     'pn-param':
  //       Platform.OS == 'android'
  //         ? 'com.pitel.pitelconnect.dev'
  //         : 'XP2BMU4626.com.pitel.pitelconnect.dev.voip',
  //     'fcm-token':
  //       'cVBEnJPHYUpnntbe0uViuB:APA91bEu2cYQRSdN4iouCTM55zTKXfbA1mJklD5ihzZMcV0_5GXdJ5ZhBFb0c9rioAfD8usYnOKiu_D6jMxq4gaJ6Po_Ujk6Ss8GP0ty8wjsjh_jUWZfc08hKk8T_3y7VkSeAWwBFCbN',
  //   },
  // };
  // useState & useRegister
  const [callId, setCallId] = useState('');
  const [iosPushToken, setIOSPushToken] = useState('');
  const [deviceToken, setDeviceToken] = useState('');
  const [fcmToken, setFcmToken] = useState('');
  const [sdkOptions, setSdkOptions] = useState();
  const [acceptCall, setAcceptCall] = useState(false);

  useEffect(() => {
    NotificationListener();
  }, []);

  useEffect(() => {
    initSdkOption();
  }, [iosPushToken]);

  const initSdkOption = async () => {
    const fcmToken = await getFcmToken();
    const deviceToken = Platform.OS == 'android' ? fcmToken : iosPushToken;
    setFcmToken(fcmToken);
    setDeviceToken(deviceToken);
    const sdkOptionsInit = {
      sipOnly: true,
      userAgentString: 'Pitel Connect',
      sipDomain: 'ccp-demo.tel4vn.com:50061',
      wsServer: 'wss://psbc01.tel4vn.com:7444',
      // sipPassword: 'Agent20@@2023',
      sipPassword: 'Agent21@@2023',
      debug: true,
      contactParams: {
        transport: 'ws',
        'pn-provider': Platform.OS == 'android' ? 'fcm' : 'apns',
        'pn-prid': deviceToken,
        'pn-param':
          Platform.OS == 'android'
            ? 'com.pitel.pitelconnect.dev'
            : 'XP2BMU4626.com.pitel.pitelconnect.dev.voip',
        'fcm-token': fcmToken,
      },
    };
    setSdkOptions(sdkOptionsInit);
  };

  const displayIncomingCall = number => {
    const callUUID = getNewUuid();
    // addCall(callUUID, number);

    console.log(`[displayIncomingCall] ${format(callUUID)}, number: ${number}`);

    RNCallKeep.displayIncomingCall(callUUID, number, number, 'number', false);
  };

  const _registerDeviceToken = async () => {
    const res = await registerDeviceToken({
      pn_token: deviceToken,
      pn_type: Platform.OS == 'android' ? 'android' : 'ios',
      app_id: 'com.pitel.pitelconnect.dev',
      domain: 'ccp-demo.tel4vn.com',
      // extension: '120', //! IOS
      extension: '121', //! ANDROID
      app_mode: 'dev',
      fcm_token: fcmToken,
    });
    console.log('===========res===========');
    console.log(res);
    console.log('========================');
  };

  const _removeDeviceToken = () => {
    removeDeviceToken({
      pn_token: deviceToken,
      domain: 'ccp-demo.tel4vn.com',
      // extension: '120', //! IOS
      extension: '121', //! ANDROI
    });
  };

  return (
    <HomeScreenComponent
      navigation={navigation}
      sdkOptions={sdkOptions}
      acceptCall={acceptCall}
      handleRegisterToken={_registerDeviceToken}
      handleRemoveToken={_removeDeviceToken}
    />
  );
};

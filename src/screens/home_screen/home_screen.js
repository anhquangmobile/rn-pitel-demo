import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, Text, View, Platform} from 'react-native';
import {
  PitelCallOut,
  PitelCallNotif,
  useRegister,
  PitelSDKContext,
} from 'react-native-pitel-voip';
import RNCallKeep from 'react-native-callkeep';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {request, PERMISSIONS} from 'react-native-permissions';

import styles from './styles';

const callkitSetup = {
  ios: {
    appName: 'rn_pitel_demo',
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'ok',
    foregroundService: {
      channelId: 'com.pitel.pitelconnect.dev',
      channelName: 'Foreground service for my app',
      notificationTitle: 'My app is running on background',
      notificationIcon: 'Path to the resource icon of the notification',
    },
  },
};

//! ANDROID OR IOS
const ext = Platform.OS == 'android' ? '121' : '120';
const phone = Platform.OS == 'android' ? '120' : '121';

export const HomeScreenComponent = ({
  navigation,
  sdkOptions,
  handleRegisterToken,
  handleRemoveToken,
  setIOSPushToken,
}) => {
  // useState & useRegister
  const {pitelSDK, setPitelSDK, callID, setCallID} =
    useContext(PitelSDKContext);
  const [isCallOut, setIsCallOut] = useState(false);
  const [isLogin, setIsLogin] = useState('FALSE');

  const {
    callState,
    receivedPhoneNumber,
    registerState,

    setCallState,
    registerFunc,
  } = useRegister({
    sdkOptions: sdkOptions,
    setPitelSDK: setPitelSDK,
    extension: ext,
  });

  // Input call out phone number
  const phoneNumber = phone;

  useEffect(() => {
    getStorageIsLogin();
  }, []);

  //! Storage login
  const getStorageIsLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('IS_LOGIN');
      if (value !== null) {
        setIsLogin(value);
      }
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };
  const setStorageIsLogin = async value => {
    try {
      await AsyncStorage.setItem('IS_LOGIN', value);
      setIsLogin(value);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  // Handle function
  const handleCreated = () => {
    navigation.navigate('Call', {
      pitelSDK: pitelSDK,
      phoneNumber: phoneNumber,
      direction: 'Outgoing',
      callState,
    });
  };

  const handleReceived = () => {
    navigation.navigate('Call', {
      phoneNumber: receivedPhoneNumber,
      direction: 'Incoming',
      callState,
      callID,
    });
  };

  const handleHangup = () => {
    RNCallKeep.endAllCalls();
    if (navigation.canGoBack()) {
      navigation.popToTop();
    }
  };

  return (
    <PitelCallNotif
      callkitSetup={callkitSetup}
      pitelSDK={pitelSDK}
      setCallState={setCallState}
      callState={callState}
      isLogin={isLogin}
      isCallOut={isCallOut}
      setCallID={setCallID}
      sdkOptions={sdkOptions}
      registerFunc={registerFunc}
      setIsCallOut={setIsCallOut}
      onCreated={handleCreated}
      onReceived={handleReceived}
      onHangup={handleHangup}
      onIOSToken={iosToken => {
        setIOSPushToken(iosToken);
      }}
      // onNativeCall={data => {
      //   console.log('onNativeCall', data);
      // }}
      // onAnswerCallAction={data => {
      //   console.log('onAnswerCallAction', data);
      //   setCallID(data.callUUID);
      // }}
      // onEndCallAction={data => {
      //   console.log('onEndCallAction', data);
      // }}
      // onIncomingCallDisplayed={data => {
      //   console.log('onIncomingCallDisplayed', data);
      // }}
      // onToggleMute={data => {
      //   console.log('onToggleMute', data);
      // }}
      // onDTMF={data => {
      //   console.log('onDTMF', data);
      // }}
    >
      <View style={styles.container}>
        <Text>{registerState}</Text>
        <TouchableOpacity
          style={styles.btnRegister}
          onPress={() => {
            if (registerState === 'UNREGISTER') {
              handleRegisterToken();
              setStorageIsLogin('TRUE');
            }
            if (registerState === 'REGISTER') {
              pitelSDK.unregister();
              handleRemoveToken();
              setStorageIsLogin('FALSE');
            }
          }}>
          <Text>
            {registerState === 'REGISTER' ? 'UNREGISTER' : 'REGISTER'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnRegister, {backgroundColor: 'orange'}]}
          onPress={async () => {
            if (Platform.OS == 'ios') {
              await request(PERMISSIONS.IOS.BLUETOOTH);
            }
            if (Platform.OS == 'android') {
              await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
            }
          }}>
          <Text>Request bluetooth</Text>
        </TouchableOpacity>

        <PitelCallOut
          child={<Text>Call</Text>}
          callToNumber={phoneNumber}
          pitelSDK={pitelSDK}
          isCallOut={isCallOut}
          setIsCallOut={setIsCallOut}
          style={styles.btnCall}
        />
      </View>
    </PitelCallNotif>
  );
};

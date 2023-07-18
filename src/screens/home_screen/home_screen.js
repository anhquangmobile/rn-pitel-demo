import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View, Platform} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {
  PitelCallOut,
  PitelCallNotif,
  useRegister,
} from 'react-native-pitel-voip';
import 'react-native-get-random-values';
import RNCallKeep from 'react-native-callkeep';

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

BackgroundTimer.start();

export const HomeScreenComponent = ({
  navigation,
  sdkOptions,
  handleRegisterToken,
  handleRemoveToken,
  setIOSPushToken,
  iosPushToken,
}) => {
  // useState & useRegister
  const [pitelSDK, setPitelSDK] = useState();
  const [callId, setCallId] = useState('');
  const [acceptCall, setAcceptCall] = useState(false);
  const [cancelCall, setCancelCall] = useState(false);

  const {
    callState,
    receivedPhoneNumber,
    registerState,

    setCallState,
    registerFunc,
  } = useRegister({
    sdkOptions: sdkOptions,
    setPitelSDK: setPitelSDK,
    // extension: '120', //! TEST IOS register extension
    extension: '121', //! TEST ANDROID register extension
  });

  // Input call out phone number
  // const phoneNumber = '121'; //! TEST IOS register extension
  const phoneNumber = '120'; //! TEST ANDROID register extension

  useEffect(() => {
    if (acceptCall) {
      registerFunc();
    }
    if (cancelCall) {
      pitelSDK.hangup();
      setCancelCall(false);
    }
  }, [acceptCall, cancelCall]);

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
    pitelSDK.accept();
    navigation.navigate('Call', {
      pitelSDK: pitelSDK,
      phoneNumber: receivedPhoneNumber,
      direction: 'Incoming',
      callState,
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
      callId={callId}
      setCallId={setCallId}
      callkitSetup={callkitSetup}
      //!
      sdkOptions={sdkOptions}
      registerFunc={registerFunc}
      onIOSToken={iosToken => {
        setIOSPushToken(iosToken);
      }}
      onNativeCall={data => {
        console.log('onNativeCall', data);
      }}
      onAnswerCallAction={data => {
        setAcceptCall(true);
      }}
      onEndCallAction={data => {
        console.log('onEndCallAction', data);
        setAcceptCall(false);
        setCancelCall(true);
      }}
      onIncomingCallDisplayed={data => {
        console.log('onIncomingCallDisplayed', data);
      }}
      onToggleMute={data => {
        console.log('onToggleMute', data);
      }}
      onDTMF={data => {
        console.log('onDTMF', data);
      }}>
      <View style={styles.container}>
        <Text>{registerState}</Text>
        <TouchableOpacity
          style={styles.btnRegister}
          onPress={() => {
            if (registerState === 'UNREGISTER') {
              registerFunc();
              handleRegisterToken();
            }
            if (registerState === 'REGISTER') {
              pitelSDK.unregister();
              handleRemoveToken();
            }
          }}>
          <Text>
            {registerState === 'REGISTER' ? 'UNREGISTER' : 'REGISTER'}
          </Text>
        </TouchableOpacity>

        <PitelCallOut
          child={<Text>Call</Text>}
          callToNumber={phoneNumber}
          sdkOptions={sdkOptions}
          pitelSDK={pitelSDK}
          setCallState={setCallState}
          callState={callState}
          style={styles.btnCall}
          onCreated={handleCreated}
          onReceived={handleReceived}
          onHangup={handleHangup}
        />
      </View>
    </PitelCallNotif>
  );
};

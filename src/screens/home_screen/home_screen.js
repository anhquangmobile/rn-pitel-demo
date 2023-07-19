import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {
  PitelCallOut,
  PitelCallNotif,
  useRegister,
  pitelRegister,
} from 'react-native-pitel-voip';
import 'react-native-get-random-values';
import RNCallKeep from 'react-native-callkeep';
import {PitelSDKContext} from '../../pitel_sdk_context';

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
  // const [pitelSDK, setPitelSDK] = useState();
  const [callId, setCallId] = useState('');
  const [direction, setDirection] = useState('OUTGOING');

  const [callState, setCallState] = useState('');
  const [receivedPhoneNumber, setReceivedPhoneNumber] = useState('');
  const [registerState, setRegisterState] = useState('UNREGISTER');

  const {pitelSDK, setPitelSDK} = useContext(PitelSDKContext);

  useEffect(() => {
    if (callState === 'REGISTER') {
      setRegisterState('REGISTER');
    }
    if (callState === 'UNREGISTER') {
      setRegisterState('UNREGISTER');
    }
  }, [callState]);

  const registerFunc = () => {
    const pitelSDKRes = pitelRegister({
      sdkOptions: sdkOptions,
      setCallState: setCallState,
      setReceivedPhoneNumber: setReceivedPhoneNumber,
      extension: '121',
    });
    setPitelSDK(pitelSDKRes);
  };

  // const {
  //   callState,
  //   receivedPhoneNumber,
  //   registerState,

  //   setCallState,
  //   registerFunc,
  // } = useRegister({
  //   sdkOptions: sdkOptions,
  //   setPitelSDK: setPitelSDK,
  //   // extension: '120', //! TEST IOS register extension
  //   extension: '121', //! TEST ANDROID register extension
  // });

  // Input call out phone number
  // const phoneNumber = '121'; //! TEST IOS register extension
  const phoneNumber = '120'; //! TEST ANDROID register extension

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
    setDirection('INCOMING');
    navigation.navigate('Call', {
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
      pitelSDK={pitelSDK}
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
        console.log('onAnswerCallAction', data);
      }}
      onEndCallAction={data => {
        console.log('onEndCallAction', data);
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

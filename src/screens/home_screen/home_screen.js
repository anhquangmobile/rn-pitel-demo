import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {PitelCallOut, useRegister} from 'react-native-pitel-voip';
import 'react-native-get-random-values';
import RNCallKeep from 'react-native-callkeep';

import styles from './styles';

export const HomeScreenComponent = ({
  navigation,
  sdkOptions,
  acceptCall,
  handleRegisterToken,
  handleRemoveToken,
}) => {
  // useState & useRegister
  const [pitelSDK, setPitelSDK] = useState();

  const {
    callState,
    receivedPhoneNumber,
    registerState,

    setCallState,
    registerFunc,
  } = useRegister({
    sdkOptions: sdkOptions,
    setPitelSDK: setPitelSDK,
    // extension: '120', //! IOS register extension
    extension: '121', //! ANDROID register extension
  });

  // Input call out phone number
  const phoneNumber = '121';
  useEffect(() => {
    if (acceptCall) {
      registerFunc();
    }
  }, [acceptCall]);

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
        <Text>{registerState === 'REGISTER' ? 'UNREGISTER' : 'REGISTER'}</Text>
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
  );
};

import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {PitelCallOut, useRegister} from 'react-native-pitel-voip';

import styles from './styles';

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
  const sdkOptions = {
    sipOnly: true,
    sipDomain: 'ccp-demo.tel4vn.com',
    wsServer: 'wss://psbc01.tel4vn.com:7444',
    sipPassword: 'Agent20@@2023',
    debug: true,
  };

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
    extension: '120', // register extension
  });

  useEffect(() => {}, [pitelSDK]);

  // Input call out phone number
  const phoneNumber = '121';

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
      pitelSDK: pitelSDK,
      phoneNumber: receivedPhoneNumber,
      direction: 'Incoming',
      callState,
    });
  };

  const handleHangup = () => {
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
          }
          if (registerState === 'REGISTER') {
            pitelSDK.unregister();
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

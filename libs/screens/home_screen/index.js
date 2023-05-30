import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {PitelCallOut, useRegister} from 'react-native-pitel-voip';

export const HomeScreen = ({navigation}) => {
  const sdkOptions = {
    sipOnly: true,
    sipDomain: 'mobile.tel4vn.com:50061',
    wsServer: 'wss://wss-mobile.tel4vn.com:7444',
    sipPassword: 'Tel4vn.com123@',
    debug: true,
  };
  const [pitelSDK, setPitelSDK] = useState();

  const {
    callState,
    receivedPhoneNumber,
    isCallOut,

    setCallState,
    registerFunc,
    setIsCallOut,
  } = useRegister({
    sdkOptions: sdkOptions,
    setPitelSDK: setPitelSDK,
  });

  const phoneNumber = '104';

  return (
    <View style={styles.container}>
      <PitelCallOut
        btnTitle={'Call'}
        callToNumber={phoneNumber}
        sdkOptions={sdkOptions}
        pitelSDK={pitelSDK}
        onReceived={() => {
          navigation.navigate('Call', {
            pitelSDK: pitelSDK,
            phoneNumber: receivedPhoneNumber,
            direction: 'Incoming',
            callState,
          });
        }}
        onHangup={() => {
          navigation.popToTop();
        }}
        onCreated={() => {
          navigation.navigate('Call', {
            pitelSDK: pitelSDK,
            phoneNumber: phoneNumber,
            direction: 'Outgoing',
            callState,
          });
        }}
        setIsCallOut={setIsCallOut}
        isCallOut={isCallOut}
        setCallState={setCallState}
        callState={callState}
        style={styles.btnCall}
        handleCallOut={() => {
          setIsCallOut(true);
        }}
      />
      <TouchableOpacity
        style={{height: 50, width: 100, marginTop: 20}}
        onPress={() => {
          registerFunc();
        }}>
        <Text>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{height: 50, width: 100, marginTop: 20}}
        onPress={() => {
          navigation.navigate('Call', {
            pitelSDK: pitelSDK,
            phoneNumber: '104',
            direction: 'Incoming',
            callState: 'CALL_RECEIVED',
          });
        }}>
        <Text>Navigate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCall: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

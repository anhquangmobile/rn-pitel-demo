import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {PitelCallOut, useRegister} from 'react-native-pitel-voip';

export const HomeScreen = ({navigation}) => {
  const [callOut, setCallOut] = useState(false);

  const sdkOptions = {
    sipOnly: true,
    sipDomain: 'mobile.tel4vn.com:50061',
    wsServer: 'wss://wss-mobile.tel4vn.com:7444',
    sipPassword: 'Tel4vn.com123@',
    debug: true,
  };
  const {callState, pitelSDK} = useRegister(sdkOptions);

  useEffect(() => {
    switch (callState) {
      case 'CALL_RECEIVED':
        pitelSDK.accept();
        navigation.navigate('Call', {
          pitelSDK: pitelSDK,
        });
        break;
      case 'CALL_HANGUP':
        navigation.popToTop();
        break;
    }
    if (callOut && pitelSDK) {
      navigation.navigate('Call', {
        pitelSDK: pitelSDK,
      });
      setCallOut(false);
    }
  }, [pitelSDK, callOut, callState]);

  return (
    <View style={styles.container}>
      <PitelCallOut
        btnTitle={'Call'}
        callToNumber={'104'}
        sdkOptions={sdkOptions}
        handleCallOut={() => {
          setCallOut(true);
        }}
        onHangup={() => {
          navigation.popToTop();
        }}
        style={styles.btnCall}
      />
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

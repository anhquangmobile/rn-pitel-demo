import React, {useContext} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {
  PitelCallOut,
  PitelCallNotif,
  useRegister,
  PitelSDKContext,
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

export const HomeScreenComponent = ({
  navigation,
  sdkOptions,
  handleRegisterToken,
  handleRemoveToken,
  setIOSPushToken,
}) => {
  // useState & useRegister
  const {pitelSDK, setPitelSDK} = useContext(PitelSDKContext);

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
      callkitSetup={callkitSetup}
      pitelSDK={pitelSDK}
      setCallState={setCallState}
      callState={callState}
      onCreated={handleCreated}
      onReceived={handleReceived}
      onHangup={handleHangup}
      //!
      sdkOptions={sdkOptions}
      registerFunc={registerFunc}
      onIOSToken={iosToken => {
        setIOSPushToken(iosToken);
      }}
      // onNativeCall={data => {
      //   console.log('onNativeCall', data);
      // }}
      // onAnswerCallAction={data => {
      //   console.log('onAnswerCallAction', data);
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
          pitelSDK={pitelSDK}
          style={styles.btnCall}
        />
      </View>
    </PitelCallNotif>
  );
};

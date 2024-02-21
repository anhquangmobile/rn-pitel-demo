import React, {useState, useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {PitelCallOut, PitelSDKContext} from 'react-native-pitel-voip';
import styles from './styles';

const phoneNumber = `${CALL_OUT_PHONE_NUMBER}`;

export const StartScreen = ({navigation, route}) => {
  const [isCallOut, setIsCallOut] = useState(false);

  const {callState} = route.params;

  const {pitelSDK} = useContext(PitelSDKContext);

  const handleCreated = () => {
    navigation.navigate('Call', {
      pitelSDK: pitelSDK,
      phoneNumber: phoneNumber,
      direction: 'Outgoing',
      callState,
    });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Start screen</Text>
      <Button
        onPress={() => navigation.navigate('Home')}
        title="Go to Home"
        color="#841584"
      />
      <PitelCallOut
        child={<Text>Call</Text>}
        callToNumber={phoneNumber}
        pitelSDK={pitelSDK}
        isCallOut={isCallOut}
        setIsCallOut={setIsCallOut}
        style={styles.btnCall}
        onPress={() => handleCreated()}
      />
    </View>
  );
};

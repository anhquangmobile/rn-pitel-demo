import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import styles from './styles';
import {PitelCallKit} from 'react-native-pitel-voip';

export const CallScreen = ({route, navigation}) => {
  const {pitelSDK} = route.params;

  return (
    <PitelCallKit
      pitelSDK={pitelSDK}
      onHangup={() => {
        console.log('===========onHangup===========');
        pitelSDK.hangup();
        navigation.goBack();
      }}
      onMicro={() => {
        pitelSDK.mute();
        console.log('------onMicro------');
      }}
      onSpeaker={() => {
        pitelSDK.unmute();
        console.log('------onSpeaker------');
      }}
    />
  );
};

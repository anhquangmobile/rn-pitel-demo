import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import styles from './styles';
import {PitelCallKit} from 'react-native-pitel-voip';
import InCallManager from 'react-native-incall-manager';

export const CallScreen = ({route, navigation}) => {
  const [mute, setMute] = useState(false);
  const [speaker, setSpeaker] = useState(false);

  const {pitelSDK} = route.params;

  return (
    <PitelCallKit
      pitelSDK={pitelSDK}
      microStatus={mute}
      onHangup={() => {
        console.log('===========onHangup===========');
        pitelSDK.hangup();
        InCallManager.stop();
      }}
      onMicro={() => {
        setMute(!mute);
      }}
      onSpeaker={() => {
        InCallManager.setSpeakerphoneOn(true);
        setSpeaker(!speaker);
        console.log('------onSpeaker------');
      }}
    />
  );
};

import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import styles from './styles';
import {PitelCallKit} from 'react-native-pitel-voip';

export const CallScreen = ({route, navigation}) => {
  const [mute, setMute] = useState(false);
  const [speaker, setSpeaker] = useState(false);

  const {pitelSDK} = route.params;

  return (
    <PitelCallKit
      pitelSDK={pitelSDK}
      microState={mute}
      speakerState={speaker}
      onHangup={() => {
        pitelSDK.hangup();
      }}
      onMicro={() => {
        setMute(!mute);
      }}
      onSpeaker={() => {
        setSpeaker(!speaker);
      }}
    />
  );
};

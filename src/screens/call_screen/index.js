import React, {useState, useEffect} from 'react';
import {PitelCallKit} from 'react-native-pitel-voip';

export const CallScreen = ({route, navigation}) => {
  const [mute, setMute] = useState(false);
  const [speaker, setSpeaker] = useState(false);

  const {pitelSDK, phoneNumber, direction, callState} = route.params;

  useEffect(() => {
    return () => pitelSDK.hangup();
  }, []);

  return (
    <PitelCallKit
      pitelSDK={pitelSDK}
      callState={callState}
      phoneNumber={phoneNumber}
      direction={direction}
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

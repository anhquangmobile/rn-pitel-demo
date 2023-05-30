import React, {useState} from 'react';
import {PitelCallKit} from 'react-native-pitel-voip';

export const CallScreen = ({route}) => {
  const [mute, setMute] = useState(false);
  const [speaker, setSpeaker] = useState(false);

  const {pitelSDK, phoneNumber, direction, callState} = route.params;

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

import React, {useState, useContext} from 'react';
import {PitelCallKit, PitelSDKContext} from 'react-native-pitel-voip';

export const CallScreen = ({route, navigation}) => {
  const [mute, setMute] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const {pitelSDK} = useContext(PitelSDKContext);

  const {phoneNumber, direction, callState, callID} = route.params;

  return (
    <PitelCallKit
      pitelSDK={pitelSDK}
      callState={callState}
      phoneNumber={phoneNumber}
      direction={direction}
      microState={mute}
      speakerState={speaker}
      callID={callID}
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

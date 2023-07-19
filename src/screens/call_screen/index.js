import React, {useState, useContext} from 'react';
import {PitelCallKit} from 'react-native-pitel-voip';
import {PitelSDKContext} from '../../pitel_sdk_context';

export const CallScreen = ({route, navigation}) => {
  const [mute, setMute] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const {pitelSDK} = useContext(PitelSDKContext);

  const {phoneNumber, direction, callState} = route.params;

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

import React, {useState, useContext} from 'react';
import {PitelCallKit, PitelSDKContext} from 'react-native-pitel-voip';

export const CallScreen = ({route, navigation}) => {
  const {pitelSDK} = useContext(PitelSDKContext);

  const {phoneNumber, direction, callState, callID} = route.params;

  return (
    <PitelCallKit
      pitelSDK={pitelSDK}
      callState={callState}
      phoneNumber={phoneNumber}
      direction={direction}
      callID={callID}
      textClock={'Connecting...'}
      onHangup={() => {
        pitelSDK.hangup();
      }}
    />
  );
};

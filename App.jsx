/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import PitelSDK from 'pitel-sdk-webrtc';
import {
  mediaDevices,
  MediaStream,
  MediaStreamTrack,
  MediaStreamTrackEvent,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'pitel-react-native-webrtc';
import { pitelRegister } from './libs/pitel_register';
import { pitelCallOut } from './libs/pitel_call_out';


window.RTCPeerConnection = window.RTCPeerConnection || RTCPeerConnection;
window.RTCIceCandidate = window.RTCIceCandidate || RTCIceCandidate;
window.RTCSessionDescription =
  window.RTCSessionDescription || RTCSessionDescription;
window.MediaStream = window.MediaStream || MediaStream;
window.MediaStreamTrack = window.MediaStreamTrack || MediaStreamTrack;
window.MediaStreamTrackEvent =
  window.MediaStreamTrackEvent || MediaStreamTrackEvent;
window.navigator.mediaDevices = window.navigator.mediaDevices || mediaDevices;
window.navigator.getUserMedia =
  window.navigator.getUserMedia || mediaDevices.getUserMedia;

function App() {
  const sdkOptions = {
    sipOnly: true,
    sipDomain: 'mobile.tel4vn.com:50061',
    wsServer: 'wss://wss-mobile.tel4vn.com:7444',
    sipPassword: 'Tel4vn.com123@',
    debug: true,
  };

  const registerExtension = () => {
    pitelRegister(sdkOptions);
  }
  const callOutgoing = () => {
    pitelCallOut(sdkOptions);
  }

  return (
    <View style={styles.container}>
      <Text>Pushkit, Callkit</Text>
      <TouchableOpacity style={styles.btnCall} onPress={() => registerExtension()}>
        <Text>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnCall} onPress={() => callOutgoing()}>
        <Text>Call out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnCall} onPress={() => hangup()}>
        <Text>Hand up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  btnCall: {
    height: 40,
    width: 200,
    backgroundColor: "cyan",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  }
});

export default App;

import PitelSDK from 'pitel-sdk-webrtc';


export const pitelCallOut = (sdkOptions) => {
    var isOnCall = false;
    const sdkDelegates = {
        onRegistered() {
            if (!isOnCall) {
                setTimeout(() => {
                    pitelSDK.call(104);
                }, 500);
            }
        },
        onUnregistered() {
        },
        onCallCreated(remoteNumber) {
            isOnCall = true;
        },
        onCallReceived(remoteNumber) {
            pitelSDK.accept();
        },
        onCallAnswered() {
            isOnCall = true;
        },
        onCallHangup() {
            isOnCall = false;
        },
        onCallHold() {
        },
    };
    let pitelSDK = new PitelSDK('xxx', 'xxx', '103', sdkDelegates, sdkOptions);
    return pitelSDK;
}
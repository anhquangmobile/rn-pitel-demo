# rn-pitel-demo

React Native - Pitel VoIP demo

# Initialize

```yaml
yarn install
```

# Run source

- IOS

```
yarn ios
```

- Android

```
yarn android
```

- Run on specific device

```
yarn ios --device="device_name"
yarn ios --device="Quang iPhone"
yarn ios --configuration Release --device "Quang iPhone"
yarn android --device="device_name"
yarn android --mode release
```

- Run android

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

```
echo 'export PATH=${PATH}:$HOME/Library/Android/sdk/platform-tools/' >> ~/.zshrc
source ~/.zshrc
adb devices
```

Note: 1.0.3 package id

- Find: com.pitel.pitelconnect.dev
- Replace: com.rn_pitel_demo

# rn-pitel-demo

React Native - Pitel VoIP demo
[![N|Solid](https://documents.tel4vn.com/img/pitel-logo.png)](https://documents.tel4vn.com/)

# Initialize

> **Note**
> rn-pitel-demo using react native 0.71.4

- **Setup to wake up app**: please follow guide in [here](https://github.com/tel4vn/flutter-pitel-voip/blob/main/PUSH_NOTIF.md) to setting push notification (FCM for android), Pushkit (for IOS).

```yaml
yarn install
```

- Installing your Firebase configuration file:

* Android: add file `google-services.json` to `android/app/google-services.json`
* IOS: open Xcode & add file `GoogleService-Info.plist` to `ios/GoogleService-Info.plist` (guide in [here](https://github.com/anhquangmobile/react-native-pitel-voip/blob/main/%20PUSH_NOTIF.md))

# Usage

- In file `src/screens/home_screen/index.js` please enter the information.

```js
const ext = `${EXTENSION}`;
const sipPass = `${EXTENSION_SIP_PASSWORD}`;
const appId = `${BUNDLE_ID}`;
const domainUrl = `${DOMAIN}`;
...
const sdkOptionsInit = {
    sipDomain: `${DOMAIN}`,
    port: `${PORT}`,
    extension: ext,
    wssServer: `${WSS_URL}`,
    sipPassword: sipPass,
    bundleId: appId, // Bundle id for IOS
    packageId: appId, // Package id for Android
    teamId: `${TEAM_ID}`, // Team id of Apple developer account
  };
```

- In file `src/screens/home_screen/home_screen` please enter the information.

```js
const ext = `${EXTENSION}`;
const phone = `${CALL_OUT_PHONE_NUMBER}`;
const iosAppName = `${IOS_APP_NAME}`;
```

# Run source code

```js
// Android
yarn android

// IOS
yarn ios
yarn ios --device="device_name" // specific device
```

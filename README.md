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
yarn android --device="device_name"
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

# React Native Mobx Master

Debug your React Native MobX stores and emit actions through Flipper.

When filtering on stores, you will see all actions (methods using the @action decorator) in the selected store.
You will then be able to type in a payload and emit back to the React Native app, which will call the action with the payload and update your store.

https://github.com/tranjog/flipper-plugin-mobx-master/assets/6737260/e9487dc9-5524-45be-8692-fe9cedc87f9b


## Installation

1. TBC: Link to github repo with example app

2. Install [flipper-plugin-mobx-master](https://github.com/tranjog/flipper-plugin-mobx-master) in the Flipper desktop client:

```
Manage Plugins > Install Plugins > search "mobx-master" > Install
```

## Acknowledgement

This plugin stands on shoulders of giants, and is greatly inspired by [mobx-action-flipper](https://github.com/chvanlennep/mobx-action-flipper) and [mobx-flipper](https://github.com/khorark/mobx-flipper).

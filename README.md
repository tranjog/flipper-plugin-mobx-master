# React Native Mobx Master

Debug your React Native MobX stores and emit actions through Flipper.

When filtering on stores, you will see all actions (methods using the @action decorator) in the selected store.
You will then be able to type in a payload and emit back to the React Native app, which will call the action with the payload and update your store.

https://github.com/tranjog/flipper-plugin-mobx-master/assets/6737260/80169577-885e-42d3-a43e-f1c170df333c

## Installation

1. Please see the demo app repository: [mobx-master-demo-app](https://github.com/tranjog/mobx-master-demo-app) for an example of how to implement the React Native middleware.

2. Install [flipper-plugin-mobx-master](https://github.com/tranjog/flipper-plugin-mobx-master) in the Flipper desktop client:

```
Manage Plugins > Install Plugins > search "mobx-master" > Install
```

## Acknowledgement

This plugin stands on shoulders of giants, and is greatly inspired by [flipper-plugin-mobx-action-debugger](https://github.com/chvanlennep/flipper-plugin-mobx-action-debugger) and [flipper-plugin-mobx-debugger](https://github.com/khorark/flipper-plugin-mobx-debugger).

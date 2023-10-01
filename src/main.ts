import './assets/main.scss';

import type { App } from 'vue';

import MyButton from './components/MyButton';
import MyCheckbox from './components/MyCheckbox';
import MyIcon from './components/MyIcon';
import MySelect from './components/MySelect';
import MySwitch from './components/MySwitch';
import MyTooltip from './components/MyTooltip';
import MyModal from './components/MyModal';
import MyMutableModal from './components/MyMutableModal';

export {
  MyButton,
  MyCheckbox,
  MyIcon,
  MySelect,
  MySwitch,
  MyTooltip,
  MyModal,
  MyMutableModal,
};

export default {
  install: (app: App) => {
    app
      .component('MyButton', MyButton)
      .component('MyCheckbox', MyCheckbox)
      .component('MyIcon', MyIcon)
      .component('MySelect', () => {
        return MySelect;
      })
      .component('MySwitch', MyCheckbox)
      .component('MyTooltip', MyTooltip)
      .component('MyModal', MyModal)
      .component('MyMutableModal', MyMutableModal);
  },
};

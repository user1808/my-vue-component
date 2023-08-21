import type {
  TIndeterminate,
  TDisabled,
  TReadonly,
  TCheckboxIcon,
} from './my-checkbox.types';

const DEFAULT_INDETERMINATE: TIndeterminate = false;
const DEFAULT_DISABLED: TDisabled = false;
const DEFAULT_READONLY: TReadonly = false;

const INDETERMINATE_ICON_NAME: TCheckboxIcon =
  'indeterminate-check-box';
const CHECKED_ICON_NAME: TCheckboxIcon = 'check-box';
const UNCHECKED_ICON_NAME: TCheckboxIcon = 'check-box-outline-blank';

export default {
  DEFAULT_INDETERMINATE,
  DEFAULT_DISABLED,
  DEFAULT_READONLY,
  INDETERMINATE_ICON_NAME,
  CHECKED_ICON_NAME,
  UNCHECKED_ICON_NAME,
};

import type {
  TIndeterminate,
  TDisabled,
  TReadonly,
  TCheckboxIcon,
  TRipple,
} from './my-checkbox.types';

const DEFAULT_INDETERMINATE: TIndeterminate = false as const;
const DEFAULT_DISABLED: TDisabled = false as const;
const DEFAULT_READONLY: TReadonly = false as const;
const DEFAULT_RIPPLE: TRipple = true as const;

const INDETERMINATE_ICON_NAME: TCheckboxIcon =
  'indeterminate-check-box' as const;
const CHECKED_ICON_NAME: TCheckboxIcon = 'check-box' as const;
const UNCHECKED_ICON_NAME: TCheckboxIcon =
  'check-box-outline-blank' as const;

export default {
  DEFAULT_INDETERMINATE,
  DEFAULT_DISABLED,
  DEFAULT_READONLY,
  INDETERMINATE_ICON_NAME,
  CHECKED_ICON_NAME,
  UNCHECKED_ICON_NAME,
  DEFAULT_RIPPLE,
};

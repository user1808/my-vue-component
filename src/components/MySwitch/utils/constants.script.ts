import type {
  TIndeterminate,
  TInset,
  TDisabled,
  TReadonly,
  TRipple,
  TModelValue,
} from './my-switch.types';

const DEFAULT_INDETERMINATE: TIndeterminate = false as const;
const DEFAULT_INSET: TInset = false as const;
const DEFAULT_DISABLED: TDisabled = false as const;
const DEFAULT_READONLY: TReadonly = false as const;
const DEFAULT_RIPPLE: TRipple = true as const;
const DEFAULT_MODEL_VALUE: TModelValue = undefined;

export default {
  DEFAULT_INDETERMINATE,
  DEFAULT_INSET,
  DEFAULT_DISABLED,
  DEFAULT_READONLY,
  DEFAULT_RIPPLE,
  DEFAULT_MODEL_VALUE,
};

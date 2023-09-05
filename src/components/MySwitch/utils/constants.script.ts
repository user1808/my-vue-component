import type {
  TIndeterminate,
  TInset,
  TDisabled,
  TReadonly,
} from './my-switch.types';

const DEFAULT_INDETERMINATE: TIndeterminate = false as const;
const DEFAULT_INSET: TInset = false as const;
const DEFAULT_DISABLED: TDisabled = false as const;
const DEFAULT_READONLY: TReadonly = false as const;

export default {
  DEFAULT_INDETERMINATE,
  DEFAULT_INSET,
  DEFAULT_DISABLED,
  DEFAULT_READONLY,
};

export type TModelValue = Undefinedable<boolean>;
export type TIndeterminate = boolean;
export type TColor = string;
export type TDisabled = boolean;
export type TReadonly = boolean;
export type TRipple = boolean;

export type TMyCheckboxProps = {
  modelValue?: TModelValue;
  indeterminate?: TIndeterminate;
  color?: TColor;
  disabled?: TDisabled;
  readonly?: TReadonly;
  ripple?: TRipple;
};

export type TCheckboxIcon =
  | 'indeterminate-check-box'
  | 'check-box'
  | 'check-box-outline-blank';

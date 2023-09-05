export type TModelValue = Undefinedable<boolean>;
export type TIndeterminate = boolean;
type TColor = string;
export type TDisabled = boolean;
export type TReadonly = boolean;
export type TInset = boolean;

export type TMySwitchProps = {
  modelValue: TModelValue;
  indeterminate?: TIndeterminate;
  color?: TColor;
  disabled?: TDisabled;
  readonly?: TReadonly;
  inset?: TInset;
};

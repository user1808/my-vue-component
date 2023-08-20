export type TModelValue = boolean;
export type TColor = string;
export type TSize = number;
export type TInset = boolean;
type TDisabled = boolean;

export type TMySwitchProps = {
  modelValue: TModelValue;
  color?: TColor;
  height?: TSize;
  width?: TSize;
  inset?: TInset;
  disabled?: TDisabled;
};

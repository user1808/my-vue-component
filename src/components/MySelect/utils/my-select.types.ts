type TItems<T> = Array<T>;
export type TItemTitleAndValue<T> = T extends object
  ? keyof T
  : never;
export type TFontSize = number;
export type TMaxOptionItems = number;
export type TClearable = boolean;
export type TDisabled = boolean;
type TOpen = boolean;
type TIsItemSelected = boolean;
type TActive = boolean;
type TSelected = boolean;
type TItemTitle = unknown;
export type TRipple = boolean;

export type TMySelectProps<T> = {
  modelValue?: Nullable<T>;
  items: TItems<T>;
  itemValue?: TItemTitleAndValue<T>;
  itemTitle?: TItemTitleAndValue<T>;
  selectedFontSize?: TFontSize;
  optionsFontSize?: TFontSize;
  maxOptionItems?: TMaxOptionItems;
  clearable?: TClearable;
  disabled?: TDisabled;
  ripple?: TRipple;
};

export type TMySelectClearIconProps = {
  clearable: TClearable;
  disabled: TDisabled;
  open: TOpen;
  isItemSelected: TIsItemSelected;
};

export type TMySelectOpenIconProps = {
  open: TOpen;
  disabled: TDisabled;
};

export type TMySelectOptionProps = {
  active: TActive;
  selected: TSelected;
  itemTitle: TItemTitle;
  fontSize: TFontSize;
  ripple: TRipple;
};

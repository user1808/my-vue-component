export type TModelValue = boolean;
type TTitle = string;
export type THideTitle = boolean;
type THideCloseIcon = boolean;
type TSize = number;
export type TResizable = boolean;
export type TStayOpened = boolean;
type TColor = string;
export type TType = 'central' | 'bottom';
export type TBottomTypeScrollable = boolean;

export type TMyModalProps = {
  modelValue: TModelValue;
  title?: TTitle;
  hideTitle?: THideTitle;
  hideCloseIcon?: THideCloseIcon;
  minWidth?: TSize;
  maxWidth?: TSize;
  width?: TSize;
  minHeight?: TSize;
  maxHeight?: TSize;
  height?: TSize;
  resizable?: TResizable;
  stayOpened?: TStayOpened;
  bgColor?: TColor;
  color?: TColor;
  type?: TType;
  bottomTypeScrollable?: TBottomTypeScrollable;
};

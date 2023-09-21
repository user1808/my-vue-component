export type TPosition = 'top' | 'right' | 'bottom' | 'left';
export type TSecondaryPosition =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'center';
export type THideArrow = boolean;
type TText = string;
export type TAlwaysShow = boolean;
export type TTooltipSizes = string | number;
export type TDisabled = boolean;

export type TMyTooltipProps = {
  primaryPosition?: TPosition;
  secondaryPosition?: TSecondaryPosition;
  hideArrow?: THideArrow;
  text?: TText;
  alwaysShow?: TAlwaysShow;
  maxWidth?: TTooltipSizes;
  maxHeight?: TTooltipSizes;
  width?: TTooltipSizes;
  height?: TTooltipSizes;
  disabled?: TDisabled;
};

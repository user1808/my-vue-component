export type TFlat = boolean;
export type TWithoutHoverColor = boolean;
export type TContentHoverOpacity = boolean;
export type TOutlined = boolean;
export type TRipple = boolean;
export type TDisabled = boolean;
type TBgColor = string;
type TColor = string;
export type TBgColorVariant = 'background' | 'outline';

export type TMyButtonProps = {
  flat?: TFlat;
  withoutHoverColor?: TWithoutHoverColor;
  contentHoverOpacity?: TContentHoverOpacity;
  outlined?: TOutlined;
  ripple?: TRipple;
  disabled?: TDisabled;
  bgColor?: TBgColor;
  color?: TColor;
  bgColorVariant?: TBgColorVariant;
};

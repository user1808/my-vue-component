import type {
  TFontSize,
  TMaxOptionItems,
  TClearable,
  TDisabled,
  TRipple,
} from './my-select.types';

const DEFAULT_SELECTED_FONT_SIZE: TFontSize = 18 as const;
const DEFAULT_OPTIONS_FONT_SIZE: TFontSize = 16 as const;
const DEFAULT_MAX_OPTION_ITEMS: TMaxOptionItems = 5 as const;
const DEFAULT_CLEARABLE: TClearable = false as const;
const DEFAULT_DISABLED: TDisabled = false as const;
const DEFAULT_RIPPLE: TRipple = true as const;

export default {
  DEFAULT_SELECTED_FONT_SIZE,
  DEFAULT_OPTIONS_FONT_SIZE,
  DEFAULT_MAX_OPTION_ITEMS,
  DEFAULT_CLEARABLE,
  DEFAULT_DISABLED,
  DEFAULT_RIPPLE,
};

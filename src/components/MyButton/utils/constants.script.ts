import type {
  TFlat,
  TWithoutHoverColor,
  TContentHoverOpacity,
  TOutlined,
  TRipple,
  TDisabled,
} from './my-button.types';

const DEFAULT_FLAT: TFlat = false as const;
const DEFAULT_WITHOUT_HOVER_COLOR: TWithoutHoverColor =
  false as const;
const DEFAULT_CONTENT_HOVER_OPACITY: TContentHoverOpacity =
  false as const;
const DEFAULT_OUTLINED: TOutlined = false as const;
const DEFAULT_RIPPLE: TRipple = true as const;
const DEFAULT_DISABLED: TDisabled = false as const;

export default {
  DEFAULT_FLAT,
  DEFAULT_WITHOUT_HOVER_COLOR,
  DEFAULT_CONTENT_HOVER_OPACITY,
  DEFAULT_OUTLINED,
  DEFAULT_RIPPLE,
  DEFAULT_DISABLED,
};

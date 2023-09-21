import type {
  TPosition,
  TSecondaryPosition,
  THideArrow,
  TAlwaysShow,
  TDisabled,
} from './my-tooltip.types';

const DEFAULT_PRIMARY_POSITION: TPosition = 'top' as const;
const DEFAULT_SECONDARY_POSITION: TSecondaryPosition =
  'center' as const;
const DEFAULT_HIDE_ARROW: THideArrow = false as const;
const DEFAULT_ALWAYS_SHOW: TAlwaysShow = false as const;
const DEFAULT_DISABLED: TDisabled = false as const;

export default {
  DEFAULT_PRIMARY_POSITION,
  DEFAULT_SECONDARY_POSITION,
  DEFAULT_HIDE_ARROW,
  DEFAULT_ALWAYS_SHOW,
  DEFAULT_DISABLED,
};

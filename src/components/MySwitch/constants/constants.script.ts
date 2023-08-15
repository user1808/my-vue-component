import type { TSize, TInset, TColor } from '../types';

const DEFAULT_HEIGHT: TSize = 14;
const DEFAULT_WIDTH: TSize = 36;

const DEFAULT_INSET: TInset = false;

const INSET_WIDTH_FACTOR = 0.625;
const STANDARD_WIDTH_FACTOR = 0.5;

const DISABLED_COLOR: TColor = '#a4a4a4';
const DEFAULT_TRACK_COLOR: TColor = 'grey';
const DEFAULT_THUMB_COLOR: TColor = 'white';

export default {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  DEFAULT_INSET,
  INSET_WIDTH_FACTOR,
  STANDARD_WIDTH_FACTOR,
  DISABLED_COLOR,
  DEFAULT_TRACK_COLOR,
  DEFAULT_THUMB_COLOR,
};

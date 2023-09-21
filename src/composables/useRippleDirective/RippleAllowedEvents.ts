/**
 * A utility class for managing allowed events during which a ripple effect may occur.
 */
export class RippleAllowedEvents {
  /**
   * An array that stores the names of allowed events.
   */
  public static readonly allowedEvents = [
    'mousedown',
    'touchstart',
  ] as const;
}

/**
 * An alias that represents a union of allowed event names.
 */
export type TAllowedEvents =
  (typeof RippleAllowedEvents.allowedEvents)[number];

/**
 * Stores type guard that checks if given event is in the {@link RippleAllowedEvents.allowedEvents | allowedEvents} array
 */
export class RippleAllowedEventsGuard {
  /**
   * Type guard which checks if given event is allowed one
   *
   * @param event - The event name to check.
   * @returns `true` if the event is allowed, `false` otherwise.
   */
  public static isRippleAllowedEvent = (
    event: any,
  ): event is TAllowedEvents => {
    return RippleAllowedEvents.allowedEvents.includes(event);
  };
}

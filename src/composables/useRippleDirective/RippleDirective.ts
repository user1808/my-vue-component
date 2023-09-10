import { type DirectiveBinding, type ObjectDirective } from 'vue';
import {
  RippleAllowedEventsGuard,
  type TAllowedEvents,
} from './RippleAllowedEvents';
import { RippleEffect } from './RippleEffect';

/**
 * Represents a function that listens for ripple effects.
 */
export type TRippleEfectListener = (
  event: MouseEvent | TouchEvent,
) => void;

/**
 * Represents the arguments for adding or removing a ripple effect.
 */
export type TAddRemoveRippleEffectArgs = {
  target: HTMLElement;
  binding: DirectiveBinding;
};

/**
 * Represents modifiers for the Ripple directive.
 */
export type TRippleDirectiveModifiers = {
  events: Set<TAllowedEvents>;
  transitionDuration: number;
};

/**
 * Class which stores logic around creating ripple effect listeners.
 */
export default class RippleDirective {
  /**
   * Map with ripple effects that have been added to the target HTMLElement.
   * Key is an allowed event name, value is the ripple effect listener.
   */
  private readonly rippleEffectsListeners: Map<
    TAllowedEvents,
    TRippleEfectListener
  > = new Map();

  /**
   * Vue ObjectDirective for vRipple directive.
   */
  public readonly vRipple: ObjectDirective<HTMLElement> = {
    updated: (target, binding) => {
      const { value, oldValue } = binding;
      if (typeof value !== 'boolean' || value === oldValue) {
        return;
      }

      if (value) {
        this.addRippleEffect({ target, binding });
      } else {
        this.removeRippleEffect({ target, binding });
      }
    },
    beforeMount: (target, binding) => {
      const { value } = binding;
      if (value === true || value === undefined) {
        this.addRippleEffect({ target, binding });
      }
    },
    beforeUnmount: (target, binding) => {
      this.removeRippleEffect({ target, binding });
    },
  };

  /**
   * Sets modifiers for the ripple directive if they are valid.
   * @param bindingModifiers - Modifiers from directive binding.
   * @returns An object containing valid modifiers.
   */
  private setModifiers(
    bindingModifiers: DirectiveBinding['modifiers'],
  ): TRippleDirectiveModifiers {
    const modifiers: TRippleDirectiveModifiers = {
      events: new Set<TAllowedEvents>(),
      transitionDuration: 400,
    };

    for (const modifier of Object.keys(bindingModifiers)) {
      const numberModifier = Number(modifier);
      if (isNaN(numberModifier)) {
        if (RippleAllowedEventsGuard.isRippleAllowedEvent(modifier)) {
          modifiers.events.add(modifier);
        }
      } else if (numberModifier > 0) {
        modifiers.transitionDuration = numberModifier;
      }
    }

    if (modifiers.events.size === 0) {
      modifiers.events.add('mousedown');
    }

    return modifiers;
  }

  /**
   * Adds a ripple effect to the target with a listener, which is also saved in `rippleEffectsListeners`.
   * @param param0 - Parameters for adding the ripple effect.
   */
  private addRippleEffect({
    target,
    binding,
  }: TAddRemoveRippleEffectArgs) {
    const modifiers = this.setModifiers(binding.modifiers);
    modifiers.events.forEach((eventName) => {
      const listener: TRippleEfectListener = (event) => {
        const rippleEffect = new RippleEffect(
          event,
          target,
          binding,
          {
            event: eventName,
            transitionDuration: modifiers.transitionDuration,
          },
        );
        rippleEffect.start();
      };
      this.rippleEffectsListeners.set(eventName, listener);
      target.addEventListener(eventName, listener);
    });
  }

  /**
   * Removes a ripple effect from the target.
   * @param param0 - Parameters for removing the ripple effect.
   */
  private removeRippleEffect({
    target,
    binding,
  }: TAddRemoveRippleEffectArgs) {
    const modifiers = this.setModifiers(binding.modifiers);
    modifiers.events.forEach((event) => {
      const listener = this.rippleEffectsListeners.get(event);
      if (listener) {
        target.removeEventListener(event, listener);
      }
    });
  }
}

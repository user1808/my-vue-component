import { nextTick } from 'process';
import type { ObjectDirective, DirectiveBinding } from 'vue';
import { useColor } from './useColor';

/**
 * Usage of v-ripple: v-ripple:[arg].[modifiers]="value"
 * arg - there, you define the position the target should have during the ripple effect (relative is default one).
 *       If it didn't have this position before the effect occured, it will be adjusted.
 * modifiers - you can input multiple values there, but only two of them are significant.
 *             If you provide a numeric value, it will determine the duration of the ripple effect.
 *             If you provide text, it will be treated as the event that triggers the ripple effect.
 * value - there, you can input a boolean value that determines whether the ripple effect will occur or not.
 */

// Ripple types
type TRippleModifiers = {
  event: (typeof allowedEvents)[number];
  transitionDuration: number;
};

type TRippleElements = {
  ripple: HTMLDivElement;
  rippleWrapper: HTMLDivElement;
};

type TAddRemoveRippleEffectArgs = {
  target: HTMLElement;
  binding: DirectiveBinding;
};

// Events list when ripple effect can start
const allowedEvents = ['mousedown'] as const;
type TAllowedEvents = (typeof allowedEvents)[number];
const isAllowedEvent = (event: string): event is TAllowedEvents => {
  return allowedEvents.includes(event as TAllowedEvents);
};

// A list of positions that can be passed as an directive arg and during ripple effect target will have this one (default one is relative, if nothing was passed or wrong value).
const allowedTargetPosition = ['absolute'] as const;
type TTargetPositions = (typeof allowedTargetPosition)[number];
const isAllowedPosition = (
  position: string,
): position is TTargetPositions => {
  return allowedTargetPosition.includes(position as TTargetPositions);
};

// Riple consts
const RIPPLE_CLASS = 'my-ripple' as const;
const RIPLE_WRAPPER_CLASS = 'my-ripple-wrapper' as const;
const POSITION_ATTR = 'previous-position' as const;

const { parseRGBAString, calculateContrast, rgbaToRgb } = useColor();

class RippleEffect {
  public static setModifiers = (
    bindingModifiers: DirectiveBinding['modifiers'],
  ): TRippleModifiers => {
    const modifiers: TRippleModifiers = {
      event: 'mousedown',
      transitionDuration: 400,
    };

    Object.keys(bindingModifiers).forEach((modifier) => {
      const numberModifier = Number(modifier);
      if (isNaN(numberModifier) && isAllowedEvent(modifier)) {
        modifiers.event = modifier;
      } else if (numberModifier > 0) {
        modifiers.transitionDuration = numberModifier;
      }
    });

    return modifiers;
  };

  public static rippleEffect = (
    event: MouseEvent,
    targetElement: HTMLElement,
    directiveBinding: DirectiveBinding,
    modifiers: TRippleModifiers,
  ) => {
    const rect = targetElement.getBoundingClientRect();
    const width = targetElement.offsetWidth;
    const height = targetElement.offsetHeight;

    const xPos = event.clientX - rect.left;
    const yPos = event.clientY - rect.top;

    const xMaxDist = Math.max(xPos, width - xPos);
    const yMaxDist = Math.max(yPos, height - yPos);

    const rippleRadius = Math.sqrt(xMaxDist ** 2 + yMaxDist ** 2);

    const { ripple, rippleWrapper } =
      this.createRippleElements(modifiers);

    this.setRippleBackgroundColor(ripple, targetElement);

    this.setPreviousPositionAttribute(
      targetElement,
      directiveBinding,
    );

    rippleWrapper.appendChild(ripple);
    targetElement.appendChild(rippleWrapper);

    ripple.style.marginLeft = xPos + 'px';
    ripple.style.marginTop = yPos + 'px';

    nextTick(() => {
      ripple.style.width = rippleRadius * 2 + 'px';
      ripple.style.height = rippleRadius * 2 + 'px';
      ripple.style.marginLeft = xPos - rippleRadius + 'px';
      ripple.style.marginTop = yPos - rippleRadius + 'px';
    });

    const clearRipple = () => {
      setTimeout(() => {
        ripple.style.backgroundColor = 'transparent';
      }, modifiers.transitionDuration * 0.4);

      setTimeout(() => {
        rippleWrapper.parentNode?.removeChild(rippleWrapper);
      }, modifiers.transitionDuration * 1.4);

      targetElement.removeEventListener('mouseup', clearRipple);
      targetElement.removeEventListener('mouseleave', clearRipple);

      if (targetElement.hasAttribute(POSITION_ATTR)) {
        setTimeout(() => {
          const clearPosition = !Array.from(
            targetElement.children,
          ).find((element: Element) => {
            return element.className === RIPLE_WRAPPER_CLASS;
          });

          if (clearPosition) {
            targetElement.style.position =
              targetElement.getAttribute(POSITION_ATTR) || 'static';
            targetElement.removeAttribute(POSITION_ATTR);
          }
        }, modifiers.transitionDuration * 1.4);
      }
    };

    if (modifiers.event === 'mousedown') {
      targetElement.addEventListener('mouseup', clearRipple);
      targetElement.addEventListener('mouseleave', clearRipple);
    } else {
      clearRipple();
    }
  };

  private static createRippleElements = (
    modifiers: TRippleModifiers,
  ): TRippleElements => {
    const ripple = document.createElement('div');
    const rippleWrapper = document.createElement('div');
    ripple.className = RIPPLE_CLASS;
    rippleWrapper.className = RIPLE_WRAPPER_CLASS;

    ripple.style.transition = `all ${modifiers.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;

    return { ripple, rippleWrapper };
  };

  private static setPreviousPositionAttribute = (
    targetElement: HTMLElement,
    directiveBinding: DirectiveBinding,
  ) => {
    directiveBinding.arg =
      directiveBinding.arg && isAllowedPosition(directiveBinding.arg)
        ? directiveBinding.arg
        : 'relative';

    const targetPosition =
      targetElement.style.position ||
      getComputedStyle(targetElement).position;

    if (
      directiveBinding.arg &&
      targetPosition !== directiveBinding.arg
    ) {
      targetElement.style.position = directiveBinding.arg;
      targetElement.setAttribute(
        POSITION_ATTR,
        targetPosition || 'static',
      );
    }
  };

  private static setRippleBackgroundColor = (
    ripple: HTMLDivElement,
    target: HTMLElement,
  ) => {
    const blackBg = 'rgba(0, 0, 0, 0.15)';
    const whiteBg = 'rgba(255, 255, 255, 0.25)';
    const targetColor = parseRGBAString(
      getComputedStyle(target).backgroundColor,
    );

    if (!targetColor) return;

    const blackContrast = calculateContrast(
      { r: 0, g: 0, b: 0 },
      rgbaToRgb(targetColor),
    );
    const whiteContrast = calculateContrast(
      { r: 255, g: 255, b: 255 },
      rgbaToRgb(targetColor),
    );

    if (blackContrast > whiteContrast) {
      ripple.style.backgroundColor = blackBg;
    } else {
      ripple.style.backgroundColor = whiteBg;
    }
  };
}

export const useRippleDirective = () => {
  let rippleEffectListener: (event: MouseEvent) => void;

  const addRippleEffect = ({
    target,
    binding,
  }: TAddRemoveRippleEffectArgs) => {
    const modifiers = RippleEffect.setModifiers(binding.modifiers);
    rippleEffectListener = (event) => {
      RippleEffect.rippleEffect(event, target, binding, modifiers);
    };
    target.addEventListener(modifiers.event, rippleEffectListener);
  };

  const removeRippleEffect = ({
    target,
    binding,
  }: TAddRemoveRippleEffectArgs) => {
    const modifiers = RippleEffect.setModifiers(binding.modifiers);
    target.removeEventListener(modifiers.event, rippleEffectListener);
  };

  const vRipple: ObjectDirective<HTMLElement> = {
    updated: (target, binding) => {
      const { value, oldValue } = binding;
      if (typeof value !== 'boolean' || value === oldValue) {
        return;
      }

      if (value) {
        addRippleEffect({ target, binding });
      } else {
        removeRippleEffect({ target, binding });
      }
    },
    beforeMount: (target, binding) => {
      const { value } = binding;
      if (value === undefined || value === true) {
        addRippleEffect({ target, binding });
      }
    },
    beforeUnmount: (target, binding) => {
      removeRippleEffect({ target, binding });
    },
  };

  return {
    vRipple,
  };
};

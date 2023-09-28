import type { DirectiveBinding } from 'vue';
import { useColor } from '../useColor';
import type { TAllowedEvents } from './RippleAllowedEvents';
import { nextTick } from 'process';
import { useAssert } from '../useAssert';

/**
 * Represents modifiers for the RippleEffect class.
 */
export type TRippleEffectModifiers = {
  event: TAllowedEvents;
  transitionDuration: number;
};

/**
 * Represents the position of a click event.
 */
export type TClickPosition = {
  x: number;
  y: number;
};

/**
 * Represents the HTML elements used for the ripple effect.
 */
export type TRippleElements = {
  ripple: HTMLDivElement;
  rippleWrapper: HTMLDivElement;
};

/**
 * Represents the radius of the ripple effect.
 */
export type TRippleRadius = {
  radius: number;
};

/**
 * Represents the arguments for beginning a ripple effect.
 */
export type TBeginRippleArgs = TClickPosition &
  TRippleElements &
  TRippleRadius;

const RIPPLE_CLASS = 'my-ripple' as const;
const RIPLE_WRAPPER_CLASS = 'my-ripple-wrapper' as const;
const RIPLE_MOUSE_WRAPPER_CLASS =
  `${RIPLE_WRAPPER_CLASS}-mouse` as const;
const RIPLE_TOUCH_WRAPPER_CLASS =
  `${RIPLE_WRAPPER_CLASS}-touch` as const;
const POSITION_ATTR = 'previous-position' as const;

const { parseRGBAString, calculateContrast, rgbaToRgb } = useColor();
const { assertUnreachable } = useAssert();

/**
 * Class representing the logic of creating a ripple effect.
 */
export class RippleEffect {
  private ripple: Undefinedable<TRippleElements['ripple']>;
  private rippleWrapper: Undefinedable<
    TRippleElements['rippleWrapper']
  >;
  private cleanRippleListener = () => this.clearRipple();

  /**
   * Creates a new instance of the RippleEffect class.
   *
   * @param event - The triggering mouse or touch event.
   * @param target - The target HTMLElement for the ripple effect.
   * @param binding - The Vue directive binding.
   * @param modifiers - Modifiers for the ripple effect.
   */
  constructor(
    private readonly event: MouseEvent | TouchEvent,
    private readonly target: HTMLElement,
    private readonly binding: DirectiveBinding,
    private readonly modifiers: TRippleEffectModifiers,
  ) {}

  /**
   * Starts the ripple effect.
   */
  public start() {
    const position = this.getClickOnTargetPosition();
    if (!position) return;
    const { x, y } = position;

    const { radius } = this.calculateRippleRadius(position);

    const { ripple, rippleWrapper } = this.createRippleElements();

    this.ripple = ripple;
    this.rippleWrapper = rippleWrapper;

    this.setRippleBackgroundColor(this.ripple);

    this.setPreviousPositionAttribute();

    this.beginRippleEffect({
      ripple: this.ripple,
      rippleWrapper: this.rippleWrapper,
      x,
      y,
      radius,
    });

    switch (this.modifiers.event) {
      case 'mousedown':
        this.target.addEventListener(
          'mouseup',
          this.cleanRippleListener,
        );
        this.target.addEventListener(
          'mouseleave',
          this.cleanRippleListener,
        );
        break;
      case 'touchstart':
        this.target.addEventListener(
          'touchend',
          this.cleanRippleListener,
        );
        break;
      default:
        this.clearRipple();
    }
  }

  /**
   * Retrieves the click position on the target element.
   * @returns The click position or null if the event type is unexpected.
   */
  private getClickOnTargetPosition(): Nullable<TClickPosition> {
    const targetRect = this.target.getBoundingClientRect();

    const clickPosition: TClickPosition = { x: 0, y: 0 };

    if (this.event instanceof MouseEvent) {
      /**
       * If touch event already occurred, then mouse ripple event shouldn't happen
       */
      if (this.isTouchRippleExist()) return null;
      clickPosition.x = this.event.clientX - targetRect.left;
      clickPosition.y = this.event.clientY - targetRect.top;
    } else if (this.event instanceof TouchEvent) {
      const firstTouch = this.event.targetTouches.item(0);
      if (!firstTouch) return null;
      clickPosition.x = firstTouch.clientX - targetRect.left;
      clickPosition.y = firstTouch.clientY - targetRect.top;
    } else {
      assertUnreachable(this.event);
    }
    return clickPosition;
  }

  /**
   * Checks if a touch-based ripple wrapper exists in the target element.
   * @returns true if a touch-based ripple wrapper exists, false otherwise.
   */
  private isTouchRippleExist(): boolean {
    return !!Array.from(this.target.children).find(
      (element: Element) => {
        return element.className === RIPLE_TOUCH_WRAPPER_CLASS;
      },
    );
  }

  /**
   * Calculates the radius of the ripple effect.
   * @param param0 - The click position.
   * @returns The radius of the ripple.
   */
  private calculateRippleRadius({
    x,
    y,
  }: TClickPosition): TRippleRadius {
    const width = this.target.offsetWidth;
    const height = this.target.offsetHeight;

    const xMaxDist = Math.max(x, width - x);
    const yMaxDist = Math.max(y, height - y);

    const radius = Math.sqrt(xMaxDist ** 2 + yMaxDist ** 2);

    return { radius };
  }

  /**
   * Creates the HTML elements for the ripple effect.
   * @returns The ripple and ripple wrapper elements.
   */
  private createRippleElements(): TRippleElements {
    const ripple = document.createElement('div');
    const rippleWrapper = document.createElement('div');
    ripple.className = RIPPLE_CLASS;
    if (this.event instanceof MouseEvent) {
      rippleWrapper.className = RIPLE_MOUSE_WRAPPER_CLASS;
    } else if (this.event instanceof TouchEvent) {
      rippleWrapper.className = RIPLE_TOUCH_WRAPPER_CLASS;
    } else {
      assertUnreachable(this.event);
    }

    ripple.style.transition = `all ${this.modifiers.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;

    return { ripple, rippleWrapper };
  }

  /**
   * Sets the background color of the ripple element based on the target's background color.
   * @param ripple - The ripple element.
   */
  private setRippleBackgroundColor(ripple: HTMLDivElement) {
    const blackBg = 'rgba(0, 0, 0, 0.15)';
    const whiteBg = 'rgba(255, 255, 255, 0.25)';
    const targetColor = parseRGBAString(
      getComputedStyle(this.target).backgroundColor,
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
  }

  /**
   * Sets the previous position attribute on the target element.
   */
  private setPreviousPositionAttribute() {
    const targetDuringRipplePosition = this.binding.arg || 'relative';

    const targetCurrentPosition =
      this.target.style.position ||
      getComputedStyle(this.target).position;

    if (targetCurrentPosition !== targetDuringRipplePosition) {
      this.target.style.position = targetDuringRipplePosition;
      this.target.setAttribute(
        POSITION_ATTR,
        targetCurrentPosition || 'static',
      );
    }
  }

  /**
   * Begins the ripple effect animation.
   * @param param0 - Parameters for the ripple effect animation.
   */
  private beginRippleEffect({
    ripple,
    rippleWrapper,
    x,
    y,
    radius,
  }: TBeginRippleArgs) {
    rippleWrapper.appendChild(ripple);
    this.target.appendChild(rippleWrapper);

    ripple.style.marginLeft = x + 'px';
    ripple.style.marginTop = y + 'px';

    nextTick(() => {
      ripple.style.width = radius * 2 + 'px';
      ripple.style.height = radius * 2 + 'px';
      ripple.style.marginLeft = x - radius + 'px';
      ripple.style.marginTop = y - radius + 'px';
    });
  }

  /**
   * Clears the ripple effect.
   */
  private clearRipple() {
    setTimeout(() => {
      if (this.ripple) {
        this.ripple.style.backgroundColor = 'transparent';
      }
    }, this.modifiers.transitionDuration * 0.4);

    setTimeout(() => {
      if (this.rippleWrapper) {
        this.rippleWrapper.parentNode?.removeChild(
          this.rippleWrapper,
        );
      }
    }, this.modifiers.transitionDuration * 1.4);

    this.target.removeEventListener(
      'mouseup',
      this.cleanRippleListener,
    );
    this.target.removeEventListener(
      'mouseleave',
      this.cleanRippleListener,
    );
    this.target.removeEventListener(
      'touchend',
      this.cleanRippleListener,
    );

    if (this.target.hasAttribute(POSITION_ATTR)) {
      setTimeout(() => {
        const clearPosition = !Array.from(this.target.children).find(
          (element: Element) => {
            return element.className.includes(RIPLE_WRAPPER_CLASS);
          },
        );

        if (clearPosition) {
          this.target.style.position =
            this.target.getAttribute(POSITION_ATTR) || 'static';
          this.target.removeAttribute(POSITION_ATTR);
        }
      }, this.modifiers.transitionDuration * 1.4);
    }
  }
}

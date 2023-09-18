import RippleDirective from './RippleDirective';

/**
 * Stores custom directive `v-ripple`
 */
export const useRippleDirective = () => {
  return {
    /**
     * `v-ripple` directive.
     * <br/>
     * You can pass modifers, arg and value (about them you can read here {@link https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks | Vue Custom Directives})
     * <br/>
     * 1. **arg** - there, you define the position the target should have during the ripple effect (`relative` is default one).
     *       If it didn't have this position before the effect occured, it will be adjusted.
     * 2. **modifiers** - you can input multiple values there, but only two of them are significant.
     *             If you provide a numeric value, it will determine the duration of the ripple effect (`400ms` is default).
     *             If you provide text, it will be treated as the event that triggers the ripple effect.
     *             You can provide multiple events, but only these that occurs in allowed events array will be taken into account.
     *             (`mousedown` is default).
     * 3. **value** - there, you can input a boolean value that determines whether the ripple effect will occur or not.
     *
     * @example
     * ```html
     * <!-- Ripple effect will work on mousedown and duration will be 400ms -->
     * <element v-ripple></element>
     *
     * <!-- Ripple effect will work on touchstart and duration will be 900ms -->
     * <element v-ripple.touchstart.900></element>
     *
     * <!-- Ripple effect will work only if disable value is true, on touchstart and mousedown for 300 ms, during it target will have absolute position -->
     * <element v-ripple.touchstart.mousedown.300:absolute="disable"></element>
     * ```
     */
    vRipple: new RippleDirective().vRipple,
  };
};

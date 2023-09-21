/**
 * A utility for asserting that a code path should be unreachable.
 */
export const useAssert = () => {
  /**
   * Throws an error with a message indicating that the provided value should be unreachable.
   * This is typically used in TypeScript exhaustiveness checking.
   *
   * @param value - The value that should never be reached.
   * @returns This function never returns; it always throws an error.
   *
   * @throws An error with the message 'Statement should be unreachable'.
   *
   * @example
   * ```typescript
   * // This function is often used with TypeScript exhaustiveness checking:
   * function handleStatus(status: 'success' | 'error') {
   *   switch (status) {
   *     case 'success':
   *       // Handle success case
   *       break;
   *     case 'error':
   *       // Handle error case
   *       break;
   *     default:
   *       // The following line ensures that the default case is unreachable
   *       assertUnreachable(status);
   *   }
   * }
   * ```
   */
  const assertUnreachable = (value: never): never => {
    throw new Error('Statement should be unreachable');
  };

  return {
    assertUnreachable,
  };
};

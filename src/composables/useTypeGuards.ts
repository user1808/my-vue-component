export const useTypeGuards = () => {
  const isObject = (item: any): item is object => {
    return !!item && typeof item === 'object';
  };

  return {
    isObject,
  };
};

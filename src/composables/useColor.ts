type TIsHex = boolean;

export const useColor = () => {
  const isHexColorValue = (value: Absentable<string>): TIsHex => {
    return (
      !!value &&
      /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/i.test(
        value,
      )
    );
  };

  return {
    isHexColorValue,
  };
};

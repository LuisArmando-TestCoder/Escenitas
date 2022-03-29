export default (number: number, digitIndex: number) => {
  return Number(number.toString().split("").reverse()[digitIndex]);
};

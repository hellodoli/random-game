export const getRandomPercent = (rate = 0.5) => {
  let isSuccess = false;
  const d = Math.random();
  console.log(d);
  if (d < rate) {
    isSuccess = true;
  } else {
    isSuccess = false;
  }

  return {
    rate,
    yourRate: d,
    isSuccess
  };
};

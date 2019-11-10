const WEIGHTS = [
  0,
  36,
  45,
  54,
  64,
  73,
  82,
  91,
  100,
  109,
  118,
  127,
  136,
  145,
  154,
  163,
  172];
const DAILY_INTAKES = [
  1,
  1.20,
  1.50,
  1.80,
  2.10,
  2.40,
  2.70,
  3.00,
  3.30,
  3.60,
  3.90,
  4.20,
  4.50,
  4.80,
  5.10,
  5.40,
  5.70];

export default {
  getDailyWaterIntake(weight) {
    let value = DAILY_INTAKES[DAILY_INTAKES.length - 1]; // last value
    for (let index = 0; index < WEIGHTS.length; index++) {
      const w = WEIGHTS[index];
      if (weight < w) {
        value = DAILY_INTAKES[index - 1];
        break;
      }
    }
    return value;
  }
}
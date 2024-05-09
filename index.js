/**
 * Debugging Guide
 * 1. Make the code more readable
 * 2. Pick up calculation errors
 * 3. Make these calculations robust such that the calculation does not give an incorrect result, it throws an error to the user if something has gone wrong (parameter used with an incorrect unit of measurement, etc)
 */

// Given Parameters
const initialState = {
  vel: { value: 10000, unit: "km/h" }, 
  acc: { value: 3, unit: "m/s^2" }, 
  time: { value: 3600, unit: "s" }, 
  distance: { value: 0, unit: "km" }, 
  fuel: { value: 5000, unit: "kg" }, 
  fbr: { value: 0.5, unit: "kg/s" }
};

function calculateNewState({ vel, acc, time, distance, fuel, fbr }) {


  // Convert all units to consistent units (e.g., km/h, m/s, km, kg)
  const convertedAcc = convertUnit(acc, "m/s^2", "km/h^2");
  const convertedTime = convertUnit(time, "s", "h");

  const distance2 = distance.value + (vel.value * convertedTime.value);
  const rf = fuel.value - fbr.value * time.value;
  const vel2 = vel.value + (convertedAcc.value * convertedTime.value);

  return { vel: { value: vel2, unit: "km/h" }, acc, time, distance: { value: distance2, unit: "km" }, fuel: { value: rf, unit: "kg" }, fbr };
}

function convertUnit(param, fromUnit, toUnit) {
  const conversionFactors = {
    "m/s^2": { "km/h^2": 3.6 * 3600 },
    "s": { "h": 1 / 3600 }
  };

  const conversionFactor = conversionFactors[fromUnit][toUnit];
  if (!conversionFactor) {
    console.error(`Conversion factor not found for units ${fromUnit} to ${toUnit}.`);
    return null;
  }

  const convertedValue = param.value * conversionFactor;
  return { value: convertedValue, unit: toUnit };
}

const newState = calculateNewState(initialState);

if (newState) {
  console.log(`Corrected New Velocity: ${newState.vel.value} ${newState.vel.unit}`);
  console.log(`Corrected New Distance: ${newState.distance.value} ${newState.distance.unit}`);
  console.log(`Corrected Remaining Fuel: ${newState.fuel.value} ${newState.fuel.unit}`);
}








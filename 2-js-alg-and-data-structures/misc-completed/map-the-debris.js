function orbitalPeriod(arr) {
  const GM = 398600.4418;
  const earthRadius = 6367.4447;
  const orbitalArray = [];

  arr.forEach( (obj => {
      const distance = obj.avgAlt + earthRadius;
      const OP = Math.round(2*Math.PI*(Math.sqrt(Math.pow(distance,3)/GM)));

      delete obj["avgAlt"];
      obj["orbitalPeriod"] = OP;
      orbitalArray.push(obj);
  }))

  return orbitalArray;
}
console.log(
  orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}])
)

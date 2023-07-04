// function fib(num, prevNum = 0, currNum = 1, timesIterated = 0) {
//   console.log(num, prevNum, currNum, timesIterated);
//   if(num === timesIterated) {
//     return [prevNum + currNum]
//   }
//   const sequence = [0, 1].concat( fib(num, currNum, prevNum + currNum, ++timesIterated) );

//   return sequence;
// }

// function fib(n) {
//   if(n === 0 ) { return 0 }
//   if (n === 1) { return 1; }


//   return fib(n-1) + fib(n-2)

// }

function fib(n) {
  let a = 0, b = 1, c, sum = 1; // 1 from below
  let seq = [0,1];
  // start at 2 as we already have first two values
  for(let i = 2; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
    // Only add up odd numbers
    if(c % 2 !== 0 && c <= n) {
      seq.push(c);
      sum += c;
    }
    // console.log(seq);
  }
  return sum;
}

console.log(
  fib(4000000)
)
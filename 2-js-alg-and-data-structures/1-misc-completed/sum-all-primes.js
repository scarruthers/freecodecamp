function sumPrimes(num) {
    const primes = [];

    // 2 is prime but easier to iterate this way
    if(num > 2) {
        primes.push(2);
    }

    // check all numbers from 1 to num for primes
    // 0,1 not prime, 2 is prime and handled above for the j loop
    for(let i = 3; i <= num; i+=2) {
        // divisors
        for(let j = 2; j <= num; j++) {
            // We made it all the way through and there are no divisors
            if(i === j) {
                if(i <= num) {
                    primes.push(i);
                }
            }
            // Check the next divisor
            if(i % j === 0) {
                console.log("continue: ", i, j, i % j, num);
                break;
            }  
            
        }      
    }
    // Add up the sume of the primes and return
    return primes.reduce((total, current) => total += current);
  }
  
  console.log(
      sumPrimes(977)
  )
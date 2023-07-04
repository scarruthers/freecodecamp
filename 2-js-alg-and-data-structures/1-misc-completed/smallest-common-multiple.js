// After reviewing some other code, the last two functions can be simplified down to roughly 15 lines
// May have needed to think about how prime and composite numbers work more, but this was my first time with prime factorization


// Finds the smallest common multiple from n0 to nn
function smallestCommons(arr) {
    arr.sort((a,b) => a - b); // make sure smallest number is on left so our for loops work correctly
    const primes = getPrimes(arr[1]).sort((a, b) => b - a); // sort primes from largest to smallest to make iterating in primeFactorization() easier ( want to start by dividing by larger numbers)
    const primeFactorizations = [];

    // Set up an object so we can keep track of which primes are used the most in the prime factorizations
    const mostOfEachPrime = {};
    for (let prime of primes) {
        mostOfEachPrime[prime] = 0;
    }

    // Find all the prime factorizations including and between values given by arr[0] and arr[1]
    for(let i = arr[0]; i <= arr[1]; i++) {
        // can't prime factorize 0,1
        if(i > 1) {
            primeFactorizations.push(primeFactorization(i, primes))
        }
    }
    // given a numToMatch and an array of numbers, return how many of that numToMatch are in the array
    function numCount(numToMatch, arr) {
        return arr.reduce( (count, num ) => num === numToMatch ? count += 1 : count, 0) // count is initially 0
    }

    // iterate through all of our primeFactorizations, checking how many of each prime there are
    // if a certain prime, say 3 occurs more often in this primeFactorization than so far, update mostOfEachPrime
    primeFactorizations.map((arr) => {
        primes.forEach( prime => {
            let count = numCount(prime, arr);

            if(mostOfEachPrime[prime] < count) mostOfEachPrime[prime] = count;

        });
    })

    // Final calculation of total using the prime factorization technique for smallest common multiple
    // started with [key, value] but felt [primeNumber, maximumOccurences] is more clear
    let scm = 1; // 1 so we can multiply safely
    for (const [primeNumber, maximumOccurences] of Object.entries(mostOfEachPrime)) {
        scm *= Math.pow(primeNumber, maximumOccurences);
    }

    return scm;
  }
  console.log(
      smallestCommons([9,16])
  )

// takes a number and breaks it into an array of the prime values required to multiply to acquire the number
function primeFactorization(number, primes) {
    let primeFactors = [];
    let divided = number;

    // could be put in smallestCommons(), not sure which is better
    // reading again I think it makes more sense here, keeps primefactor handling in the same place
    if(primes.includes(number)) {
        primeFactors.push(number);
        return primeFactors;
    }

    // lowest prime multiple is 2, so we can compare our primes to number / 2 to reduce calculations
    for(let prime of primes) {
        if(prime > number / 2) {
            continue;
        }
        // iterate through our primes (remember from above they are sorted largest to smallest) to try to find primes that divide equally
        // then divide by the prime and continue iterating
        while(divided % prime === 0) {
            divided /= prime;
            
            // had issues with 2, it just kept going so had to make sure we were down to the final division (divided = 1, the lowest multiplier), then break;
            if(divided === 1 && prime === 2) {
                primeFactors.push(prime);
                break;
            }
            
            // Push prime and find next prime divisor
            primeFactors.push(prime);
        }
    }
    return primeFactors;
}

// returns all primes up to maxNumber
function getPrimes(maxNumber) {
    const primes = [];

    // 2 is prime...there probably is better logic for it but iteration in the for loops seems easier
    if(maxNumber > 2) {
        primes.push(2);
    }

    // i'm sure there is a better performant calculation for this but the exercise doesn't use very large numbers
    // check all numbers from 3 to num for primes
    // 0,1 not prime, 2 is prime and handled above for the j loop
    // we know 3 is prime but then what's the point of iterating
    // primes can only be odd, so we increment i by 2
    for(let i = 3; i <= maxNumber; i+=2) {
        // divisors
        for(let j = 2; j <= maxNumber; j++) {

            // If i === j we made it to the end of the loop and there was always a remainder, so i is prime
            if(i === j) {
                if(i <= maxNumber) {
                    primes.push(i);
                }
            }

            // If there is no remainder, i is not prime, so break and check the next i value;
            // We check this after the previous block, since any prime % itself will be 0. We need to check if i === j and push the prime first
            if(i % j === 0) {
                break;
            }  

        }      
    }
    // Return our array of prime values
    return primes;
}
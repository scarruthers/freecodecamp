// TODO: comment more and clean up, as well as considering a recursive function or reduce, map filter, something different i'm not used to using

// Check if a string is a palindrome, by definition excluding all non-alphanumeric characters
function palindrome(str) {
    const regex = /[\W]|[\s+]|_/g
    const nStr = str.replaceAll(regex, "").toLowerCase();
    let i = 0;
    let j = nStr.length - 1;

    console.log(nStr);
    for(let i = 0; i < nStr.length / 2 + 1; i++) {
        console.log(`i: ${i}, j: ${j}`)
        console.log(nStr[i], nStr[j]);

        if(nStr[i] != nStr[j]) {
            return false;
        } else if ( i === j && i + 1 + j === nStr.length) {
            // everything matched so far, and we have a middle character (odd length sentence)
            return true;
        } else if(i > j) {
            // Made it all the way through, simply return true
            return true;
        } else if(nStr[i] === nStr[j]) { 
            if(i === j && i + j === nStr.length) return true;
            j--;
            continue;
        }
    }

  }
  
  console.log(
    palindrome("My age is 0, 0 si ega ym.")
  )


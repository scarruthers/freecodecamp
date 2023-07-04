function steamrollArray(arr) {
    console.log(arr)

    if(arr && arr.length === 0) {
        return [];
      }
  
    if (Array.isArray(arr[0])) {
        let shifted = arr.shift();
        return [].concat(steamrollArray(shifted)).concat(steamrollArray(arr));
    }
    else {
        let shifted = arr.shift();
        return [shifted].concat(steamrollArray(arr))
    }

  
  }

  function test(arr) {
    flat = [].concat(...arr);

    console.log(flat)

  }
  console.log(
    steamrollArray([1, [2], [3, [[4]]]])
  )

  test([1, [2], [3, [[4]]]])
  
// just realize a and b aren't necessary but leaving for posterity
function addTogether(a, b) {

  const [x, y] = arguments;

  if(typeof x === 'number'){
      if(typeof y === 'number') {
          return x + y;
      } 
      else if(arguments.length === 1) {
          return (y) => addTogether(x, y)
      } else {
          return undefined;
      }

  } else {
      return undefined;
  }
}

console.log (
  addTogether("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
)


// Old attempt at solution

// function addTogether(x, y) {
//     console.log(x, y);
//     let trulyUndefined;
  

  
//     if(!Number.isInteger(x) || !Number.isInteger(y)) {
//       return undefined;
//     }
  
//     if(Number.isInteger(x) && Number.isInteger(y)) {
//       return x + y;
//     }

//     if(y === undefined) {
//         return function(y) {
//           if(y === undefined) return undefined;
//           return x + y;
//         }
//       }


//     return trulyUndefined;
//   }
  
//   addTogether("https://www.youtube.com/watch?v=dQw4w9WgXcQ")

//   console.log(
//     Number.isInteger("https://www.youtube.com/watch?v=dQw4w9WgXcQ"))
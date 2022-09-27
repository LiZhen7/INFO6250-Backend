"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
  const letters0 = word.toUpperCase().split('');
  const letters1 = guess.toUpperCase().split('');
  let result = 0;
  
  for(let i=0;i<letters0.length;i++){
    for(let j=0;j<letters1.length;j++){
      if(letters0[i]===letters1[j]){
        result = result + 1;
        letters1.splice(j,1);
        break;
      }
    }
  }
  return result; // this line is wrong
}
;
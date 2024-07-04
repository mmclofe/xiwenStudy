function canTurnString(str){
  const set = new Set();
  str.split('').forEach(key => {
    if(set.has(key)){
      set.delete(key);
    }else{
      set.add(key);
    }
  });
  return set.size <= 1
}

const result = canTurnString("ABAA")
console.log(result)
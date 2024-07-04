function longSubStr(str){
  let arr = []
  let max = 0
  let longStr = ""
  for(let i = 0; i < str.length; i++){
    const sameIndex = arr.findIndex(item => item === str[i])
    arr.push(str[i])
    if(sameIndex > -1){
      arr = arr.splice(sameIndex + 1)
    }
    if(arr.length > longStr.length){
      max = arr.length
      longStr = arr.join("")
    }
  }
  return {
    length: max,
    longStr
  }
}
console.log(longSubStr("AABdBCAEFCDD"))
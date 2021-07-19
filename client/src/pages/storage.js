
export const LocalStorage=(key,value)=>{
      localStorage.setItem(key,JSON.stringify(value))
}
export const getLocalStorage=(key)=>{
     return JSON.parse(localStorage.getItem(key))
}
export const removeLocalStorage=()=>{
     localStorage.clear()
}
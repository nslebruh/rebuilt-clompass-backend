const typeCheck = (value: any): string => {
    const return_value = Object.prototype.toString.call(value);
    // we can also use regex to do this...
    const type = return_value.substring(
             return_value.indexOf(" ") + 1, 
             return_value.indexOf("]"));
  
    return type.toLowerCase();
}
export {typeCheck}
export const readLittleEndianBytes = function(bytes, index, length){
  let result = 0;
  const slice = bytes.slice(index, index + length);

  for (let i=0; i<length; i++) {
    result += slice.charCodeAt(i) * (1 << (i*8));
  }

  return result;
};

export const createLittleEndianBytes = function(value, length){
  let result = "";

  for (let i=0; i<length; i++){
    result += String.fromCharCode((value >> (i*8)) & 255);
  }

  return result;
};

export const readBigEndianBytes = function(bytes, index, length){
  let result = 0;
  const slice = bytes.slice(index, index + length);

  for (let i=0; i<length; i++) {
    result += slice.charCodeAt(length - i - 1) * (1 << (i*8));
  }

  return result;
};

export const createBigEndianBytes = function(value, length){
  let result = "";

  for (let i=0; i<length; i++){
    result = String.fromCharCode((value >> (i*8)) & 255) + result;
  }

  return result;
};


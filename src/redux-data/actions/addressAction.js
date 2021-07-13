export const changeAddress = ( city , road) => {
  return {
      type : 'CHANGE_ADDRESS',
      payload : {
         city ,
         road
      }
    
  };
};

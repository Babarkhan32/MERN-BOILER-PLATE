exports.pagination = (page = 1, limit = 10) => {
    const offset = (Number(page) - 1) * Number(limit);
  
    return { limit: Number(limit), offset };
  };
  
  exports.roundNumber = (number, fixPoint) => {
    return +(Math.round(number + `e+${fixPoint}`) + `e-${fixPoint}`);
  };
  
  exports.isEmailValid = (email) => {
    const regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };
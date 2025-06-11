const generateNumberWithCommas = (x: any) =>
  (x || "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export { generateNumberWithCommas };

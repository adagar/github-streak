const Yesterday = (today) => {
  let day = "0" + today.slice(-2);
  let month = today.slice(5, 7);
  let year = today.slice(0, 4);
  day = ("0" + (day - 1)).slice(-2);
  if (day < 1) {
    month = ("0" + (month - 1)).slice(-2);
    if (month < 1) {
      year--;
      month = 12;
    }
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        day = 31;
        break;
      case 2:
        if (year % 4 === 0) {
          day = 29;
        } else {
          day = 28;
        }
        break;
      case 4:
      case 6:
      case 9:
      case 11:
      default:
        day = 30;
        break;
    }
  }
  return `${year}-${month}-${day}`;
};

export default Yesterday;

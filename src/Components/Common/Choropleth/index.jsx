const getColor = (d) => {
  return d > 90
    ? "#800026"
    : d > 80
    ? "#BD0026"
    : d > 70
    ? "#D73518"
    : d > 60
    ? "#ED3730"
    : d > 50
    ? "#FC4E2A"
    : d > 40
    ? "#FD8D3C"
    : d > 30
    ? "#FEB24C"
    : d > 20
    ? "#FDE38D"
    : d > 10
    ? "#FBCC8D"
    : d > 5
    ? "#FDE6D8"
    : "#FDE6D8";
};
export default getColor;

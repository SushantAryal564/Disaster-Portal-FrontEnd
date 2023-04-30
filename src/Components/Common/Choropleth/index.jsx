const getColor = (d) => {
  return d > 90
    ? "#800026"
    : d > 85
    ? "#9E1A1A"
    : d > 80
    ? "#BD0026"
    : d > 75
    ? "#CB2821"
    : d > 70
    ? "#D73518"
    : d > 65
    ? "#E31A1C"
    : d > 60
    ? "#ED3730"
    : d > 55
    ? "#F9473A"
    : d > 50
    ? "#FC4E2A"
    : d > 45
    ? "#FD6937"
    : d > 40
    ? "#FD8D3C"
    : d > 35
    ? "#FCA261"
    : d > 30
    ? "#FEB24C"
    : d > 25
    ? "#FED570"
    : d > 20
    ? "#FDE38D"
    : d > 15
    ? "#FCE9AB"
    : d > 10
    ? "#FBCC8D"
    : d > 5
    ? "#FDE6D8"
    : "#EAD9C2";
};
export default getColor;

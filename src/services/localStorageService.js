const storeToken = (value) => {
  if (value) {
    const { access, refresh, user } = value;
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    if (user == "ward") {
      localStorage.setItem("WardId", value.userId);
      localStorage.setItem("wardNumber", value.WardNumber);
      localStorage.setItem("IsWard", true);
    } else if (user == "munciplaity") {
      localStorage.setItem("IsMunicipality", true);
    }
    // localStorage.setItem("")
  }
};

const getToken = () => {
  let access_token = localStorage.getItem("access_token");
  let refresh_token = localStorage.getItem("refresh_token");
  return { access_token, refresh_token };
};

const getUserInformation = () => {
  let WardId = localStorage.getItem("WardId");
  let IsMunicipality = localStorage.getItem("IsMunicipality");
  let IsWard = localStorage.getItem("IsWard");
  let wardNumber = localStorage.getItem("wardNumber");
  return { WardId, IsMunicipality, IsWard, wardNumber };
};

const removeToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("WardId");
  localStorage.removeItem("wardNumber");
  localStorage.removeItem("IsWard");
};

export { storeToken, getToken, removeToken, getUserInformation };

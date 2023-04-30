const storeToken = (value) => {
  if (value) {
    const { access, refresh, user } = value;
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    if (user == "ward") {
      localStorage.setItem("WardId", value.userId);
      localStorage.setItem("wardNumber", value.WardNumber);
      localStorage.setItem("IsWard", true);
    }
    if (user == "munciplaity") {
      localStorage.setItem("IsMunicipality", true);
    }
    if (user === "cluster") {
      localStorage.setItem("IsCluster", true);
      localStorage.setItem("ClusterName", value.clusterName);
    }
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
  let IsCluster = localStorage.getItem("IsCluster");
  let wardNumber = localStorage.getItem("wardNumber");
  let ClusterName = localStorage.getItem("ClusterName");
  return { WardId, IsMunicipality, IsWard, wardNumber, IsCluster, ClusterName };
};

const removeToken = () => {
  localStorage.clear();
};

export { storeToken, getToken, removeToken, getUserInformation };

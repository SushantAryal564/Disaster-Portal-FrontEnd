import { createStore } from "redux";
const initial_state = { isLoggedIn: false };
const loginReducer = (state, action) => {
  if (action.type === "logIn") {
    return {
      isLoggedIn: true,
    };
  } else if (action.type === "logout") {
    return {
      isLoggedIn: false,
    };
  }
};
const store = createStore(loginReducer);
export default store;

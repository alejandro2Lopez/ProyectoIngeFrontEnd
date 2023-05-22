import { authTypes } from "../types/authTypes";

export const AuthReducer = (state = {}, action) => {

  switch (action.type) {
    case authTypes.login:
      return {
        log: true,
        role: action.role,
        userName: action.userName,
        gmail: action.gmail,
        numberPhone: action.numberPhone
      };

    case authTypes.logout:
      return { log: false };

    default:
      return state;
  }
};

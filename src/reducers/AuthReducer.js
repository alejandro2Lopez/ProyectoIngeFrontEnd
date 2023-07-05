import { authTypes } from "../types/authTypes";

export const AuthReducer = (state = {}, action) => {

  switch (action.type) {
    case authTypes.login:
      return {
        log: true,
        role: action.role,
        userName: action.userName,
        email: action.email,
        numberPhone: action.numberPhone,
        idperson: action.idperson
      };

    case authTypes.logout:
      return { log: false };

    default:
      return state;
  }
};

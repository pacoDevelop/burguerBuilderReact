import React from "react";
import reducer from "./auth";
import * as actionsType from "../actions/actionTypes";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("auth reducer", () => {
  //   let wrapper;
  //   beforeEach(() => {
  //     wrapper = shallow(<BurgerBuilder initIngredients={() => {}} />);
  //   });
  it("Debería devolver el estado incial", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("Debería almacenar el token al login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        { type: actionsType.AUTH_SUCCESS, idToken: "somee", userId: "dadasdd" }
      )
    ).toEqual({
      token: "somee",
      userId: "dadasdd",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});

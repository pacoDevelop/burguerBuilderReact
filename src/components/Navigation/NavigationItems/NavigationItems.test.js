import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
configure({ adapter: new Adapter() });

describe("<NavigationsItems/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it("Debería renderizar 2 elementos <NavigationItem/> si no esta autenticado", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it('Debería aparecer <NavigationItem link="/logout">Cerrar Sesión</NavigationItem> si no esta autenticado', () => {
    expect(wrapper.contains(<NavigationItem link="/logout">Cerrar Sesión</NavigationItem>)).toEqual(false);
  });
  it("Debería renderizar 3 elementos <NavigationItem/> si esta autenticado", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it('Deberia aparecer <NavigationItem link="/logout">Cerrar Sesión</NavigationItem> si esta autenticado', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.contains(<NavigationItem link="/logout">Cerrar Sesión</NavigationItem>)).toEqual(true);
  });
});

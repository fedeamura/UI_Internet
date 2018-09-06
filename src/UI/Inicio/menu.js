import Home from "./Home/index";
import Test1 from "./Test1/index";
import Test2 from "./Test2/index";

const Menu = [
  {
    url: "/Inicio",
    exact: true,
    mostrarEnMenu: true,
    component: Home,
    nombre: "Servicios",
    titulo: "Servicios disponibles",
    icono: "home"
  },
  {
    url: "/Inicio/test1",
    exact: false,
    mostrarEnMenu: true,
    component: Test1,
    nombre: "Test1",
    titulo: "Titulo Test1",
    icono: "home"
  },
  {
    url: "/Inicio/test2",
    exact: false,
    mostrarEnMenu: true,
    component: Test2,
    nombre: "Test2",
    titulo: "Titulo Test2",
    icono: "home"
  }
];

export default Menu;

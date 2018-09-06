import { ALERTA_SHOW, ALERTA_HIDE} from "@Redux/Constants/index";
let id = 0;

export const mostrarAlerta = mensaje => {
  id = id + 1;

  return {
    type: ALERTA_SHOW,
    payload: { mensaje: mensaje, visible: true, id: id }
  };
};


export const mostrarAlertaVerde = mensaje => {
  id = id + 1;

  return {
    type: ALERTA_SHOW,
    payload: { mensaje: mensaje, visible: true, id: id }
  };
};

export const mostrarAlertaRojo = mensaje => {
  id = id + 1;

  return {
    type: ALERTA_SHOW,
    payload: { mensaje: mensaje, visible: true, id: id }
  };
};

export const mostrarAlertanaranja = mensaje => {
  id = id + 1;

  return {
    type: ALERTA_SHOW,
    payload: { mensaje: mensaje, visible: true, id: id }
  };
};

export const ocultarAlerta = id => ({
  type: ALERTA_HIDE,
  payload: { id: id }
});

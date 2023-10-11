import axios from "axios";

export const getIndicadorRequest = async () =>
  await axios.get("http://localhost:4000/indicadores");

export const createIndicadorRequest = async (indicador) =>
  await axios.post("http://localhost:4000/indicadores", indicador);

export const deleteIndicadorkRequest = async (id) =>
  await axios.delete(`http://localhost:4000/indicadores/${id}`);

export const getIndicadoresRequest = async (id) =>
  await axios.get(`http://localhost:4000/indicadores/${id}`);

export const updateIndicadoresRequest = async (id, newFields) =>
  await axios.put(`http://localhost:4000/tasks/${id}`, newFields);

export const toggleTaskDoneRequest = async (id, done) =>
  await axios.put(`http://localhost:4000/tasks/${id}`, {
    done,
  });
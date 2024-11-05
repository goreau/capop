import axios from "@/services/api.js";

class ServidorService {
  create(data) {
    return axios.post("/servidor", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  getServidor(id) {
    return axios.get(`/servidor/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  update(data) {
    return axios.put("/servidor", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  delete(id) {
    return axios.delete(`/servidor/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.data.msg;
    })
  }  

  getServidors(prop){
    return axios.get(`/servidors/${prop}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  getCombo(prop){
    return axios.get('/servidorcombo')
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  
}

export default new ServidorService();
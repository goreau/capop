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

  getServidorFantasia(id) {
    return axios.get(`/servidorFantasia/${id}`)
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

  getDuplicidade(){
    return axios.get('/duplicidadeServ')
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  removeDuplicidades(ids){
    return axios.post(`/delDuplicidadeServ/`, ids)
    .then(response => {
        return response.data;
    },
    (error) => {
        return error.response.data;
    })
  }
  
}

export default new ServidorService();
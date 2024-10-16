import axios from "@/services/api.js";

class UniformeService {
  upsert(data) {
    return axios.post("/uniforme", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  getUniforme(id) {
    return axios.get(`/uniforme/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  }
  
  getUniformeByServ(id) {
    return axios.get(`/uniformebyserv/${id}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  update(data) {
    return axios.put("/uniforme", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  delete(id) {
    return axios.delete(`/uniforme/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }  

  getUniformes(prop){
    return axios.get(`/uniformes/${prop}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  getCombo(prop){
    return axios.get('/uniformecombo')
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }

  
}

export default new UniformeService();
import axios from "@/services/api.js";

class ParceriaService {
  create(data) {
    return axios.post("/parceria", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }


  update(data) {
    return axios.put("/parceria", data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  delete(id) {
    return axios.delete(`/parceria/${id}`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }  



  getCombo(tipo, aux){
    return axios.get(`/auxiliares/${tipo}/${aux}`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error.response.data;
    })
  }
  
}

export default new ParceriaService();
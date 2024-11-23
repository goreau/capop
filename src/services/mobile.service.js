import axios from "@/services/api.js";

class MobileService {
  
  getTerritorios() {
    return axios.get(`/mobTerritorio`)
    .then(response => {
        return {data: response.data};
    },
    (error) => {
        return error;
    })
  } 

  editResp(data) {
    return axios.put(`/mobTerritorio`, data)
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }

  getFiles() {
    return axios.get(`/listFiles`)
    .then(response => {
      return response;
    },
    (error) => {
      return error.response.data;
    })
  }  

  getFile(file){
    return axios.get(`/getFile/${file}`,{ responseType: 'blob' })
    .then(response => {
        return  response.data;
    },
    (error) => {
        return error.response.data;
    })
  }

  manual(data){
    return axios.post("/mobExporta", { data: data })
    .then(response => {
      return response;
    },
    (error) => {
      throw new Error(error.data.msg);
    })
  }
  
}

export default new MobileService();
import axios from "@/services/api.js";

class MensalService {
    getCombos(tipo){
        return axios.get(`/mensal_base/${tipo}`)
        .then(response => {
            return {data: response.data};
        },
        (error) => {
            return error.response.data;
        })
    }

    getMensal(data){
        return axios.post(`/mensal`, data)
        .then(response => {
            return {data: response.data};
        },
        (error) => {
            return error.response.data;
        })
      }
    

}

export default new MensalService();
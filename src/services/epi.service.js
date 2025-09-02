import axios from "@/services/api.js";

class EpiService {
    create(dados) {
        return axios.post(`/epi`, dados)
            .then(response => {
                return { data: response.data };
            },
                (error) => {
                    return error.response.data;
                })
    }

    update(dados) {
        return axios.put(`/epi`, dados)
            .then(response => {
                return { data: response.data };
            },
                (error) => {
                    return error.response.data;
                })
    }

    delete(id) {
        return axios.delete(`/epi/${id}`)
            .then(response => {
                return response.data;
            },
                (error) => {
                    return error.response.data;
                })
    }

    getEpi(id) {
        return axios.get(`/epi/${id}`)
            .then(response => {
                return { data: response.data };
            },
                (error) => {
                    return error.response.data;
                })
    }

    getLista() {
        return axios.get(`/epi`)
            .then(response => {
                return { data: response.data };
            },
                (error) => {
                    return error.response.data;
                })
    }

    getComboTipo() {
        return axios.get(`/epiComboTipo`)
            .then(response => {
                return { data: response.data };
            },
                (error) => {
                    return error.response.data;
                })
    }

    getCombo() {
        return axios.get(`/epiCombo`)
            .then(response => {
                return { data: response.data };
            },
                (error) => {
                    return error.response.data;
                })
    }
}

export default new EpiService();
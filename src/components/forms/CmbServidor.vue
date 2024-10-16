<template>
    <div class="control">
      <div class="select">
        <select @change="onChange($event)" class="input" :class="errclass">
          <option value="0">-- Selecione --</option>
          <option
            v-for="loc in servidores"
            :key="loc.id"
            :value="loc.id"
            :selected="loc.id == sel"
          >
            {{ loc.nome }}
          </option>
        </select>
      </div>
    </div>
  </template>
  
  <script>
  import servidorService from "@/services/servidor.service.js";
  
  export default {
    name: "CmbServidor",
    data() {
      return {
        servidores: [],
      };
    },
    props: ['sel', 'errclass','tipo'],
    methods: {
      onChange(event) {
        this.$emit('selServ',event.target.value);
      },
      loadData() {
        servidorService.getCombo()
        .then((res) => {
          this.servidores = res.data;
        })
        .catch((err) => {
          console.log(err.response);
          this.servidores = [];
        })
      }
    },
    watch: {
      tipo(value) {
        this.loadData();
      }
    },
    mounted() {
      this.loadData();
    },
    
  };
  </script>
  
  <style scoped>
    
  </style>
  
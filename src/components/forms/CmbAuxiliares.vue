<template>
  <div class="control">
    <div class="select">
      <select @change="onChange($event)" class="input" :class="errclass">
        <option value="0">-- Selecione --</option>
        <option
          v-for="loc in auxiliares"
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
import auxiliaresService from "@/services/auxiliares.service.js";

export default {
  name: "CmbAuxiliar",
  data() {
    return {
      auxiliares: [],
    };
  },
  props: ['sel', 'errclass','tipo', 'aux'],
  methods: {
    onChange(event) {
      this.$emit('selAux',event.target.value);
    },
    loadData() {
      auxiliaresService.getCombo(this.tipo, this.aux)
      .then((res) => {
        this.auxiliares = res.data;
      })
      .catch((err) => {
        console.log(err.response);
        this.auxiliares = [];
      })
    }
  },
  watch: {
    tipo(value) {
      this.loadData();
    },
    aux(value) {
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

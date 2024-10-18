<template>
  <div class="control">
    <div class="select">
      <select @change="onChange($event)" class="input" :class="errclass">
        <option value="0">-- Selecione --</option>
        <option
          v-for="gen in data"
          :key="gen.id"
          :value="gen.campo"
          :selected="gen.id == sel"
        >
          {{ gen.exibe }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import auxiliaresService from "@/services/auxiliares.service.js";

export default {
  name: "CmbGeneric",
  data() {
    return {
    };
  },
  props: ['sel', 'errclass','tipo', 'data'],
  methods: {
    onChange(event) {
      this.$emit('selGen',event.target.value);
    },
  },
};
</script>

<style scoped>
  
</style>

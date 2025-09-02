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

export default {
  name: "CmbGeneric",
  data() {
    return {
    };
  },
  props: ['sel', 'errclass', 'data'],
  methods: {
    onChange(event) {
      this.$emit('selGen',event.target.value);
    },
  },
};
</script>

<style scoped>
  
</style>

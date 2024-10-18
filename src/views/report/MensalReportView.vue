<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <Loader v-if="isLoading" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">{{ title }}</p>
          </header>
          <div class="card-content">
            <span class="filter">{{ strFiltro }}</span>
            <MyTable :tableData="dataTable" :columns="columns" :filtered="false"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/general/Loader.vue";
import mensalService from "@/services/mensal.service";
import MyAutoTable from "@/components/forms/MyAutoTable.vue";
import MyTable from "@/components/forms/MyTable.vue";

export default {
  name: "Relatórios",
  data() {
    return {
        fantasia: '',
        mensal: {},
        dataTable: [],
        isLoading: false,
        columns: [],
        title: 'Relatórios',
        strFiltro: '',
    };
  },
  components: {
    Loader,
    MyAutoTable,
    MyTable
  },
  methods: {
    createColumns(){
        this.columns = [
            { title: this.fantasia, field: "linha"},
            { title: "JAN", field: "jan"},
            { title: "FEV", field: "fev"},
            { title: "MAR", field: "mar"},
            { title: "ABR", field: "abr"},
            { title: "MAI", field: "mai"},
            { title: "JUN", field: "jun"},
            { title: "JUL", field: "jul"},
            { title: "AGO", field: "ago"},
            { title: "SET", field: "set"},
            { title: "OUT", field: "out"},
            { title: "NOV", field: "nov"},
            { title: "DEZ", field: "dez"},
            { title: "TOTAL", field: "total"},
        ]; 
    }, 
  },
  mounted() {
    this.isLoading = true;
  
    mensalService.getMensal(this.mensal)
      .then((response) => {
        var data = response.data;
        this.dataTable = data.data;
        this.strFiltro = data.filter;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log('done');
        this.isLoading = false;
      });

    this.createColumns();
  },
  created() {
    let stMensal = localStorage.getItem('mensalCapop');
    this.mensal = JSON.parse(stMensal);
    this.fantasia = this.$route.params.linha;
  },
};
</script>

<style scoped>
.visible {
  display: none !important;
}
.filter{
  font-size: small;
  font-weight: 600;
}
</style>

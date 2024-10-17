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
            <MyTable :tableData="dataTable" :columns="columns" :is-filtered="false" :has-exports="true" :auto="this.id == 1" v-if="id != 99"/>
            <MyGroupedTable :tableData="dataTable" :columns="columns" :is-filtered="false" :has-exports="true" v-if="id == 99"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/general/Loader.vue";
import MyTable from "@/components/forms/MyTable.vue";
import MyGroupedTable from "@/components/forms/MyGroupedTable.vue";
import reportService from "@/services/report.service";

export default {
  name: "Relatórios",
  data() {
    return {
      id: 0,
      filter: {},
      dataTable: [],
      isLoading: false,
      columns: [],
      title: 'Relatórios',
      strFiltro: '',
    };
  },
  components: {
    Loader,
    MyTable,
    MyGroupedTable,
  },
  methods: {
    createColumns(){
      switch (this.id) {
        case '1':
          this.title = 'Resumo de Uniforme';
          var filt = JSON.parse(this.filter);
          switch (filt.unif) {
            case '1':
            case '5':
              this.columns = [
                { title: "Local", field: "local", type: "string" },
               /* { title: "34", field: "34", type: "string" },
                { title: "36", field: "36", type: "string" },
                { title: "38", field: "38", type: "string" },
                { title: "40", field: "40", type: "string" },
                { title: "42", field: "42", type: "string" },
                { title: "44", field: "44", type: "string" },
                { title: "46", field: "46", type: "string" },
                { title: "48", field: "48", type: "string" },
                { title: "50", field: "50", type: "string" },
                { title: "52", field: "52", type: "string" },
                { title: "54", field: "54", type: "string" },
                { title: "56", field: "56", type: "string" },
                { title: "58", field: "58", type: "string" },*/
              ];
              for (var i = 34; i<=58; i++){
                if (i % 2 === 0) {
                  var j = i.toString();
                  this.columns.push({ title: j, field: j, type: "number" });
                }
              }
              break;
            case '2':
            case '3':
            case '4':
              this.columns = [
                { title: "Local", field: "local", type: "string" },
                { title: "PP", field: "PP", type: "string" },
                { title: "P", field: "P", type: "string" },
                { title: "M", field: "M", type: "string" },
                { title: "G", field: "G", type: "string" },
                { title: "GG", field: "GG", type: "string" },
                { title: "XGG", field: "XGG", type: "string" },
                { title: "XXGG", field: "XXGG", type: "string" },
              ];
              break;  
            default:
              this.columns = [
                { title: "Local", field: "local", type: "string" },
              ];
              for (var i = 33; i<=45; i++){
                var j = i.toString();
                this.columns.push({ title: j, field: j, type: "number" })
              }
              break;
          }
          
          
          break;
        case '2':
          this.title = 'Planejamento Financeiro';
          this.columns = [
                        { title: "Programa", field: "programa", type: "string" },
                        { title: "Atividade", field: "atividade", type: "string" },
                        { title: "Município", field: "local", type: "string" },
                        { title: "Imóveis", field: "imoveis", type: "integer", sorter: "number", hozAlign:"right" },
                        { title: "Diária", field: "diaria", type: "number", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            precision:false,
                          }
                        },
                        { title: "Gratifição", field: "gratificacao", type: "string", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            precision:false,
                          }
                        },    
                        { title: "Etapa", field: "etapa", type: "string", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            precision:false,
                          }
                        },                       
                      ];
          break;
        case '3':
          this.title = 'Planejamento Operacional';
          this.columns = [
                        { title: "Programa", field: "programa", type: "string" },
                        { title: "Atividade", field: "atividade", type: "string" },
                        { title: "Município", field: "local", type: "string" },
                        { title: "Imóveis", field: "imoveis", type: "number", hozAlign:"right" },
                        { title: "Desinsetizador", field: "desin", type: "number", hozAlign:"right" },
                        { title: "Of. Operacional", field: "motorista", type: "number", hozAlign:"right" },
                        { title: "ATS", field: "vis_san", type: "number", hozAlign:"right" }, 
                        { title: "Outros", field: "outros", type: "number", hozAlign:"right" },                     
          ];
          break;
        case '4':
          this.title = 'Planejado X Executado';
          this.columns = [
                        { title: "Programa", field: "programa", type: "string" },
                        { title: "Atividade", field: "atividade", type: "string" },
                        { title: "Município", field: "local", type: "string" },
                        {title: "Programado", headerHozAlign:"center", columns: [
                          { title: "Imóveis", field: "imoveis", type: "number", hozAlign:"right" },
                          { title: "H/D", field: "hdp", type: "number", hozAlign:"right" },
                          { title: "Diária", field: "diariap", type: "number", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                              decimal:",",
                              thousand:".",
                              symbol:"",
                              symbolAfter:"p",
                              negativeSign:true,
                              precision:false,
                            }
                          },
                          { title: "Gratifição", field: "gratificacaop", type: "string", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                              decimal:",",
                              thousand:".",
                              symbol:"",
                              symbolAfter:"p",
                              negativeSign:true,
                              precision:false,
                            }
                          },    
                          { title: "Etapa", field: "etapap", type: "string", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                              decimal:",",
                              thousand:".",
                              symbol:"",
                              symbolAfter:"p",
                              negativeSign:true,
                              precision:false,
                            }
                          },    
                        ]},
                        {title: "Executado", headerHozAlign:"center", columns: [
                          { title: "Imóveis", field: "prod", type: "number", hozAlign:"right" },
                          { title: "H/D", field: "hd", type: "number", hozAlign:"right" },
                          { title: "Diária", field: "diaria", type: "number", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                              decimal:",",
                              thousand:".",
                              symbol:"",
                              symbolAfter:"p",
                              negativeSign:true,
                              precision:false,
                            }
                          },
                          { title: "Gratifição", field: "gratificacao", type: "string", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                              decimal:",",
                              thousand:".",
                              symbol:"",
                              symbolAfter:"p",
                              negativeSign:true,
                              precision:false,
                            }
                          },    
                          { title: "Etapa", field: "etapa", type: "string", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                              decimal:",",
                              thousand:".",
                              symbol:"",
                              symbolAfter:"p",
                              negativeSign:true,
                              precision:false,
                            }
                          },    
                        ]}
                     
          ];
          break;
        case '5':
          this.title = 'Capacidade Instalada';
          this.columns = [
                        { title: "Local", field: "local", type: "string" },
                        { title: "Desinsetizador", field: "desin", type: "number", hozAlign:"right" },
                        { title: "Of. Operacional", field: "motorista", type: "number", hozAlign:"right" },
                        { title: "ATS", field: "ats", type: "number", hozAlign:"right" }, 
                        { title: "Eq. Técnica", field: "tecnico", type: "number", hozAlign:"right" }, 
                        { title: "Laboratório", field: "laboratorio", type: "number", hozAlign:"right" }, 
                        { title: "Outros", field: "outros", type: "number", hozAlign:"right" }, 
                     
          ];
          break;
        case '6':
          this.title = 'Uniforme por Servidor';
         // this.group = ['municipio','programa']
          this.columns = [
                        { title: "Servidor", field: "nome", type: "string" },
                        { title: "Calça", field: "calca", type: "string" },
                        { title: "Bermuda", field: "bermuda", type: "string" },
                        { title: "Sapato", field: "sapato", type: "string" },
                        { title: "Camisa", field: "camisa", type: "string" },
                        { title: "Camiseta", field: "camiseta", type: "string", sorter: "date" },
                        { title: "Jaqueta", field: "jaqueta", type: "string" },
                      ];
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    this.isLoading = true;
  
    reportService.getRelat(this.id,this.filter)
      .then((response) => {
        var data = response.data;
        this.dataTable = data.data;
        this.strFiltro = data.filter;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));
    
    this.createColumns();
    this.isLoading = false;
  },
  created() {
    this.id = this.$route.params.id;
    this.filter = localStorage.getItem('filter');
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

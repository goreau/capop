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
            <MyTable :tableData="dataTable" :columns="columns" :filtered="false"  v-if="id != 12"/>
            <MyGroupedTable :tableData="dataTable" :columns="columns" :filtered="false" v-if="id == 12"/>
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
                { title: "Local", field: "local", type: "string" }
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
        case '7':
          this.title = 'Resumo Atividades Campo';
          this.columns = [
                        { title: "Programa", field: "programa", type: "string" },
                        { title: "Atividade", field: "atividade", type: "string" },
                        { title: "Produção", field: "producao", type: "integer", sorter: "number", hozAlign:"right" },
                        { title: "H/D", field: "hd", type: "number", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            precision:false,
                          }
                        },
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
        case '8':
          this.title = 'Indicador de Perdas';
          this.columns = [
                        { title: "Local", field: "local", type: "string" },
                        { title: "Motivo", field: "motivo", type: "string" },
                        { title: "Dias", field: "dias", type: "string" },
                      ];
          break;
        case '9':
          this.title = 'Indicador de Rendimento';
          this.columns = [
                        { title: "Servidor", field: "nome", type: "string" },
                        { title: "Programa", field: "programa", type: "string" },
                        { title: "Atividade", field: "atividade", type: "string" },
                        { title: "Rendimento", field: "rendimento", type: "string" },
                        { title: "H/D", field: "hd", type: "string" },
                        { title: "Produção", field: "producao", type: "string", sorter: "date" },
                        { title: "Ind. Rendimento", field: "ind_rend", type: "number", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            precision:false,
                          } },
                      ];
          break;
        case '10':
          this.title = 'Diárias e Passagens';
          this.columns = [
                        { title: "Favorecido", field: "favorecido", type: "string" },
                        { title: "Função", field: "funcao", type: "string" },
                        { title: "Local", field: "local", type: "string" },
                        { title: "Programa", field: "programa", type: "string" },
                        { title: "Atividade", field: "atividade", type: "string" },
                        { title: "Diária", field: "diaria", type: "number", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            precision:false,
                          }
                        },
                        { title: "Passagem", field: "passagem", type: "string", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
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
        case '11':
          this.title = 'Detalhamento de Perdas';
          this.columns = [
                        { title: "Servidor", field: "nome", type: "string" },
                        { title: "Função", field: "funcao", type: "string" },
                        { title: "Trabalhados", field: "trab", type: "number", hozAlign:"right" },
                        {title: "Perdas", headerHozAlign:"center", columns: [
                          { title: "Lic Prêmio", field: "lic_premio", type: "number", hozAlign:"right"},
                          { title: "Justif", field: "justif", type: "number", hozAlign:"right"},
                          { title: "Compensação", field: "comp", type: "number", hozAlign:"right" },
                          { title: "Clima", field: "clima", type: "number", hozAlign:"right" },
                          { title: "Falta Viat", field: "viat", type: "number", hozAlign:"right" },
                          { title: "Falta Prog", field: "prog", type: "number", hozAlign:"right" },
                          { title: "Falta Verba", field: "verba", type: "number", hozAlign:"right" },
                          { title: "Greve", field: "greve", type: "number", hozAlign:"right" },
                          { title: "Outros", field: "outros", type: "number", hozAlign:"right" },
                        ]},
                        { title: "Total", field: "total", type: "number", hozAlign:"right" },
                      ];
          break;
        case '12':
        this.title = 'Custo por Programa';
        this.group = ['local','programa']
          this.columns = [
                        { title: "Local", field: "local" },
                        { title: "Programa", field: "programa"},
                        { title: "Favorecido", field: "favorecido"},
                        { title: "Função", field: "funcao"},                       
                        { title: "Diária", field: "diaria", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            precision:false,
                          }
                        },
                        { title: "Gratificação", field: "gratificacao", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            precision:false,
                          }
                        },    
                        { title: "Etapa", field: "etapa", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
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
        if (this.id == '8'){
          this.dataTable = data.data.dados;
        } else {
          this.dataTable = data.data;
        }
        this.strFiltro = data.filter;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        //console.log('done');
        this.isLoading = false;
      });
    
    this.createColumns();
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

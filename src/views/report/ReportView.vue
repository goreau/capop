<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">{{ title }}</p>
          </header>
          <div class="card-content">
            <span class="filter">{{ strFiltro }}</span>
            <MyTable :tableData="dataTable" :columns="columns" :filtered="false" :tableName="tableName" :extra="extra"  v-if="grouped.indexOf(id) == -1"/>
            <MyGroupedTable :tableData="dataTable" :columns="columns" :is-filtered="false" :myGroups="group" :has-exports="true" v-if="grouped.indexOf(id) > -1"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      columns: [],
      title: 'Relatórios',
      strFiltro: '',
      tableName: 'capop_relatorio',
      extra: '',
      grouped: ['12','15'],
      group:[],
    };
  },
  components: {
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
                { title: "Local", field: "local",  }
              ];
              for (var i = 34; i<=58; i++){
                if (i % 2 === 0) {
                  var j = i.toString();
                  this.columns.push({ title: j, field: j });
                }
              }
              break;
            case '2':
            case '3':
            case '4':
              this.columns = [
                { title: "Local", field: "local",  },
                { title: "PP", field: "PP",  },
                { title: "P", field: "P",  },
                { title: "M", field: "M",  },
                { title: "G", field: "G",  },
                { title: "GG", field: "GG",  },
                { title: "XGG", field: "XGG",  },
                { title: "XXGG", field: "XXGG",  },
              ];
              break;  
            default:
              this.columns = [
                { title: "Local", field: "local",  },
              ];
              for (var i = 33; i<=45; i++){
                var j = i.toString();
                this.columns.push({ title: j, field: j })
              }
              break;
          }
          
          
          break;
        case '2':
          this.title = 'Planejamento Financeiro';
          this.columns = [
                        { title: "Programa", field: "programa",  },
                        { title: "Atividade", field: "atividade",  },
                        { title: "Município", field: "local",  },
                        { title: "Imóveis", field: "imoveis", sorter: "number", hozAlign:"right" },
                        { title: "Diária", field: "diaria", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //.precision:false,
                          }
                        },
                        { title: "Gratifição", field: "gratificacao", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //.precision:false,
                          }
                        },    
                        { title: "Etapa", field: "etapa", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //.precision:false,
                          }
                        },                       
                      ];
          break;
        case '3':
          this.title = 'Planejamento Operacional';
          this.columns = [
                        { title: "Programa", field: "programa",  },
                        { title: "Atividade", field: "atividade",  },
                        { title: "Município", field: "local",  },
                        { title: "Imóveis", field: "imoveis", hozAlign:"right" },
                        { title: "Desinsetizador", field: "desin", hozAlign:"right" },
                        { title: "Of. Operacional", field: "motorista", hozAlign:"right" },
                        { title: "ATS", field: "vis_san", hozAlign:"right" }, 
                        { title: "Outros", field: "outros", hozAlign:"right" },                     
          ];
          break;
        case '4':
          this.title = 'Planejado X Executado';
          this.columns = [
                        { title: "Programa", field: "programa",  },
                        { title: "Atividade", field: "atividade",  },
                        { title: "Município", field: "local",  },
                        {title: "Programado", headerHozAlign:"center", columns: [
                          { title: "Imóveis", field: "imoveis", hozAlign:"right" },
                          { title: "H/D", field: "hdp", hozAlign:"right" },
                          { title: "Diária", field: "diariap", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                              decimal:",",
                              thousand:".",
                              symbol:"",
                              symbolAfter:"p",
                              negativeSign:true,
                              //.precision:false,
                            }
                          },
                          { title: "Gratifição", field: "gratificacaop", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                              decimal:",",
                              thousand:".",
                              symbol:"",
                              symbolAfter:"p",
                              negativeSign:true,
                              //.precision:false,
                            }
                          },    
                          { title: "Etapa", field: "etapap", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                              decimal:",",
                              thousand:".",
                              symbol:"",
                              symbolAfter:"p",
                              negativeSign:true,
                              //.precision:false,
                            }
                          },    
                        ]},
                        {title: "Executado", headerHozAlign:"center", columns: [
                          { title: "Imóveis", field: "prod", hozAlign:"right" },
                          { title: "H/D", field: "hd", hozAlign:"right" },
                          { title: "Diária", field: "diaria", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                              decimal:",",
                              thousand:".",
                              symbol:"",
                              symbolAfter:"p",
                              negativeSign:true,
                              //.precision:false,
                            }
                          },
                          { title: "Gratifição", field: "gratificacao", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                              decimal:",",
                              thousand:".",
                              symbol:"",
                              symbolAfter:"p",
                              negativeSign:true,
                              //.precision:false,
                            }
                          },    
                          { title: "Etapa", field: "etapa", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                              decimal:",",
                              thousand:".",
                              symbol:"",
                              symbolAfter:"p",
                              negativeSign:true,
                              //.precision:false,
                            }
                          },    
                        ]}
                     
          ];
          break;
        case '5':
          this.title = 'Capacidade Instalada';
          this.columns = [
                        { title: "Local", field: "local",  },
                        { title: "Desinsetizador", field: "desin", bottomCalc: 'sum', hozAlign:"right" },
                        { title: "Of. Operacional", field: "motorista", bottomCalc: 'sum', hozAlign:"right" },
                        { title: "ATS", field: "ats", bottomCalc: 'sum', hozAlign:"right" }, 
                        { title: "Eq. Técnica", field: "tecnico", bottomCalc: 'sum', hozAlign:"right" }, 
                        { title: "Laboratório", field: "laboratorio", bottomCalc: 'sum', hozAlign:"right" }, 
                        { title: "Outros", field: "outros", bottomCalc: 'sum', hozAlign:"right" }, 
                     
          ];
          break;
        case '6':
          this.title = 'Uniforme por Servidor';
         // this.group = ['municipio','programa']
          this.columns = [
                        { title: "Servidor", field: "nome",  },
                        { title: "Calça", field: "calca",  },
                        { title: "Bermuda", field: "bermuda",  },
                        { title: "Sapato", field: "sapato",  },
                        { title: "Camisa", field: "camisa",  },
                        { title: "Camiseta", field: "camiseta" },
                        { title: "Jaqueta", field: "jaqueta",  },
                      ];
          break;
        case '7':
          this.title = 'Resumo Atividades Campo';
          this.columns = [
                        { title: "Local", field: "local",  },
                        { title: "Programa", field: "programa",  },
                        { title: "Atividade", field: "atividade",  },
                        { title: "Produção", field: "producao", sorter: "number", hozAlign:"right" },
                        { title: "H/D", field: "hd", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //.precision:false,
                          }
                        },
                        { title: "Diária", field: "diaria", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //.precision:false,
                          }
                        },
                        { title: "Gratifição", field: "gratificacao", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //.precision:false,
                          }
                        },    
                        { title: "Etapa", field: "etapa", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //.precision:false,
                          }
                        },         
                      ];
          break;
        case '8':
          this.title = 'Indicador de Perdas';
          this.columns = [                       
                        { title: "Motivo", field: "motivo",  },
                        { title: "Dias", field: "dias",  },
                        { title: "Percentual", field: "perc",  },
                      ];
          break;
        case '9':
          this.title = 'Indicador de Rendimento';
          this.columns = [
                        { title: "Programa", field: "programa",  },
                        { title: "Atividade", field: "atividade",  },
                        { title: "Rendimento", field: "rendimento",  },
                        { title: "H/D", field: "hd",  },
                        { title: "Produção", field: "producao", sorter: "date" },
                        { title: "Ind. Rendimento", field: "ind_rend", sorter: "number", hozAlign:"right", },
                      ];
          break;
        case '10':
          this.title = 'Diárias e Passagens';
          this.columns = [
                        { title: "Favorecido", field: "favorecido",  },
                        { title: "Função", field: "funcao",  },
                        { title: "Local", field: "local",  },
                        { title: "Programa", field: "programa",  },
                        { title: "Atividade", field: "atividade",  },
                        { title: "Diária", field: "diaria", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //.precision:false,
                          }
                        },
                        { title: "Passagem", field: "passagem", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //.precision:false,
                          }
                        },    
                      ];
          break;
        case '11':
          this.title = 'Detalhamento de Perdas';
          this.columns = [
                        { title: "Servidor", field: "nome",  },
                        { title: "Função", field: "funcao",  },
                        { title: "Trabalhados", field: "trab", hozAlign:"right" },
                        {title: "Perdas", headerHozAlign:"center", columns: [
                          { title: "Lic Prêmio", field: "lic_premio", hozAlign:"right"},
                          { title: "Justif", field: "justif", hozAlign:"right"},
                          { title: "Compensação", field: "comp", hozAlign:"right" },
                          { title: "Clima", field: "clima", hozAlign:"right" },
                          { title: "Falta Viat", field: "viat", hozAlign:"right" },
                          { title: "Falta Prog", field: "prog", hozAlign:"right" },
                          { title: "Falta Verba", field: "verba", hozAlign:"right" },
                          { title: "Greve", field: "greve", hozAlign:"right" },
                          { title: "Outros", field: "outros", hozAlign:"right" },
                        ]},
                        { title: "Total", field: "total", hozAlign:"right" },
                      ];
          break;
        case '12':
        this.title = 'Custo por Programa';
        this.group = ['programa','local']
          this.columns = [
                        { title: "Programa", field: "programa"},
                        { title: "Local", field: "local" },    
                        { title: "Favorecido", field: "favorecido"},
                        { title: "Função", field: "funcao"},                       
                        { title: "Diária", field: "diaria", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //.precision:false,
                          }
                        },
                        { title: "Gratificação", field: "gratificacao", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //.precision:false,
                          }
                        },    
                        { title: "Etapa", field: "etapa", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //.precision:false,
                          }
                        },   
                      ];
          break;
        case '13':
          this.title = 'Resumo para PPA';
          this.columns = [
                        { title: "Visitas", field: "visitas", formatter:function(cell, formatterParams, onRendered){   
                              return cell.getValue() == null ? 0 :cell.getValue(); //return the contents of the cell;
                          }, 
                        },
                        { title: "Capacitações", field: "capacitacoes", formatter:function(cell, formatterParams, onRendered){   
                              return cell.getValue() == null ? 0 :cell.getValue(); //return the contents of the cell;
                          },},
                        { title: "Assessorias", field: "assessorias", formatter:function(cell, formatterParams, onRendered){   
                              return cell.getValue() == null ? 0 :cell.getValue(); //return the contents of the cell;
                          },},
                        {title:"Total", field:"c", mutator:function(value, data){
                            return data.visitas + data.capacitacoes + data.assessorias;
                        }},
                      ];
          break;
        case '14':
          this.title = 'Boletim de Campo';
          this.columns = [
                        { title: "Dia", field: "dia",  },
                        { title: "Município", field: "municipio",  },
                        { title: "Produção", field: "producao",  },
                        { title: "Programa", field: "programa",  },
                        { title: "Atividade", field: "atividade",  },
                        { title: "Modalidade", field: "modalidade",  },
                        { title: "Perda", field: "perda",  },                        
                        { title: "Custo", field: "valor", sorter: "number", hozAlign:"right", },
                        { title: "Função", field: "funcao",  },        
                      ];
          break;
        case '15':
          this.title = 'Custo por Local';
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
                            //.precision:false,
                          }
                        },
                        { title: "Gratificação", field: "gratificacao", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //.precision:false,
                          }
                        },    
                        { title: "Etapa", field: "etapa", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //.precision:false,
                          }
                        },   
                      ];
          break;
        case '16':
          this.title = 'Valor por Servidor';
          this.columns = [
                        { title: "Local", field: "local", headerHozAlign:"center" },
                        { title: "Nome", field: "servidor", minWidth: 450, headerHozAlign:"center"},
                        { title: "Função", field: "funcao", headerHozAlign:"center"},                       
                        { title: "Diária", field: "diaria", headerHozAlign:"center", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //precision:true,
                          }
                        },
                        { title: "Gratificação", field: "gratificacao", headerHozAlign:"center", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //precision:true,
                          }
                        },    
                        { title: "Etapa", field: "etapa", sorter: "number", headerHozAlign:"center", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //precision:true,
                          }
                        },   
                        { title: "Total", field: "total", sorter: "number", headerHozAlign:"center", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //precision:true,
                          }
                        },   
                      ];
          break;
        case '17':
          this.title = 'Relação Atividades Campo';
          this.columns = [
                        { title: "GVE", field: "local",  },
                        { title: "Município", field: "municipio",  },
                        { title: "Executor", field: "executor",  },
                        { title: "Programa", field: "programa",  },
                        { title: "Atividade", field: "atividade",  },
                        { title: "Produção", field: "producao", sorter: "number", hozAlign:"right" },
                        { title: "H/D", field: "hd", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //.precision:false,
                          }
                        },
                        { title: "Diária", field: "diaria", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //.precision:false,
                          }
                        },
                        { title: "Gratifição", field: "gratificacao", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //.precision:false,
                          }
                        },    
                        { title: "Etapa", field: "etapa", sorter: "number", hozAlign:"right", formatter:"money", formatterParams:{
                            decimal:",",
                            thousand:".",
                            symbol:"",
                            symbolAfter:"p",
                            negativeSign:true,
                            //.precision:false,
                          }
                        },         
                      ];
          break;
        default:
          break;
      }
      this.loadData();
    },
    loadData(){
      reportService.getRelat(this.id,this.filter)
      .then((response) => {
        var data = response.data;
        if (this.id == '8'){
          this.dataTable = data.data.dados;
          this.extra = `Nº Desin/Dia disponíveis: ${data.data.total}  -   Indicador de Utilização: ${data.data.indicador}`;
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
      });
    }
  },
  mounted() {
    
  },
  created() {
    this.id = this.$route.params.id;
    this.filter = localStorage.getItem('filterCp');
    this.createColumns();
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

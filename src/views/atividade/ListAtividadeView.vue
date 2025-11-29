<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">

        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Atividades de Campo</p>
            <button class="button is-info is-outlined" @click="newFilter" v-show="hasRows">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-repeat" />
              </span>
              <span>Refazer Consulta</span>
            </button>
            <button class="button is-primary is-outlined" @click="newUser">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-plus-circle" />
              </span>
              <span>Novo</span>
            </button>
          </header>
          <div class="card-content">
            <section v-show="!hasRows">
              <div class="columns">
                <div class="column is-2 is-offset-3">
                  <label class="label">Início</label>
                  <div class="field">
                    <div class="control" id="contIni">
                      <input type="date" id="dtIni" />
                    </div>
                  </div>
                </div>
                <div class="column is-2 is-offset-1">
                  <label class="label">Término</label>
                  <div class="field">
                    <div class="control" id="contFim">
                      <input type="date" id="dtFim" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-5 is-offset-3">
                  <div class="field">
                    <label class="label">Município</label>
                    <div class="control">
                      <CmbMunicipio :id_prop="filter.id_municipio" :tipo="9" :sel="filter.id_municipio"
                        @selMun="filter.id_municipio = $event" :all="currentUser.nivel > 1" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-5 is-offset-3">
                  <div class="field">
                    <label class="label">Servidor</label>
                    <div class="control">
                      <CmbServidor :id_prop="filter.id_prop" :tipo="9" @selServ="filter.id_servidor = $event"
                        :sel="filter.id_servidor" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-5 is-offset-3">
                  <div class="field">
                    <label for="" class="label">Programa</label>
                    <div class="control">
                      <CmbAuxiliares @selAux="filter.id_programa = $event" :tipo="5" :sel="filter.id_programa" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-5 is-offset-3">
                  <div class="field">
                    <label for="" class="label">Atividade</label>
                    <div class="control">
                      <CmbAuxiliares @selAux="filter.id_aux_atividade = $event" :tipo="6" :aux="filter.id_programa"
                        :sel="filter.id_aux_atividade" @change="setCaption($event)" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-5 is-offset-3">
                  <div class="field">
                    <label for="" class="label">Perda</label>
                    <div class="control">
                      <CmbAuxiliares @selAux="filter.id_perda = $event" :tipo="4" :sel="filter.id_perda" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="field column is-3 is-offset-4">
                  <label class="label">&nbsp;</label>
                  <div class="control">
                    <button class="button is-link is-fullwidth" @click="loadData">
                      <span class="btico"><font-awesome-icon icon="fa-solid fa-check" /></span>
                      Carregar
                    </button>
                  </div>
                </div>
              </div>

            </section>
            <section v-show="hasRows">
              <MyTable :tableData="dataTable" :columns="columns" :filtered="true" :tableName="tableName" />
            </section>

          </div>
        </div>
        <div style="display: none;">
          <span class="icon is-small is-left" name="coisa">
            <font-awesome-icon icon="fa-solid fa-edit" />
          </span>
          <span class="icon is-small is-left" name="coisa2">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </span>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import atividadeService from "@/services/atividade.service";
import MyTable from '@/components/forms/MyTable.vue';
import Message from "@/components/general/Message.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
import CmbServidor from "@/components/forms/CmbServidor.vue";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import moment from 'moment';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";

export default {
  name: 'ListaVendas',
  data() {
    return {
      tableName: 'atividade',
      dataTable: [],
      showMessage: false,
      message: "",
      caption: "",
      type: "",
      columns: [],
      hasRows: false,
      myspan: null,
      myspan2: null,
      myspan3: null,
      id_prop: 0,
      filter: {
        dt_inicio: "",
        dt_final: "",
        id_servidor: 0,
        id_programa: 0,
        id_municipio: 0,
        id_perda: 0,
        id_aux_atividade: 0,
        id_user: 0,
      },
    }
  },
  components: {
    MyTable,
    ConfirmDialog,
    Message,
    CmbServidor,
    CmbAuxiliares,
    CmbMunicipio
  },
  methods: {
    newFilter() {
      this.hasRows = false;
    },
    trocaPerda(ev) {
      if (ev.target.value == '999' || ev.target.value == '0') {
        this.filter.id_perda = 999;
        this.filter.id_municipio = 0;
        this.filter.id_programa = 0;
        this.filter.id_aux_atividade = 0;
      } else {
        this.filter.id_municipio = 999;
        this.filter.id_programa = 999;
        this.filter.id_aux_filter = 999;
      }
    },
    newUser() {
      this.$router.push('/atividade');
    },
    editUser(id) {
      this.$router.push(`/manage/${id}`);
    },
    getFormat(row) {
      return {
        'has-text-danger-dark': row.status == 1,
        'has-text-danger': row.status == 2,
        'has-text-info': row.status == 3,
        'has-text-success': row.status == 9,
        'has-text-info': row.status == 7
      }
    },
    loadData() {
      localStorage.setItem('mainAtivCp', JSON.stringify(this.filter));

      atividadeService.getAtividades(this.filter)
        .then(async (response) => {
          this.dataTable = response.data;
          if (this.dataTable.length > 0) {
            this.hasRows = true;
          } else {
            localStorage.removeItem('mainAtivCp');
            this.message = "Favor refazer a consulta!";
            this.showMessage = true;
            this.type = "warning";
            this.caption = "Atividades";
            setTimeout(() => {
              this.showMessage = false;
              window.location.reload();
            }, 3000);


          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => { });
    },
    startCalendar() {
      const teste = document.querySelector('#dtIni');

      if (teste.type == 'text') {
        const elIni = document.querySelector('#contIni');
        elIni.innerHTML = "<input type='date' id='dtIni' />";

        const elFim = document.querySelector('#contFim');
        elFim.innerHTML = "<input type='date' id='dtFim' />";
      }

      const element = document.querySelector('#dtIni');
      var options = {
        type: "date",
        dateFormat: "dd/MM/yyyy",
        startDate: this.filter.dt_inicio,
        showHeader: false,
        color: "primary",
        cancelLabel: 'Cancelar',
        showClearButton: false,
        todayLabel: 'Hoje',
      };

      var calini = bulmaCalendar.attach('#dtIni', options);

      if (element) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        element.bulmaCalendar.on('select', datepicker => {
          this.filter.dt_inicio = moment(datepicker.data.startDate).format('YYYY-MM-DD');
        });

        element.bulmaCalendar.on('clear', datepicker => {
          this.filter.dt_inicio = '';
        });
      }

      const parentDiv1 = document.querySelector('#contIni');
      const btToday1 = parentDiv1.querySelector('.datetimepicker-footer-today');
      if (btToday1) {
        btToday1.classList.remove('has-text-warning');
        btToday1.classList.add('has-text-link');
        btToday1.addEventListener('click', () => {
          const todayDate = new Date();
          element.bulmaCalendar.options.startDate = todayDate;
          element.bulmaCalendar.emit('select', { startDate: todayDate });
        });
      }

      options = {
        type: "date",
        dateFormat: "dd/MM/yyyy",
        startDate: this.filter.dt_final,
        showHeader: false,
        color: "primary",
        cancelLabel: 'Cancelar',
        showClearButton: false,
        todayLabel: 'Hoje',
      };

      var calfim = bulmaCalendar.attach('#dtFim', options);

      const element2 = document.querySelector('#dtFim');

      if (element2) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        element2.bulmaCalendar.on('select', datepicker => {
          this.filter.dt_final = moment(datepicker.data.startDate).format('YYYY-MM-DD');
        });

        element2.bulmaCalendar.on('clear', datepicker => {
          this.filter.dt_final = '';
        });
      }

      const parentDiv = document.querySelector('#contFim');
      const btToday = parentDiv.querySelector('.datetimepicker-footer-today');
      if (btToday) {
        btToday.classList.remove('has-text-warning');
        btToday.classList.add('has-text-link');
        btToday.addEventListener('click', () => {
          const todayDate = new Date();
          element2.bulmaCalendar.options.startDate = todayDate;
          element2.bulmaCalendar.emit('select', { startDate: todayDate });
        });
      }

    }
  },
  mounted() {
    this.filter.id_user = this.currentUser.id;

    var stFilter = JSON.parse(localStorage.getItem('mainAtivCp'));

    if (stFilter) {
      this.filter = stFilter;
      // this.loadData();
    }

    this.myspan = document.getElementsByName('coisa')[0];
    this.myspan2 = document.getElementsByName('coisa2')[0];
    //document.createElement('span');
    // this.myspan.innerHTML='<p>teste</p>';;

    this.startCalendar();

    this.columns = [
      {
        title: 'Data', field: 'data', sorter: "date", minWidth: 100, responsive: 2, formatter: "datetime", formatterParams: {
          inputFormat: "yyyy-MM-dd",
          outputFormat: "dd/MM/yyyy",
          invalidPlaceholder: "Data inválida",
          timezone: "America/Sao_Paulo",
        }
      },
      { title: 'Unidade', field: 'unidade', minWidth: 250, responsive: 5 },
      { title: 'Servidor', field: 'servidor', minWidth: 300, responsive: 1 },
      { title: 'Local', field: 'local', minWidth: 250, responsive: 4 },
      { title: 'Programa', field: 'programa', minWidth: 150, responsive: 4 },
      { title: 'Atividade', field: 'aux_atividade', minWidth: 250, responsive: 2 },
      { title: 'Produção', field: 'producao', minWidth: 100, responsive: 3 },
      { title: 'Tipo Pgto', field: 'pagamento', minWidth: 100, responsive: 4 },
      {
        title: 'Valor', field: 'valor', minWidth: 100, responsive: 3, hozAlign: "right", formatter: "money", formatterParams: {
          decimal: ",",
          thousand: ".",
          symbol: "",
          symbolAfter: "p",
          negativeSign: true,
        },
        accessorDownload: (value) => {
          return Number(value);
        }
      },
      { title: 'Responsável', field: 'owner', minWidth: 100, responsive: 3 },
      {
        title: 'Ações', responsive: 0, minWidth: 200,
        formatter: (cell, formatterParrams) => {
          const row = cell.getRow().getData();

          const btEdit = document.createElement('button');
          btEdit.type = 'button';
          btEdit.title = 'Editar';
          btEdit.disabled = this.currentUser.id != row.owner_id;
          btEdit.style.cssText = 'height: fit-content; margin-left: 1rem;';
          btEdit.classList.add('button', 'is-primary', 'is-outlined');
          btEdit.innerHTML = this.myspan.innerHTML;
          btEdit.addEventListener('click', () => {
            this.$router.push(`/editAtividade/${row.id_atividade}`);
          });

          /* const teste = document.createElement('div'); 
            teste.classList.add('icon', 'is-small');
            teste.innerHTML='<span><font-awesome-icon icon=\"fa-solid fa-envelope\" /></span>';*/

          const btDel = document.createElement('button');
          btDel.type = 'button';
          btDel.title = 'Excluir';
          btDel.disabled = this.currentUser.id != row.owner_id;
          btDel.style.cssText = 'height: fit-content; margin-left: 1rem;';
          btDel.classList.add('button', 'is-danger', 'is-outlined');
          btDel.innerHTML = this.myspan2.innerHTML;
          btDel.addEventListener('click', async () => {
            const ok = await this.$refs.confirmDialog.show({
              title: 'Excluir',
              message: 'Deseja mesmo excluir essa atividade?',
              okButton: 'Confirmar',
            })
            if (ok) {
              atividadeService.delete(row.id_atividade)
                .then(resp => {
                  if (resp.status == '200') {
                    location.reload();
                  } else {
                    this.message = resp;
                    this.showMessage = true;
                    this.type = "alert";
                    this.caption = "Usuário";
                    setTimeout(() => (this.showMessage = false), 3000);
                  }
                })
                .catch(err => {
                  this.message = err;
                  this.showMessage = true;
                  this.type = "alert";
                  this.caption = "Usuário";
                  setTimeout(() => (this.showMessage = false), 3000);
                })
            }
          });


          const buttonHolder = document.createElement('span');
          buttonHolder.appendChild(btEdit);
          buttonHolder.appendChild(btDel);


          return buttonHolder;

        }
      }
    ]
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
}
</script>

<style scoped>
.button {
  margin-right: 1rem;
}
</style>
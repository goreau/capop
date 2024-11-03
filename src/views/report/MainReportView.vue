<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-three-fifths">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Relatórios</p>
          </header>
          <div class="card-content">
            <div class="content">
              <section class="section">
                <div class="dvTipo">
                  <label class="label">Filtros:</label>
                  <div class="columns" v-if="currentUser.nivel == 1">
                    <div class="column is-full">
                      <div class="field">
                        <label class="label">Regional</label>
                        <div class="control">
                          <CmbTerritorio :id_prop="currentUser.id" :sel="filter.id_drs" :tipo="2"
                            @selTerr="filter.id_drs = $event" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="columns" v-if="currentUser.nivel >= 2">
                    <div class="column is-full">
                      <div class="field">
                        <label class="label">GVE</label>
                        <div class="control">
                          <CmbTerritorio :id_prop="currentUser.id" :sel="filter.id_gve" :tipo="3"
                            @selTerr="filter.id_gve = $event" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-full">
                      <div class="field">
                        <label class="label">Município</label>
                        <div class="control">
                          <CmbMunicipio :id_prop="currentUser.id" :sel="filter.id_municipio" :tipo="9" :all="false"
                            @selTerr="filter.id_municipio = $event" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="columns" v-if="tipo_relat == 1 || tipo_relat == 14">
                    <div class="column is-full">
                      <div class="field">
                        <label class="label">Servidor</label>
                        <div class="control">
                          <CmbServidor :id_prop="filter.id_prop" :tipo="9" @selServ="filter.id_servidor = $event" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <fieldset class="fieldset" v-if="tipo_relat == 1">
                    <legend>Tipo de Uniforme</legend>
                    <div class="control has-icons-left has-icons-right">
                      <div class="columns">
                        <div class="column is-2">
                          <label class="radio">
                            <input type="radio" name="unif" value="1" v-model="filter.unif" />
                            Calça
                          </label>
                        </div>
                        <div class="column is-2">
                          <label class="radio">
                            <input type="radio" name="unif" value="2" v-model="filter.unif" />
                            Camisa
                          </label>
                        </div>
                        <div class="column is-2">
                          <label class="radio">
                            <input type="radio" name="unif" value="3" v-model="filter.unif" />
                            Camiseta
                          </label>
                        </div>
                        <div class="column is-2">
                          <label class="radio">
                            <input type="radio" name="unif" value="4" v-model="filter.unif" />
                            Jaqueta
                          </label>
                        </div>
                        <div class="column is-2">
                          <label class="radio">
                            <input type="radio" name="unif" value="5" v-model="filter.unif" />
                            Bermuda
                          </label>
                        </div>
                        <div class="column is-2">
                          <label class="radio">
                            <input type="radio" name="unif" value="6" v-model="filter.unif" />
                            Sapato
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <div class="columns" v-if="hasData">
                    <div class="column is-4">
                      <label class="label">Início</label>
                      <div class="field">
                        <div class="control" id="contIni">
                          <input type="date" id="dtIni" />
                        </div>
                      </div>
                    </div>
                    <div class="column is-4">
                      <label class="label">Término</label>
                      <div class="field">
                        <div class="control" id="contFim">
                          <input type="date" id="dtFim" />
                        </div>
                      </div>
                    </div>
                    <div class="column is-4">
                      <label class="label">Mês</label>
                      <div class="field">
                        <div class="control" id="contMes">
                          <input type="month" id="dtMes" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section class="section" v-if="tipo_relat > 0">
                <div class="columns is-centered">
                  <div class="column is-4">
                    <div class="control">
                      <button class="button is-link submit-btn is-fullwidth" id="login" @click="processar">
                        <span class="btico"><font-awesome-icon icon="fa-solid fa-check" /></span>
                        Processar
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import CmbTerritorio from "@/components/forms/CmbTerritorio.vue";
import CmbGeneric from "@/components/forms/CmbGeneric.vue";
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import CmbServidor from "@/components/forms/CmbServidor.vue";
import moment from 'moment';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";

export default {
  data() {
    return {
      tipo_relat: 1,
      filter: {
        id_regional: 0,
        id_gve: 0,
        dt_inicio: "",
        dt_final: "",
        mes: "",
        id_programa: 0,
        id_servidor: 0,
        id_prop: 0,
        unif: 1,
      },
      cFooter: {
        strSubmit: 'Filtrar',
        strCancel: 'Cancelar',
        strAux: '',
        aux: false
      },
      hasData: false,
      ini_date: '',
      fim_date: '',
      id_usuario: 0,
      unidade: "",
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  components: {
    Message,
    Loader,
    CmbTerritorio,
    CmbMunicipio,
    CmbGeneric,
    CmbServidor
  },
  methods: {
    processar() {
      this.filter.id_prop = this.id_usuario;
      localStorage.setItem('filter', JSON.stringify(this.filter));

      if (this.tipo_relat < 100) {
        this.$router.push(`/report/${this.tipo_relat}`);
      } else {
        this.$router.push(`/reportN/${this.tipo_relat}`);
      }
    },
  },
  mounted() {
    let cUser = this.currentUser;
    if (cUser) {
      this.id_usuario = cUser.id;
    }

    var obj = localStorage.getItem('filter');
    if (obj) {
      this.filter = JSON.parse(obj);

      this.ini_date = this.filter.dt_inicio == '' ? null : moment(String(this.filter.dt_inicio)).format('DD/MM/YYYY');
      this.fim_date = this.filter.dt_final == '' ? null : moment(String(this.filter.dt_final)).format('DD/MM/YYYY');
    }
    if (this.hasData) {

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
        startDate: this.ini_date,
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
        startDate: this.fim_date,
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


      const elementM = document.querySelector('#dtMes');

      if (elementM.type == 'text') {
        const elDt = document.querySelector('#contMes');
        elDt.innerHTML = "<input type='month' id='dtMes' />";

      }
      var options = {
        type: "date",
        dateFormat: "MMMM/yyyy",
        startDate: this.mes,
        showHeader: false,
        color: "primary",
        cancelLabel: 'Cancelar',
        showClearButton: false,
        todayLabel: 'Hoje',
      };

      var calMes = bulmaCalendar.attach('#dtMes', options);

      if (elementM) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        elementM.bulmaCalendar.on('select', datepicker => {
          this.filter.mes = moment(datepicker.data.startDate).format('YYYY-MM-DD');
        });

        elementM.bulmaCalendar.on('clear', datepicker => {
          this.filter.mes = '';
        });
      }
    }

  },
  created() {
    this.tipo_relat = this.$route.params.id;
    var dtarray = new Array('1', '5');
    this.hasData = dtarray.indexOf(this.tipo_relat) == -1;
  },
  watch: {
    '$route'() {
      this.tipo_relat = this.$route.params.id;
      var dtarray = new Array('1', '5');
      this.hasData = dtarray.indexOf(this.tipo_relat) == -1;
    }
  },
};
</script>

<style scoped>
.submit-btn {
  background-color: #4f52a3;
  color: #e6e2db;
  font-weight: bold;
  border: 2px solid #13156e;
  padding: 1rem;
  font-size: 1rem;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.myToday {
  color: #FF5722 !important
}

.submit-btn:hover {
  background-color: transparent;
  color: #13156e;
  border: 2px solid #4f52a3;
}

.btico {
  padding-right: 2rem;
  margin-left: -2rem;
}

section {
  padding: .5rem;
}

.radio {
  margin-left: 1rem !important;
  width: 100%;
}

.flatpickr-input {
  width: auto;
}

.flatpickr-input[readonly] {
  width: auto;
}

.dvTipo {
  border: 1px solid #aaa;
  border-radius: 4px;
  position: relative;
  padding: 1.25rem 2.5rem 1.25rem 1.5rem;
  width: 100%;
}

label.radio {
  margin-left: 1rem;
  margin-top: .5rem;
}

.fieldset {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .02);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
}

.fieldset>legend {
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 700;
  background-color: #fff;
  padding: 0 5px;
  width: max-content;
  border: 0 none
}
</style>

<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-three-fifths">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Atividade</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="columns">
                <div class="column is-4">
                  <div class="field">
                    <label class="label">Data</label>
                    <div class="control" id="contDate">
                      <input type="text" id="dtCad">
                    </div>
                    <span class="is-error" v-if="v$.atividade.dt_cadastro.$error">
                      {{ v$.atividade.dt_cadastro.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Servidor</label>
                    <div class="control">
                      <CmbServidor :id_prop="atividade.id_prop" :tipo="9" @selServ="atividade.id_servidor = $event"
                        :errclass="{ 'is-danger': v$.atividade.id_servidor.$error }" />
                      <span class="is-error" v-if="v$.atividade.id_servidor.$error">
                        {{ v$.atividade.id_servidor.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column"></div>
                <div class="column"></div>
              </div>

              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">Município</label>
                    <div class="control">
                      <CmbMunicipio :id_prop="atividade.id_municipio" :tipo="9" :sel="atividade.id_municipio"
                        @selMun="atividade.id_municipio = $event" :disabled="atividade.id_perda != 999" :all="currentUser.nivel > 1"
                        :errclass="{ 'is-danger': v$.atividade.id_municipio.$error }" />
                      <span class="is-error" v-if="v$.atividade.id_municipio.$error">
                        {{ v$.atividade.id_municipio.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label for="" class="label">Perda</label>
                    <div class="control">
                      <CmbAuxiliares @selAux="atividade.id_perda = $event" :tipo="4" :sel="atividade.id_perda" @change="trocaPerda($event)" />
                      <span class="is-error" v-if="v$.atividade.id_perda.$error">
                        {{ v$.atividade.id_perda.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label for="" class="label">Programa</label>
                    <div class="control">
                      <CmbAuxiliares @selAux="atividade.id_programa = $event" :tipo="5" :sel="atividade.id_programa" :disabled="atividade.id_perda != 999"/>
                      <span class="is-error" v-if="v$.atividade.id_programa.$error">
                        {{ v$.atividade.id_programa.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label for="" class="label">Atividade</label>
                    <div class="control">
                      <CmbAuxiliares @selAux="atividade.id_aux_atividade = $event" :tipo="6" :aux="atividade.id_programa"
                        :sel="atividade.id_aux_atividade" @change="setCaption($event)" :disabled="atividade.id_perda != 999" />
                      <span class="is-error" v-if="v$.atividade.id_aux_atividade.$error">
                        {{ v$.atividade.id_aux_atividade.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label for="" class="label">Modalidade</label>
                    <div class="control">
                      <CmbAuxiliares @selAux="atividade.id_modalidade = $event" :tipo="7" :aux="atividade.id_modalidade"
                        :sel="atividade.id_modalidade" :disabled="atividade.id_perda != 999" />
                      <span class="is-error" v-if="v$.atividade.id_modalidade.$error">
                        {{ v$.atividade.id_modalidade.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">{{ strProd }}</label>
                    <input class="input" type="text" v-model="atividade.producao"
                      :disabled="atividade.id_perda != 999" />
                  </div>
                </div>
              </div>
              <fieldset class="fieldset">
                <legend>Tipo de Pagamento</legend>
                <div class="control has-icons-left has-icons-right">
                  <div class="columns">
                    <div class="column is-3" v-for="pgt in pgtos" :key="pgt.id">
                      <label class="radio">
                        <input type="radio" name="pgto" :value="pgt.id" v-model="pgto" :disabled="atividade.id_perda != 999" />
                        {{ pgt.nome }}
                      </label>
                    </div>
                  </div>
                </div>
                <span class="is-error" v-if="v$.atividade.id_pagamento.$error">
                  {{ v$.atividade.id_pagamento.$errors[0].$message }}
                </span>
              </fieldset>
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label for="" class="label">Lista Siafem</label>
                    <div class="control">
                      <CmbAuxiliares @selAux="atividade.id_lista = $event" :tipo="9" :aux="atividade.id_lista"
                        :sel="atividade.id_lista" :disabled="atividade.id_perda != 999" />
                      <span class="is-error" v-if="v$.atividade.id_lista.$error">
                        {{ v$.atividade.id_lista.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Valor</label>
                    <input class="input" type="text" v-model="atividade.valor" :disabled="atividade.id_perda != 999 || atividade.id_pagamento == 0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <footerCard @submit="create" @cancel="null" @aux="repeat" :cFooter="cFooter" />
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import CmbServidor from "@/components/forms/CmbServidor.vue";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import footerCard from '@/components/forms/FooterCard.vue'
import atividadeService from "@/services/atividade.service";
import auxiliaresService from "@/services/auxiliares.service.js";
import moment from 'moment';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import useValidate from "@vuelidate/core";
import {
  required$,
  combo$,
  minLength$,
} from "../../components/forms/validators.js";

export default {
  data() {
    return {
      atividade: {
        dt_cadastro: "",
        id_servidor: 0,
        id_municipio: 0,
        id_perda: 999,
        id_programa: 0,
        id_aux_atividade: 0,
        id_modalidade: 0,
        producao: 0,
        id_pagamento: 0,
        id_lista: 0,
        owner_id: 0,
        valor: ''
      },
      pgtos: [],
      pgto: 0,
      v$: useValidate(),
      isLoading: false,
      message: "",
      caption: "",
      strLocal: "Local",
      strProd: "Produção",
      type: "",
      showMessage: false,
      cFooter: {
        strSubmit: 'Cadastrar',
        strCancel: 'Cancelar',
        strAux: 'Repetir/Novo',
        aux: false
      }
    };
  },
  validations() {
    return {
      atividade: {
        dt_cadastro: { required$ },
        id_servidor: { required$, minValue: combo$(1) },
        id_municipio: { required$, minValue: combo$(1) },
        id_perda: { required$, minValue: combo$(1) },
        id_programa: { required$, minValue: combo$(1) },
        id_aux_atividade: { required$, minValue: combo$(1) },
        id_modalidade: { required$, minValue: combo$(1) },
        producao: { required$ },
        id_pagamento: { required$ },
        id_lista: { required$ },

      }
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters["auth/isLogged"];
    },
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  components: {
    Message,
    Loader,
    CmbServidor,
    CmbAuxiliares,
    CmbMunicipio,
    footerCard
  },
  methods: {
    trocaPerda(ev){
      if (ev.target.value == '999' || ev.target.value == '0'){
        this.atividade.id_perda = 999;   
        this.atividade.id_municipio = 0;             
        this.atividade.id_programa = 0;
        this.atividade.id_aux_atividade = 0;
        this.atividade.id_modalidade = 0;
        this.atividade.id_lista = 0; 
      } else {
        this.atividade.id_municipio = 999;             
        this.atividade.id_programa = 999;
        this.atividade.id_aux_atividade = 999;
        this.atividade.id_modalidade = 999;
        this.atividade.id_lista = 0; 
      }                 
    },
    setCaption(ev){
      var rc = ev.target.options[ev.target.selectedIndex].dataset.g;
      this.strProd =  rc;
    },
    repeat(){
     // let weekDay = 10;
    /*  while (weekDay > 5) {
        let dt = moment(this.atividade.dt_cadastro).add(1, 'd');
        weekDay = dt.isoWeekday();
      }*/

      let dt = moment(this.atividade.dt_cadastro);
      do{
        dt.add(1, 'd');
        var weekDay = dt.isoWeekday();
      }
      while (weekDay > 5);  
      

      this.atividade.dt_cadastro = dt.format('YYYY-MM-DD');
      this.startCalendar();
      this.cFooter.aux = false;
    },
    startCalendar() {
      const teste = document.querySelector('#dtCad');

      if (teste.type == 'text') {
        const elDt = document.querySelector('#contDate');
        elDt.innerHTML = "<input type='date' id='dtCad' />";
        
      }

      const options = {
        type: "date",
        dateFormat: "dd/MM/yyyy",
        startDate: this.atividade.dt_cadastro,
        showHeader: false,
        color: "info",
        allowInput: true,
        cancelLabel: 'Cancelar',
        showClearButton: false,
        todayLabel: 'Hoje',
        maxDate: new Date(),
      };

      var calini = bulmaCalendar.attach('#dtCad', options);

      const element = document.querySelector('#dtCad');

      const input = document.querySelector('.datetimepicker-dummy-input');
      input.removeAttribute('readonly');
      input.setAttribute('value', "__/__/____");
      input.setAttribute('data-mask', "__/__/____");
      this.applyDataMask(input);

      input.addEventListener('blur', () => {
        this.atividade.dt_cadastro = moment(input.value).format('YYYY-MM-DD');
      })

      if (element) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        element.bulmaCalendar.on('select', datepicker => {
          this.atividade.dt_cadastro = moment(datepicker.data.startDate).format('YYYY-MM-DD');
        });
      }
    },
    applyDataMask(field) {
      var mask = field.dataset.mask.split('');

      // For now, this just strips everything that's not a number
      function stripMask(maskedData) {
        function isDigit(char) {
          return /\d/.test(char);
        }
        return maskedData.split('').filter(isDigit);
      }

      // Replace `_` characters with characters from `data`
      function applyMask(data) {
        return mask.map(function (char) {
          if (char != '_') return char;
          if (data.length == 0) return char;
          return data.shift();
        }).join('')
      }

      function reapplyMask(data) {
        return applyMask(stripMask(data));
      }

      function changed() {
        var oldStart = field.selectionStart;
        var oldEnd = field.selectionEnd;

        field.value = reapplyMask(field.value);

        field.selectionStart = oldStart;
        field.selectionEnd = oldEnd;
      }

      field.addEventListener('click', changed)
      field.addEventListener('keyup', changed)
    },
    setDate($event) {
      if ($event) {
        this.atividade.dt_cadastro = moment(String($event)).format('YYYY-MM-DD');
      }
    },
    applyDataMask(field) {
      var mask = field.dataset.mask.split('');

      // For now, this just strips everything that's not a number
      function stripMask(maskedData) {
        function isDigit(char) {
          return /\d/.test(char);
        }
        return maskedData.split('').filter(isDigit);
      }

      // Replace `_` characters with characters from `data`
      function applyMask(data) {
        return mask.map(function (char) {
          if (char != '_') return char;
          if (data.length == 0) return char;
          return data.shift();
        }).join('')
      }

      function reapplyMask(data) {
        return applyMask(stripMask(data));
      }

      function changed() {
        var oldStart = field.selectionStart;
        var oldEnd = field.selectionEnd;

        field.value = reapplyMask(field.value);

        field.selectionStart = oldStart;
        field.selectionEnd = oldEnd;
      }

      field.addEventListener('click', changed)
      field.addEventListener('keyup', changed)
    },
    forceChangeComma(str){
      if (str.length == 0) str = 0;
      if (typeof str != 'string') return str;
      return str.replace(/,/g , ".");
    },
    create() {
      this.atividade.valor = this.forceChangeComma(this.atividade.valor);

      this.v$.$validate();
      if (!this.v$.$error) {
        document.getElementById("login").classList.add("is-loading");

        atividadeService.create(this.atividade).then(
          (response) => {
            this.showMessage = true;
            this.message = "Atividade cadastrado com sucesso.";
            this.type = "success";
            this.caption = "Atividade";
            this.cFooter.aux = true;
            setTimeout(() => (this.showMessage = false), 3000);
          },
          (error) => {
            this.message = error;
            /* (error.response &&
               error.response.data &&
               error.response.data.message) ||
             error.data.err ||
             error.message ||
             error.toString();*/
            this.showMessage = true;
            this.type = "alert";
            this.caption = "Atividade";
            setTimeout(() => (this.showMessage = false), 3000);
          }
        )
          .finally(() => {
            document.getElementById("login").classList.remove("is-loading");
          });
      } else {
        this.message = "Corrija os erros para enviar as informações";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Atividade";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
  },
  watch: {
    pgto(value){
        this.atividade.id_pagamento = value;
        if (value == 0){
          this.atividade.valor = 0;
        }              
    }                  
  },
  mounted() {
    this.atividade.owner_id = this.currentUser.id;

    auxiliaresService.getCombo(8, 0)
      .then((res) => {
        this.pgtos = res.data;
      })
      .catch((err) => {
        console.log(err.response);
        this.pgtos = [];
      })

    this.startCalendar();

    /*const options = {
      type: "date",
      dateFormat: "dd/MM/yyyy",
      showHeader: false,
      color: "info",
      allowInput: true,
      cancelLabel: 'Cancelar',
      showClearButton: false,
      todayLabel: 'Hoje',
      maxDate: new Date(),
    };

    var calini = bulmaCalendar.attach('#dtCad', options);

    const element = document.querySelector('#dtCad');

    const input = document.querySelector('.datetimepicker-dummy-input');
    input.removeAttribute('readonly');
    input.setAttribute('value', "__/__/____");
    input.setAttribute('data-mask', "__/__/____");
    this.applyDataMask(input);

    input.addEventListener('blur', () => {
      this.atividade.dt_cadastro = moment(input.value).format('YYYY-MM-DD');
    })

    if (element) {
      // bulmaCalendar instance is available as element.bulmaCalendar
      element.bulmaCalendar.on('select', datepicker => {
        this.atividade.dt_cadastro = moment(datepicker.data.startDate).format('YYYY-MM-DD');
      });
    }*/
  },
};
</script>

<style scoped>
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

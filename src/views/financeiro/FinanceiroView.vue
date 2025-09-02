<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-three-fifths">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Planejamento Financeiro</p>
          </header>
          <div class="card-content">
            <div class="content">
              <h4>Atividade</h4>
              <hr>
              <div class="columns">
                <div class="column is-4 is-offset-1">
                  <div class="field">
                    <label class="label">Data</label>
                    <div class="control" id="contDate">
                      <input type="text" id="dtCad">
                    </div>
                    <span class="is-error" v-if="v$.financeiro.dt_cadastro.$error">
                      {{ v$.financeiro.dt_cadastro.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Local</label>
                    <div class="control">
                      <CmbTerritorio :id_prop="financeiro.id_prop" :tipo="9" @selTerr="financeiro.id_local = $event"
                        :errclass="{ 'is-danger': v$.financeiro.id_local.$error }" />
                      <span class="is-error" v-if="v$.financeiro.id_local.$error">
                        {{ v$.financeiro.id_local.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <br>
              <h4>Combustíveis</h4>
              <hr>
              <div class="columns">
                <div class="column is-offset-1">
                  <div class="field">
                    <label class="label">Gasolina</label>
                    <input class="input" type="text" v-model="financeiro.gasolina" />
                  </div>
                </div>
                <div class="column is-offset-1">
                  <div class="field">
                    <label class="label">Álcool</label>
                    <input class="input" type="text" v-model="financeiro.alcool" />
                  </div>
                </div>
                <div class="column is-offset-1">
                  <div class="field">
                    <label class="label">Diesel</label>
                    <input class="input" type="text" v-model="financeiro.diesel" />
                  </div>
                </div>
              </div>
              <br>
              <h4>Consumo</h4>
              <hr>
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">Peças/Assessórios</label>
                    <input class="input" type="text" v-model="financeiro.pecas" />
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Bens/Mobiliários</label>
                    <input class="input" type="text" v-model="financeiro.bens_mob" />
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Man. Viaturas</label>
                    <input class="input" type="text" v-model="financeiro.manutencao" />
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Peças de Viaturas</label>
                    <input class="input" type="text" v-model="financeiro.peca_viat" />
                  </div>
                </div>
              </div>
              <br>
              <h4>Outros</h4>
              <hr>
              <div class="columns">
                <div class="column is-offset-2">
                  <div class="field">
                    <label class="label">Outros Consumos</label>
                    <input class="input" type="text" v-model="financeiro.outros_cons" />
                  </div>
                </div>
                <div class="column is-offset-2">
                  <div class="field">
                    <label class="label">Outros Serviços</label>
                    <input class="input" type="text" v-model="financeiro.outros_serv" />
                  </div>
                </div>
                <div class="column">&nbsp;</div>
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
import CmbTerritorio from "@/components/forms/CmbTerritorio.vue";
import footerCard from '@/components/forms/FooterCard.vue'
import financeiroService from "@/services/financeiro.service";
import auxiliaresService from "@/services/auxiliares.service.js";
import moment from 'moment';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import useValidate from "@vuelidate/core";
import {
  required$,
  combo$,
} from "../../components/forms/validators.js";

export default {
  data() {
    return {
      financeiro: {
        dt_cadastro: "",
        id_local: 0,
        gasolina: 0,
        alcool: 0,
        diesel: 0,
        pecas: 0,
        peca_viat: 0,
        bens_mob: 0,
        manutencao: 0,
        outros_cons: 0,
        outros_serv: 0,
        owner_id: 0,
      },
      v$: useValidate(),
      isLoading: false,
      message: "",
      caption: "",
      strLocal: "Local",
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
      financeiro: {
        dt_cadastro: { required$ },
        id_local: { required$, minValue: combo$(1) },
        gasolina: { required$ },
        alcool: { required$ },
        diesel: { required$ },
        pecas: { required$ },
        peca_viat: { required$ },
        bens_mob: { required$ },
        manutencao: { required$ },
        outros_cons: { required$ },
        outros_serv: { required$ },
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
    CmbTerritorio,
    footerCard
  },
  methods: {
    repeat() {
      let dt = moment(this.financeiro.dt_cadastro).add(1, 'd');
      this.financeiro.dt_cadastro = dt.format('YYYY-MM-DD');
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
        dateFormat: "MMMM/yyyy",
        startDate: this.financeiro.dt_cadastro,
        showHeader: false,
        color: "info",
        allowInput: true,
        cancelLabel: 'Cancelar',
        showClearButton: false,
        todayLabel: 'Hoje',
      };

      var calini = bulmaCalendar.attach('#dtCad', options);

      const element = document.querySelector('#dtCad');

      const input = document.querySelector('.datetimepicker-dummy-input');
      input.removeAttribute('readonly');
      input.setAttribute('value', "__/__/____");
      input.setAttribute('data-mask', "__/__/____");
      this.applyDataMask(input);

      input.addEventListener('blur', () => {
        this.financeiro.dt_cadastro = moment(input.value).format('YYYY-MM-DD');
      })

      if (element) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        element.bulmaCalendar.on('select', datepicker => {
          this.financeiro.dt_cadastro = moment(datepicker.data.startDate).format('YYYY-MM-DD');
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
        this.financeiro.dt_cadastro = moment(String($event)).format('YYYY-MM-DD');
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
    forceChangeComma(str) {
      if (typeof str != 'string') return str;
      return str.replace(/,/g, ".");
    },
    create() {
      this.financeiro.valor = this.forceChangeComma(this.financeiro.valor);

      this.v$.$validate();
      if (!this.v$.$error) {
        document.getElementById("login").classList.add("is-loading");

        financeiroService.create(this.financeiro).then(
          (response) => {
            this.showMessage = true;
            this.message = "Financeiro cadastrado com sucesso.";
            this.type = "success";
            this.caption = "Financeiro";
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
            this.caption = "Financeiro";
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
        this.caption = "Financeiro";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
  },
  mounted() {
    this.financeiro.owner_id = this.currentUser.id;

    if (this.currentUser.nivel == 9){
      this.message = "Você não tem permissão para cadastrar planejamento";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Planejamento Financeiro";
        setTimeout(() => {this.showMessage = false; this.$router.push('/financeiros'); }, 3000);
    }

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
      this.financeiro.dt_cadastro = moment(input.value).format('YYYY-MM-DD');
    })

    if (element) {
      // bulmaCalendar instance is available as element.bulmaCalendar
      element.bulmaCalendar.on('select', datepicker => {
        this.financeiro.dt_cadastro = moment(datepicker.data.startDate).format('YYYY-MM-DD');
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

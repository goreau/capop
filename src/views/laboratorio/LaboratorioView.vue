<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-two-fifths">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Atividade de Laboratório</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="field">
                <label class="label">Data</label>
                <div class="control" id="contDate">
                  <input type="text" id="dtCad">
                </div>
                <span class="is-error" v-if="v$.laboratorio.dt_cadastro.$error">
                  {{ v$.laboratorio.dt_cadastro.$errors[0].$message }}
                </span>
              </div>
              <div class="field">
                <label class="label">Servidor</label>
                <div class="control">
                  <CmbServidor :id_prop="laboratorio.id_prop" :tipo="9" @selServ="laboratorio.id_servidor = $event"
                    :errclass="{ 'is-danger': v$.laboratorio.id_servidor.$error }" />
                  <span class="is-error" v-if="v$.laboratorio.id_servidor.$error">
                    {{ v$.laboratorio.id_servidor.$errors[0].$message }}
                  </span>
                </div>
              </div>


              <div class="field">
                <label for="" class="label">Programa</label>
                <div class="control">
                  <CmbAuxiliares @selAux="laboratorio.id_programa = $event" :tipo="5" :sel="laboratorio.id_programa"
                    :aux="10" />
                  <span class="is-error" v-if="v$.laboratorio.id_programa.$error">
                    {{ v$.laboratorio.id_programa.$errors[0].$message }}
                  </span>
                </div>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Atividade</label>
              <div class="control">
                <CmbAuxiliares @selAux="laboratorio.id_ativ_lab = $event" :tipo="10" :aux="laboratorio.id_programa"
                  :sel="laboratorio.id_ativ_lab" />
                <span class="is-error" v-if="v$.laboratorio.id_ativ_lab.$error">
                  {{ v$.laboratorio.id_ativ_lab.$errors[0].$message }}
                </span>
              </div>
              <div class="field">
                <label class="label">Produção</label>
                <input class="input" type="text" v-model="laboratorio.producao" />
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
import footerCard from '@/components/forms/FooterCard.vue'
import laboratorioService from "@/services/laboratorio.service";
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
      laboratorio: {
        dt_cadastro: "",
        id_servidor: 0,
        id_programa: 0,
        id_ativ_lab: 0,
        producao: 0,
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
      laboratorio: {
        dt_cadastro: { required$ },
        id_servidor: { required$, minValue: combo$(1) },
        id_programa: { required$, minValue: combo$(1) },
        id_ativ_lab: { required$, minValue: combo$(1) },
        producao: { required$ },
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
    footerCard
  },
  methods: {
    startCalendar() {
      const teste = document.querySelector('#dtCad');

      if (teste.type == 'text') {
        const elDt = document.querySelector('#contDate');
        elDt.innerHTML = "<input type='date' id='dtCad' />";

      }

      const options = {
        type: "date",
        dateFormat: "dd/MM/yyyy",
        startDate: this.laboratorio.dt_cadastro,
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
        this.laboratorio.dt_cadastro = moment(input.value).format('YYYY-MM-DD');
      })

      if (element) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        element.bulmaCalendar.on('select', datepicker => {
          this.laboratorio.dt_cadastro = moment(datepicker.data.startDate).format('YYYY-MM-DD');
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
        this.laboratorio.dt_cadastro = moment(String($event)).format('YYYY-MM-DD');
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
      this.laboratorio.valor = this.forceChangeComma(this.laboratorio.valor);

      this.v$.$validate();
      if (!this.v$.$error) {
        document.getElementById("login").classList.add("is-loading");

        laboratorioService.create(this.laboratorio).then(
          (response) => {
            this.showMessage = true;
            this.message = "Laboratório cadastrado com sucesso.";
            this.type = "success";
            this.caption = "Laboratório";
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
            this.caption = "Laboratório";
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
        this.caption = "Laboratório";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
  },
  mounted() {
    this.laboratorio.owner_id = this.currentUser.id;

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
      this.laboratorio.dt_cadastro = moment(input.value).format('YYYY-MM-DD');
    })

    if (element) {
      // bulmaCalendar instance is available as element.bulmaCalendar
      element.bulmaCalendar.on('select', datepicker => {
        this.laboratorio.dt_cadastro = moment(datepicker.data.startDate).format('YYYY-MM-DD');
      });
    }*/
  },
};
</script>

<style scoped>

</style>
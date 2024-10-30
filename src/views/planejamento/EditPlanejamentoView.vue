<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-three-fifths">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Planejamento de Atividades</p>
          </header>
          <div class="card-content">
            <div class="content">
              <h4>Atividade</h4>
              <hr>
              <div class="columns">
                <div class="column is-4">
                  <div class="field">
                    <label class="label">Data</label>
                    <div class="control" id="contDate">
                      <input type="text" id="dtCad">
                    </div>
                    <span class="is-error" v-if="v$.planejamento.dt_cadastro.$error">
                      {{ v$.planejamento.dt_cadastro.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Município</label>
                    <div class="control">
                      <CmbMunicipio :id_prop="planejamento.id_municipio" :tipo="9" :sel="planejamento.id_municipio"
                        @selMun="planejamento.id_municipio = $event"
                        :errclass="{ 'is-danger': v$.planejamento.id_municipio.$error }" />
                      <span class="is-error" v-if="v$.planejamento.id_municipio.$error">
                        {{ v$.planejamento.id_municipio.$errors[0].$message }}
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
                      <CmbAuxiliares @selAux="planejamento.id_programa = $event" :tipo="5" :sel="planejamento.id_programa" />
                      <span class="is-error" v-if="v$.planejamento.id_programa.$error">
                        {{ v$.planejamento.id_programa.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label for="" class="label">Atividade</label>
                    <div class="control">
                      <CmbAuxiliares @selAux="planejamento.id_aux_atividade = $event" :tipo="6" :aux="planejamento.id_programa"
                        :sel="planejamento.id_aux_atividade" />
                      <span class="is-error" v-if="v$.planejamento.id_aux_atividade.$error">
                        {{ v$.planejamento.id_aux_atividade.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Imóveis</label>
                    <input class="input" type="text" v-model="planejamento.imoveis" />
                  </div>
                </div>
              </div>
              <br>
              <h4>Recursos</h4>
              <hr>
              <div class="columns">
                      <div class="column">
                        <div class="field">
                          <label class="label">Desinsetizador</label>
                          <input class="input" type="text" v-model="planejamento.desin" />
                        </div>
                      </div>
                      <div class="column">
                        <div class="field">
                          <label class="label">Of. Operacional</label>
                          <input class="input" type="text" v-model="planejamento.motorista" />
                        </div>
                      </div>
                      <div class="column">
                        <div class="field">
                          <label class="label">Ag. Téc. Saúde</label>
                          <input class="input" type="text" v-model="planejamento.vis_san" />
                        </div>
                      </div>
                      <div class="column">
                        <div class="field">
                          <label class="label">Outros</label>
                          <input class="input" type="text" v-model="planejamento.outros" />
                        </div>
                      </div>
              </div>
              <br>
              <h4>Valores</h4>
              <hr>
              <div class="columns">
                      <div class="column">
                        <div class="field">
                          <label class="label">Diária</label>
                          <input class="input" type="text" v-model="planejamento.diaria" />
                        </div>
                      </div>
                      <div class="column">
                        <div class="field">
                          <label class="label">Gratificação</label>
                          <input class="input" type="text" v-model="planejamento.gratificacao" />
                        </div>
                      </div>
                      <div class="column">
                        <div class="field">
                          <label class="label">Etapa</label>
                          <input class="input" type="text" v-model="planejamento.etapa" />
                        </div>
                      </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <footerCard @submit="update" @cancel="null" @aux="repeat" :cFooter="cFooter" />
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
import planejamentoService from "@/services/planejamento.service";
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
      planejamento: {
        dt_cadastro: "",
        id_municipio: 0,
        id_programa: 0,
        id_aux_atividade: 0,
        imoveis: 0,
        desin: '',
        motorista:'',
        vis_san: '',
        outros: '',
        diaria: 0,
        gratificacao: 0,
        etapa: 0,
        owner_id: 0,
      },
      v$: useValidate(),
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      strLocal: "",
      showMessage: false,
      cFooter: {
        strSubmit: 'Salvar',
        strCancel: 'Cancelar',
        strAux: '',
        aux: false
      }
    };
  },
  validations() {
    return {
      planejamento: {
        dt_cadastro: { required$ },
        id_municipio: { required$, minValue: combo$(1) },
        id_programa: { required$, minValue: combo$(1) },
        id_aux_atividade: { required$, minValue: combo$(1) },
        imoveis: { required$ },
        desin: { required$ },
        motorista: { required$ },
        vis_san: { required$ },
        outros: { required$ },
        diaria: { required$ },
        gratificacao: { required$ },
        etapa: { required$ },
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
    startCalendar() {
      const options = {
        type: "date",
        dateFormat: "MMMM/yyyy",
        startDate: this.planejamento.dt_cadastro,
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
    /*  input.removeAttribute('readonly');
      input.setAttribute('value', "__/__/____");
      input.setAttribute('data-mask', "__/__/____");
      this.applyDataMask(input);

      input.addEventListener('blur', () => {
        this.planejamento.dt_cadastro = moment(input.value).format('YYYY-MM-DD');
      })*/

      if (element) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        element.bulmaCalendar.on('select', datepicker => {
          this.planejamento.dt_cadastro = moment(datepicker.data.startDate).format('YYYY-MM-DD');
        });
      }
    },
    setDate($event) {
      if ($event) {
        this.planejamento.dt_cadastro = moment(String($event)).format('YYYY-MM-DD');
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
    loadData() {
      this.isLoading = true;

      planejamentoService.getPlanejamento(this.planejamento.id_planejamento).then(
        (response) => {
          let data = response.data;
          this.planejamento.id_municipio = data.id_municipio;
          this.planejamento.dt_cadastro = data.dt_cadastro;
          this.planejamento.id_programa = data.id_programa;
          this.planejamento.id_aux_atividade = data.id_aux_atividade;
          this.planejamento.imoveis = data.imoveis;
          this.planejamento.diaria = data.diaria;
          this.planejamento.gratificacao = data.gratificacao;
          this.planejamento.etapa = data.etapa;
          this.planejamento.desin = data.desin;
          this.planejamento.vis_san = data.vis_san;
          this.planejamento.motorista = data.motorista;
          this.planejamento.outros = data.outros;
          this.planejamento.vis_san = data.vis_san;
          this.planejamento.vis_san = data.vis_san;

          this.startCalendar();
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.response.data ||
            error.message ||
            error.toString();
          this.showMessage = true;
          this.type = "alert";
          this.caption = "Servidor";
          setTimeout(() => (this.showMessage = false), 3000);
        }
      );

      this.isLoading = false;
    },
    update() {
      this.v$.$validate();
      if (!this.v$.$error) {
        document.getElementById("login").classList.add("is-loading");

        planejamentoService.update(this.planejamento).then(
          (response) => {
            this.showMessage = true;
            this.message = "Dados do planejamento alterados com sucesso.";
            this.type = "success";
            this.caption = "Servidor";
            setTimeout(() => (this.showMessage = false), 3000);
          },
          (error) => {
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.response.data ||
              error.message ||
              error.toString();
            this.showMessage = true;
            this.type = "alert";
            this.caption = "Servidor";
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
        this.caption = "Servidor";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
  },
  mounted() {
    this.planejamento.owner_id = this.currentUser.id;

    auxiliaresService.getCombo(8, 0)
      .then((res) => {
        this.pgtos = res.data;
      })
      .catch((err) => {
        console.log(err.response);
        this.pgtos = [];
      })
  },
  created() {
    this.planejamento.id_planejamento = this.$route.params.id;
    this.loadData();
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
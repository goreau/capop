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
                      <CmbMunicipio :id_prop="planejamento.id_municipio" :tipo="9"
                        @selMun="planejamento.id_municipio = $event" :all="currentUser.nivel > 1"
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
                    <span class="is-error" v-if="v$.planejamento.imoveis.$error">
                        {{ v$.planejamento.imoveis.$errors[0].$message }}
                    </span>
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
                          <span class="is-error" v-if="v$.planejamento.desin.$error">
                            {{ v$.planejamento.desin.$errors[0].$message }}
                          </span>
                        </div>
                      </div>
                      <div class="column">
                        <div class="field">
                          <label class="label">Of. Operacional</label>
                          <input class="input" type="text" v-model="planejamento.motorista" />
                          <span class="is-error" v-if="v$.planejamento.motorista.$error">
                            {{ v$.planejamento.motorista.$errors[0].$message }}
                          </span>
                        </div>
                      </div>
                      <div class="column">
                        <div class="field">
                          <label class="label">Ag. Téc. Saúde</label>
                          <input class="input" type="text" v-model="planejamento.vis_san" />
                          <span class="is-error" v-if="v$.planejamento.vis_san.$error">
                            {{ v$.planejamento.vis_san.$errors[0].$message }}
                          </span>
                        </div>
                      </div>
                      <div class="column">
                        <div class="field">
                          <label class="label">Outros</label>
                          <input class="input" type="text" v-model="planejamento.outros" />
                          <span class="is-error" v-if="v$.planejamento.outros.$error">
                            {{ v$.planejamento.outros.$errors[0].$message }}
                          </span>
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
                            <span class="is-error" v-if="v$.planejamento.diaria.$error">
                              {{ v$.planejamento.diaria.$errors[0].$message }}
                            </span>
                        </div>
                      </div>
                      <div class="column">
                        <div class="field">
                          <label class="label">Gratificação</label>
                          <input class="input" type="text" v-model="planejamento.gratificacao" />
                            <span class="is-error" v-if="v$.planejamento.gratificacao.$error">
                              {{ v$.planejamento.gratificacao.$errors[0].$message }}
                            </span>
                        </div>
                      </div>
                      <div class="column">
                        <div class="field">
                          <label class="label">Etapa</label>
                          <input class="input" type="text" v-model="planejamento.etapa" />
                            <span class="is-error" v-if="v$.planejamento.etapa.$error">
                              {{ v$.planejamento.etapa.$errors[0].$message }}
                            </span>
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
    repeat(){
      let dt = moment(this.planejamento.dt_cadastro).add(1, 'd');
      this.planejamento.dt_cadastro = dt.format('YYYY-MM-DD');
      this.startCalendar();
      this.cFooter.aux = false;
    },
    startCalendar() {
      const teste = document.querySelector('#dtCad');

      if (teste.type == 'text') {
        const elDt = document.querySelector('#contDate');
        elDt.innerHTML = "<input type='month' id='dtCad' />";
        
      }

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
      };

      var calini = bulmaCalendar.attach('#dtCad', options);

      const element = document.querySelector('#dtCad');

      const input = document.querySelector('.datetimepicker-dummy-input');
      input.removeAttribute('readonly');
      input.setAttribute('value', "__/__/____");
      input.setAttribute('data-mask', "__/__/____");
      this.applyDataMask(input);

      input.addEventListener('blur', () => {
        this.planejamento.dt_cadastro = moment(input.value).format('YYYY-MM-DD');
      })

      if (element) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        element.bulmaCalendar.on('select', datepicker => {
          this.planejamento.dt_cadastro = moment(datepicker.data.startDate).format('YYYY-MM-DD');
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
    forceChangeComma(str){
      if (typeof str != 'string') return str;
      return str.replace(/,/g , ".");
    },
    create() {
      this.planejamento.diaria = this.forceChangeComma(this.planejamento.diaria);
      this.planejamento.gratificacao = this.forceChangeComma(this.planejamento.gratificacao);
      this.planejamento.etapa = this.forceChangeComma(this.planejamento.etapa);

      this.v$.$validate();
      if (!this.v$.$error) {
        document.getElementById("login").classList.add("is-loading");

        planejamentoService.create(this.planejamento).then(
          (response) => {
            this.showMessage = true;
            this.message = "Planejamento cadastrado com sucesso.";
            this.type = "success";
            this.caption = "Planejamento";
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
            this.caption = "Planejamento";
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
        this.caption = "Planejamento";
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
      this.planejamento.dt_cadastro = moment(input.value).format('YYYY-MM-DD');
    })

    if (element) {
      // bulmaCalendar instance is available as element.bulmaCalendar
      element.bulmaCalendar.on('select', datepicker => {
        this.planejamento.dt_cadastro = moment(datepicker.data.startDate).format('YYYY-MM-DD');
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

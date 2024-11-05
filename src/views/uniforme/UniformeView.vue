<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-two-fifths">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Uniforme</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="field">
                <label class="label">Servidor</label>
                <input
                    class="input"
                    type="text"
                    v-model="serv_nome"
                    disabled="true"
                  />
              <!--  <div class="control">
                  <CmbServidor :id_prop="uniforme.id_prop" :tipo="9" @selTerr="uniforme.id_servidor = $event"
                    :errclass="{ 'is-danger': v$.uniforme.id_servidor.$error }" />
                  <span class="is-error" v-if="v$.uniforme.id_servidor.$error">
                    {{ v$.uniforme.id_servidor.$errors[0].$message }}
                  </span>
                </div>-->
              </div>
              <fieldset class="fieldset">
                <legend>Sexo</legend>
                <div class="control has-icons-left has-icons-right">
                  <div class="columns">
                    <div class="column is-4">

                      <label class="radio">
                        <input type="radio" name="sexo" value="1" v-model="uniforme.sexo" />
                        Masculino
                      </label>
                    </div>
                    <div class="column is-4">
                      <label class="radio">
                        <input type="radio" name="sexo" value="2" v-model="uniforme.sexo" />
                        Feminino
                      </label>
                    </div>
                  </div>
                </div>
                <span class="is-error" v-if="v$.uniforme.sexo.$error">
                  {{ v$.uniforme.sexo.$errors[0].$message }}
                </span>
              </fieldset>
              <fieldset class="fieldset">
                <legend>Camisa</legend>
                <div class="control has-icons-left has-icons-right">
                  <div class="columns">
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="camisa" value="1" v-model="uniforme.camisa" />
                        PP
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="camisa" value="2" v-model="uniforme.camisa" />
                        P
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="camisa" value="3" v-model="uniforme.camisa" />
                        M
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="camisa" value="4" v-model="uniforme.camisa" />
                        G
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="camisa" value="5" v-model="uniforme.camisa" />
                        GG
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="camisa" value="6" v-model="uniforme.camisa" />
                        XGG
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="camisa" value="7" v-model="uniforme.camisa" />
                        XXGG
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="camisa" value="99" v-model="uniforme.camisa" />
                        N/A
                      </label>
                    </div>
                  </div>
                </div>
                <span class="is-error" v-if="v$.uniforme.camisa.$error">
                  {{ v$.uniforme.camisa.$errors[0].$message }}
                </span>
              </fieldset>
              <fieldset class="fieldset">
                <legend>Camiseta</legend>
                <div class="control has-icons-left has-icons-right">
                  <div class="columns">
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="camiseta" value="1" v-model="uniforme.camiseta" />
                        PP
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="camiseta" value="2" v-model="uniforme.camiseta" />
                        P
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="camiseta" value="3" v-model="uniforme.camiseta" />
                        M
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="camiseta" value="4" v-model="uniforme.camiseta" />
                        G
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="camiseta" value="5" v-model="uniforme.camiseta" />
                        GG
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="camiseta" value="6" v-model="uniforme.camiseta" />
                        XGG
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="camiseta" value="7" v-model="uniforme.camiseta" />
                        XXGG
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="camiseta" value="99" v-model="uniforme.camiseta" />
                        N/A
                      </label>
                    </div>
                  </div>
                </div>
                <span class="is-error" v-if="v$.uniforme.camiseta.$error">
                  {{ v$.uniforme.camiseta.$errors[0].$message }}
                </span>
              </fieldset>
              <fieldset class="fieldset">
                <legend>Jaqueta</legend>
                <div class="control has-icons-left has-icons-right">
                  <div class="columns">
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="jaqueta" value="1" v-model="uniforme.jaqueta" />
                        PP
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="jaqueta" value="2" v-model="uniforme.jaqueta" />
                        P
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="jaqueta" value="3" v-model="uniforme.jaqueta" />
                        M
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="jaqueta" value="4" v-model="uniforme.jaqueta" />
                        G
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="jaqueta" value="5" v-model="uniforme.jaqueta" />
                        GG
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="jaqueta" value="6" v-model="uniforme.jaqueta" />
                        XGG
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="jaqueta" value="7" v-model="uniforme.jaqueta" />
                        XXGG
                      </label>
                    </div>
                    <div class="column is-1">
                      <label class="radio">
                        <input type="radio" name="jaqueta" value="99" v-model="uniforme.jaqueta" />
                        N/A
                      </label>
                    </div>
                  </div>
                </div>
                <span class="is-error" v-if="v$.uniforme.jaqueta.$error">
                  {{ v$.uniforme.jaqueta.$errors[0].$message }}
                </span>
              </fieldset>
              <div class="field">
                <label for="" class="label">Calça</label>
                <div class="control">
                  <CmbAuxiliares @selAux="uniforme.calca = $event" :tipo="2"
                    :sel="uniforme.calca" />
                  <span class="is-error" v-if="v$.uniforme.calca.$error">
                    {{ v$.uniforme.calca.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Bermuda</label>
                <div class="control">
                  <CmbAuxiliares @selAux="uniforme.bermuda = $event" :tipo="2"
                    :sel="uniforme.bermuda" />
                  <span class="is-error" v-if="v$.uniforme.bermuda.$error">
                    {{ v$.uniforme.bermuda.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Sapato</label>
                <div class="control">
                  <CmbAuxiliares @selAux="uniforme.sapato = $event" :tipo="3"
                    :sel="uniforme.sapato" />
                  <span class="is-error" v-if="v$.uniforme.sapato.$error">
                    {{ v$.uniforme.sapato.$errors[0].$message }}
                  </span>
                </div>
              </div>

            </div>
          </div>
          <footer class="card-footer">
            <footerCard @submit="create" @cancel="null" @aux="details" :cFooter="cFooter" />
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
import uniformeService from "@/services/uniforme.service";
import useValidate from "@vuelidate/core";
import {
  required$,
  combo$,
  minLength$,
} from "../../components/forms/validators.js";

export default {
  data() {
    return {
      uniforme: {
        id_servidor: 0,
        id_uniforme: 0,
        sexo: 0,
        camisa: 0,
        camiseta: 0,
        jaqueta: 0,
        calca: 0,
        bermuda: 0,
        sapato: 0,
      },
      serv_nome: '',
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
        strAux: '',
        aux: false
      }
    };
  },
  validations() {
    return {
      uniforme: {
        id_servidor: { required$, minValue: combo$(1) },
        sexo: { required$, minValue: combo$(1) },
        camisa: { required$, minValue: combo$(1) },
        camiseta: { required$, minValue: combo$(1) },
        jaqueta: { required$, minValue: combo$(1) },
        calca: { required$, minValue: combo$(1) },
        bermuda: { required$, minValue: combo$(1) },
        sapato: { required$, minValue: combo$(1) },
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
  loadData(){
      this.isLoading = true;

      uniformeService.getUniformeByServ(this.uniforme.id_servidor).then(
        (response) => {
          let data = response.data;
          this.serv_nome = data.nome;
          if (data.id_uniforme == null) return;
          this.uniforme.camisa = data.camisa;
          this.uniforme.camiseta = data.camiseta;
          this.uniforme.jaqueta = data.jaqueta;
          this.uniforme.calca = data.calca;
          this.uniforme.bermuda = data.bermuda;
          this.uniforme.sapato = data.sapato;
          this.uniforme.sexo = data.sexo;
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
    create() {
      this.v$.$validate();
      if (!this.v$.$error) {
        document.getElementById("login").classList.add("is-loading");

        uniformeService.upsert(this.uniforme).then(
          (response) => {
            this.showMessage = true;
            this.message = "Uniforme cadastrado com sucesso.";
            this.type = "success";
            this.caption = "Uniforme";
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
            this.caption = "Uniforme";
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
        this.caption = "Uniforme";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
  },
  mounted() {
    this.uniforme.owner_id = this.currentUser.id;
  },
  created() {
    this.uniforme.id_servidor = this.$route.params.serv;
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

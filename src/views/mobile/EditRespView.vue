<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-three-fifths">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Atribuir Usuário aos dados mobile recebidos</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="columns">
                <div class="column is-5 is-offset-1">
                  <div class="field">
                    <label class="label">Local</label>
                    <div class="control">
                      {{ territorio.codigo }} - {{ territorio.nome }}
                    </div>
                  </div>
                </div>
                <div class="column is-5 is-offset-1">
                  <div class="field">
                    <label for="" class="label">Usuário Responsável</label>
                    <div class="control">
                      <CmbAuxiliares :tipo="11" :aux="territorio.id" @selAux="user_resp = $event" :id="'user'"
                        :errclass="{ 'is-danger': v$.user_resp.$error }" />
                      <span class="is-error" v-if="v$.user_resp.$error">
                        {{ v$.user_resp.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <br>
            </div>
          </div>
          <footer class="card-footer">
            <footerCard @submit="register" @cancel="null" @aux="details" :cFooter="cFooter" />
          </footer>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import CmbTerritorio from "@/components/forms/CmbTerritorio.vue";
import footerCard from '@/components/forms/FooterCard.vue'
import mobileService from "@/services/mobile.service";
import useValidate from "@vuelidate/core";
import {
  required$,
  combo$,
} from "../../components/forms/validators.js";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import ConfirmDialog from "@/components/forms/ConfirmDialog.vue";

export default {
  data() {
    return {
      territorio: {},
      user_resp: 0,
      v$: useValidate(),
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
      cFooter: {
        strSubmit: 'Atribuir',
        strCancel: 'Cancelar',
        strAux: '',
        aux: false
      }
    };
  },
  validations() {
    return {
      user_resp: { required$, minValue: combo$(1) },
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
    ConfirmDialog,
    CmbTerritorio,
    CmbAuxiliares,
    footerCard
  },
  methods: {
    getSelectedText(elementId) {
      var elt = document.getElementById(elementId);

      if (elt.selectedIndex == -1)
        return null;

      return elt.options[elt.selectedIndex].text;
    },
    async register() {
      this.v$.$validate();
      if (!this.v$.$error) {
        var strConf = document.getElementById('user').selectedOptions[0].text;
        const ok = await this.$refs.confirmDialog.show({
          title: 'Atribuir',
          message: `Atenção: o usuário ${strConf} ficará como responsável pela produção dos servidores lotados na unidade: ${this.territorio.nome}. Confirma?`,
          okButton: 'Confirmar',
        })
        if (ok) {
          document.getElementById("login").classList.add("is-loading");

          mobileService.editResp({ user_resp: this.user_resp, id_territorio: this.territorio.id }).then(
            (response) => {
              this.showMessage = true;
              this.message = "Atribuição concluída com sucesso.";
              this.type = "success";
              this.caption = "Usuário";
              setTimeout(() => (this.showMessage = false), 3000);
            },
            (error) => {
              this.message = error.message;
              /* (error.response &&
                 error.response.data &&
                 error.response.data.message) ||
               error.data.err ||
               error.message ||
               error.toString();*/
              this.showMessage = true;
              this.type = "alert";
              this.caption = "Usuário";
              setTimeout(() => (this.showMessage = false), 3000);
            }
          )
            .finally(() => {
              document.getElementById("login").classList.remove("is-loading");
            });
        } 
      } else {
        this.message = "Corrija os erros para enviar as informações";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Usuário";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
  },
  mounted() {
    this.id_user = this.currentUser.id;
  },
  created() {
    this.territorio = JSON.parse(this.$route.params.territorio);
   // this.loadData();
  },
};
</script>

<style scoped></style>
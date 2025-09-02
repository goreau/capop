<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-two-fifths">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">EPI</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="field">
                <label class="label">Tipo</label>
                <div class="control">
                  <CmbGeneric :data="tipos" @change="setFantasia($event)" @selGen="epi.id_epi_tipo = $event"
                    :sel="epi.id_epi_tipo" />
                    <span class="is-error" v-if="v$.epi.id_epi_tipo.$error">
                    {{ v$.epi.id_epi_tipo.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Descricao</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Descrição do EPI" v-model="epi.descricao"
                    :class="{ 'is-danger': v$.epi.descricao.$error }" maxlength="40" />
                  <span class="is-error" v-if="v$.epi.descricao.$error">
                    {{ v$.epi.descricao.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">CA</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Opcional: CA do EPI" v-model="epi.ca"
                    :class="{ 'is-danger': v$.epi.ca.$error }" maxlength="40" />
                  <span class="is-error" v-if="v$.epi.ca.$error">
                    {{ v$.epi.ca.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field" v-if="epi.id_epi > 0">
                <div class="control">
                  <label for="" class="checkbox">
                    <input type="checkbox" v-model="epi.active" :value="1">
                    Ativo
                  </label>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <footerCard @submit="save" @cancel="null" @aux="null" :cFooter="cFooter" />
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import CmbGeneric from "@/components/forms/CmbGeneric.vue";
import footerCard from '@/components/forms/FooterCard.vue'
import useValidate from "@vuelidate/core";
import {
  required$,
  combo$,
  maxLength$,
} from "../../../components/forms/validators.js";
import epiService from "@/services/epi.service";

export default {
  data() {
    return {
      epi: {
        id_epi: 0,
        id_epi_tipo: 0,
        descricao: "",
        ca: '',
        active: true,
      },
      v$: useValidate(),
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      strLocal: "",
      showMessage: false,
      tipos: [],
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
      epi: {
        id_epi_tipo: { required$, minValue: combo$(1) },
        descricao: { required$, maxLength: maxLength$(100) },
        ca: { maxLength: maxLength$(30)}
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
    footerCard,
    CmbGeneric
  },
  methods: {
    loadData() {
      this.isLoading = true;

      epiService.getEpi(this.epi.id_epi).then(
        (response) => {
          let data = response.data;
          this.epi.id_epi_tipo = data.id_epi_tipo
          this.epi.descricao = data.descricao;
          this.epi.ca = data.ca;
          this.epi.active = data.active;
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
          this.caption = "EPI";
          setTimeout(() => (this.showMessage = false), 3000);
        }
      );

      this.isLoading = false;
    },
    save() {
      this.v$.$validate();
      if (!this.v$.$error) {
        document.getElementById("login").classList.add("is-loading");
        if (this.epi.id_epi > 0) {
          epiService.update(this.epi).then(
            (response) => {
              this.showMessage = true;
              this.message = "Dados do EPI alterados com sucesso.";
              this.type = "success";
              this.caption = "EPI";
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
              this.caption = "EPI";
              setTimeout(() => (this.showMessage = false), 3000);
            }
          )
            .finally(() => {
              document.getElementById("login").classList.remove("is-loading");
            });
        } else {
          epiService.create(this.epi).then(
            (response) => {
              this.showMessage = true;
              this.message = "EPI cadastrado com sucesso.";
              this.type = "success";
              this.caption = "EPI";
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
              this.caption = "EPI";
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
        this.caption = "EPI";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
  },
  mounted() {
   // this.epi.owner_id = this.currentUser.id;

  },
  created() {
    this.epi.id_epi = this.$route.params.id;
    if (this.epi.id_epi > 0) {
      this.loadData();
    }

    epiService.getComboTipo()
      .then(
        (response) => {
          let data = response.data;
          this.tipos = data;
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
          this.caption = "EPI";
          setTimeout(() => (this.showMessage = false), 3000);
        }
      );
  },
};
</script>

<style scoped></style>

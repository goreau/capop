<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-two-fifths">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Programa</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="field">
                <label class="label">Nome</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Nome" v-model="programa.descricao"
                    :class="{ 'is-danger': v$.programa.descricao.$error }" maxlength="40" />
                  <span class="is-error" v-if="v$.programa.descricao.$error">
                    {{ v$.programa.descricao.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label for="" class="checkbox">
                    <input type="checkbox" v-model="programa.active" :value="1">
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
import footerCard from '@/components/forms/FooterCard.vue'
import maqnutencaoService from "@/services/manutencao.service";
import useValidate from "@vuelidate/core";
import {
  required$,
  combo$,
  minLength$,
} from "../../components/forms/validators.js";
import manutencaoService from "@/services/manutencao.service";

export default {
  data() {
    return {
      programa: {
        id_programa: 0,
        descricao: "",
        active: true,
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
      programa: {
        descricao: { required$, minLength: minLength$(5) },
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
    footerCard
  },
  methods: {
    loadData() {
      this.isLoading = true;

      manutencaoService.getDados(1, this.programa.id_programa).then(
        (response) => {
          let data = response.data;
          this.programa.descricao = data.descricao;
          this.programa.active = data.active;
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
          this.caption = "Programa";
          setTimeout(() => (this.showMessage = false), 3000);
        }
      );

      this.isLoading = false;
    },
    save() {
      this.v$.$validate();
      if (!this.v$.$error) {
        document.getElementById("login").classList.add("is-loading");
        if (this.programa.id_programa > 0) {
          programaService.update(this.programa).then(
            (response) => {
              this.showMessage = true;
              this.message = "Dados do programa alterados com sucesso.";
              this.type = "success";
              this.caption = "Programa";
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
              this.caption = "Programa";
              setTimeout(() => (this.showMessage = false), 3000);
            }
          )
            .finally(() => {
              document.getElementById("login").classList.remove("is-loading");
            });
        } else {
          manutencaoService.create(1, this.programa).then(
            (response) => {
              this.showMessage = true;
              this.message = "Programa cadastrado com sucesso.";
              this.type = "success";
              this.caption = "Programa";
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
              this.caption = "Programa";
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
        this.caption = "Programa";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
  },
  mounted() {
    this.programa.owner_id = this.currentUser.id;
  },
  created() {
    this.programa.id_programa = this.$route.params.id;
    if (this.programa.id_programa > 0) {
      this.loadData();
    }

  },
};
</script>

<style scoped></style>

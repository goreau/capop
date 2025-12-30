<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-two-fifths">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Listas</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="field">
                <label class="label">Nome</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Nome" v-model="lista.descricao"
                    :class="{ 'is-danger': v$.lista.descricao.$error }" maxlength="40" />
                  <span class="is-error" v-if="v$.lista.descricao.$error">
                    {{ v$.lista.descricao.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label for="" class="checkbox">
                    <input type="checkbox" v-model="lista.active" :value="1">
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
      lista: {
        id_lista: 0,
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
      lista: {
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

      manutencaoService.getDados(4, this.lista.id_lista).then(
        (response) => {
          let data = response.data;
          this.lista.descricao = data.descricao;
          this.lista.active = data.active;
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
          this.caption = "Listas";
          setTimeout(() => (this.showMessage = false), 3000);
        }
      );

      this.isLoading = false;
    },
    save() {
      this.v$.$validate();
      if (!this.v$.$error) {
        document.getElementById("login").classList.add("is-loading");
        if (this.lista.id_lista > 0) {
          listaService.update(this.lista).then(
            (response) => {
              this.showMessage = true;
              this.message = "Dados da lista alterados com sucesso.";
              this.type = "success";
              this.caption = "Listas";
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
              this.caption = "Listas";
              setTimeout(() => (this.showMessage = false), 3000);
            }
          )
            .finally(() => {
              document.getElementById("login").classList.remove("is-loading");
            });
        } else {
          manutencaoService.create(4, this.lista).then(
            (response) => {
              this.showMessage = true;
              this.message = "Lista cadastrada com sucesso.";
              this.type = "success";
              this.caption = "Listas";
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
              this.caption = "Listas";
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
        this.caption = "Listas";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
  },
  mounted() {
    this.lista.owner_id = this.currentUser.id;
  },
  created() {
    this.lista.id_lista = this.$route.params.id;
    if (this.lista.id_lista > 0) {
      this.loadData();
    }

  },
};
</script>

<style scoped></style>

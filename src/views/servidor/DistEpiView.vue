<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-three-fifths">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Fornecimento de Uniforme</p>
          </header>
          <div class="card-content">
            <div class="content">
              <section>
                <div class="field">
                  <label class="label">Servidor</label>
                  <CmbServidor :tipo="9" @selServ="epi.id_servidor = $event" />
                </div>
              </section>
              <hr>
              <section>
                <fieldset class="fieldset">
                  <legend>EPI</legend>
                  <div class="control has-icons-left has-icons-right">
                    <div class="columns">
                      <div class="column is-8">
                        <label class="label">Item</label>
                        <CmbGeneric :data="listaEpi" @selGen="item.descricao = $event"></CmbGeneric>
                      </div>
                      <div class="column is-2">
                        <label class="label">Quantidade</label>
                        <input type="number" class="input" v-model="item.quantidade" />
                      </div>
                      <div class="column">
                        <button class="button is-info" @click="insereItem">Inserir</button>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <br>
                <fieldset class="fieldset">
                  <legend>Lista</legend>
                  <div class="control has-icons-left has-icons-right">

                    <table class="table is-striped is-hoverable">
                      <thead>
                        <tr>
                          <th>Descrição</th>
                          <th>Quantidade</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, i) in epi.itens" :key="i">
                          <td>{{ item.descricao }}</td>
                          <td>{{ item.quantidade }}</td>
                          <td>
                            <button class="button is-small is-danger" @click="removerItem(i)">
                              <span class="icon is-small"><i class="fas fa-trash"></i></span>
                              <span>Excluir</span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </fieldset>
              </section>
            </div>
          </div>
          <footer class="card-footer">
            <footerCard @submit="create" @cancel="null" @aux="null" :cFooter="cFooter" />
          </footer>
        </div>
      </div>
    </div>
  </div>
  <br><br>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import CmbServidor from "@/components/forms/CmbServidor.vue";
import footerCard from '@/components/forms/FooterCard.vue'
import servidorService from "@/services/servidor.service";
import { gerarPDF } from './recEpi';
import CmbGeneric from "@/components/forms/CmbGeneric.vue";
import epiService from "@/services/epi.service";


export default {
  data() {
    return {
      epi: {
        id_servidor: 0,
        nome: '',
        base: '',
        funcao: '',
        itens: []
      },
      item: {
        descricao: 'uma coisa',
        quantidade: ''
      },
      hasData: false,
      serv_nome: '',
      listaEpi: [],
      isLoading: false,
      message: "",
      caption: "",
      strLocal: "Local",
      type: "",
      showMessage: false,
      cFooter: {
        strSubmit: 'Recibo',
        strCancel: 'Cancelar',
        strAux: '',
        aux: false
      }
    };
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
    CmbGeneric,
    footerCard
  },
  methods: {
    insereItem() {
      this.epi.itens.push({...this.item})
      //console.log(this.epi.itens)
    },
    removerItem(index) {
      this.epi.itens.splice(index, 1)
    },
    loadData() {
      this.isLoading = true;

      servidorService.getServidorFantasia(this.epi.id_servidor).then(
        (response) => {
          let data = response.data;
          this.serv_nome = data.nome;

          this.epi.nome = data.nome;
          this.epi.base = data.base;
          this.epi.funcao = data.funcao;

          this.hasData = true;
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
    create() {
    /*  const uniformeArray = Object.entries(this.uniforme)
        .filter(([key, value]) => typeof value === 'object' && value.quantidade > 0) // ignora id_servidor
        .map(([key, value]) => ({
          tipo: value.quantidade > 1 ? value.nome + 's' : value.nome,
          tamanho: value.tamanho,
          complemento: value.complemento,
          quantidade: value.quantidade
        }))*/

      gerarPDF(this.epi)
    },
  },
  watch: {
    'epi.id_servidor'(value) {
      this.loadData();
    }
  },
  mounted() {
    epiService.getCombo()
      .then(
        (response) => {
          let data = response.data;
          this.listaEpi = data;
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
  created() {
    if (this.currentUser.nivel == 9) {
      this.message = "Você não tem permissão para fornecer EPIs";
      this.showMessage = true;
      this.type = "alert";
      this.caption = "EPI";
      setTimeout(() => { this.showMessage = false; this.$router.push('/home'); }, 3000);
    }
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

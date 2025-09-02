<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-two-fifths">
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
                  <CmbServidor :tipo="9" @selServ="uniforme.id_servidor = $event" />
                </div>
              </section>
              <section v-show="hasData">
                <fieldset class="fieldset">
                  <legend>Camisa</legend>
                  <div class="control has-icons-left has-icons-right">
                    <div class="columns">
                      <div class="column">
                        <label class="label">Tamanho</label>
                        <input type="text" class="input" v-model="uniforme.camisa.tamanho" />
                      </div>
                      <div class="column">
                        <label class="label">Complemento</label>
                        <input type="text" class="input" v-model="uniforme.camisa.complemento" />
                      </div>
                      <div class="column">
                        <label class="label">Quantidade</label>
                        <input type="number" class="input" v-model="uniforme.camisa.quantidade" />
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset class="fieldset">
                  <legend>Camiseta</legend>
                  <div class="control has-icons-left has-icons-right">
                    <div class="columns">
                      <div class="column">
                        <label class="label">Tamanho</label>
                        <input type="text" class="input" v-model="uniforme.camiseta.tamanho" />
                      </div>
                      <div class="column">
                        <label class="label">Complemento</label>
                        <input type="text" class="input" v-model="uniforme.camiseta.complemento" />
                      </div>
                      <div class="column">
                        <label class="label">Quantidade</label>
                        <input type="number" class="input" v-model="uniforme.camiseta.quantidade" />
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset class="fieldset">
                  <legend>Jaqueta</legend>
                  <div class="control has-icons-left has-icons-right">
                    <div class="columns">
                      <div class="column">
                        <label class="label">Tamanho</label>
                        <input type="text" class="input" v-model="uniforme.jaqueta.tamanho" />
                      </div>
                      <div class="column">
                        <label class="label">Complemento</label>
                        <input type="text" class="input" v-model="uniforme.jaqueta.complemento" />
                      </div>
                      <div class="column">
                        <label class="label">Quantidade</label>
                        <input type="number" class="input" v-model="uniforme.jaqueta.quantidade" />
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset class="fieldset">
                  <legend>Calça</legend>
                  <div class="control has-icons-left has-icons-right">
                    <div class="columns">
                      <div class="column">
                        <label class="label">Tamanho</label>
                        <input type="text" class="input" v-model="uniforme.calca.tamanho" />
                      </div>
                      <div class="column">
                        <label class="label">Complemento</label>
                        <input type="text" class="input" v-model="uniforme.calca.complemento" />
                      </div>
                      <div class="column">
                        <label class="label">Quantidade</label>
                        <input type="number" class="input" v-model="uniforme.calca.quantidade" />
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset class="fieldset">
                  <legend>Bermuda</legend>
                  <div class="control has-icons-left has-icons-right">
                    <div class="columns">
                      <div class="column">
                        <label class="label">Tamanho</label>
                        <input type="text" class="input" v-model="uniforme.bermuda.tamanho" />
                      </div>
                      <div class="column">
                        <label class="label">Complemento</label>
                        <input type="text" class="input" v-model="uniforme.bermuda.complemento" />
                      </div>
                      <div class="column">
                        <label class="label">Quantidade</label>
                        <input type="number" class="input" v-model="uniforme.bermuda.quantidade" />
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset class="fieldset">
                  <legend>Sapato</legend>
                  <div class="control has-icons-left has-icons-right">
                    <div class="columns">
                      <div class="column">
                        <label class="label">Tamanho</label>
                        <input type="text" class="input" v-model="uniforme.sapato.tamanho" />
                      </div>
                      <div class="column">
                        <label class="label">Complemento</label>
                        <input type="text" class="input" v-model="uniforme.sapato.complemento" />
                      </div>
                      <div class="column">
                        <label class="label">Quantidade</label>
                        <input type="number" class="input" v-model="uniforme.sapato.quantidade" />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </section>
            </div>
          </div>
          <footer class="card-footer">
            <footerCard @submit="create" @cancel="null" @aux="details" :cFooter="cFooter" />
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
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import footerCard from '@/components/forms/FooterCard.vue'
import uniformeService from "@/services/uniforme.service";
import { gerarPDF } from './recUniforme';


export default {
  data() {
    return {
      uniforme: {
        id_servidor: 0,
        nome: '',
        base: '',
        funcao: '',
        camisa: { tamanho: '', complemento: '', quantidade: 0, nome: 'Camisa' },
        camiseta: { tamanho: '', complemento: '', quantidade: 0, nome: 'Camiseta' },
        jaqueta: { tamanho: '', complemento: '', quantidade: 0, nome: 'Jaqueta' },
        calca: { tamanho: 0, complemento: '', quantidade: 0, nome: 'Calça' },
        bermuda: { tamanho: 0, complemento: '', quantidade: 0, nome: 'Bermuda' },
        sapato: { tamanho: 0, complemento: '', quantidade: 0, nome: 'Botina' }
      },
      tamanhos: [
        { id: 1, fant: 'PP' },
        { id: 2, fant: 'P' },
        { id: 3, fant: 'M' },
        { id: 4, fant: 'G' },
        { id: 5, fant: 'GG' },
        { id: 6, fant: 'XG' },
        { id: 7, fant: 'XXGG' },
        { id: 99, fant: 'N/A' },
      ],
      hasData: false,
      serv_nome: '',
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
    CmbAuxiliares,
    footerCard
  },
  methods: {
    loadData() {
      this.isLoading = true;

      uniformeService.getUniformeByServ(this.uniforme.id_servidor).then(
        (response) => {
          let data = response.data;
          this.serv_nome = data.nome;
          if (data.id_uniforme == null) return;
          this.uniforme.id_uniforme = data.id_uniforme;
          this.uniforme.nome = data.nome;
          this.uniforme.base = data.base;
          this.uniforme.funcao = data.funcao;

          this.uniforme.camisa.tamanho = this.tamanhos.find((u) => u.id === Number(data.camisa)).fant;
          this.uniforme.camiseta.tamanho = this.tamanhos.find((u) => u.id === Number(data.camiseta)).fant;
          this.uniforme.jaqueta.tamanho = this.tamanhos.find((u) => u.id === Number(data.jaqueta)).fant;
          this.uniforme.calca.tamanho = data.calca;
          this.uniforme.bermuda.tamanho = data.bermuda;
          this.uniforme.sapato.tamanho = data.sapato;
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
          this.caption = "Uniforme";
          setTimeout(() => (this.showMessage = false), 3000);
        }
      );

      this.isLoading = false;
    },
    create() {
      const uniformeArray = Object.entries(this.uniforme)
        .filter(([key, value]) => typeof value === 'object' && value.quantidade > 0) // ignora id_servidor
        .map(([key, value]) => ({
          tipo: value.quantidade > 1 ? value.nome+'s': value.nome,
          tamanho: value.tamanho,
          complemento: value.complemento,
          quantidade: value.quantidade
        }))
      
      gerarPDF(uniformeArray, this.uniforme)
    },
  },
  watch: {
    'uniforme.id_servidor'(value) {
      this.loadData();
    }
  },
  mounted() {
    //this.uniforme.owner_id = this.currentUser.id;
  },
  created() {
    if (this.currentUser.nivel == 9) {
      this.message = "Você não tem permissão para fornecer uniformes";
      this.showMessage = true;
      this.type = "alert";
      this.caption = "Uniforme";
      setTimeout(() => { this.showMessage = false; this.$router.push('/uniformes'); }, 3000);
    }
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

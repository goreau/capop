<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-10">
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">{{ strTipo }}</p>
          </header>
          <div class="card-content">
            <MyTable :tableData="dataTable" :columns="columns" :filtered="false" :tableName="tableName" />
          </div>
        </div>
        <div style="display: none;">
          <span class="icon is-small is-left" name="coisa">
            <font-awesome-icon icon="fa-solid fa-edit" />
          </span>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import mobileService from "@/services/mobile.service";
import MyTable from '@/components/forms/MyTable.vue';
import Message from "@/components/general/Message.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';

export default {
  name: 'ListaTerritorio',
  data() {
    return {
      tableName: 'mobterrit',
      dataTable: [],
      showMessage: false,
      message: "",
      caption: "",
      type: "",
      columns: [],
      myspan: null,
      myspan2: null,
      id_user: 0,
      tipo: 0,
      strTipo: '',
    }
  },
  components: {
    MyTable,
    ConfirmDialog,
    Message,

  },
  methods: {
    editItem(id) {
      this.$router.push(`/manage/${id}`);
    },
    
  },
  mounted() {
    this.id_user = this.currentUser.id;

    this.myspan = document.getElementsByName('coisa')[0];
    

    mobileService.getTerritorios()
      .then((response) => {
        this.dataTable = response.data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});


      this.columns = [
      { title: 'Código', field: 'codigo', minWidth: 50 },
      { title: 'Nome', field: 'nome', minWidth: 100 },
      { title: 'Usuário Responsável', field: 'user_nome', minWidth: 250 },
      {
        title: 'Ações', responsive: 0, minWidth: 50,
        formatter: (cell, formatterParrams) => {
          const row = cell.getRow().getData();

          const btEdit = document.createElement('button');
          btEdit.type = 'button';
          btEdit.title = 'Alterar';
          btEdit.disabled = this.currentUser.nivel == 9;
          btEdit.style.cssText = 'height: fit-content; margin-left: 1rem;';
          btEdit.classList.add('button', 'is-primary', 'is-outlined');
          btEdit.innerHTML = this.myspan.innerHTML;
          btEdit.addEventListener('click', () => {
            let objRow = JSON.stringify(row);
            this.$router.push(`/mobileEditResp/${objRow}`);
          });

          const buttonHolder = document.createElement('span');
          buttonHolder.appendChild(btEdit);

          return buttonHolder;

        }
      }
    ]
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
    param() {
      return this.$route.params.id;
    }
  },
  watch: {
    param(newValue, oldValue) {
      location.reload(); // Chame sua função para carregar dados
    }
  },
  created() {
    
    this.strTipo = 'Usuário Responsável';
       
   // this.loadData();
  }
}
</script>

<style scoped>
.button {
  margin-right: 1rem;
}
</style>
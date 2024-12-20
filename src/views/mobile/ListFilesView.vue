<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-8">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">{{ strTipo }}</p>
          </header>
          <div class="card-content">
            <MyTable :tableData="dataTable" :columns="columns" :filtered="true" :tableName="tableName" />
          </div>
        </div>
        <div style="display: none;">
          <span class="icon is-small is-left" name="coisa">
            <font-awesome-icon icon="fa-solid fa-eye" />
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
import Loader from '@/components/general/Loader.vue';
import Message from "@/components/general/Message.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';

export default {
  name: 'ListaVendas',
  data() {
    return {
      tableName: 'listFilesCapop',
      dataTable: [],
      isLoading: false,
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
    Loader,
    ConfirmDialog,
    Message,

  },
  methods: {
 
  },
  mounted() {
    this.id_user = this.currentUser.id;

    this.myspan = document.getElementsByName('coisa')[0];
    this.isLoading = true;

    mobileService.getFiles()
      .then((response) => {
        this.dataTable = response.data.files;
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => this.isLoading = false);

      this.columns = [
      { title: 'Arquivo', field: 'fant', minWidth: 100 },
      {
        title: 'Ações', responsive: 0, minWidth: 250,
        formatter: (cell, formatterParrams) => {
          const row = cell.getRow().getData();

          const btEdit = document.createElement('button');
          btEdit.type = 'button';
          btEdit.title = 'Visualizar';
          btEdit.style.cssText = 'height: fit-content; margin-left: 1rem;';
          btEdit.classList.add('button', 'is-link', 'is-outlined');
          btEdit.innerHTML = this.myspan.innerHTML;
          btEdit.addEventListener('click', () => {
            mobileService.getFile(row.fant).then(
              async (response) => {
                const link = document.createElement('a')
                link.href = URL.createObjectURL(response)
                link.download = row.fant;
                link.click()
                URL.revokeObjectURL(link.href)
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
                this.caption = "Mobile";
                setTimeout(() => (this.showMessage = false), 3000);
              }
            )
            
                //this.$router.push(`/programa/${row.id_programa}`);
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
    
  },
  created() {
    this.tipo = this.$route.params.id;
  
    this.strTipo = 'Arquivos de Recebimento Mobile';
       
   // this.loadData();
  }
}
</script>

<style scoped>
.button {
  margin-right: 1rem;
}
</style>
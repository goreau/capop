<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-8">
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">{{ strTipo }}</p>
            <button class="button is-primary is-outlined" @click="newItem" :disabled="currentUser.nivel != 1">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-plus-circle" />
              </span>
              <span>Novo</span>
            </button>
          </header>
          <div class="card-content">
            <MyTable :tableData="dataTable" :columns="columns" :filtered="true" :tableName="tableName" />
          </div>
        </div>
        <div style="display: none;">
          <span class="icon is-small is-left" name="coisa">
            <font-awesome-icon icon="fa-solid fa-edit" />
          </span>
          <span class="icon is-small is-left" name="coisa2">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </span>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import epiService from "@/services/epi.service";
import MyTable from '@/components/forms/MyTable.vue';
import Message from "@/components/general/Message.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';

export default {
  name: 'ListaVendas',
  data() {
    return {
      tableName: 'epi',
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
    newItem() { 
        this.$router.push('/epi/0');            
    },
    editItem(id) {
      this.$router.push(`/epi/${id}`);
    },
    getFormat(row) {
      return {
        'has-text-danger-dark': row.status == 1,
        'has-text-danger': row.status == 2,
        'has-text-info': row.status == 3,
        'has-text-success': row.status == 9,
        'has-text-info': row.status == 7
      }
    }
  },
  mounted() {
    this.id_user = this.currentUser.id;

    this.myspan = document.getElementsByName('coisa')[0];
    this.myspan2 = document.getElementsByName('coisa2')[0];

    epiService.getLista()
      .then((response) => {
        this.dataTable = response.data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});


      this.columns = [
        { title: 'Tipo', field: 'tipo', minWidth: 100 },
      { title: 'Descrição', field: 'descricao', minWidth: 100 },
      { title: 'CA', field: 'ca', minWidth: 100 },
      {
        title: 'Ações', responsive: 0, minWidth: 250,
        formatter: (cell, formatterParrams) => {
          const row = cell.getRow().getData();

          const btEdit = document.createElement('button');
          btEdit.type = 'button';
          btEdit.title = 'Editar';
          btEdit.disabled = this.currentUser.nivel != 1;
          btEdit.style.cssText = 'height: fit-content; margin-left: 1rem;';
          btEdit.classList.add('button', 'is-primary', 'is-outlined');
          btEdit.innerHTML = this.myspan.innerHTML;
          btEdit.addEventListener('click', () => {
            this.$router.push(`/epi/${row.id}`);
          });

          const btDel = document.createElement('button');
          btDel.type = 'button';
          btDel.title = 'Excluir';
          btDel.disabled = this.currentUser.nivel != 1;
          btDel.style.cssText = 'height: fit-content; margin-left: 1rem;';
          btDel.classList.add('button', 'is-danger', 'is-outlined');
          btDel.innerHTML = this.myspan2.innerHTML;
          btDel.addEventListener('click', async () => {
            const ok = await this.$refs.confirmDialog.show({
              title: 'Excluir',
              message: 'Deseja mesmo excluir esse EPI?',
              okButton: 'Confirmar',
            })
            if (ok) {
              epiService.delete(row.id)
                .then(resp => {
                  if (resp.status) {
                    location.reload();
                  } else {
                    this.message = resp;
                    this.showMessage = true;
                    this.type = "alert";
                    this.caption = "EPI";
                    setTimeout(() => (this.showMessage = false), 3000);
                  }
                })
                .catch(err => {
                  this.message = err;
                  this.showMessage = true;
                  this.type = "alert";
                  this.caption = "Programa";
                  setTimeout(() => (this.showMessage = false), 3000);
                })
            }
          });

          


          const buttonHolder = document.createElement('span');
          buttonHolder.appendChild(btEdit);
          buttonHolder.appendChild(btDel);

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
    this.tipo = this.$route.params.id;
  }
}
</script>

<style scoped>
.button {
  margin-right: 1rem;
}
</style>
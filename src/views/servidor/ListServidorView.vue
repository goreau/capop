<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Servidores Cadastrados</p>
            <button class="button is-primary is-outlined" @click="newUser">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-plus-circle" />
              </span>
              <span>Novo</span>
            </button>
          </header>
          <div class="card-content">
            <MyTable :tableData="dataTable" :columns="columns" :filtered="true" :tableName="tableName"/>
          </div>
        </div>
        <div style="display: none;">
          <span class="icon is-small is-left" name="coisa">
            <font-awesome-icon icon="fa-solid fa-edit" />
          </span>
          <span class="icon is-small is-left" name="coisa2">
            <font-awesome-icon  icon="fa-solid fa-trash" />
          </span>
          <span class="icon is-small is-left" name="coisa3">
            <font-awesome-icon  icon="fa-solid fa-shirt" />
          </span>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import servidorService from "@/services/servidor.service";
import MyTable from '@/components/forms/MyTable.vue';
import Loader from '@/components/general/Loader.vue';
import Message from "@/components/general/Message.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';

export default {
  name: 'ListaVendas',
  data() {
      return {
          tableName: 'servidor',
          dataTable: [],
          isLoading: false,
          showMessage: false,
          message: "",
          caption: "",
          type: "",
          columns: [],
          myspan: null,
          myspan2: null,
          myspan3: null,
          id_user: 0,
      }
  },
  components: {
      MyTable,
      Loader,
      ConfirmDialog,
      Message,

  },
  methods: {
    newUser() {
      this.$router.push('/user');
      },
      editUser(id) {
          this.$router.push(`/manage/${id}`);
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
    this.myspan3 = document.getElementsByName('coisa3')[0];
    //document.createElement('span');
   // this.myspan.innerHTML='<p>teste</p>';;

      this.isLoading = true;
      servidorService.getServidors(this.id_user)
          .then((response) => {
              this.dataTable = response.data;
              this.isLoading = false;
          })
          .catch((err) =>{
            console.log(err);
          })
          .finally(() => this.isLoading = false);

      this.columns = [
          {title: 'Nome', field: 'nome', minWidth: 400, responsive: 1},
          {title: 'Função', field: 'funcao', minWidth: 100},
          {title: 'Local', field: 'local', minWidth: 350},
          {title: 'Ativo', field: 'ativo', formatter:"tickCross", hozAlign:"center",minWidth: 20},
          {title: 'Temp', field: 'temporario', formatter:"tickCross", hozAlign:"center",minWidth: 20},
          {title: 'Ações', responsive: 0, minWidth: 250, 
            formatter: (cell, formatterParrams) =>{
              const row = cell.getRow().getData();

              const btEdit = document.createElement('button');
              btEdit.type = 'button';
              btEdit.title = 'Editar';
              btEdit.disabled = this.id_user != row.owner_id;
              btEdit.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btEdit.classList.add('button', 'is-primary', 'is-outlined');
              btEdit.innerHTML = this.myspan.innerHTML;
              btEdit.addEventListener('click', () => {
                this.$router.push(`/editServidor/${row.id_servidor}`);
              });

            /* const teste = document.createElement('div'); 
              teste.classList.add('icon', 'is-small');
              teste.innerHTML='<span><font-awesome-icon icon=\"fa-solid fa-envelope\" /></span>';*/

              const btDel = document.createElement('button');
              btDel.type = 'button';
              btDel.title = 'Excluir';
              btDel.disabled = this.id_user != row.owner_id;
              btDel.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btDel.classList.add('button', 'is-danger', 'is-outlined');
              btDel.innerHTML = this.myspan2.innerHTML;
              btDel.addEventListener('click', async() => {
                const ok = await this.$refs.confirmDialog.show({
                  title: 'Excluir',
                  message: 'Deseja mesmo excluir esse usuário?',
                  okButton: 'Confirmar',
              })
              if (ok) {
                servidorService.delete(row.id_servidor)
                .then(resp =>{
                  if (resp.status == '200'){
                    location.reload();
                  } else {
                    this.message = resp;
                    this.showMessage = true;
                    this.type = "alert";
                    this.caption = "Usuário";
                    setTimeout(() => (this.showMessage = false), 3000);
                  }
                })
                .catch(err =>{
                  this.message = err;
                  this.showMessage = true;
                  this.type = "alert";
                  this.caption = "Usuário";
                  setTimeout(() => (this.showMessage = false), 3000);
                })
              }
              });

              const btUnif = document.createElement('button');
              btUnif.type = 'button';
              btUnif.title = 'Uniforme';
              btUnif.disabled = this.id_user != row.owner_id;
              btUnif.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btUnif.classList.add('button', 'is-link', 'is-outlined');
              btUnif.innerHTML = this.myspan3.innerHTML;
              btUnif.addEventListener('click', () => {
                this.$router.push(`/uniforme/${row.id_servidor}`);
              });


              const buttonHolder = document.createElement('span');
              buttonHolder.appendChild(btEdit);
              buttonHolder.appendChild(btDel);
              buttonHolder.appendChild(btUnif);

              return buttonHolder;

            }}
      ]
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
}
</script>

<style scoped>
.button { 
  margin-right: 1rem;
}
  
</style>
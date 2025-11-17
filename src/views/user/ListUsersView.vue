<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Usuários Cadastrados</p>
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
            <font-awesome-icon  icon="fa-solid fa-user-secret" />
          </span>
          <span class="icon is-small is-left" name="coisa4">
            <font-awesome-icon  icon="fa-solid fa-power-off" />
          </span>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import authService from "@/services/auth.service";
import MyTable from '@/components/forms/MyTable.vue';
import Message from "@/components/general/Message.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';

export default {
  name: 'ListaVendas',
  data() {
      return {
          tableName: 'usuariosCp',
          dataTable: [],
          showMessage: false,
          message: "",
          caption: "",
          type: "",
          columns: [],
          myspan: null,
          myspan2: null,
          id_user: 0,
      }
  },
  components: {
      MyTable,
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
    this.myspan4 = document.getElementsByName('coisa4')[0];
    //document.createElement('span');
   // this.myspan.innerHTML='<p>teste</p>';;

      authService.list(this.id_user)
          .then((response) => {
              this.dataTable = response.data;
              
          })
          .catch((err) =>{
            console.log(err);
          })
          .finally(() => {});

      this.columns = [
          {title: 'Nome', field: 'nome', minWidth: 200, responsive: 3},
          {title: 'Login', field: 'username', minWidth: 150},
          {title: 'Local', field: 'local', minWidth: 150},
          {title: 'Nivel', field: 'role', minWidth: 150},
          {title: 'Responsável', field: 'owner', minWidth: 100},
          {title: 'Ações', responsive: 0, minWidth: 350, 
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
                this.$router.push(`/editUser/${row.id}`);
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
                authService.delete(row.id)
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

              const btImpess = document.createElement('button');
              btImpess.type = 'button';
              btImpess.title = 'Logar como';
              btImpess.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btImpess.classList.add('button', 'is-info', 'is-outlined');
              btImpess.innerHTML = this.myspan3.innerHTML;
              btImpess.addEventListener('click', async () => {
                const user = { username: row.username , password: 'AH@g654321'};
                const resp = await authService.impersonate(user);
                if (resp){
                  this.$store.commit('auth/loginSuccess', resp);
                  location.href = this.$router.resolve({ name: 'home' }).href;
                  localStorage.removeItem('filterCp');
                  //this.$router.push({ name: 'home' });
                }
               /* .then(
                  () => {
                    document.getElementById('main').className = "main";
                    this.$router.push({ name: 'home' });
                  },

                );*/
              });

              const btReset = document.createElement('button');
              btReset.type = 'button';
              btReset.title = 'Reset';
              btReset.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btReset.classList.add('button', 'is-warning');
              btReset.innerHTML = this.myspan4.innerHTML;
              btReset.addEventListener('click', async () => {
                const ok = await this.$refs.confirmDialog.show({
                  title: 'Reset',
                  message: 'Deseja reiniciar o usuário para o padrão inicial?',
                  okButton: 'Confirmar',
              })
              if (ok) {
                authService.restart(row)
                .then(resp =>{
                  if (resp.status == '200'){
                    this.message = resp.data;
                    this.showMessage = true;
                    this.type = "success";
                    this.caption = "Usuário";
                    setTimeout(() => (this.showMessage = false), 3000);
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


              const buttonHolder = document.createElement('span');
              buttonHolder.appendChild(btEdit);
              buttonHolder.appendChild(btDel);

              if (this.currentUser.nivel == 1){
                buttonHolder.appendChild(btImpess);
                buttonHolder.appendChild(btReset);
              }

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
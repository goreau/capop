<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-11">
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Duplicidade de Servidores</p>
                    </header>
                    <div class="card-content">
                        <MyTable :tableData="dataTable" :columns="columns" :filtered="true" :tableName="tableName" />
                    </div>
                </div>
                <div style="display: none;">
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
import servidorService from "@/services/servidor.service";
import MyTable from '@/components/forms/MyTable.vue';
import Message from "@/components/general/Message.vue";
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';

export default {
    name: 'ListaVendas',
    data() {
        return {
            tableName: 'servidor',
            dataTable: [],
            showMessage: false,
            message: "",
            caption: "",
            type: "",
            columns: [],
            myspan2: null,
            id_user: 0,
            id_nivel: 0,
        }
    },
    components: {
        MyTable,
        ConfirmDialog,
        Message,

    },
    methods: {
        
    },
    mounted() {
        this.id_user = this.currentUser.id;
        this.id_nivel = this.currentUser.nivel;

        this.myspan2 = document.getElementsByName('coisa2')[0];
        
        servidorService.getDuplicidade()
            .then((response) => {
                this.dataTable = response.data;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => { });

        this.columns = [
            { title: "Base", field: "base", },
            { title: "Nome", field: "nome", },
            { title: "Função", field: "funcao", },
            { title: "Registros", field: "rows", },
            {
                title: 'Ações', responsive: 0, minWidth: 250,
                formatter: (cell, formatterParrams) => {
                    const row = cell.getRow().getData();

                    const btDel = document.createElement('button');
                    btDel.type = 'button';
                    btDel.title = 'Excluir';
                    btDel.disabled = this.id_nivel > 3;
                    btDel.style.cssText = 'height: fit-content; margin-left: 1rem;';
                    btDel.classList.add('button', 'is-danger', 'is-outlined');
                    btDel.innerHTML = this.myspan2.innerHTML;
                    btDel.addEventListener('click', async () => {
                        const ok = await this.$refs.confirmDialog.show({
                            title: 'Excluir',
                            message: 'Deseja excluir os registros duplicados desse servidor?',
                            okButton: 'Confirmar',
                        })
                        if (ok) {
                            servidorService.removeDuplicidades(row.ids)
                                .then(resp => {
                                    if (resp.status) {
                                        location.reload();
                                    } else {
                                        this.message = resp.msg;
                                        this.showMessage = true;
                                        this.type = "alert";
                                        this.caption = "Servidor";
                                        setTimeout(() => (this.showMessage = false), 3000);
                                    }
                                })
                                .catch(err => {
                                    this.message = err;
                                    this.showMessage = true;
                                    this.type = "alert";
                                    this.caption = "Servidor";
                                    setTimeout(() => (this.showMessage = false), 3000);
                                })
                        }
                    });


                    const buttonHolder = document.createElement('span');
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
    },
}
</script>

<style scoped>
.button {
    margin-right: 1rem;
}
</style>
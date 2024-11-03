<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-two-fifths">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Atividades Laboratoriais</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="field">
                                <label for="" class="label">Programa</label>
                                <div class="control">
                                    <CmbAuxiliares @selAux="ativ_lab.id_programa = $event" :tipo="5"
                                        :sel="ativ_lab.id_programa" />
                                    <span class="is-error" v-if="v$.ativ_lab.id_programa.$error">
                                        {{ v$.ativ_lab.id_programa.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Nome</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Nome"
                                        v-model="ativ_lab.descricao" maxlength="40"
                                        :class="{ 'is-danger': v$.ativ_lab.descricao.$error }" />
                                    <span class="is-error" v-if="v$.ativ_lab.descricao.$error">
                                        {{ v$.ativ_lab.descricao.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <label for="" class="checkbox">
                                        <input type="checkbox" v-model="ativ_lab.active" :value="1">
                                        Ativo
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <footerCard @submit="save" @cancel="null" @aux="details" :cFooter="cFooter" />
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
import manutencaoService from "@/services/manutencao.service";
import useValidate from "@vuelidate/core";
import {
    required$,
    combo$,
    minLength$,
} from "../../components/forms/validators.js";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";

export default {
    data() {
        return {
            ativ_lab: {
                id_ativ_lab: 0,
                descricao: "",
                id_programa: 0,
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
            ativ_lab: {
                descricao: { required$, minLength: minLength$(5) },
                id_programa: { required$, minValue: combo$(1) },
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
        footerCard,
        CmbAuxiliares
    },
    methods: {
        loadData() {
            this.isLoading = true;

            manutencaoService.getDados(3, this.ativ_lab.id_ativ_lab).then(
                (response) => {
                    let data = response.data;
                    this.ativ_lab.id_programa = data.id_programa;
                    this.ativ_lab.descricao = data.descricao;                
                    this.ativ_lab.active = data.active;
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
                    this.caption = "Ativ. Laboratorial";
                    setTimeout(() => (this.showMessage = false), 3000);
                }
            );

            this.isLoading = false;
        },
        save() {
            this.v$.$validate();
            if (!this.v$.$error) {
                document.getElementById("login").classList.add("is-loading");

                if (this.ativ_lab.id_ativ_lab > 0) {
                    manutencaoService.update(3, this.ativ_lab).then(
                        (response) => {
                            this.showMessage = true;
                            this.message = "Dados do atividade alterados com sucesso.";
                            this.type = "success";
                            this.caption = "Ativ. Laboratorial";
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
                            this.caption = "Ativ. Laboratorial";
                            setTimeout(() => (this.showMessage = false), 3000);
                        }
                    )
                        .finally(() => {
                            document.getElementById("login").classList.remove("is-loading");
                        });
                } else {
                    manutencaoService.create(3, this.ativ_lab).then(
                        (response) => {
                            this.showMessage = true;
                            this.message = "Atividade cadastrada com sucesso.";
                            this.type = "success";
                            this.caption = "Ativ. Laboratorial";
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
                            this.caption = "Ativ. Laboratorial";
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
                this.caption = "Servidor";
                setTimeout(() => (this.showMessage = false), 3000);
            }
        },
    },
    mounted() {
        this.ativ_lab.owner_id = this.currentUser.id;
    },
    created() {
        this.ativ_lab.id_ativ_lab = this.$route.params.id;
        if (this.ativ_lab.id_ativ_lab > 0) {
            this.loadData();
        }

    },
};
</script>

<style scoped></style>

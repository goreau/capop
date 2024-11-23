<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-three-fifths">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Envio de dados Mobile</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="field">
                                <label for="" class="label">JSON de envio</label>
                                <div class="control">
                                    <textarea class="textarea" cols="20" v-model="jsonEnvio"></textarea>
                                </div>
                            </div>
                            <div class="field" v-if="hasRet">
                                <label for="" class="label">Retorno</label>
                                <div class="control">
                                    <textarea class="textarea" cols="5" v-model="jsonRet"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <footerCard @submit="send" @cancel="null" @aux="null" :cFooter="cFooter" />
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
import mobileService from "@/services/mobile.service.js";

export default {
    data() {
        return {
            jsonEnvio: '',
            jsonRet: '',
            hasRet: false,
            isLoading: false,
            message: "",
            caption: "",
            type: "",
            strLocal: "",
            showMessage: false,
            cFooter: {
                strSubmit: 'Enviar',
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
        footerCard,
    },
    methods: {  
        send() {

            document.getElementById("login").classList.add("is-loading");

            let data = JSON.stringify(JSON.parse(this.jsonEnvio));

            mobileService.manual(data)
                .then(
                        (response) => {
                            this.jsonRet = JSON.stringify(response.data.result);
                            this.hasRet = true;
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
                            this.caption = "Envio de dados";
                            setTimeout(() => (this.showMessage = false), 3000);
                        }
                )
                .finally(() => {
                    document.getElementById("login").classList.remove("is-loading");
                });
            }
    },
};
</script>

<style scoped></style>

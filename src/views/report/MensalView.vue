<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-three-fifths">
                <Loader :active="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Relatório Mensal</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <section class="section">
                                <fieldset class="fieldset">
                                    <legend>Tipo de Informação</legend>
                                    <div class="control has-icons-left has-icons-right">
                                        <div class="columns">
                                            <div class="column is-3">
                                                <label class="radio">
                                                    <input type="radio" name="info" value="1" v-model="info" />
                                                    Campo
                                                </label>
                                            </div>
                                            <div class="column is-3">
                                                <label class="radio">
                                                    <input type="radio" name="info" value="2" v-model="info" />
                                                    Planejamento de Campo
                                                </label>
                                            </div>
                                            <div class="column is-3">
                                                <label class="radio">
                                                    <input type="radio" name="info" value="3" v-model="info" />
                                                    Planejamento Financeiro
                                                </label>
                                            </div>
                                            <div class="column is-3">
                                                <label class="radio">
                                                    <input type="radio" name="info" value="4" v-model="info" />
                                                    Laboratório
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <span class="is-error" v-if="v$.mensal.info.$error">
                                        {{ v$.mensal.info.$errors[0].$message }}
                                    </span>
                                </fieldset>
                            </section>
                            <section class="section" v-if="mensal.info > 0">
                                <h3>Corpo do Relatório:</h3>
                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <label class="label">Linha</label>
                                            <div class="control">
                                                <CmbGeneric :data="linhas" @change="setFantasia($event)" @selGen="mensal.linha = $event" :sel="mensal.linha"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="field">
                                            <label class="label">Variável</label>
                                            <div class="control">
                                                <CmbGeneric :data="incrementos" @selGen="mensal.incremento = $event" :sel="mensal.incremento"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section class="section" v-if="mensal.info > 0">
                                <h3>Filtros:</h3>
                                <div class="columns is-centered" v-if="filtros.indexOf('Ano') != -1">
                                    <div class="column is-3">
                                        <label class="label">Ano</label>
                                        <div class="select">
                                            <select v-model="mensal.filtro.ano" class="input"
                                                :class="errclass">
                                                <option value="0">-- Selecione --</option>
                                                <option v-for="gen in anos" :key="gen" :value="gen">
                                                    {{ gen }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="column is-1">
                                        <label for="">&nbsp;</label>
                                        <div class="control">OU</div>
                                    </div>
                                    <div class="column is-3">
                                        <label class="label">Início</label>
                                        <div class="control" id="contIni">
                                            <input type="text" id="dtIni">
                                        </div>
                                    </div>
                                    <div class="column is-3">
                                        <label class="label">Término</label>
                                        <div class="control" id="contFim">
                                            <input type="text" id="dtFim">
                                        </div>
                                    </div>
                                </div>
                                <div class="columns is-centered" v-if="filtros.indexOf('Unidade') != -1">
                                    <div class="column is-3">
                                        <label class="label">Unidade</label>
                                        <div class="control">
                                            <CmbTerritorio :id_prop="1" :tipo="9" @selTerr="mensal.filtro.unidade = $event" />
                                        </div>
                                    </div>
                                    <div class="column is-1" v-if="filtros.indexOf('Municipio') != -1">
                                        <label for="">&nbsp;</label>
                                        <div class="control">OU</div>
                                    </div>
                                    <div class="column is-3" v-if="filtros.indexOf('Municipio') != -1">
                                        <label class="label">Município</label>
                                        <div class="control">
                                            <CmbMunicipio :id_prop="1" :tipo="9" @selMun="mensal.filtro.municipio = $event" :all="false" />
                                        </div>
                                    </div>
                                </div>
                                <div class="columns is-centered" v-if="filtros.indexOf('Programa') != -1">
                                    <div class="column is-3">
                                        <label class="label">Programa</label>
                                        <div class="control">
                                            <CmbAuxiliares @selAux="mensal.filtro.id_programa = $event" :tipo="5" />
                                        </div>
                                    </div>
                                    <div class="column is-1">
                                        <label for="">&nbsp;</label>
                                    
                                    </div>
                                    <div class="column is-3" v-if="filtros.indexOf('Atividade') != -1">
                                        <label class="label">Atividade</label>
                                        <div class="control">
                                            <CmbAuxiliares @selAux="mensal.filtro.id_aux_atividade = $event" :tipo="tipoAtiv" :aux="mensal.filtro.id_programa" />
                                        </div>
                                    </div>
                                </div>
                                <div class="columns is-centered" v-if="filtros.indexOf('Servidor') != -1">
                                    <div class="column is-3">
                                        <label class="label">Servidor</label>
                                        <div class="control">
                                            <CmbServidor :id_prop="1" :tipo="9" @selServ="mensal.filtro.id_servidor = $event" />
                                        </div>
                                    </div>
                                    <div class="column is-1">
                                        <label for="">&nbsp;</label>
                                        
                                    </div>
                                    <div class="column is-3" v-if="filtros.indexOf('Pagamento') != -1">
                                        <label class="label">Pagamento</label>
                                        <div class="select">
                                            <select v-model="mensal.filtro.id_pagamento" class="input"
                                                :class="errclass">
                                                <option value="0">-- Selecione --</option>
                                                <option value="1">Diária</option>
                                                <option value="2">Gratificação</option>
                                                <option value="3">Etapa</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <footerCard @submit="create" @cancel="null" @aux="repeat" :cFooter="cFooter" />
                    </footer>
                </div>
            </div>
        </div>
    </div>
    <br>
    <br>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import CmbTerritorio from "@/components/forms/CmbTerritorio.vue";
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import CmbGeneric from "@/components/forms/CmbGeneric.vue";
import footerCard from '@/components/forms/FooterCard.vue';
import mensalService from "@/services/mensal.service";
import moment from 'moment';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import useValidate from "@vuelidate/core";
import {
    required$,
    combo$,
} from "../../components/forms/validators.js";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import CmbServidor from "@/components/forms/CmbServidor.vue";

export default {
    data() {
        return {
            mensal: {
                tabela: '',
                info: 0,
                linha: '',
                incremento: '',
                filtro: {
                    dt_inicio: '',
                    dt_final: '',
                    ano: '',
                    unidade: 0,
                    municipio: 0,
                }
            },
            fantasia: '',
            info: 0,
            tipoAtiv: 0,
            linhas: [],
            incrementos: [],
            filtros: [],
            anos: [],
            v$: useValidate(),
            isLoading: false,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            cFooter: {
                strSubmit: 'Gerar',
                strCancel: 'Cancelar',
                strAux: '',
                aux: false
            }
        }
    },
    methods: {
        setFantasia(ev){
            this.fantasia = ev.target.selectedOptions[0].innerHTML;
        },
        create(){
            localStorage.setItem('mensalCapop', JSON.stringify(this.mensal));
            
            this.$router.push(`/mensalReportData/${this.fantasia.toUpperCase()}`);
        },
        startDate() {
            const teste = document.querySelector('#dtIni');

            if (teste.type == 'text') {
                const elIni = document.querySelector('#contIni');
                elIni.innerHTML = "<input type='date' id='dtIni' />";

                const elFim = document.querySelector('#contFim');
                elFim.innerHTML = "<input type='date' id='dtFim' />";
            }

            const element = document.querySelector('#dtIni');
            var options = {
                type: "date",
                dateFormat: "dd/MM/yyyy",
                startDate: this.ini_date,
                showHeader: false,
                color: "primary"
            };

            var calini = bulmaCalendar.attach('#dtIni', options);

            if (element) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element.bulmaCalendar.on('select', datepicker => {
                    this.mensal.filtro.dt_inicio = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });

                element.bulmaCalendar.on('clear', datepicker => {
                    this.mensal.filtro.dt_inicio = '';
                });
            }

            options = {
                type: "date",
                dateFormat: "dd/MM/yyyy",
                startDate: this.fim_date,
                showHeader: false,
                color: "primary"
            };

            var calfim = bulmaCalendar.attach('#dtFim', options);

            const element2 = document.querySelector('#dtFim');

            if (element2) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element2.bulmaCalendar.on('select', datepicker => {
                    this.mensal.filtro.dt_final = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
                element2.bulmaCalendar.on('clear', datepicker => {
                    this.mensal.filtro.dt_final = '';
                });
            }

        },
        loadCombos() {
            this.isLoading = true;

            mensalService.getCombos(this.mensal.info).then(
                (response) => {
                    let data = response.data;
                    this.linhas = data.valores.linha;
                    this.incrementos = data.valores.incremento;
                    this.mensal.tabela = data.tabela;
                    this.filtros = [];// data.filtro;
                    for (let i = 0; i < data.valores.filtro.length; i++) {
                        this.filtros.push(data.valores.filtro[i].exibe);
                    }
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
                    this.caption = "Mensal";
                    setTimeout(() => (this.showMessage = false), 3000);
                }
            );

            this.isLoading = false;
        },
    },
    validations() {
        return {
            mensal: {
                info: { required$, minValue: combo$(1) },
                linha: { required$, minValue: combo$(1) },
                incremento: { required$, minValue: combo$(1) },
            }
        }
    },
    components: {
        Message,
        Loader,
        CmbTerritorio,
        CmbMunicipio,
        CmbAuxiliares,
        CmbServidor,
        CmbGeneric,
        footerCard
    },
    watch: {
        info(value) {
            this.mensal.info = value;
            this.tipoAtiv = value == 4 ? 10 : 6;
            this.mensal.linha = 0;
            this.mensal.incremento = 0;

            this.loadCombos();
        },
        filtros(){
            if(this.filtros.indexOf('Datas') != -1){
                setTimeout(() => {
                    this.startDate();
                }, 1000);
            }
        }
    },
    mounted() {
        var year = new Date().getFullYear();
        for (let vez=year; vez>=2020; vez--){
            this.anos.push(vez);
        }
    }
}
</script>

<style>
section {
    padding: .5rem;
}

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
<template>
  <Header />
  <div class="cont_total pt-5">
    <div class="cont_menu" v-if="showMenu">
      <sidebar-menu
        :menu="menu"
        :relative="true"
        @update:collapsed="onToggleCollapse"
        :showOneChild="true"
      />
    </div>
    <div class="main" id="main">
      
      <router-view />
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/general/Header.vue";
import Footer from "@/components/general/Footer.vue";
import { SidebarMenu } from "vue-sidebar-menu";

import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

export default {
  components: {
    Header,
    SidebarMenu,
    Footer,
    
  },
  methods: {
    onToggleCollapse(collapsed) {
      var dv = document.getElementById("main");
      if (collapsed) {
        dv.className = "main_colapsed";
      } else {
        dv.className = "main";
      }
    },
  },
  mounted() {
    if (this.hide) {
      this.onToggleCollapse(true);
    }
  },
  computed: {
    showMenu() {
      this.hide = this.$route.path === "/"  || this.$route.path === "/login" || this.$route.path === "/forgot" || this.$route.path === "/reset";
      return !this.hide;
    },
  },
  data() {
    return {
      hide: false,
      menu: [
        {
          header: "Opções",
          hiddenOnCollapse: true,
        },
        {
          href: "/home",
          title: "Home",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-house",
              size: "lg",
              transform: "shrink-8",
            },
          },
          child: [
            {
              href: "/mycad",
              title: "Meu Cadastro",
            },
            {
              href: "/about",
              title: "Sobre",
            },
            {
              href: "/",
              title: "Sair",
            },
          ],
        },
        {
          href: "/user",
          title: "Usuarios",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-users",
              size: "lg",
              transform: "shrink-8",
            },
          },
          child: [
            {
              href: "/users",
              title: "Consultar",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-search",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
            {
              href: "/troca",
              title: "Excluir",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-trash",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
          ],
        },
        {
          href: "",
          title: "Manutenção",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-wrench",
              size: "lg",
              transform: "shrink-8",
            },
          },
          child: [
            {
              href: "/listManutencao/1",
              title: "Programas",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-search",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
            {
              href: "/listManutencao/2",
              title: "Atividades",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-search",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
            {
              href: "/listManutencao/3",
              title: "Ativ. Laboratório",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-search",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
            {
              href: "/listManutencao/4",
              title: "Modalidade",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-search",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
            {
              href: "/listManutencao/5",
              title: "Perdas",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-search",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
            {
              href: "/listManutencao/6",
              title: "Listas SIAFEM",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-search",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
          ],
        },
        {
          href: "/servidor",
          title: "Servidores",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-person-walking",
              size: "lg",
              transform: "shrink-8",
            },
          },
          child: [
            {
              href: "/servidores",
              title: "Consultar",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-search",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
          ],
        },
        {
          href: "/atividade",
          title: "Atividade de Campo",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-person-circle-check",
              size: "lg",
              transform: "shrink-8",
            },
          },
          child: [
            {
              href: "/atividades",
              title: "Consultar",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-search",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
          ],
        },
        {
          href: "/laboratorio",
          title: "Atividade de Laboratorio",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-microscope",
              size: "lg",
              transform: "shrink-8",
            },
          },
          child: [
            {
              href: "/laboratorios",
              title: "Consultar",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-search",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
          ],
        },
        {
          href: "/planejamento",
          title: "Planejamento de Atividades",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-calendar-days",
              size: "lg",
              transform: "shrink-8",
            },
          },
          child: [
            {
              href: "/planejamentos",
              title: "Consultar",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-search",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
          ],
        },
        {
          href: "/financeiro",
          title: "Planejamento Financeiro",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-money-bill-transfer",
              size: "lg",
              transform: "shrink-8",
            },
          },
          child: [
            {
              href: "/financeiros",
              title: "Consultar",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-search",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
          ],
        },
        {
          href: "",
          title: "Relatórios de Campo",
          icon: {
            element: "font-awesome-icon",
            class: "small",
            attributes: {
              icon: "fa-solid fa-file-lines",
              transform: "shrink-10",
            },
            // text: ''
          },
          child: [
            {
              href: "/mainReport/7",
              title: "Resumo Atividades Campo",
            },
            {
              href: "/mainReport/8",
              title: "Indicador de Perdas",
            },
            {
              href: "/mainReport/9",
              title: "Indicador de Rendimento",
            },
            {
              href: "/mainReport/11",
              title: "Detalhamento de Perdas",
            },
          ],
        },
        {
          href: "",
          title: "Relatórios Gerenciais",
          icon: {
            element: "font-awesome-icon",
            class: "small",
            attributes: {
              icon: "fa-solid fa-file-lines",
              transform: "shrink-10",
            },
            // text: ''
          },
          child: [
            {
              href: "/mainReport/1",
              title: "Resumo de Uniforme",
            },
            {
              href: "/mainReport/2",
              title: "Planejamento Financeiro",
            },
            {
              href: "/mainReport/3",
              title: "Planejamento Operacional",
            },
            {
              href: "/mainReport/4",
              title: "Planejado X Executado",
            },
            {
              href: "/mainReport/5",
              title: "Capacidade Instalada",
            },
            {
              href: "/mainReport/6",
              title: "Uniforme/Servidor",
            },
            {
              href: "/mainReport/10",
              title: "Diárias X Passagens",
            },
            {
              href: "/mainReport/12",
              title: "Custo por Programa",
            },
            {
              href: "/mainReport/13",
              title: "Resumo para PPA",
            },
          ],
        },
        {
          href: "",
          title: "Relatórios Mensais",
          icon: {
            element: "font-awesome-icon",
            class: "small",
            attributes: {
              icon: "fa-solid fa-file-lines",
              transform: "shrink-10",
            },
          },
          child: [
            {
              href: "/mensalReport",
              title: "Construir",
            },
          ]
        }
      ],
    };
  },
};
</script>

<style lang="scss">
@import "@/components/general/css/custom-var";
@import "vue-sidebar-menu/src/scss/vue-sidebar-menu.scss";

* {
  font-family: Helvetica;
  font-size: medium;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.main-container {
  margin: 5rem;
  min-height: 40rem;
}
iframe#webpack-dev-server-client-overlay{display:none!important}
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
}
#app {
  height: 100%;
}
.main {
  margin-left: 290px;
  width: calc(100% - 290px);
  height: calc(100% - 7rem);
  margin-top: 4rem;
}
.main_colapsed {
  margin-left: 65px;
  width: calc(100% - 65px);
  height: calc(100% - 7rem);
  //   border:1px solid green;
}
.cont_total {
  width: 100%;
  height: calc(100%);

  ///  border:1px solid red;
}
.cont_menu {
  position: fixed;
  height: calc(100% - 7rem);
  width: 290px;
  overflow: auto;
  top: 4rem;
  bottom: 1rem;
}

.card {
  border: 0.5px solid #ccc;
  padding-top: 1rem;
}

.card-header p {
  color: rgb(23, 24, 102);
  font-size: larger;
}

.select {
  width: 100%;
}

.is-error {
  font-size: smaller;
  color: red;
  padding-left: 1rem;
}
.vsm--child {
  padding-left: 2rem;
  color:rgb(4, 5, 92);
}
.right-border {
    border-right: 2px solid black !important;
}

.tabulator-col-group{
  border-right: 2px solid black !important;
}
</style>

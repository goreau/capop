<template>
  <div class="conteudo">
    <div class="tile is-ancestor">
      <div class="tile is-vertical">
        <div class="tile is-6">
          <nav>
            <router-link to="/home" id="logo_url">
              <img src="@/assets/home.png" alt="img" id="logo" />
            </router-link>
          </nav>
          <p class="title">Sistema Capacidade Operacional - CapOp</p>
        </div>
        <div class="tile is-12">
          <div class="tile is-ancestor" v-if="loggedIn">
            <div class="tile is-3"></div>
            <div class="tile is-6">

            </div>
            <div class="tile is-3">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>



export default {
  name: "Header",
  components: {
  
  },
  methods: {
      selected(item) {  
        if (item.name === 'Sair'){
          var path = window.location.href;
          var arrpath = path.split('/');
          arrpath.pop();
          var final = arrpath.join('/');

         // window.location = window.location.hostname;
          window.location.assign(final);
          //  this.$router.push('/');
        } else {
          this.$router.push('/mycad');
        }
      },
    },
  data() {
      return {
      
      }
  },
  computed: {
    loggedIn() {
      this.log = this.$store.getters["auth/isLogged"];
      return this.$store.getters["auth/isLogged"];
    },
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  watch:{
    
  }
};
</script>
  
<style scoped lang="scss">
@import "@/components/general/css/custom-var";

.menu-bar-container .top{
    top: auto !important;
  }
  .menu-bar-container{
    position:relative !important;
  }

.conteudo {
  height: 6rem;
  background-color: $base-bg;
  border-bottom: 4px solid #020538;
  padding: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}



nav {

  padding: 1px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

nav #logo_url {
  margin: auto;
  margin-left: 0;
}

#logo {
  width: 40px;
  height: 40px;
}

.title {
  //color: darkgoldenrod;
  -webkit-text-stroke: 1px rgb(2, 4, 27);
  /* width and color */
  font-size: 2vw;
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(28, 14, 156);
}

@media only screen and (max-width: 320px) {

  .title {
    font-size: 2rem;
  }

}
</style>
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import '../node_modules/bulma/css/bulma.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import '../node_modules/tabulator-tables/dist/css/tabulator_bulma.min.css'



/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faFilePdf, faFileExcel, faFileCsv, faFileLines, faHouse, faUser, faUsers, faLock, faEdit, faTrash, faCheck, faBan, faSearch, faPlusCircle, faBroom, 
    faShirt, faList, faPersonWalking, faPersonCircleCheck, faMicroscope, faMoneyBillTransfer, faCalendarDays, faWrench, faRepeat, faMobileScreen, faEye, faPowerOff, faGears} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faFilePdf, faFileExcel, faFileCsv, faFileLines, faHouse, faUser, faUsers, faLock, faEdit, faTrash, faCheck, faBan, faSearch, faPlusCircle, faBroom,
    faShirt, faList, faPersonWalking, faPersonCircleCheck, faMicroscope, faMoneyBillTransfer, faCalendarDays, faWrench, faRepeat, faMobileScreen, faEye, faPowerOff, faGears);


createApp(App)
.use(store)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')

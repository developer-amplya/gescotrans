<template>
  <f7-page
    @page:afterin="retrieveData"
    @page:beforeout="$refs.actions_sheet.close()"
  >
    <!-- Navbar -->
    <f7-navbar back-link>
      <f7-nav-title>Tráfico de {{ getUserName }}</f7-nav-title>
      <f7-nav-right>
        <f7-link panel-open="right">
          <f7-icon material="menu"></f7-icon>
        </f7-link>
      </f7-nav-right>
    </f7-navbar>

    <!-- Timeline -->
    <div class="timeline timeline-horizontal col-100 tablet-50">
      <!-- Timeline Item (Day) -->
      <div
        class="timeline-item"
        v-for="(fecha, index) in lista_fechas"
        :key="index"
      >
        <div class="timeline-item-date">{{ getSchedule[fecha][0] }}</div>
        <div class="timeline-item-content">
          <div
            class="timeline-item-inner"
            v-for="(value, key, index) in getSchedule[fecha][1]"
            :key="index"
          >
            <div @click="openActionsSheet(value[0], value[5])">
              <div class="timeline-item-time">{{ value[1] }}</div>
              <div class="timeline-item-title">{{ value[2] }}</div>
              <div class="timeline-item-subtitle">{{ value[3] }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sheet -->
    <f7-sheet
      class="sheet"
      ref="actions_sheet"
      @sheet:closed="sheetOpened = false"
    >
      <!-- Scrollable sheet content -->
      <f7-page-content>
        <f7-block>
          <f7-button outline large @click="open_states_picker" sheet-close
            >Cambiar estado</f7-button
          >
          <br />
          <f7-button outline large @click="edit_cargo_note" sheet-close
            >Editar nota</f7-button
          >
          <br />
          <f7-button outline large sheet-close>Cancelar</f7-button>
        </f7-block>
      </f7-page-content>
    </f7-sheet>
  </f7-page>
</template>

<script>
import axios from "axios";
import { WS_PATH } from "../config";
import { mapGetters } from "vuex";

export default {
  name: "ViewTraffic",
  data() {
    return {
      lista_fechas: [],
      shipment_code: null,
      state_code: null,
      states_codes: [],
      states_names: []
    };
  },
  computed: {
    ...mapGetters([
      "getUserName",
      "getUserPass",
      "getSchedule",
      "getLoadStates",
      "getUserRole"
    ])
  },
  mounted() {
    if (this.getLoadStates.length > 1) {
      // Get separated lists from states list (codes & names)
      this.getLoadStates.forEach(item => {
        this.states_codes.push(item[0]);
        this.states_names.push(item[1]);
      });
    }
  },
  methods: {
    open_states_picker() {
      var statesPicker = this.$f7.picker.create({
        rotateEffect: true,
        scrollToInput: true,
        momentumRatio: 14,
        toolbar: true,
        toolbarCloseText: "Hecho",
        value: [this.state_code],
        cols: [
          {
            textAlign: "center",
            values: this.states_codes,
            displayValues: this.states_names
          }
        ],
        on: {
          closed: statesPicker => {
            this.state_code = statesPicker.value[0];
            this.change_state();

            if (this.state_code === "FN") {
              // Wait 2 seconds and go
              setTimeout(() => {
                this.$f7router.navigate("/delivery-note/" + this.shipment_code);
              }, 2000);
            }
          }
        }
      });
      statesPicker.open();
    },
    retrieveData() {
      // Preloader On
      this.$f7.dialog.preloader("Cargando...");

      // Get schedule
      let bodyFormData = new FormData();
      bodyFormData.set("user", this.getUserName);
      bodyFormData.set("pass", this.getUserPass);
      bodyFormData.set("cod_chofer", this.getUserCode);
      bodyFormData.set("ipgsbase", localStorage.aytrans_ipgsbase);
      bodyFormData.set("gestgsbase", localStorage.aytrans_gestgsbase);
      bodyFormData.set("aplgsbase", localStorage.aytrans_aplgsbase);
      bodyFormData.set("ejagsbase", localStorage.aytrans_ejagsbase);
      bodyFormData.set("puertogsbase", localStorage.aytrans_puertogsbase);

      axios({
        method: "post",
        url: WS_PATH + "get_agenda_chofer.php",
        data: bodyFormData,
        timeout: 60000
      })
        .then(response => {
          console.log(response);

          // Preloader Off
          this.$f7.dialog.close();

          if (response.data.usuario_valido === true) {
            let schedule = JSON.parse(
              this.decodeEntities(JSON.stringify(response.data.agenda))
            );

            // Set state
            this.$store.dispatch("setSchedule", schedule);

            this.lista_fechas = response.data.lista_fechas;
          } else {
            this.$f7.dialog.alert("gsBase ha respondido KO", "Error");
          }
        })
        .catch(error => {
          //console.log(error);
          // Preloader Off
          this.$f7.dialog.close();

          if (error.code === "ECONNABORTED") {
            this.$f7.dialog.alert(
              "El servidor ha superado el tiempo de respuesta: asegúrate que tienes conexión de datos",
              "Error"
            );
          } else {
            this.$f7.dialog.alert("No se ha podido conectar", "Error");
          }
        });
    },
    openActionsSheet(code, status) {
      // El conductor es dirigido a otra vista de sólo lectura
      if (this.getUserRole === "driver") {
        this.$f7router.navigate("/order-detail-page/" + code);
      }

      if (status === "FN") return;
      this.shipment_code = code;
      this.state_code = status;
      this.$refs.actions_sheet.open();
    },
    edit_cargo_note() {
      this.$f7router.navigate("/edit-cargo-note/" + this.shipment_code);
    },
    change_state() {
      // Preloader On
      this.$f7.dialog.preloader("Enviando...");

      // Get schedule
      let bodyFormData = new FormData();
      bodyFormData.set("user", this.getUserName);
      bodyFormData.set("pass", this.getUserPass);
      bodyFormData.set("ipgsbase", localStorage.aytrans_ipgsbase);
      bodyFormData.set("gestgsbase", localStorage.aytrans_gestgsbase);
      bodyFormData.set("aplgsbase", localStorage.aytrans_aplgsbase);
      bodyFormData.set("ejagsbase", localStorage.aytrans_ejagsbase);
      bodyFormData.set("puertogsbase", localStorage.aytrans_puertogsbase);
      //--------------------------------------
      bodyFormData.set("cod_nota", this.shipment_code);
      bodyFormData.set("cod_estado", this.state_code);
      bodyFormData.set("matricula", "");

      axios({
        method: "post",
        url: WS_PATH + "set_state.php",
        data: bodyFormData,
        timeout: 15000
      })
        .then(response => {
          console.log(response);

          // Preloader Off
          this.$f7.dialog.close();

          if (response.data.res === 0) {
            //
            let notification = this.$f7.toast.create({
              position: "top",
              text: "Guardado",
              cssClass: "success",
              icon: '<i class="icon material-icons">done</i>',
              closeTimeout: 2000
            });
            notification.open();
            //
            setTimeout(() => {
              this.retrieveData();
            }, 2000);
          } else {
            this.$f7.dialog.alert(response.data.error, "Error");
          }
        })
        .catch(error => {
          console.log(error);
          // Preloader Off
          this.$f7.dialog.close();
          this.$f7.dialog.alert("No se ha podido conectar", "Error");
        });
    },
    decodeEntities(encodedString) {
      var translate_re = /&(aacute|eacute|iacute|oacute|uacute|ntilde|Aacute|Eacute|Iacute|Oacute|Uacute|Ntilde|ordf|ordm);/g;
      var translate = {
        aacute: "á",
        eacute: "é",
        iacute: "í",
        oacute: "ó",
        uacute: "ú",
        ntilde: "ñ",
        Aacute: "Á",
        Eacute: "É",
        Iacute: "Í",
        Oacute: "Ó",
        Uacute: "Ú",
        Ntilde: "Ñ",
        ordf: "ª",
        ordm: "º"
      };
      return encodedString
        .replace(translate_re, function(match, entity) {
          return translate[entity];
        })
        .replace(/&#(\d+);/gi, function(match, numStr) {
          var num = parseInt(numStr, 10);
          return String.fromCharCode(num);
        });
    }
  }
};
</script>

<style scope>
.timeline-item-inner {
  background: #f7f7f8;
}
</style>

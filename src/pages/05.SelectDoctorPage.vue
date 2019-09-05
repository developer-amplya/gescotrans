<template>
  <f7-page>
    <!-- Navbar -->
    <f7-navbar back-link>
      <f7-nav-title>Lista de Especialidades</f7-nav-title>
      <f7-nav-right>
        <f7-link panel-open="right">
          <f7-icon material="menu"></f7-icon>
        </f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block>
      <!-- Specialties list -->
      <f7-list no-hairlines>
        <f7-list-item
          v-for="(value, key, index) in getDoctors"
          :key="index"
          :title="value[0]"
          link="#"
          popup-open=".doctors-popup"
          @click="selectSpecialty(key)"
        ></f7-list-item>
      </f7-list>
    </f7-block>

    <!-- Popup to select the doctor -->
    <f7-popup class="doctors-popup" ref="doctorspopup">
      <div class="page">
        <!-- Popup header -->
        <div class="navbar">
          <div class="navbar-inner">
            <div class="left"></div>
            <div class="title">{{ specialty }}</div>
            <div class="right">
              <a href="#" class="link popup-close">&times;</a>
            </div>
          </div>
        </div>

        <!-- Popup content -->
        <div>
          <f7-block>
            <br>
            <!-- Doctors list -->
            <f7-list no-hairlines>
              <f7-list-item
                v-for="(value, key, index) in doctors"
                :key="index"
                :title="value[1]"
                link="#"
                @click="selectDoctor(value[0], value[1])"
              ></f7-list-item>
            </f7-list>
          </f7-block>
        </div>
      </div>
    </f7-popup>
  </f7-page>
</template>

<script>
import axios from "axios";
import { WS_PATH } from "../config";
import { mapGetters } from "vuex";

export default {
  name: "SelectDoctorPage",
  data() {
    return {
      specialty: "",
      doctors: []
    };
  },
  computed: {
    ...mapGetters(["getDoctors"])
  },
  methods: {
    selectSpecialty(specialtyCode) {
      this.$store.dispatch("setSpecialty", [specialtyCode, this.getDoctors[specialtyCode][0]]);
      this.specialty = this.getDoctors[specialtyCode][0];
      this.doctors = this.getDoctors[specialtyCode][1];
    },
    selectDoctor(doctorCode, doctorName) {
      this.$store.dispatch("setDoctor", [doctorCode, doctorName]);
      this.$refs.doctorspopup.close();
      this.$f7router.back();
    }
  }
};
</script>

<style scoped>
.popup-close {
  font-size: 24px;
  font-weight: bold;
  padding-right: 10px;
}
</style>



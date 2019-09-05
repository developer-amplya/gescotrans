<template>
  <f7-page>
    <!-- Navbar -->
    <f7-navbar back-link>
      <f7-nav-title>Lista de motivos</f7-nav-title>
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
          v-for="(value, key, index) in reasons_list"
          :key="index"
          :title="value[1]"
          :after="value[2]"
          link="#"
          @click="setReason(value[0], value[1], value[2])"
        ></f7-list-item>
      </f7-list>
    </f7-block>
  </f7-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ReasonsPage",
  data() {
    return {
      reasons_list: ""
    };
  },
  mounted() {
    this.reasons_list = this.getReasonsList[this.getSpecialty[0]][1];
  },
  computed: {
    ...mapGetters(["getReasonsList", "getSpecialty"])
  },
  methods: {
    setReason(reasonCode, reasonDescription, reasonTime) {
      this.$store.dispatch("setReason", [reasonCode, reasonDescription, reasonTime]);
      this.$f7router.back();
    }
  }
};
</script>

<style scoped>
</style>



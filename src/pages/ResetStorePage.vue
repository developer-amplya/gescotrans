<template>
    
</template>

<script>
    export default {
        name: "ResetStorePage",
        created() {
            this.$store.dispatch("setAvailability", {});
            this.$store.dispatch("setCancelList", []);
            this.$store.dispatch("setUserName", "");
            this.$store.dispatch("setUserPass", "");
            this.$store.dispatch("setDate", "");
            this.$store.dispatch("setDoctors", {});
            this.$store.dispatch("setReasonsList", {});
            this.$store.dispatch("setSchedule", {});
            this.$store.dispatch("setSpecialty", []);
            this.$store.dispatch("setTimeSlot", '');
            this.$store.dispatch("setDoctor", ["", "Seleccionar..."]);
            this.$store.dispatch("setPatient", ["", "Seleccionar..."]);
            this.$store.dispatch("setReason", ["", "Seleccionar..."]);
            this.$store.dispatch("setPatientsList", null);
            this.$store.dispatch("setTimeRange", []);

            this.$f7router.navigate('/login');
        }
    }
</script>

<style scoped>

</style>
<template>
    
</template>

<script>
    export default {
        name: "ResetStorePage",
        created() {
            this.$store.dispatch("setUserName", "");
            this.$store.dispatch("setUserPass", '');
            this.$store.dispatch("setUserCode", '');
            this.$store.dispatch("setLoadStates", {});
            this.$store.dispatch("setSchedule", {});
            this.$store.dispatch("setCustomersList", [
                ['000', 'A', ''],
                ['456', 'Antonio Orozco', '666 555 444'],
                ['254', 'Andrea Valles', '666 777 888'],
                ['000', 'B', ''],
                ['965', 'Bartolome de las Chozas', '666 555 444'],
                ['853', 'Begoña Valles', '666 777 888']
            ]);
            this.$store.dispatch("setServicesList", [
                ['000', 'A', ''],
                ['456', 'Antonio Orozco', '666 555 444'],
                ['254', 'Andrea Valles', '666 777 888'],
                ['000', 'B', ''],
                ['965', 'Bartolome de las Chozas', '666 555 444'],
                ['853', 'Begoña Valles', '666 777 888']
            ]);
            this.$store.dispatch("setSuppliersList", [
                ['000', 'A', ''],
                ['456', 'Antonio Orozco', '666 555 444'],
                ['254', 'Andrea Valles', '666 777 888'],
                ['000', 'B', ''],
                ['965', 'Bartolome de las Chozas', '666 555 444'],
                ['853', 'Begoña Valles', '666 777 888']
            ]);
            this.$store.dispatch("setCustomer", ['', 'Seleccionar...']);
            this.$store.dispatch("setService", ['', 'Seleccionar...']);
            this.$store.dispatch("setSupplier", ['', 'Seleccionar...']);
            this.$store.dispatch("setCargoNoteDate", null);

            this.$f7router.navigate('/login');
        }
    }
</script>

<style scoped>

</style>
<template>
    
</template>

<script>
    export default {
        name: "ResetStorePage",
        created() {
            this.$store.dispatch("setUserName", "");
            this.$store.dispatch("setUserPass", "");
            this.$store.dispatch("setUserCode", "");
            this.$store.dispatch("setLoadStates", {});

            this.$f7router.navigate('/login');
        }
    }
</script>

<style scoped>

</style>
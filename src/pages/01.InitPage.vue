<template>
    <f7-page class="cover">

        <f7-block>
            <div class="logo">
                <img src="../assets/front.png">
            </div>
        </f7-block>

        <f7-block>
            <div class="logo-amplya">
                <img src="../assets/logo-amplya-blanco.png">
            </div>
        </f7-block>

        <f7-toolbar position="bottom" no-shadow no-hairline>
            <p>
                <small>&copy; 2019 Amplya</small>
            </p>

            <!-- Version -->
            <div class="version">
                <small>v.1.5.4</small>
            </div>
        </f7-toolbar>
    </f7-page>
</template>

<script>
    export default {
        name: "InitPage",
        mounted() {
            if (localStorage.ipgsbase === undefined)
                localStorage.ipgsbase = "amplya.selfip.com";
            if (localStorage.puertogsbase === undefined)
                localStorage.puertogsbase = "8121";
            if (localStorage.gestgsbase === undefined)
                localStorage.gestgsbase = "amplya";
            if (localStorage.ejagsbase === undefined) localStorage.ejagsbase = "dmo";
            if (localStorage.lastuser === undefined) localStorage.lastuser = "";

            setTimeout(() => {
                this.$f7router.navigate("/login");
            }, 2000);
        }
    };
</script>

<style scoped>
    .cover {
        background: transparent url("../assets/background.jpg") no-repeat bottom center;
        font-size: 18px !important;
        text-align: center;
    }

    .cover {
        color: #ffffff !important;
    }

    .logo img {
        width: 100%;
    }

    .toolbar {
        background-color: transparent !important;
        text-align: center;
    }

    .toolbar p {
        width: 100%;
        border-top: 1px solid #ffffff;
        padding-top: 6px;
        color: #ffffff;
    }

    .ios .block {
        color: #ffffff;
    }

    .version {
        position: absolute;
        padding-top: 6px;
        right: 10px;
        color: #ffffff;
    }

    .logo-amplya {
        width: 70%;
        margin: auto;
    }

    .logo-amplya img {
        width: 100%;
    }
</style>

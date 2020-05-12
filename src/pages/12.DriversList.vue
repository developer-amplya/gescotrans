<template>

    <f7-page>
        <!-- Navbar -->
        <f7-navbar back-link>
            <f7-nav-title>Lista de conductores</f7-nav-title>
            <f7-nav-right>
                <f7-link panel-open="right">
                    <f7-icon material="menu"></f7-icon>
                </f7-link>
            </f7-nav-right>
            <f7-subnavbar :inner="false">
                <f7-searchbar
                        search-container=".virtual-list"
                        search-item="li"
                        search-in=".item-title"
                        placeholder="Buscar"
                        disable-button-text="Cancelar"
                ></f7-searchbar>
            </f7-subnavbar>
        </f7-navbar>

        <!-- Searchbar not found -->
        <f7-list class="searchbar-not-found">
            <f7-list-item title="No se encontró nada"></f7-list-item>
        </f7-list>

        <!-- Suppliers list -->
        <f7-list
                class="searchbar-found"
                media-list
                virtual-list
                :virtual-list-params="{ items, searchAll, renderExternal, height: $theme.ios ? 63 : ($theme.md ? 73 : 46)}">
            <ul>
                <li v-for="(driver, index) in vlData.items"
                    :key="index"
                    :style="`top: ${vlData.topPosition}px`">
                    <div class="item-content" @click="selecDriver(driver)">
                        <div class="item-inner">
                            <div class="item-title">
                                {{driver[1]}}
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </f7-list>

    </f7-page>

</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "DriversList",
        props: ['supplier'],
        data() {
            return {
                items: [],
                vlData: {
                    items: [],
                },
            };
        },
        created() {
            let drivers = this.getDriversList
            let supplier = this.supplier
            this.items = drivers[supplier]
        },
        computed: {
            ...mapGetters(['getDriversList'])
        },
        methods: {
            searchAll(query, items) {
                //console.log(query)
                const found = [];
                for (let i = 0; i < items.length; i += 1) {
                    if (items[i][1].toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
                }
                return found; // return array with mathced indexes
            },
            renderExternal(vl, vlData) {
                this.vlData = vlData;
            },
            selecDriver(driver) {
                this.$store.dispatch("setDriver", driver);
                this.$f7router.back();
            },
        },
    }
</script>

<style scoped>
    .virtual-list {
        margin-top: 0;
    }

    .item-inner {
        /*display: flex;*/
    }

    .item-after > .icon {
        opacity: .5;
    }

    .item-after i.icon {
        padding-top: 3px;
    }

    .item-divider {
        font-weight: bold;
        color: #0C3D87 !important;
    }
</style>
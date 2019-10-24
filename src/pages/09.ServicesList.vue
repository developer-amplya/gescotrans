<template>

    <f7-page>
        <!-- Navbar -->
        <f7-navbar back-link>
            <f7-nav-title>Lista de Servicios</f7-nav-title>
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

        <!-- Contacts list -->
        <f7-list
                class="searchbar-found"
                media-list
                virtual-list
                :virtual-list-params="{ items, searchAll, renderExternal, height: $theme.ios ? 63 : ($theme.md ? 73 : 46)}">
            <ul>
                <li v-for="(contact, index) in vlData.items"
                    :key="index"
                    :style="`top: ${vlData.topPosition}px`">
                    <div class="item-content item-divider" v-if="contact[0] === '000'">
                        <div class="item-inner">
                            {{contact[1]}}
                        </div>
                    </div>
                    <div class="item-content" v-else @click="selectService(contact[0], contact[1], contact[2])">
                        <div class="item-inner">
                            <div class="item-title">
                                {{contact[1]}}
                            </div>
                            <div class="item-after">
                                <f7-icon slot="media" material="phone" size="18px"></f7-icon>
                                {{contact[2]}}
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
        name: "ServicesList",
        data() {
            return {
                items: [],
                vlData: {
                    items: [],
                },
            };
        },
        created() {
            this.items = this.getServicesList
        },
        computed: {
            ...mapGetters(['getServicesList'])
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
            selectService(code, name, phone) {
                this.$store.dispatch("setService", [code, name, phone]);
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
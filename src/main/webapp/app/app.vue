<template>
    <v-app id="inspire">
        <ribbon></ribbon>
        <jhi-navbar></jhi-navbar>
        <v-content>
            <v-container fluid>
            <v-slide-y-transition mode="out-in">
                <router-view></router-view>
            </v-slide-y-transition>
            </v-container>
        </v-content>
        <v-footer color="indigo" app>
            <span class="white--text version">{{version}}</span> <span class="white--text">&copy; 2019</span>
        </v-footer>
        <login-form></login-form>
    </v-app>
</template>

<script lang="ts" src="./app.component.ts">
</script>
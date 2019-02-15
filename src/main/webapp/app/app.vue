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
        <jhi-footer></jhi-footer>
        <login-form></login-form>
    </v-app>
</template>

<script lang="ts" src="./app.component.ts">
</script>

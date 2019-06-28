<template>
  <v-layout row xs12 wrap>
    <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
      <v-card class="ma-4">
        <v-card-title primary-title>
            <v-container grid-list-md>
            <v-layout wrap>
                <h1 v-text="$t('activate.title')">Activation</h1>

                <v-alert :value="success" type="success">
                    <span v-html="$t('activate.messages.success')"><strong>Your user account has been activated.</strong> Please </span>
                    <a class="alert-link" v-on:click="openLogin" v-text="$t('global.messages.info.authenticated.link')">sign in</a>.
                </v-alert>
                <v-alert type="error" :value="error" v-html="$t('activate.messages.error')">
                    <strong>Your user could not be activated.</strong> Please use the registration form to sign up.
                </v-alert>

            </v-layout>
            </v-container>
          </v-card-title>
      </v-card>
    </form>
  </v-layout>
</template>

<script lang="ts" src="./activate.component.ts">
</script>

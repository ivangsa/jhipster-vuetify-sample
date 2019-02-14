<template>
  <v-layout row xs12 wrap>
    <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
      <v-card class="ma-4">
        <v-card-title primary-title>
            <v-container grid-list-md>
            <v-layout wrap>
                <h2 v-if="username" id="settings-title"><span v-bind:value="$t('settings.title')">User settings for [<b>{{username}}</b>]</span></h2>

                <v-alert :value="success" type="success" v-html="$t('settings.messages.success')">
                    <strong>Settings saved!</strong>
                </v-alert>
                <v-alert :value="errorEmailExists" type="error" v-html="$t('register.messages.error.emailexists')">
                    <strong>Email is already in use!</strong> Please choose another one.
                </v-alert>

                <v-flex xs12>
                    <v-text-field v-model="settingsAccount.firstName" @input="$v.settingsAccount.firstName.$touch()" :label="$t('settings.form.firstname')" 
                        :error-messages="validationMessages('settingsAccount.firstName', 'settings.messages.validate.firstname.{constraintTypeToLower}')" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="settingsAccount.lastName" @input="$v.settingsAccount.lastName.$touch()" :label="$t('settings.form.lastname')" 
                        :error-messages="validationMessages('settingsAccount.lastName', 'settings.messages.validate.lastname.{constraintTypeToLower}')" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="settingsAccount.email" @input="$v.settingsAccount.email.$touch()" :label="$t('global.form.email')" 
                        :error-messages="validationMessages('settingsAccount.email', 'global.messages.validate.email.{constraintTypeToLower}')" required></v-text-field>
                </v-flex>
                <v-flex xs12 v-if="languages && Object.keys(languages).length > 1">
                    <v-select v-model="settingsAccount.langKey" 
                        :items="Object.keys(languages).map((langKey) => { return {value: langKey, text: languages[langKey].name} })" item-text="text" item-value="value"
                        attach :label="$t('settings.form.language')">
                    </v-select>
                </v-flex>
                <v-flex xs12>
                    <v-btn color="orange darken-2" dark @click.prevent="$router.go(-1)">
                        <v-icon dark left>arrow_back</v-icon><span v-text="$t('entity.action.cancel')">Cancel</span>
                    </v-btn>
                    <v-btn color="primary" dark @click.prevent="save()">
                        <span v-text="$t('entity.action.save')">Save</span>
                        <v-icon dark right>check_circle</v-icon>
                    </v-btn>                    
                </v-flex>
            </v-layout>
            </v-container>
          </v-card-title>
      </v-card>
    </form>
  </v-layout>
</template>

<script lang="ts" src="./settings.component.ts">
</script>

<template>
  <v-layout row xs12 wrap>
    <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" v-if="userAccount" >
      <v-card class="ma-4">
        <v-card-title primary-title>
            <v-container grid-list-md>
            <v-layout wrap>
                <h2 id="myUserLabel" v-text="$t('userManagement.home.createOrEditLabel')">
                    Create or edit a User
                </h2>

                <v-flex xs12>
                    <v-text-field v-model="userAccount.login" @input="$v.userAccount.login.$touch()" :label="$t('userManagement.login')" 
                        :error-messages="validationMessages('userAccount.login')" required></v-text-field>
                </v-flex>

                <v-flex xs12>
                    <v-text-field v-model="userAccount.firstName" @input="$v.userAccount.firstName.$touch()" :label="$t('settings.form.firstname')" 
                        :error-messages="validationMessages('userAccount.firstName')" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="userAccount.lastName" @input="$v.userAccount.lastName.$touch()" :label="$t('settings.form.lastname')" 
                        :error-messages="validationMessages('userAccount.lastName')" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="userAccount.email" @input="$v.userAccount.email.$touch()" :label="$t('global.form[\'email.label\']')" 
                        :error-messages="validationMessages('userAccount.email')" required></v-text-field>
                </v-flex>
                <v-flex xs12 v-if="languages && Object.keys(languages).length > 1">
                    <v-select v-model="userAccount.langKey" 
                        :items="Object.keys(languages).map((langKey) => { return {value: langKey, text: languages[langKey].name} })" item-text="text" item-value="value"
                        attach :label="$t('settings.form.language')">
                    </v-select>
                </v-flex>
                <v-flex xs12 v-if="authorities">
                    <v-select multiple v-model="userAccount.authorities" 
                        :items="authorities" item-text="authority" item-value="authority"
                        attach :label="$t('userManagement.profiles')">
                    </v-select>
                </v-flex>
                <v-flex xs12>
                    <v-switch v-model="userAccount.activated" :label="$t('userManagement.activated')"></v-switch>
                </v-flex>

                <v-flex xs12>
                    <v-btn @click.prevent="$router.go(-1)">
                        <v-icon dark left>arrow_back</v-icon><span v-text="$t('entity.action.cancel')">Cancel</span>
                    </v-btn>
                    <v-btn color="primary" dark @click.prevent="save()" :disabled="$v.userAccount.$invalid || isSaving">
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

<script lang="ts" src="./user-management-edit.component.ts">
</script>

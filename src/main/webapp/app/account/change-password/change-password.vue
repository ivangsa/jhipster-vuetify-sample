<template>
  <v-layout row xs12 wrap>
    <form name="editForm" role="form" novalidate v-on:submit.prevent="changePassword()" >
      <v-card class="ma-4">
        <v-card-title primary-title>
            <v-container grid-list-md>
            <v-layout wrap>
                <h2 v-if="account" id="password-title"><span v-html="$t('password.title', { 'username': username})">>Password for [<b>{{username}}</b>]</span></h2>

                <v-alert type="success" :value="success" v-html="$t('password.messages.success')">
                    <strong>Password changed!</strong>
                </v-alert>
                <v-alert type="error" :value="error" v-html="$t('password.messages.error')">
                    <strong>An error has occurred!</strong> The password could not be changed.
                </v-alert>
                <v-alert type="error" :value="doNotMatch" v-text="$t('global.messages.error.dontmatch')">
                    The password and its confirmation do not match!
                </v-alert>

                <v-flex xs12>
                    <v-text-field v-model="resetPassword.currentPassword" @input="$v.resetPassword.currentPassword.$touch()" :label="$t('global.form.currentpassword')" 
                        :error-messages="validationMessages('resetPassword.currentPassword', 'global.messages.validate.currentpassword.{constraintTypeToLower}')" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="resetPassword.newPassword" @input="$v.resetPassword.newPassword.$touch()" :label="$t('global.form.newpassword')" 
                        :error-messages="validationMessages('resetPassword.newPassword', 'global.messages.validate.newpassword.{constraintTypeToLower}')" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="resetPassword.confirmPassword" @input="$v.resetPassword.confirmPassword.$touch()" :label="$t('global.form.confirmpassword')" 
                        :error-messages="validationMessages('resetPassword.confirmPassword', 'global.messages.validate.confirmpassword.{constraintTypeToLower}')" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-btn color="orange darken-2" dark @click.prevent="$router.go(-1)">
                        <v-icon dark left>arrow_back</v-icon><span v-text="$t('entity.action.cancel')">Cancel</span>
                    </v-btn>
                    <v-btn color="primary" dark @click.prevent="changePassword()" :disabled="$v.resetPassword.$invalid">
                        <span v-text="$t('password.form.button')">Save</span>
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

<script lang="ts" src="./change-password.component.ts">
</script>

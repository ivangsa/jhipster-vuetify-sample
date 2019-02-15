<template>
  <v-layout row xs12 wrap>
    <form v-if="!success" name="editForm" role="form" novalidate v-on:submit.prevent="requestReset()">
      <v-card class="ma-4">
        <v-card-title primary-title>
            <v-container grid-list-md>
            <v-layout wrap>
                <h1 v-text="$t('reset.request.title')">Reset your password</h1>

                <v-flex xs12>
                    <v-alert type="success" :value="success === 'OK'">
                        <p v-text="$t('reset.request.messages.success')">Check your emails for details on how to reset your password.</p>
                    </v-alert>
                    <v-alert type="info" :value="!success">
                        <p v-text="$t('reset.request.messages.info')">Enter the email address you used to register.</p>
                    </v-alert>
                    <v-alert type="error" :value="errorEmailNotExists" v-html="$t('reset.request.messages.notfound')">
                        <strong>Email address isn't registered!</strong> Please check and try again.
                    </v-alert>
                </v-flex>

                <v-flex xs12>
                    <v-text-field v-model="resetAccount.email" @input="$v.resetAccount.email.$touch()" :label="$t('global.form.email')" 
                        :error-messages="validationMessages('resetAccount.email', 'global.messages.validate.email.{constraintTypeToLower}')" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-btn color="primary" @click.prevent="requestReset()" :disabled="$v.resetAccount.$invalid">
                        <span v-text="$t('reset.request.form.button')">Reset</span>
                        <v-icon right>check_circle</v-icon>
                    </v-btn>                    
                </v-flex>
            </v-layout>
            </v-container>
          </v-card-title>
      </v-card>
    </form>
  </v-layout>        
</template>

<script lang="ts" src="./reset-password.component.ts">
</script>

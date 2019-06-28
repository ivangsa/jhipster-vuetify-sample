<template>
  <v-layout row xs12 wrap>
    <form name="editForm" role="form" novalidate v-on:submit.prevent="register()" >
      <v-card class="ma-4">
        <v-card-title primary-title>
            <v-container grid-list-md>
            <v-layout wrap>
                <h1 v-text="$t('register.title')" id="register-title">Registration</h1>

                <v-flex xs12>
                    <v-alert type="success" :value="success" v-html="$t('register.messages.success')">
                        <strong>Registration saved!</strong> Please check your email for confirmation.
                    </v-alert>
                    <v-alert type="error" :value="error" v-html="$t('password.messages.error')">
                        <strong>An error has occurred!</strong> The password could not be changed.
                    </v-alert>
                    <v-alert type="error" :value="error" v-html="$t('register.messages.error.fail')">
                        <strong>Registration failed!</strong> Please try again later.
                    </v-alert>
                    <v-alert type="error" :value="errorUserExists" v-html="$t('register.messages.error.userexists')">
                        <strong>Login name already registered!</strong> Please choose another one.
                    </v-alert>
                    <v-alert type="error" :value="errorEmailExists" v-html="$t('register.messages.error.emailexists')">
                        <strong>Email is already in use!</strong> Please choose another one.
                    </v-alert>
                    <v-alert type="error" :value="doNotMatch" v-text="$t('global.messages.error.dontmatch')">
                        The password and its confirmation do not match!
                    </v-alert>
                </v-flex>

                <v-flex xs12>
                    <v-text-field v-model="registerAccount.login" @input="$v.registerAccount.login.$touch()" :label="$t('global.form[\'username.label\']')" 
                        :error-messages="validationMessages('registerAccount.login', 'register.messages.validate.login.{constraintTypeToLower}')" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="registerAccount.email" @input="$v.registerAccount.email.$touch()" :label="$t('global.form[\'email.label\']')" 
                        :error-messages="validationMessages('registerAccount.email', 'global.messages.validate.email.{constraintTypeToLower}')" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field type="password" v-model="registerAccount.password" @input="$v.registerAccount.password.$touch()" :label="$t('global.form[\'newpassword.label\']')" 
                        :error-messages="validationMessages('registerAccount.password', 'global.messages.validate.newpassword.{constraintTypeToLower}')" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field type="password" v-model="confirmPassword" @input="$v.confirmPassword.$touch()" :label="$t('global.form[\'confirmpassword.label\']')" 
                        :error-messages="validationMessages('confirmPassword', 'global.messages.validate.confirmpassword.{constraintTypeToLower}')" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-btn color="orange darken-2" dark @click.prevent="$router.go(-1)">
                        <v-icon dark left>arrow_back</v-icon><span v-text="$t('entity.action.cancel')">Cancel</span>
                    </v-btn>
                    <v-btn color="primary" dark @click.prevent="register()" :disabled="$v.registerAccount.$invalid || $v.confirmPassword.$invalid">
                        <span v-text="$t('register.form.button')">Register</span>
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

<script lang='ts' src='./register.component.ts'>
</script>

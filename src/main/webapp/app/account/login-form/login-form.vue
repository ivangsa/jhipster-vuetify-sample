<template>
<v-dialog v-model="showLoginForm" persistent max-width="450">
    <v-card>
        <v-card-title>
            <v-card-text><span v-text="$t('global.menu.account.login')">Sign in</span></v-card-text>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
            <v-layout wrap>
                <v-alert :value="authenticationError" type="error" v-html="$t('login.messages.error.authentication')">
                    <strong>Failed to sign in!</strong> Please check your credentials and try again.
                </v-alert>
                <v-flex xs12>
                    <v-text-field v-model="login" :label="$t('global.form.username')" 
                        :error-messages="validationMessages('login')"
                        @input="$v.login.$touch()"
                        @blur="$v.login.$touch()"
                        required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="password" 
                        :type="showPassword ? 'text' : 'password'" 
                        :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                        @click:append="showPassword = !showPassword"
                        :error-messages="validationMessages('password')"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                        :label="$t('login.form.password')" 
                        required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-checkbox v-model="rememberMe" :label="$t('login.form.rememberme')" checked>Remember me</v-checkbox>
                </v-flex>
                <v-flex xs12>
                    <v-btn @click="close()" dark>
                        <v-icon dark left>remove_circle</v-icon>
                        <span v-text="$t('entity.action.cancel')">Cancel</span>
                    </v-btn>
                    <v-btn color="primary" dark @click="doLogin()">
                        <span v-text="$t('login.form.button')"> Sign in</span>
                        <v-icon dark right>check_circle</v-icon>
                    </v-btn>
                </v-flex>
                <p>&nbsp;</p>
                <v-flex xs12>
                    <div>
                        <a :href="'#/resetPassword'" @click="close(); $router.push({name: 'ResetPassword'})" class="alert-link" v-text="$t('login.password.forgot')">Did you forget your password ?</a>
                    </div>
                    <div>
                        You don't have an account yet ?
                        <a :href="'#/register'" @click="close(); $router.push({name: 'Register'})" class="alert-link" v-text="$t('global.messages.info.register.link')">Register a new account</a>
                    </div>
                </v-flex>
            </v-layout>
            </v-container>
        </v-card-text>
    </v-card>
</v-dialog>
</template>
<script lang="ts" src="./login-form.component.ts">
</script>

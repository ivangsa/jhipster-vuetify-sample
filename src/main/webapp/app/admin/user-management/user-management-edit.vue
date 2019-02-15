<template>
<div>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" v-if="userAccount">
                <h2 id="myUserLabel" v-text="$t('userManagement.home.createOrEditLabel')">
                    Create or edit a User
                </h2>
                <div>
                    <div class="form-group" :hidden="!userAccount.id">
                        <label v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" name="id"
                               v-model="userAccount.id" readonly>
                    </div>

                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('userManagement.login')">Login</label>
                        <input type="text" class="form-control" name="login"
                               :class="{'valid': !$v.userAccount.login.$invalid, 'invalid': $v.userAccount.login.$invalid }"
                               v-model="$v.userAccount.login.$model" required minlength="1" maxlength="50">

                        <div v-if="$v.userAccount.login.$anyDirty && $v.userAccount.login.$invalid">
                            <small class="form-text text-danger"
                                   v-if="!$v.userAccount.login.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>

                            <small class="form-text text-danger"
                                   v-if="!$v.userAccount.login.maxLength" v-text="$t('entity.validation.maxlength')">
                                This field cannot be longer than 50 characters.
                            </small>

                            <small class="form-text text-danger"
                                   v-if="!$v.userAccount.login.pattern" v-text="$t('entity.validation.patternLogin')">
                                This field can only contain letters, digits and e-mail addresses.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="firstName" v-text="$t('userManagement.firstName')">First Name</label>
                        <input type="text" class="form-control" id="firstName" name="firstName" v-bind:placeholder="$t('settings.form[\'firstname.placeholder\']')"
                               :class="{'valid': !$v.userAccount.firstName.$invalid, 'invalid': $v.userAccount.firstName.$invalid }"
                               v-model="$v.userAccount.firstName.$model" maxlength=50>
                        <div v-if="$v.userAccount.firstName.$anyDirty && $v.userAccount.firstName.$invalid">
                            <small class="form-text text-danger"
                                   v-if="!$v.userAccount.firstName.maxLength" v-text="$t('entity.validation.maxlength')">
                                Your first name cannot be longer than 50 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="lastName" v-text="$t('userManagement.lastName')">Last Name</label>
                        <input type="text" class="form-control" id="lastName" name="lastName" v-bind:placeholder="$t('settings.form[\'lastname.placeholder\']')"
                               :class="{'valid': !$v.userAccount.lastName.$invalid, 'invalid': $v.userAccount.lastName.$invalid }"
                               v-model="$v.userAccount.lastName.$model" maxlength=50>
                        <div v-if="$v.userAccount.lastName.$anyDirty && $v.userAccount.lastName.$invalid">
                            <small class="form-text text-danger"
                                   v-if="!$v.userAccount.lastName.maxLength" v-text="$t('entity.validation.maxlength')">
                                Your last name cannot be longer than 50 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="email" v-text="$t('userManagement.email')">Email</label>
                        <input type="email" class="form-control" id="email" name="email" v-bind:placeholder="$t('global.form[\'email.placeholder\']')"
                               :class="{'valid': !$v.userAccount.email.$invalid, 'invalid': $v.userAccount.email.$invalid }"
                               v-model="$v.userAccount.email.$model" minlength="5" maxlength="254" email required>
                        <div v-if="$v.userAccount.email.$anyDirty && $v.userAccount.email.$invalid">
                            <small class="form-text text-danger" v-if="!$v.userAccount.email.required"
                                   v-text="$t('global.messages.validate.email.required')">
                                Your email is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.userAccount.email.email"
                                   v-text="$t('global.messages.validate.email.invalid')">
                                Your email is invalid.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.userAccount.email.minLength"
                                   v-text="$t('global.messages.validate.email.minlength')">
                                Your email is required to be at least 5 characters.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.userAccount.email.maxLength"
                                   v-text="$t('global.messages.validate.email.maxlength')">
                                Your email cannot be longer than 100 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-check">
                        <label class="form-check-label" for="activated">
                            <input class="form-check-input" :disabled="userAccount.id === null" type="checkbox" id="activated" name="activated" v-model="userAccount.activated">
                            <span v-text="$t('userManagement.activated')">Activated</span>
                        </label>
                    </div>

                    <div class="form-group" v-if="languages && Object.keys(languages).length > 0">
                        <label for="langKey" v-text="$t('userManagement.langKey')">Language</label>
                        <select class="form-control" id="langKey" name="langKey" v-model="userAccount.langKey">
                            <option v-for="(language, key) in languages" :value="key">{{language.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label v-text="$t('userManagement.profiles')">Profiles</label>
                        <select class="form-control" multiple name="authority" v-model="userAccount.authorities">
                            <option v-for="authority of authorities" :value="authority">{{authority}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span
                            v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" :disabled="$v.userAccount.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>

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
                    <v-text-field v-model="userAccount.email" @input="$v.userAccount.email.$touch()" :label="$t('global.form.email')" 
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
</div>
</template>

<script lang="ts" src="./user-management-edit.component.ts">
</script>

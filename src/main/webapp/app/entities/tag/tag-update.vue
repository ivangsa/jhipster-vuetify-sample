<template>
  <v-layout row xs12 wrap>
    <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
      <v-card class="ma-4">
        <v-card-title primary-title>
            <v-container grid-list-md>
            <v-layout wrap>
                <h2 id="jhipsterApp.tag.home.createOrEditLabel" v-text="$t('jhipsterApp.tag.home.createOrEditLabel')">Create or edit a Tag</h2>
                <v-flex xs12 v-if="tag.id">
                    <v-text-field v-model="tag.id" :label="$t('global.field.id')" readonly></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="tag.name" @input="$v.tag.name.$touch()" :label="$t('jhipsterApp.tag.name')" :error-messages="validationMessages('tag.name')" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-btn color="orange darken-2" dark @click.prevent="previousState()">
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
<script lang="ts" src="./tag-update.component.ts">
</script>

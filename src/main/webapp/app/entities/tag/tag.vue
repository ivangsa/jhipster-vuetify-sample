<template>
<div>
  <h2 id="page-heading">
      <span v-text="$t('jhipsterApp.tag.home.title')" id="tag-heading">Tags</span>
  </h2>
  <b-alert :value="dismissCountDown"
      dismissible
      :type="alertType"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged">
      {{alertMessage}}
  </b-alert>    
  

  <v-data-table :items="orderBy(tags, propOrder, reverse === true ? 1 : -1)" :total-items="totalItems" :pagination.sync="pagination" class="elevation-1">
    <template slot="headers" slot-scope="props">
        <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
        <th v-on:click="changeOrder('name')"><span v-text="$t('jhipsterApp.tag.name')">Name</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
        <th></th>
    </template>  
    <template slot="items" slot-scope="props">
      <td><router-link :to="{name: 'TagView', params: {tagId: props.item.id}}">{{props.item.id}}</router-link></td>
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">
          <v-icon small color="indigo" @click="$router.push({name: 'TagView', params: {tagId: props.item.id}})">visibility</v-icon>            
          <v-icon small color="green" @click="$router.push({name: 'TagEdit', params: {tagId: props.item.id}})">edit</v-icon>            
          <v-icon small color="red" @click="prepareRemove(props.item)">delete</v-icon>            
      </td>
    </template>
  </v-data-table>

  <v-btn color="pink" dark bottom right fab @click="$router.push({name: 'TagCreate'})" >
    <v-icon>add</v-icon>
  </v-btn>  

  <v-dialog v-model="removeId" max-width="400">
      <v-card>
          <v-card-title>
              <v-card-text><span id="jhipsterApp.tag.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></v-card-text>
          </v-card-title>
          <v-card-text>
              <p id="jhi-delete-tag-heading" v-bind:title="$t('jhipsterApp.tag.delete.question')">Are you sure you want to delete this Tag?</p>            
          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green" dark @click.prevent="closeDialog()">
                  <v-icon dark left>arrow_back</v-icon><span v-text="$t('entity.action.cancel')">Cancel</span>
              </v-btn>
              <v-btn color="red darken-2" dark @click.prevent="removeTag()">
                  <v-icon dark left>delete</v-icon>
                  <span v-text="$t('entity.action.delete')">Delete</span>
              </v-btn>            
          </v-card-actions>
      </v-card>
  </v-dialog>

</div>
</template>

<script lang="ts" src="./tag.component.ts">
</script>

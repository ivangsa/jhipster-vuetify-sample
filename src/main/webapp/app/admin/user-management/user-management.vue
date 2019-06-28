<template>
<div>
  <h2 id="page-heading">
      <span id="user-management-page-heading" v-text="$t('userManagement.home.title')">Users</span>
  </h2>

  <v-data-table :items="orderBy(users, propOrder, reverse === true ? 1 : -1)" :server-items-length="totalItems" :options.sync="pagination" class="elevation-1">
    <template v-slot:header="{props}">
        <tr>
        <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
        <th v-on:click="changeOrder('login')"><span v-text="$t('userManagement.login')">Login</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
        <th v-on:click="changeOrder('email')"><span v-text="$t('userManagement.email')">Email</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
        <th></th>
            <th v-on:click="changeOrder('langKey')"> <span v-text="$t('userManagement.langKey')">Lang Key</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
        <th><span v-text="$t('userManagement.profiles')">Profiles</span></th>
        <th v-on:click="changeOrder('createdDate')"><span v-text="$t('userManagement.createdDate')">Created Date</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
        <th v-on:click="changeOrder('lastModifiedBy')"><span v-text="$t('userManagement.lastModifiedBy')">Last Modified By</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
        <th id="modified-date-sort" v-on:click="changeOrder('lastModifiedDate')"><span v-text="$t('userManagement.lastModifiedDate')">Last Modified Date</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
        <th></th>
        </tr>
    </template>  
    <template v-slot:item="{item}">
        <tr>
        <td><router-link tag="a" :to="{name: 'JhiUserView', params: {userId: item.login}}">{{item.id}}</router-link></td>
        <td>{{item.login}}</td>
        <td>{{item.email}}</td>
        <td>
            <button class="btn btn-danger btn-sm" v-on:click="setActive(user, true)" v-if="!item.activated"
                    v-text="$t('userManagement.deactivated')">Deactivated</button>
            <button class="btn btn-success btn-sm" v-on:click="setActive(user, false)" v-if="item.activated"
                    :disabled="username === item.login" v-text="$t('userManagement.activated')">Activated</button>
        </td>
        <td>{{item.langKey}}</td>
        <td>
            <div v-for="authority of item.authorities" :key="authority">
                <span class="badge badge-info">{{ authority }}</span>
            </div>
        </td>
        <td>{{item.createdDate | formatDate}}</td>
        <td>{{item.lastModifiedBy}}</td>
        <td>{{item.lastModifiedDate | formatDate}}</td>
        <td class="text-right">
          <v-icon small color="indigo" @click="$router.push({name: 'JhiUserView', params: {userId: item.login}})">visibility</v-icon>        
          <v-icon small color="green" @click="$router.push({name: 'JhiUserEdit', params: {userId: item.login}})">edit</v-icon>     
          <v-icon small color="red" @click="prepareRemove(item)" :disabled="username === item.login">delete</v-icon>
        </td>
        </tr>
    </template>
  </v-data-table>

  <v-btn color="pink" dark bottom right fab @click="$router.push({name: 'JhiUserCreate'})" >
    <v-icon>add</v-icon>
  </v-btn>  

  <v-dialog v-model="removeId" max-width="400">
      <v-card>
          <v-card-title>
              <v-card-text><span id="jhipsterApp.post.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></v-card-text>
          </v-card-title>
          <v-card-text>
              <p id="jhi-delete-user-heading" v-text="$t('userManagement.delete.question', { 'login': removeId})">Are you sure you want to delete this user?</p>            
          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green" dark @click.prevent="removeId = null">
                  <v-icon left>arrow_back</v-icon><span v-text="$t('entity.action.cancel')">Cancel</span>
              </v-btn>
              <v-btn color="red darken-2" dark @click.prevent="deleteUser()">
                  <v-icon left>delete</v-icon>
                  <span v-text="$t('entity.action.delete')">Delete</span>
              </v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
</div>
</template>

<script lang="ts" src="./user-management.component.ts">
</script>

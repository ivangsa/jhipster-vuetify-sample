<template>
<div>
  <v-navigation-drawer
    v-model="isNavbarCollapsed"
    clipped
    fixed
    overflow
    app
  >
    <v-list dense>
      <v-list-item @click="$router.push({name: 'Home'})">
        <v-list-item-action>
          <v-icon>home</v-icon>
        </v-list-item-action>
        <v-list-item-title>
          <span v-text="$t('global.menu.home')">Home</span>
        </v-list-item-title>
      </v-list-item>

      <v-list-group :value="false" v-if="authenticated">
        <template v-slot:activator>
          <v-list-item-action><v-icon>view_list</v-icon></v-list-item-action>
          <v-list-item-title v-text="$t('global.menu.entities.main')">Entities</v-list-item-title>
        </template>

        <v-list-item @click="$router.push({name: 'Post'})">
          <v-list-item-action><v-icon>navigate_next</v-icon></v-list-item-action>
          <v-list-item-title v-text="$t('global.menu.entities.post')">Post</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push({name: 'Tag'})">
          <v-list-item-action><v-icon>navigate_next</v-icon></v-list-item-action>
          <v-list-item-title v-text="$t('global.menu.entities.tag')">Tag</v-list-item-title>
        </v-list-item>
        <!-- jhipster-needle-add-element-to-menu - JHipster will add new menu items here -->        
      </v-list-group>

      <v-list-group :value="false" v-if="hasAnyAuthority('ROLE_ADMIN')">
        <template v-slot:activator>
            <v-list-item-action><font-awesome-icon icon="user-plus" /></v-list-item-action>
            <v-list-item-title v-text="$t('global.menu.admin.main')">Administration</v-list-item-title>
        </template>

        <v-list-item @click="$router.push({name: 'JhiUser'})">
          <v-list-item-action><font-awesome-icon icon="user" /></v-list-item-action>
          <v-list-item-title v-text="$t('global.menu.admin.userManagement')">User management</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push({name: 'JhiMetricsComponent'})">
          <v-list-item-action><font-awesome-icon icon="tachometer-alt" /></v-list-item-action>
          <v-list-item-title v-text="$t('global.menu.admin.metrics')">Metrics</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push({name: 'JhiHealthComponent'})">
          <v-list-item-action><font-awesome-icon icon="heart" /></v-list-item-action>
          <v-list-item-title v-text="$t('global.menu.admin.health')">Health</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push({name: 'JhiConfigurationComponent'})">
          <v-list-item-action><font-awesome-icon icon="list" /></v-list-item-action>
          <v-list-item-title v-text="$t('global.menu.admin.configuration')">Configuration</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push({name: 'JhiAuditsComponent'})">
          <v-list-item-action><font-awesome-icon icon="bell" /></v-list-item-action>
          <v-list-item-title v-text="$t('global.menu.admin.audits')">Audits</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push({name: 'JhiLogsComponent'})">
          <v-list-item-action><font-awesome-icon icon="tasks" /></v-list-item-action>
          <v-list-item-title v-text="$t('global.menu.admin.logs')">Logs</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="swaggerEnabled" @click="$router.push({name: 'JhiDocsComponent'})">
          <v-list-item-action><font-awesome-icon icon="book" /></v-list-item-action>
          <v-list-item-title v-text="$t('global.menu.admin.apidocs')">API</v-list-item-title>
        </v-list-item>
      </v-list-group>


      <v-list-group
        :value="false"
        id="languagesnavBarDropdown"
        v-if="languages && Object.keys(languages).length > 1"
      >
        <template v-slot:activator>
          <v-list-item-action>
            <font-awesome-icon icon="flag"/>
          </v-list-item-action>
          <v-list-item-title>
            <span v-text="$t('global.menu.language')">Language</span>
          </v-list-item-title>
        </template>
        <v-list-item
          v-for="(value, key) in languages"
          :key="`lang-${key}`"
          @click="changeLanguage(key)"
          :class="{ active: isActiveLanguage(key)}"
        >
          <v-list-item-action>
            <v-icon>sign-in-alt</v-icon>
          </v-list-item-action>
          <v-list-item-title>{{value.name}}</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group :value="false" v-if="authenticated">
        <template v-slot:activator>
          <v-list-item-action>
            <v-icon>contacts</v-icon>
          </v-list-item-action>
          <v-list-item-title>
            <span v-text="$t('global.menu.account.main')">Account</span>
          </v-list-item-title>
        </template>

        <v-list-item @click="$router.push('/account/settings')">
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-title>
            <span v-text="$t('global.menu.account.settings')">Settings</span>
          </v-list-item-title>
        </v-list-item>

        <v-list-item @click="$router.push('/account/password')">
          <v-list-item-action>
            <v-icon>keyboard</v-icon>
          </v-list-item-action>
          <v-list-item-title>
            <span v-text="$t('global.menu.account.password')">password</span>
          </v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-item v-if="!authenticated" @click="openLogin()">
        <v-list-item-action><v-icon>exit_to_app</v-icon></v-list-item-action>
        <v-list-item-title>
          <span v-text="$t('global.menu.account.login')">Sign in</span>
        </v-list-item-title>
      </v-list-item>
      <v-list-item v-if="authenticated" @click="logout()">
        <v-list-item-action><v-icon>power_settings_new</v-icon></v-list-item-action>
        <v-list-item-title>
          <span v-text="$t('global.menu.account.logout')">Sign out</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar color="indigo" dark fixed app>
      <v-app-bar-nav-icon @click.stop="toogleDrawer()"></v-app-bar-nav-icon>
      <v-toolbar-title><span v-text="$t('global.title')" class="navbar-title">jhipster</span></v-toolbar-title>
  </v-app-bar>            
</div>
</template>

<script lang="ts" src="./jhi-navbar.component.ts">
</script>

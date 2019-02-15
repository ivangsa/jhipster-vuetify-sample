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
      <v-list-tile @click="$router.push({name: 'Home'})">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>
          <span v-text="$t('global.menu.home')">Home</span>
        </v-list-tile-title>
      </v-list-tile>

      <v-list-group :value="false" v-if="authenticated">
        <v-list-tile slot="activator">
          <v-list-tile-action><v-icon>view_list</v-icon></v-list-tile-action>
          <v-list-tile-title v-text="$t('global.menu.entities.main')">Entities</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="$router.push({name: 'Post'})">
          <v-list-tile-action><font-awesome-icon icon="asterisk" /></v-list-tile-action>
          <v-list-tile-title v-text="$t('global.menu.entities.post')">Post</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="$router.push({name: 'Tag'})">
          <v-list-tile-action><font-awesome-icon icon="asterisk" /></v-list-tile-action>
          <v-list-tile-title v-text="$t('global.menu.entities.tag')">Tag</v-list-tile-title>
        </v-list-tile>
        <!-- jhipster-needle-add-element-to-menu - JHipster will add new menu items here -->        
      </v-list-group>

      <v-list-group :value="false" v-if="hasAnyAuthority('ROLE_ADMIN')">
        <v-list-tile slot="activator">
          <v-list-tile-action><font-awesome-icon icon="user-plus" /></v-list-tile-action>
          <v-list-tile-title v-text="$t('global.menu.admin.main')">Administration</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="$router.push({name: 'JhiUser'})">
          <v-list-tile-action><font-awesome-icon icon="user" /></v-list-tile-action>
          <v-list-tile-title v-text="$t('global.menu.admin.userManagement')">User management</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="$router.push({name: 'JhiMetricsComponent'})">
          <v-list-tile-action><font-awesome-icon icon="tachometer-alt" /></v-list-tile-action>
          <v-list-tile-title v-text="$t('global.menu.admin.metrics')">Metrics</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="$router.push({name: 'JhiHealthComponent'})">
          <v-list-tile-action><font-awesome-icon icon="heart" /></v-list-tile-action>
          <v-list-tile-title v-text="$t('global.menu.admin.health')">Health</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="$router.push({name: 'JhiConfigurationComponent'})">
          <v-list-tile-action><font-awesome-icon icon="list" /></v-list-tile-action>
          <v-list-tile-title v-text="$t('global.menu.admin.configuration')">Configuration</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="$router.push({name: 'JhiAuditsComponent'})">
          <v-list-tile-action><font-awesome-icon icon="bell" /></v-list-tile-action>
          <v-list-tile-title v-text="$t('global.menu.admin.audits')">Audits</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="$router.push({name: 'JhiLogsComponent'})">
          <v-list-tile-action><font-awesome-icon icon="tasks" /></v-list-tile-action>
          <v-list-tile-title v-text="$t('global.menu.admin.logs')">Logs</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="swaggerEnabled" @click="$router.push({name: 'JhiDocsComponent'})">
          <v-list-tile-action><font-awesome-icon icon="book" /></v-list-tile-action>
          <v-list-tile-title v-text="$t('global.menu.admin.apidocs')">API</v-list-tile-title>
        </v-list-tile>
      </v-list-group>

      <v-list-group
        :value="false"
        id="languagesnavBarDropdown"
        v-if="languages && Object.keys(languages).length > 1"
      >
        <v-list-tile slot="activator">
          <v-list-tile-action>
            <font-awesome-icon icon="flag"/>
          </v-list-tile-action>
          <v-list-tile-title>
            <span v-text="$t('global.menu.language')">Language</span>
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-for="(value, key) in languages"
          :key="`lang-${key}`"
          @click="changeLanguage(key)"
          :class="{ active: isActiveLanguage(key)}"
        >
          <v-list-tile-action>
            <v-icon>sign-in-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{value.name}}</v-list-tile-title>
        </v-list-tile>
      </v-list-group>

      <v-list-group :value="false" v-if="authenticated">
        <v-list-tile slot="activator">
          <v-list-tile-action>
            <v-icon>contacts</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            <span v-text="$t('global.menu.account.main')">Account</span>
          </v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="$router.push('/account/settings')">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            <span v-text="$t('global.menu.account.settings')">Settings</span>
          </v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="$router.push('/account/password')">
          <v-list-tile-action>
            <v-icon>keyboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            <span v-text="$t('global.menu.account.password')">password</span>
          </v-list-tile-title>
        </v-list-tile>
      </v-list-group>

      <v-list-tile v-if="authenticated" @click="logout()">
        <v-list-tile-action><v-icon>power_settings_new</v-icon></v-list-tile-action>
        <v-list-tile-title>
          <span v-text="$t('global.menu.account.logout')">Sign out</span>
        </v-list-tile-title>
      </v-list-tile>
      <v-list-tile v-if="!authenticated" @click="$router.push({name: 'Register'})">
        <v-list-tile-action><font-awesome-icon icon="user-plus" /></v-list-tile-action>
        <v-list-tile-title>
          <span v-text="$t('global.menu.account.register')">Register</span>
        </v-list-tile-title>
      </v-list-tile>
      <v-list-tile v-if="!authenticated" @click="openLogin()">
        <v-list-tile-action><v-icon>exit_to_app</v-icon></v-list-tile-action>
        <v-list-tile-title>
          <span v-text="$t('global.menu.account.login')">Sign in</span>
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

  <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="toogleDrawer()"></v-toolbar-side-icon>
      <v-toolbar-title><span v-text="$t('global.title')" class="navbar-title">jhipster</span></v-toolbar-title>
  </v-toolbar>            
</div>
</template>

<script lang="ts" src="./jhi-navbar.component.ts">
</script>

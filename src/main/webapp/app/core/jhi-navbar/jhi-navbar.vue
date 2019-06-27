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
        <v-list-item slot="activator">
          <v-list-item-action><v-icon>view_list</v-icon></v-list-item-action>
          <v-list-item-title v-text="$t('global.menu.entities.main')">Entities</v-list-item-title>
        </v-list-item>

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

      <v-list-group
        :value="false"
        id="languagesnavBarDropdown"
        v-if="languages && Object.keys(languages).length > 1"
      >
        <v-list-item slot="activator">
          <v-list-item-action>
            <font-awesome-icon icon="flag"/>
          </v-list-item-action>
          <v-list-item-title>
            <span v-text="$t('global.menu.language')">Language</span>
          </v-list-item-title>
        </v-list-item>
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
        <v-list-item slot="activator">
          <v-list-item-action>
            <v-icon>contacts</v-icon>
          </v-list-item-action>
          <v-list-item-title>
            <span v-text="$t('global.menu.account.main')">Account</span>
          </v-list-item-title>
        </v-list-item>

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

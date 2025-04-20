<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="fa-solid fa-bars"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="items-center" @click="$router.push('/')" style="cursor: pointer">
          <q-avatar>
            <img src="~assets\logo-title.png">
          </q-avatar>
          Quién Falto
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <q-btn
          flat
          rounded
          icon-right="fa-solid fa-user" 
          label="Felipe" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="drawer"
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <q-item clickable v-for="link in menu" :key="link.title" :to="link.to">
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              {{ link.title }}
            </q-item-section>
          </q-item>
        </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { opcionesMenuPrincipal } from 'src/components/models';

const menu = ref<opcionesMenuPrincipal[]>([
  {
    title: 'Alumnos',
    /* caption: 'quasar.dev', */
    icon: 'fa-solid fa-users',
    to: '/alumnos' // Assuming this is a route
  },
  {
    title: 'Profesores',
    /* caption: 'quasar.dev', */
    icon: 'fa-solid fa-person-chalkboard',
    to: 'https://quasar.dev'
  },
  {
    title: 'Reportes',
    /* caption: 'quasar.dev', */
    icon: 'fa-solid fa-file',
    to: 'https://quasar.dev'
  },
  {
    title: 'Configuracion',
    /* caption: 'quasar.dev', */
    icon: 'fa-solid fa-solid fa-screwdriver-wrench', // <i class="fa-solid fa-screwdriver-wrench
    to: 'https://quasar.dev'
  },
  {
    title: 'Docs',
    /* caption: 'quasar.dev', */
    icon: 'fa-solid fa-school',
    to: 'https://quasar.dev'
  },
  {
    title: 'Github',
    /* caption: 'github.com/Felipe-258', */
    icon: 'fa-brands fa-github',
    to: 'https://github.com/Felipe-258'
  },  
  {
    title: 'Salir',
    icon: 'fa-solid fa-right-from-bracket',
    to: '/login'
  }
])

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
<style>
.drawer {
  background: var(--q-primary) !important;
  color: wheat;
}
.q-layout__shadow::after {
  box-shadow: none;
}
.q-item.q-router-link--active, .q-item--active {
  color: var(--q-secondary);
}
</style>
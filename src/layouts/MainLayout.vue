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

        <q-toolbar-title class="items-center">
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

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

const linksList: EssentialLinkProps[] = [
  {
    title: 'Alumnos',
    /* caption: 'quasar.dev', */
    icon: 'fa-solid fa-users',
    link: 'https://quasar.dev'
  },
  {
    title: 'Profesores',
    /* caption: 'quasar.dev', */
    icon: 'fa-solid fa-person-chalkboard', // <i class="fa-solid fa-person-chalkboard
    link: 'https://quasar.dev'
  },
  {
    title: 'Reportes',
    /* caption: 'quasar.dev', */
    icon: 'fa-solid fa-file', // <i class="fa-solid fa-person-chalkboard
    link: 'https://quasar.dev'
  },
  {
    title: 'Configuracion',
    /* caption: 'quasar.dev', */
    icon: 'fa-solid fa-solid fa-screwdriver-wrench', // <i class="fa-solid fa-screwdriver-wrench
    link: 'https://quasar.dev'
  },
  {
    title: 'Docs',
    /* caption: 'quasar.dev', */
    icon: 'fa-solid fa-school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    /* caption: 'github.com/Felipe-258', */
    icon: 'fa-brands fa-github',
    link: 'https://github.com/Felipe-258'
  }
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
<style>
.drawer {
  background: #121a21 !important;
  color: wheat;
}
.q-layout__shadow::after {
  box-shadow: none;
}
</style>
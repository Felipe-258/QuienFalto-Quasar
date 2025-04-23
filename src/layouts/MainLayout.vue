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

        <q-item
          v-for="link in menu"
          :key="link.title"
          :tag="link.href ? 'a' : 'router-link'"
          :href="link.href"
          :to="link.to"
          clickable
          dense
          rel="noopener"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>

          <!-- Modifica la sección del título y caption dentro del q-item -->
          <q-item-section>
            <div class="title-container">
              <div  :class="link.caption !== undefined ? 'menu-title' : 'no-cap' ">{{ link.title }}</div>
              <div
                v-if="link.caption"
                :class="link.caption !== null ? 'menu-caption' : '' "
              >
                {{ link.caption }}
              </div>
            </div>
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
    caption: 'Registra Asistencia y Agrega Alumnos',
    icon: 'fa-solid fa-users',
    to: '/alumnos' // Assuming this is a route
  },
  {
    title: 'Profesores',
    caption: 'Ver y Agregar Profesores',
    icon: 'fa-solid fa-person-chalkboard',
    to: '/profesores'
  },
  {
    title: 'Reportes',
    caption: 'Crear Informes especificos',
    icon: 'fa-solid fa-file',
    to: 'https://quasar.dev'
  },
  {
    title: 'Configuracion',
    caption: 'Cambie clases totales, Notas de promocion, entre otros',
    icon: 'fa-solid fa-solid fa-screwdriver-wrench',
    to: 'https://quasar.dev'
  },
  {
    title: 'Docs',
    caption: 'Documentacion',
    icon: 'fa-solid fa-school',
    href: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/Felipe-258',
    icon: 'fa-brands fa-github',
    href: 'https://github.com/Felipe-258'
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
/* Añade estos estilos */
.title-container {
  position: relative;
  height: 40px; /* Altura fija para contener ambos elementos */
  display: flex;
  flex-direction: column;
}

.menu-title {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}

.menu-caption {
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.75em;
  position: absolute;
  width: 100%;
  top: calc(100% - 17px); /* Posición inicial debajo del título */
}

.q-item:hover .menu-title {
  transform: translateY(-85%);
}

.q-item:hover .menu-caption {
  opacity: 1;
  transform: translateY(0);
}

.title-container {
  overflow: hidden;
}

.menu-caption {
  color: rgba(255, 255, 255, 0.7); /* Color sutil para el caption */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); /* Mejor legibilidad */
}

.q-item {
  transition: background 0.3s;
}

.q-item:hover {
  background: linear-gradient(90deg, transparent 90%, rgba(255,255,255,0.05)); /* Efecto de resaltado sutil */
}

.no-cap {
  padding: 9px 0px;
  transform: none !important;
  position: static;
}
</style>

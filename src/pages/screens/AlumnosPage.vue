<template>
  <q-page padding>
    <q-table
      :columns="columns"
      :rows="alumnos"
      row-key="id"
      flat
      bordered
      rounded
      dense
      :filter="filter"
      :filter-method="filtroPersonalizado"
    >
      <!-- Slot personalizado para el encabezado -->
      <template v-slot:top>
        <div class="row items-center full-width q-gutter-sm">
          <!-- Título a la izquierda -->
          <div class="col-auto text-h6">Alumnos</div>
          
          <!-- Barra de búsqueda centrada -->
          <div class="col">
            <q-input
              v-model="filter"
              placeholder="Buscar Alumno"
              dense
              outlined
              class="q-mx-auto"
              style="max-width: 300px;"
            />
          </div>
          
          <!-- Botón a la derecha -->
          <div class="col-auto">
            <q-btn
              icon-right="fa-solid fa-plus"
              color="primary"
              label="Agregar Alumno"
              @click="dialog = true"
            />
          </div>
        </div>
      </template>

      <!-- Resto de tu template... -->
      <template v-slot:body="alumnos">
        <q-tr :alumnos="alumnos">
          <q-td key="seleccionar" :alumnos="alumnos">
            <q-checkbox v-model="alumnos.row.check"/>
          </q-td>
          <q-td style="text-align: right;">{{ alumnos.row.id }}</q-td>
          <q-td style="text-align: right;">{{ alumnos.row.nombre }}</q-td>
          <q-td style="text-align: right;">{{ alumnos.row.apellido }}</q-td>
          <q-td style="text-align: right;">{{ alumnos.row.grado }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
  <div v-if="dialog">
    <AlumnosDialog
    @save="save()"
    @cancel="cancel()"
    ></AlumnosDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AlumnosDialog from '../dialog/AlumnosDialog.vue';
const dialog = ref<boolean>(false)
const filter = ref<string>('')

interface Alumno {
  check: boolean;
  id: number;
  nombre: string;
  apellido: string;
  grado: string;
}

const columns = [
  { name: '', label: '', field: 'check', sortable: false, style: 'max-width: 10px !important; min-width: 10px !important;'},
  { name: 'id', label: 'ID', field: 'id', sortable: true },
  { name: 'nombre', label: 'Nombre', field: 'nombre', sortable: true },
  { name: 'apellido', label: 'Apellido', field: 'apellido', sortable: true },
  { name: 'grado', label: 'Grado', field: 'grado', sortable: true },
];

const alumnos = ref<Alumno[]>([
  { check: false, id: 1, nombre: 'Juan', apellido: 'Pérez', grado: '5to' },
  { check: false, id: 2, nombre: 'María', apellido: 'Gómez', grado: '6to' },
  { check: false, id: 3, nombre: 'Carlos', apellido: 'López', grado: '5to' },
]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filtroPersonalizado (rows: any, filterTerm: string) {
  const textoNormalizado = (text: string) =>
    text.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos
      .toLowerCase()

  const busqueda = textoNormalizado(filterTerm)

  return rows.filter((row: { nombre: string; apellido: string; }) => {
    const nombre = textoNormalizado(row.nombre)
    const apellido = textoNormalizado(row.apellido)

    return nombre.includes(busqueda) || apellido.includes(busqueda)
  })
}

function save () {
  dialog.value = false;
}

function cancel () {
  dialog.value = false;
}
</script>

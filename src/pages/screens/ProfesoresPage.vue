<template>
  <q-page padding>
    <q-table
      :columns="columns"
      :rows="profesores"
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
          <div class="col-auto text-h6">Profesores</div>

          <!-- Barra de búsqueda centrada -->
          <div class="col">
            <q-input
              v-model="filter"
              placeholder="Buscar Profesor"
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
              label="Agregar Profesor"
              @click="dialog = true"
            />
          </div>
        </div>
      </template>

      <!-- Resto de tu template... -->
      <template v-slot:body="profesores">
        <q-tr :profesores="profesores">
          <q-td key="seleccionar" :profesores="profesores">
            <q-checkbox v-model="profesores.row.check"/>
          </q-td>
          <q-td style="text-align: right;">{{ profesores.row.id }}</q-td>
          <q-td style="text-align: right;">{{ profesores.row.nombre }}</q-td>
          <q-td style="text-align: right;">{{ profesores.row.apellido }}</q-td>
          <q-td style="text-align: right;">{{ profesores.row.grado }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
  <div v-if="dialog">
    <ProfesoresDialog
    @save="save()"
    @cancel="cancel()"
    ></ProfesoresDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProfesoresDialog from '../dialog/ProfesoresDialog.vue';
import type { Profesor } from 'src/components/models';
const dialog = ref<boolean>(false)
const filter = ref<string>('')

const columns = [
  { name: 'seleccionar', label: '', field: 'check', sortable: false, style: 'max-width: 10px !important; min-width: 10px !important;'},
  { name: 'id', label: 'ID', field: 'id', sortable: true },
  { name: 'nombre', label: 'Nombre', field: 'nombre', sortable: true },
  { name: 'apellido', label: 'Apellido', field: 'apellido', sortable: true },
  { name: 'grado', label: 'Grado', field: 'grado', sortable: true },
];

const profesores = ref<Profesor[]>([
  { check: false, id: 1, nombre: 'Pedro', apellido: 'Pérez', grado: '2do' },
  { check: false, id: 2, nombre: 'Ramon', apellido: 'Fernandez', grado: '6to' },
  { check: false, id: 3, nombre: 'Carlos', apellido: 'Gonzales', grado: '5to' },
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

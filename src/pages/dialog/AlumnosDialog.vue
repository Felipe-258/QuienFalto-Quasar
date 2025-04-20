<template>
  <q-dialog v-model="model" persistent>
    <q-card style="min-width: 400px;">
      <q-card-section>
        <div class="text-h6">{{ isEdit ? 'Editar Alumno' : 'Agregar Alumno' }}</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="onSave" ref="formRef">
          <q-input
            v-model="localAlumno.nombre"
            label="Nombre"
            :rules="[val => !!val || 'Nombre es requerido']"
            autofocus
            clearable
          />
          <q-input
            v-model="localAlumno.apellido"
            label="Apellido"
            :rules="[val => !!val || 'Apellido es requerido']"
            clearable
          />
          <q-input
            v-model="localAlumno.grado"
            label="Grado"
            :rules="[val => !!val || 'Grado es requerido']"
            clearable
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" @click="onCancel" />
        <q-btn flat label="Guardar" color="primary" @click="onSave" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from 'vue';
const model = ref<boolean>(true)

interface Alumno {
  id?: number;
  nombre: string;
  apellido: string;
  grado: string;
}

const props = defineProps<{
  alumno?: Alumno;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'save', alumno: Alumno): void;
  (e: 'cancel'): void;
}>();

const localAlumno = ref<Alumno>({
  nombre: '',
  apellido: '',
  grado: '',
});

const formRef = ref();

const isEdit = ref(false);

onMounted ( () => {
  model.value = true
  console.log('abrir')
  if (props.alumno) {
        localAlumno.value = { ...props.alumno };
        isEdit.value = true;
      } else {
        localAlumno.value = { nombre: '', apellido: '', grado: '' };
        isEdit.value = false;
      }
    }
)

function onSave() {
  if (formRef.value?.validate()) {
    model.value = false
    emit('save', localAlumno.value);

  }
}

function onCancel() {
  model.value = false
  emit('cancel');
}
</script>

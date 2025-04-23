<template>
  <q-dialog v-model="model" persistent>
    <q-card style="min-width: 400px;">
      <q-card-section>
        <div class="text-h6">{{ isEdit ? 'Editar Profesor' : 'Agregar Profesor' }}</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="onSave" ref="formRef">
          <q-input
            v-model="localProfesor.nombre"
            label="Nombre"
            :rules="[val => !!val || 'Nombre es requerido']"
            autofocus
            clearable
          />
          <q-input
            v-model="localProfesor.apellido"
            label="Apellido"
            :rules="[val => !!val || 'Apellido es requerido']"
            clearable
          />
          <q-input
            v-model="localProfesor.grado"
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
import type { Profesor } from 'src/components/models';

const model = ref<boolean>(true)

const props = defineProps<{
  profesor?: Profesor;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'save', profesor: Profesor): void;
  (e: 'cancel'): void;
}>();

const localProfesor = ref<Profesor>({
  check: false,
  id: 0,
  nombre: '',
  apellido: '',
  grado: '',
});

const formRef = ref();

const isEdit = ref(false);

onMounted ( () => {
  model.value = true
  console.log('abrir')
  if (props.profesor) {
        localProfesor.value = { ...props.profesor };
        isEdit.value = true;
      } else {
        localProfesor.value = { check: false, id: 0, nombre: '', apellido: '', grado: '' };
        isEdit.value = false;
      }
    }
)

function onSave() {
  if (formRef.value?.validate()) {
    model.value = false
    emit('save', localProfesor.value);

  }
}

function onCancel() {
  model.value = false
  emit('cancel');
}
</script>

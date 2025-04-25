<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px; max-width: 90vw;">
      <q-card-section>
        <div class="text-h6 q-mb-md">Registro</div>
<q-form @submit.prevent="onSubmit" ref="formRefValue" class="q-gutter-md">
          <q-input
            filled
            v-model="firstName"
            label="Nombre"
            :rules="[val => !!val || 'El nombre es requerido']"
            lazy-rules
            autofocus
          />
          <q-input
            filled
            v-model="lastName"
            label="Apellido"
            :rules="[val => !!val || 'El apellido es requerido']"
            lazy-rules
          />
          <q-input
            filled
            v-model="email"
            label="Email"
            type="email"
            :rules="[
              val => !!val || 'El email es requerido',
              val => /.+@.+\..+/.test(val) || 'Email inválido'
            ]"
            lazy-rules
          />
          <q-input
            filled
            v-model="password"
            label="Contraseña"
            type="password"
            :rules="[
              val => !!val || 'La contraseña es requerida',
              val => val.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
              val => /[A-Z]/.test(val) || 'Debe contener al menos una letra mayúscula',
              val => /[a-z]/.test(val) || 'Debe contener al menos una letra minúscula',
              val => /[0-9]/.test(val) || 'Debe contener al menos un número',
              val => /[^A-Za-z0-9]/.test(val) || 'Debe contener al menos un carácter especial'
            ]"
            lazy-rules
            reveal-password
          />
          <div class="row items-center justify-between q-mt-md">
            <q-btn label="Registrarse" type="submit" color="primary" />
            <q-btn flat label="Ya tengo cuenta" @click="goToLogin" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const router = useRouter();
const q = useQuasar();
const firstName = ref<string>('');
const lastName = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const formRefValue = ref();

async function onSubmit () {
  const formRef = formRefValue.value;
  if (!formRef.validate()) {
    return;
  }
  // Simulate registration process
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (users.find((u: any) => u.email === email.value)) {
    q.notify({
      type: 'negative',
      message: 'El email ya está registrado'
    });
    return;
  }
  users.push({ email: email.value, password: password.value, firstName: firstName.value, lastName: lastName.value });
  localStorage.setItem('users', JSON.stringify(users));
  q.notify({
    type: 'positive',
    message: 'Registro exitoso. Por favor, inicie sesión.'
  });
  await router.push('/login');
};

const goToLogin = async () => {
  await router.push('/login');
};
</script>

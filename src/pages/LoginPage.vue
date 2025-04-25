<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px; max-width: 90vw;">
      <q-card-section>
        <div class="text-h6 q-mb-md">Iniciar Sesión</div>
        <q-form @submit.prevent="onSubmit" ref="form" class="q-gutter-md">
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
            autofocus
          />
          <q-input
            filled
            v-model="password"
            label="Contraseña"
            type="password"
            :rules="[val => !!val || 'La contraseña es requerida']"
            lazy-rules
            reveal-password
          />
          <div class="row items-center justify-between q-mt-md">
            <q-btn label="Ingresar" @click="onSubmit" color="primary" />
            <q-btn flat label="Registrarse" @click="goToRegister" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

const router = useRouter();
const email = ref<string>('')
const password = ref<string>('')

async function onSubmit () {
  // Simulate login process
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = users.find((u: any) => u.email === email.value && u.password === password.value);
  if (!user) {
    Notify.create({
      type: 'negative',
      message: 'Email o contraseña incorrectos'
    });
    return;
  }
  Notify.create({
    type: 'positive',
    message: `Bienvenido, ${user.firstName || user.email}!`
  });
  // Simulate successful login, redirect to home or dashboard
  await router.push('/');
};

const goToRegister = async () => {
  await router.push('/register');
};

</script>

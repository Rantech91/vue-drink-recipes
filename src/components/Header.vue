<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useBebidasStore } from "../stores/bebidas";
import { useNotificationStore } from "../stores/notificaciones";

const route = useRoute();
const store = useBebidasStore();
const notificaciones = useNotificationStore();
const paginaInicio = computed(() => route.name === "inicio");

const handleSubmit = () => {
  if (Object.values(store.busqueda).includes("")) {
    notificaciones.$patch({
      texto: "Todos los Campos son Obligatorios",
      mostrar: true,
      error: true,
    });

    return;
  }

  store.obtenerRecetas();
};
</script>

<template>
  <header class="bg-slate-800" :class="{ header: paginaInicio }">
    <div class="mx-auto container px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{ name: 'inicio' }">
            <img class="w-32" src="/img/logo.svg" />
          </RouterLink>
        </div>
        <nav class="flex gap-4 text-white">
          <RouterLink
            :to="{ name: 'inicio' }"
            class="uppercase font-bold"
            active-class="text-orange-500"
            >Inicio</RouterLink
          >
          <RouterLink
            :to="{ name: 'favoritos' }"
            class="uppercase font-bold"
            active-class="text-orange-500"
            >Favoritos</RouterLink
          >
        </nav>
      </div>

      <form
        v-if="paginaInicio"
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
        @submit.prevent="handleSubmit"
      >
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="ingrediente"
            >Nombre o Ingredientes</label
          >
          <input
            type="text"
            id="ingrediente"
            class="p-3 w-full rounded-lg focus:outline-none"
            placeholder="Nombre o Ingrediente: ej. Vodka, Tequila, etc"
            v-model="store.busqueda.nombre"
          />
        </div>

        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="categoria"
            >Categoría</label
          >
          <select
            id="categoria"
            class="p-3 w-full rounded-lg focus:outline-none [&>*]:bg-gray-300"
            v-model="store.busqueda.categoria"
          >
            <option value="">-- Seleccione --</option>
            <option
              v-for="categoria in store.categorias"
              :key="categoria.strCategory"
              :value="categoria.strCategory"
            >
              {{ categoria.strCategory }}
            </option>
          </select>
        </div>
        <input
          type="submit"
          value="Buscar Recetas"
          class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
        />
      </form>
    </div>
  </header>
</template>

<style>
.header {
  background-image: url("/img/bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>

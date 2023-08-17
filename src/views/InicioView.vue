<script setup>
import Receta from "../components/Receta.vue";
import { useBebidasStore } from "../stores/bebidas";

const bebidas = useBebidasStore();

console.log(bebidas.recetas);
</script>

<template>
  <h1 class="text-6xl font-extrabold">Recetas</h1>
  <p v-if="bebidas.noRecetas" class="text-2xl my-10 font-bold">
    No hay Resultados. Utiliza el formulario para buscar recetas.
  </p>
  <div
    v-else
    class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10"
  >
    <Receta
      v-for="receta in bebidas.recetas"
      :receta="receta"
      :key="receta.idDrink"
    />
  </div>
</template>

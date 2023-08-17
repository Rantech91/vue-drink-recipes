<script setup>
import { useBebidasStore } from "../stores/bebidas";

const bebidas = useBebidasStore();

defineProps({
  receta: {
    type: Object,
  },
});
</script>

<template>
  <div class="border shadow-lg">
    <div class="overflow-hidden">
      <img
        class="hover:scale-105 transition ease-in-out"
        :src="receta.strDrinkThumb"
        :alt="`imagen de ${receta.strDrink}`"
      />
    </div>
    <div class="p-5">
      <h2 class="text-md sm:text-2xl truncate font-extrabold">
        {{ receta.strDrink }}
      </h2>
      <button
        type="button"
        class="bg-orange-400 mt-5 w-full p-3 font-bold text-white text-lg rounded-lg transition ease-in-out hover:bg-orange-500"
        @click="bebidas.seleccionarBebida(receta.idDrink)"
      >
        Ver Receta
      </button>
    </div>
  </div>
</template>

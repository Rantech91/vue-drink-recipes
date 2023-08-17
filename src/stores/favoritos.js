import { ref, watch, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { useBebidasStore } from "./bebidas";
import { useModalStore } from "./modal";
import { useNotificationStore } from "./notificaciones";

export const useFavoritosStore = defineStore("favoritos", () => {
  const bebidas = useBebidasStore();
  const notificaciones = useNotificationStore();
  const modal = useModalStore();
  const favoritos = ref([]);

  onMounted(() => {
    favoritos.value = JSON.parse(localStorage.getItem("favoritos")) ?? [];
  });

  watch(
    favoritos,
    () => {
      sincronizarLocalStorage();
    },
    {
      deep: true,
    }
  );

  function sincronizarLocalStorage() {
    localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
  }

  function existeFavorito() {
    const favoritosLocalStorage = (favoritos.value =
      JSON.parse(localStorage.getItem("favoritos")) ?? []);
    return favoritosLocalStorage.some(
      (favorito) => favorito.idDrink === bebidas.receta.idDrink
    );
  }

  function eliminarFavorito() {
    favoritos.value = favoritos.value.filter(
      (favorito) => favorito.idDrink !== bebidas.receta.idDrink
    );
    notificaciones.mostrar = true;
    notificaciones.texto = "Eliminado de Favoritos";
    notificaciones.error = true;
  }

  function agregarFavorito() {
    favoritos.value.push(bebidas.receta);
    notificaciones.mostrar = true;
    notificaciones.texto = "Se agregó a Favoritos";
    notificaciones.error = false;
  }

  function handleClickFavorito() {
    if (existeFavorito()) {
      console.log("Ya existe...");
      eliminarFavorito();
    } else {
      agregarFavorito();
    }
    modal.modal = false;
  }
  const noFavoritos = computed(() => favoritos.value.length === 0);

  return {
    favoritos,
    noFavoritos,
    handleClickFavorito,
    existeFavorito,
  };
});

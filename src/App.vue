<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PageHeader from './components/PageHeader.vue'
import axiosClient from './utils/axios'

// Constante para guardar el listado de pokemones
const pokemonlist = ref([])
// Constante para guardar el pokemon seleccionado
const pokemonselect = ref({} as any)

// Funcion para traer el listado de pokemones
const fetchPokemon = async () => {
  try {
    // Llamada a la API, sacamos el resultado de la peticion y se almacena en data
    const { data } = await axiosClient.get('/pokemon')
    // Almacenamos el listado de pokemones en pokemonlist
    pokemonlist.value = data.results
  } catch (error) {
    // Si algo falla, mostramos el error
    console.log(error)
  }
}
// Se ejecuta cuando se monta el componente
onMounted(() => {
  // Llamamos a la funcion para traer el listado de pokemones
  fetchPokemon()
})

// Funcion para traer el detalle de un pokemon seleccionado
// Recibe el nombre del pokemon cómo parametro y se almacena en pokemonselect
const detallePokemon = async (nombre: string) => {
  try {
    // Llamada a la API, sacamos el resultado de la peticion y se almacena en data
    const { data } = await axiosClient.get(`/pokemon/${nombre}`)
    // Almacenamos el pokemon seleccionado en pokemonselect
    pokemonselect.value = data
  } catch (error) {
    // Si algo falla, mostramos el error
    console.log(error)
  }
}
</script>

<template>
  <PageHeader />
  <!-- Div padre contiene un display flex para mostrar dos columnas -->
  <div class="flex">
    <!-- Div para mostrar el listado de pokemones -->
    <div class="flex flex-col">
      <!-- iteración sobre el listado de pokemones -->
      <div v-for="pokemon in pokemonlist" v-bind:key="pokemon">
        <!-- Se crea un h2 con el nombre del pokemon y se hace clickeable haciendo la llamada a la funcion detallePokemon -->
        <h2 @click="detallePokemon(pokemon['name'])">
          {{ pokemon['name'] }}
        </h2>
      </div>
    </div>
    <!-- 
      Div para mostrar el pokemon seleccionado
      Solo se muestra si hay pokemon seleccionado
    -->
    <div v-if="Object.keys(pokemonselect).length > 0">
      <!-- Img para mostrar la Imagen del pokemon seleccionado -->
      <img :src="pokemonselect.sprites.front_default" />
    </div>
  </div>
</template>

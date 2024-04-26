<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PageHeader from './components/PageHeader.vue'
import axiosClient from './utils/axios'
import Listbox from 'primevue/listbox'
import Button from 'primevue/button'
import Card from 'primevue/card'

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
  <div class="flex w-full px-10 gap-20">
    <!-- Div para mostrar el listado de pokemones -->
    <div class="flex flex-col">
      <Listbox :options="pokemonlist" class="w-full md:w-[14rem] px-0">
        <template #option="slotProps">
          <!-- Se crea un botón con el nombre del pokemon y se hace clickeable haciendo la llamada a la funcion detallePokemon -->
          <Button
            :label="slotProps.option.name"
            text
            class="w-full text-white bg-green-700 hover:bg-green-900"
            @click="detallePokemon(slotProps.option.name)"
          />
        </template>
      </Listbox>
    </div>
    <!-- 
      Div para mostrar el pokemon seleccionado
      Solo se muestra si hay pokemon seleccionado
    -->
    <div v-if="Object.keys(pokemonselect).length > 0">
      <Card :title="pokemonselect.name" style="width: 30rem" class="shadow-lg bg-green-200">
        <template #header>
          <div class="flex justify-center mb-0">
            <!-- Img para mostrar la Imagen del pokemon seleccionado -->
            <img :src="pokemonselect.sprites.front_default" :alt="pokemonselect.name" width="300" />
          </div>
        </template>
        <template #title>
          <!-- Nombre del pokemon seleccionado -->
          <h1 class="text-green-900 text-center">{{ pokemonselect.name.toUpperCase() }}</h1>
        </template>
        <template #content>
          <p>Altura: {{ pokemonselect.height }}</p>
          <p>Peso: {{ pokemonselect.weight }}</p>
        </template>
      </Card>
    </div>
  </div>
</template>

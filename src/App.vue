<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PageHeader from './components/PageHeader.vue'
import axiosClient from './utils/axios'

const pokemonlist = ref([])
const pokemonselect = ref({} as any)

const fetchPokemon = async () => {
  try {
    const { data } = await axiosClient.get('/pokemon')
    pokemonlist.value = data.results
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  fetchPokemon()
})

const detallePokemon = async (nombre: string) => {
  try {
    const { data } = await axiosClient.get(`/pokemon/${nombre}`)
    pokemonselect.value = data
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <PageHeader />
  <div class="flex">
    <div class="flex flex-col">
      <div v-for="pokemon in pokemonlist" v-bind:key="pokemon">
        <h2 @click="detallePokemon(pokemon['name'])">
          {{ pokemon['name'] }}
        </h2>
      </div>
    </div>
    <div v-if="Object.keys(pokemonselect).length > 0">
      <img :src="pokemonselect.sprites.front_default" />
    </div>
  </div>
</template>

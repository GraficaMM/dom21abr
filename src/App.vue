<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PageHeader from './components/PageHeader.vue'
import axiosClient from './utils/axios'

const pokemonlist = ref([])

const fetchPokemon = async () => {
  try {
    const { data } = await axiosClient.get('/pokemon')
    pokemonlist.value = data
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  fetchPokemon()
})
</script>

<template>
  <PageHeader />
  <div v-for="pokemon in pokemonlist" v-bind:key="pokemon">
    {{ pokemon[name] }}
  </div>
</template>

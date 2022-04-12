<template>
  <div :key="personaje.id" v-for="personaje in personajes">
    <p>{{ personaje.name }}</p>
  </div>
  <button @click="onClick">Enviar</button>
  <form v-on:submit.prevent="onSubmit">
    <input type="number" v-model="form.id" />
    <input type="submit" value="Enviar" />
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      personajes: [],
      form: {
        id: null,
      },
    };
  },
  props: {
    msg: String,
  },
  methods: {
    async loadCharacters() {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );
      const { results } = response.data;
      this.personajes = results;
    },
    onClick() {
      this.personajes = [];
    },
    onSubmit() {
      if (this.id <= 0) {
        alert("EL ID TIENE QUE SER MAYOR A 0!");
        return;
      }
    },
  },
  created() {
    this.loadCharacters();
  },
};
</script>

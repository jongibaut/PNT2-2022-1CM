<template>
  <div class="bg-dark text-white">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6">
          <form v-on:submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="id" class="form-label"
                >Id: <span class="text-danger">*</span></label
              >
              <input type="number" class="form-control" v-model="form.id" />
            </div>
            <div class="mb-3">
              <label for="name" class="form-label"
                >Nombre: <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                v-model="form.name"
                :disabled="form.id"
              />
            </div>
            <div class="mb-3">
              <label for="status" class="form-label"
                >Estado: <span class="text-danger">*</span></label
              >
              <select
                class="form-select"
                aria-label="Estado"
                v-model="form.status"
                :disabled="form.id"
              >
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="species" class="form-label"
                >Especie: <span class="text-danger">*</span></label
              >
              <select
                class="form-select"
                aria-label="Especie"
                v-model="form.species"
                :disabled="form.id"
              >
                <option value="Human">Human</option>
                <option value="Alien">Alien</option>
                <option value="Mythological Creature">
                  Mythological Creature
                </option>
                <option value="Robot">Robot</option>
              </select>
            </div>
            <div class="d-grid gap-2">
              <input
                class="btn btn-info text-white"
                type="submit"
                value="Buscar"
              />
            </div>
          </form>
        </div>
      </div>
      <!-- por id nombre especie y estado -->
      <div class="row justify-content-center">
        <div
          :key="personaje.id"
          v-for="personaje in personajes"
          class="col-4 text-dark mt-4"
        >
          <Personaje :personaje="personaje" />
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <button class="btn btn-info mt-4 text-white" @click="prev()">
            Previous
          </button>
        </div>
        <div class="col-6">
          <button class="btn btn-info mt-4 text-white" @click="next()">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Personaje from "./Personaje";
export default {
  //nombre del componente
  name: "HelloWorld",
  data() {
    // valores globales con los que voy a trabajr dentro del componente accedo con this.nombreVariable
    return {
      personajes: [],
      info: {},
      form: {
        id: null,
        name: null,
        status: null,
        species: null,
      },
    };
  },
  components: {
    // declaro componentes que voy a utilizar dentro de este mismo componente
    Personaje,
  },
  methods: {
    // metodos/funciones para utilizar dentro del componente
    async loadCharacters(url = "https://rickandmortyapi.com/api/character") {
      const response = await axios.get(url);
      const { results, info } = response.data;
      this.personajes = results;
      this.info = info;
      console.log(this.personajes);
    },
    async loadCharacter(url) {
      const response = await axios.get(url);
      this.personajes = [response.data];
      console.log(this.personajes);
    },
    prev() {
      this.loadCharacters(this.info.prev);
    },
    next() {
      this.loadCharacters(this.info.next);
    },
    onSubmit() {
      if (this.form.id) {
        this.loadCharacter(
          "https://rickandmortyapi.com/api/character/" + this.form.id
        );
      } else {
        let url = "https://rickandmortyapi.com/api/character?";
        this.form.name ? (url = url + "name=" + this.form.name + "&") : null;
        this.form.status
          ? (url = url + "status=" + this.form.status + "&")
          : null;
        this.form.species
          ? (url = url + "species=" + this.form.species + "&")
          : null;
        console.log(url);
        this.loadCharacters(url);
      }
    },
  },
  created() {
    //se ejecuta cuando se crea el componente
    this.loadCharacters();
    localStorage.logged = 0;
    console.log("local", localStorage.logged);
  },
};
</script>

<template>
  <div class="title">
    <a href="/">
      <img src="../assets/Pokebola-Pokémon-PNG-1024x1022.png" alt="" />
    </a>
  </div>

  <form>
    <div class="form-control">
      <input
        v-on:change="getInput"
        type="text"
        class="form-input"
        placeholder="Type a Pókemon Name"
        v-model="searchValue"
      />

      <div class="input-options">
        <div
          v-for="(pokemon, index) in pokemonSearch"
          v-bind:key="index"
          class="option"
          v-on:click="sendSearchOption"
        >
          {{ pokemon }}
        </div>

        <div
          class="option"
          v-if="pokemonSearch.length == 0 && searchValue.length > 1"
        >
          Nada encontrado
        </div>
      </div>
    </div>

    <button type="button" v-on:click="sendSearch">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
  </form>

  <div class="pokemon-infos">
    <div class="pokemon-infos-head">
      <h2>{{ name }}</h2>
      <div class="card">
        <img v-bind:src="imagem" alt="" />
      </div>
    </div>

    <div class="pokemon-infos-body">
      <ul>
        <li class="info">
          <div class="left">Ataque</div>
          <div class="right">{{ ataque }}</div>
        </li>
        <li class="info">
          <div class="left">Defesa</div>
          <div class="right">{{ defesa }}</div>
        </li>
        <li class="info">
          <div class="left">Velocidade</div>
          <div class="right">{{ velocidade }}</div>
        </li>
        <li class="info">
          <div class="left">Hp</div>
          <div class="right">{{ hp }}</div>
        </li>
        <li class="info">
          <div class="left">Ataque Especial</div>
          <div class="right">{{ ataqueEspecial }}</div>
        </li>
        <li class="info">
          <div class="left">Defesa Especial</div>
          <div class="right">{{ defesaEspecial }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "searchComponent",

  data() {
    return {
      pokemons: [],
      pesquisa: "",
      pokemonSearch: [],
      finallySearch: "",
      searchValue: "",
      name: "",
      ataque: "",
      defesa: "",
      hp: "",
      ataqueEspecial: "",
      defesaEspecial: "",
      velocidade: "",
      imagem: "",
    };
  },

  methods: {
    removeContent() {
      let content = document.querySelector(".container.pokerinfo");
      content.innerHTML = "";
    },

    getInput(event) {
      let PokemonPesquisado = event.target.value;
      this.pesquisa = PokemonPesquisado;

      this.searchPokemon(this.pesquisa);
    },

    searchPokemon(search) {
      if (search == null || search == "" || search == " ") {
        return;
      } else {
        let pokemonNames = [];

        this.pokemons.map((pokemon) => pokemonNames.push(pokemon.name));
        let pokemonSearchResult = pokemonNames.filter((pokemon) =>
          pokemon.includes(search)
        );

        this.pokemonSearch = pokemonSearchResult;

        console.log(this.pokemonSearch);
      }
    },

    sendSearch() {
      let search = document.querySelector(".form-input");
      let result = search.value;
      this.searchPokemon(result);
    },

    sendSearchOption(event) {
      this.finallySearch = event.target.innerHTML.replace(" ", "-");
      this.update(this.finallySearch);
    },

    async update(namePokemon) {
      let result = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/" + namePokemon
      );
      this.name = result.data.name;
      this.hp = result.data.stats[0].base_stat;
      this.ataque = result.data.stats[1].base_stat;
      this.defesa = result.data.stats[2].base_stat;
      this.velocidade = result.data.stats[5].base_stat;
      this.imagem = result.data.sprites.front_default;

      this.pokemonSearch = [];
    },
  },

  props: {
    pokemonToGetInfos: String,
  },

  watch: {
    searchValue(newValue) {
      if (
        newValue === null ||
        newValue === "" ||
        newValue === " " ||
        newValue.length < 1
      ) {
        return;
      } else {
        this.searchPokemon(newValue);
      }
    },
  },

  async created() {
    let resultPokemons = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?limit=1000"
    );
    resultPokemons.data.results.map((pokemon) => this.pokemons.push(pokemon));

    let result = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/" + this.pokemonToGetInfos
    );
    this.name = result.data.name;
    this.hp = result.data.stats[0].base_stat;
    this.ataque = result.data.stats[1].base_stat;
    this.defesa = result.data.stats[2].base_stat;
    this.ataqueEspecial = result.data.stats[3].base_stat;
    this.defesaEspecial = result.data.stats[4].base_stat;
    this.velocidade = result.data.stats[5].base_stat;
    this.imagem = result.data.sprites.front_default;
    console.log(result.data.stats);
  },
};
</script>

<style>
</style>
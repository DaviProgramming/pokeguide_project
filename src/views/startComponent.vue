<template>
  <main class="container start"  v-if="activyPage == false">

    <titleComponent />

    <form onsubmit="return false">
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

          <div class="option"  v-if="pokemonSearch.length == 0 && searchValue.length > 1">
            Nada encontrado
          </div>
        </div>
      </div>

      <button type="button" v-on:click="sendSearch">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>

    <div class="wallpaper">
      <img src="../assets/images/pokemons.png" alt="" />
    </div>
    
    
  </main>

  <section v-if="activyPage == true" class="container pokeinfo">
    <searchComponent :pokemonToGetInfos="finallySearch" />
  </section>
</template>

<script>
import axios from "axios";
import searchComponent from "../views/searchComponent.vue";
import titleComponent from "../components/titleComponent.vue";


export default {
  name: "startComponent",
  data() {
    return {
      pokemons: [],
      pesquisa: "",
      pokemonSearch: [],
      finallySearch: "",
      searchValue: "",
      activyPage: false,
    };
  },

  components: {
    searchComponent,
    titleComponent
},

  methods: {
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
      }
    },

    sendSearch() {
      let search = document.querySelector(".form-input");
      let result = search.value;
      this.searchPokemon(result);
    },

    sendSearchOption(event) {
      this.finallySearch = event.target.innerHTML.replace(" ", "-");
      this.activyPage = true;
    },
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

  async mounted() {
    let result = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?limit=1000"
    );
    result.data.results.map((pokemon) => this.pokemons.push(pokemon));
  },
};
</script>
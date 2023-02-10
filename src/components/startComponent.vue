<template>
  <section class="container start">
    <h1>PokéGuide</h1>

    <img src="../assets/pokemons.png" alt="" />
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
          <div v-for="(pokemon, index) in pokemonSearch" v-bind:key="index" class="option" v-on:click="sendSearchOption">
            {{pokemon}}
          </div>
        </div>
      </div>

      <button type="button" v-on:click="sendSearch">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "startComponent",
  data() {
    return {
      pokemons: [],
      pesquisa: "",
      pokemonSearch: [],
      finallySearch: "",
      searchValue: "",
    };
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

    sendSearch(){
      let search = document.querySelector('.form-input');
      let result = search.value;
      this.searchPokemon(result);
    },

    sendSearchOption(event){
     
      this.finallySearch = (event.target.innerHTML).replace(' ', '-');
      console.log(this.finallySearch)
    }
  },

  watch: {
     searchValue(newValue){
      if(newValue === null || newValue === "" || newValue === " " || newValue.length < 1){
        return;
      }

      else{
        console.log(newValue);
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
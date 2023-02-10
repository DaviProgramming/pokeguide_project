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
        />
        <div class="input-options">
          
        </div>
      </div>

      <button type="button">
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
      pesquisa : "",
    };
  },
  methods: {
    getInput(event){
      let PokemonPesquisado = event.target.value;
      this.pesquisa = PokemonPesquisado;

      this.searchPokemon(this.pesquisa);
    },
    searchPokemon(search){

     let pokemonNames = [];
     console.log(search);

     this.pokemons.map(pokemon => pokemonNames.push(pokemon.name));
     let pokemonSearchResult = pokemonNames.filter(pokemon => pokemon.includes(search));

     pokemonSearchResult =  pokemonSearchResult.map(pokemon => pokemon.replace('-', ' '))
   
     

     if(pokemonSearchResult.length > 1){
      
        let divInputOptions = document.querySelector('.input-options');
        divInputOptions.innerHTML = "";

        let LenghtOfArray = pokemonSearchResult.length;

        for(let i = 0; i < LenghtOfArray; i++  ){
          let createOption = document.createElement('div');
          createOption.classList.add('option');
          createOption.appendChild(document.createTextNode(pokemonSearchResult[i]))
          divInputOptions.appendChild(createOption);
        }
        
        
       
        
     }

     else{
      console.log("nada encontrado");
     }

    
    }
  },
  async mounted() {
    let result = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=700&limit=700"
    );
    result.data.results.map((pokemon) => this.pokemons.push(pokemon));
   
  },
};
</script>
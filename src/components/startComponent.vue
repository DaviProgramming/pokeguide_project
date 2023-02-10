<template>
  <section class="container start">
    <h1>PokéGuide</h1>
   
    

    <img src="../assets/pokemons.png" alt="">
    <form>

        <div class="form-control">
          <input type="text" class="form-input" placeholder="Type a Pókemon Name" />
          <div class="input-options">
            <div class="option">Pikachu </div>
            <div class="option">Pikachu </div>
            <div class="option">Pikachu </div>
            <div class="option">Pikachu </div>
          </div>
        </div>
  
        <button type="button"><i class="fa-solid fa-magnifying-glass"></i></button>
  
      </form>
  </section>


</template>

<script>
export default {
  name: "startComponent",
};
</script>
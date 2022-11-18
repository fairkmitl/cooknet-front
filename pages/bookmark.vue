<template>
  <div>
    <div class="d-flex justify-space-between">
      <h3>Bookmark</h3>
    </div>

     <RecipeCard :recipe="bookmark" />
  </div>
</template>

<script>
const recipeService = process.env.recipe;

export default {
  data: () => ({
    bookmark: [],
    recipes: [],
  }),
  mounted() {
    this.getRecipe();
  },
  methods: {

    async getFav() {
      const resp = await this.$axios
        .$get(`/fav/${this.$auth.user.id}/favlist`)
        .finally(() => {});
      if (resp) {
        let fav_list = resp.data.map((el) => parseInt(el.recipe_id));
        this.bookmark = this.recipes.filter((el) => fav_list.includes(el.id));
        console.log(this.bookmark);
      } else {
      }
    },
    async getRecipe() {
      const resp = await this.$axios
        .$get(`/recipe`, {
          baseURL: recipeService,
        })
        .finally(() => {
          this.getFav();
        });
      if (resp) {
        this.recipes = resp.map((el) => ({
          ...el,
          src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        }));
      } else {
      }
    },
  },
};
</script>

<template>
  <div>
    <div class="d-flex justify-space-between">
      <div>
        <h3>Hello</h3>
        <span class="text-caption">
          {{ $auth && $auth.user ? $auth.user.username : "Guest" }}
        </span>
      </div>
      <v-avatar @click="$router.push('/profile')" color="primary">
        <v-icon dark> mdi-account-circle </v-icon>
      </v-avatar>
    </div>

    <RecipeCard :recipe="feeds" />
  </div>
</template>

<script>
const recipeService = process.env.recipe;

export default {
  auth: false,
  data: () => ({
    feeds: [],
  }),
  mounted() {
    // console.log(this.$auth.user);
    this.getRecipe();
  },
  methods: {
    async getRecipe() {
      const resp = await this.$axios
        .$get(`/feed`, {
          baseURL: recipeService,
        })
        .finally(() => {
        });
      if (resp) {
        this.feeds = resp.map((el) => ({
          ...el,
          src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        }));
      } else {
      }
    },
  },
};
</script>

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
    fav_list: [],
  }),
  mounted() {
    // console.log(this.$auth.user);
    if (this.$auth && this.$auth.user && this.$auth.user.id) {
      this.getFav();
    }
    else{
      this.getRecipe()
    }
  },
  methods: {
    async getFav() {
      const resp = await this.$axios
        .$get(`/fav/${this.$auth.user.id}/favlist`)
        .finally(() => {
          this.getRecipe();
        });
      if (resp) {
        this.fav_list = resp.data.map((el) => parseInt(el.recipe_id));
      } else {
      }
    },
    async getRecipe() {
      const resp = await this.$axios
        .$get(`/feed`, {
          baseURL: recipeService,
        })
        .finally(() => {});
      if (resp) {
        this.feeds = resp.map((el) => ({
          ...el,
          src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        }));
        for (const r of this.feeds) {
          if (this.fav_list.includes(r.id)) {
            r["fav"] = true;
          } else {
            r["fav"] = false;
          }
        }
        console.log(this.feeds);
      } else {
      }
    },
  },
};
</script>

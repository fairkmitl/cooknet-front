<template>
  <div>
    <div class="d-flex justify-space-around align-center">
      <v-avatar @click="$router.push('/profile')" color="primary" size="60">
        <v-icon dark> mdi-account-circle </v-icon>
      </v-avatar>
      <div align="center">
        <span class="text-caption">Recipe</span>
        <h4>{{ recipe.length }}</h4>
      </div>
      <div align="center">
        <span class="text-caption">Follower</span>
        <h4>{{ follower.length }}</h4>
      </div>
      <div align="center">
        <span class="text-caption">Following</span>
        <h4>{{ following.length }}</h4>
      </div>
    </div>
    <div class="pa-6" v-if="information">
      <h3>{{ information.fullname }}</h3>
      <span class="text-caption grey--text">{{
        timeStamp(information.birthday)
      }}</span>
      <br />
      <span class="text-caption grey--text">{{ information.email }}</span>
      <v-row class="text-caption d-flex">
        <v-col cols="9">
          Private Chef Passionate about food and life 🥘🍲🍝🍱 <br />
          <!-- <v-btn small class="pa-0" text color="primary">More...</v-btn> -->
        </v-col>
        <v-col></v-col>
      </v-row>
    </div>

    <div class="d-flex justify-space-around">
      <v-btn-toggle v-model="tab" tile color="primary" group>
        <v-btn :value="1"> Recipe </v-btn>
        <v-btn :value="2"> Videos </v-btn>
        <v-btn :value="3"> Tag </v-btn>
      </v-btn-toggle>
    </div>
    <RecipeCard :recipe="recipe" />
  </div>
</template>

<script>
const recipeService = process.env.recipe;

export default {
  data: () => ({
    tab: 1,
    following: [],
    follower: [],
    recipe: [],
    information: null,
  }),
  mounted() {
    this.getInformation();
    this.getRecipe();
    this.getFollowing();
    this.getFollower();
    console.log(this.$auth.user);
  },
  methods: {
    async getInformation() {
      const resp = await this.$axios
        .$get(`/information/${this.$auth.user.id}`)
        .finally(() => {});
      if (resp) {
        console.log(resp);
        this.information = resp.data;
      } else {
      }
    },
    async getFollowing() {
      const resp = await this.$axios
        .$get(`/follow/${this.$auth.user.id}/following`)
        .finally(() => {});
      if (resp) {
        this.following = resp.data;
      } else {
      }
    },
    async getFollower() {
      const resp = await this.$axios
        .$get(`/follow/${this.$auth.user.id}/follower`)
        .finally(() => {});
      if (resp) {
        console.log(resp);
        this.follower = resp.data;
      } else {
      }
    },
    async getRecipe() {
      const resp = await this.$axios
        .$get(`/recipe`, {
          baseURL: recipeService,
        })
        .finally(() => {});
      if (resp) {
        this.recipe = resp.filter((el) => el.user.user == this.$auth.user.id);
        this.recipe = resp.map((el) => ({
          ...el,
          src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        }));
      } else {
      }
    },
  },
};
</script>

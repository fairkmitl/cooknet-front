<template>
  <div>
    <div class="d-flex justify-space-around align-center">
      <v-avatar
        @click="$router.push('/profile')"
        color="primary"
        size="60"
      >
        <v-icon dark> mdi-account-circle </v-icon>
      </v-avatar>
      <div align="center">
        <span class="text-caption">Recipe</span>
        <h4>99</h4>
      </div>
      <div align="center">
        <span class="text-caption">Follower</span>
        <h4>99</h4>
      </div>
      <div align="center">
        <span class="text-caption">Following</span>
        <h4>99</h4>
      </div>
    </div>
    <div class="pa-6">
      <h3>Username</h3>
      <span class="text-caption grey--text">Chef</span>
      <v-row class="text-caption d-flex">
        <v-col cols="9">
          Private Chef Passionate about food and life 🥘🍲🍝🍱 <br />
          <v-btn small class="pa-0" text color="primary">More...</v-btn>
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
    <v-col v-for="item in feeds" :key="item.title" cols="12">
      <v-card @click="recipeDetail(item.id)">
        <v-img
          :src="item.src"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="200px"
        >
          <v-card-title v-text="item.title"></v-card-title>
        </v-img>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-bookmark</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </div>
</template>

<script>
export default {
  data: () => ({
    tab: 1,
    feeds: [
      {
        id: 1,
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      },
      {
        id: 2,
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      },
      {
        id: 3,
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      },
    ],
  }),
  mounted() {},
  methods: {
    recipeDetail(id) {
      this.$router.push({
        name: "recipe-id",
        params: { id: id },
      });
    },
  },
};
</script>

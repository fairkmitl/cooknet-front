<template>
  <div>
    <div class="d-flex justify-space-between">
      <div>
        <h3>Hello</h3>
        <span class="text-caption"> Username </span>
      </div>
      <v-avatar @click="$router.push('/profile')" color="green darken-2">
        <v-icon dark> mdi-account-circle </v-icon>
      </v-avatar>
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
  mounted() {
    console.log(this.$auth.user);
  },
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

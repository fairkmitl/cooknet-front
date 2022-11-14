<template>
  <div>
    <div align="center">Recipe id : {{ recipe_id }}</div>
    <br />
    <v-img
      lazy-src="https://picsum.photos/id/11/10/6"
      src="https://picsum.photos/id/11/500/300"
    ></v-img>
    <br />
    <v-row>
      <v-col cols="8">
        <h3>Spicy chicken burger with French fries</h3>
      </v-col>
      <v-col cols="4">
        <span class="text-body2 grey--text">(13k Reviews)</span>
      </v-col>
    </v-row>
    <div class="mt-2 d-flex justify-space-around align-center">
      <v-avatar
        @click="$router.push('/profile')"
        color="green darken-2"
        size="60"
      >
        <v-icon dark> mdi-account-circle </v-icon>
      </v-avatar>
      <h4>Username</h4>
      <v-btn dark color="green darken-2">Follow</v-btn>
    </div>
    <br />
    <div class="d-flex justify-space-around">
      <v-btn-toggle v-model="tab" tile color="green darken-2" group>
        <v-btn :value="1"> Ingrident </v-btn>
        <v-btn :value="2"> Procedure </v-btn>
      </v-btn-toggle>
    </div>
    <v-card v-for="item in 4" :key="item" class="pa-4 mx-auto mb-4" max-width="344" outlined>
      <div class="d-flex justify-space-between align-center">
        <v-avatar tile size="80" color="grey"></v-avatar>
        <h4>xxxxxxx</h4>
        <span class="text-body1 grey--text">xxx g</span>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  head() {},
  data() {
    return {
      tab: 1,
      recipe_id: null,
    };
  },

  asyncData: async function ({ route }) {
    let id = route.params.id;
    return {
      recipe_id: id,
      profile: null,
    };
  },

  mounted() {},
  components: {},
  watch: {},

  methods: {},
  computed: {},
};
</script>

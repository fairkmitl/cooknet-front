<template>
  <div v-if="recipe_detail">
    <v-img
      contain
      lazy-src="https://picsum.photos/id/11/10/6"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>
    <br />
    <v-row>
      <v-col cols="8">
        <h3>{{ recipe_detail.name }}</h3>
      </v-col>
      <v-col cols="4">
        <span class="text-body2 grey--text">(13k Reviews)</span>
      </v-col>
    </v-row>
    <div class="mt-2 d-flex justify-space-around align-center">
      <v-avatar @click="$router.push('/profile')" color="primary" size="60">
        <v-icon dark> mdi-account-circle </v-icon>
      </v-avatar>
      <h4>{{ recipe_detail.user.fullname }}</h4>
      <v-btn dark color="primary" @click="follow(recipe_detail.user.user_id)"
        >Follow</v-btn
      >
    </div>
    <br />
    <v-card>
      <v-tabs v-model="tab" centered icons-and-text color="primary">
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#tab-1"> Ingredients </v-tab>
        <v-tab href="#tab-2"> Instructions </v-tab>
      </v-tabs>
      <br />

      <v-tabs-items v-model="tab">
        <v-tab-item :value="'tab-1'">
          <v-card
            v-for="item in recipe_detail.ingrediants"
            :key="item.id"
            class="pa-4 mx-auto mb-4"
            max-width="344"
            outlined
          >
            <div class="d-flex justify-space-between align-center">
              <v-avatar tile size="80" color="grey"></v-avatar>
              <h4>{{ item.name }}</h4>
              <span class="text-body1 grey--text"
                >{{ item.amount }} {{ item.unit }}</span
              >
            </div>
          </v-card>
        </v-tab-item>
        <v-tab-item :value="'tab-2'">
          <v-card
            v-for="item in recipe_detail.instructions"
            :key="item.id"
            class="pa-4 mx-auto mb-4"
            max-width="344"
            outlined
          >
            <div class="d-flex justify-space-between align-center">
              <v-avatar tile size="80" color="grey"></v-avatar>
              &emsp;
              <span class="text-body1 grey--text">{{ item.instruction }}</span>
            </div>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
const recipeService = process.env.recipe;

export default {
  auth: false,
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
      recipe_detail: null,
    };
  },

  mounted() {
    this.recipeDetail();
  },
  components: {},
  watch: {},

  methods: {
    async recipeDetail() {
      const resp = await this.$axios
        .$get(`/recipe/${this.recipe_id}`, {
          baseURL: recipeService,
        })
        .finally(() => {});
      if (resp) {
        this.recipe_detail = resp[0];
      } else {
      }
    },
    async follow(follow_user_id) {
      const resp = await this.$axios
        .$post(`/follow/${this.$auth.user.id}/${follow_user_id}`)
        .finally(() => {});
      if (resp) {
      } else {
      }
    },
  },
  computed: {},
};
</script>

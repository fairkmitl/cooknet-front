<template>
  <div>
    <div class="d-flex justify-space-between">
      <div class="d-flex align-center">
        <h3>Hello</h3>
        &emsp;
        <span class="text-body-1">
          {{ $auth && $auth.user ? $auth.user.username : "Guest" }}
        </span>
        &emsp;
        <v-avatar @click="$router.push('/profile')" color="primary">
          <v-icon dark> mdi-account-circle </v-icon>
        </v-avatar>
      </div>

      <v-btn @click="openDialogSearch()" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <!-- <v-toolbar-title>Recipe</v-toolbar-title> -->
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="searchRecipe()"> Search </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-container>
          <v-text-field
            v-model="search_detail.text"
            hide-details
            label="recipe name"
            outlined
            dense
          ></v-text-field>
          <br />
          <v-select
            v-model="search_detail.ingrediant_id"
            :items="options"
            label="ingredient"
            outlined
            item-text="name"
            item-value="id"
            dense
            hide-details
          ></v-select>
          <br />
          <v-select
            v-model="search_detail.category_id"
            :items="categories"
            label="category"
            outlined
            item-text="name"
            item-value="id"
            dense
            hide-details
          ></v-select>
          <br />
          <RecipeCard :recipe="result_search" />
        </v-container>
      </v-card>
    </v-dialog>

    <RecipeCard :recipe="feeds" />
  </div>
</template>

<script>
const recipeService = process.env.recipe;

export default {
  auth: false,
  data: () => ({
    options: [],
    categories: [],
    dialog: false,
    feeds: [],
    fav_list: [],
    search_detail: {
      text: "",
      category_id: null,
      ingrediant_id: null,
    },
    result_search: [],
  }),
  mounted() {
    // console.log(this.$auth.user);
    if (this.$auth && this.$auth.user && this.$auth.user.id) {
      this.getFav();
    } else {
      this.getRecipe();
    }
  },
  methods: {
    async getIngrident() {
      const resp = await this.$axios
        .$get(`/ingrediant`, {
          baseURL: recipeService,
        })
        .finally(() => {});
      if (resp) {
        this.options = resp;
        this.options = resp.map((el) => ({
          ...el,
          ingrediant_id: el.id,
        }));
      } else {
      }
    },
    async getCategory() {
      const resp = await this.$axios
        .$get(`/category`, {
          baseURL: recipeService,
        })
        .finally(() => {});
      if (resp) {
        this.categories = resp;
        this.categories = resp.map((el) => ({
          ...el,
          category_id: el.id,
        }));
      } else {
      }
    },
    openDialogSearch() {
      this.getIngrident();
      this.getCategory();
      this.dialog = true;
    },
    async searchRecipe() {
      let params = "";
      if (this.search_detail.text) {
        params += `text=${this.search_detail.text}&`;
      }
      if (this.search_detail.ingrediant_id) {
        params += `ingrediant_id=${this.search_detail.ingrediant_id}&`;
      }
      if (this.search_detail.category_id) {
        params += `category_id=${this.search_detail.category_id}&`;
      }
      const resp = await this.$axios
        .$get(`/recipe?${params}`, {
          baseURL: recipeService,
        })
        .finally(() => {});
      if (resp) {
        // this.result_search = resp;
        this.result_search = resp.map((el) => ({
          ...el,
          src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        }));
      } else {
      }
    },
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

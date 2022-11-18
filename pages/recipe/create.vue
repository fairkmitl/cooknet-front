<template>
  <div>
    <h4>Create Recipe</h4>
    <br />
    <v-img
      lazy-src="https://picsum.photos/id/11/10/6"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>
    <br />
    <v-text-field
      label="Recipe Name ...."
      outlined
      dense
      v-model="recipe_detail.name"
    ></v-text-field>
    <v-textarea
      rows="2"
      label="Description ...."
      outlined
      dense
      hide-details
      v-model="recipe_detail.description"
    ></v-textarea>

    <div class="d-flex justify-space-between align-center">
      <h4>Ingrident</h4>
      <v-btn icon @click="addIngrident()">
        <v-icon color="primary">mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-row v-for="(item, index) in recipe_detail.ingrediants" :key="index">
      <v-col cols="6" v-if="options.length > 0" class="px-1">
        <v-select
          v-model="item.ingrediant_id"
          :items="options"
          label="ingredient"
          outlined
          item-text="name"
          item-value="id"
          dense
          hide-details
        ></v-select>
      </v-col>
      <v-col cols="2" class="px-1">
        <v-text-field
          v-model="item.amount"
          hide-details
          label="quantity"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="4" class="px-1">
        <v-select
          v-model="item.unit_id"
          :items="unit_options"
          label="unit"
          outlined
          item-text="name"
          item-value="unit_id"
          dense
          hide-details
        ></v-select>
      </v-col>
    </v-row>

    <div class="d-flex justify-space-between align-center">
      <h4>Procedure</h4>
      <v-btn icon @click="addProcedure()">
        <v-icon color="primary">mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-row v-for="(item, j) in recipe_detail.instructions" :key="j">
      <v-col cols="12">
        <v-textarea
          v-model="item.instruction"
          rows="2"
          label="instructions"
          outlined
          dense
          hide-details
        ></v-textarea>
      </v-col>
    </v-row>
    <br />
    <v-btn block color="primary" @click="createRecipe()"> Create Recipe </v-btn>
  </div>
</template>

<script>
const recipeService = process.env.recipe;

export default {
  head() {},
  data() {
    return {
      options: [],
      unit_options: [
        {
          unit_id: 1,
          name: "spoon",
        },
        {
          unit_id: 2,
          name: "item",
        },
      ],
      recipe_detail: {
        name: "Tom sab",
        description: "Yummy thai food",
        image_url: null,
        user_id: "",
        category_id: 2,
        ingrediants: [
          {
            ingrediant_id: 1,
            amount: 1,
            unit_id: 1,
          },
          {
            ingrediant_id: 2,
            amount: 1,
            unit_id: 2,
          },
        ],
        instructions: [
          {
            instruction:
              "Pour the water into a pot, add the lemon grass and kaffir-lime leaves and heat it",
            image_url: null,
            video_url: null,
          },
          {
            instruction:
              "Add the shrimps when the water is boiling and cover the pot.",
            image_url: null,
            video_url: null,
          },
        ],
        tools: [
          {
            tool_id: 1,
          },
          {
            tool_id: 2,
          },
        ],
      },
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

  mounted() {
    this.getIngrident();
  },
  components: {},
  watch: {},

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

        console.log(this.options);
      } else {
      }
    },
    addIngrident() {
      this.recipe_detail.ingrediants.push({
        ingrediant_id: 1,
        amount: 1,
        unit_id: 1,
      });
    },
    addProcedure() {
      this.recipe_detail.instructions.push({
        instruction: "Add the shrimps",
      });
    },
    async createRecipe() {
      this.recipe_detail.user_id = this.$auth.user.id
      const resp = await this.$axios
        .$post(`/recipe`, this.recipe_detail, {
          baseURL: recipeService,
        })
        .finally(() => {});
      if (resp) {
      } else {
      }
    },
  },
  computed: {},
};
</script>

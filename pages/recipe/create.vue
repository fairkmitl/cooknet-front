<template>
  <div>
    <h4>Create Recipe</h4>
    <br />
    <v-img
      lazy-src="https://picsum.photos/id/11/10/6"
      src="https://picsum.photos/id/11/500/300"
    ></v-img>
    <br />
    <v-text-field label="Recipe Name ...." outlined dense></v-text-field>

    <h4>Ingrident</h4>
    <br />
    <v-row v-for="item in ingrident" :key="item.name">
      <v-col cols="8">
        <v-text-field label="Ingrident Name ...." outlined dense></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field label="weight ...." outlined dense></v-text-field>
      </v-col>
    </v-row>

    <h4>Procedure</h4>
    <br />
    <v-row v-for="item in procedure" :key="item">
      <v-col cols="12">
        <v-textarea
          rows="2"
          label="Ingrident Name ...."
          outlined
          dense
        ></v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  head() {},
  data() {
    return {
      tab: 1,
      recipe_id: null,
      ingrident: [
        {
          name: "",
          weight: null,
        },
      ],
      procedure: [
        {
          description: "",
        },
      ],
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

  methods: {
    addIngrident() {
      this.ingrident.push({
        name: "",
        weight: null,
      });
    },
    addProcedure() {
      this.procedure.push({
        description: "",
      });
    },
  },
  computed: {},
};
</script>

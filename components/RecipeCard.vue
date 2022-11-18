<template>
  <div>
    <v-col v-for="item in recipe" :key="item.title" cols="12" class="px-0">
      <v-card>
        <v-img
          @click="recipeDetail(item.id)"
          :src="item.src"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="150px"
        >
          <v-card-title v-text="item.name"></v-card-title>
        </v-img>

        <v-card-actions>
          <span class="text-caption">{{ item.description }}</span>
          <v-spacer></v-spacer>
          <span class="text-caption">{{ timeStamp(item.updatedAt) }}</span>
          <v-btn icon @click="favRecipe(item.id)">
            <v-icon :color="item.fav ? 'primary' : ''">mdi-bookmark</v-icon>
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
  props: ["recipe"],
  auth: false,
  head: () => ({}),
  data: () => ({}),
  created() {},
  computed: {},
  mounted() {
    // this.getFav();
  },
  components: {},
  watch: {},
  methods: {
    recipeDetail(id) {
      this.$router.push({
        name: "recipe-id",
        params: { id: id },
      });
    },
    async favRecipe(id) {
      await this.$axios
        .$get(`/fav/${this.$auth.user.id}/favlist/${id}`)
        .finally(() => {
          var index = this.recipe.findIndex((el) => el.id == id);
          this.recipe[index].fav = !this.recipe[index].fav;
        });
    },
    // async getFav() {
    //   const resp = await this.$axios
    //     .$get(`/fav/${this.$auth.user.id}/favlist`)
    //     .finally(() => {});
    //   if (resp) {
    //     let fav_list = resp.data.map((el) => parseInt(el.recipe_id));
    //     for (const r of this.recipe) {
    //       if (fav_list.includes(r.id)) {
    //         r["fav"] = true;
    //       } else {
    //         r["fav"] = false;
    //       }
    //     }
    //     // console.log(this.recipe);
    //   } else {
    //   }
    // },
  },
};
</script>

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
        <span class="text-body2 grey--text"
          >({{ recipe_detail.comments.length }} Reviews)</span
        >
      </v-col>
    </v-row>
    <div class="mt-2 d-flex justify-space-between align-center">
      <div class="d-flex justify-space-between align-center">
        <v-avatar @click="$router.push('/profile')" color="primary" size="60">
          <v-icon dark> mdi-account-circle </v-icon>
        </v-avatar>
        &emsp;
        <div>
          <h4>{{ recipe_detail.user.fullname }}</h4>
          <span class="text-caption">
            {{ timeStamp(recipe_detail.updatedAt) }}
          </span>
        </div>
      </div>
      <v-btn
        v-if="
          $auth && $auth.user && $auth.user.id != recipe_detail.user.user_id
        "
        dark
        color="primary"
        @click="follow(recipe_detail.user.user_id)"
      >
        <v-icon v-if="followed">mdi-check</v-icon>&nbsp; Follow</v-btn
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

    <div v-if="recipe_detail.comments.length > 0" class="mt-8">
      <h4>Comments</h4>
      <v-card
        v-for="item in recipe_detail.comments"
        :key="item.id"
        class="pa-4 mx-auto mb-4"
        max-width="344"
        outlined
      >
        <div class="d-flex justify-start align-center">
          <v-avatar tile size="80" color="grey"></v-avatar>&emsp;
          <div>
            <v-row class="pa-0 ma-0">
              <span class="text-body-2">{{ item.comment }}</span>
            </v-row>
            <div class="d-flex justify-space-between">
              <span class="text-caption grey--text">
                {{ timeStamp(item.createdAt) }}
              </span>
              <v-icon small color="success" v-if="item.sentiment == 'positive'"
                >mdi-thumb-up</v-icon
              >
              <v-icon small color="error" v-else>mdi-thumb-down</v-icon>
            </div>
          </div>
        </div>
      </v-card>
    </div>

    <div v-if="$auth && $auth.user">
      <h4>send feedback</h4>
      <v-textarea
        v-model="new_comment"
        rows="2"
        outlined
        dense
        hide-details
      ></v-textarea>
      <br />
      <v-btn block @click="sendFeedback()" color="primary">Send feedback</v-btn>
    </div>
  </div>
</template>

<script>
const recipeService = process.env.recipe;
const feedbackService = process.env.feedback;

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
      comments: [],
      followed: false,
      new_comment: "",
    };
  },

  mounted() {
    this.recipeComment();
  },
  components: {},
  watch: {},

  methods: {
    async recipeDetail() {
      const resp = await this.$axios
        .$get(`/recipe/${this.recipe_id}`, {
          baseURL: recipeService,
        })
        .finally(() => {
          if (this.$auth && this.$auth.user && this.$auth.user.id) {
            this.getFollowing();
          }
        });
      if (resp) {
        this.recipe_detail = resp[0];
        this.recipe_detail["comments"] = this.comments;
      } else {
      }
    },
    async follow(follow_user_id) {
      const resp = await this.$axios
        .$post(`/follow/${this.$auth.user.id}/${follow_user_id}`)
        .finally(() => {});
      if (resp) {
        this.followed = true;
      } else {
      }
    },
    async recipeComment() {
      const resp = await this.$axios
        .$get(`/recipe/${this.recipe_id}/comments`, {
          baseURL: feedbackService,
        })
        .finally(() => {
          this.recipeDetail();
        });
      if (resp) {
        this.comments = resp.data;
      } else {
      }
    },
    async getFollowing() {
      const resp = await this.$axios
        .$get(`/follow/${this.$auth.user.id}/following`)
        .finally(() => {});
      if (resp) {
        // console.log(resp.data);
        let following = resp.data.map((el) => el.following_user_id);
        console.log(following);
        console.log(this.recipe_detail.user.user_id);
        this.followed = following.includes(this.recipe_detail.user.user_id);
      } else {
      }
    },
    async sendFeedback() {
      const resp = await this.$axios
        .$post(
          `/recipe/${this.recipe_id}/comments/create`,
          {
            user_id: this.$auth.user.id,
            comment: this.new_comment,
          },
          {
            baseURL: feedbackService,
          }
        )
        .finally(() => {
          this.new_comment = "";
          this.recipeComment();
        });
      if (resp) {
      } else {
      }
    },
  },
  computed: {},
};
</script>

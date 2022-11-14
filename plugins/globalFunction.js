import Vue from "vue";
import moment from "moment";

Vue.mixin({
  data() {
    return {};
  },
  methods: {
    findMin(array) {
      return array.filter(Boolean).length > 0
        ? Math.min.apply(null, array.filter(Boolean))
        : false;
    },
    findMax(array) {
      return array.filter(Boolean).length > 0
        ? Math.max.apply(null, array.filter(Boolean))
        : false;
    },
    dateDuration(a, b) {
      var start = moment(a, "YYYY-MM-DD");
      var end = moment(b, "YYYY-MM-DD");

      //Difference in number of days
      return moment.duration(end.diff(start)).asDays() + 1;
    },
    today() {
      return moment().format("YYYY-MM-DD");
    },
    // dateFormat(date) {
    //   let result = date.split("T");
    //   return result[0];
    // },
    dateFormat(d) {
      if (d) {
        return moment(d).format("DD/MM/YYYY");
      } else {
        return moment().format("DD/MM/YYYY");
      }
    },
    numberwithComma(num) {
      if (!num || num == "") {
        return "";
      }
      const options = {
        // minimumFractionDigits: 2,
        // maximumFractionDigits: 2,
      };
      const NumCommas = Number(num).toLocaleString("en", options);

      return NumCommas;
    },
    numberwithComma2(num) {
      const options = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };
      const NumCommas = Number(num).toLocaleString("en", options);

      return NumCommas;
    },
    calculateDiscount(p, t) {
      return Math.floor(((100 - p) * t) / 100);
    },
  },
  computed: {},
});

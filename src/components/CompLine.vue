<script>
import { Line } from "vue-chartjs";
import "chartjs-plugin-streaming";

export default {
  name: "LineChart",
  extends: Line,
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data, this.options);
  },
};
</script>

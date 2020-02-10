<template>
  <div class="main">
    <Chart class="left-part" />
    <List class="right-part" />
  </div>
</template>

<script>
// @ is an alias to /src
import List from "@/components/List.vue";
import Chart from "@/components/Chart.vue";

export default {
  name: "Main",
  components: {
    List,
    Chart
  }
};
</script>

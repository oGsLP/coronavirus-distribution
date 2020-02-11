<template>
  <div class="list">{{prov.name + prov.value}}</div>
</template>

<script>
export default {
  name: "List",
  props: {
    prov: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>

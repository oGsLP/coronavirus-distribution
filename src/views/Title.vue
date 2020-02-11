<template>
  <div class="title">
    <h2>{{ title }}</h2>
    <p>
      确诊：{{ total.confirm
      }}<code class="danger">↑{{ today.confirm }}</code> 疑似：{{ total.suspect
      }}<code class="warning">↑{{ today.suspect }}</code> 治愈：{{ total.heal
      }}<code class="safe">↑{{ today.heal }}</code> 死亡：{{ total.dead
      }}<code class="death">↑{{ today.dead }}</code>
    </p>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    title: {
      type: String,
      default: ""
    },
    today: {
      type: Object,
      required: true,
      default() {
        return { confirm: 0, suspect: 0, dead: 0, heal: 0 };
      }
    },
    total: {
      type: Object,
      required: true,
      default() {
        return { confirm: 0, suspect: 0, dead: 0, heal: 0 };
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.title
  width 80%
  margin 0 10%
  border-bottom 2px solid grey
  h2
    margin 5px
  p
    margin 0
</style>

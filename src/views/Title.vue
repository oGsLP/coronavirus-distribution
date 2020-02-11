<template>
  <div class="title">
    <h2>全国新型冠状病毒分布图</h2>
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
    today: {
      type: Object,
      required: true
    },
    total: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>

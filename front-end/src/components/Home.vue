<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>

  <router-view></router-view>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>

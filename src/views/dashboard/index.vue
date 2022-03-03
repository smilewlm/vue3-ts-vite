<template>
  <div>
    <h1>Dashboard page</h1>
    <svg-icon icon-class="404" class="custom-class" @click="sayHi"></svg-icon>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
export default {
  name: 'Dashboard',
  setup() {
    const { proxy } = getCurrentInstance()
    const sayHi = () => {
      // alert('hi svg')
      proxy?.$message.success('success')
    }
    return {
      sayHi,
    }
  },
}
</script>

<style lang="scss">
.custom-class {
  font-size: 200px;
  color: green;
}
</style>

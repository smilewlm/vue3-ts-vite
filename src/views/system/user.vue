<template>
  <div>
    <h1>User page</h1>
  </div>
</template>
<script>
import { compile } from 'path-to-regexp'
export default {
  name: 'User',
  setup() {
    // 面包屑导航是动态路由的情况下，点击面包屑导航router.push跳转时 怎么把动态参数填充进去 拼接成正常路由  /user/:class/role/:id + {id: 2, class: 3} => /user/3/role/2 然后正确跳转
    const toPath = compile('/user/:class/role/:id')
    const path = toPath({ id: 2, class: 3 })
    console.log('path:', path) // path: /user/3/role/2
  },
}
</script>

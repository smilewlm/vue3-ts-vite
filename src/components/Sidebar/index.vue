<template>
  <div>
    <div @click="isCollapse=!isCollapse">testExpend</div>
    <el-menu
      class="sidebar-container-menu"
      mode="vertical"
      :default-active="activeMenu"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :collapse="isCollapse"
      :collapse-transition="true"
    >
      <sidebar-item
        v-for="route in menuRoutes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>
<script lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { routes } from '@/route'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.scss'
export default {
  name: 'Sidebar',
  components: {
    SidebarItem,
  },
  setup() {
    const route = useRoute()
    const activeMenu = computed(() => {
      const { path } = route
      return path
    })

    const scssVariables = computed(() => variables)
    const isCollapse = ref(false)
    const menuRoutes = computed(() => routes)
    return {
      activeMenu,
      scssVariables,
      isCollapse,
      menuRoutes,
    }
  },
}
</script>

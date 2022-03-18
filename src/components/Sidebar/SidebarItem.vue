<template>
  <div class="sidebar-item-container" v-if="!item.meta || !item.meta.hidden">
    <!-- 只有一个子路由 -->
    <template
      v-if="theOnlyOneChildRoute && (!theOnlyOneChildRoute.children || theOnlyOneChildRoute.noShowingChildren)"
    >
      <sidebar-item-link
        v-if="theOnlyOneChildRoute.meta"
        :to="resolvePath(theOnlyOneChildRoute.path)"
      >
        <el-menu-item :index="resolvePath(theOnlyOneChildRoute.path)">
          <svg-icon v-if="icon" class="menu-icon" :icon-class="icon"></svg-icon>
          <template #title>
            <span>{{ theOnlyOneChildRoute.meta.title }}</span>
          </template>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <!-- 多个子路由时 -->
    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <svg-icon v-if="item.meta.icon" class="menu-icon" :icon-class="item.meta.icon"></svg-icon>
        <span class="submenu-title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      ></sidebar-item>
    </el-sub-menu>
  </div>
</template>
<script lang="ts">
import { PropType, toRefs, computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import path from 'path-browserify'
import SidebarItemLink from './SidebarItemLink.vue'
import { isExternal } from '@/utils/validate'
export default {
  name: 'SidebarItem',
  components: {
    SidebarItemLink,
  },
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },
    basePath: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { item } = toRefs(props)

    // 子路由数量
    const showingChildNumber = computed(() => {
      // hidden路由排除掉 只算可渲染子路由
      const children = (props.item.children || []).filter((child) => {
        if (child.meta && child.meta.hidden) return false
        return true
      })
      return children.length
    })

    const theOnlyOneChildRoute = computed(() => {
      if (showingChildNumber.value > 1) {
        return null
      }

      if (item.value.children) {
        for (const child of item.value.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }

      return {
        ...props.item,
        path: '', // resolvePath避免resolve拼接时 拼接重复
        noShowingChildren: true,
      }
    })
    // menu icon
    const icon = computed(() => {
      // 子路由 如果没有icon就用父路由的
      return (
        theOnlyOneChildRoute.value?.meta?.icon ||
        (props.item.meta && props.item.meta.icon)
      )
    })

    const resolvePath = (childPath: string) => {
      if (isExternal(childPath)) {
        return childPath
      }
      return path.resolve(props.basePath, childPath)
    }

    return {
      theOnlyOneChildRoute,
      icon,
      resolvePath,
    }
  },
}
</script>

<style lang="scss">
.sidebar-item-container {
  .menu-icon {
    margin-right: 16px;
    margin-left: 5px;
    vertical-align: middle;
  }
}
</style>

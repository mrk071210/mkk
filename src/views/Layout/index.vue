<template>
  <el-container>
    <!-- <el-container>
    <el-aside width="200px">Aside</el-aside>-->
    <el-header>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
      >
        <el-menu-item index="1">
            <router-link class="link"
                       to="/home">
            文章
          </router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <router-link class="link"
                       to="/edit">
            新增
          </router-link>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <!-- <el-aside width="200px">Aside</el-aside> -->
    <!-- </el-container> -->
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Layout extends Vue {
  mounted() {}
}
</script>
<style scoped>
.el-header {
    width: 100%;
  padding: 0;
  position: absolute;
  z-index: 100000;
}
.el-main {
  padding: 0;
}
.el-menu-demo{
    width: 100%;
}
</style>

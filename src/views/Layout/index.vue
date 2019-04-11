<template>
  <el-container>
    <!-- <el-container>
      <el-aside width="200px">Aside</el-aside> -->
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
  .el-header{
      padding: 0;
  }
  .el-main{
      padding: 0
  }
</style>

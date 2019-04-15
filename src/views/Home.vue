<template>
  <div class="home">
    <div ref="container" class="container">
      <div ref="inner" class="inner"></div>
    </div>
    <el-row v-loading="loading">
      <el-col
        v-for="(item,index) in articleList"
        :key="index"
        class="articleItem"
      >
        <div :style="{background:'urls('+item.image+')'}"></div>
        <p @click="articleDetail(item.id)">{{item.title}}</p>
        <div>
          {{item.author}}{{item.createdAt}}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
declare var window: any;
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Home extends Vue {
  mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function(event: any) {
      let e = event || window.event;
      this.x = (e.clientX - this._x) / 30;
      this.y = (e.clientY - this._y) / 30;
    },
    setOrigin: function(e: any) {
      this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
      this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    },
    show: function() {
      return "(" + this.x + ", " + this.y + ")";
    }
  };
  container: any;
  inner: any;
  counter: number = 0;
  updateRate: number = 2;
  content: String = "";
  articleList:Array<any> = []
  loading:Boolean = false;
  mounted() {
    this.container = this.$refs.container;
    this.inner = this.$refs.inner;
    this.container.onmousemove = this.onMouseMoveHandler;
    this.mouse.setOrigin(this.container);
    this.getArticle()
  }
  onMouseMoveHandler(event: any) {
    if (this.isTimeToUpdate()) {
      this.update(event);
    }
  }
  isTimeToUpdate() {
    return this.counter++ % this.updateRate === 0;
  }
  update(event: any) {
    this.mouse.updatePosition(event);
    this.updateTransformStyle(this.mouse.x.toFixed(5), this.mouse.y.toFixed(5));
  }
  updateTransformStyle(x: any, y: any) {
    let style = "translate(" + -x + "px," + -y + "px)";
    this.inner.style.transform = style;
    this.inner.style.webkitTransform = style;
    this.inner.style.mozTransform = style;
    this.inner.style.msTransform = style;
    this.inner.style.oTransform = style;
  }
  /**
   * 设置图片显示范围
   */
  setImgPosition() {
    let innerImg = this.$refs.innerImg;
    let width = document.body.clientWidth;
    let height = document.body.clientHeight;
    let imgHeight = innerImg.offsetHeight;
    let marginLeft = -width / 55 + "px";
    let marginTop = -(imgHeight - height) / 2 / 55 + "px";
    this.inner.style.margin = marginTop + " 0 0 " + marginLeft;
  }
  /**
   * 获取文章列表
   */
  getArticle(){
    this.loading = true
    const res:any = this.$https.get(this.$urls.getArticleList)
    res.then((data:any) => {
      this.articleList = data.data.data
    })
    this.loading = false
  }
  articleDetail(id:String){
    let url = "http://0.0.0.0:3001/article?"
    window.open(url+`articleId=${id}`)
  }
}
</script>
<style scoped>
.container {
  width: calc(100vw - 17px);
  height: 100vh;
  overflow: hidden;
}
.inner {
  width: 110%;
  margin-left: -5%;
  height: 110%;
  margin-top: -2%;
  overflow: hidden;
  background: url("https://isujin.com/wp-content/uploads/2018/11/wallhaven-672007-1.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  opacity: 0.01;
}
.inner img {
  width: 100%;
}
</style>


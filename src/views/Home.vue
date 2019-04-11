<template>
  <div class="home">
<div ref="container" class="container">
        <div ref="inner" class="inner">
          <img ref="innerImg" src="https://isujin.com/wp-content/uploads/2018/11/wallhaven-672007-1.png" alt>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
declare var document: any;
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    
  }
})
export default class Home extends Vue {
  mouse = {
    _x:0,
    _y:0,
    x:0,
    y:0,
    updatePosition:function(event:any){
      let e = event || window.event;
      this.x = (e.clientX - this._x)/30;
        this.y = (e.clientY - this._y)/30;
    },
    setOrigin: function(e:any) {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth/2);
        this._y = e.offsetTop + Math.floor(e.offsetHeight/2);
    },
     show: function() { 
       return '(' + this.x + ', ' + this.y + ')'; 
       }
  }
  container:any
  inner:any
  counter:number = 0
  updateRate :number = 2
  mounted () {
    this.container = this.$refs.container
    this.inner = this.$refs.inner
    this.container.onmousemove = this.onMouseMoveHandler
    this.mouse.setOrigin(this.container)
    this.setImgPosition()
  }
  onMouseMoveHandler(event:any){
    if (this.isTimeToUpdate()) {
            this.update(event);
        }
  }
  isTimeToUpdate(){
    return this.counter++ % this.updateRate === 0;
  }
  update(event:any){
    this.mouse.updatePosition(event);
       this.updateTransformStyle(
        (this.mouse.x).toFixed(5),
        (this.mouse.y).toFixed(5)
    )
  }
  updateTransformStyle(x:any,y:any){
    let style = "translate("+-x+"px,"+-y+"px)";
    this.inner.style.transform = style;
    this.inner.style.webkitTransform = style;
    this.inner.style.mozTransform = style;
    this.inner.style.msTransform = style;
    this.inner.style.oTransform = style;
  }
  /**
   * 设置图片显示范围
   */
  setImgPosition(){
    let innerImg = this.$refs.innerImg
    let width = document.body.clientWidth
    let height = document.body.clientHeight
    let imgHeight = innerImg.offsetHeight
    let marginLeft = -width/55 + 'px'
    let marginTop = -(imgHeight-height)/2/55 + 'px'
    innerImg.style.margin = marginTop+" 0 0 "+marginLeft
        console.log(innerImg.style.margin)

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
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .inner img{
    width: 100%;
  }

</style>


<template>
  <el-container class="layout">
    <!-- <el-container>
    <el-aside width="200px">Aside</el-aside>-->
    <el-header class="nav">
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
        <el-button v-if="!loginFlag" @click="login" class="login" type="success" size="mini">
          github授权登录
        </el-button>
        <div v-else class="userInfo">
          <img :src="userInfo.avatar_url" alt="">
          <span>Hi,{{userInfo.login}}</span>
          <span @click="logOut" class="logout">注销</span>
        </div>
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
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class'
import config from "@/utils/config"
import service from "@/utils/https"
import { User } from '../../store/types';
import io from 'socket.io-client';

@Component({
  components: {}
})
export default class Layout extends Vue {
   @Getter('user') user!: User
   @Action('setUser') setUser!: any
  loginFlag:boolean = false
  userInfo:object = {}
  computed() {
      user:()=>{this.user}
  }
  mounted() {
    const socket = io('http://192.168.1.68:7001/');
    socket.on('connect', function(){
      console.log('连接')
      socket.on('res', function(data:any){console.log('数据：'+data)});
      socket.on('disconnect', function(){console.log('断开')});
      socket.emit('ping', {
			target: 'Dkn3UXSu8_jHvKBmAAHW',
			payload: {
				msg : 'test',
			},
			});
		socket.on('Dkn3UXSu8_jHvKBmAAHW', function(data:any){console.log(data)});
      }
    );
    
    
    console.log(this.user)
    const code = this.$route.query.code
    if(code){
      this.getUser(code)
    }
    else if(this.user){
        if((this.user as any).id){
          this.loginFlag = true
          this.userInfo = this.user
        }
    }else{
        this.loginFlag = false
    }
  }
  login(){
    // 保存授权前的页面链接
    window.localStorage.preventHref = window.location.href
    window.location.href = `${config.oauth_uri}?client_id=${config.client_id}&scope=user:email`
  }
  logOut(){
    this.setUser({})
    this.loginFlag = false
  }
  async getUser(code:any){
    let res = await service.post(this.$urls.getUser,{code:code})
    if(!res.error){
      let userInfo = res.data
      this.setUser(userInfo)
    this.loginFlag = true
       this.$message({
         message:res.data.message,
         type:'success'
       })
       const href = window.localStorage.preventHref
          if(href){
            window.location.href = href 
        }
    }else{
      this.$message({
         message:res.header.msg,
         type:'error'
       })
    }
  }
}
</script>
<style lang="scss" scoped>
.layout{
.el-header {
    width: 100%;
  padding: 0;
  position: absolute;
  z-index: 100000;
  .userInfo{
    display: flex;
    float: right;
    line-height: 50px;
    margin-top: 5px;
    margin-right: 20px;
    img{
      width: 50px;
      height: 50px;
      border-radius: 25px;margin-right: 20px;
    }
    .logout{
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
.el-main {
  padding: 0;
}
.el-menu-demo{
    width: 100%;
}
.nav{
  display: flex;
  .login{
    float: right;
    margin-top: 16px;
    margin-right: 35px;
}
  }
}
</style>

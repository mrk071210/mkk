<template>
  <div class="edit main" v-loading="loading">
    <el-form ref="articleFrom" :model="articleData" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="articleData.title"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="image">
        <el-input v-model="articleData.image"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="descript">
        <el-input v-model="articleData.description"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tag">
        <el-input v-model="articleData.tag"></el-input>
      </el-form-item>
    </el-form>
    <markdown-editor class="markdownEditor" v-model="articleData.content" ref="markdownEditor"></markdown-editor>
    <div class="editTime">
      <span>最后编辑于{{formatDate(articleData.updatedAt)}},创建于{{formatDate(articleData.createdAt)}}</span><span></span>
    </div>
    <el-row class="text-r">
      <el-button @click="cancel">清空</el-button>
      <el-button type="primary" @click="save('articleFrom')">保存</el-button>
    </el-row>
  </div>
</template>

<script lang="ts">
declare var document: any;
import { Component, Vue } from "vue-property-decorator";
import { markdownEditor } from "vue-simplemde";
import 'font-awesome/css/font-awesome.min.css'
import moment from 'moment'
@Component({
  components: {
    markdownEditor
  }
})
export default class Edit extends Vue {
  articleData: Object = {
    title: "",
    image: "",
    description: "",
    content: "",
    tag: "",
    flag: 1,
    author: "mrk"
  };
  rules: Object = {
    title: [
      { required: true, message: "请输入文章标题", trigger: "blur" },
      { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
    ],
    image: [
    ],
    descript: [
      { min: 0, max: 100, message: "长度在 0 到 100 个字符", trigger: "blur" }
    ],
    tag: [
    ]
  };
  content: String = "";
  configs: Object = {
    spellChecker: false, // 禁用拼写检查
    renderingConfig: {
      singleLineBreaks: false,
      codeSyntaxHighlighting: true
    }
  };
  loading:boolean = false;
  isCreate:boolean = true;
  mounted() {
    const id = this.$route.query.id
    if(id){
      this.getArticle(id.toString())
    }
  }
  async getArticle(id:string){
    let params = {
          id:id
      }
    this.loading = true;
    const res: any = await this.$https.get(this.$urls.getArticleDetail,{params:params}).then(
      (data: any) => data.data.data
    );
    this.articleData = res;
    this.isCreate = false
    this.loading = false;
  }
  cancel() {}
  save(formName: any) {
    let url = this.isCreate?this.$urls.createArticle:this.$urls.updatedArticle
    this.$refs[formName].validate((valid: any) => {
          if (valid) {
            
            this.$https.post(url, this.articleData).then((res:any) => {
               
            })
          }
        });
  }
  formatDate(date:string){
    return moment(date).format('YYYY-MM-DD HH-mm')
  }
}
</script>
<style lang="scss" scoped>
.edit {
  width: 100%;
  margin-top: 60px;
  .markdownEditor {
    margin: 20px;
  }
  .editTime{
    height: 20px;
    font-size: 12px;
    margin-bottom: 20px;
    span{
      color:#909399;
       float: right;
    }
  }
}
</style>


<template>
  <div class="articleDetail main" v-loading="loading">
    <h2>
      {{articleData.title}}
    </h2>
    <div class="articleAuthor">
      <span>{{articleData.author}}</span>
      <span>{{formatDate(articleData.createdAt)}}</span>
    </div>
    <div v-html="article">
    </div>
  </div>
</template>

<script lang="ts">
declare var document: any;
import { Component, Vue } from "vue-property-decorator";
import 'font-awesome/css/font-awesome.min.css'
import { markdownEditor } from "vue-simplemde";
import 'simplemde/dist/simplemde.min.css';
import moment from 'moment'
let hljs = require('highlight.js');
let marked = require('marked');
import 'highlight.js/styles/default.css';
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code:any, lang:any) {
          if (lang && hljs.getLanguage(lang)) {    
            return hljs.highlight(lang, code, true).value;
          } else {
            return hljs.highlightAuto(code).value;
          }
      }
  });
@Component({
  components: {
    markdownEditor
  }
})
export default class Article extends Vue {
  articleData: Object = {
    id: "",
    title: "",
    image: "",
    description: "",
    content: "",
    tag: "",
    flag: 1,
    author: ""
  };
  article:any = "";
  rules: Object = {};
  content: String = "";
  configs: Object = {
    spellChecker: false, // 禁用拼写检查
    renderingConfig: {
      singleLineBreaks: false,
      codeSyntaxHighlighting: true,
      autoDownloadFontAwesome: false
    }
  };
  loading: Boolean = false;
  mounted() {
    this.getDetail();
  }
  async getDetail() {
      let params = {
          id:this.$route.query.articleId
      }
    this.loading = true;
    const res: any = await this.$https.get(this.$urls.getArticleDetail,{params:{id:this.$route.query.articleId}}).then(
      (data: any) => data.data.data
    );
    this.articleData = res;
    this.article = marked((this.articleData as any).content,{
          sanitize: true
        });
    this.loading = false;
  }
  formatDate(date:string){
    return moment(date).format('YYYY-MM-DD')
  }
  cancel() {}
}
</script>
<style lang="scss" scoped>
.articleDetail {
  width: 100%;
  margin-top: 60px;
  padding: 20px;
  .markdownEditor {
    margin: 20px;
  }
  h2{
    text-align: center;
  }
  .articleAuthor{
    text-align: right;
    color:#909399;
    :nth-child(2){
      margin-left: 20px;
    }
  }
}
</style>


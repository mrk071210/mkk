<template>
  <div class="articleDetail" v-loading="loading"></div>
</template>

<script lang="ts">
declare var document: any;
import { Component, Vue } from "vue-property-decorator";
import { markdownEditor } from "vue-simplemde";

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
  rules: Object = {};
  content: String = "";
  configs: Object = {
    spellChecker: false, // 禁用拼写检查
    renderingConfig: {
      singleLineBreaks: false,
      codeSyntaxHighlighting: true
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
    const res: any = await this.$https.get(this.$urls.getArticleDetail).then(
      (data: any) => data
    );
    this.articleData = res;
    this.loading = false;
  }
  cancel() {}
}
</script>
<style lang="scss" scoped>
.articleDetail {
  display: inline-block;
  width: 100%;
  margin-top: 60px;
  .markdownEditor {
    margin: 20px;
  }
}
</style>


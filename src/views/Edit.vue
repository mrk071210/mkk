<template>
  <div class="edit">
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
  mounted() {}
  cancel() {}
  save(formName: any) {
    this.$refs[formName].validate((valid: any) => {
          if (valid) {
            this.$https.post(this.$urls.createArticle, this.articleData).then((res:any) => {
                console.log(res)
            })
          }
        });
  }
}
</script>
<style lang="scss" scoped>
.edit {
  display: inline-block;
  width: 100%;
  margin-top: 60px;
  .markdownEditor {
    margin: 20px;
  }
}
</style>


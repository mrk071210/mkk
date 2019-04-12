<template>
  <div class="edit">
      <markdown-editor class="markdownEditor" v-model="content" ref="markdownEditor"></markdown-editor>
  </div>
</template>

<script lang="ts">
declare var document: any;
import { Component, Vue } from 'vue-property-decorator'
import { markdownEditor } from 'vue-simplemde'

@Component({
  components: {
    markdownEditor
  }
})
export default class Edit extends Vue {
  content:String = ''
  configs:Object = {
    spellChecker: false, // 禁用拼写检查
     renderingConfig: {
          singleLineBreaks: false,
          codeSyntaxHighlighting: true
        },
  }
  mounted () {
    
  }
  
}
</script>
<style lang="scss" scoped>
    .edit{
        display: inline-block;
        width: 100%;
        margin-top: 60px;
        .markdownEditor{
            margin: 20px;
        }
    }
</style>


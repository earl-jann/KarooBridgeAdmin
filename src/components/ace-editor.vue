<template>
    <div :key="key" :style="{height: height ? px(height) : '100%',width: width ? px(width) : '100%'}">

    </div>
</template>
  
<script>
const ace = require('brace');

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    lang: String,
    theme: String,
    height: true,
    width: true,
    key: String,
  },
  data() {
    return {
      editor: null,
      contentBackup: '',
    };
  },
  methods: {
    px(n) {
      // if number, convert to pixels
      if (/^\d*$/.test(n)) {
        return n + 'px';
      }
      return n;
    },
  },
  watch: {
    value(val) {
      if (this.contentBackup !== val) this.editor.setValue(val, 1);
    },
  },
  mounted() {
    const vm = this;
    const lang = this.lang || 'text';
    const theme = this.theme || 'chrome';

    const editor = (vm.editor = ace.edit(this.$el));

    editor.key = this.key;

    this.$emit('init', editor);

    editor.$blockScrolling = Infinity;
    editor.getSession().setMode('ace/mode/' + lang);
    editor.setTheme('ace/theme/' + theme);
    editor.setValue(this.value, 1);

    editor.on('change', () => {
      const content = editor.getValue();
      vm.$emit('input', content);
      vm.contentBackup = content;
    });
  },
};
</script>
<template>
<!-- NEW ADD DELETE DOWNLOAD HELP -->
<!-- SAVE CLOSE SHOW/HIDE SETTINGS HELP -->
  <section>
    <!-- <div class="inline">
      <el-select v-model="value5" multiple placeholder="Select Script">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div> -->
    <div class="inline" style="margin-bottom: 20px;">
      <el-button
        size="small"
        @click="addTab(editableTabsValue2)"
        icon="document"
      >
        New Script
      </el-button>
      <el-button
        size="small"
        @click=""
        icon="upload"
      >
        Save Script
      </el-button>
      <!-- <el-button
        size="small"
        @click=""
        icon="delete"
      >
        Delete Script
      </el-button>
      <el-button
        size="small"
        @click=""
        icon="download"
      >
        Download Script
      </el-button> -->
    </div>


    <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs2"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        {{item.content}}
        <!-- <editor v-model="content" @init="initEditor" lang="html" theme="chrome" width="500" height="100"></editor> -->

      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>

  export default {
    data() {
      return {
        content: '',
        editableTabsValue2: '2',
        editableTabs2: [{
          title: 'Routes',
          name: '1',
          content: 'Routes content',
        }, {
          title: 'Rules',
          name: '2',
          content: 'Rules content',
        }],
        tabIndex: 2,
        options: [{
          value: 'Option1',
          label: 'Option1',
        }, {
          value: 'Option2',
          label: 'Option2',
        }, {
          value: 'Option3',
          label: 'Option3',
        }, {
          value: 'Option4',
          label: 'Option4',
        }, {
          value: 'Option5',
          label: 'Option5',
        }],
        value5: [],
      };
    },
    components: {
      // editor: require('vue2-ace-editor'),
    },
    methods: {
      initEditor(editor) {
        // require('brace/mode/html');
        // require('brace/theme/chrome');
      },
      addTab(targetName) {
        const newTabName = ++this.tabIndex + '';
        this.editableTabs2.push({
          title: 'Untitled Script ' + newTabName,
          name: newTabName,
          content: 'Untitled Script ' + newTabName + ' content',
        });
        this.editableTabsValue2 = newTabName;
      },
      removeTab(targetName) {
        const tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      },
    },
  };
</script>
<style scoped>
  .inline {
    display: inline-block;
  }
</style>

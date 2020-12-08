<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="7">
        <el-card style="overflow-x: auto">
          <div slot="header">
            <span>菜单</span>
            <el-button v-has-permission="`MENU_MANAGER:BTN_ADD`" style="float: right; padding: 3px 0" icon="el-icon-circle-plus-outline" type="text" @click="menuDialogOpen( 'create')">添加菜单</el-button>
          </div>
          <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-tree
              v-loading="menuTreeLoading"
              :data="menuTree"
              default-expand-all
              :expand-on-click-node="false"
              :highlight-current="true"
              node-key="id"
              :draggable="true"
              :allow-drop="menuAllowDrop"
              @node-drop="menuNodeDrop"
              @current-change="handlerCurrentChange"
            >
              <span slot-scope="{ node, data }" class="custom-tree-node">
                <span><svg-icon :icon-class="data.icon" /> {{ node.label }}</span>
                <span>
                  <el-button v-has-permission="`MENU_MANAGER:BTN_ADD`" type="text" size="mini" icon="el-icon-circle-plus-outline" @click="() => menuDialogOpen('create', node, data)">添加</el-button>
                  <el-button v-has-permission="`MENU_MANAGER:BTN_EDIT`" type="text" size="mini" icon="el-icon-edit-outline" @click="() => menuDialogOpen('update', node, data)">编辑</el-button>
                  <el-button v-has-permission="`MENU_MANAGER:BTN_DEL`" type="text" class="error" size="mini" icon="el-icon-circle-close" @click="() => menuRemove(node, data)">删除</el-button>
                </span>
              </span>
            </el-tree>
          </el-scrollbar>
        </el-card>
      </el-col>
      <el-col :span="17">
        <element-table :menu-id.sync="menuCurrentId" :menu-name.sync="menuCurrentName" />
      </el-col>
    </el-row>
    <el-dialog :title="menuFormData.formType === 'create'?'添加菜单':'编辑菜单'" :visible.sync="menuDialogVisible" :close-on-click-modal="false" width="700px" @closed="menuDialogClose">
      <el-form ref="menuFormRef" :model="menuFormData" :rules="menuFormRule" label-width="80px">
        <el-form-item label="组件编码" prop="code">
          <el-input v-model="menuFormData.code" placeholder="请输入组件编码" />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="menuFormData.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="父级菜单">
          <el-input v-model="menuFormData.parentTitle" disabled />
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="menuFormData.icon" placeholder="请输入图标" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="menuFormData.type" placeholder="请选择类型" :disabled="menuFormData.formType === 'update'">
            <el-option label="菜单" value="menu" />
            <el-option label="目录" value="dirt" />
          </el-select>
        </el-form-item>
        <el-form-item label="访问路径" prop="href">
          <el-input v-model="menuFormData.href" placeholder="请输入访问路径" />
        </el-form-item>
        <el-form-item label="资源路径" prop="path">
          <el-input v-model="menuFormData.path" placeholder="请输入资源路径">
            <template v-if="menuFormData.type === 'menu'" slot="prepend">@/views/</template>
          </el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="menuFormData.description" :autosize="{ minRows: 3 }" type="textarea" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item>
          <el-button v-if="menuFormData.formType === 'create'" type="primary" @click="menuAppend">立即添加</el-button>
          <el-button v-else type="primary" @click="menuEditor">保存</el-button>
          <el-button @click="menuDialogClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { tree, menuAdd, menuUpdate, menuDelete } from '@/api/admin/menu'
import ElementTable from './components/elementTable'

export default {
  name: 'MenuManager',
  components: { ElementTable },
  data() {
    return {
      menuTree: [],
      menuTreeLoading: false,
      menuCurrentNode: {},
      menuDialogVisible: false,
      menuFormData: {
        formType: 'create',
        id: '',
        code: '',
        title: '',
        parentId: '',
        parentTitle: '',
        href: '',
        path: '',
        icon: '',
        type: 'menu',
        description: ''
      },
      menuFormRule: {
        code: [
          { required: true, message: '请输入组件编码', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        href: [
          { required: true, message: '请输入访问路径', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入资源路径', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    menuCurrentId() {
      if (this.menuCurrentNode && this.menuCurrentNode.data) {
        return this.menuCurrentNode.data.id
      }
      return 0
    },
    menuCurrentName() {
      if (this.menuCurrentNode && this.menuCurrentNode.data) {
        return this.menuCurrentNode.data.title
      }
      return ''
    }
  },
  mounted() {
    this.menuTreeInit()
  },
  methods: {
    menuTreeInit() {
      this.menuTreeLoading = true
      tree().then(response => {
        this.menuTree = response.data
        this.menuTreeLoading = false
      })
    },
    menuAppend() {
      this.$refs.menuFormRef.validate((valid) => {
        if (valid) {
          menuAdd(this.menuFormData).then(response => {
            if (response.rel === true) {
              this.menuTreeInit()
              this.menuDialogClose()
              this.$message({ type: 'success', message: '添加菜单成功!' })
            }
          })
        }
      })
    },
    menuEditor() {
      this.$refs.menuFormRef.validate((valid) => {
        if (valid) {
          menuUpdate(this.menuFormData).then(response => {
            if (response.rel === true) {
              this.menuTreeInit()
              this.menuDialogClose()
              this.$message({ type: 'success', message: '编辑菜单成功!' })
            }
          })
        }
      })
    },
    menuRemove(node, data) {
      this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        menuDelete(data.id).then(response => {
          if (response.rel === true) {
            this.menuTreeInit()
            this.$message({ type: 'success', message: '删除菜单成功!' })
          }
        })
      }).catch(() => {})
    },
    // 打开菜单对话框
    menuDialogOpen(fromType, node, data) {
      this.menuFormData.formType = fromType
      if (data) {
        if (fromType === 'update') {
          this.menuFormData.id = data.id
          this.menuFormData.code = data.code
          this.menuFormData.title = data.title
          this.menuFormData.icon = data.icon
          this.menuFormData.href = data.href
          this.menuFormData.path = data.path
          this.menuFormData.parentId = data.parentId
          this.menuFormData.description = data.description
          this.menuFormData.type = data.type
          this.menuFormData.parentTitle = node.parent.data.title || '顶级菜单'
        } else {
          this.menuFormData.parentId = data.id
          this.menuFormData.parentTitle = data.title
        }
      } else {
        this.menuFormData.id = undefined
        this.menuFormData.parentId = '-1'
        this.menuFormData.parentTitle = '顶级菜单'
      }
      this.menuDialogVisible = true
    },
    // 关闭菜单对话框
    menuDialogClose() {
      this.$refs.menuFormRef.resetFields()
      this.menuFormData.icon = ''
      this.menuFormData.description = ''
      this.menuDialogVisible = false
    },
    // 只允许同父级下的节点拖拽
    menuAllowDrop(draggingNode, dropNode, type) {
      if (type !== 'inner') {
        if (draggingNode.data.parentId === dropNode.data.parentId) {
          return true
        }
      }
      return false
    },
    // 拖拽完成触发排序
    menuNodeDrop(draggingNode, dropNode, type, event) {
      console.log(dropNode.parent.childNodes)
    },
    // 当前菜单选中发生变更事件
    handlerCurrentChange(data, node) {
      if (this.menuCurrentNode && this.menuCurrentNode.id !== node.id) {
        this.menuCurrentNode = node
      }
    }
  }
}
</script>

<style type="less" scoped>
/deep/ .custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 12px;
}
.custom-tree-node .error {
  color: #F56C6C;
}
/deep/ .el-card__header, /deep/ .el-card__body {
  min-width: 380px;
}
.el-scrollbar {
  height: 710px;
}
/deep/ .scrollbar-wrapper {
  overflow-x: hidden !important;
}
</style>

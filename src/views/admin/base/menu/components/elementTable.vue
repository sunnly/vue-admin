<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
      <el-form-item><el-input v-model="elementNameSearch" placeholder="请输入内容" prefix-icon="el-icon-search" @keyup.enter.native="elementListInit" /></el-form-item>
      <el-form-item><el-button v-has-permission="`MENU_MANAGER:BTN_ELEMENT_ADD`" type="primary" @click="elementDialogOpen('create')">添加资源</el-button></el-form-item>
    </el-form>
    <el-table v-loading="elementListLoading" :data="elementList" width="100%" border>
      <el-table-column type="index" align="center" label="#" width="50" />
      <el-table-column align="center" prop="code" label="资源编码" min-width="200" />
      <el-table-column align="center" prop="type" label="资源类型" min-width="100" />
      <el-table-column align="center" prop="name" label="资源名称" min-width="100" />
      <el-table-column align="center" prop="uri" label="资源地址" min-width="200" />
      <el-table-column align="center" prop="method" label="请求方法" min-width="100" />
      <el-table-column align="header-center" prop="description" label="描述" min-width="200" />
      <el-table-column align="center" label="操作" min-width="160">
        <template slot-scope="scope">
          <el-button v-has-permission="`MENU_MANAGER:BTN_ELEMENT_EDIT`" type="primary" size="small" @click="elementDialogOpen('update', scope.row)">编辑</el-button>
          <el-button v-has-permission="`MENU_MANAGER:BTN_ELEMENT_DEL`" type="danger" size="small" @click="elementRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="elementListTotal" :page.sync="elementCurrentPage" :limit.sync="elementPageSize" @pagination="elementListInit" />
    <el-dialog :title="elementFormData.formType === 'create'?'添加资源':'编辑资源'" :visible.sync="elementDialogVisible" :close-on-click-modal="false" width="700px" @closed="elementDialogClose">
      <el-form ref="elementFormRef" :model="elementFormData" :rules="elementFormRule" label-width="80px">
        <el-form-item label="菜单名称">
          <span v-text="menuName" />
        </el-form-item>
        <el-form-item label="资源编码" prop="code">
          <el-input v-model="elementFormData.code" placeholder="请输入资源编码" />
        </el-form-item>
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="elementFormData.name" placeholder="请输入资源名称" />
        </el-form-item>
        <el-form-item v-if="elementFormData.type === 'uri'" label="资源地址" prop="uri">
          <el-input v-model="elementFormData.uri" placeholder="请输入资源地址" />
        </el-form-item>
        <el-form-item label="资源类型">
          <el-select v-model="elementFormData.type" placeholder="请选择资源类型" :disabled="elementFormData.formType === 'update'">
            <el-option label="按钮" value="button" />
            <el-option label="接口" value="uri" />
            <el-option label="菜单" value="menu" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="elementFormData.type === 'uri'" label="父级按钮">
          <el-select v-model="elementFormData.parentId" placeholder="请选择父级按钮">
            <el-option v-for="element in elementButtonList" :key="element.id" :label="element.name" :value="element.id" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="elementFormData.type === 'uri'" label="请求方法" prop="method">
          <el-select v-model="elementFormData.method" placeholder="请选择请求方法">
            <el-option label="GET" value="GET" />
            <el-option label="POST" value="POST" />
            <el-option label="PUT" value="PUT" />
            <el-option label="DELETE" value="DELETE" />
            <el-option label="HEAD" value="HEAD" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="elementFormData.description" :autosize="{ minRows: 3 }" type="textarea" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item>
          <el-button v-if="elementFormData.formType === 'create'" type="primary" @click="elementAppend">立即添加</el-button>
          <el-button v-else type="primary" @click="elementEditor">保存</el-button>
          <el-button @click="elementDialogClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { elementPage, elementAdd, elementUpdate, elementDelete, listElementByType } from '@/api/admin/element'

export default {
  name: 'Element',
  components: { Pagination },
  props: {
    menuId: {
      type: Number,
      default: undefined
    },
    menuName: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      elementNameSearch: '',
      elementListLoading: false,
      elementList: [],
      elementListTotal: 0,
      elementCurrentPage: 1,
      elementPageSize: 10,
      elementFormData: {
        formType: 'create',
        id: null,
        parentId: '',
        code: '',
        name: '',
        uri: null,
        type: 'button',
        method: null,
        description: null,
        menuId: 0
      },
      elementDialogVisible: false,
      elementFormRule: {
        code: [
          { required: true, message: '请输入资源编码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ],
        uri: [
          { required: true, message: '请输入资源地址', trigger: 'blur' }
        ],
        method: [
          { required: true, message: '请选择请求方法', trigger: 'blur' }
        ]
      },
      elementButtonList: []
    }
  },
  watch: {
    // 监听当前菜单变化
    menuId(newValue, oldValue) {
      this.elementListInit()
      this.elementFormData.menuId = newValue
      this.elementButtonInit()
    }
  },
  mounted() {
    if (this.menuId) {
      this.elementListInit()
      this.elementButtonInit()
    }
  },
  methods: {
    // 加载权限&按钮列表
    elementListInit() {
      this.elementListLoading = true
      const query = {
        menuId: this.menuId,
        name: this.elementNameSearch,
        page: this.elementCurrentPage,
        size: this.elementPageSize
      }
      elementPage(query).then(response => {
        this.elementListTotal = response.data.total
        this.elementList = response.data.rows
        this.elementListLoading = false
      })
    },
    elementDialogOpen(formType, row) {
      this.elementFormData.formType = formType
      if (this.menuId) {
        this.elementDialogVisible = true
        if (formType === 'update') {
          this.$nextTick(() => {
            this.elementFormData.id = row.id
            this.elementFormData.code = row.code
            this.elementFormData.name = row.name
            this.elementFormData.uri = row.uri
            this.elementFormData.type = row.type
            this.elementFormData.method = row.method
            this.elementFormData.description = row.description
            this.elementFormData.menuId = row.menuId
            this.elementFormData.parentId = parseInt(row.parentId)
          })
        }
      } else {
        this.$message({ type: 'warning', message: '请先选择菜单!' })
      }
    },
    elementDialogClose() {
      this.elementFormData.id = null
      this.elementFormData.code = ''
      this.elementFormData.name = ''
      this.elementFormData.uri = null
      this.elementFormData.type = 'button'
      this.elementFormData.method = null
      this.elementFormData.description = null
      this.elementDialogVisible = false
      this.$refs.elementFormRef.clearValidate()
    },
    elementAppend() {
      this.$refs.elementFormRef.validate((valid) => {
        if (valid) {
          elementAdd(this.elementFormData).then(response => {
            if (response.rel) {
              this.elementListInit()
              this.elementButtonInit()
              this.elementDialogClose()
            }
          })
        }
      })
    },
    elementEditor() {
      this.$refs.elementFormRef.validate((valid) => {
        if (valid) {
          elementUpdate(this.elementFormData).then(response => {
            if (response.rel) {
              this.elementListInit()
              this.elementButtonInit()
              this.elementDialogClose()
            }
          })
        }
      })
    },
    elementRemove(data) {
      this.$confirm('此操作将永久删除该资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        elementDelete(data.id).then(response => {
          if (response.rel === true) {
            this.elementListInit()
            this.elementButtonInit()
            this.$message({ type: 'success', message: '删除资源成功!' })
          } else {
            this.$message({ type: 'error', message: response.message })
          }
        })
      }).catch(() => {})
    },
    elementButtonInit() {
      listElementByType(this.menuId, 'button').then(response => {
        this.elementButtonList = response.data
      })
    }
  }
}
</script>

<style scoped>

</style>

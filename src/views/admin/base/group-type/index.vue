<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
      <el-form-item><el-input v-model="groupTypeNameSearch" placeholder="请输入内容" prefix-icon="el-icon-search" @keyup.enter.native="handleGroupTypeNameSearch" /></el-form-item>
      <el-form-item><el-button type="primary" @click="groupTypeDialogOpen('create')">添加用户组类型</el-button></el-form-item>
    </el-form>
    <el-table v-loading="groupTypeLoading" :data="groupTypeList" width="100%" border>
      <el-table-column type="index" align="center" label="#" width="50" />
      <el-table-column align="center" prop="code" label="用户组类型编码" min-width="100" />
      <el-table-column align="center" prop="name" label="用户组类型名称" min-width="100" />
      <el-table-column align="header-center" prop="description" label="描述" min-width="200" />
      <el-table-column align="center" prop="updName" label="最后更新人" min-width="100" />
      <el-table-column align="center" prop="updTime" label="最后更新时间" min-width="150" />
      <el-table-column align="center" prop="updHost" label="最后更新主机" min-width="100" />
      <el-table-column align="center" label="操作" min-width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="groupTypeDialogOpen('update', scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="groupTypeRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="groupTypeListTotal" :page="groupTypeCurrentPage" :limit="groupTypePageSize" @pagination="groupTypeListInit" />
    <el-dialog :title="groupTypeFormData.formType === 'create'?'添加用户组类型':'编辑用户组类型'" :visible.sync="groupTypeDialogVisible" :close-on-click-modal="false" width="700px" @closed="groupTypeDialogClose">
      <el-form ref="groupTypeFormRef" :model="groupTypeFormData" :rules="groupTypeFormRule" label-width="auto">
        <el-form-item label="类型编码" prop="code">
          <el-input v-model="groupTypeFormData.code" placeholder="请输入用户组类型编码" />
        </el-form-item>
        <el-form-item label="类型名称" prop="name">
          <el-input v-model="groupTypeFormData.name" placeholder="请输入用户组类型名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="groupTypeFormData.description" :autosize="{ minRows: 3 }" type="textarea" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item>
          <el-button v-if="groupTypeFormData.formType === 'create'" type="primary" @click="groupTypeAppend">立即添加</el-button>
          <el-button v-else type="primary" @click="groupTypeEditor">保存</el-button>
          <el-button @click="groupTypeDialogClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { page, groupTypeAdd, groupTypeUpdate, groupTypeDelete } from '@/api/admin/groupType'

export default {
  name: 'GroupTypeManager',
  components: { Pagination },
  data() {
    return {
      groupTypeNameSearch: '',
      groupTypeLoading: false,
      groupTypeList: [],
      groupTypeListTotal: 0,
      groupTypeCurrentPage: 1,
      groupTypePageSize: 10,
      groupTypeFormData: {
        formType: 'create',
        id: undefined,
        code: '',
        name: '',
        description: ''
      },
      groupTypeDialogVisible: false,
      groupTypeFormRule: {
        code: [
          { required: true, message: '请输入用户组类型编码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户组类型名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.groupTypeListInit()
  },
  methods: {
    groupTypeListInit() {
      this.groupTypeLoading = true
      const query = {
        page: this.groupTypeCurrentPage,
        size: this.groupTypePageSize,
        name: this.groupTypeNameSearch
      }
      page(query).then(response => {
        this.groupTypeList = response.data.rows
        this.groupTypeListTotal = response.data.total
        this.groupTypeLoading = false
      })
    },
    handleGroupTypeNameSearch() { this.groupTypeListInit() },
    groupTypeAppend() {
      this.$refs.groupTypeFormRef.validate((valid) => {
        if (valid) {
          groupTypeAdd(this.groupTypeFormData).then(response => {
            if (response.rel) {
              this.groupTypeListInit()
              this.groupTypeDialogClose()
            }
          })
        }
      })
    },
    groupTypeEditor() {
      this.$refs.groupTypeFormRef.validate((valid) => {
        if (valid) {
          groupTypeUpdate(this.groupTypeFormData).then(response => {
            if (response.rel) {
              this.groupTypeListInit()
              this.groupTypeDialogClose()
            }
          })
        }
      })
    },
    groupTypeRemove(row) {
      this.$confirm('此操作将永久删除该用户组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        groupTypeDelete(row.id).then(response => {
          if (response.rel === true) {
            this.groupTypeListInit()
            this.$message({ type: 'success', message: '删除用户成功!' })
          }
        })
      }).catch(() => {})
    },
    groupTypeDialogOpen(formType, row) {
      this.groupTypeDialogVisible = true
      this.groupTypeFormData.formType = formType
      if (formType === 'update') {
        this.groupTypeFormData.id = row.id
        this.groupTypeFormData.code = row.code
        this.groupTypeFormData.name = row.name
        this.groupTypeFormData.description = row.description
      }
    },
    groupTypeDialogClose() {
      this.$refs.groupTypeFormRef.resetFields()
      this.groupTypeFormData.id = ''
      this.groupTypeFormData.code = ''
      this.groupTypeFormData.name = ''
      this.groupTypeFormData.description = ''
      this.groupTypeDialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>

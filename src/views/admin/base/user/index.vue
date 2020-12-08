<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
      <el-form-item><el-input v-model="userNameSearch" placeholder="请输入内容" prefix-icon="el-icon-search" @keyup.enter.native="handleUserNameSearch" /></el-form-item>
      <el-form-item v-has-permission="`USER_MANAGER:BTN_ADD`"><el-button type="primary" @click="userDialogOpen('create')">添加用户</el-button></el-form-item>
    </el-form>
    <el-table v-loading="userListLoading" :data="userList" border>
      <el-table-column type="index" align="center" label="#" width="50" />
      <el-table-column align="center" prop="username" label="账户" min-width="100" />
      <el-table-column align="center" prop="name" label="姓名" min-width="100" />
      <el-table-column align="center" prop="sex" label="性别" min-width="50" />
      <el-table-column align="center" prop="birthday" label="生日" min-width="100" />
      <el-table-column align="center" prop="mobilePhone" label="手机号" min-width="120" />
      <el-table-column align="center" prop="email" label="邮箱" min-width="160" />
      <el-table-column align="center" prop="status" label="状态" min-width="80">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === '1' ? 'success' : 'info'" effect="dark" disable-transitions>
            {{ userStatusEnum[scope.row.status] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="header-center" prop="description" label="描述" min-width="200" />
      <el-table-column align="center" label="操作" min-width="220">
        <template slot-scope="scope">
          <el-button v-has-permission="`USER_MANAGER:BTN_EDIT`" type="primary" size="small" @click="userDialogOpen('update', scope.row)">编辑</el-button>
          <el-button v-if="scope.row.status === '1'" v-has-permission="`USER_MANAGER:BTN_LOCK`" size="small">冻结</el-button>
          <el-button v-else v-has-permission="`USER_MANAGER:BTN_LOCK`" size="small">解冻</el-button>
          <el-button v-has-permission="`USER_MANAGER:BTN_DEL`" type="danger" size="small" @click="userRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="userListTotal" :page.sync="userCurrentPage" :limit.sync="userPageSize" @pagination="userListInit" />
    <el-dialog :title="userFormData.formType==='create'?'添加用户':'编辑用户'" :visible.sync="userDialogVisible" :close-on-click-modal="false" width="700px" @closed="userDialogClose">
      <el-form ref="userFormRef" :model="userFormData" :rules="userFormRule" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userFormData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="账户" prop="username">
          <el-input v-model="userFormData.username" placeholder="请输入账户" />
        </el-form-item>
        <el-form-item v-if="userFormData.formType === 'create'" label="密码" prop="password">
          <el-input v-model="userFormData.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="userFormData.sex" placeholder="请选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="userFormData.birthday" value-format="yyyy-MM-dd" type="date" placeholder="请选择生日" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userFormData.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userFormData.mobilePhone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="userFormData.address" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="userFormData.description" :autosize="{ minRows: 3 }" type="textarea" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item>
          <el-button v-if="userFormData.formType === 'create'" type="primary" @click="userAppend">立即添加</el-button>
          <el-button v-else type="primary" @click="userEditor">保存</el-button>
          <el-button @click="userDialogClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { page, userAdd, userUpdate, userDelete } from '@/api/admin/user'
import Pagination from '@/components/Pagination'
import MD5 from 'crypto-js/md5'

export default {
  name: 'UserManager',
  components: { Pagination },
  data() {
    return {
      userStatusEnum: { '1': '正常', '0': '冻结' },
      userDialogVisible: false,
      userListLoading: false,
      userNameSearch: '',
      userList: [],
      userListTotal: 0,
      userCurrentPage: 1,
      userPageSize: 10,
      userFormData: {
        formType: 'create',
        id: '',
        name: '',
        username: '',
        password: '',
        sex: '男',
        email: '',
        birthday: '',
        mobilePhone: '',
        address: '',
        description: ''
      },
      userFormRule: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入账户', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.userListInit()
  },
  methods: {
    userListInit() {
      this.userListLoading = true
      const query = {
        page: this.userCurrentPage,
        size: this.userPageSize,
        name: this.userNameSearch
      }
      page(query).then(response => {
        this.userList = response.data.rows
        this.userListTotal = response.data.total
        this.userListLoading = false
      })
    },
    userAppend() {
      this.$refs.userFormRef.validate((valid) => {
        if (valid) {
          const formData = JSON.parse(JSON.stringify(this.userFormData))
          formData.password = MD5(this.userFormData.password).toString()
          userAdd(formData).then(response => {
            if (response.rel) {
              this.userListInit()
              this.userDialogClose()
            } else {
              this.$message({ type: 'error', message: response.message })
            }
          })
        }
      })
    },
    userEditor() {
      this.$refs.userFormRef.validate((valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.userFormData))
          delete params.password
          userUpdate(params).then(response => {
            if (response.rel) {
              this.userListInit()
              this.userDialogClose()
            } else {
              this.$message({ type: 'error', message: response.message })
            }
          })
        }
      })
    },
    userRemove(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userDelete(row.id).then(response => {
          if (response.rel === true) {
            this.userListInit()
            this.$message({ type: 'success', message: '删除用户成功!' })
          }
        })
      }).catch(() => {})
    },
    handleUserNameSearch() {
      this.userListInit()
    },
    userDialogOpen(formType, row) {
      this.userFormData.formType = formType
      this.userDialogVisible = true
      if (formType === 'update') {
        this.userFormData.id = row.id
        this.userFormData.name = row.name
        this.userFormData.username = row.username
        this.userFormData.sex = row.sex
        this.userFormData.email = row.email
        this.userFormData.birthday = row.birthday
        this.userFormData.mobilePhone = row.mobilePhone
        this.userFormData.address = row.address
        this.userFormData.description = row.description
      }
    },
    userDialogClose() {
      this.$refs.userFormRef.resetFields()
      this.userFormData.id = ''
      this.userFormData.name = ''
      this.userFormData.username = ''
      this.userFormData.password = ''
      this.userFormData.birthday = ''
      this.userFormData.email = ''
      this.userFormData.mobilePhone = ''
      this.userFormData.address = ''
      this.userFormData.description = ''
      this.userDialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>

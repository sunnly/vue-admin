<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
      <el-form-item><el-input v-model="serviceNameSearch" placeholder="请输入内容" prefix-icon="el-icon-search" @keyup.enter.native="handleServiceNameSearch" /></el-form-item>
      <el-form-item><el-button type="primary" @click="serviceDialogOpen('create')">添加服务</el-button></el-form-item>
    </el-form>
    <el-table v-loading="serviceListLoading" :data="serviceList" width="100%" border>
      <el-table-column type="index" align="center" label="#" width="50" />
      <el-table-column align="center" prop="code" label="服务编码" min-width="200" />
      <el-table-column align="center" prop="secret" label="服务密钥" min-width="200" />
      <el-table-column align="center" prop="name" label="服务名称" min-width="200" />
      <el-table-column align="center" prop="description" label="描述" width="300" />
      <el-table-column align="center" prop="crtTime" label="更新时间" min-width="200" />
      <el-table-column align="center" prop="crtName" label="更新人" min-width="100" />
      <el-table-column align="center" prop="crtHost" label="更新主机" min-width="120" />
      <el-table-column align="center" label="操作" min-width="220" fixed="right">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="authorizeDialogOpen(scope.row)">授权</el-button>
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="serviceListTotal" :page.sync="serviceCurrentPage" :limit.sync="servicePageSize" @pagination="serviceListInit" />
    <el-dialog :title="serviceFormData.formType === 'create'?'添加服务':'编辑服务'" :visible.sync="serviceDialogVisible" :close-on-click-modal="false" width="700px" @closed="serviceDialogClose">
      <el-form ref="groupTypeFormRef" :model="serviceFormData" :rules="serviceFormRule" label-width="auto">
        <el-form-item label="服务编码" prop="code">
          <el-input v-model="serviceFormData.code" placeholder="请输入服务编码" />
        </el-form-item>
        <el-form-item label="服务密钥" prop="secret">
          <el-input v-model="serviceFormData.secret" placeholder="请输入服务密钥" />
        </el-form-item>
        <el-form-item label="服务名称" prop="name">
          <el-input v-model="serviceFormData.name" placeholder="请输入服务名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="serviceFormData.description" :autosize="{ minRows: 3 }" type="textarea" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item>
          <el-button v-if="serviceFormData.formType === 'create'" type="primary" @click="serviceAppend">立即添加</el-button>
          <el-button v-else type="primary" @click="serviceEditor">保存</el-button>
          <el-button @click="serviceDialogClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="服务授权" :visible.sync="authorizeDialogVisible" :close-on-click-modal="false" width="700px">
      <el-form label-width="auto">
        <el-form-item label="允许访问的服务">
          <el-checkbox-group v-model="allowServiceList">
            <el-checkbox v-for="item in serviceListAll" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="allowServiceEditor">保存</el-button>
          <el-button @click="authorizeDialogClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { servicePage, serviceAll, serviceClient } from '@/api/auth/service'

export default {
  name: 'ServiceManager',
  components: { Pagination },
  data() {
    return {
      serviceNameSearch: '',
      serviceList: [],
      serviceListLoading: false,
      serviceListTotal: 0,
      serviceCurrentPage: 1,
      servicePageSize: 10,
      serviceFormData: {
        formType: 'create',
        code: '',
        secret: '',
        name: '',
        description: ''
      },
      serviceFormRule: {
        code: [
          { required: true, message: '请输入服务编码', trigger: 'blur' }
        ],
        secret: [
          { required: true, message: '请输入服务密钥', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入服务名称', trigger: 'blur' }
        ]
      },
      serviceListAll: [],
      serviceDialogVisible: false,
      authorizeDialogVisible: false,
      allowServiceList: []
    }
  },
  mounted() {
    this.serviceListInit()
    this.serviceListAllInit()
  },
  methods: {
    handleServiceNameSearch() {},
    serviceListInit() {
      servicePage().then(response => {
        this.serviceList = response.data.rows
        this.serviceListTotal = response.data.total
      })
    },
    serviceListAllInit() {
      serviceAll().then(response => {
        this.serviceListAll = response.result
      })
    },
    allowServiceEditor() {
      console.log(this.allowServiceList)
    },
    serviceAppend() {},
    serviceEditor() {},
    serviceDialogOpen() {
      this.serviceDialogVisible = true
    },
    serviceDialogClose() {
      this.serviceDialogVisible = false
    },
    authorizeDialogOpen(row) {
      serviceClient(row.id).then(response => {
        response.data.forEach(row => {
          this.allowServiceList.push(row.id)
        })
      })
      this.authorizeDialogVisible = true
    },
    authorizeDialogClose() {
      this.allowServiceList = []
      this.authorizeDialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>

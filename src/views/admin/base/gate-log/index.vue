<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
      <el-form-item><el-input v-model="gateLogNameSearch" placeholder="请输入内容" prefix-icon="el-icon-search" @keyup.enter.native="handleGateLogNameSearch" /></el-form-item>
    </el-form>
    <el-table v-loading="gateLogListLoading" :data="gateLogList" width="100%" border>
      <el-table-column type="index" align="center" label="#" width="50" />
      <el-table-column align="center" prop="menu" label="操作名称" min-width="110" />
      <el-table-column align="center" prop="opt" label="操作" min-width="90" />
      <el-table-column align="center" prop="uri" label="访问路径" min-width="200" />
      <el-table-column align="center" prop="body" label="请求数据" width="500" />
      <el-table-column align="center" prop="crtTime" label="操作时间" min-width="150" />
      <el-table-column align="center" prop="crtName" label="操作人" min-width="100" />
      <el-table-column align="center" prop="crtHost" label="操作主机" min-width="120" />
    </el-table>
    <pagination :total="gateLogListTotal" :page.sync="gateLogCurrentPage" :limit.sync="gateLogPageSize" @pagination="gateLogInit" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { page } from '@/api/admin/gateLog'

export default {
  name: 'GateLogManager',
  components: { Pagination },
  data() {
    return {
      gateLogListLoading: false,
      gateLogNameSearch: '',
      gateLogList: [],
      gateLogListTotal: 0,
      gateLogCurrentPage: 1,
      gateLogPageSize: 10
    }
  },
  mounted() {
    this.gateLogInit()
  },
  methods: {
    gateLogInit() {
      this.gateLogListLoading = true
      const query = {
        page: this.gateLogCurrentPage,
        size: this.gateLogPageSize,
        crtName: this.gateLogNameSearch
      }
      page(query).then(response => {
        this.gateLogList = response.data.rows
        this.gateLogListTotal = response.data.total
        this.gateLogListLoading = false
      })
    },
    handleGateLogNameSearch() {
      this.gateLogInit()
    }
  }
}
</script>

<style scoped>

</style>

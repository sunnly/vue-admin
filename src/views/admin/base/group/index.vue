<template>
  <div class="app-container">
    <el-tabs v-model="groupTypeCurrentCode" type="card" @tab-click="handleTabsClick">
      <el-tab-pane v-for="groupType in groupTypeAllList" :key="groupType.code" :label="groupType.name" :name="groupType.code">
        <el-row v-show="!groupFormVisible">
          <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
            <el-form-item><el-input placeholder="请输入内容" prefix-icon="el-icon-search" /></el-form-item>
            <el-form-item><el-button v-has-permission="`GROUP_MANAGER:BTN_ADD`" type="primary" @click="groupOpenCreate">添加{{ groupType.name }}</el-button></el-form-item>
          </el-form>
          <el-table v-loading="groupDataListLoading" :data="groupDataList" border>
            <el-table-column type="index" label="#" width="50" align="center" />
            <el-table-column align="center" prop="name" label="名称" min-width="100" />
            <el-table-column align="center" prop="code" label="编码" min-width="100" />
            <el-table-column align="center" prop="description" label="描述" min-width="250" />
            <el-table-column align="center" prop="crtName" label="创建人" min-width="60" />
            <el-table-column align="center" prop="crtTime" label="创建时间" min-width="90" />
            <el-table-column align="center" label="操作" min-width="100">
              <template slot-scope="scope">
                <el-button v-has-permission="`GROUP_MANAGER:BTN_EDIT`" type="primary" size="small" @click="groupOpenEditor(scope.row)">编辑</el-button>
                <el-button v-has-permission="`GROUP_MANAGER:BTN_DEL`" type="danger" size="small" @click="groupRemove(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination :total="groupListTotal" :page.sync="groupCurrentPage" :limit.sync="groupPageSize" @pagination="groupListInit" />
        </el-row>
        <GroupForm
          v-show="groupFormVisible"
          :ref="`groupFormRef${groupType.id}`"
          :group-type-id.sync="groupTypeIdCurrent"
          :group-list-init="groupListInit"
          :group-form-visible.sync="groupFormVisible"
          :group-form-type.sync="groupFormType"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { all } from '@/api/admin/groupType'
import { groupDelete, groupListPage } from '@/api/admin/group'
import Pagination from '@/components/Pagination'
import GroupForm from './components/group-form'

export default {
  name: 'GroupManager',
  components: { Pagination, GroupForm },
  data() {
    return {
      groupTypeIdCurrent: null,
      groupTypeAllList: [],
      groupTypeCurrentCode: '',
      groupTypeCurrentTab: undefined,
      groupDataListLoading: false,
      groupDataList: [],
      groupListTotal: 0,
      groupCurrentPage: 1,
      groupPageSize: 10,
      groupFormVisible: false,
      groupFormType: 'create',
      groupCurrent: undefined
    }
  },
  mounted() {
    this.groupTypeAllListInit()
  },
  methods: {
    groupTypeAllListInit() {
      all().then(response => {
        this.groupTypeAllList = response.result
        this.groupTypeAllList.forEach(groupType => { groupType.groupTree = [] })
        if (this.groupTypeAllList && this.groupTypeAllList.length > 0) {
          this.groupTypeCurrentTab = this.groupTypeAllList[0]
          this.groupTypeIdCurrent = this.groupTypeCurrentTab.id
          this.groupTypeCurrentCode = this.groupTypeCurrentTab.code
          this.groupListInit()
        }
      })
    },
    handleTabsClick(tab) {
      this.groupTypeCurrentTab = this.groupTypeAllList[tab.index]
      this.groupTypeIdCurrent = this.groupTypeCurrentTab.id
      this.groupTypeCurrentCode = this.groupTypeCurrentTab.code
      this.groupFormVisible = false
      this.groupListInit()
    },
    groupListInit() {
      this.groupDataListLoading = true
      const query = { page: 1, size: 10, groupTypeId: this.groupTypeCurrentTab.id }
      groupListPage(query).then(r => {
        this.groupDataList = r.data.rows
        this.groupDataListLoading = false
      })
    },
    groupOpenCreate() {
      this.groupFormType = 'create'
      this.groupFormVisible = true
      this.$refs[`groupFormRef${this.groupTypeCurrentTab.id}`][0].loadMenuAuthority()
    },
    groupOpenEditor(row) {
      this.groupFormType = 'update'
      this.groupFormVisible = true
      this.$refs[`groupFormRef${this.groupTypeCurrentTab.id}`][0].loadMenuAuthority(row)
    },
    groupRemove(data) {
      this.$confirm('此操作将永久删除该用户组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        groupDelete(data.id).then(response => {
          if (response.rel === true) {
            this.groupListInit()
            this.$message({ type: 'success', message: '删除用户组成功!' })
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>

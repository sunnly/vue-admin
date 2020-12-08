<template>
  <el-row>
    <el-form ref="groupFormRef" :model="groupFormData" :rules="groupFormRule" label-width="60px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="名称" prop="name">
            <el-input v-model="groupFormData.name" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="编码" prop="code">
            <el-input v-model="groupFormData.code" placeholder="请输入编码" />
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="groupFormData.state">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="groupFormData.description" type="textarea" :autosize="{ minRows: 3 }" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="权限">
        <group-authority ref="groupAuthorityRef" :menu-tree-data="menuTreeData" />
      </el-form-item>
      <el-form-item>
        <el-button v-if="groupFormType === 'create'" type="primary" @click="groupAppend">立即添加</el-button>
        <el-button v-else type="primary" @click="groupEditor">保存</el-button>
        <el-button @click="groupFormClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
import GroupAuthority from './group-authority'
import { getMenuAuthority, groupAdd, groupUpdate, modifyAuthorityMenu, modifyAuthorityElement } from '@/api/admin/group'

export default {
  name: 'GroupForm',
  components: { GroupAuthority },
  props: {
    groupTypeId: {
      type: Number,
      default: undefined
    },
    groupListInit: {
      type: Function,
      default: undefined
    },
    groupFormVisible: {
      type: Boolean,
      default: undefined
    },
    groupFormType: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      groupFormData: {
        id: null,
        code: '',
        name: '',
        state: '1',
        parentId: -1,
        groupType: 1,
        description: ''
      },
      groupFormRule: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ]
      },
      menuTreeData: []
    }
  },
  methods: {
    loadMenuAuthority(group) {
      let groupId = null
      if (group) {
        groupId = group.id
        this.groupFormData.id = group.id
        this.groupFormData.name = group.name
        this.groupFormData.code = group.code
        this.groupFormData.description = group.description
        this.groupType = group.groupType
      }
      getMenuAuthority(groupId).then(response => {
        this.menuTreeData = response.data
      })
    },
    groupAppend() {
      this.$refs.groupFormRef.validate((valid) => {
        if (valid) {
          this.groupFormData.groupType = this.groupTypeId
          const authority = this.$refs.groupAuthorityRef.getMenuAuthoritySelectList()
          console.log(authority)
          groupAdd(this.groupFormData).then(response => {
            if (response.rel) {
              modifyAuthorityMenu(response.data.id, authority.menuIds).then(resp => {
                modifyAuthorityElement(response.data.id, authority.elementIds).then(r => {
                  this.groupListInit()
                  this.groupFormClose()
                  this.$message({ type: 'success', message: '添加用户组成功' })
                })
              })
            }
          })
        }
      })
    },
    groupEditor() {
      this.$refs.groupFormRef.validate((valid) => {
        if (valid) {
          const authority = this.$refs.groupAuthorityRef.getMenuAuthoritySelectList()
          groupUpdate(this.groupFormData).then(response => {
            if (response.rel) {
              modifyAuthorityMenu(this.groupFormData.id, authority.menuIds).then(resp => {
                modifyAuthorityElement(this.groupFormData.id, authority.elementIds).then(r => {
                  this.groupListInit()
                  this.groupFormClose()
                  this.$message({ type: 'success', message: '编辑用户组成功' })
                })
              })
            }
          })
        }
      })
    },
    groupFormClose() {
      this.$refs.groupFormRef.resetFields()
      this.groupFormData.id = null
      this.groupFormData.name = ''
      this.groupFormData.code = ''
      this.groupFormData.description = ''
      this.menuTreeData = []
      this.$emit('update:groupFormVisible', false)
    }
  }
}
</script>

<style scoped>

</style>

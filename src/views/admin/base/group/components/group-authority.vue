<template>
  <el-table
    :data="menuTreeData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  >
    <el-table-column label="模块/菜单" width="350">
      <template slot-scope="scope">
        <el-checkbox :value="scope.row.checked" @change="checked => handleMenuCheckChange(scope.row, checked)">{{ scope.row.text }}</el-checkbox>
      </template>
    </el-table-column>
    <el-table-column label="基础权限">
      <template slot-scope="scope">
        <el-checkbox v-for="item in scope.row.elements" :key="item.id" :value="item.checked" @change="checked => handleElementCheckChange(scope.row, item, checked)">{{ item.name }}</el-checkbox>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'GroupAuthority',
  props: {
    menuTreeData: {
      type: Array,
      default: undefined
    }
  },
  data() {
    return {
      menuIds: [],
      elementIds: []
    }
  },
  methods: {
    handleMenuCheckChange(row, checked) {
      row.checked = checked
      this.checkedElement(row.elements, checked)
      this.checkedMenuChild(row.children, checked)
      let parentId = row.parentId
      while (parentId !== -1) {
        const parent = this.queryMenuParent(this.menuTreeData, parentId)
        parentId = parent.parentId
        if (checked) { parent.checked = checked } else {
          // 查找是否取消父级菜单
          let p = false
          parent.children.forEach(item => { if (item.checked) p = item.checked })
          parent.checked = p
        }
      }
    },
    handleElementCheckChange(row, element, checked) {
      // 勾选自己
      element.checked = checked
      // 查找父级是否取消勾选
      let c = false
      row.elements.forEach(i => {
        if (i.checked) {
          c = i.checked
        }
      })
      let parentId = row.id
      while (parentId !== -1) {
        const parent = this.queryMenuParent(this.menuTreeData, parentId)
        parentId = parent.parentId
        // 勾选父级
        if (checked) { parent.checked = checked } else {
          // 取消勾选当前菜单
          row.checked = c
          // 查找是否取消父级菜单
          let p = false
          parent.children.forEach(item => { if (item.checked) p = item.checked })
          parent.checked = p
        }
      }
    },
    checkedMenuChild(child, checked) {
      child.forEach(item => {
        item.checked = checked
        this.checkedElement(item.elements, checked)
        if (item.children && item.children.length > 0) {
          this.checkedMenuChild(item.children, checked)
        }
      })
    },
    queryMenuParent(parent, id) {
      for (let i = 0; i < parent.length; i++) {
        const item = parent[i]
        if (item.id === id) {
          return item
        } else {
          if (item.children.length > 0) {
            const menu = this.queryMenuParent(item.children, id)
            if (menu) return menu
          }
        }
      }
    },
    checkedElement(elements, checked) {
      elements.forEach(item => {
        item.checked = checked
      })
    },
    getMenuAuthoritySelectList() {
      this.menuIds = []
      this.elementIds = []
      this.loop(this.menuTreeData)
      return { menuIds: this.menuIds, elementIds: this.elementIds }
    },
    loop(menuList) {
      menuList.forEach(item => {
        if (item.checked) {
          this.menuIds.push(item.id)
          item.elements.forEach(i => {
            if (i.checked) {
              this.elementIds.push(i.id)
            }
          })
        }
        if (item.children && item.children.length > 0) {
          this.loop(item.children)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

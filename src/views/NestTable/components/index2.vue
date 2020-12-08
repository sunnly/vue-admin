<template>
  <div>
    <el-table
      v-for="(title1, idx1) in titles"
      :data="datas[idx1]"
      :ref="'table1'"
      @click="aaa()"
      style="width: 100%">

      <!--判断有没有孩子节点-->
      <el-table-column
        v-if="title1.children && title1.children.length>0"
        type="expand"
        fixed
      >
        {{datas[idx1]}}
        <nest-table :titles="title1.children" :datas="[]" ></nest-table>
        <!--<template
          v-for="(title2, idx2) in title1.children"
          v-if="datas[idx1][idx2] && datas[idx1][idx2].children && datas[idx1][idx2].children.length>0"
        >{{title2}}
          <nest-table :titles="[]" :datas="datas[idx1][idx2].children" ></nest-table>
        </template>-->
        <!--<NestTable
          v-for="(title2, idx2) in title1.children"
          v-if="datas[idx1][idx2] && datas[idx1][idx2].children && datas[idx1][idx2].children.length>0"
          :titles="title2" :datas="datas[idx1][idx2].children"></NestTable>-->
      </el-table-column>
      <el-table-column
        v-for="(clo, idx2) in title1.clomes"
        :label="clo.label"
        :prop="clo.prop">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import NestTable from "./index"
export default {
  name: 'nestTable',
  components:{NestTable},
  props:{
    titles:{
      type: Array,
      default: []
    },
    datas: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped>

</style>

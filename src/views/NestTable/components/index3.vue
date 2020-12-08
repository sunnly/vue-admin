<template>
  <div>
    <!-- {{datas}}<hr>
    {{title}}<hr>-->
    <el-table class="nest-table"
              :ref="'table1'"
              :data="datas"
              tooltip-effect="dark"
              style="width: 100%">
      <!--判断有没有孩子节点-->

      <template slot-scope="props"
                v-if="datas[props.$index] && datas[props.$index].children && datas[props.$index].children.length>0">

        <el-table-column
          v-if="title.children && title.children.length>0"
          type="expand"
          fixed
        >
          <nest-table v-if="datas[props.$index].children[idx].length>0"
                      v-for="(ti, idx) in title.children"
                      :datas="datas[props.$index].children[idx]"
                      :title="ti"></nest-table>
        </el-table-column>
      </template>

      <el-table-column
        v-for="(col, idx) in title.clomes"
        :label="col.label"
        :prop="col.prop">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import NestTable from "./index"

export default {
  name: 'nestTable',
  components: {NestTable},
  props: {
    title: {
      type: Object,
      default: {}
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

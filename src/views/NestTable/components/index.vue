<template>
  <div>
    <!-- {{datas}}<hr>
    {{title}}<hr>-->
    <el-table class="nest-table"
      :ref="'table1'"
      :data="datas"

              :header-row-class-name="arraySpanMethod"
      style="width: 100%">
      <!--:span-method="arraySpanMethod"-->
      <!--<el-table-column label="配送信息">-->

      <!--判断有没有孩子节点-->
      <el-table-column
        v-if="title.children && title.children.length>0"
        type="expand"
        fixed
      >
        <template slot-scope="props"
                  v-if="datas[props.$index] && datas[props.$index].children && datas[props.$index].children.length>0">

          <nest-table v-if="datas[props.$index].children[idx].length>0"
                      v-for="(ti, idx) in title.children"
                      :datas="datas[props.$index].children[idx]"
                      :title="ti"></nest-table>

        </template>
      </el-table-column>


      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <!--</el-table-column>-->
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
  },
  methods:{
    arraySpanMethod({ row, rowIndex}){
      if (rowIndex === 0){
        return [1,2]
      }
      // if (rowIndex % 2 === 0) {
      //   if (columnIndex === 0) {
      //     return [1, 2];
      //   } else if (columnIndex === 1) {
      //     return [0, 0];
      //   }
      // }
    }
  }
}
</script>

<style scoped>

</style>

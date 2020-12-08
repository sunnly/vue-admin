<template>
  <div>
    <el-table
      :data="tableData"
      :ref="'table1'"
      @click="aaa()"
      style="width: 100%">
      <el-table-column type="expand"
      fixed
      >
        <template slot-scope="props" v-if="tableData[props.$index].children" >
          {{'table1-'+props.$index}}
          <template
            v-for="(c1, idx1) in tableData[props.$index].children">
            <el-table
              ref="table1-2"
              :data="c1.datas"
              @click="aaa('table1','table1-'+idx1)"
              align="center"
              stripe>
              <el-table-column
                align="center"
                label="ID"
                prop="id">{{'table1-'+props.$index+'-'+idx1}}
              </el-table-column>
              <el-table-column
                align="center"
                label="名称"
                prop="name">
              </el-table-column>
              <el-table-column
                align="center"
                width="200px"
                label="操作"
                fixed="right"
                prop="cc">
              </el-table-column>
            </el-table>
          </template>
          <!---->
        </template>
      </el-table-column>
      <el-table-column
        label="报号"
        prop="id">
      </el-table-column>
      <el-table-column
        label="号"
        prop="pigeonhole">
      </el-table-column>
      <el-table-column
        label="日期"
        prop="date">
      </el-table-column>
      <el-table-column
        label="事期"
        prop="scene">
      </el-table-column>
      <el-table-column
        label="地点"
        prop="scenePlace">
      </el-table-column>
      <el-table-column
        label="报号"
        prop="id">
      </el-table-column>
      <el-table-column
        label="报号"
        prop="id">
      </el-table-column>
      <el-table-column
        label="号"
        prop="pigeonhole">
      </el-table-column>
      <el-table-column
        label="日期"
        prop="date">
      </el-table-column>
      <el-table-column
        label="事期"
        prop="scene">
      </el-table-column>
      <el-table-column
        label="地点"
        prop="scenePlace">
      </el-table-column>
      <el-table-column
        label="报号"
        prop="id">
      </el-table-column>
      <el-table-column
        label="号"
        prop="pigeonhole">
      </el-table-column>
      <el-table-column
        label="日期"
        prop="date">
      </el-table-column>
      <el-table-column
        label="事期"
        prop="scene">
      </el-table-column>
      <el-table-column
        label="地点"
        prop="scenePlace">
      </el-table-column>
      <el-table-column
        label="号"
        prop="pigeonhole">
      </el-table-column>
      <el-table-column
        label="日期"
        prop="date">
      </el-table-column>
      <el-table-column
        label="事期"
        prop="scene">
      </el-table-column>
      <el-table-column
        label="地点"
        prop="scenePlace">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="诊断"
        prop="clinic">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="legal">
      </el-table-column>
      <el-table-column
        label="方式"
        prop="pay">
      </el-table-column>
      <el-table-column
        label="有无"
        fixed="right"
        width="300px"
        prop="survey">
      </el-table-column>
    </el-table>
    <el-button @click="aaa(tableData[1])">选中第二行</el-button>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      tableData: [
        {
          id: 'P201900001',
          pigeonhole: 'GD123456789',
          date: '2019-1-31',
          scene: '2019-1-31',
          scenePlace: '中国',
          name: '鲜花',
          clinic: '临床',
          legal: '已支付',
          pay: '转账',
          survey: '2019-02-23',
          children:[{
            table: 'aaa',
            datas: [{
              id: 'aa',
              name: 'bb',
              cc: 'ccc'
            }]
          },{
            table: 'bbb',
            datas: [{
              id: 'bbbb',
              name: 'ccccc',
              cc: 'ddddd'
            }]
          }]
        },
        {
          id: 'P201900002',
          pigeonhole: 'GD123456789',
          date: '2019-1-31',
          scene: '2019-1-31',
          scenePlace: '中国',
          name: '鲜花',
          clinic: 'hjgrf', //
          legal: '已支付',
          pay: '转账',
          survey: '2019-02-23'
        },
        {
          id: 'P201900003',
          pigeonhole: 'GD123456789',
          date: '2019-1-31',
          scene: '2019-1-31',
          scenePlace: '中国',
          name: '鲜花',
          clinic: 'hjgrf',
          legal: '已支付',
          pay: '内部转账',
          survey: '2019-02-23'
        }
      ],
      dataList: [
        {
          duty: '责任',
          guard: '预防',
          accident: '意外',
          base: '基础',
          import: '重大'
        },
        {
          duty: '金额',
          guard: '3000',
          accident: '1000',
          base: '2000',
          import: '4000'
        }
      ]
    }
  },
  methods:{
    aaa(p,q){
      console.log(this.$refs["table1"])
      console.log(this.$refs["table1-2"])
      // this.$refs.table1.setCurrentRow(0);
      // this.$refs.table1-0.setCurrentRow(0);
    }
  }
}
</script>

<style scoped>
table thead tr th{
  background: #e4e4e4 !important;
}
</style>

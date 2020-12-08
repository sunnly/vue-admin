<template>
  <div>
    <nest-table :datas="tableData" :titles="titles"></nest-table>
  </div>
</template>

<script>

import NestTable from "./components/index"

export default {
  name: 'index',
  components: {NestTable},
  data() {
    return {
      titles: [{
        id: '1',
        name: '表1',
        options: {},
        clomes: [
          {
            width: '125px',
            prop: 'name',
            label: '名称'
          }, {
            width: '125px',
            prop: 'legal',
            label: '状态'
          }, {
            width: '125px',
            prop: 'date',
            label: '日期'
          }
        ],
        children: [
          {
            id: '1-1',
            name: '表1-1',
            options: {},
            clomes: [
              {
                width: '125px',
                prop: 'name',
                label: '名称'
              }, {
                width: '125px',
                prop: 'id',
                label: 'ID'
              }, {
                width: '125px',
                prop: 'cc',
                label: 'CCC'
              }
            ]
          }, {
            id: '1-1',
            name: '表1-2',
            options: {},
            clomes: [
              {
                width: '125px',
                prop: 'name',
                label: '名称'
              }, {
                width: '125px',
                prop: 'id',
                label: 'ID'
              }, {
                width: '125px',
                prop: 'cc',
                label: 'CCC'
              }
            ]
          }
        ]
      }],
      tableData: [[
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
          children: [{
            table: 'aaa',
            datas: [{
              id: 'aa',
              name: 'bb',
              cc: 'ccc'
            }]
          }, {
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
      ]
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
  methods: {
    aaa(p, q) {
      console.log(this.$refs["table1"])
      console.log(this.$refs["table1-2"])
      // this.$refs.table1.setCurrentRow(0);
      // this.$refs.table1-0.setCurrentRow(0);
    }
  }
}
</script>

<style scoped>
table thead tr th {
  background: #e4e4e4 !important;
}
</style>

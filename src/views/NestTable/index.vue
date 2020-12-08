<template>
  <div>
    <nest-table v-for="(title, idx) in titles" :datas="tableData[idx]" :title="title"></nest-table>
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
            prop: 't',
            label: '表名'
          },{
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
                prop: 't',
                label: '表名'
              },{
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
            ],
            children: [{
              id: '1-1-1',
              name: '表1-1-1',
              options: {},
              cloumes:[
                {
                  width: '125px',
                  prop: 't',
                  label: '表名'
                },{
                  width: '125px',
                  prop: 'name',
                  label: '名称'
                }
              ]
            }]
          }, {
            id: '1-1',
            name: '表1-2',
            options: {},
            clomes: [
              {
                width: '125px',
                prop: 't',
                label: '表名11'
              },{
                width: '125px',
                prop: 'name',
                label: '名称11'
              }, {
                width: '125px',
                prop: 'id',
                label: 'ID11'
              }, {
                width: '125px',
                prop: 'cc',
                label: 'CCC11'
              }
            ]
          }
        ]
      }],
      tableData: [
        [{
          t: '表1数据1',
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
          children: [[{
            t: '表1-1数据1',
            id: 'aa',
            name: 'bb',
            cc: 'ccc'
          }, {
            t: '表1-1数据2',
            id: 'bbbb',
            name: 'ccccc',
            cc: 'ddddd'
          }],[{
            t: '表1-2数据1',
            id: 'aa1111',
            name: 'bb1111',
            cc: 'ccc1111'
          }, {
            t: '表1-2数据1',
            id: 'bbbb1111',
            name: 'ccccc1111',
            cc: 'ddddd1111'
          }]]
        },
          {
            t: '表1数据2',
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
            t: '表1数据3',
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

<style>

.nest-table.el-table th {
  background: #e4e4e4;
}
</style>

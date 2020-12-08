<template>
  <div>
    <el-input type="textarea" :disabled="true" :rows="12" v-model="textValue" height=200px></el-input>
    <el-select v-model="channel">
      <el-option v-for="item in channelOption"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value"></el-option>
    </el-select>
    <el-select v-model="type">
      <el-option v-for="item in typeOption"
                 :key="item"
                 :label="item"
                 :value="item"></el-option>
    </el-select>
    <el-input type="input" v-model="name"></el-input>
    <el-input type="input" v-model="msg"></el-input>
    <el-button @click="send">发送</el-button>
  </div>
</template>

<script>
  import {getToken} from '@/api/auth/websocket'

  export default {
    name: 'index',
    data() {
      return {
        websocket: null,
        textValue: '欢迎您：小萝卜头\n',
        msg: '',

        channelOption: [{
          label: 'Rabbit应用一',
          value: 'websocket-rabbit-test1'
        }, {
          label: 'Rabbit应用二',
          value: 'websocket-rabbit-test2'
        }, {
          label: 'Rabbit混合应用',
          value: 'websocket-rabbit-test1,websocket-rabbit-test2'
        }, {
          label: 'Feign应用一',
          value: 'websocket-feign-test1'
        }, {
          label: 'Feign应用二',
          value: 'websocket-feign-test2'
        }, {
          label: 'Feign混合应用',
          value: 'websocket-feign-test1,websocket-feign-test2'
        }],
        channel: 'websocket-rabbit-test1',

      type: 'self',
      typeOption: ['app', 'self', 'userId', 'username',
        'orgId', 'orgName', 'subOrgId', 'subOrgName', 'hasOrgId', 'hasOrgName',
        'deptId', 'deptName',
        'roleId', 'roleName', 'roleIds', 'roleNames'],
      name: ''
    }
  },
  created() {
    this.initWebSocket();
  },
  destroyed() {
    // 离开路由之后断开websocket连接
    this.websocket.close();
  },
  methods: {
    send() {
      let sendTime = new Date().getTime();
      this.websocketSend({
        'data': {
          'msg': this.msg,
          'type': this.type,
          'name': this.name
        },
        'channel': this.channel,
        'server': 'messageProcessorTest',
        'method': 'myMethod',
        'timestamp': sendTime
      });
      this.textValue += "我[" + sendTime + "]：" + this.msg + '\n';
      this.msg = '';
    },
    initWebSocket() {
      getToken().then(response => {
        // getBigdataToken().then(response => {
        console.log(response);
        console.log(response.status);
        console.log(response.status === 200);
        if (response.status === 200) {

          //初始化websocket
          const token = response.data;
          // const wsUri = 'ws://ws.sunnly.wang:8765/api/websocket?token=' + token;
          // const wsUri = 'ws://ws.sunnly.wang:20001/websocket?token=' + token;
          const wsUri = 'ws://113.207.56.7:8889/websocket?token=' + token;
          // const wsUri = 'ws://192.168.5.175:8765/api/websocket?token=' + token;
          this.websocket = new WebSocket(wsUri);
          this.websocket.onmessage = this.websocketOnMessage;
          this.websocket.onopen = this.websocketOnOpen;
          this.websocket.onerror = this.websocketOnError;
          this.websocket.onclose = this.websocketClose;
        } else {
          alert('获取wsToken失败')
        }


      })

    },
    websocketOnOpen() {
      // 连接建立之后执行send方法发送数据
      let actions = {'channel': 'heart'};
      this.websocketSend(actions);
    },
    websocketOnError() {
      // 连接建立失败重连
      this.initWebSocket();
    },
    websocketOnMessage(msg) {
      // 数据接收
      const restData = JSON.parse(msg.data);
      console.log(restData);

      this.textValue += restData.data.username + ":-->" + msg.data + '\n'
    },
    websocketSend(data) {
      // 数据发送
      console.log(JSON.stringify(data));
      this.websocket.send(JSON.stringify(data));
    },
    websocketClose(e) {
      // 关闭
      console.log('断开连接', e);
    }
  }
}
</script>

<style scoped>

</style>

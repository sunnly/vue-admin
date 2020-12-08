<template>
  <div>
    <button @click="file">文件上传</button>
    <hr/>
    <label ref="upload"
           style="position: relative;">
      <input type="file" multiple
             @change="selectFile"
             style="position: absolute; width: 1px; height: 1px; opacity: 0; z-index: -1;">
    </label>
    <img v-for="(img, i) in imgs" style="width: 400px;height: 300px" :src="img" >
  </div>
</template>

<script>

export default {
  name: 'index',
  data(){
    return {
      imgs : []
    }
  },
  methods: {
    file() {
      // 模拟点击file input触发选择文件，注意：不能在任何方式的回调里面执行此语句
      this.$refs.upload.click()
    },
    selectFile(event) {
      let _this = this;
      for (let i = 0; i < event.target.files.length; i++) {
        let objImage = event.target.files[i];
        let reader = new FileReader();

        reader.addEventListener("load",function () {
          var imgurl = reader.result;
          console.log(imgurl)

          _this.imgs.push(imgurl)
        })
        if (objImage) {
          reader.readAsDataURL(objImage)
        }
      }

      // 调用上传方法，传入选择的文件对象
      // this.uploadFile(event.target.files[0], () => {
      //
      //   // upload-success
      // })
      // 重置file input控件的值
      event.target.value = ''
    }
  }
}
</script>

<style scoped>

</style>

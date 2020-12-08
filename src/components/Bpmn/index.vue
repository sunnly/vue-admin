<template>
  <div class="containers">
    <div ref="canvas" class="canvas" />
    <div id="properties-panel" class="panel" />
    <div class="io-import-export">
      <ul class="io-import io-control io-control-list io-horizontal">
        <li>
          <button title="从本地文件系统打开BPMN关系图">
            <span class="icon-open" />
          </button>
        </li>
        <li class="vr" />
        <li>
          <button title="创建新的BPMN关系图" @click="createNewDiagram">
            <span class="icon-plus-circled" />
          </button>
        </li>
      </ul>

      <ul class="io-export io-control io-control-list io-horizontal">
        <li>
          <a href="javascript:void(0)" class="download" title="下载BPMN 2.0文件" @click="saveDiagramXml">
            <span class="icon-download" />
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="download" title="下载为SVG矢量图" @click="saveDiagramSvg">
            <span class="icon-picture" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'

import BpmnModeler from 'bpmn-js/lib/Modeler'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
import customTranslate from './lang/customTranslate'

export default {
  name: 'ActivitiManager',
  data() {
    return {
      bpmnModeler: null,
      container: null,
      canvas: null,
      bpmnXML: null
    }
  },
  mounted() {
    const canvas = this.$refs.canvas
    const translate = {
      translate: ['value', customTranslate]
    }
    this.bpmnModeler = new BpmnModeler({
      container: canvas,
      // 控制板
      propertiesPanel: {
        parent: '#properties-panel'
      },
      additionalModules: [
        // 左边工具栏以及节点
        propertiesProviderModule,
        propertiesPanelModule,
        translate
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    })
    this.createNewDiagram()
  },
  methods: {
    createNewDiagram() {
      this.bpmnModeler.createDiagram()
    },
    saveDiagramXml() {
      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
        console.log(err)
        this.exportRaw('diagram.bpmn', xml)
      })
    },
    saveDiagramSvg() {
      this.bpmnModeler.saveSVG({ format: true }, (err, svg) => {
        console.log(err)
        this.exportRaw('diagram.svg', svg)
      })
    },
    fakeClick(obj) {
      const ev = document.createEvent('MouseEvents')
      ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      obj.dispatchEvent(ev)
    },
    exportRaw(name, data) {
      const urlObject = window.URL || window.webkitURL || window
      const export_blob = new Blob([data])
      const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
      save_link.href = urlObject.createObjectURL(export_blob)
      save_link.download = name
      this.fakeClick(save_link)
    }
  }
}
</script>

<style scoped type="less">
  @font-face {
    font-family: app;
    src: url('../../assets/font/app.woff')
  }
  .containers {
    position: absolute;
    background-color: #ffffff;
    top: 84px;
    bottom: 0;
    right: 0;
    left: 0;
    overflow: auto;
  }
  .canvas{
    width: 100%;
    height: 100%;
  }
  .panel{
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 300px;
    height: 100%;
    overflow-y: auto;
  }
  .io-import-export {
    position: absolute;
    left: 20px;
    bottom: 25px;
  }
  .io-control-list.io-horizontal, .io-control-list.io-horizontal li {
    display: inline-block;
  }
  .io-control-list {
    list-style: none;
    padding: 5px;
    margin: 0;
  }
  .vr {
    height: 18px;
    display: inline-block;
    border-right: solid 1px #CCC;
    margin-left: 2px;
  }
  .io-control-list.io-horizontal a {
    padding: 2px;
    margin: 0 5px;
  }
  .io-control-list a, .io-control-list a:visited, .io-control-list button {
    padding: 0;
    outline: none;
    cursor: pointer;
    font-size: 22px;
    line-height: 26px;
    color: #555555;
    background: none;
    border: none;
  }
  .io-import {
    margin-right: 10px;
  }
  .io-control {
    background: #FFF;
    border-radius: 2px;
    border: solid 1px #E0E0E0;
    padding: 5px;
  }
  .io-control-list.io-horizontal button {
    margin: 0 5px;
  }
  .io-control-list button {
    padding: 0;
    outline: none;
    cursor: pointer;
    font-size: 22px;
    line-height: 26px;
    color: #555555;
    background: none;
    border: none;
  }
  [class^="icon-"]:before, [class*=" icon-"]:before {
    font-family: "app",serif;
  }
  [class^="icon-"]:before, [class*=" icon-"]:before {
    font-style: normal;
    font-weight: normal;
    speak: none;
    display: inline-block;
    text-decoration: inherit;
    width: 1em;
    text-align: center;
    font-variant: normal;
    text-transform: none;
    line-height: 1em;
  }
  .icon-open:before {
    content: '\f41e';
  }
  .icon-plus-circled:before {
    content: '\f418';
  }
  .icon-download:before {
    content: '\f41b';
  }
  .icon-picture:before {
    content: '\f416';
  }
  /deep/ .bjs-powered-by {
    display: none;
  }
</style>

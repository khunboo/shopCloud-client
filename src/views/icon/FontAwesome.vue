<!--  -->
<template>
  <div>
    <el-card class="box-card"
             v-for="(icons,title) in FontAwesome"
             :key="title">
      <div slot="header">
        <span>{{title}}</span>
      </div>
      <el-row :gutter="20"
              class="font-awesome">
        <el-col :span="4"
                v-for="(v,i) in icons"
                :key="i">
          <i style="font-size:24px"
             :class="'fa fa-'+v"></i><br />{{v}}
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import FontAwesome from './FontAwesome.js'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据
    return {
      FontAwesome: FontAwesome
    };
  },
}
</script>
<style scoped>
/* @import url(); 引入公共css类 */
.font-awesome .el-col {
  margin: 20px 0;
  text-align: center;
}
</style>
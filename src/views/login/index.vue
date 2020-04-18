<!--  -->
<template>
  <div class='login-box backimage'>
    <div class="login-header">
      <h3 class="login-brand"
          style="font-size:34px;color:#56a4f1">澳洲代购管理平台</h3>
    </div>
    <el-form :model="ruleForm2"
             :rules="rules2"
             ref="ruleForm2"
             label-position="left"
             label-width="70px"
             class="demo-ruleForm login-container">
      <h3 class="title">登录</h3>
      <el-form-item prop="account"
                    label="账号">
        <el-input type="text"
                  v-model="ruleForm2.account"
                  auto-complete="off"
                  placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass"
                    label="密码">
        <el-input type="password"
                  v-model="ruleForm2.checkPass"
                  auto-complete="off"
                  placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked"
                   checked
                   class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary"
                   @click.native.prevent="handleSubmit2"
                   :loading="logining">登录</el-button>
        <el-button @click.native.prevent="handleReset2">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { requestLogin } from '@/api/api.js';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据
    return {
      logining: false,
      ruleForm2: {
        account: '',
        checkPass: ''
      },
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      checked: true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合

  methods: {
    handleReset2 () {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2 (ev) {
      var _this = this;
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.logining = true;
          var loginParams = { account: this.ruleForm2.account, password: this.ruleForm2.checkPass };
          requestLogin(loginParams).then(({data:data}) => {
            if (data.code !== 200) {
              this.logining = false;
              return this.$message.error(data.msg);
            } else {
              sessionStorage.setItem('user', data.code);
              this.$router.push({ path: '/' });
            }
          });
        } else {
          return false;
        }
      });
    }

  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  },
  //生命周期 - 创建之前
  beforeCreate () { },
  //生命周期 - 挂载之前
  beforeMount () { },
  //生命周期 - 更新之前
  beforeUpdate () { },
  //生命周期 - 更新之后
  updated () { },
  //生命周期 - 销毁之前
  beforeDestroy () { },
  //生命周期 - 销毁完成
  destroyed () { },
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated () { },
}
</script>
<style scoped>
/* @import url(); 引入公共css类 */
.login-box {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.show-account {
  position: absolute;
  left: 15px;
  bottom: 20px;
  color: red;
}
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  position: absolute;
  left: 50%;
  margin-top: -177px;
  margin-left: -170px;
  top: 50%;
}
.title {
  margin: 0px auto 36px auto;
  text-align: center;
  color: #505458;
  font-size: 18px;
}
.remember {
  margin: 0px 0px 35px 0px;
}
</style>
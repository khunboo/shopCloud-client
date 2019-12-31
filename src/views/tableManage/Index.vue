<!--  -->
<template>
  <div class='tab-box'>
    <!--工具条 查询-->
    <div>
      <el-form :inline="true"
               :model="filters">
        <el-form-item label="姓名">
          <el-input v-model="filters.name"
                    placeholder="姓名"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     @click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--列表-->
    <el-table ref="multipleTable"
              :data="users"
              tooltip-effect="dark"
              style="width: 100%"
              height="400px"
              @selection-change="selsChange"
              v-loading="loading">

      <el-table-column fixed
                       type="selection"
                       width="55">
      </el-table-column>

      <el-table-column type="index"
                       prop="id"
                       label="ID"
                       width="60">
      </el-table-column>

      <el-table-column prop="name"
                       label="姓名"
                       width="120">

      </el-table-column>

      <el-table-column prop="sex"
                       label="性别"
                       width="120"
                       :formatter="formatSex">
      </el-table-column>

      <el-table-column prop="age"
                       label="年龄"
                       width="120">
      </el-table-column>

      <el-table-column prop="birth"
                       label="生日"
                       width="120">
      </el-table-column>

      <el-table-column prop="addr"
                       label="地址"
                       min-width="160">
      </el-table-column>
      <el-table-column label="操作"
                       width="200">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button size="small"
                     type="danger"
                     @click="handleDel(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!--工具条 批量删除-->
    <div class="toolbar">
      <el-button type="danger"
                 @click="batchRemove"
                 :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next"
                     :total="total"
                     @current-change="handleCurrentChange"
                     :page-size="20"
                     style="float:right;">
      </el-pagination>
    </div>

    <!-- 编辑/新增 界面  -->
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogVisible">
      <el-form :model="editForm"
               label-width="80px"
               ref="editForm"
               :rules="editFormRules">
        <el-form-item label="姓名"
                      prop="name">
          <el-input v-model="editForm.name"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio"
                      :label="1">男</el-radio>
            <el-radio class="radio"
                      :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editForm.age"
                           :min="0"
                           :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date"
                          placeholder="选择日期"
                          v-model="editForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea"
                    v-model="editForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="small"
                   @click.native="dialogVisible = false">取 消</el-button>
        <el-button size="small"
                   v-if="dialogStatus=='create'"
                   type="primary"
                   @click="createData">添 加</el-button>
        <el-button size="small"
                   v-else
                   type="primary"
                   @click="updateData">修 改</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from "../../api/api.js";

import date from '../../utils/date.js';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据
    return {
      loading: false,
      filters: {
        name: ''
      },
      users: [],
      total: 0,
      page: 1,
      sels: [],  //列表选中列
      dialogVisible: false,
      editForm: { // 编辑界面数据
        id: "0",
        name: "",
        sex: -1,
        age: 0,
        birth: "",
        addr: ""
      },
      // 验证必填提示
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      addFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "新增"
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //性别显示转换
    formatSex: function (row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    handleCurrentChange (val) {
      this.page = val;
      this.getUsers();
    },
    // 获取用户列表
    getUsers: function () {
      this.loading = true;
      let para = {
        page: this.page,
        name: this.filters.name
      };
      getUserListPage(para).then(res => {
        this.total = res.data.total;
        this.users = res.data.users;
        this.loading = false;
      })
    },

    // 全选单选多选
    selsChange (sels) {
      this.sels = sels;
      console.log(sels);
    },

    // 显示编辑 界面
    handleEdit (index, row) {
      this.dialogVisible = true;
      this.dialogStatus = "update";
      this.editForm = Object.assign({}, row);
    },
    // 编辑 确定按钮
    updateData () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗?", "提示", {}).then(() => {
            let para = Object.assign({}, this.editForm);
            para.birth = !para.birth || para.birth == "" ? "" : date.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            editUser(para).then(res => {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.dialogVisible = false;
              this.getUsers();
            })
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },

    // 显示新增 界面
    handleAdd () {
      this.dialogVisible = true;
      this.dialogStatus = "create";
      this.editForm = {
        id: "0",
        name: "",
        sex: -1,
        age: 0,
        birth: "",
        addr: ""
      }
    },
    // 新增 确定按钮
    createData () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editForm.id = (parseInt(Math.random() * 100)).toString()
            let para = Object.assign({}, this.editForm);
            console.log(para);
            para.birth = !para.birth || para.birth == "" ? "" : date.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            addUser(para).then(res => {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.dialogVisible = false;
              this.getUsers();
            })
          }).catch(err => {
            console.log(e)
          })
        }
      })
    },

    // 删除用户
    handleDel (index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      }).then(() => {
        let para = { id: row.id };
        removeUser(para).then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getUsers()
        })
      }).catch(() => { });
    },

    // 批量删除
    batchRemove () {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      }).then(() => {
        // this.listLoading = true;
        //NProgress.start();
        let para = { ids: ids };
        batchRemoveUser(para).then(res => {
          //this.listLoading = false;
          //NProgress.done();
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getUsers();
        });
      }).catch(() => { });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.getUsers();
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
.tab-box {
  background-color: #fff;
  padding: 20px;
}
.toolbar {
  margin-top: 10px;
}
</style>
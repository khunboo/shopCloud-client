<template>
  <div class='tab-box'>
    <el-form :inline="true"
             :model="dataform">
      <el-form-item label="琴行名称">
        <el-input v-model="unitname"
                  placeholder="琴行名称"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="getSelectByName">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="AddWorkHours">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="deleteInfo">删除</el-button>
      </el-form-item>

      <el-table ref="workhousrsTable"
              border
              :data="workhours"
              style="width: 100%"
              height="300"
              :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
              @selection-change="selsChange"
              v-loading="loading">
      <el-table-column fixed
                       type="selection"
                       header-align="center"
                       align="center"
                       width="50">
      </el-table-column>

      <el-table-column prop="unitname"
                       align="center"
                       width="300"
                       label="琴行名称">
      </el-table-column>

      <el-table-column prop="workCount"
                       align="center"
                       width="200"
                       label="课时数量">
      </el-table-column>

      <el-table-column prop="memberCount"
                       align="center"
                       width="200"
                       label="学生数量">
      </el-table-column>

      <el-table-column prop="workTime"
                       align="center"
                       width="220"
                       label="上课时间">
      </el-table-column>

      <el-table-column align="center"
                       width="220"
                       label="操作">
      </el-table-column>
    </el-table>
    </el-form>
    <div class="toolbar">
      <el-pagination layout="prev, pager, next"
                     :total="total"
                     @current-change="handleCurrentChange"
                     :page-size="10"
                     style="float:right;">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogVisible" center>

      <el-form :model="editForm"
                label-width="80px"
                ref="editForm"
                :rules="editFormRules">
        <el-form-item label="琴行名称"
                      prop="unitname">
          <el-input v-model="editForm.unitname" style="width:50%"
                    auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="课时数量"
                      prop="workCount">
          <el-input-number v-model="editForm.workCount" :min="0" :max="100"
                    auto-complete="off"></el-input-number>
        </el-form-item>

        <el-form-item label="学生数量"
                      prop="memberCount">
          <el-input-number v-model="editForm.memberCount" :min="0" :max="100"
                    auto-complete="off"></el-input-number>
        </el-form-item>

        <el-form-item label="上课时间"
                      prop="workTime">
          <el-date-picker type="date" v-model="editForm.workTime" value-format="yyyy-MM-dd"
                    placeholder="请选择上课时间" auto-complete="off"></el-date-picker>
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

import {getSelectByNameList, addName, delName} from "../../api/api.js";

export default {
  data () {
    return {
      loading: false,
      unitname: "",
      workhours: [],
      total: 0,
      page: 1,
      sels: [],
      dataform: {
        unitname: ''
      },
      editForm: {
        id: '',
        unitname: '',
        workCount: 0,
        memberCount: 0,
        workTime: '',
      },
      // 验证必填提示
      editFormRules: {
        unitname: [{ required: true, message: "请输入琴行名称", trigger: "blur" }],
        workCount: [{ required: true, message: "请输入课时数量", trigger: "blur" }],
        memberCount: [{ required: true, message: "请输入学生数量", trigger: "blur" }],
        workTime: [{ required: true, message: "请输入上课时间", trigger: "blur" }],
      },

      dialogVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑信息",
        create: "新增信息"
      },
      delVisible: false,
      delselection: "",
      delarr: [],
      deltitle: "提示"
    };
  },

  created () {
      this.loading = false;
      getSelectByNameList().then(res => {
          this.total = res.data.data.total;
          this.workhours = res.data.data.list;
          console.log(res.data.list);
          this.loading = false;
      }).catch(err => {
        console.log("接口异常");
      })
  },

  methods: {
    selsChange(val) {
      this.delselection = val;
    },

    handleCurrentChange (val) {
      this.page = val;
      this.getSelectByName();
    },

    getSelectByName: function () {
      this.loading = false;
      let parm = {
        page: this.page,
        unitname: this.unitname
      };
      getSelectByNameList(parm).then(res => {
          this.total = res.data.data.total;
          this.workhours = res.data.data.list;
          console.log(res.data.list);
          this.loading = false;
      }).catch(err => {
        console.log("接口异常");
      })
    },

    AddWorkHours() {
        this.dialogVisible = true;
        this.dialogStatus = "create";
        this.editForm = {
          unitname: '',
          workCount: 0,
          memberCount: 0,
          workTime: ''
      }
    },

    deleteInfo() {
      if(this.delselection.length == 0){
        return this.$message({
            message: "请选择需要删除的数据！！！",
            type: 'warning',
            duration: 2000
        })
      }
      
      this.$confirm("确定进行【删除】操作？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = this.delselection.id;
        delName(param).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
        }).catch(() => {
            this.$message.err("删除失败")
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
      })
    })
  }, 

    createData() {
      this.$refs.editForm.validate(valid => {
        if(valid){
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            let para = Object.assign({}, this.editForm);
            addName(para).then(res => {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs.editForm.resetFields();
              this.dialogVisible = false;
              this.getSelectByName();
            })
          }).catch(err => {
            console.log("出错咯！！！")
          })
        }
      })
    },

    updateData() {

    }


  }

}
</script>

<style scoped>
.tab-box {
  background-color: #fff;
  padding: 20px;
}
.toolbar {
  margin-top: 10px;
}
</style>


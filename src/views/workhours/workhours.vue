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
  </div>
</template>

<script>

import {getSelectByNameList} from "../../api/api.js";

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
      }

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
        this.sels = val;
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

    AddWorkHours: function(){
      
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


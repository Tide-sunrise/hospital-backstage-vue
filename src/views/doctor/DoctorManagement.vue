<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const doctors = ref([

])

import {doctorListService,doctorAddService,doctorUpdateService,doctorDeleteService} from "@/api/doctor.js";

const articleCategoryList = async () => {
  let result = await doctorListService();
  doctors.value=result.data;
}

articleCategoryList();
//控制添加医生弹窗
const dialogVisible = ref(false)

//添加医生数据模型
const doctorModel = ref({
  doctorName: '',
  doctorAlias: ''
})
//添加医生表单校验
const rules = {
  doctorName: [
    { required: true, message: '请输入医生名称', trigger: 'blur' },
  ],
  doctorAlias: [
    { required: true, message: '请输入医生别名', trigger: 'blur' },
  ]
}


//调用添加医生接口
import {ElMessage, ElMessageBox} from "element-plus";

const addCategory = async () => {

  //调用接口
  let result = await doctorAddService(doctorModel.value);
  ElMessage.success(result.message ? result.message : '添加成功');

  //调用获取所有文章医生的函数
  articleCategoryList();
  //关闭弹窗
  dialogVisible.value = false;
}

//定义变量，控制标题的显示
const title = ref('')

//展示编辑弹窗
const showDialog = (row) => {
  dialogVisible.value = true;
  title.value = '编辑医生';
  //数据拷贝
  doctorModel.value.doctorName = row.doctorName;
  doctorModel.value.doctorAlias = row.doctorAlias;
  //扩展id属性，将来需要传递给后台，完成医生的修改
  doctorModel.value.id = row.id;
}

//编辑医生
const updateCategory = async () => {
  //调用接口
  let result = await doctorUpdateService(doctorModel.value);
  ElMessage.success(result.message ? result.message : '修改成功');
  //调用获取所有文章医生的函数
  articleCategoryList();
  //关闭弹窗
  dialogVisible.value = false;
}

//清空模型数据
const clearData = () => {
  doctorModel.value.doctorName = '';
  doctorModel.value.doctorAlias = '';
}

//删除医生
const deleteCategory = (row) => {
  //提示用户 确认框
  ElMessageBox.confirm(
      '你要删除这条信息🐎？',
      '警告',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        //调用医生删除接口
        let result = await doctorDeleteService(row.id);
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        //刷新列表
        articleCategoryList();
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '删除取消',
        })
      })
}
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>医生信息概览</span>
        <div class="extra">
          <el-button type="primary" @click="dialogVisible=true ;title='添加医生';clearData()" >添加医生</el-button>
        </div>
      </div>
    </template>
    <el-table :data="doctors" style="width: 100%">
      <el-table-column label="医生id" width="100" prop="doctorId"> </el-table-column>
      <el-table-column label="姓名" width="200" prop="name"> </el-table-column>
      <el-table-column label="性别" width="100" prop="gender"> </el-table-column>
      <el-table-column label="所属部门" width="150" prop="departmentName"> </el-table-column>
      <el-table-column label="职称" width="150" prop="specializationName"> </el-table-column>
      <el-table-column label="简介" width="450" prop="introduction"> </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)" ></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 添加医生弹窗 -->
    <el-dialog v-model="dialogVisible" :title="title" width="30%">
      <el-form :model="doctorModel" :rules="rules" label-width="100px" style="padding-right: 30px">
        <el-form-item label="医生名称" prop="doctorName">
          <el-input v-model="doctorModel.doctorName" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="医生别名" prop="doctorAlias">
          <el-input v-model="doctorModel.doctorAlias" minlength="1" maxlength="15"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="title=='添加医生'?addCategory():updateCategory()"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>

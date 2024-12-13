<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const patients = ref([

])

import {patientListService,patientAddService,patientUpdateService,patientDeleteService} from "@/api/patient.js";

const patientList = async () => {
  let result = await patientListService();
  patients.value=result.data;
}

patientList();
//控制添加分类弹窗
const dialogVisible = ref(false)

//添加分类数据模型
const patientModel = ref({
  patientId: '',
  patientName: '',
  patientCleartextId: ''
})
//添加分类表单校验
const rules = {
  patientId: [
    { required: true, message: '请输入患者id', trigger: 'blur' },
  ],
  patientName: [
    { required: true, message: '请输入患者姓名', trigger: 'blur' },
    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
  ],
  patientCleartextId: [
    { required: true, message: '请输入患者身份证号', trigger: 'blur' },
    { min: 1, max: 18, message: '长度为 18 个字符', trigger: 'blur' }
  ]
}


//调用添加分类接口
import {ElMessage, ElMessageBox} from "element-plus";

const addPatient = async () => {

  //调用接口
  let result = await patientAddService(patientModel.value);
  ElMessage.success(result.message ? result.message : '添加成功');

  //调用获取所有文章分类的函数
  patientList();
  //关闭弹窗
  dialogVisible.value = false;
}

//定义变量，控制标题的显示
const title = ref('')

//展示编辑弹窗
const showDialog = (row) => {
  dialogVisible.value = true;
  title.value = '编辑分类';
  //数据拷贝
  patientModel.value.patientId = row.patientId;
  patientModel.value.patientName = row.patientName;
  patientModel.value.patientAlias = row.patientAlias;
  //扩展id属性，将来需要传递给后台，完成分类的修改
  patientModel.value.id = row.id;
}

//编辑分类
const updatePatient = async () => {
  //调用接口
  let result = await patientUpdateService(patientModel.value);
  ElMessage.success(result.message ? result.message : '修改成功');
  //调用获取所有文章分类的函数
  patientList();
  //关闭弹窗
  dialogVisible.value = false;
}

//清空模型数据
const clearData = () => {
  patientModel.value.patientId = '';
  patientModel.value.patientName = '';
  patientModel.value.patientCleartextId = '';
}

//删除分类
const deletePatient = (row) => {
  //提示用户 确认框
  console.log(row);
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
        //调用分类删除接口
        let result = await patientDeleteService(row.patientId);
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        //刷新列表
        patientList();
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
        <span>患者信息概览</span>
        <div class="extra">
          <el-button type="primary" @click="dialogVisible=true ;title='添加分类';clearData()" >添加分类</el-button>
        </div>
      </div>
    </template>
    <el-table :data="patients" style="width: 100%">
      <el-table-column label="患者id" width="200" prop="patientId"> </el-table-column>
      <el-table-column label="姓名" width="250" prop="name"> </el-table-column>
      <el-table-column label="身份证号" width="400" prop="cleartextId"> </el-table-column>
      <el-table-column label="操作" width="400">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)" ></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="deletePatient(row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 添加分类弹窗 -->
    <el-dialog v-model="dialogVisible" :title="title" width="30%">
      <el-form :model="patientModel" :rules="rules" label-width="100px" style="padding-right: 30px">
        <el-form-item label="患者姓名" prop="patientName">
          <el-input v-model="patientModel.patientName" placeholder="请输入患者姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="patientCleartextId">
          <el-input v-model="patientModel.patientCleartextId" placeholder="请输入患者身份证号"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="title=='添加分类'?addPatient():updatePatient()"> 确认 </el-button>
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

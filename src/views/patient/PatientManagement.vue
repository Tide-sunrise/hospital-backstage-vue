<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const patients = ref([

])

import {articleCategoryListService,articleCategoryAddService,articleCategoryUpdateService,articleCategoryDeleteService} from "@/api/article.js";

const articleCategoryList = async () => {
  let result = await articleCategoryListService();
  patients.value=result.data;
}

articleCategoryList();
//控制添加分类弹窗
const dialogVisible = ref(false)

//添加分类数据模型
const patientModel = ref({
  patientName: '',
  patientAlias: ''
})
//添加分类表单校验
const rules = {
  patientName: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
  ],
  patientAlias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
  ]
}


//调用添加分类接口
import {ElMessage, ElMessageBox} from "element-plus";

const addCategory = async () => {

  //调用接口
  let result = await articleCategoryAddService(patientModel.value);
  ElMessage.success(result.message ? result.message : '添加成功');

  //调用获取所有文章分类的函数
  articleCategoryList();
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
  patientModel.value.patientName = row.patientName;
  patientModel.value.patientAlias = row.patientAlias;
  //扩展id属性，将来需要传递给后台，完成分类的修改
  patientModel.value.id = row.id;
}

//编辑分类
const updateCategory = async () => {
  //调用接口
  let result = await articleCategoryUpdateService(patientModel.value);
  ElMessage.success(result.message ? result.message : '修改成功');
  //调用获取所有文章分类的函数
  articleCategoryList();
  //关闭弹窗
  dialogVisible.value = false;
}

//清空模型数据
const clearData = () => {
  patientModel.value.patientName = '';
  patientModel.value.patientAlias = '';
}

//删除分类
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
        //调用分类删除接口
        let result = await articleCategoryDeleteService(row.id);
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
        <span>患者信息概览</span>
        <div class="extra">
          <el-button type="primary" @click="dialogVisible=true ;title='添加分类';clearData()" >添加分类</el-button>
        </div>
      </div>
    </template>
    <el-table :data="patients" style="width: 100%">
      <el-table-column label="患者id" width="100" type="index"> </el-table-column>
      <el-table-column label="姓名" width="100" type="index"> </el-table-column>
      <el-table-column label="性别" width="100" type="index"> </el-table-column>
      <el-table-column label="出生日期" width="150" type="index"> </el-table-column>
      <el-table-column label="电话号码" width="150" type="index"> </el-table-column>
      <el-table-column label="身份证号" width="200" type="index"> </el-table-column>
      <el-table-column label="症状" width="370" type="index"> </el-table-column>
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

    <!-- 添加分类弹窗 -->
    <el-dialog v-model="dialogVisible" :title="title" width="30%">
      <el-form :model="patientModel" :rules="rules" label-width="100px" style="padding-right: 30px">
        <el-form-item label="分类名称" prop="patientName">
          <el-input v-model="patientModel.patientName" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="patientAlias">
          <el-input v-model="patientModel.patientAlias" minlength="1" maxlength="15"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="title=='添加分类'?addCategory():updateCategory()"> 确认 </el-button>
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

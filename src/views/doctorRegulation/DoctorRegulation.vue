<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import {ref, watch} from 'vue'
const doctorRegulations = ref([

])

import {doctorRegulationListService} from "@/api/doctorRegulation.js";

const doctorList = async () => {
  let result = await doctorRegulationListService();
  doctorRegulations.value=result.data;

  // doctorRegulations.value.forEach(order => {
  //   order.timeInfo = timeInfoMap[order.timeInfo] || '未知状态';
  // });
}

const timeInfoMap = {
  1: '08:30-09:30',
  2: '09:30-10:30',
  3: '10:30-11:30',
  4: '14:30-15:30',
  5: '15:30-16:30',
  6: '16:30-17:30'
};

doctorList();
//控制添加医生弹窗
const dialogVisible = ref(false)

//添加医生数据模型
const doctorModel = ref({
  doctorId: '',
  doctorName: '',
  date: '',
  timeInfo: ''
})
//添加医生表单校验
const rules = {
  doctorId: [
    { required: true, message: '请输入医生id', trigger: 'blur' },
  ],
  doctorName: [
    { required: true, message: '请输入医生姓名', trigger: 'blur' },
  ],
  date: [
    { required: true, message: '请输入上班日期', trigger: 'blur' },
  ],
  timeInfo: [
    { required: true, message: '请输入时间段', trigger: 'blur' },
  ]
}


//调用添加医生接口
import {ElMessage, ElMessageBox} from "element-plus";

const addCategory = async () => {

  //调用接口
  let result = await doctorAddService(doctorModel.value);
  console.log(result);
  ElMessage.success(result.message ? result.message : '添加成功');
  console.log(doctorModel.value)
  //调用获取所有文章医生的函数
  doctorList();
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
  // doctorModel.value.doctorName = row.doctorName;
  // doctorModel.value.doctorAlias = row.doctorAlias;
  doctorModel.value.doctorId = row.doctorId;
  doctorModel.value.doctorName = row.doctorName;
  doctorModel.value.date = row.date;
  doctorModel.value.timeInfo = row.timeInfo;
  //扩展id属性，将来需要传递给后台，完成医生的修改
  doctorModel.value.id = row.id;
}

//编辑医生
const updateCategory = async () => {
  //调用接口
  let result = await doctorUpdateService(doctorModel.value);
  ElMessage.success(result.message ? result.message : '修改成功');
  //调用获取所有文章医生的函数
  doctorList();
  //关闭弹窗
  dialogVisible.value = false;
}

//清空模型数据
const clearData = () => {
  // doctorModel.value.doctorName = '';
  // doctorModel.value.doctorAlias = '';
  doctorModel.value.doctorId = '';
  doctorModel.value.doctorName = '';
  doctorModel.value.date = '';
  doctorModel.value.timeInfo = '';
}

// 方法定义
const updateSpecializations = (departmentValue) => {
  const department = departmentOptions.find(dep => dep.value === departmentValue);
  if (department && department.specializations) {
    specializationOptions.value = department.specializations;
    // doctorModel.specializationId = ''; // 清空小部门选择
  } else {
    specializationOptions.value = [];
    doctorModel.specializationId = '';
  }
};

watch(() => doctorModel.value.departmentName, (newVal) => {
  updateSpecializations(newVal);
});

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
        console.log(row);
        let result = await doctorDeleteService(row.doctorId);
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        //刷新列表
        doctorList();
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
        <span>医生排班概览</span>
<!--        <div class="extra">-->
<!--          <el-button type="primary" @click="dialogVisible=true ;title='添加医生';clearData()" >添加医生</el-button>-->
<!--        </div>-->
      </div>
    </template>
    <el-table :data="doctorRegulations" style="width: 100%">
      <el-table-column label="医生id" width="250" prop="doctorId"> </el-table-column>
      <el-table-column label="医生姓名" width="300" prop="doctorName"> </el-table-column>
      <el-table-column label="上班日期" width="400" prop="date"> </el-table-column>
      <el-table-column label="时间段" width="420" prop="timeInfo"> </el-table-column>
<!--      <el-table-column label="操作" width="100">-->
<!--        <template #default="{ row }">-->
<!--          <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)" ></el-button>-->
<!--          <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 添加医生弹窗 -->
    <el-dialog v-model="dialogVisible" :title="title" width="30%">
      <el-form :model="doctorModel" :rules="rules" label-width="100px" style="padding-right: 30px">
        <el-form-item label="医生姓名" prop="name">
          <el-input v-model="doctorModel.name" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="医生性别" prop="gender">
          <el-select v-model="doctorModel.gender" placeholder="请选择性别" style="width: 100%">
            <el-option
                v-for="gender in genderOptions"
                :key="gender.value"
                :label="gender.label"
                :value="gender.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" prop="departmentId">
          <el-select
              v-model="doctorModel.departmentId"
              placeholder="请选择部门"
              style="width: 100%"
              @change="updateSpecializations"
          >
            <el-option
                v-for="item in departmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="所属小部门" prop="specializationId">
          <el-select
              v-model="doctorModel.specializationId"
              placeholder="请选择小部门"
              style="width: 100%"
              :disabled="specializationOptions.length === 0"
          >
            <el-option
                v-for="item in specializationOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="医生职称" prop="titleId">
          <el-select
              v-model="doctorModel.titleId"
              placeholder="请选择职称"
              style="width: 100%"
          >
            <el-option
                v-for="item in titleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="医生简介" prop="introduction">
          <el-input v-model="doctorModel.introduction" minlength="1" maxlength="10"></el-input>
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

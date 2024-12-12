<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in 6" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>

  <el-row>
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>音乐播放器</span>
        </div>
        <div class="text item">
          <el-button type="primary" @click="playMusic">播放</el-button>
          <el-button type="danger" @click="pauseMusic">暂停</el-button>
          <el-button type="success" @click="stopMusic">停止</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

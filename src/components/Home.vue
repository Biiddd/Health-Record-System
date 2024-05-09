<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  LineChartOutlined,
  BookOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import { setlogout } from "@/auth.js";

const selectedKeys2 = ref(["1"]);
const openKeys = ref(["sub1"]);
const router = useRouter();

const logout = () => {
  // 清除用户信息
  setlogout();

  // 重定向到登录页面
  router.push({ name: "Login" });
};
</script>

<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="logo" />
      </div>
      <h1 class="h1-text">晓芸指标记录系统</h1>
    </a-layout-header>

    <a-layout-content class="content-container">
      <a-layout class="content-container-layout">
        <a-layout-sider>
          <a-menu
            v-model:selectedKeys="selectedKeys2"
            v-model:openKeys="openKeys"
            mode="inline"
            style="height: 100%"
          >
            <a-menu-item key="1">
              <router-link to="/Overview">
                <BookOutlined />
                <span>概况</span>
              </router-link>
            </a-menu-item>

            <a-menu-item key="2">
              <router-link to="/inputData">
                <EditOutlined />
                <span>数据录入</span>
              </router-link>
            </a-menu-item>

            <a-menu-item key="3">
              <router-link to="/charts">
                <LineChartOutlined />
                <span>指标趋势</span>
              </router-link>
            </a-menu-item>

            <a-menu-item key="4">
              <router-link to="/allData">
                <LineChartOutlined />
                <span>全部数据</span>
              </router-link>
            </a-menu-item>

            <a-button
              type="primary"
              danger
              size="large"
              style="margin-left: 23px; margin-top: 20px"
              @click="logout"
            >
              <span>注销</span>
            </a-button>
          </a-menu>
        </a-layout-sider>
        <a-layout-content class="content">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer class="footer"> Copyright © 2024 Biid</a-layout-footer>
  </a-layout>
</template>

<style scoped>
#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 24px 0 16px 24px;
}

.header {
  background-color: #4a90e4;
  height: 10vh;
  display: flex;
}

.h1-text {
  color: white;
  font-size: 40px;
  align-items: center;
}

.logo {
  width: 90px;
  height: 90px;
}

.logo img {
  width: 100%;
  height: auto;
  transform: scale(0.8);
}

.content-container {
  padding: 0 25px;
}

.content-container-layout {
  padding: 24px 0;
  background: #fff;
}

.content {
  padding: 0 24px;
  height: 78vh;
}

.footer {
  text-align: center;
  height: 6vh;
}
</style>

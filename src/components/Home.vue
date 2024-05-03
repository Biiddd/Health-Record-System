<template>
  <a-layout>
    <a-layout-header class="header" style="background-color: #4A90E4; height: 10vh; display: flex; align-items: center;">
    <div class="logo">
        <img src="@/assets/logo.png" alt="logo">
    </div>
    <h1 style="color: white; font-size: 48px; line-height: bolder; align-items:center">晓芸指标记录系统</h1>
</a-layout-header>

    <a-layout-content style="padding: 0 50px">
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
              v-model:selectedKeys="selectedKeys2"
              v-model:openKeys="openKeys"
              mode="inline"
              style="height: 100%"
          >
            <a-menu-item key="1">
              <router-link to="/Overview">
                <user-outlined />
                <span>概况</span>
              </router-link>
            </a-menu-item>
            
            <a-menu-item key="2">
              <router-link to="/inputdata">
                <user-outlined />
                <span>数据录入</span>
              </router-link>
            </a-menu-item>

            <a-menu-item key="3">
              <router-link to="/charts/ca125">
                <user-outlined />
                <span>CA125</span>
              </router-link>
            </a-menu-item>
            
            <a-menu-item key="4">
              <router-link to="/charts/ca199">
                <user-outlined />
                <span>CA199</span>
              </router-link>
            </a-menu-item>

            <a-menu-item key="5">
              <router-link to="/charts/cea" class="custom-menu-item">
                <user-outlined />
                <span>CEA</span>
              </router-link>
            </a-menu-item>

            <a-menu-item key="6">
              <router-link to="/charts/ca153" tag="div" class="custom-menu-item">
                <user-outlined />
                <span>CA153</span>
              </router-link>
            </a-menu-item>

            <a-menu-item key="7">
              <router-link to="/charts/ca724" tag="div" class="custom-menu-item">
                <user-outlined />
                <span>CA724</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="8">
              <router-link to="/charts/he4" tag="div" class="custom-menu-item">
                <user-outlined />
                <span>HE4</span>
              </router-link>
           </a-menu-item>

          </a-menu>
        </a-layout-sider>
        <a-layout-content style="padding:0 24px; minHeight:280px; height:84vh">
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center; height:6vh">
      Copyright © 2024 Biid
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import {useRouter} from "vue-router";
import {UserOutlined} from "@ant-design/icons-vue";
const selectedKeys2 = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);
const router = useRouter();
//console.log('s2',selectedKeys2.value)
</script>

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

.site-layout-background {
  background: #fff;
}

.custom-menu-item {
  margin-bottom: 10px;
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

.content {
  padding: 20px;
}
</style>

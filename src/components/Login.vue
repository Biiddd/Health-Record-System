<template>
  <div class="login">
    <div class="login-box">
      <div class="top">
        <div class="logo"></div>
      </div>
      <div class="mid">
        <a-form
            :model="formState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 10 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
          <a-form-item
              class="custom-label"
              label="用户名"
              name="username"
              :rules="[{ required: true, message: '请输入用户名!' }]"
          >
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item
              label="密码"
              name="password"
              :rules="[{ required: true, message: '请输入密码!' }]"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>

          <a-form-item name="remember" :wrapper-col="{ offset: 10, span: 16 }">
            <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
            <div class="item-btn">
              <a-button type="primary" html-type="submit">登录</a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
      <div class="bottom">
        Copyright © 2024 Biid
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, onMounted} from 'vue';
  import axios from 'axios';
  import {updateUserState} from '@/auth.js';
  import router from "@/router/index.js";

  const formState = reactive({
    username: '',
    password: '',
    remember: true,
  });

  // 在组件加载时，从本地存储中读取用户名和密码
  onMounted(() => {
    const storedUsername = localStorage.getItem('rememberedUsername');
    const storedPassword = localStorage.getItem('rememberedPassword');

    // 如果存储中有数据，填充到表单中，并设置“记住我”选项为true
    if (storedUsername && storedPassword) {
      formState.username = storedUsername;
      formState.password = storedPassword;
      formState.remember = true;
    }
  });

  const onFinish = async () => {
    try {
      const response = await axios.post('http://localhost:33001/api/login', formState);

      if (response.data.success) {
        //登录成功，获取服务器返回的用户信息
        const userInfo = formState.username;
        //console.log('登录成功');
        // 更新用户状态
        updateUserState(true, userInfo);

        // 如果选择了“记住我”，将用户名和密码存储到本地存储中
        if (formState.remember) {
          localStorage.setItem('rememberedUsername', formState.username);
          localStorage.setItem('rememberedPassword', formState.password);
          localStorage.setItem('isLoggedIn', true);
        } else {
          // 如果没有选择“记住我”，清除本地存储中的用户名和密码
          localStorage.removeItem('rememberedUsername');
          localStorage.removeItem('rememberedPassword');
        }
        // 跳转到首页
        router.push({ name: 'Home' });
      } else {
        // 账号密码错误，弹出错误信息
        alert(response.data.message || '用户名或密码错误');
      }
    } catch (error) {
      //console.error('登录请求失败1：', error);
      alert('登录失败，请稍后再试');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../assets/login-bg.png') no-repeat;
  background-size: cover;
  position: fixed;

  .login-box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    padding-top: 10%;

    .top {
      margin-bottom: 30px;
      text-align: center;

      .logo {
        font-size: 0;
        max-width: 50%;
        margin: 0 auto;
      }

      &:deep(.company) {
        font-size: 16px;
        margin-top: 10px;
      }
    }

    .mid {
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .item-btn {
        width: 410px;
        margin-top: 20px;

        input {
          border: 0;
          width: 100%;
          height: 40px;
          background: #1f87e8;
          color: #fff;
          border-radius: 3px;
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 10%;
      width: 100%;
      color: #999;
      font-size: 12px;
      text-align: center;
    }
  }
}

</style>
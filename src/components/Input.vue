<script setup>
import { toRefs, reactive } from "vue";
import axios from "axios";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { message } from "ant-design-vue";

const onDisabledDate = (current) => {
  return current && current > dayjs().endOf("day");
};

const labelCol = {
  style: {
    width: "150px",
  },
};
const wrapperCol = {
  span: 14,
};

const dateformat = "YYYY-MM-DD";
const checkData = reactive({
  date: null,
  checkHospital: null,
  ca125Value: null,
  ca199Value: null,
  ceaValue: null,
  ca153Value: null,
  ca724Value: null,
  he4Value: null,
});

const submitForm = () => {
  axios
    .post(`http://localhost:33001/api/input`, checkData)
    .then((response) => {
      console.log("提交表单成功：", response.data);
      message.success("数据录入成功");
    })
    .catch((error) => {
      console.error("提交表单失败：", error);
      message.warning("录入失败，请联系你崽");
    });
};
</script>

<template>
  <meta lang="zh" />

  <a-form
    @finish="submitForm"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    style="max-width: 600px"
  >
    <a-form-item label="日期">
      <a-date-picker
        size="large"
        placeholder="请选择日期"
        :format="dateformat"
        :value-format="dateformat"
        :locale="locale"
        :disabledDate="onDisabledDate"
        v-model:value="checkData.date"
      />
    </a-form-item>
    <a-form-item label="医院">
      <a-select
        v-model:value="checkData.checkHospital"
        size="large"
        placeholder="请选择化验医院"
      >
        <a-select-option value="1">北海人民医院</a-select-option>
        <a-select-option value="2">中山大学附属肿瘤医院</a-select-option>
        <a-select-option value="3">上海复旦大学附属肿瘤医院</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="CA125">
      <a-input-number
        v-model:value="checkData.ca125Value"
        size="large"
        :precision="2"
        :step="0.1"
      />
    </a-form-item>

    <a-form-item label="CA199" :wrapper-col="{ span: 16 }">
      <a-input-number
        v-model:value="checkData.ca199Value"
        size="large"
        :precision="2"
        :step="0.1"
      />
    </a-form-item>

    <a-form-item label="CEA">
      <a-input-number
        v-model:value="checkData.ceaValue"
        size="large"
        :precision="2"
        :step="0.1"
      />
    </a-form-item>

    <a-form-item label="CA153">
      <a-input-number
        v-model:value="checkData.ca153Value"
        size="large"
        :precision="2"
        :step="0.1"
      />
    </a-form-item>

    <a-form-item label="CA724">
      <a-input-number
        v-model:value="checkData.ca724Value"
        size="large"
        :precision="2"
        :step="0.1"
      />
    </a-form-item>

    <a-form-item label="HE4">
      <a-input-number
        v-model:value="checkData.he4Value"
        size="large"
        :precision="2"
        :step="0.1"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="submitForm()">上传</a-button>
    </a-form-item>
  </a-form>
</template>
<style scoped></style>

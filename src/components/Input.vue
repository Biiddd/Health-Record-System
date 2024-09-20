<script setup>
import { reactive, ref } from "vue";
import http from "@/http.js";
import dayjs from "dayjs";
import { message } from "ant-design-vue";

const testType = ref("blood");

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
  rbcValue: null,
  hbValue: null,
  wbcValue: null,
  pltValue: null,
  neutValue: null,
  weightValue: null,
});

const submitForm = async () => {
  if (checkData.date && checkData.checkHospital) {
    try {
      const response = await http.post("/input", checkData);
      message.success("录入成功");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.warn(error.response.data || "录入失败");
      } else {
        message.warn("录入失败，请检查网络连接");
      }
    }
  } else {
    message.warn("请填写完整信息");
  }
};
</script>

<template>
  <a-form
    class="main-form"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
  >
    <div class="date-hos">
      <a-form-item label="日期">
        <a-date-picker
            size="large"
            placeholder="请选择日期"
            :format="dateformat"
            :value-format="dateformat"
            :disabledDate="onDisabledDate"
            v-model:value="checkData.date"
        />
      </a-form-item>
      <a-form-item
        label="医院"
        :rules="[{ required: true, message: '请选择医院!' }]"
      >
        <a-select
          class="hos"
          v-model:value="checkData.checkHospital"
          size="large"
          placeholder="请选择化验医院"
        >
          <a-select-option value="1">北海人民医院</a-select-option>
          <a-select-option value="2">中山大学附属肿瘤医院</a-select-option>
          <a-select-option value="3">上海复旦大学附属肿瘤医院</a-select-option>
        </a-select>
      </a-form-item>
    </div>

    <a-form-item label="指标类型">
      <a-radio-group v-model:value="testType" button-style="solid" size="large">
        <a-radio-button value="blood">血常规</a-radio-button>
        <a-radio-button value="tumor">肿瘤指标</a-radio-button>
        <a-radio-button value="liver">肝功能</a-radio-button>
      </a-radio-group>
    </a-form-item>

    <div class="data-form">
      <div v-if="testType==='tumor'">
        <a-form-item label="CA125">
          <a-input-number
            class="check-item"
            v-model:value="checkData.ca125Value"
            size="large"
            :precision="2"
            :min="0"
            :step="0.1"
          />
        </a-form-item>

        <a-form-item label="CA199">
          <a-input-number
            class="check-item"
            v-model:value="checkData.ca199Value"
            size="large"
            :precision="2"
            :min="0"
            :step="0.1"
          />
        </a-form-item>

        <a-form-item label="CEA">
          <a-input-number
            class="check-item"
            v-model:value="checkData.ceaValue"
            size="large"
            :precision="2"
            :min="0"
            :step="0.1"
          />
        </a-form-item>

        <a-form-item label="CA153">
          <a-input-number
            class="check-item"
            v-model:value="checkData.ca153Value"
            size="large"
            :precision="2"
            :min="0"
            :step="0.1"
          />
        </a-form-item>

        <a-form-item label="CA724">
          <a-input-number
            class="check-item"
            v-model:value="checkData.ca724Value"
            size="large"
            :precision="2"
            :min="0"
            :step="0.1"
          />
        </a-form-item>

        <a-form-item label="HE4">
          <a-input-number
            class="check-item"
            v-model:value="checkData.he4Value"
            size="large"
            :precision="2"
            :min="0"
            :step="0.1"
          />
        </a-form-item>
      </div>

      <div v-if="testType==='blood'">
        <a-form-item label="红细胞">
          <a-input-number
            class="check-item"
            v-model:value="checkData.rbcValue"
            size="large"
            :precision="2"
            :min="0"
            :step="0.1"
          />
        </a-form-item>

        <a-form-item label="血红蛋白">
          <a-input-number
            class="check-item"
            v-model:value="checkData.hbValue"
            size="large"
            :precision="2"
            :min="0"
            :step="0.1"
          />
        </a-form-item>

        <a-form-item label="白细胞">
          <a-input-number
            class="check-item"
            v-model:value="checkData.wbcValue"
            size="large"
            :precision="2"
            :min="0"
            :step="0.1"
          />
        </a-form-item>

        <a-form-item label="血小板">
          <a-input-number
            class="check-item"
            v-model:value="checkData.pltValue"
            size="large"
            :precision="2"
            :min="0"
            :step="0.1"
          />
        </a-form-item>

        <a-form-item label="中性粒细胞数">
          <a-input-number
            class="check-item"
            v-model:value="checkData.neutValue"
            size="large"
            :precision="2"
            :min="0"
            :step="0.1"
          />
        </a-form-item>

        <a-form-item label="体重/kg">
          <a-input-number
            class="check-item"
            v-model:value="checkData.weightValue"
            size="large"
            :precision="2"
            :min="0"
            :step="0.1"
          />
        </a-form-item>
      </div>
    </div>

    <a-form-item :wrapper-col="{ offset: 7 }">
      <a-button class="submit-button" type="primary" @click="submitForm">
        上传
      </a-button>
    </a-form-item>
  </a-form>
</template>
<style scoped>
@import "./style/input.css";
</style>

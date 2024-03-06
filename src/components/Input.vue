<template>
  <meta lang="zh"/>
  <a-form
      @finish="submitForm"
      :label-col="labelCol"
      layout="horizontal"
      style="max-width: 600px"
  >
    <a-form-item label="日期">
      <a-date-picker placeholder="请选择日期"
                     :format="dateformat"
                     :value-format="dateformat"
                     :locale="locale"
                     :disabledDate="onDisabledDate"
                     v-model:value="checkData.date"
      />
    </a-form-item>

    <a-form-item label="医院">
      <a-select v-model:value="checkData.selectedHospital">
        <a-select-option value="hospital1">北海人民医院</a-select-option>
        <a-select-option value="hospital2">上海复旦肿瘤医院</a-select-option>
        <a-select-option value="hospital3">中山大学附属肿瘤医院</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="CA125">
      <a-input-number v-model:value="checkData.ca125Value"
        size="large"
        :precision="2"
        :step="0.1"/>
    </a-form-item>

    <a-form-item label="CA199">
      <a-input-number v-model:value="checkData.ca199Value"
        :precision="2"
        :step="0.1"/>
    </a-form-item>

    <a-form-item label="CEA">
      <a-input-number v-model:value="checkData.ceaValue"
        :precision="2"
        :step="0.1"/>
    </a-form-item>

    <a-form-item label="CA153">
      <a-input-number v-model:value="checkData.ca153Value"
        :precision="2"
        :step="0.1"/>
    </a-form-item>

    <a-form-item label="CA724">
      <a-input-number v-model:value="checkData.ca724Value"
        :precision="2"
        :step="0.1"/>
    </a-form-item>

    <a-form-item label="HE4">
      <a-input-number v-model:value="checkData.he4Value"
        :precision="2"
        :step="0.1"/>
    </a-form-item>

    <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 6 }">
      <a-button type="primary" @click="submitForm()">上传</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

const onDisabledDate = current => {
  return current && current > dayjs().endOf('day');
};

const labelCol = {
  style: {
    width: '150px',
  },
};
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

// const form =ref(null);
// const he4Value = ref(null);
// const ca125Value = ref(null);
// const ca199Value = ref(null);
// const ceaValue = ref(null);
// const ca153Value = ref(null);
// const ca724Value = ref(null);
//
// const checkData = {
//   ca125Value,
//   ca199Value,
//   ceaValue,
//   ca153Value,
//   ca724Value,
//   he4Value
// };

const dateformat = 'YYYY/MM/DD';
const checkData = reactive({
  date: null,
  selectedHospital: null,
  he4Value: null,
  ca125Value: null,
  ca199Value: null,
  ceaValue: null,
  ca153Value: null,
  ca724Value: null
});

const submitForm = () => {
  axios.post('/api/submit', { checkData });

  // 在这个例子中，简单地打印 he4Value 的值
  console.log('表单输入的值', checkData);
};

</script>
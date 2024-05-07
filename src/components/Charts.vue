<template>
  <div>
    <a-range-picker v-model:value="selectDate" @change="onDateChange" size="large" :locale="locale"/>
    <a-select v-model:value="selectType" @change="onTypeChange" size="large">
      <a-select-option value="CA125">CA125</a-select-option>
      <a-select-option value="CA199">CA199</a-select-option>
      <a-select-option value="CEA">CEA</a-select-option>
      <a-select-option value="CA153">CA153</a-select-option>
      <a-select-option value="CA724">CA724</a-select-option>
      <a-select-option value="HE4">HE4</a-select-option>
      </a-select>
  </div>
  <div id="main" style="width: 1200px; height: 600px"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import * as echarts from "echarts";
import { useRoute } from "vue-router";
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';

const route = useRoute();

const selectDate = ref();
const onDateChange = (dateArray) => {
  if (Array.isArray(dateArray) && dateArray.length === 2) {
    // 使用 dayjs 格式化日期
    const formattedStartDate = dayjs(dateArray[0]).format('YYYY-MM-DD');
    const formattedEndDate = dayjs(dateArray[1]).format('YYYY-MM-DD');

    console.log('开始日期:', formattedStartDate);
    console.log('结束日期:', formattedEndDate);
}}

const selectType = ref();
const onTypeChange = (value) => {
  console.log('选择的指标类型:', value);
}

const myChart = ref(null);
const initializeChart = async () => {
  const chartType = route.params.chartType;

  try {
    const response = await axios.get(
      `http://localhost:33001/api/charts/${chartType}`
    );
    const rawData = response.data;

    const xData = rawData.map((item) => item.date);
    const yData = rawData.map((item) => item.value);

    const option = {
      title: {
        text: `最近五次 ${chartType.toUpperCase()} 的值`,
      },
      xAxis: {
        type: "category",
        data: xData,
        name: "日期",
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: yData,
          type: "line",
          label: {
            show: true,
            formatter: { yData },
          },
        },
      ],
    };

    myChart.value.setOption(option);
  } catch (error) {
    //console.error('获取数据失败：', error);
  }
};

onMounted(() => {
  myChart.value = echarts.init(document.getElementById("main"));
  initializeChart();
});

watch(() => route.params.chartType, initializeChart);
</script>

<style scoped></style>

<script setup>
import { reactive } from "vue";
import dayjs from "dayjs";
import * as echarts from "echarts";
import http from "@/http.js";

const chart = reactive({
  Date: null,
  Type: null,
});

const confirmQuery = async () => {
  // 格式化日期
  const formattedStartDate = dayjs(chart.Date[0]).format("YYYY-MM-DD");
  const formattedEndDate = dayjs(chart.Date[1]).format("YYYY-MM-DD");
  const response = await http.get("/charts", {
    params: {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      chartType: chart.Type,
    },
  });

  const data = response.data;

  // 提取数据进行渲染
  const xData = data.map((item) => item.date);
  const yData = data.map((item) => item.value);
  // 设置阈值
  let threshold = 0;
  if (chart.Type === "CA125") {
    threshold = 35;
  } else if (chart.Type === "CA199") {
    threshold = 37;
  } else if (chart.Type === "CEA") {
    threshold = 5;
  } else if (chart.Type === "CA153") {
    threshold = 25;
  } else if (chart.Type === "CA724") {
    threshold = 6.9;
  } else if (chart.Type === "HE4") {
    threshold = 70;
  }

  const option = {
    title: {
      text: `${formattedStartDate} 到 ${formattedEndDate} ${chart.Type}趋势`,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
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
        smooth: true,
        label: {
          show: true,
          position: "top",
        },
        markLine: {
          data: [
            {
              yAxis: threshold,
              name: "",
              lineStyle: {
                color: "red",
                type: "dashed",
              },
              label: {
                show: true,
                position: "middle",
                formatter: (params) => {
                  return `阈值: ${params.value}`;
                },
                color: "red",
              },
              symbol: "none",
            },
          ],
        },
      },
    ],
  };
  const myChart = echarts.init(document.getElementById("main"));
  myChart.setOption(option);
};
</script>

<template>
  <a-form layout="inline">
    <a-form-item class="date-picker" label="选择日期范围">
      <a-range-picker v-model:value="chart.Date" />
    </a-form-item>
    <a-form-item label="指标类型">
      <a-select v-model:value="chart.Type" placeholder="选一种指标">
        <a-select-option value="CA125">CA125</a-select-option>
        <a-select-option value="CA199">CA199</a-select-option>
        <a-select-option value="CEA">CEA</a-select-option>
        <a-select-option value="CA153">CA153</a-select-option>
        <a-select-option value="CA724">CA724</a-select-option>
        <a-select-option value="HE4">HE4</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="confirmQuery()">确定</a-button>
    </a-form-item>
  </a-form>
  <div id="main" style="width: 1200px; height: 550px"></div>
</template>

<style scoped>
.date-picker {
  margin-bottom: 8px;
}
</style>

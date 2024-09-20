<script setup>
import { reactive, watch } from "vue";
import dayjs from "dayjs";
import * as echarts from "echarts";
import http from "@/http.js";

const chart = reactive({
  Date: null,
  Type: null,
});

const disabledDate = (current) => {
  return current && current > dayjs().endOf("day");
};
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

watch([() => chart.Date, () => chart.Type], () => {
  confirmQuery();
});
</script>

<template>
  <a-row :gutter="[16, 48]" style="margin-bottom: 20px">
    <a-col :span="24">
      <span class="common-text"> 今天是 {{ dayjs().format("YYYY-MM-DD") }}, 请在下方输入今天的体重 </span>
    </a-col>
  </a-row>
  <a-form layout="inline">
    <a-form-item class="date-picker" label="选择日期范围">
      <a-range-picker
        v-model:value="chart.Date"
        :disabled-date="disabledDate"
      />
    </a-form-item>
  </a-form>
  <div id="main" style="width: 1200px; height: 550px"></div>
</template>

<style scoped>
.date-picker {
  margin-bottom: 8px;
}
.common-text {
  font-size: 32px;
  font-weight: bolder;
  padding-bottom: 20px;
}
</style>

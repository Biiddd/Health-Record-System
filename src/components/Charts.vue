<template>
    <div id="main" style="width: 1200px; height: 600px;"></div>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue';
    import axios from 'axios';
    import * as echarts from 'echarts';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const myChart = ref(null);
    const initializeChart = async () => {
    const chartType = route.params.chartType;

    try {
        const response = await axios.get(`http://localhost:33001/api/charts/${chartType}`);
        const rawData = response.data;

        const xData = rawData.map(item => item.date);
        const yData = rawData.map(item => item.value);

        const option = {
            title: {
                text: `最近五次 ${chartType.toUpperCase()} 的值`,
            },
            xAxis: {
                type: 'category',
                data: xData,
                name: '日期',
            },
            yAxis: {
                type: 'value',
            },
            series: [{
                data: yData,
                type: 'line',
                label: {
                    show: true,
                    formatter: {yData},
                }
            }]
        };

        myChart.value.setOption(option);
    } catch (error) {
        //console.error('获取数据失败：', error);
    }
};

onMounted(() => {
    myChart.value = echarts.init(document.getElementById('main'));
    initializeChart();
});

watch(() => route.params.chartType, initializeChart);
</script>
  
<style scoped>
</style>
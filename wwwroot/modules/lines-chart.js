// Classic example:
//
import '../lib/chart.min.js'

export function DrawPlot() {
    const COLORS = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };

    const MONTHS = [
        'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];

    let config = {
        type: 'line',
        data: {
            labels: MONTHS.slice(0, 6),
            datasets: [{
                label: 'Sample dataset',
                backgroundColor: COLORS.red,
                borderColor: COLORS.red,
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                fill: false,
            }, {
                label: 'Second dataset',
                fill: false,
                backgroundColor: COLORS.blue,
                borderColor: COLORS.blue,
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    },
                    ticks: {
                        min: -100,
                        max: 100
                    }
                }]
            }
        }
    };

    const ctx = document.getElementById('canvas').getContext('2d');
    let _chart = new Chart(ctx, config);

    // ---- Commands -----
    document.getElementById('randomizeData').addEventListener('click', function () {
        config.data.datasets.forEach(function (dataset) {
            dataset.data = dataset.data.map(function () {
                return randomScalingFactor();
            });

        });

        _chart.update();
    });

    let colorNames = Object.keys(COLORS);
    document.getElementById('addDataset').addEventListener('click', function () {
        let colorName = colorNames[config.data.datasets.length % colorNames.length];
        let newColor = COLORS[colorName];
        let newDataset = {
            label: 'Dataset ' + config.data.datasets.length,
            backgroundColor: newColor,
            borderColor: newColor,
            data: [],
            fill: false
        };

        for (let index = 0; index < config.data.labels.length; ++index) {
            newDataset.data.push(randomScalingFactor());
        }

        config.data.datasets.push(newDataset);
        _chart.update();
    });

    document.getElementById('addData').addEventListener('click', function () {
        if (config.data.datasets.length > 0 && config.data.labels.length < 12) {
            let month = MONTHS[config.data.labels.length % MONTHS.length];
            config.data.labels.push(month);

            config.data.datasets.forEach(function (dataset) {
                dataset.data.push(randomScalingFactor());
            });

            _chart.update();
        }
    });

    document.getElementById('removeDataset').addEventListener('click', function () {
        config.data.datasets.splice(0, 1);
        _chart.update();
    });

    document.getElementById('removeData').addEventListener('click', function () {
        config.data.labels.splice(-1, 1); // remove the label first

        config.data.datasets.forEach(function (dataset) {
            dataset.data.pop();
        });

        _chart.update();
    });

    // ----- UTILS -----
    function randomScalingFactor() {
        return randomIntFromInterval(-90, 90);
    };

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
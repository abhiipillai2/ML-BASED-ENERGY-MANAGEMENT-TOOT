//graph section

//local variables
let left = 20;
let right = 30;
let topp = 20;
let bottom = 180;

//for graph responceve
if (width <= 600) {
    left = 10
    right = 15
    topp = 10
    bottom = -21
} else if (width > 600) {
    left = 20
    right = 30
    topp = 20
    bottom = 180
}

//power-grph
const powerGraphMaster = () => {
    var ctx = document.getElementById('powerGraph').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: labelMaster,
            datasets: [{
                label: 'time period power in Kwh',
                backgroundColor: '#77b568',
                borderColor: 'rgb(255, 99, 132)',
                data: dataMaster.reverse()
            }]
        },
        // Configuration options go here

        options: {
            layout: {
                padding: {
                    left: left,
                    right: right,
                    top: topp,
                    bottom: bottom
                }
            }
        }
    });
};

//power graph
powerGraphMaster()

//vi-graph
const viGraphGenerator = () => {
        var ctx = document.getElementById('viGraph').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: viLabelMaster,
                datasets: [{
                    label: 'V-I graph',
                    borderColor: ' #77b568',
                    color: '#77b568',
                    data: viMaster.reverse()
                }]
            },

            // Configuration options go here
            options: {
                layout: {
                    padding: {
                        left: 10,
                        right: 20,
                        top: 0,
                        bottom: 10 //70
                    }
                }
            }
        });
    }
    //vi graph
viGraphGenerator()

//pf-graph
const ppGraphGenerator = () => {
    var ctx = document.getElementById('ppGraph').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ppLebelMaster,
            datasets: [{
                label: 'p-p graph',
                borderColor: ' #77b568',
                color: '#77b568',
                data: ppMaster.reverse()
            }]
        },

        // Configuration options go here
        options: {
            layout: {
                padding: {
                    left: 10,
                    right: 20,
                    top: 0,
                    bottom: 10 //70
                }
            }
        }
    });
}
ppGraphGenerator()
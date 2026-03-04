// Sector Data
const YEARS = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];

const SECTOR_DATA = {
    auto: {
        name: 'NIFTY AUTO',
        index: [7000, 8000, 10500, 8500, 8200, 9500, 14500, 15500, 19500, 24500, 28000],
        pe: [41.03, 32.03, 41.24, 25.58, 23.70, 300.52, 59.97, 38.36, 25.18, 22.71, 30.10],
        revenue: [450, 486, 549, 576, 593, 516, 676, 744, 811, 900, 972],
        constituents: 15,
        topStock: 'Mahindra & Mahindra',
        topStockWeight: '24.98%'
    },
    bank: {
        name: 'NIFTY BANK',
        index: [17500, 19200, 24500, 23800, 26500, 22000, 35000, 38500, 45000, 50500, 60000],
        pe: [14.2, 13.8, 18.5, 16.2, 14.5, 22.3, 19.8, 15.6, 14.2, 15.8, 16.4],
        revenue: [850, 920, 1050, 1100, 1180, 1050, 1420, 1550, 1720, 1910, 2100],
        constituents: 12,
        topStock: 'HDFC Bank',
        topStockWeight: '28.17%'
    },
    it: {
        name: 'NIFTY IT',
        index: [11500, 11800, 13500, 14200, 16500, 15800, 30500, 30800, 33500, 39500, 45000],
        pe: [19.5, 18.2, 20.8, 19.3, 21.5, 24.2, 28.6, 25.4, 24.1, 26.3, 27.2],
        revenue: [520, 550, 610, 680, 750, 710, 980, 1090, 1200, 1350, 1480],
        constituents: 10,
        topStock: 'TCS',
        topStockWeight: '29.44%'
    },
    fmcg: {
        name: 'NIFTY FMCG',
        index: [22000, 24500, 28500, 31000, 32500, 33000, 39000, 43500, 48000, 54500, 62000],
        pe: [36.5, 34.2, 38.9, 42.1, 45.2, 48.6, 52.3, 48.7, 46.2, 50.1, 54.8],
        revenue: [380, 410, 450, 485, 510, 520, 590, 650, 710, 780, 860],
        constituents: 15,
        topStock: 'Hindustan Unilever',
        topStockWeight: '31.22%'
    },
    pharma: {
        name: 'NIFTY PHARMA',
        index: [12500, 13200, 15800, 14500, 14200, 16800, 21500, 22800, 26500, 32500, 38000],
        pe: [22.4, 20.8, 24.5, 19.6, 18.3, 28.4, 32.6, 24.8, 22.5, 26.7, 29.2],
        revenue: [340, 370, 420, 460, 490, 480, 560, 640, 720, 810, 900],
        constituents: 10,
        topStock: 'Sun Pharmaceutical',
        topStockWeight: '22.45%'
    }
};

// Global chart instance
let mainChart = null;

// Utility Functions
function normalize(arr) {
    const max = Math.max(...arr);
    return arr.map(val => val / max);
}

function calculateEPS(index, pe) {
    return index.map((val, i) => val / pe[i]);
}

function formatNumber(num, decimals = 2) {
    return num.toLocaleString('en-IN', { 
        minimumFractionDigits: decimals, 
        maximumFractionDigits: decimals 
    });
}

function calculateCAGR(startValue, endValue, years) {
    return (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
}

// Chart Creation
function createChart(sector, metricType) {
    const data = SECTOR_DATA[sector];
    const eps = calculateEPS(data.index, data.pe);
    
    // Normalize data
    const indexNorm = normalize(data.index);
    const peNorm = normalize(data.pe);
    const epsNorm = normalize(eps);
    const revenueNorm = normalize(data.revenue);
    
    const datasets = [];
    
    // Dataset configuration helper
    const createDataset = (label, normData, actualData, color) => ({
        label: label,
        data: normData,
        actualData: actualData, // Store for custom tooltip
        borderColor: color,
        backgroundColor: color + '20',
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: color,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        tension: 0.4,
        fill: false
    });
    
    // Add datasets based on metric selection
    switch(metricType) {
        case 'all':
            datasets.push(
                createDataset('Index', indexNorm, data.index, '#1f77b4'),
                createDataset('PE Ratio', peNorm, data.pe, '#ff7f0e'),
                createDataset('EPS', epsNorm, eps, '#2ca02c'),
                createDataset('Revenue/Share', revenueNorm, data.revenue, '#d62728')
            );
            break;
        case 'index':
            datasets.push(createDataset('Index', indexNorm, data.index, '#1f77b4'));
            break;
        case 'pe':
            datasets.push(createDataset('PE Ratio', peNorm, data.pe, '#ff7f0e'));
            break;
        case 'eps':
            datasets.push(createDataset('EPS', epsNorm, eps, '#2ca02c'));
            break;
        case 'revenue':
            datasets.push(createDataset('Revenue/Share', revenueNorm, data.revenue, '#d62728'));
            break;
        case 'pe_eps':
            datasets.push(
                createDataset('PE Ratio', peNorm, data.pe, '#ff7f0e'),
                createDataset('EPS', epsNorm, eps, '#2ca02c')
            );
            break;
        case 'pe_revenue':
            datasets.push(
                createDataset('PE Ratio', peNorm, data.pe, '#ff7f0e'),
                createDataset('Revenue/Share', revenueNorm, data.revenue, '#d62728')
            );
            break;
        case 'revenue_eps':
            datasets.push(
                createDataset('Revenue/Share', revenueNorm, data.revenue, '#d62728'),
                createDataset('EPS', epsNorm, eps, '#2ca02c')
            );
            break;
    }
    
    // Destroy existing chart
    if (mainChart) {
        mainChart.destroy();
    }
    
    // Create new chart
    const ctx = document.getElementById('mainChart').getContext('2d');
    mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: YEARS,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: `${data.name} - Normalized Trend Analysis`,
                    font: {
                        size: 20,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 13,
                            weight: '600'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const actualValue = context.dataset.actualData[context.dataIndex];
                            const normalizedValue = context.parsed.y;
                            return [
                                `${label}: ${formatNumber(actualValue)}`,
                                `Normalized: ${normalizedValue.toFixed(4)}`
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1.05,
                    title: {
                        display: true,
                        text: 'Normalized Value (0-1 Scale)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(2);
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

// Update Info Cards
function updateInfoCards(sector) {
    const data = SECTOR_DATA[sector];
    const eps = calculateEPS(data.index, data.pe);
    
    const cagr = calculateCAGR(data.index[0], data.index[data.index.length - 1], 10);
    const totalGrowth = ((data.index[data.index.length - 1] - data.index[0]) / data.index[0]) * 100;
    const avgPE = data.pe.reduce((a, b) => a + b, 0) / data.pe.length;
    const currentPE = data.pe[data.pe.length - 1];
    const currentIndex = data.index[data.index.length - 1];
    
    const cardsHTML = `
        <div class="info-card">
            <h3>Sector Name</h3>
            <p>${data.name}</p>
        </div>
        <div class="info-card">
            <h3>Constituents</h3>
            <p>${data.constituents} Stocks</p>
        </div>
        <div class="info-card">
            <h3>Top Holding</h3>
            <p style="font-size: 1.2rem;">${data.topStock} (${data.topStockWeight})</p>
        </div>
        <div class="info-card ${cagr > 0 ? 'positive' : 'negative'}">
            <h3>10-Year CAGR</h3>
            <p>${formatNumber(cagr, 2)}%</p>
        </div>
        <div class="info-card ${totalGrowth > 0 ? 'positive' : 'negative'}">
            <h3>Total Growth</h3>
            <p>${formatNumber(totalGrowth, 1)}%</p>
        </div>
        <div class="info-card">
            <h3>Average PE (10Y)</h3>
            <p>${formatNumber(avgPE, 1)}x</p>
        </div>
        <div class="info-card">
            <h3>Current PE (2025)</h3>
            <p>${formatNumber(currentPE, 1)}x</p>
        </div>
        <div class="info-card">
            <h3>Current Index</h3>
            <p>${formatNumber(currentIndex, 0)}</p>
        </div>
    `;
    
    document.getElementById('infoCards').innerHTML = cardsHTML;
}

// Update Chart Title
function updateChartTitle(sector) {
    const data = SECTOR_DATA[sector];
    document.getElementById('chartTitle').textContent = `${data.name} - Normalized Trend Analysis`;
}

// Create Data Table
function createDataTable(sector) {
    const data = SECTOR_DATA[sector];
    const eps = calculateEPS(data.index, data.pe);
    
    let tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Index Value</th>
                    <th>PE Ratio</th>
                    <th>EPS (₹)</th>
                    <th>Revenue/Share (₹)</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    YEARS.forEach((year, i) => {
        tableHTML += `
            <tr>
                <td><strong>${year}</strong></td>
                <td>${formatNumber(data.index[i], 0)}</td>
                <td>${formatNumber(data.pe[i], 2)}</td>
                <td>${formatNumber(eps[i], 2)}</td>
                <td>${formatNumber(data.revenue[i], 0)}</td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
    `;
    
    document.getElementById('dataTable').innerHTML = tableHTML;
}

// Download CSV
function downloadCSV(sector) {
    const data = SECTOR_DATA[sector];
    const eps = calculateEPS(data.index, data.pe);
    
    let csv = 'Year,Index Value,PE Ratio,EPS,Revenue/Share\n';
    
    YEARS.forEach((year, i) => {
        csv += `${year},${data.index[i]},${data.pe[i]},${eps[i].toFixed(2)},${data.revenue[i]}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name}_Analysis_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Main Update Function
function updateDashboard() {
    const sector = document.getElementById('sectorSelect').value;
    const metric = document.getElementById('metricSelect').value;
    
    createChart(sector, metric);
    updateInfoCards(sector);
    updateChartTitle(sector);
    createDataTable(sector);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Chart.js to load
    function initDashboard() {
        if (typeof Chart !== 'undefined') {
            updateDashboard();
            
            // Attach event listeners
            document.getElementById('sectorSelect').addEventListener('change', updateDashboard);
            document.getElementById('metricSelect').addEventListener('change', updateDashboard);
            document.getElementById('refreshBtn').addEventListener('click', updateDashboard);
            
            document.getElementById('showTableBtn').addEventListener('click', function() {
                const table = document.getElementById('dataTable');
                if (table.style.display === 'none') {
                    table.style.display = 'block';
                    this.textContent = 'Hide Data Table';
                } else {
                    table.style.display = 'none';
                    this.textContent = 'Show Data Table';
                }
            });
            
            document.getElementById('downloadBtn').addEventListener('click', function() {
                const sector = document.getElementById('sectorSelect').value;
                downloadCSV(sector);
            });
        } else {
            setTimeout(initDashboard, 100);
        }
    }
    
    initDashboard();
});

// Handle window resize
window.addEventListener('resize', function() {
    if (mainChart) {
        mainChart.resize();
    }
});

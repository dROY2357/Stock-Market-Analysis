//Function to render Chart data of given stock and Peak/Low stock values in given range

export async function renderChart(stock, dur) {
  try {
    const response = await fetch(
      "https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata"
    );
    const result = await response.json();
    //console.log(result.stocksData[0][stock][dur]);
    const labels = result.stocksData[0][stock][dur].timeStamp;
    const values = result.stocksData[0][stock][dur].value;
    const newlabels = labels.map((timestamp) =>
      new Date(timestamp * 1000).toLocaleDateString()
    );

    const chartEle = document.getElementById("chartDisplay");
    var config = { responsive: true, displayModeBar: false };
    Plotly.newPlot(
      chartEle,
      [
        {
          x: newlabels,
          y: values,
        },
      ],
      {
        title: `${stock} - ${dur}`,
        margin: { t: 40, b: 10, l: 30, r: 10 },
        xaxis: {
          title: "", // Hide y-axis title
          showticklabels: false, // Hide y-axis tick labels
        },
      },
      config
    );

    //Function to calc and render the peak and low stock data

    const peakDataElen = document.querySelector("#peakData");
    const lowDataElen = document.querySelector("#lowData");
    peakDataElen.textContent = Math.max(...values).toFixed(3);
    lowDataElen.textContent = Math.min(...values).toFixed(3);
  } catch (error) {}
}

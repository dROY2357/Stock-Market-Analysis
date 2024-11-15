export async function renderChart(stock, dur) {
  try {
    const response = await fetch(
      "https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata"
    );
    const result = await response.json();
    console.log(result);
    //console.log(result.stocksData[0][stock][dur]);
    const labels = result.stocksData[0][stock][dur].timeStamp;
    const values = result.stocksData[0][stock][dur].value;
    const newlabels = labels.map((timestamp) =>
      new Date(timestamp * 1000).toLocaleDateString()
    );
    console.log(newlabels);
    console.log(values);

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
  } catch (error) {}
}

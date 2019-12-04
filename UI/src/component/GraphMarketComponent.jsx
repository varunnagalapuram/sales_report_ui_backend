import React,{Component} from 'react'
import CanvasJSReact from './../canvasjs.react'
import StoreDataService from './../service/SalesDataService'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

class GraphMarketComponent extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
			stores: [], 
			barGraphdata: []     
        }
        
        this.refreshStores = this.refreshStores.bind(this)
    }
    componentDidMount() {
        this.refreshStores();
    }
    refreshStores() {
        StoreDataService.retrieveAllStores()
            .then(
                response => {
					
					this.setState({ stores: response.data })
					//var dataLen = response.data.length;
					var tempData = response.data;
					var tempBarData = [];
					for ( var i=0;i<20;i++){
						tempBarData.push({y: tempData[i].dist_market, label: (tempData[i].store_area+" "+tempData[i].store_id)})
					}
					this.setState({ barGraphdata: tempBarData});
					console.log(tempBarData)
					console.log(this.state.stores)
                }
            )
    }
	render() {
		const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Stores Distance to Market"
			},
			axisX: {
				title: "Store Names",
				reversed: true,
			},
			axisY: {
				title: "Distance(Metres)",
				labelFormatter: this.addSymbols
			},
			data: [{
				type: "bar",
				dataPoints: this.state.barGraphdata
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
	addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
}
export default  GraphMarketComponent;  
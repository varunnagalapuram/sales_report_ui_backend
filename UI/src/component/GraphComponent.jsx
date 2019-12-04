import React,{Component} from 'react'
import CanvasJSReact from './../canvasjs.react'
//var CanvasJS = CanvasJSReact.CanvasJS;
import StoreDataService from './../service/SalesDataService'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class GraphComponent extends Component {
    
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
					var dataLen = response.data.length;
					var tempData = response.data;
					var tempBarData = [];
					for ( var i=0;i<20;i++){
						tempBarData.push({x: tempData[i].store_id, y: tempData[i].store_sales})
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
			title:{
				text: "Sales of stores"
			},
			axisX: {
				valueFormatString: "###",
				title: "Store ID"
			},
			axisY: {
				title: "Sales (in USD)",
				prefix: "$",
				includeZero: true
			},
			data: [{
				yValueFormatString: "$##",
				xValueFormatString: "####",
				type: "spline",
				dataPoints:  this.state.barGraphdata
				/* [ {ss: 5,ss2:10},{ ss: 15,ss2:20},{ ss: 265,ss2:100}]*/
				/*dataPoints: 
					this.state.stores.map((stores) =>{[{x:stores.store_id,y:stores.store_sales}]})*/
				
                
            }]		
	}
	console.log(options.data.dataPoints)
return(<div>
	<CanvasJSChart options = {options} />	
	{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
</div>
);
	
}
}
export default  GraphComponent;  
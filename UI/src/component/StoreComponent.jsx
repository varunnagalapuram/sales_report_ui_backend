import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import StoreDataService from './../service/SalesDataService'
class StoreComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      dist_taxi: 0,
      dist_market: 0,
      dist_metro: 0,
      items_available: 0,
      daily_cust_count: 0,
      store_sales: 0,
      store_area: '',
      parking: '',
      coupon_category: ''
    }
    this.onSubmit=this.onSubmit.bind(this);
  }
  componentDidMount() {

    console.log(this.state.id)

    // eslint-disable-next-line
    if (this.state.id == -1) {
      return
    }

    StoreDataService.retrieveStore(this.state.id)
      .then(response => this.setState({
        dist_taxi: response.data.dist_taxi,
        dist_market: response.data.dist_market,
        dist_metro: response.data.dist_metro,
        items_available: response.data.items_available,
        daily_cust_count: response.data.daily_cust_count,
        store_sales: response.data.store_sales,
        store_area: response.data.store_area,
        parking: response.data.parking,
        coupon_category: response.data.coupon_category
      }))
  }

  onSubmit(values) {
    console.log(values);
}
  render() {
    let { dist_taxi,dist_market,dist_metro,items_available,daily_cust_count,store_sales,store_area,parking,coupon_category, id } = this.state

    return (
      <div>
        <h3>Store</h3>
        <div className="container">
        <Formik
                    initialValues={{ dist_taxi,dist_market,dist_metro,items_available,daily_cust_count,store_sales,store_area,parking,coupon_category, id }}
                    onSubmit={this.onSubmit}
                >
                {
                  (props)=>(
                    <Form>
                      <fieldset>
                        <label>ID</label>
                        <Field className="form-control" type="text" name="id" disabled />
                      </fieldset>
                      <fieldset>
                        <label>DIST TO TAXI</label>
                        <Field className="form-control" type="text" name="dist_taxi" />
                      </fieldset>
                      <fieldset>
                        <label>DIST TO MARKET</label>
                        <Field className="form-control" type="text" name="dist_market"/>
                      </fieldset>
                      <fieldset>
                        <label>DIST TO METRO</label>
                        <Field className="form-control" type="text" name="dist_metro"/>
                      </fieldset>
                      <fieldset>
                        <label>ITEMS AVAILABLE</label>
                        <Field className="form-control" type="text" name="items_available" />
                      </fieldset>
                      <fieldset>
                        <label>DAILY CUSTOMER COUNT</label>
                        <Field className="form-control" type="text" name="daily_cust_count" />
                      </fieldset>
                      <fieldset>
                        <label>STORE SALES</label>
                        <Field className="form-control" type="text" name="store_sales"  />
                      </fieldset>
                      <fieldset>
                        <label>STORE AREA</label>
                        <Field className="form-control" type="text" name="store_area"  />
                      </fieldset>
                      <fieldset>
                        <label>PARKING</label>
                        <Field className="form-control" type="text" name="parking"  />
                      </fieldset>
                      <button className="btn btn-success" type="submit">UPDATE</button>
                    </Form>
                  )
                }
                </Formik>
        <div>{id}</div>
        <div>{dist_taxi}</div>
        <div>{dist_market}</div>
        <div>{dist_metro}</div>
        <div>{items_available}</div>
        <div>{daily_cust_count}</div>
        <div>{store_sales}</div>
        <div>{store_area}</div>
        <div>{parking}</div>
        <div>{coupon_category}</div>
        </div>
      </div>
    )
  }

}

export default StoreComponent
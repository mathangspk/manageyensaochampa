import React, { Component, Fragment } from 'react';
import OrdersList from '../components/Order/OrdersList';
import { connect } from 'react-redux';
import * as actions from '../actions/orderActions';
import * as actionsProduct from '../actions/productActions';
import * as actionsCustomer from '../actions/customerActions';
import OrderItem from '../components/Order/OrderItem';
import { filter} from 'lodash'
class OrderListContainer extends Component {
constructor(props) {
    super(props)
    this.state ={
        keywordSearchOrder:'',
        orders: [],
        search: false
    }
}

    UNSAFE_componentWillMount() {
        this.props.listAll();
        this.props.getAllProduct();
        this.props.getAllCustomer();
    }
   componentDidUpdate(nextprop){
       var {keywordSearchOrder} = this.props
       console.log('did update')
       console.log(keywordSearchOrder)
       console.log(nextprop.keywordSearchOrder)
       if(keywordSearchOrder !== nextprop.keywordSearchOrder){
           console.log(keywordSearchOrder)
           console.log(this.props.customers)
           var {customers, orders} = this.props; 
           //return customerId from name
           var customer = filter(customers, (customer) => {
                return customer.name.indexOf(keywordSearchOrder) !== -1;
           })
           console.log(customer)
           console.log(this.props.orders) 
           var customerId = customer.map(({_id})=>{
               var getOrderByCustomerId = filter(orders, (order) =>{
                   return order.customerId.indexOf(_id) !== -1;
               })
               console.log(getOrderByCustomerId)
               this.setState( state =>{
                   const orders = state.orders.concat(getOrderByCustomerId);
                   const search = true;
                   return{
                       orders,
                       search
                   }
               })
               return _id
           })
           console.log(customerId)
           this.setState({
               keywordSearchOrder: keywordSearchOrder
        })
       }
   }
    render() {
        var orders;
        var {search} = this.state;
        if(search === false){
            orders = this.props.orders;
        }
        if(search){
            orders = this.state.orders;
        }
        console.log('render');
        console.log(orders.orders)
        return (
            <Fragment>
                <OrdersList>
                    {this.showOrders(orders)}
                </OrdersList>
            </Fragment>
        );
    }
    showOrders = (orders) => {
        var result = null;
        var {deleteOrder, products, customers} = this.props;
        if (orders.length > 0) {
            result = orders.map((order, index) => {
                return <OrderItem
                    key={index}
                    order={order}
                    index={index}
                    products = {products}
                    deleteOrder = {deleteOrder}
                    customers = {customers}
                >
                </OrderItem>
            })
        }
        return result;
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        orders: state.orders.orders,
        customers: state.customers.customers,
        keywordSearchOrder: state.keywordSearchOrder
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        listAll: () => {
            dispatch(actions.listAll())
        },
        getAllProduct: () => {
            dispatch(actionsProduct.getAllProduct())
        },
        deleteOrder: (_id) => {
            dispatch(actions.deleteOrder(_id))
        },
        getAllCustomer: () =>{
            dispatch(actionsCustomer.getAllCustomer())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListContainer);
import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import {filter} from 'lodash';
class OrderItem extends Component {
    deleteOrder = (_id) => {
        if (confirm('Ban co chac xoa?')) { //eslint-disable-line
            this.props.deleteOrder(_id);
        }
    }
    getNameCustomerById = (_id) => {
        var {customers} = this.props;
        var nameCustomer = filter(customers, customer => {
            return customer._id.toString().indexOf(_id) !== -1;
        })
        var name  = nameCustomer.map((name,index) =>{
            return name.name
        })
        return (String(name))
        
    }
    render() {
        var { _id, customerId, product, quantity, price, cash, status } = this.props.order;
        var { index } = this.props;
        var nameCustomer = this.getNameCustomerById(customerId);
        return (<Fragment>
            <tr key={_id}>
                <th scope="row">{index + 1}</th>
                <td ><span className =  "bg-primary text-white rounded">{nameCustomer}</span> </td>
                <td>{product}</td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td>{cash}</td>
                <td >
                <span className =  "bg-success text-white rounded ">{status}</span>
                </td>
                <td>
                    <Button className="btn btn-danger" onClick={() => this.deleteOrder(_id)}> <i className="fas fa-trash-alt"></i></Button> &nbsp;
                    <Link to={`/orders/${_id}/edit`} className="btn btn-success"><i className="fas fa-info"></i></Link>
                </td>
            </tr>
            </Fragment>
        );
    }
}

export default OrderItem;
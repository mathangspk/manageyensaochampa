import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class CustomerItem extends Component {
    deleteCustomer = (_id) => {
        this.props.deleteCustomer(_id);
    }
    render() {
        var { _id, name, address, facebook, phoneNumber } = this.props.customer;
        // var { index } = this.props;
        return (
            <tr key={_id}>
                <th>{name} </th>
                <td>{address}</td>
                <td>{facebook}</td>
                <td>{phoneNumber}</td>
                <td>
                    <Button onClick = {() =>this.deleteCustomer(_id)}>Xoa</Button>
                    <Link to={`/customers/${_id}/edit`} className="btn btn-success">Sua</Link>
                </td>
            </tr>
        );
    }
}

export default CustomerItem;
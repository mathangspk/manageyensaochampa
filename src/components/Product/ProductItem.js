import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class ProductItem extends Component {
    deleteProduct = (_id) => {
        this.props.deleteProduct(_id);
    }
    render() {
        var { _id, productId, title, description, price } = this.props.product;
        // var { index } = this.props;
        return (
            <tr key={_id}>
                <th>{productId} </th>
                <td>{title}</td>
                <td>{description}</td>
                <td>{price}</td>
                <td>
                    <Button onClick = {() =>this.deleteProduct(_id)}>Xoa</Button>
                    <Link to={`/products/${_id}/edit`} className="btn btn-success">Sua</Link>
                </td>
            </tr>
        );
    }
}

export default ProductItem;
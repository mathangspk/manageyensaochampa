import React, { Component, Fragment } from 'react'
import { Container, Table } from 'reactstrap';
// import * as actions from '../../actions/productActions';
import { connect } from 'react-redux';
class ProductList extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Product Id</th>
                                <th>Tên sản phẩm</th>
                                <th>Mô tả</th>
                                <th>Giá</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* show product item */}
                            {this.props.children}
                        </tbody>
                    </Table>
                </Container>
            </Fragment>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // addProduct: (product) => {
        //     dispatch(actions.addProduct(product))
        // }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
import React, { Component, Fragment } from 'react';
import ProductsList from '../components/Product/ProductsList';
import { connect } from 'react-redux';
import * as actions from '../actions/productActions';
import ProductItem from '../components/Product/ProductItem';
import PropTypes from 'prop-types';
class ProductListContainer extends Component {

    UNSAFE_componentWillMount() {
        this.props.getAllProduct();
    }

    render() {
        var { products } = this.props;
        return (
            <Fragment>
                <ProductsList>
                    {this.showProducts(products)}
                </ProductsList>
            </Fragment>
        );
    }

    showProducts = (products) => {
        var result = null;
        var {deleteProduct} = this.props;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return <ProductItem
                    key={index}
                    product={product}
                    index={index}
                    deleteProduct={deleteProduct}
                />
            })
        }
        return result;
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products.products
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllProduct: () => {
            dispatch(actions.getAllProduct())
        },
        deleteProduct: (_id) => {
            dispatch(actions.deleteProduct(_id))
        }
    }
}


ProductListContainer.propTypes = {
    deleteProduct: PropTypes.func.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);
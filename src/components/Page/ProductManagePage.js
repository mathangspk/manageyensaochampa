import React, { Component } from 'react';
import ProductListContainer from '../../containers/ProductListContainer';
import Control from '../../components/Product/Control/Control';
class ProductManagePage extends Component {
    render() {
        return (
            <div>
                <Control/>
                <ProductListContainer/>
            </div>
        );
    }
}

export default ProductManagePage;
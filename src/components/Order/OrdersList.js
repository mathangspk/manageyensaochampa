import React, { Component, Fragment } from 'react'
import { Container, Table } from 'reactstrap';
class OrderList extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên khách hàng</th>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* show order item */}
                            {this.props.children}
                        </tbody>
                    </Table>
                </Container>
            </Fragment>

        )
    }
}
export default (OrderList);
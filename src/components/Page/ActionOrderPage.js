import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    // Alert,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Container
} from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions/orderActions';
import * as productActions from '../../actions/productActions';
import * as customerActions from '../../actions/customerActions';
import { filter } from 'lodash'
class ActionOrderPage extends Component {

    state = {
        modal: false,
        _id: '',
        customerId: '',
        product: '',
        quantity: 0,
        price: 0,
        cash: 0,
        status: '',

        priceVND: '',
        cashVND: '',
        msg: '',
        nameCustomer: '',
        customers: []
    }
    convertNumberToVND = (SoTien) => {
        var ChuSo = [" không", " một", " hai", " ba", " bốn", " năm", " sáu", " bảy", " tám", " chín"];
        var Tien = ["", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ"];

        //1. Hàm đọc số có ba chữ số;
        function DocSo3ChuSo(baso) {
            var tram;
            var chuc;
            var donvi;
            var KetQua = "";
            tram = parseInt(baso / 100);
            chuc = parseInt((baso % 100) / 10);
            donvi = baso % 10;
            if (tram === 0 && chuc === 0 && donvi === 0) return "";
            if (tram !== 0) {
                KetQua += ChuSo[tram] + " trăm";
                if ((chuc === 0) && (donvi !== 0)) KetQua += " linh";
            }
            if ((chuc !== 0) && (chuc !== 1)) {
                KetQua += ChuSo[chuc] + " mươi";
                if ((chuc === 0) && (donvi !== 0)) KetQua = KetQua + " linh";
            }
            if (chuc === 1) KetQua += " mười";
            switch (donvi) {
                case 1:
                    if ((chuc !== 0) && (chuc !== 1)) {
                        KetQua += " mốt";
                    }
                    else {
                        KetQua += ChuSo[donvi];
                    }
                    break;
                case 5:
                    if (chuc === 0) {
                        KetQua += ChuSo[donvi];
                    }
                    else {
                        KetQua += " lăm";
                    }
                    break;
                default:
                    if (donvi !== 0) {
                        KetQua += ChuSo[donvi];
                    }
                    break;
            }
            return KetQua;
        }

        //2. Hàm đọc số thành chữ (Sử dụng hàm đọc số có ba chữ số)

        var DocTienBangChu = (SoTien) => {
            var lan = 0;
            var i = 0;
            var so = 0;
            var KetQua = "";
            var tmp = "";
            var ViTri = new Array([]);
            if (SoTien < 0) return "Số tiền âm !";
            if (SoTien === 0) return "Không đồng !";
            if (SoTien > 0) {
                so = SoTien;
            }
            else {
                so = -SoTien;
            }
            if (SoTien > 8999999999999999) {
                //SoTien = 0;
                return "Số quá lớn!";
            }
            ViTri[5] = Math.floor(so / 1000000000000000);
            if (isNaN(ViTri[5]))
                ViTri[5] = "0";
            so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
            ViTri[4] = Math.floor(so / 1000000000000);
            if (isNaN(ViTri[4]))
                ViTri[4] = "0";
            so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
            ViTri[3] = Math.floor(so / 1000000000);
            if (isNaN(ViTri[3]))
                ViTri[3] = "0";
            so = so - parseFloat(ViTri[3].toString()) * 1000000000;
            ViTri[2] = parseInt(so / 1000000);
            if (isNaN(ViTri[2]))
                ViTri[2] = "0";
            ViTri[1] = parseInt((so % 1000000) / 1000);
            if (isNaN(ViTri[1]))
                ViTri[1] = "0";
            ViTri[0] = parseInt(so % 1000);
            if (isNaN(ViTri[0]))
                ViTri[0] = "0";
            if (ViTri[5] > 0) {
                lan = 5;
            }
            else if (ViTri[4] > 0) {
                lan = 4;
            }
            else if (ViTri[3] > 0) {
                lan = 3;
            }
            else if (ViTri[2] > 0) {
                lan = 2;
            }
            else if (ViTri[1] > 0) {
                lan = 1;
            }
            else {
                lan = 0;
            }
            for (i = lan; i >= 0; i--) {
                tmp = DocSo3ChuSo(ViTri[i]);
                KetQua += tmp;
                if (ViTri[i] > 0) KetQua += Tien[i];
                if ((i > 0) && (tmp.length > 0)) KetQua += ',';//&& (!string.IsNullOrEmpty(tmp))
            }
            if (KetQua.substring(KetQua.length - 1) === ',') {
                KetQua = KetQua.substring(0, KetQua.length - 1);
            }
            KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2) + ' đồng';
            return KetQua;//.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
        }
        return DocTienBangChu(SoTien);
    }
    UNSAFE_componentWillMount() {
        this.props.getAllCustomer();
        
    }
    componentDidMount() {
        var { params } = this.props
        if (params !== null) { //update
            var { id } = this.props.match.params
            if (id) {
                this.props.getOrderEditing(id);
            }
        }
    }

    componentDidUpdate(nextprops) {
        const { orderEditting, productSelected, customers } = this.props;
        if (productSelected !== nextprops.productSelected) {
            var productPrice = productSelected.map((product) => {
                return parseInt(product.price)
            })
            this.setState({ price: Number(productPrice) })
        }
        if (orderEditting !== nextprops.orderEditting) {
            this.setState({
                _id: orderEditting._id,
                customerId: orderEditting.customerId,
                product: orderEditting.product,
                quantity: orderEditting.quantity,
                price: orderEditting.price,
                cash: orderEditting.cash,
                status: orderEditting.status
            })
        }

        if(customers !== nextprops.customers){
            this.setState({
                customers: customers
            })
        }

          //get customer nem
          var {customerId} =this.state;
          var nameCustomer = filter(customers, (customer) => {
              return customer._id.indexOf(customerId) !== -1
          })
          var name = nameCustomer.map(({name})=>{
              return name
          })
          var nameSaveState = String(name)
          if(customerId && nameSaveState !== this.state.nameCustomer){
              this.setState({
                  nameCustomer: nameSaveState
              })
          }
        var { price, cash } = this.state
        var priceVND = this.convertNumberToVND(price)
        var cashVND = this.convertNumberToVND(cash)
        if (priceVND !== this.state.priceVND && price)
            this.setState({
                priceVND
            })
        if (cashVND !== this.state.cashVND && cash)
            this.setState({
                cashVND
            })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.name === 'product') {
            this.props.getPriceFromProduct(e.target.value)
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const order = {
            _id: this.state._id,
            customerId: this.state.customerId,
            product: this.state.product,
            quantity: this.state.quantity,
            price: this.state.price,
            cash: this.state.cash,
            status: this.state.status
        }
        //action update Order
        this.props.updateOrder(order)
        this.props.history.goBack();
    }

    render() {
        var { products } = this.props;
        
        var { priceVND, cashVND, nameCustomer, product, quantity, price, cash, status } = this.state;
        
        var listProduct = products.map(({ title }, index) => {
            return (<option key={index}>{title}</option>)
        })
       

        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <InputGroup className='mb-3'>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>></InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="text"
                                name="customer"
                                id="customer"
                                placeholder="Tên khách hàng"
                                value={nameCustomer}
                                readOnly
                            ></Input>
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Sản phẩm</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="select"
                                name="product"
                                id="product"
                                value={product}
                                onChange={this.onChange}
                            >{listProduct}
                            </Input>
                        </InputGroup>

                        <InputGroup className='mb-3'>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Số lượng</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="number"
                                name="quantity"
                                id="quantity"
                                onChange={this.onChange}
                                value={quantity}
                            ></Input>
                        </InputGroup>
                        <Label for="order">
                            Giá: {priceVND !== null ? priceVND : null}
                        </Label>
                        <Input
                            type="number"
                            name="price"
                            id="price"
                            value={price}
                            onChange={this.onChange}
                            className='mb-3'
                        ></Input>
                        <Label for="order">
                            Tổng tiền: {cashVND !== null ? cashVND : null}
                        </Label>
                        <Input
                            type="number"
                            name="cash"
                            id="cash"
                            value={cash}
                            onChange={this.onChange}
                            className='mb-3'
                        ></Input>

                        <InputGroup className='mb-3'>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Trạng thái đơn hàng:</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="select"
                                name="status"
                                id="status"
                                value={status}
                                onChange={this.onChange}
                            >
                                <option >Khởi tạo đơn hàng</option>
                                <option>Đã đóng gói xong</option>
                                <option>Đang giao hàng</option>
                                <option>Đã giao thành công</option>
                            </Input>
                        </InputGroup>
                        <Button
                            type="submit"
                            color="dark"
                            block
                            style={{ marginBottom: '2rem' }}
                            onClick={this.onSubmit}
                        >Cập nhật đơn hàng</Button>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addNewOrder: (newOrder) => {
            dispatch(actions.addOrder(newOrder))
        },
        clearAction: () => {
            dispatch(actions.clearAction())
        },
        getOrderEditing: (id) => {
            dispatch(actions.getOrderEditRequest(id))
        },
        updateOrder: (order) => {
            dispatch(actions.updateOrder(order))
        },
        getPriceFromProduct: (product) => {
            dispatch(productActions.getPriceFromProduct(product))
        },
        getAllCustomer: () => {
            dispatch(customerActions.getAllCustomer());
        }


    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        orderEditting: state.orderEditting,
        isAuthenticated: state.auth.isAuthenticated,
        errorOrder: state.errorOrder,
        isCreateSuccess: state.orders.isCreateSuccess,
        products: state.products.products,
        productSelected: state.products.productSelected,
        customers: state.customers.customers
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ActionOrderPage);

import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Collapse,
    Card,
    CardBody,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../../actions/orderActions';
import * as productActions from '../../../actions/productActions';
import { filter } from 'lodash';
class OrderModal extends Component {
    state = {
        modal: false,
        nameCustomer: '',
        customerId: '',
        product: '',
        quantity: 0,
        price: 0,
        cash: 0,
        status: '',
        openSelectCustomer: false,

        priceVND: '',
        cashVND: '',
        msg: '',

        findName: '',
        findPhoneNumber: '',
        findAddress: '',
        findFacebook: '',
        customers: [],
        result: [],
        filteredName: false,
        filteredPhoneNumber: false

    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
        this.clearState()
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        if (e.target.name === 'product') {
            this.props.getPriceFromProduct(e.target.value)
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newOrder = {
            customerId: this.state.customerId,
            product: this.state.product,
            quantity: this.state.quantity,
            price: this.state.price,
            cash: this.state.cash,
            status: 'Khởi tạo đơn hàng',
        }
        //add order via addorder action
        this.props.addNewOrder(newOrder);
        //this.toggle();
    }

    clearState = () => {
        this.setState({
            nameCustomer: '',
            customerId: '',
            product: '',
            quantity: 0,
            price: 0,
            cash: 0,
            status: '',

            priceVND: '',
            cashVND: '',
            msg: '',

            findName: '',
            findPhoneNumber: '',
            findAddress: '',
            findFacebook: '',
        })
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
        this.setState({
            customers: this.props.customers
        })
    }
    componentDidUpdate(nextprops) {
        const { errorOrder, isCreateSuccess, productSelected } = this.props;
        if (productSelected !== nextprops.productSelected) {
            var productPrice = productSelected.map((product) => {
                return parseInt(product.price)
            })
            this.setState({ price: Number(productPrice) })
        }
        var { price, cash } = this.state;
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
        if (errorOrder !== nextprops.errorOrder) {
            console.log(errorOrder.msg)
            if (errorOrder.id === 'ADD_ORDER_FAIL') {
                this.setState({ msg: errorOrder.msg })
            } else {
                this.setState({ msg: null })
            }
        }
        if (isCreateSuccess) {
            this.toggle();
            this.props.clearAction();
        }
    }

    openSelectCustomer = () => {
        this.setState({
            openSelectCustomer: !this.state.openSelectCustomer,
            findName: '',
            findPhoneNumber: '',
            findAddress: '',
            findFacebook: '',
        })
    }
    selectCustomer = (_id,nameCustomer) => {
        this.setState({
            customerId: _id,
            openSelectCustomer: !this.state.openSelectCustomer,
            nameCustomer: nameCustomer
        })
    }
    render() {

        var { isAuthenticated, products, customers } = this.props;
        var { priceVND,
            nameCustomer,
            cashVND,
            product,
            quantity,
            price,
            cash,
            msg,
            openSelectCustomer,
            findAddress,
            findFacebook,
            findName,
            findPhoneNumber } = this.state;
        var listProduct = products.map(({ title }, index) => {
            return (<option key={index}>{title}</option>)
        })

        if (findName !== '') {
            customers = filter(customers, (customer) => {
                return customer.name.toLowerCase().indexOf(findName.toLowerCase()) !== -1;
            })
        }
        if (findAddress !== '') {
            customers = filter(customers, (customer) => {
                return customer.name.toLowerCase().indexOf(findAddress.toLowerCase()) !== -1;
            })
        }
        if (findFacebook !== '') {
            customers = filter(customers, (customer) => {
                return customer.name.toLowerCase().indexOf(findFacebook.toLowerCase()) !== -1;
            })
        }
        if (findPhoneNumber !== '') {
            customers = filter(customers, (customer) => {
                return customer.phoneNumber.toString().indexOf(findPhoneNumber) !== -1;
            })
        }
        var listCustomers = customers.map(({ _id, name, phoneNumber }, index) => {
            if (findName !== '' || findPhoneNumber !== '' || findFacebook !== '' || findAddress !== '') {
                return (
                    <ListGroupItem action key={index} onClick={() => this.selectCustomer(_id, name)} >{name} - {phoneNumber}</ListGroupItem>
                )
            } else {
                return null
            }
        })
        return (
            <div>
                {isAuthenticated ? (<Button
                    color='dark'
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >Add Order</Button>) : <h4>Please login to add Product</h4>}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader
                        toggle={this.toggle}
                    >Tạo đơn hàng mới
                    </ModalHeader>
                    <ModalBody>
                        {msg ? (<Alert color="danger">{msg}</Alert>) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <InputGroup className='mb-3'>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className="btn" onClick={() => this.openSelectCustomer()}>
                                            Select &nbsp;
                                            <i className="fas fa-angle-double-down"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type="text"
                                        name="customer"
                                        id="customer"
                                        placeholder="Tên khách hàng"
                                        value={nameCustomer}
                                        readOnly
                                    ></Input>

                                    <Collapse isOpen={openSelectCustomer} style={{ width: "100%" }}>
                                        <Card>
                                            <CardBody>
                                                <FormGroup>
                                                    <InputGroup className='mb-2'>
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>Tên: </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            type="text"
                                                            name="findName"
                                                            id="findName"
                                                            placeholder="Tìm kiếm theo tên"
                                                            value={findName}
                                                            onChange={this.onChange}
                                                        ></Input>
                                                    </InputGroup>
                                                    <InputGroup className='mb-2'>
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>Số Điện Thoại: </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            type="text"
                                                            name="findPhoneNumber"
                                                            id="findPhoneNumber"
                                                            placeholder="Tìm kiếm theo Số điện thoại"
                                                            value={findPhoneNumber}
                                                            onChange={this.onChange}
                                                        ></Input>
                                                    </InputGroup>
                                                    <InputGroup className='mb-2'>
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>Địa chỉ:</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            type="text"
                                                            name="findAddress"
                                                            id="findAddress"
                                                            placeholder="Tìm kiếm theo địa chỉ"
                                                            value={findAddress}
                                                            onChange={this.onChange}
                                                        ></Input>
                                                    </InputGroup>
                                                    <InputGroup className='mb-2'>
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>Facebook:</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            type="text"
                                                            name="findFacebook"
                                                            id="findFacebook"
                                                            placeholder="Tìm kiếm theo tên fb"
                                                            value={findFacebook}
                                                            onChange={this.onChange}
                                                        ></Input>
                                                    </InputGroup>
                                                    <ListGroup>
                                                        {listCustomers}
                                                    </ListGroup>
                                                </FormGroup>
                                            </CardBody>
                                        </Card>
                                    </Collapse>
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

                                    >
                                        <option value={null}>Chọn sản phẩm</option>
                                        {listProduct}
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
                                <Button
                                    type="submit"
                                    color="dark"
                                    block
                                    style={{ marginBottom: '2rem' }}
                                    onClick={this.onSubmit}
                                >Tạo đơn hàng</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                </Modal>
            </div>
        )
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
        getPriceFromProduct: (product) => {
            dispatch(productActions.getPriceFromProduct(product))
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        orders: state.orders,
        isAuthenticated: state.auth.isAuthenticated,
        errorOrder: state.errorOrder,
        isCreateSuccess: state.orders.isCreateSuccess,
        products: state.products.products,
        productSelected: state.products.productSelected,
        customers: state.customers.customers
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderModal);

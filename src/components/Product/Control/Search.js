import React,
{
    Component,
    // Fragment
} from 'react';
import {
    // InputGroupAddon,
    Input,
    InputGroup,
    // InputGroupText,
    Button
} from 'reactstrap';
import { connect } from 'react-redux';

import * as actions from '../../../actions/productActions';

class Search extends Component {
    state = {
        keyword: '',

    }
    onChange = (event) => {
        var target = event.target;
        var value = target.value;
        this.setState({
            keyword: value
        })
    }

    componentDidUpdate() {
        ;
    }

    onSearch = () => {
        this.props.search(this.state.keyword)
    }
    render() {
        return (
            <div>
                <InputGroup>
                    <Button
                        type="button"
                        onClick={this.onSearch}
                    >Search
                    </Button>
                    <Input
                        type="text"
                        placeholder="What search?"
                        name="keyword"
                        onChange={this.onChange}
                    >
                    </Input>
                </InputGroup>
            </div>


        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        search: (keyword) => {
            dispatch(actions.searchProduct(keyword))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);
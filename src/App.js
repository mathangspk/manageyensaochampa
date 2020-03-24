import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar';
import * as actions from './actions/authActions';
import { connect } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import routes from './route'

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {

  var  showContentMenus = (routes) => {
      var result = '';
      if (routes.length > 0) {
        result = routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />)
        })
      }
      return (
        <Switch>
          {result}
        </Switch>)
    }

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <AppNavbar />  
          </header>
        </div>
         
          {/* show content from select menu in here */}
          <div className="container">
            <div className="row">
              {showContentMenus(routes)}
            </div>
          </div>

      </Router>


    );
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadUser: () => {
      dispatch(actions.loadUser())
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

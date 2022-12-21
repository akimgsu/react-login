import React, { Component, Fragment } from 'react';

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"




import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Login from './components/pages/Login'
import SignUp from './components/pages/SignUp'
import Info from './components/pages/Info'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() { }

  render() {
    return (
      <Fragment>
        <Router>
          <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                <Link className="navbar-brand" to={'/sign-in'}>
                  Demo-Serverless-App
                </Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={'/sign-in'}>
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/sign-up'}>
                        Sign up
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/info'}>
                        Info
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route path="/sign-in" element={<Login />} />
                  <Route path="/info" element={<Info />} />
                  <Route path="/sign-up" element={<SignUp />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </Fragment>
    );
  }
}

export default App;

import React, { Component } from 'react'
import axios from 'axios';
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }
    onValueChanged = (name, value) => {
        let obj = {};
        obj[name] = value;
        this.setState(obj);
    }
    handleSubmit = async () => {
        try {
            const res = await axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API_PATH}/login`,
                params: {
                    user_id: this.state.email,
                    password: this.state.password,
                }
            });
            const jwtToken = res.data.token;
            localStorage.setItem("token", jwtToken);
            window.location.href = "/info"
        }
        catch (e) {
            if (e.response.data == "error:user_does_not_exist") {
                alert("유저가 존재하지 않습니다.");
            }
            else if (e.response.data == "error:invalid_user_id_or_password") {
                alert("아이디 혹은 패스워드가 올바르지 않습니다.");
            }
            else {
                alert("로그인에 실패하였습니다.:" + e.response.data);
            }
        }
        return false;
    }
    render() {
        return (
            <div>
                <h3>로그인</h3>
                <div className="mb-3">
                    <label>이메일 주소</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="이메일을 입력하세요"
                        value={this.state.email}
                        onChange={(val) => {
                            this.onValueChanged("email", val.target.value);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label>암호</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="암호를 입력하세요"
                        value={this.state.password}
                        onChange={(val) => {
                            this.onValueChanged("password", val.target.value);
                        }}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary" onClick={() => { this.handleSubmit() }}>
                        로그인
                    </button>
                </div>
                <p className="forgot-password text-right">
                    <a href="#" onClick={() => {
                        window.location.href = "/sign-up"
                    }}>회원가입</a>
                </p>
            </div>
        )
    }
}

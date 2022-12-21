import React, { Component } from 'react'
import axios from 'axios';

export default class SignUp extends Component {
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
                url: `${process.env.REACT_APP_API_PATH}/user`,
                params: {

                    user_id: this.state.email,
                    password: this.state.password,
                }
            });
            alert("회원가입하였습니다.")
            window.location.href = "/";
            return true;
        }
        catch (e) {
            if (e.response.data == "error:user_already_exist") {
                alert("이미 존재하는 유저 아이디입니다.");
            }
            else {
                alert("회원 가입에 실패하였습니다:" + e.response.data)
            }
        }
        return false;
    }
    render() {
        return (
            <div>
                <h3>회원 가입</h3>
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
                        회원 가입
                    </button>
                </div>

            </div>
        )
    }
}
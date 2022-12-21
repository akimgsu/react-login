import React, { Component } from 'react'
import ReactJsAlert from "reactjs-alert"
import axios from 'axios';
var moment = require("moment");
export default class Info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            rank: ""
        }
    }
    componentDidMount() {
        if (!localStorage.getItem("token")) {
            return;
        }
        const jwtToken = localStorage.getItem("token");
        const data = this.decodeJwtResponse(jwtToken);
        console.log(data);
        this.setState({
            email: data.data.user_id,
            rank: data.data.rank,
            registered_date: data.data.registered_date,
        });
    }
    decodeJwtResponse(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };
    logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/"
        return true;
    }
    deleteUser = async () => {
        try {
            const res = await axios({
                method: 'DELETE',
                url: `${process.env.REACT_APP_API_PATH}/user`,
                params: {
                    user_id: this.state.email,
                }
            });
            alert("유저를 삭제하였습니다.")
            localStorage.removeItem("token");
            window.location.href = "/"
            return true;
        }
        catch (e) {
            alert("유저 삭제에 실패하였습니다.");
        }
        return false;
    }
    render() {
        if (!localStorage.getItem("token")) {
            return (<ReactJsAlert
                status={true}
                type="error"
                title="로그인해주세요."
                Close={() => {
                    window.location.href = "/"
                }}
            />)
        }
        return (
            <div>
                <h3>유저 정보</h3>
                <div className="mb-3">
                    <label>이메일</label>
                    <input
                        type="text"
                        className="form-control"
                        disabled={true}
                        value={this.state.email}
                    />
                </div>
                <div className="mb-3">
                    <label>권한 랭크</label>
                    <input
                        type="text"
                        className="form-control"
                        disabled={true}
                        value={this.state.rank}
                    />
                </div>
                <div className="mb-3">
                    <label>회원 가입 날자</label>
                    <input
                        type="text"
                        className="form-control"
                        disabled={true}
                        value={moment(this.state.registered_date).format("YYYY-MM-DD HH:mm:ss")}
                    />
                </div>
                <div className="mb-3">
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary" onClick={() => { this.logout() }}>
                            로그아웃
                        </button>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="d-grid">
                        <button type="submit" className="btn btn-danger" onClick={() => { this.deleteUser() }}>
                            유저 삭제
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
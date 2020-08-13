import React, { useState } from 'react'
import { changepassword } from '../../../../api/base/auth';
import { notification } from 'antd';
import { logout } from '../../../../api/auth/auth';
import './changePass.css'
import Loading from "../loading/Spin";

const ChangePass = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [oldpassword, setoldpassword] = useState('')
    const [newpassword, setnewpassword] = useState('')
    const [passwordconfirm, setpasswordconfirm] = useState('')
    const [checkPass, setCheckPass] = useState(false)
    const [checkPass1, setCheckPass1] = useState(false)
    const [checkPass2, setCheckPass2] = useState(false)
    const handlePassword = async () => {
        if (newpassword.length < 6 || newpassword.indexOf(" ") !== -1) {
            setCheckPass(true)
        }
        else if (newpassword !== passwordconfirm) {
            setCheckPass2(true)
            setCheckPass(false)
        }
        else {
            setCheckPass(false)
            setCheckPass2(false)
            const { success } = await changepassword({ password: oldpassword, newpassword: newpassword, passwordConfirm: passwordconfirm })
            if (success) {
                setIsLoading(true)
                notification['success']({
                    message: 'Cập nhật mật khẩu thành công ',
                })
                logout()
                setIsLoading(false)
            }
            else {
                setCheckPass1(true)
            }
        }
    }
    return (
        <div className="modal fade" id="modalMK" role="dialog">
            {isLoading && <Loading/>}
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4>Đổi mật khẩu</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <input type="password" className="changePass" placeholder="Mật khẩu cũ" value={oldpassword} onChange={(e) => setoldpassword(e.target.value)} required/>
                            <label className="checkPassCss" style={{ display: checkPass1 ? "block" : "none" }}>Sai mật khẩu!</label>
                            <input type="password" className="changePass" placeholder="Mật khẩu mới" value={newpassword} onChange={(e) => setnewpassword(e.target.value)} required/>
                            <label className="checkPassCss" style={{ display: checkPass ? "block" : "none" }}>Mật khẩu ít nhất gồm 6 ký tự và không chứa dấu cách!</label>
                            <input type="password" className="changePass" placeholder="Xác nhận lại mật khẩu" value={passwordconfirm} onChange={(e) => setpasswordconfirm(e.target.value)} required/>
                            <label className="checkPassCss" style={{ display: checkPass ? "block" : "none" }}>Mật khẩu ít nhất gồm 6 ký tự và không chứa dấu cách!</label>
                            <label className="checkPassCss" style={{ display: checkPass2 ? "block" : "none" }}>Mật khẩu không trùng nhau!</label>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="footerButton" onClick={handlePassword}>Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChangePass;
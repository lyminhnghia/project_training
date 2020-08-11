import React, {useContext, useState} from "react"
import {Button, Modal, notification} from "antd"
import { deletePartnerSign } from "../../../../../api/base/general/partner_sign"
import HomepageContext from "../../../../../context/HomepageContext"

const DeletePartnerSign = (props) => {
    const {id, resetData} = props
    const { setLoading } = useContext(HomepageContext)
    const [openDe, setOpenDe] = useState(false)
    const remove = async (id) => {
        setLoading(true)
        const {success, data} = await deletePartnerSign(id)
        setLoading(false)
        if (success) {
            if (data.success) {
                setOpenDe(false)
                notification['success']({
                    message: 'Xóa thành công!',
                })
                resetData()
            } else {
                notification['error']({
                    message: 'Xóa không thành công!',
                })
            }
        }

    }
    const showModalDe = () => {
        setOpenDe(true)
    };
    const handleCancelDe = e => {
        setOpenDe(false)
    };
    return (
        <div>
            <Button type="primary" className="button-change-back-s" style={{ backgroundColor: 'white', color: '#1890ff', whiteSpace: 'inherit', height: 30, width: '50px !important' }} onClick={showModalDe}>
                Xóa
            </Button>
            <Modal
                title="Xóa người ký kết (đối tác)!"
                visible={openDe}
                footer={null}
                onCancel={handleCancelDe}
            >
                <p>Hành động này không thể hoàn tác. Bạn có chắc muốn xóa!</p>
                <div className="modal-change-back-s">
                    <Button style={{ backgroundColor: 'white', color: '#1890ff', whiteSpace: 'inherit', height: 30, width: '50px !important' }} onClick={() => remove(id)}>Xóa</Button>
                </div>
            </Modal>
        </div>
    )
}

export default DeletePartnerSign
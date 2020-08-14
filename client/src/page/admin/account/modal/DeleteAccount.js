import React, {useContext, useState} from "react"
import {Button, Modal, notification} from "antd"
import { deleteAccount } from "../../../../api/base/admin/admin"
import HomepageContext from "../../../../context/HomepageContext"

const DeleteAccount= (props) => {
    const {id, resetData} = props
    const { setLoading } = useContext(HomepageContext)
    const [openDe, setOpenDe] = useState(false)
    const remove = async (id) => {
        setLoading(true)
        const {success, data} = await deleteAccount(id)
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
        } else {
            notification['error']({
                message: data
            })
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
                title="Xóa Account!"
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

export default DeleteAccount
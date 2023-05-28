import React, { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Logout = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const logout = async () => {
        try {
            setShow(false);
            const res = await fetch('/logout', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials:'include'
            });
            const d = await res.json();
            navigate('/')
        } catch (error) {
            window.alert("Log Out")
            navigate('/login')
        }
    }


    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Logout
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure want to log out!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={logout}>
                        Yes!! LogOut
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Logout
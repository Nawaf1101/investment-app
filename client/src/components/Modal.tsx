import React from "react";
import { Modal as BootstrapModal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

type ModalProps = {
    show: boolean;
    onHide: () => void;
};

const Modal: React.FC<ModalProps> = ({ show, onHide }) => {
    return (
        <BootstrapModal show={show} onHide={onHide} centered>
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>You are not logged in!</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>
                <p>If you want to invest you must login first!</p>
                <Button as={Link as any} to="/signup" style={{ marginRight: "2%" }} className="btn-md btn-more">
                    Signup!
                </Button>
                <Button as={Link as any} to="/login" style={{ marginRight: "2%" }} className="btn-md btn-more">
                    Login!
                </Button>
            </BootstrapModal.Body>

        </BootstrapModal>
    );
};

export default Modal;
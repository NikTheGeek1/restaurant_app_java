import './PortableModal.css';

const PortableModal = ({position}) => {

    return (
        <div className="portable-modal-container"
            style={{top:position.top, left:position.left}}
        >

        </div>
    );
};

export default PortableModal;
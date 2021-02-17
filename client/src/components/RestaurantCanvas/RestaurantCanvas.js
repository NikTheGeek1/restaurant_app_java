import { useEffect, useRef, useState } from 'react';
import './RestaurantCanvas.css';
import PortableModal from '../PortableModal/PortableModal';
import fancyBlueRugPNG from '../../assets/fancy_blue_rug[4x4].png';
import spacePNG from '../../assets/space.png';
import Canvas from '../../models/canvas';
import availableTablePNG from '../../assets/table_green [2x2].png';
import reservedTablePNG from '../../assets/desk_wood [2x2].png';
import chairLeft from '../../assets/chair_wood_family_left [1x1].png';
import chairRight from '../../assets/chair_wood_family_right [1x1].png';
import chairUp from '../../assets/chair_wood_family_up [1x1].png';
import chairDown from '../../assets/chair_wood_family_down [1x1].png';

let canvas;
const RestaurantCanvas = ({ bookingData, isStatic }) => {
    const [screenDims, setScreenDims] = useState({ w: window.innerWidth, h: window.innerHeight });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [portableModalPosition, setPortableModalPosition] = useState({});
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvasRefCurrent = canvasRef.current;
        const imgsArray = [
            { src: spacePNG, name: "space" },
            { src: fancyBlueRugPNG, name: "fancyBlueRug" },
            { src: availableTablePNG, name: "availableTable" },
            { src: reservedTablePNG, name: "reservedTable" },
            { src: chairLeft, name: "chairLeft" },
            { src: chairRight, name: "chairRight" },
            { src: chairUp, name: "chairUp" },
            { src: chairDown, name: "chairDown" }
        ];
        canvas = new Canvas(canvasRefCurrent, screenDims, imgsArray);
        canvas.loadImagesAndStart();
    }, []);

    useEffect(() => {
        if (!bookingData) {
            bookingData = [{ available: true },
                { available: true },
                { available: true },
                { available: false },
                { available: true },
                { available: false },
                { available: true },
                { available: true } ]
        }
        canvas.bookings = bookingData;
        canvas.drawAll();
    }, [bookingData])


    useEffect(() => {
        canvas.canvas.addEventListener('mousemove', updateMousePos);
        window.addEventListener('resize', resizeScreen);
        canvas.canvas.addEventListener('click', onCanvasClick);
        return () => {
            canvas.canvas.removeEventListener('mousemove', updateMousePos);
            window.removeEventListener('resize', resizeScreen);
            canvas.canvas.removeEventListener('click', onCanvasClick);
        };
    });

    const onCanvasClick = e => {
        const clickedOjb = canvas.whereWasCanvasClicked(mousePos);
        const clickedType = clickedOjb.type;
        if (clickedType !== canvas.USELESS_CLICK) {
            setPortableModalPosition(mousePos);
        } else {
            setPortableModalPosition({});
        }
    };

    const resizeScreen = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        setScreenDims({ w, h });
        canvas.resizeScreen(w, h);
    };

    const updateMousePos = e => {
        const rect = canvas.canvas.getBoundingClientRect();
        const root = document.documentElement;
        const x = e.clientX - rect.left - root.scrollLeft;
        const y = e.clientY - rect.top - root.scrollTop;
        setMousePos({ x, y });
        canvas.updateMousePos(x, y);
        canvas.changeCursorPointer();
    };

    return (
        <>
            <div style={{ position: "absolute", top: 0, left: 0, zIndex: 1, color: "white", fontSize: 40 }}>{mousePos.x}, {mousePos.y}</div>
            {!!Object.keys(portableModalPosition).length && <PortableModal position={{ top: portableModalPosition.y, left: portableModalPosition.x }} />}
            {isStatic && <div className="static-overlay-canvas"></div>}
            <canvas ref={canvasRef} className={isStatic ? "restaurant-canvas static-canvas": "restaurant-canvas"} height={screenDims.h} width={screenDims.w} />
        </>
    );
};

export default RestaurantCanvas;
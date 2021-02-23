import { useEffect, useRef, useState } from 'react';
import './RestaurantCanvas.css';
import fancyBlueRugPNG from '../../assets/fancy_blue_rug[4x4].png';
import spacePNG from '../../assets/space.png';
import Canvas from '../../models/canvas';
import availableTablePNG from '../../assets/table_green [2x2].png';
import reservedTablePNG from '../../assets/desk_wood [2x2].png';
import chairLeft from '../../assets/chair_wood_family_left [1x1].png';
import chairRight from '../../assets/chair_wood_family_right [1x1].png';
import chairUp from '../../assets/chair_wood_family_up [1x1].png';
import chairDown from '../../assets/chair_wood_family_down [1x1].png';
import { useSelector } from 'react-redux';

let canvas;
const RestaurantCanvas = ({ bookingData, isStatic, setPortableModalPosition, availableTables }) => {
    const customerObj = useSelector(state => state.userDetails);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
        canvas = new Canvas(canvasRefCurrent, { w: 700, h: 600 }, imgsArray);
        canvas.loggedInCustomer = customerObj.userObj;
        canvas.loadImagesAndStart();
    }, []);

    useEffect(() => {
        if (!bookingData) {
            bookingData = [];
        }
        canvas.bookings = bookingData;
        canvas.availableTables = isStatic ? [] : availableTables;
        canvas.drawAll();
    }, [bookingData])


    useEffect(() => {
        canvas.canvas.addEventListener('mousemove', updateMousePos);
        canvas.canvas.addEventListener('click', onCanvasClick);
        return () => {
            canvas.canvas.removeEventListener('mousemove', updateMousePos);
            canvas.canvas.removeEventListener('click', onCanvasClick);
        };
    });

    const onCanvasClick = e => {
        const clickedOjb = canvas.whereWasCanvasClicked(mousePos);
        const clickedType = clickedOjb.type;
        if (clickedType !== canvas.USELESS_CLICK) {
            setPortableModalPosition({ mousePos: mousePos, bookingId: clickedOjb.bookingId, tableNum: clickedOjb.tableNum});
        } else {
            setPortableModalPosition({});
        }
    };

    const updateMousePos = e => {
        const rect = canvas.canvas.getBoundingClientRect();
        // const root = document.documentElement;
        const x = Math.round(e.clientX - rect.left);// - root.scrollLeft;
        const y = Math.round(e.clientY - rect.top);// - root.scrollTop;
        setMousePos({ x, y });
        canvas.updateMousePos(x, y);
        canvas.changeCursorPointer();
    };

    return (
        <>
            <div style={{ position: "absolute", top: 0, left: 0, zIndex: 1, color: "white", fontSize: 40 }}>{mousePos.x}, {mousePos.y}</div>
            {isStatic && <div className="static-overlay-canvas"></div>}
            <canvas ref={canvasRef} className={isStatic ? "restaurant-canvas static-canvas" : "restaurant-canvas"} height="600px" width="800px" />
        </>
    );
};

export default RestaurantCanvas;
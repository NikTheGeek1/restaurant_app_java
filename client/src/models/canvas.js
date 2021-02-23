class Canvas {

    constructor(canvasRef, sceenDims, imgsArray) {
        this.screenDims = sceenDims;
        this.canvas = canvasRef;
        this.canvasContext = canvasRef.getContext('2d');
        this.imgsArray = imgsArray.map(img => ({ img: new Image(), src: img.src, name: img.name }));
        this.imgsToLoadCount = imgsArray.length;
        this.mousePos = { x: 0, y: 0 };
        this.screenCenter = { x: sceenDims.w / 2, y: sceenDims.h / 2 };
        this.SPACE_CENTER = 0;
        this.availableTables = [];
        this.bookings = [];
        this.WALL_COLOUR = "#aaa";
        this.X_POSITION_ANCOR = 100; // 100 pixels from the left
        this.Y_POSITION_ANCOR = 100; // 100 pixels from the top
        this.USELESS_CLICK = "USELESS_CLICK";
        this.TABLE_CLICK = "TABLE_CLICK";
        this.TABLE_WIDTH = 0;
        this.TABLE_HEIGHT = 0;
        this.CHAIR_WIDTH = 0;
        this.CHAIR_HEIGHT = 0;
        this.SPACE_WIDTH = 0;
        this.SPACE_HEIGHT = 0;
        this.TABLES_POSITIONS = [];
        this.CHAIRS_POSITIONS = [];
        this.loggedInCustomer = null;
    }


    _findImageToDraw(imgName) {
        return this.imgsArray.filter(img => img.name === imgName)[0];
    }

    _drawBackground() {
        this.canvasContext.fillStyle = this.WALL_COLOUR;
        this.canvasContext.fillRect(0, 0, this.screenDims.w, this.screenDims.h);
    }

    _drawSpace() {
        const IMG_NAME = "space";
        const img = this._findImageToDraw(IMG_NAME).img;
        this.canvasContext.drawImage(img, this.X_POSITION_ANCOR, this.X_POSITION_ANCOR);
    }

    _drawFuncyBlueRug() {
        const IMG_NAME = "fancyBlueRug";
        const img = this._findImageToDraw(IMG_NAME).img;
        this.canvasContext.drawImage(img, this.SPACE_CENTER.x - img.width / 2, this.SPACE_CENTER.y - img.height / 2);
    }

    _drawTableOverlay(tableX, tableY, colour) {
        this.canvasContext.fillStyle = colour === "RED" ? "rgba(255, 0, 0, .3)" : "rgba(255, 200, 100, .3)";
        this.canvasContext.fillRect(tableX + 2, tableY, this.TABLE_WIDTH - 4, this.TABLE_HEIGHT - 10);
    }

    _isThisTableAvailable(tableNum) {
        return this.availableTables.includes(tableNum);
    }

    _isThisTableBookedByLoggedInCustomer(bookingOnTable) {
        return this.loggedInCustomer && bookingOnTable && this.loggedInCustomer.email === bookingOnTable.customer.email;
    }

    _getEarliestBookingOnTable(tableNum) {
        const bookingsOnTable = this.bookings.filter(booking => booking.tableNum === tableNum);
        let earliestBookingTime;
        let earliestBooking;
        earliestBooking = !!bookingsOnTable.length && bookingsOnTable[0];
        if (bookingsOnTable.length > 1) {
            earliestBookingTime = new Date(bookingsOnTable[0].date + " " + bookingsOnTable[0].time);
            for (const booking of bookingsOnTable) {
                const bookingTime = new Date(booking.date + " " + booking.time);
                if (!earliestBookingTime < bookingTime) {
                    earliestBookingTime = bookingTime;
                    earliestBooking = booking;
                }
            }
            return earliestBooking;
        }
        return earliestBooking;
    }

    _drawTables() {
        const availabeTable = this._findImageToDraw("availableTable").img;
        const reservedTable = this._findImageToDraw("reservedTable").img;
        this.canvasContext.font = "30px Arial";
        for (let tablePosIdx = 0; tablePosIdx < this.TABLES_POSITIONS.length; tablePosIdx++) {
            const tablePos = this.TABLES_POSITIONS[tablePosIdx];
            if (this._isThisTableAvailable(tablePosIdx + 1)) {
                this.canvasContext.drawImage(availabeTable, tablePos.x, tablePos.y);
            } else {
                const bookingOnTable = this._getEarliestBookingOnTable(tablePosIdx + 1)
                if (this._isThisTableBookedByLoggedInCustomer(bookingOnTable)) {
                    this.canvasContext.drawImage(reservedTable, tablePos.x, tablePos.y);
                    // overlay orange if reserved by me
                    this._drawTableOverlay(tablePos.x, tablePos.y, "ORANGE");
                } else {
                    this.canvasContext.drawImage(reservedTable, tablePos.x, tablePos.y);
                    // overlay red if reserved
                    this._drawTableOverlay(tablePos.x, tablePos.y, "RED");
                }
            }
            this.canvasContext.fillStyle = "black";
            this.canvasContext.fillText(tablePosIdx + 1, tablePos.x + 23, tablePos.y + 34);
        }
    }

    _drawCharis() {
        const chairTypes = ["Left", "Right", "Up", "Down"];
        for (const chairType of chairTypes) {
            const chairImg = this._findImageToDraw("chair" + chairType).img
            for (const chairPos of this.CHAIRS_POSITIONS[chairType]) {
                this.canvasContext.drawImage(chairImg, chairPos.x, chairPos.y);
            }
        }
    }

    drawAll() {
        this.TABLE_HEIGHT = this._findImageToDraw("availableTable").img.height;
        this.TABLE_WIDTH = this._findImageToDraw("availableTable").img.width;
        this.CHAIR_HEIGHT = this._findImageToDraw("chairLeft").img.height;
        this.CHAIR_WIDTH = this._findImageToDraw("chairLeft").img.width;
        this.SPACE_HEIGHT = this._findImageToDraw("space").img.height;
        this.SPACE_WIDTH = this._findImageToDraw("space").img.width;
        this.SPACE_CENTER = {
            x: this.X_POSITION_ANCOR + this.SPACE_WIDTH / 2,
            y: this.Y_POSITION_ANCOR + this.SPACE_HEIGHT / 2,
        };
        this.TABLES_POSITIONS = [
            { x: this.SPACE_CENTER.x - 180, y: this.SPACE_CENTER.y - 150 },
            { x: this.SPACE_CENTER.x - 30, y: this.SPACE_CENTER.y - 150 },
            { x: this.SPACE_CENTER.x + 120, y: this.SPACE_CENTER.y - 150 },
            { x: this.SPACE_CENTER.x + 120, y: this.SPACE_CENTER.y - 30 },
            { x: this.SPACE_CENTER.x + 120, y: this.SPACE_CENTER.y + 95 },
            { x: this.SPACE_CENTER.x - 30, y: this.SPACE_CENTER.y + 95 },
            { x: this.SPACE_CENTER.x - 180, y: this.SPACE_CENTER.y + 95 },
            { x: this.SPACE_CENTER.x - 180, y: this.SPACE_CENTER.y - 30 }
        ];
        this.CHAIRS_POSITIONS = {
            Left: this.TABLES_POSITIONS.map((_, idx) => {
                return { x: this.TABLES_POSITIONS[idx].x + 45, y: this.TABLES_POSITIONS[idx].y + 7 };
            }),
            Right: this.TABLES_POSITIONS.map((_, idx) => {
                return { x: this.TABLES_POSITIONS[idx].x - 13, y: this.TABLES_POSITIONS[idx].y + 7 };
            }),
            Up: this.TABLES_POSITIONS.map((_, idx) => {
                return { x: this.TABLES_POSITIONS[idx].x + 15, y: this.TABLES_POSITIONS[idx].y + 45 };
            }),
            Down: this.TABLES_POSITIONS.map((_, idx) => {
                return { x: this.TABLES_POSITIONS[idx].x + 15, y: this.TABLES_POSITIONS[idx].y - 18 };
            }),
        };
        this._drawBackground();
        this._drawSpace();
        this._drawFuncyBlueRug();
        this._drawCharis();
        this._drawTables();
    }

    _imgLoadingDoneStart() {

        this.drawAll();
    }

    _loadImgsAndStartIfReady() {
        this.imgsToLoadCount--;
        // console.log('Loaded image: ' + this.imgsToLoadCount, 'RestaurantCanvas.js', 'line: ', '52');
        if (this.imgsToLoadCount === 0) {
            this._imgLoadingDoneStart();
        }
    }

    _beginLoadingImage(imageObj) {
        imageObj.img.onload = (image) => this._loadImgsAndStartIfReady(image);
        imageObj.img.src = imageObj.src;
    }

    changeCursorPointer() {
        let overTable = false;
        for (const tablePos of this.TABLES_POSITIONS) {
            if ((this.mousePos.x > tablePos.x && this.mousePos.x < (tablePos.x + this.TABLE_WIDTH)) &&
                (this.mousePos.y > tablePos.y && this.mousePos.y < (tablePos.y + this.TABLE_HEIGHT))) {
                overTable = true;
            }
        }
        if (overTable) {
            document.getElementsByTagName("body")[0].style.cursor = "pointer";
        } else {
            document.getElementsByTagName("body")[0].style.cursor = "initial";
        }

    }

    updateMousePos(x, y) {
        this.mousePos.x = x;
        this.mousePos.y = y;
    }

    resizeScreen(w, h) {
        this.screenDims.w = w;
        this.screenDims.h = h;
        this.drawAll();
    }

    loadImagesAndStart() {
        for (const image of this.imgsArray) {
            this._beginLoadingImage(image);
        }
    }
    _getEarliestBookingIdOnTable(tableNum) {
        const bookingsOnTable = this.bookings.filter(booking => booking.tableNum === tableNum);
        let earliestBookingTime;
        let earliestBookingId;
        earliestBookingId = !!bookingsOnTable.length && bookingsOnTable[0].id;
        if (bookingsOnTable.length > 1) {
            earliestBookingTime = new Date(bookingsOnTable[0].date + " " + bookingsOnTable[0].time);
            for (const booking of bookingsOnTable) {
                const bookingTime = new Date(booking.date + " " + booking.time);
                if (earliestBookingTime > bookingTime) {
                    earliestBookingTime = bookingTime;
                    earliestBookingId = booking.id;
                }
            }
            return earliestBookingId;
        }
        return earliestBookingId;
    }

    whereWasCanvasClicked(mousePos) {
        for (let tablePosIdx = 0; tablePosIdx < this.TABLES_POSITIONS.length; tablePosIdx++) {
            const tablePos = this.TABLES_POSITIONS[tablePosIdx];
            if ((mousePos.x > tablePos.x && mousePos.x < (tablePos.x + this.TABLE_WIDTH)) &&
                (mousePos.y > tablePos.y && mousePos.y < (tablePos.y + this.TABLE_HEIGHT))) {
                return { type: this.TABLE_CLICK, bookingId: this._getEarliestBookingIdOnTable(tablePosIdx + 1), tableNum: tablePosIdx + 1 };
            }
        }
        return { type: this.USELESS_CLICK };
    }


}


export default Canvas;
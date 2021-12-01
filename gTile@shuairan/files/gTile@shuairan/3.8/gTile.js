var gtile;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "area": () => (/* binding */ extension_area),
  "disable": () => (/* binding */ disable),
  "enable": () => (/* binding */ enable),
  "enableHotkey": () => (/* binding */ enableHotkey),
  "focusMetaWindow": () => (/* binding */ focusMetaWindow),
  "getFocusApp": () => (/* binding */ getFocusApp),
  "getMonitorKey": () => (/* binding */ getMonitorKey),
  "getNotFocusedWindowsOfMonitor": () => (/* binding */ getNotFocusedWindowsOfMonitor),
  "getUsableScreenArea": () => (/* binding */ getUsableScreenArea),
  "grids": () => (/* binding */ grids),
  "hideTiling": () => (/* binding */ hideTiling),
  "init": () => (/* binding */ init),
  "move_maximize_window": () => (/* binding */ move_maximize_window),
  "move_resize_window": () => (/* binding */ move_resize_window),
  "refreshGrids": () => (/* binding */ refreshGrids),
  "resetFocusMetaWindow": () => (/* binding */ resetFocusMetaWindow),
  "reset_window": () => (/* binding */ reset_window),
  "toggleTiling": () => (/* binding */ toggleTiling)
});

;// CONCATENATED MODULE: ./src/3_8/utils.ts
const { Object: utils_Object } = imports.gi.GObject;
const Gettext = imports.gettext;
const GLib = imports.gi.GLib;
const Signals = imports.signals;
const UUID = 'gTile@shuairan';
const isFinalized = function (obj) {
    return obj && utils_Object.prototype.toString.call(obj).indexOf('FINALIZED') > -1;
};
Gettext.bindtextdomain(UUID, GLib.get_home_dir() + '/.local/share/locale');
function _(str) {
    let customTranslation = Gettext.dgettext(UUID, str);
    if (customTranslation != str) {
        return customTranslation;
    }
    return Gettext.gettext(str);
}
function objHasKey(obj, key) {
    return utils_Object.prototype.hasOwnProperty.call(obj, key);
}
function addSignals(constructor) {
    Signals.addSignalMethods(constructor.prototype);
    return class extends constructor {
    };
}

;// CONCATENATED MODULE: ./src/3_8/constants.ts

const SETTINGS_AUTO_CLOSE = 'autoclose';
const SETTINGS_ANIMATION = 'animation';
const TOOLTIPS = {
    [SETTINGS_AUTO_CLOSE]: _("Auto close"),
    [SETTINGS_ANIMATION]: _("Animations"),
    'action-main-list': _("Auto tile main and list"),
    'action-two-list': _("Auto tile two lists")
};
const KEYCONTROL = {
    'gTile-k-left': 'Left',
    'gTile-k-right': 'Right',
    'gTile-k-up': 'Up',
    'gTile-k-down': 'Down',
    'gTile-k-left-meta': '<Shift>Left',
    'gTile-k-right-meta': '<Shift>Right',
    'gTile-k-up-meta': '<Shift>Up',
    'gTile-k-down-meta': '<Shift>Down',
};

;// CONCATENATED MODULE: ./src/3_8/ui/ActionButton.ts
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


const Tooltips = imports.ui.tooltips;
const St = imports.gi.St;
let ActionButton = class ActionButton {
    constructor(grid, classname) {
        this._onButtonPress = () => {
            this.emit('button-press-event');
            return false;
        };
        this.grid = grid;
        this.actor = new St.Button({
            style_class: 'settings-button',
            reactive: true,
            can_focus: true,
            track_hover: true
        });
        this.icon = new St.BoxLayout({ style_class: classname, reactive: true, can_focus: true, track_hover: true });
        this.actor.add_actor(this.icon);
        this.actor.connect('button-press-event', this._onButtonPress);
        if (TOOLTIPS[classname]) {
            this._tooltip = new Tooltips.Tooltip(this.actor, TOOLTIPS[classname]);
        }
    }
};
ActionButton = __decorate([
    addSignals
], ActionButton);

;

;// CONCATENATED MODULE: ./src/3_8/ui/AutoTileMainAndList.ts
var AutoTileMainAndList_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let AutoTileMainAndList = class AutoTileMainAndList extends ActionButton {
    constructor(grid) {
        super(grid, 'action-main-list');
        this._onButtonPress = () => {
            if (!focusMetaWindow)
                return false;
            reset_window(focusMetaWindow);
            let monitor = this.grid.monitor;
            let [screenX, screenY, screenWidth, screenHeight] = getUsableScreenArea(monitor);
            let windows = getNotFocusedWindowsOfMonitor(monitor);
            move_resize_window(focusMetaWindow, screenX, screenY, screenWidth / 2, screenHeight);
            let winHeight = screenHeight / windows.length;
            let countWin = 0;
            for (let windowIdx in windows) {
                let metaWindow = windows[windowIdx];
                let newOffset = countWin * winHeight;
                reset_window(metaWindow);
                move_resize_window(metaWindow, screenX + screenWidth / 2, screenY + newOffset, screenWidth / 2, winHeight);
                countWin++;
            }
            this.emit('resize-done');
            return false;
        };
        this.classname = 'action-main-list';
        this.connect('button-press-event', this._onButtonPress);
    }
};
AutoTileMainAndList = AutoTileMainAndList_decorate([
    addSignals
], AutoTileMainAndList);

;

;// CONCATENATED MODULE: ./src/3_8/ui/AutoTileTwoList.ts
var AutoTileTwoList_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let AutoTileTwoList = class AutoTileTwoList extends ActionButton {
    constructor(grid) {
        super(grid, 'action-two-list');
        this._onButtonPress = () => {
            if (!focusMetaWindow)
                return false;
            reset_window(focusMetaWindow);
            let monitor = this.grid.monitor;
            let [screenX, screenY, screenWidth, screenHeight] = getUsableScreenArea(monitor);
            let windows = getNotFocusedWindowsOfMonitor(monitor);
            let nbWindowOnEachSide = Math.ceil((windows.length + 1) / 2);
            let winHeight = screenHeight / nbWindowOnEachSide;
            let countWin = 0;
            let xOffset = ((countWin % 2) * screenWidth) / 2;
            let yOffset = Math.floor(countWin / 2) * winHeight;
            move_resize_window(focusMetaWindow, screenX + xOffset, screenY + yOffset, screenWidth / 2, winHeight);
            countWin++;
            for (let windowIdx in windows) {
                let metaWindow = windows[windowIdx];
                xOffset = ((countWin % 2) * screenWidth) / 2;
                yOffset = Math.floor(countWin / 2) * winHeight;
                reset_window(metaWindow);
                move_resize_window(metaWindow, screenX + xOffset, screenY + yOffset, screenWidth / 2, winHeight);
                countWin++;
            }
            this.emit('resize-done');
            return false;
        };
        this.classname = 'action-two-list';
        this.connect('button-press-event', this._onButtonPress);
    }
};
AutoTileTwoList = AutoTileTwoList_decorate([
    addSignals
], AutoTileTwoList);

;

;// CONCATENATED MODULE: ./src/3_8/ui/GridElement.ts


const Main = imports.ui.main;
const GridElement_St = imports.gi.St;
class GridElement {
    constructor(monitor, width, height, coordx, coordy, delegate) {
        this.show = () => {
            this.actor.opacity = 255;
            this.actor.visible = true;
        };
        this.hide = () => {
            this.actor.opacity = 0;
            this.actor.visible = false;
        };
        this._onButtonPress = () => {
            this.delegate._onButtonPress(this);
            return false;
        };
        this._onHoverChanged = () => {
            if (!this.actor || isFinalized(this.actor))
                return;
            this.delegate._onHoverChanged(this);
            return false;
        };
        this._activate = () => {
            if (!this.actor || isFinalized(this.actor))
                return;
            this.actor.add_style_pseudo_class('activate');
        };
        this._deactivate = () => {
            if (!this.actor || isFinalized(this.actor))
                return;
            this.actor.remove_style_pseudo_class('activate');
        };
        this._clean = () => {
            Main.uiGroup.remove_actor(extension_area);
        };
        this._destroy = () => {
            this.monitor = null;
            this.coordx = null;
            this.coordy = null;
            this.width = null;
            this.height = null;
            this.active = null;
        };
        this.actor = new GridElement_St.Button({
            style_class: 'table-element',
            width: width,
            height: height,
            reactive: true,
            can_focus: true,
            track_hover: true
        });
        this.actor.visible = false;
        this.actor.opacity = 0;
        this.monitor = monitor;
        this.coordx = coordx;
        this.coordy = coordy;
        this.width = width;
        this.height = height;
        this.delegate = delegate;
        this.actor.connect('button-press-event', this._onButtonPress);
        this.actor.connect('notify::hover', this._onHoverChanged);
        this.active = false;
    }
}

;// CONCATENATED MODULE: ./src/3_8/ui/GridElementDelegate.ts
var GridElementDelegate_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



const Tweener = imports.ui.tweener;
let GridElementDelegate = class GridElementDelegate {
    constructor() {
        this.activated = false;
        this.first = null;
        this.last = null;
        this.currentElement = null;
        this.activatedActors = null;
        this._allSelected = () => {
            var _a;
            return ((_a = this.activatedActors) === null || _a === void 0 ? void 0 : _a.length) === (preferences.nbCols * preferences.nbRows);
        };
        this._resizeDone = () => {
            this.emit('resize-done');
        };
        this.reset = () => {
            this._resetGrid();
            this.activated = false;
            this.first = null;
            this.last = null;
            this.currentElement = null;
        };
        this._resetGrid = () => {
            this._hideArea();
            if (this.currentElement) {
                this.currentElement._deactivate();
            }
            if (this.activatedActors != null) {
                for (let index = 0; index < this.activatedActors.length; index++) {
                    this.activatedActors[index]._deactivate();
                }
            }
            this.activatedActors = [];
        };
        this._getVarFromGridElement = (fromGridElement, toGridElement) => {
            let maxX = fromGridElement.coordx >= toGridElement.coordx ? fromGridElement.coordx : toGridElement.coordx;
            let minX = fromGridElement.coordx <= toGridElement.coordx ? fromGridElement.coordx : toGridElement.coordx;
            let maxY = fromGridElement.coordy >= toGridElement.coordy ? fromGridElement.coordy : toGridElement.coordy;
            let minY = fromGridElement.coordy <= toGridElement.coordy ? fromGridElement.coordy : toGridElement.coordy;
            return [minX, maxX, minY, maxY];
        };
        this.refreshGrid = (fromGridElement, toGridElement) => {
            var _a;
            this._resetGrid();
            let minX, maxX, minY, maxY;
            [minX, maxX, minY, maxY] = this._getVarFromGridElement(fromGridElement, toGridElement);
            let key = getMonitorKey(fromGridElement.monitor);
            let grid = grids[key];
            for (let r = minY; r <= maxY; r++) {
                for (let c = minX; c <= maxX; c++) {
                    let element = grid === null || grid === void 0 ? void 0 : grid.elements[r][c];
                    element._activate();
                    (_a = this.activatedActors) === null || _a === void 0 ? void 0 : _a.push(element);
                }
            }
            this._displayArea(fromGridElement, toGridElement);
        };
        this._computeAreaPositionSize = (fromGridElement, toGridElement) => {
            let minX, maxX, minY, maxY;
            [minX, maxX, minY, maxY] = this._getVarFromGridElement(fromGridElement, toGridElement);
            let nbRows = preferences.nbRows;
            let nbCols = preferences.nbCols;
            let monitor = fromGridElement.monitor;
            let [screenX, screenY, screenWidth, screenHeight] = getUsableScreenArea(monitor);
            let areaWidth = (screenWidth / nbCols) * (maxX - minX + 1);
            let areaHeight = (screenHeight / nbRows) * (maxY - minY + 1);
            let areaX = screenX + minX * (screenWidth / nbCols);
            let areaY = screenY + minY * (screenHeight / nbRows);
            return [areaX, areaY, areaWidth, areaHeight];
        };
        this._displayArea = (fromGridElement, toGridElement) => {
            let areaWidth, areaHeight, areaX, areaY;
            [areaX, areaY, areaWidth, areaHeight] = this._computeAreaPositionSize(fromGridElement, toGridElement);
            extension_area.add_style_pseudo_class('activate');
            if (preferences.animation) {
                Tweener.addTween(extension_area, {
                    time: 0.2,
                    x: areaX,
                    y: areaY,
                    width: areaWidth,
                    height: areaHeight,
                    transition: 'easeOutQuad'
                });
            }
            else {
                extension_area.width = areaWidth;
                extension_area.height = areaHeight;
                extension_area.x = areaX;
                extension_area.y = areaY;
            }
        };
        this._hideArea = () => {
            extension_area.remove_style_pseudo_class('activate');
        };
        this._onHoverChanged = (gridElement) => {
            if (this.activated) {
                if (this.first != null)
                    this.refreshGrid(this.first, gridElement);
            }
            else {
                if (this.currentElement)
                    this.currentElement._deactivate();
                this.currentElement = gridElement;
                this._displayArea(this.currentElement, this.currentElement);
                this.currentElement._activate();
            }
        };
        this._destroy = () => {
            this.activated = null;
            this.first = null;
            this.last = null;
            this.currentElement = null;
            this.activatedActors = null;
        };
    }
    _onButtonPress(gridElement) {
        if (!this.activated) {
            this.activated = true;
            this.activatedActors = [];
            this.activatedActors.push(gridElement);
            this.first = gridElement;
            gridElement.actor.add_style_pseudo_class('activate');
            gridElement.active = true;
        }
        else {
            reset_window(focusMetaWindow);
            let areaWidth, areaHeight, areaX, areaY;
            [areaX, areaY, areaWidth, areaHeight] = this._computeAreaPositionSize(this.first, gridElement);
            if (this._allSelected()) {
                move_maximize_window(focusMetaWindow, areaX, areaY);
            }
            else {
                move_resize_window(focusMetaWindow, areaX, areaY, areaWidth, areaHeight);
            }
            this._resizeDone();
        }
    }
};
GridElementDelegate = GridElementDelegate_decorate([
    addSignals
], GridElementDelegate);

;

;// CONCATENATED MODULE: ./src/3_8/ui/GridSettingsButton.ts


const GridSettingsButton_St = imports.gi.St;
class GridSettingsButton {
    constructor(text, cols, rows) {
        this._onButtonPress = () => {
            preferences.nbCols = this.cols;
            preferences.nbRows = this.rows;
            refreshGrids();
            return false;
        };
        this.cols = cols;
        this.rows = rows;
        this.text = text;
        this.actor = new GridSettingsButton_St.Button({
            style_class: 'settings-button',
            reactive: true,
            can_focus: true,
            track_hover: true
        });
        this.label = new GridSettingsButton_St.Label({
            style_class: 'settings-label',
            reactive: true, can_focus: true,
            track_hover: true,
            text: this.text
        });
        this.actor.add_actor(this.label);
        this.actor.connect('button-press-event', this._onButtonPress);
    }
}

;// CONCATENATED MODULE: ./src/3_8/ui/ToggleSettingsButton.ts
var ToggleSettingsButton_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



const ToggleSettingsButton_St = imports.gi.St;
const ToggleSettingsButton_Tooltips = imports.ui.tooltips;
let ToggleSettingsButton = class ToggleSettingsButton {
    constructor(text, property) {
        this._update = () => {
            if (objHasKey(preferences, this.property)) {
                this.actor.add_style_pseudo_class('activate');
            }
            else {
                this.actor.remove_style_pseudo_class('activate');
            }
        };
        this._onButtonPress = () => {
            if (!objHasKey(preferences, this.property))
                return false;
            preferences[this.property] = !preferences[this.property];
            this.emit('update-toggle');
            return false;
        };
        this.text = text;
        this.actor = new ToggleSettingsButton_St.Button({
            style_class: 'settings-button',
            reactive: true,
            can_focus: true,
            track_hover: true,
            label: this.text
        });
        this.icon = new ToggleSettingsButton_St.BoxLayout({ style_class: this.text + '-icon', reactive: true, can_focus: true, track_hover: true });
        this.actor.set_child(this.icon);
        this.property = property;
        this._update();
        this.actor.connect('button-press-event', this._onButtonPress);
        this.connect('update-toggle', this._update);
        if (objHasKey(TOOLTIPS, property)) {
            this._tooltip = new ToggleSettingsButton_Tooltips.Tooltip(this.actor, TOOLTIPS[property]);
        }
    }
};
ToggleSettingsButton = ToggleSettingsButton_decorate([
    addSignals
], ToggleSettingsButton);

;

;// CONCATENATED MODULE: ./src/3_8/ui/ToggleSettingsButtonListener.ts
class ToggleSettingsButtonListener {
    constructor() {
        this.actors = [];
        this._updateToggle = () => {
            for (let actorIdx in this.actors) {
                let actor = this.actors[actorIdx];
                actor["_update"]();
            }
        };
    }
    addActor(actor) {
        actor.connect('update-toggle', this._updateToggle);
        this.actors.push(actor);
    }
}
;

;// CONCATENATED MODULE: ./src/3_8/ui/TopBar.ts

const TopBar_St = imports.gi.St;
class TopBar {
    constructor(title) {
        this._onCloseButtonClicked = () => {
            toggleTiling();
            return false;
        };
        this.actor = new TopBar_St.BoxLayout({ style_class: 'top-box' });
        this._title = title;
        this._stlabel = new TopBar_St.Label({ style_class: 'grid-title', text: this._title });
        this._iconBin = new TopBar_St.Bin({ x_fill: false, y_fill: true });
        this._closeButton = new TopBar_St.Button({ style_class: 'close-button' });
        this._closeButton.connect('button-release-event', this._onCloseButtonClicked);
        this.actor.add(this._iconBin);
        this.actor.add(this._stlabel, { x_fill: true, expand: true });
        this.actor.add(this._closeButton, { x_fill: false, expand: false });
    }
    _set_title(title) {
        this._title = title;
        this._stlabel.text = this._title;
    }
    _set_app(app, title) {
        this._title = app.get_name() + ' - ' + title;
        this._stlabel.text = this._title;
        this._icon = app.create_icon_texture(24);
        this._iconBin.set_size(24, 24);
        this._iconBin.set_child(this._icon);
    }
}

;// CONCATENATED MODULE: ./src/3_8/ui/Grid.ts
var Grid_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












const Grid_St = imports.gi.St;
const Grid_Main = imports.ui.main;
const Grid_Tweener = imports.ui.tweener;
const Clutter = imports.gi.Clutter;
let toggleSettingListener;
let Grid = class Grid {
    constructor(monitor_idx, monitor, title, cols, rows) {
        this.tableWidth = 220;
        this.tableHeight = 200;
        this.borderwidth = 2;
        this.bindFns = {};
        this.rowKey = -1;
        this.colKey = -1;
        this.isEntered = false;
        this.interceptHide = false;
        this._initGridSettingsButtons = () => {
            this.bottombar.destroy_children();
            let rowNum = 0;
            let colNum = 0;
            for (var index = 0; index < gridSettingsButton.length; index++) {
                if (colNum >= 4) {
                    colNum = 0;
                    rowNum += 2;
                }
                let button = gridSettingsButton[index];
                button = new GridSettingsButton(button.text, button.cols, button.rows);
                this.bottombar.add(button.actor, { row: rowNum, col: colNum, x_fill: false, y_fill: false });
                button.actor.connect('notify::hover', this._onSettingsButton);
                colNum++;
            }
        };
        this._displayElements = () => {
            this.elements = [];
            let width = this.tableWidth / this.cols - 2 * this.borderwidth;
            let height = this.tableHeight / this.rows - 2 * this.borderwidth;
            this.elementsDelegate = new GridElementDelegate();
            this.elementsDelegate.connect('resize-done', this._onResize);
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    if (c === 0) {
                        this.elements[r] = [];
                    }
                    let element = new GridElement(this.monitor, width, height, c, r, this.elementsDelegate);
                    this.elements[r][c] = element;
                    this.table.add(element.actor, { row: r, col: c, x_fill: false, y_fill: false });
                    element.show();
                }
            }
        };
        this.refresh = () => {
            this.table.destroy_all_children();
            this.cols = preferences.nbCols;
            this.rows = preferences.nbRows;
            this._displayElements();
        };
        this._onHideComplete = () => {
            if (!this.interceptHide && this.actor) {
                Grid_Main.layoutManager.removeChrome(this.actor);
            }
            Grid_Main.layoutManager["_chrome"].updateRegions();
        };
        this._onShowComplete = () => {
            Grid_Main.layoutManager["_chrome"].updateRegions();
        };
        this._onResize = () => {
            refreshGrids();
            if (preferences.autoclose) {
                this.emit('hide-tiling');
            }
        };
        this._onMouseEnter = () => {
            if (!this.isEntered) {
                this.elementsDelegate.reset();
                this.isEntered = true;
            }
            return false;
        };
        this._onMouseLeave = () => {
            let [x, y, mask] = global.get_pointer();
            if ((this.elementsDelegate && (x <= this.actor.x || x >= this.actor.x + this.actor.width)) || (y <= this.actor.y || y >= this.actor.y + this.tableHeight)) {
                this.isEntered = false;
                this.elementsDelegate.reset();
                refreshGrids();
            }
            return false;
        };
        this._globalKeyPressEvent = (actor, event) => {
            if (event.get_key_symbol() === Clutter.Escape) {
                hideTiling();
                return true;
            }
            return false;
        };
        this._onSettingsButton = () => {
            this.elementsDelegate.reset();
        };
        this._bindKeyControls = () => {
            Grid_Main.keybindingManager.addHotKey('gTile-close', 'Escape', toggleTiling);
            Grid_Main.keybindingManager.addHotKey('gTile-tile1', 'space', this._keyTile);
            Grid_Main.keybindingManager.addHotKey('gTile-tile2', 'Return', this._keyTile);
            for (let index in KEYCONTROL) {
                if (objHasKey(KEYCONTROL, index)) {
                    let key = KEYCONTROL[index];
                    let type = index;
                    Grid_Main.keybindingManager.addHotKey(type, key, () => this._onKeyPressEvent(type, key));
                }
            }
        };
        this._removeKeyControls = () => {
            this.rowKey = -1;
            this.colKey = -1;
            Grid_Main.keybindingManager.removeHotKey('gTile-close');
            Grid_Main.keybindingManager.removeHotKey('gTile-tile1');
            Grid_Main.keybindingManager.removeHotKey('gTile-tile2');
            for (let type in KEYCONTROL) {
                Grid_Main.keybindingManager.removeHotKey(type);
            }
        };
        this._onKeyPressEvent = (type, key) => {
            let modifier = type.indexOf('meta', type.length - 4) !== -1;
            if (modifier && this.keyElement) {
                if (!this.elementsDelegate.activated) {
                    this.keyElement._onButtonPress();
                }
            }
            else if (this.keyElement) {
                this.elementsDelegate.reset();
            }
            switch (type) {
                case 'gTile-k-right':
                case 'gTile-k-right-meta':
                    if (this.colKey === this.cols - 1) {
                        this._keyTileSwitch();
                    }
                    this.colKey = Math.min(this.colKey + 1, this.cols - 1);
                    this.rowKey = this.rowKey === -1 ? 0 : this.rowKey;
                    break;
                case 'gTile-k-left':
                case 'gTile-k-left-meta':
                    if (this.colKey === 0) {
                        this._keyTileSwitch();
                    }
                    this.colKey = Math.max(0, this.colKey - 1);
                    break;
                case 'gTile-k-up':
                case 'gTile-k-up-meta':
                    this.rowKey = Math.max(0, this.rowKey - 1);
                    break;
                case 'gTile-k-down':
                case 'gTile-k-down-meta':
                    this.rowKey = Math.min(this.rowKey + 1, this.rows - 1);
                    this.colKey = this.colKey === -1 ? 0 : this.colKey;
                    break;
            }
            this.keyElement = this.elements[this.rowKey] ? this.elements[this.rowKey][this.colKey] : null;
            if (this.keyElement)
                this.keyElement._onHoverChanged();
        };
        this._keyTile = () => {
            if (this.keyElement) {
                this.keyElement._onButtonPress();
                this.keyElement._onButtonPress();
                this.colKey = -1;
                this.rowKey = -1;
            }
        };
        this._keyTileSwitch = () => {
            let key = getMonitorKey(this.monitor);
            let candidate = null;
            for (let k in grids) {
                if (k === key) {
                    continue;
                }
                candidate = grids[k];
            }
            if (candidate) {
                candidate._bindKeyControls();
            }
        };
        this._destroy = () => {
            for (let r in this.elements) {
                for (let c in this.elements[r]) {
                    this.elements[r][c]._destroy();
                }
            }
            this.elementsDelegate._destroy();
            this.topbar._destroy();
            this._removeKeyControls();
            this.monitor = null;
            this.rows = null;
            this.title = null;
            this.cols = null;
        };
        this.tableWidth = 220;
        this.tableHeight = 200;
        this.borderwidth = 2;
        this.bindFns = {};
        this.rowKey = -1;
        this.colKey = -1;
        this.actor = new Grid_St.BoxLayout({
            vertical: true,
            style_class: 'grid-panel',
            reactive: true,
            can_focus: true,
            track_hover: true
        });
        this.actor.connect('enter-event', this._onMouseEnter);
        this.actor.connect('leave-event', this._onMouseLeave);
        this.topbar = new TopBar(title);
        this.bottombar = new Grid_St.Table({
            homogeneous: true,
            style_class: 'bottom-box',
            can_focus: true,
            track_hover: true,
            reactive: true,
            width: this.tableWidth
        });
        this.veryBottomBar = new Grid_St.Table({
            homogeneous: true,
            style_class: 'bottom-box',
            can_focus: true,
            track_hover: true,
            reactive: true,
            width: this.tableWidth
        });
        this._initGridSettingsButtons();
        this.table = new Grid_St.Table({
            homogeneous: true,
            style_class: 'table',
            can_focus: true,
            track_hover: true,
            reactive: true,
            width: this.tableWidth,
            height: this.tableHeight
        });
        this.actor.add(this.topbar.actor, { x_fill: true });
        this.actor.add(this.table, { x_fill: false });
        this.actor.add(this.bottombar, { x_fill: true });
        this.actor.add(this.veryBottomBar, { x_fill: true });
        this.monitor = monitor;
        this.monitor_idx = monitor_idx;
        this.rows = rows;
        this.title = title;
        this.cols = cols;
        this.isEntered = false;
        if (true) {
            let nbTotalSettings = 4;
            if (!toggleSettingListener) {
                toggleSettingListener = new ToggleSettingsButtonListener();
            }
            let toggle = new ToggleSettingsButton('animation', SETTINGS_ANIMATION);
            toggle.actor.width = this.tableWidth / nbTotalSettings - this.borderwidth * 2;
            this.veryBottomBar.add(toggle.actor, { row: 0, col: 0, x_fill: false, y_fill: false });
            toggleSettingListener.addActor(toggle);
            toggle = new ToggleSettingsButton('auto-close', SETTINGS_AUTO_CLOSE);
            toggle.actor.width = this.tableWidth / nbTotalSettings - this.borderwidth * 2;
            this.veryBottomBar.add(toggle.actor, { row: 0, col: 1, x_fill: false, y_fill: false });
            toggleSettingListener.addActor(toggle);
            let action = new AutoTileMainAndList(this);
            action.actor.width = this.tableWidth / nbTotalSettings - this.borderwidth * 2;
            this.veryBottomBar.add(action.actor, { row: 0, col: 2, x_fill: false, y_fill: false });
            action.connect('resize-done', this._onResize);
            let actionTwo = new AutoTileTwoList(this);
            actionTwo.actor.width = this.tableWidth / nbTotalSettings - this.borderwidth * 2;
            this.veryBottomBar.add(actionTwo.actor, { row: 0, col: 3, x_fill: false, y_fill: false });
            actionTwo.connect('resize-done', this._onResize);
        }
        this.x = 0;
        this.y = 0;
        this.interceptHide = false;
        this._displayElements();
        this.normalScaleY = this.actor.scale_y;
        this.normalScaleX = this.actor.scale_x;
    }
    set_position(x, y) {
        this.x = x;
        this.y = y;
        this.actor.set_position(x, y);
    }
    show() {
        this.interceptHide = true;
        this.elementsDelegate.reset();
        let time = preferences.animation ? 0.3 : 0;
        this.actor.raise_top();
        Grid_Main.layoutManager.removeChrome(this.actor);
        Grid_Main.layoutManager.addChrome(this.actor);
        this.actor.scale_y = 0;
        if (time > 0) {
            Grid_Tweener.addTween(this.actor, {
                time: time,
                opacity: 255,
                visible: true,
                transition: 'easeOutQuad',
                scale_y: this.normalScaleY,
                onComplete: this._onShowComplete
            });
        }
        else {
            this.actor.opacity = 255;
            this.actor.visible = true;
            this.actor.scale_y = this.normalScaleY;
        }
        this.interceptHide = false;
        this._bindKeyControls();
    }
    hide(immediate) {
        this._removeKeyControls();
        this.elementsDelegate.reset();
        let time = preferences.animation && !immediate ? 0.3 : 0;
        if (time > 0) {
            Grid_Tweener.addTween(this.actor, {
                time: time,
                opacity: 0,
                visible: false,
                scale_y: 0,
                transition: 'easeOutQuad',
                onComplete: this._onHideComplete
            });
        }
        else {
            this.actor.opacity = 0;
            this.actor.visible = false;
            this.actor.scale_y = 0;
        }
    }
};
Grid = Grid_decorate([
    addSignals
], Grid);

;

;// CONCATENATED MODULE: ./src/3_8/config.ts



const preferences = {};
const Settings = imports.ui.settings;
let settings;
let gridSettingsButton = [];
const initSettings = () => {
    settings = new Settings.ExtensionSettings(preferences, 'gTile@shuairan');
    settings.bindProperty(Settings.BindingDirection.IN, 'hotkey', 'hotkey', enableHotkey, null);
    settings.bindProperty(Settings.BindingDirection.OUT, 'lastGridRows', 'nbCols');
    settings.bindProperty(Settings.BindingDirection.OUT, 'lastGridCols', 'nbRows');
    settings.bindProperty(Settings.BindingDirection.BIDIRECTIONAL, 'animation', 'animation', updateSettings, null);
    settings.bindProperty(Settings.BindingDirection.BIDIRECTIONAL, 'autoclose', 'autoclose', updateSettings, null);
    let basestr = 'gridbutton';
    initGridSettings();
    for (let i = 1; i <= 4; i++) {
        let sgbx = basestr + i + 'x';
        let sgby = basestr + i + 'y';
        settings.bindProperty(Settings.BindingDirection.IN, sgbx, sgbx, updateGridSettings, null);
        settings.bindProperty(Settings.BindingDirection.IN, sgby, sgby, updateGridSettings, null);
    }
};
const updateSettings = () => {
    toggleSettingListener._updateToggle();
};
const initGridSettings = () => {
    let basestr = 'gridbutton';
    for (let i = 1; i <= 4; i++) {
        let sgbx = basestr + i + 'x';
        let sgby = basestr + i + 'y';
        let gbx = settings.getValue(sgbx);
        let gby = settings.getValue(sgby);
        gridSettingsButton.push(new GridSettingsButton(gbx + 'x' + gby, gbx, gby));
    }
};
const updateGridSettings = () => {
    gridSettingsButton = [];
    initGridSettings();
    for (const gridIdx in grids) {
        let grid = grids[gridIdx];
        grid._initGridSettingsButtons();
    }
};

;// CONCATENATED MODULE: ./src/3_8/extension.ts


const Cinnamon = imports.gi.Cinnamon;
const extension_St = imports.gi.St;
const Meta = imports.gi.Meta;
const extension_Main = imports.ui.main;
const extension_Tweener = imports.ui.tweener;
const extension_Settings = imports.ui.settings;
const Panel = imports.ui.panel;
let extension_status;
let grids;
let monitors;
let extension_area;
let focusMetaWindow = null;
let focusMetaWindowConnections = {};
let focusMetaWindowPrivateConnections = {};
let tracker;
const init = () => { };
const enable = () => {
    try {
        extension_status = false;
        monitors = extension_Main.layoutManager.monitors;
        tracker = Cinnamon.WindowTracker.get_default();
        extension_area = new extension_St.BoxLayout({ style_class: 'grid-preview' });
        extension_Main.uiGroup.add_actor(extension_area);
        initSettings();
        initGrids();
        enableHotkey();
        tracker.connect("notify::focus_app", _onFocus);
        global.screen.connect('monitors-changed', reinitalize);
    }
    catch (e) {
        global.logError(e);
        global.logError(e === null || e === void 0 ? void 0 : e.stack);
    }
};
const disable = () => {
    disableHotkey();
    destroyGrids();
    resetFocusMetaWindow();
};
const enableHotkey = () => {
    disableHotkey();
    extension_Main.keybindingManager.addHotKey('gTile', preferences.hotkey, toggleTiling);
};
const disableHotkey = () => {
    extension_Main.keybindingManager.removeHotKey('gTile');
};
const reinitalize = () => {
    monitors = extension_Main.layoutManager.monitors;
    destroyGrids();
    initGrids();
};
const resetFocusMetaWindow = () => {
    if (focusMetaWindowConnections.length > 0) {
        for (var idx in focusMetaWindowConnections) {
            focusMetaWindow === null || focusMetaWindow === void 0 ? void 0 : focusMetaWindow.disconnect(focusMetaWindowConnections[idx]);
        }
    }
    if (focusMetaWindowPrivateConnections.length > 0) {
        let actor = focusMetaWindow === null || focusMetaWindow === void 0 ? void 0 : focusMetaWindow.get_compositor_private();
        if (actor) {
            for (let idx in focusMetaWindowPrivateConnections) {
                actor.disconnect(focusMetaWindowPrivateConnections[idx]);
            }
        }
    }
    focusMetaWindow = null;
    focusMetaWindowConnections = [];
    focusMetaWindowPrivateConnections = [];
};
const initGrids = () => {
    grids = {};
    for (let monitorIdx in monitors) {
        let monitor = monitors[monitorIdx];
        let grid = new Grid(parseInt(monitorIdx), monitor, 'gTile', preferences.nbCols, preferences.nbRows);
        let key = getMonitorKey(monitor);
        grids[key] = grid;
        extension_Main.layoutManager.addChrome(grid.actor, { visibleInFullscreen: true });
        grid.actor.set_opacity(0);
        grid.hide(true);
        grid.connect('hide-tiling', hideTiling);
    }
};
const destroyGrids = () => {
    for (let monitorIdx in monitors) {
        let monitor = monitors[monitorIdx];
        let key = getMonitorKey(monitor);
        let grid = grids[key];
        if (typeof grid != 'undefined') {
            grid.hide(true);
            extension_Main.layoutManager.removeChrome(grid.actor);
        }
    }
};
const refreshGrids = () => {
    for (let gridIdx in grids) {
        let grid = grids[gridIdx];
        grid.refresh();
    }
    extension_Main.layoutManager["_chrome"].updateRegions();
};
const moveGrids = () => {
    if (!extension_status) {
        return;
    }
    let window = focusMetaWindow;
    if (!window)
        return;
    for (let gridIdx in grids) {
        let grid = grids[gridIdx];
        let pos_x;
        let pos_y;
        let monitor = grid.monitor;
        let isGridMonitor = window.get_monitor() === grid.monitor_idx;
        if (isGridMonitor) {
            pos_x = window.get_outer_rect().width / 2 + window.get_outer_rect().x;
            pos_y = window.get_outer_rect().height / 2 + window.get_outer_rect().y;
        }
        else {
            pos_x = monitor.x + monitor.width / 2;
            pos_y = monitor.y + monitor.height / 2;
        }
        pos_x = Math.floor(pos_x - grid.actor.width / 2);
        pos_y = Math.floor(pos_y - grid.actor.height / 2);
        if (isGridMonitor) {
            pos_x = pos_x < monitor.x ? monitor.x : pos_x;
            pos_x = pos_x + grid.actor.width > monitor.width + monitor.x ? monitor.x + monitor.width - grid.actor.width : pos_x;
            pos_y = pos_y < monitor.y ? monitor.y : pos_y;
            pos_y = pos_y + grid.actor.height > monitor.height + monitor.y ? monitor.y + monitor.height - grid.actor.height : pos_y;
        }
        let time = preferences.animation ? 0.3 : 0.1;
        extension_Tweener.addTween(grid.actor, {
            time: time,
            x: pos_x,
            y: pos_y,
            transition: 'easeOutQuad',
            onComplete: updateRegions
        });
    }
};
const updateRegions = () => {
    var _a;
    extension_Main.layoutManager["_chrome"].updateRegions();
    refreshGrids();
    for (let idx in grids) {
        let grid = grids[idx];
        (_a = grid.elementsDelegate) === null || _a === void 0 ? void 0 : _a.reset();
    }
};
const reset_window = (metaWindow) => {
    metaWindow === null || metaWindow === void 0 ? void 0 : metaWindow.unmaximize(Meta.MaximizeFlags.HORIZONTAL);
    metaWindow === null || metaWindow === void 0 ? void 0 : metaWindow.unmaximize(Meta.MaximizeFlags.VERTICAL);
    metaWindow === null || metaWindow === void 0 ? void 0 : metaWindow.unmaximize(Meta.MaximizeFlags.HORIZONTAL | Meta.MaximizeFlags.VERTICAL);
    metaWindow === null || metaWindow === void 0 ? void 0 : metaWindow.tile(Meta.TileMode.NONE, false);
};
const _getInvisibleBorderPadding = (metaWindow) => {
    let outerRect = metaWindow.get_outer_rect();
    let inputRect = metaWindow.get_input_rect();
    let [borderX, borderY] = [outerRect.x - inputRect.x, outerRect.y - inputRect.y];
    return [borderX, borderY];
};
const _getVisibleBorderPadding = (metaWindow) => {
    let clientRect = metaWindow.get_rect();
    let outerRect = metaWindow.get_outer_rect();
    let borderX = outerRect.width - clientRect.width;
    let borderY = outerRect.height - clientRect.height;
    return [borderX, borderY];
};
const move_maximize_window = (metaWindow, x, y) => {
    if (metaWindow == null)
        return;
    let [borderX, borderY] = _getInvisibleBorderPadding(metaWindow);
    x = x - borderX;
    y = y - borderY;
    metaWindow.move_frame(true, x, y);
    metaWindow.maximize(Meta.MaximizeFlags.HORIZONTAL | Meta.MaximizeFlags.VERTICAL);
};
const move_resize_window = (metaWindow, x, y, width, height) => {
    if (metaWindow == null)
        return;
    let [vBorderX, vBorderY] = _getVisibleBorderPadding(metaWindow);
    width = width - vBorderX;
    height = height - vBorderY;
    metaWindow.resize(true, width, height);
    metaWindow.move_frame(true, x, y);
};
const getPanelHeight = (panel) => {
    return panel.height
        || panel.actor.get_height();
};
const getUsableScreenArea = (monitor) => {
    let top = monitor.y;
    let bottom = monitor.y + monitor.height;
    let left = monitor.x;
    let right = monitor.x + monitor.width;
    for (let panel of extension_Main.panelManager.getPanelsInMonitor(monitor.index)) {
        if (!panel.isHideable()) {
            switch (panel.panelPosition) {
                case Panel.PanelLoc.top:
                    top += getPanelHeight(panel);
                    break;
                case Panel.PanelLoc.bottom:
                    bottom -= getPanelHeight(panel);
                    break;
                case Panel.PanelLoc.left:
                    left += getPanelHeight(panel);
                    break;
                case Panel.PanelLoc.right:
                    right -= getPanelHeight(panel);
                    break;
            }
        }
    }
    let width = right > left ? right - left : 0;
    let height = bottom > top ? bottom - top : 0;
    return [left, top, width, height];
};
const getNotFocusedWindowsOfMonitor = (monitor) => {
    return extension_Main.getTabList().filter(function (w) {
        let app = tracker.get_window_app(w);
        let w_monitor = extension_Main.layoutManager.monitors[w.get_monitor()];
        if (app == null) {
            return false;
        }
        if (w.minimized) {
            return false;
        }
        if (w_monitor !== monitor) {
            return false;
        }
        return focusMetaWindow !== w && w.get_wm_class() != null;
    });
};
const _onFocus = () => {
    let window = getFocusApp();
    if (!window) {
        resetFocusMetaWindow();
        for (let gridIdx in grids) {
            let grid = grids[gridIdx];
            grid.topbar._set_title('gTile');
        }
        return;
    }
    resetFocusMetaWindow();
    focusMetaWindow = window;
    let actor = focusMetaWindow.get_compositor_private();
    if (actor) {
        focusMetaWindowPrivateConnections.push(actor.connect('size-changed', moveGrids));
        focusMetaWindowPrivateConnections.push(actor.connect('position-changed', moveGrids));
    }
    let app = tracker.get_window_app(focusMetaWindow);
    let title = focusMetaWindow.get_title();
    for (let monitorIdx in monitors) {
        let monitor = monitors[monitorIdx];
        let key = getMonitorKey(monitor);
        let grid = grids[key];
        if (app)
            grid.topbar._set_app(app, title);
        else
            grid.topbar._set_title(title);
    }
    moveGrids();
};
const showTiling = () => {
    focusMetaWindow = getFocusApp();
    let wm_type = focusMetaWindow.get_window_type();
    let layer = focusMetaWindow.get_layer();
    extension_area.visible = true;
    if (focusMetaWindow && wm_type !== 1 && layer > 0) {
        for (let monitorIdx in monitors) {
            let monitor = monitors[monitorIdx];
            let key = getMonitorKey(monitor);
            let grid = grids[key];
            let window = getFocusApp();
            let pos_x;
            let pos_y;
            if (window.get_monitor() === parseInt(monitorIdx)) {
                pos_x = window.get_outer_rect().width / 2 + window.get_outer_rect().x;
                pos_y = window.get_outer_rect().height / 2 + window.get_outer_rect().y;
            }
            else {
                pos_x = monitor.x + monitor.width / 2;
                pos_y = monitor.y + monitor.height / 2;
            }
            grid.set_position(Math.floor(pos_x - grid.actor.width / 2), Math.floor(pos_y - grid.actor.height / 2));
            grid.show();
        }
        _onFocus();
        extension_status = true;
    }
    moveGrids();
};
const hideTiling = () => {
    for (let gridIdx in grids) {
        let grid = grids[gridIdx];
        grid.elementsDelegate.reset();
        grid.hide(false);
    }
    extension_area.visible = false;
    resetFocusMetaWindow();
    extension_status = false;
    extension_Main.layoutManager["_chrome"].updateRegions();
};
const toggleTiling = () => {
    if (extension_status) {
        hideTiling();
    }
    else {
        showTiling();
    }
    return extension_status;
};
const getMonitorKey = (monitor) => {
    return monitor.x + ':' + monitor.width + ':' + monitor.y + ':' + monitor.height;
};
const getFocusApp = () => {
    return global.display.focus_window;
};
const isPrimaryMonitor = (monitor) => {
    return extension_Main.layoutManager.primaryMonitor === monitor;
};

gtile = __webpack_exports__;
/******/ })()
;
"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "src_components_ui_theme-provider_jsx";
exports.ids = ["src_components_ui_theme-provider_jsx"];
exports.modules = {

/***/ "./src/components/ui/theme-provider.jsx":
/*!**********************************************!*\
  !*** ./src/components/ui/theme-provider.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ThemeContext: () => (/* binding */ ThemeContext),\n/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst ThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst ThemeProvider = ({ children })=>{\n    const [darkMode, setDarkMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const toggleTheme = ()=>setDarkMode(!darkMode);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ThemeContext.Provider, {\n        value: {\n            darkMode,\n            toggleTheme\n        },\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: darkMode ? \"theme-dark\" : \"theme-light\",\n            children: children\n        }, void 0, false, {\n            fileName: \"/workspaces/Financial-Empire-Full/src/components/ui/theme-provider.jsx\",\n            lineNumber: 11,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/workspaces/Financial-Empire-Full/src/components/ui/theme-provider.jsx\",\n        lineNumber: 10,\n        columnNumber: 5\n    }, undefined);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy91aS90aGVtZS1wcm92aWRlci5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUF1RDtBQUVoRCxNQUFNRyw2QkFBZUYsb0RBQWFBLEdBQUc7QUFFckMsTUFBTUcsZ0JBQWdCLENBQUMsRUFBRUMsUUFBUSxFQUFFO0lBQ3hDLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHTCwrQ0FBUUEsQ0FBQztJQUN6QyxNQUFNTSxjQUFjLElBQU1ELFlBQVksQ0FBQ0Q7SUFFdkMscUJBQ0UsOERBQUNILGFBQWFNLFFBQVE7UUFBQ0MsT0FBTztZQUFFSjtZQUFVRTtRQUFZO2tCQUNwRCw0RUFBQ0c7WUFBSUMsV0FBV04sV0FBVyxlQUFlO3NCQUN2Q0Q7Ozs7Ozs7Ozs7O0FBSVQsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpbmFuY2lhbC1lbXBpcmUvLi9zcmMvY29tcG9uZW50cy91aS90aGVtZS1wcm92aWRlci5qc3g/MjhmZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBjb25zdCBUaGVtZUNvbnRleHQgPSBjcmVhdGVDb250ZXh0KCk7XG5cbmV4cG9ydCBjb25zdCBUaGVtZVByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICBjb25zdCBbZGFya01vZGUsIHNldERhcmtNb2RlXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCB0b2dnbGVUaGVtZSA9ICgpID0+IHNldERhcmtNb2RlKCFkYXJrTW9kZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8VGhlbWVDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IGRhcmtNb2RlLCB0b2dnbGVUaGVtZSB9fT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtkYXJrTW9kZSA/ICd0aGVtZS1kYXJrJyA6ICd0aGVtZS1saWdodCd9PlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICA8L1RoZW1lQ29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn07Il0sIm5hbWVzIjpbIlJlYWN0IiwiY3JlYXRlQ29udGV4dCIsInVzZVN0YXRlIiwiVGhlbWVDb250ZXh0IiwiVGhlbWVQcm92aWRlciIsImNoaWxkcmVuIiwiZGFya01vZGUiLCJzZXREYXJrTW9kZSIsInRvZ2dsZVRoZW1lIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsImRpdiIsImNsYXNzTmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/ui/theme-provider.jsx\n");

/***/ })

};
;
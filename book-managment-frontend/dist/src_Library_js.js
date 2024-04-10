"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbook_managment_frontend"] = self["webpackChunkbook_managment_frontend"] || []).push([["src_Library_js"],{

/***/ "./src/Library.js":
/*!************************!*\
  !*** ./src/Library.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"webpack/sharing/consume/default/react/react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/lib/axios.js\");\n\n\nconst Library = () => {\n  const [books, setBooks] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get('http://localhost:3000/api/books').then(response => {\n      setBooks(response.data);\n    }).catch(error => {\n      console.error(\"There was an error fetching the books: \", error);\n    });\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h1\", null, \"Knji\\u017Enica\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"ul\", null, books.map(book => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"li\", {\n    key: book.id\n  }, book.title))));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Library);\n\n//# sourceURL=webpack://book-managment-frontend/./src/Library.js?");

/***/ })

}]);
"use strict";
(() => {
var exports = {};
exports.id = 116;
exports.ids = [116];
exports.modules = {

/***/ 332:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: external "aws-sdk"
const external_aws_sdk_namespaceObject = require("aws-sdk");
var external_aws_sdk_default = /*#__PURE__*/__webpack_require__.n(external_aws_sdk_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/links.js
// pages/api/links.js

external_aws_sdk_default().config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "your-aws-region"
});
const dynamoDB = new (external_aws_sdk_default()).DynamoDB.DocumentClient();
const tableName = "your-dynamodb-table-name";
async function handler(req, res) {
    if (req.method === "POST") {
        // เพิ่มลิงค์ใหม่
        const { link  } = req.body;
        try {
            await dynamoDB.put({
                TableName: tableName,
                Item: {
                    id: generateUniqueId(),
                    link: link,
                    createdAt: new Date().toISOString()
                }
            }).promise();
            res.status(201).json({
                message: "Link added successfully"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Error adding link"
            });
        }
    } else if (req.method === "GET") {
        // ดึงลิงค์ทั้งหมด
        try {
            const data = await dynamoDB.scan({
                TableName: tableName
            }).promise();
            res.status(200).json(data.Items);
        } catch (error1) {
            console.error(error1);
            res.status(500).json({
                message: "Error fetching links"
            });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(332));
module.exports = __webpack_exports__;

})();
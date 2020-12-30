var dcmlib = require('dcm')
var TP = require('/modules/touch.js')

Page({

    /* 此方法在第一次显示窗体前发生 */
    onLoad: function (event) {
        var page = this;
        TP.PageTouchInit(this);
        var sysdcm = dcmlib.Open('system')
        /* 绑定职务字段值修改回调 */
        sysdcm.onChange('ble.mac', function ch(event) {
            var v = sysdcm.getItem(event) + ''
            page.setData({QRCode : {version : 4, source : v}});
        })
        this.sysdcm = sysdcm
    },

    /* 此方法展示窗体后发生 */
    onResume: function (event) {

    },

    /* 此方法点击页面时调用 */
    onPageTouch: function (event) {
        TP.PageTouchEvent(this, event,
            0,
            0,
            function () { pm.navigateBack({ value: "update" }) },
            0,
            0
        );
    },

    /* 当前页状态变化为显示时触发 */
    onShow: function (event) {
        var v = this.sysdcm.getItem('ble.mac')
        if (v != null) {
            this.setData({QRCode : {version : 4, source : v}});
            this.setData({BLE_Name : {value : v}});
        }
        else {
            this.setData({QRCode : {version : 3, source : 'unknown'}});
            this.setData({BLE_Name : {value : 'unknown'}});
        }
    },

    /* 当前页状态变化为隐藏时触发 */
    onHide: function (event) {

    },

    /* 此方法关闭窗体前发生 */
    onExit: function (event) {
        TP.PageTouchUninit(this);
    },
});

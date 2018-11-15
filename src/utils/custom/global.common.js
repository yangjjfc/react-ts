// import CONFIG from '@/config/app.config'; // 配置
import pdf from '@/assets/images/pdf.png'; // daf
import noimg from '@/assets/images/noimage.png'; // 没有图片
import CryptoJS from '@/assets/js/aes/aes-min.min.js';
import SHA256 from '@/assets/js/sha256/sha256.min.js';


/**
 * 金额格式化
 * @param {*str} n
 */
export const parseMone = (n) => {
    let srt = '';
    if (isNaN(n)) {
        return;
    }
    let re = /^[0-9]*[1-9][0-9]*$/; // 判断是不是整数
    if (re.test(n) || n === 0) { //eslint-disable-line
        srt = parseNum(n) + '.00';
    } else {
        let k = '.' + n.toString().split('.')[1]; // 截取小数
        if (k.length <= 2) {
            k += '0';
        }
        k = k.substr(0, 3);
        let h = JSON.parse(n.toString().split('.')[0]);
        srt = parseNum(h) + k;
    }
    return srt;
};



// 格式化图片

export const formatFile = (item) => {
    let thumbnail = '';
    switch (getFileType(item)) {
        case 'image':
            //thumbnail = CONFIG.IMAGE_DOWNLOAD + changeImgSize(item);
            break;
        case 'pdf':
            thumbnail = pdf;
            break;
        default:
            thumbnail = noimg;
            break;
    }
    return thumbnail;
};

/**
 *
 * @param {*改变图片大小} src
 * @param {*} size
 */
export const changeImgSize = (src, size = '100x100') => {
    let i = src.lastIndexOf('.');
    return (src = src.substring(0, i) + '_' + size + src.substring(i));
};

/**
 * 密码加密处理
 */

export const encryption = (password, clientid, token) => {
    let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(SHA256(password)), CryptoJS.enc.Utf8.parse(clientid), {
        iv: CryptoJS.enc.Utf8.parse(token),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Iso10126
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
};


/**
 * 监听事件
 * @param {*对象名} obj 
 * @param {*绑定类型} evtype 
 * @param {*函数} fn 
 * @param {*} useCapture 
 */
export const addEvent = (obj, evtype, fn, useCapture) => {
    if (obj.addEventListener) {
        obj.addEventListener(evtype, fn, useCapture);
    } else if (obj.attachEvent) {
        obj.attachEvent('on' + evtype, fn);// IE不支持事件捕获 
    } else {
        obj['on' + evtype] = fn;// 事实上这种情况不会存在 
    }
};
/**
 * 解绑监听事件
 * @param {*对象名} obj 
 * @param {*解绑类型} evtype 
 * @param {*函数} fn 
 * @param {*} useCapture 
 */
export const delEvent = (obj, evtype, fn, useCapture) => {
    if (obj.removeEventListener) {
        obj.removeEventListener(evtype, fn, useCapture);
    } else if (obj.detachEvent) {
        obj.detachEvent('on' + evtype, fn);
    } else {
        obj['on' + evtype] = null;
    }
};


function $(id) {
    return document.getElementById(id);
}

function $class(name, index) {
    if (typeof index !== "undefined")
        return document.getElementsByClassName(name)[index];
    else
        return document.getElementsByClassName(name);
}

function $tag(name, index) {
    if (typeof index !== "undefined")
        return document.getElementsByTagName(name)[index];
    else
        return document.getElementsByTagName(name);
}

function sleep(delay) {
    let endTime = new Date().getTime() + parseInt(delay);
    while (new Date().getTime() < endTime) ;
    //用时间来控制延时,突破浏览器同时下载任务限制.
}

function getOptionName(options, value) {
    let name = "";
    try {
        options.forEach(function (option) {
            if (option.value === value) {
                name = option.text;
                throw new Error("break");
            }
        });
    } catch (e) {
    }
    return name;
}

function getOptionValue(options, label) {
    let value = null;
    try {
        options.forEach(function (option) {
            if (option.label === label) {
                value = option.value;
                throw new Error("break");
            }
        });
    } catch (e) {
    }
    return value;
}

// BEGIN DES3
function des (key, message, encrypt, mode, iv, padding) {
    // DES 加密算法
    //  1） 该函数接受一个 8 字节字符串作为普通 DES 算法的密钥（也就是 64 位，但是算法只使用 56 位），或者接受一个 24 字节字符串作为 3DES
    //  2） 算法的密钥；第二个参数是要加密或解密的信息字符串；第三个布尔值参数用来说明信息是加密还是解密；接下来的可选参数 mode 如果是 0 表示 ECB
    //  3）模式，1 表示 CBC 模式，默认是 ECB 模式；最后一个可选项是一个 8 字节的输入向量字符串（在 ECB 模式下不使用）。返回的密文是字符串。
    //  4） 参数：
    //   * key: 8字节字符串作为普通 DES 算法的密钥,或 24 字节字符串作为 3DES
    // 	 * message： 加密或解密的信息字符串
    // 	 * encrypt: 布尔值参数用来说明信息是加密=1,还是解密=0
    // 	 * mode: 1:CBC模式，0:ECB模式(默认)
    // 	 * iv: 可选项，初始化向量
    // 	 * padding: 可选项, 8字节的输入向量字符串（在 ECB 模式下不使用）


    if (encrypt) //如果是加密的话，首先转换编码
        message = unescape(encodeURIComponent(message));
    //declaring this locally speeds things up a bit
    let spfunction1 = new Array(0x1010400, 0, 0x10000, 0x1010404, 0x1010004, 0x10404, 0x4, 0x10000, 0x400, 0x1010400, 0x1010404, 0x400, 0x1000404, 0x1010004, 0x1000000, 0x4, 0x404, 0x1000400, 0x1000400, 0x10400, 0x10400, 0x1010000, 0x1010000, 0x1000404, 0x10004, 0x1000004, 0x1000004, 0x10004, 0, 0x404, 0x10404, 0x1000000, 0x10000, 0x1010404, 0x4, 0x1010000, 0x1010400, 0x1000000, 0x1000000, 0x400, 0x1010004, 0x10000, 0x10400, 0x1000004, 0x400, 0x4, 0x1000404, 0x10404, 0x1010404, 0x10004, 0x1010000, 0x1000404, 0x1000004, 0x404, 0x10404, 0x1010400, 0x404, 0x1000400, 0x1000400, 0, 0x10004, 0x10400, 0, 0x1010004);
    let spfunction2 = new Array(-0x7fef7fe0, -0x7fff8000, 0x8000, 0x108020, 0x100000, 0x20, -0x7fefffe0, -0x7fff7fe0, -0x7fffffe0, -0x7fef7fe0, -0x7fef8000, -0x80000000, -0x7fff8000, 0x100000, 0x20, -0x7fefffe0, 0x108000, 0x100020, -0x7fff7fe0, 0, -0x80000000, 0x8000, 0x108020, -0x7ff00000, 0x100020, -0x7fffffe0, 0, 0x108000, 0x8020, -0x7fef8000, -0x7ff00000, 0x8020, 0, 0x108020, -0x7fefffe0, 0x100000, -0x7fff7fe0, -0x7ff00000, -0x7fef8000, 0x8000, -0x7ff00000, -0x7fff8000, 0x20, -0x7fef7fe0, 0x108020, 0x20, 0x8000, -0x80000000, 0x8020, -0x7fef8000, 0x100000, -0x7fffffe0, 0x100020, -0x7fff7fe0, -0x7fffffe0, 0x100020, 0x108000, 0, -0x7fff8000, 0x8020, -0x80000000, -0x7fefffe0, -0x7fef7fe0, 0x108000);
    let spfunction3 = new Array(0x208, 0x8020200, 0, 0x8020008, 0x8000200, 0, 0x20208, 0x8000200, 0x20008, 0x8000008, 0x8000008, 0x20000, 0x8020208, 0x20008, 0x8020000, 0x208, 0x8000000, 0x8, 0x8020200, 0x200, 0x20200, 0x8020000, 0x8020008, 0x20208, 0x8000208, 0x20200, 0x20000, 0x8000208, 0x8, 0x8020208, 0x200, 0x8000000, 0x8020200, 0x8000000, 0x20008, 0x208, 0x20000, 0x8020200, 0x8000200, 0, 0x200, 0x20008, 0x8020208, 0x8000200, 0x8000008, 0x200, 0, 0x8020008, 0x8000208, 0x20000, 0x8000000, 0x8020208, 0x8, 0x20208, 0x20200, 0x8000008, 0x8020000, 0x8000208, 0x208, 0x8020000, 0x20208, 0x8, 0x8020008, 0x20200);
    let spfunction4 = new Array(0x802001, 0x2081, 0x2081, 0x80, 0x802080, 0x800081, 0x800001, 0x2001, 0, 0x802000, 0x802000, 0x802081, 0x81, 0, 0x800080, 0x800001, 0x1, 0x2000, 0x800000, 0x802001, 0x80, 0x800000, 0x2001, 0x2080, 0x800081, 0x1, 0x2080, 0x800080, 0x2000, 0x802080, 0x802081, 0x81, 0x800080, 0x800001, 0x802000, 0x802081, 0x81, 0, 0, 0x802000, 0x2080, 0x800080, 0x800081, 0x1, 0x802001, 0x2081, 0x2081, 0x80, 0x802081, 0x81, 0x1, 0x2000, 0x800001, 0x2001, 0x802080, 0x800081, 0x2001, 0x2080, 0x800000, 0x802001, 0x80, 0x800000, 0x2000, 0x802080);
    let spfunction5 = new Array(0x100, 0x2080100, 0x2080000, 0x42000100, 0x80000, 0x100, 0x40000000, 0x2080000, 0x40080100, 0x80000, 0x2000100, 0x40080100, 0x42000100, 0x42080000, 0x80100, 0x40000000, 0x2000000, 0x40080000, 0x40080000, 0, 0x40000100, 0x42080100, 0x42080100, 0x2000100, 0x42080000, 0x40000100, 0, 0x42000000, 0x2080100, 0x2000000, 0x42000000, 0x80100, 0x80000, 0x42000100, 0x100, 0x2000000, 0x40000000, 0x2080000, 0x42000100, 0x40080100, 0x2000100, 0x40000000, 0x42080000, 0x2080100, 0x40080100, 0x100, 0x2000000, 0x42080000, 0x42080100, 0x80100, 0x42000000, 0x42080100, 0x2080000, 0, 0x40080000, 0x42000000, 0x80100, 0x2000100, 0x40000100, 0x80000, 0, 0x40080000, 0x2080100, 0x40000100);
    let spfunction6 = new Array(0x20000010, 0x20400000, 0x4000, 0x20404010, 0x20400000, 0x10, 0x20404010, 0x400000, 0x20004000, 0x404010, 0x400000, 0x20000010, 0x400010, 0x20004000, 0x20000000, 0x4010, 0, 0x400010, 0x20004010, 0x4000, 0x404000, 0x20004010, 0x10, 0x20400010, 0x20400010, 0, 0x404010, 0x20404000, 0x4010, 0x404000, 0x20404000, 0x20000000, 0x20004000, 0x10, 0x20400010, 0x404000, 0x20404010, 0x400000, 0x4010, 0x20000010, 0x400000, 0x20004000, 0x20000000, 0x4010, 0x20000010, 0x20404010, 0x404000, 0x20400000, 0x404010, 0x20404000, 0, 0x20400010, 0x10, 0x4000, 0x20400000, 0x404010, 0x4000, 0x400010, 0x20004010, 0, 0x20404000, 0x20000000, 0x400010, 0x20004010);
    let spfunction7 = new Array(0x200000, 0x4200002, 0x4000802, 0, 0x800, 0x4000802, 0x200802, 0x4200800, 0x4200802, 0x200000, 0, 0x4000002, 0x2, 0x4000000, 0x4200002, 0x802, 0x4000800, 0x200802, 0x200002, 0x4000800, 0x4000002, 0x4200000, 0x4200800, 0x200002, 0x4200000, 0x800, 0x802, 0x4200802, 0x200800, 0x2, 0x4000000, 0x200800, 0x4000000, 0x200800, 0x200000, 0x4000802, 0x4000802, 0x4200002, 0x4200002, 0x2, 0x200002, 0x4000000, 0x4000800, 0x200000, 0x4200800, 0x802, 0x200802, 0x4200800, 0x802, 0x4000002, 0x4200802, 0x4200000, 0x200800, 0, 0x2, 0x4200802, 0, 0x200802, 0x4200000, 0x800, 0x4000002, 0x4000800, 0x800, 0x200002);
    let spfunction8 = new Array(0x10001040, 0x1000, 0x40000, 0x10041040, 0x10000000, 0x10001040, 0x40, 0x10000000, 0x40040, 0x10040000, 0x10041040, 0x41000, 0x10041000, 0x41040, 0x1000, 0x40, 0x10040000, 0x10000040, 0x10001000, 0x1040, 0x41000, 0x40040, 0x10040040, 0x10041000, 0x1040, 0, 0, 0x10040040, 0x10000040, 0x10001000, 0x41040, 0x40000, 0x41040, 0x40000, 0x10041000, 0x1000, 0x40, 0x10040040, 0x1000, 0x41040, 0x10001000, 0x40, 0x10000040, 0x10040000, 0x10040040, 0x10000000, 0x40000, 0x10001040, 0, 0x10041040, 0x40040, 0x10000040, 0x10040000, 0x10001000, 0x10001040, 0, 0x10041040, 0x41000, 0x41000, 0x1040, 0x1040, 0x40040, 0x10000000, 0x10041000);
    //create the 16 or 48 subkeys we will need
    let keys = des_createKeys(key);
    let m = 0, i, j, temp , right1, right2, left, right, looping;
    let cbcleft, cbcleft2, cbcright, cbcright2;
    let endloop, loopinc;
    let len = message.length;
    let chunk = 0;
    //set up the loops for single and triple des
    let iterations = keys.length == 32 ? 3 : 9; //single or triple des
    if (iterations == 3) {
        looping = encrypt ? new Array(0, 32, 2) : new Array(30, -2, -2);
    }
    else {
        looping = encrypt ? new Array(0, 32, 2, 62, 30, -2, 64, 96, 2) : new Array(94, 62, -2, 32, 64, 2, 30, -2, -2);
    }
    //pad the message depending on the padding parameter
    if (padding == 2) message += "    "; //pad the message with spaces
    else if (padding == 1) {
        if (encrypt) {
            temp = 8 - (len % 8);
            message += String.fromCharCode(temp, temp, temp, temp, temp, temp, temp, temp);
            if (temp === 8) len += 8;
        }
    } //PKCS7 padding
    else if (!padding) message += "\0\0\0\0\0\0\0\0"; //pad the message out with null bytes
    //store the result here
    let result = "";
    let tempresult = "";
    if (mode == 1) { //CBC mode
        cbcleft = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
        cbcright = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
        m = 0;
    }
    //loop through each 64 bit chunk of the message
    while (m < len) {
        left = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);
        right = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);
        //for Cipher Block Chaining mode, xor the message with the previous result
        if (mode == 1) {
            if (encrypt) {
                left ^= cbcleft;
                right ^= cbcright;
            } else {
                cbcleft2 = cbcleft;
                cbcright2 = cbcright;
                cbcleft = left;
                cbcright = right;
            }
        }
        //first each 64 but chunk of the message must be permuted according to IP
        temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;
        right ^= temp;
        left ^= (temp << 4);
        temp = ((left >>> 16) ^ right) & 0x0000ffff;
        right ^= temp;
        left ^= (temp << 16);
        temp = ((right >>> 2) ^ left) & 0x33333333;
        left ^= temp;
        right ^= (temp << 2);
        temp = ((right >>> 8) ^ left) & 0x00ff00ff;
        left ^= temp;
        right ^= (temp << 8);
        temp = ((left >>> 1) ^ right) & 0x55555555;
        right ^= temp;
        left ^= (temp << 1);
        left = ((left << 1) | (left >>> 31));
        right = ((right << 1) | (right >>> 31));
        //do this either 1 or 3 times for each chunk of the message
        for (j = 0; j < iterations; j += 3) {
            endloop = looping[j + 1];
            loopinc = looping[j + 2];
            //now go through and perform the encryption or decryption
            for (i = looping[j]; i != endloop; i += loopinc) { //for efficiency
                right1 = right ^ keys[i];
                right2 = ((right >>> 4) | (right << 28)) ^ keys[i + 1];
                //the result is attained by passing these bytes through the S selection functions
                temp = left;
                left = right;
                right = temp ^ (spfunction2[(right1 >>> 24) & 0x3f] | spfunction4[(right1 >>> 16) & 0x3f]
                    | spfunction6[(right1 >>> 8) & 0x3f] | spfunction8[right1 & 0x3f]
                    | spfunction1[(right2 >>> 24) & 0x3f] | spfunction3[(right2 >>> 16) & 0x3f]
                    | spfunction5[(right2 >>> 8) & 0x3f] | spfunction7[right2 & 0x3f]);
            }
            temp = left;
            left = right;
            right = temp; //unreverse left and right
        } //for either 1 or 3 iterations
        //move then each one bit to the right
        left = ((left >>> 1) | (left << 31));
        right = ((right >>> 1) | (right << 31));
        //now perform IP-1, which is IP in the opposite direction
        temp = ((left >>> 1) ^ right) & 0x55555555;
        right ^= temp;
        left ^= (temp << 1);
        temp = ((right >>> 8) ^ left) & 0x00ff00ff;
        left ^= temp;
        right ^= (temp << 8);
        temp = ((right >>> 2) ^ left) & 0x33333333;
        left ^= temp;
        right ^= (temp << 2);
        temp = ((left >>> 16) ^ right) & 0x0000ffff;
        right ^= temp;
        left ^= (temp << 16);
        temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;
        right ^= temp;
        left ^= (temp << 4);
        //for Cipher Block Chaining mode, xor the message with the previous result
        if (mode == 1) {
            if (encrypt) {
                cbcleft = left;
                cbcright = right;
            } else {
                left ^= cbcleft2;
                right ^= cbcright2;
            }
        }
        tempresult += String.fromCharCode((left >>> 24), ((left >>> 16) & 0xff), ((left >>> 8) & 0xff), (left & 0xff), (right >>> 24), ((right >>> 16) & 0xff), ((right >>> 8) & 0xff), (right & 0xff));
        chunk += 8;
        if (chunk == 512) {
            result += tempresult;
            tempresult = "";
            chunk = 0;
        }
    } //for every 8 characters, or 64 bits in the message
    //return the result as an array
    result += tempresult;
    result = result.replace(/\0*$/g, "");
    if (!encrypt) { //如果是解密的话，解密结束后对PKCS7 padding进行解码，并转换成utf-8编码
        if (padding === 1) { //PKCS7 padding解码
            let len = result.length, paddingChars = 0;
            len && (paddingChars = result.charCodeAt(len - 1));
            (paddingChars <= 8) && (result = result.substring(0, len - paddingChars));
        }
        //转换成UTF-8编码
        result = decodeURIComponent(escape(result));
    }
    return result;
} //end of des
//des_createKeys
//this takes as input a 64 bit key (even though only 56 bits are used)
//as an array of 2 integers, and returns 16 48 bit keys
function des_createKeys (key) {
    //declaring this locally speeds things up a bit
    let pc2bytes0 = new Array(0, 0x4, 0x20000000, 0x20000004, 0x10000, 0x10004, 0x20010000, 0x20010004, 0x200, 0x204, 0x20000200, 0x20000204, 0x10200, 0x10204, 0x20010200, 0x20010204);
    let pc2bytes1 = new Array(0, 0x1, 0x100000, 0x100001, 0x4000000, 0x4000001, 0x4100000, 0x4100001, 0x100, 0x101, 0x100100, 0x100101, 0x4000100, 0x4000101, 0x4100100, 0x4100101);
    let pc2bytes2 = new Array(0, 0x8, 0x800, 0x808, 0x1000000, 0x1000008, 0x1000800, 0x1000808, 0, 0x8, 0x800, 0x808, 0x1000000, 0x1000008, 0x1000800, 0x1000808);
    let pc2bytes3 = new Array(0, 0x200000, 0x8000000, 0x8200000, 0x2000, 0x202000, 0x8002000, 0x8202000, 0x20000, 0x220000, 0x8020000, 0x8220000, 0x22000, 0x222000, 0x8022000, 0x8222000);
    let pc2bytes4 = new Array(0, 0x40000, 0x10, 0x40010, 0, 0x40000, 0x10, 0x40010, 0x1000, 0x41000, 0x1010, 0x41010, 0x1000, 0x41000, 0x1010, 0x41010);
    let pc2bytes5 = new Array(0, 0x400, 0x20, 0x420, 0, 0x400, 0x20, 0x420, 0x2000000, 0x2000400, 0x2000020, 0x2000420, 0x2000000, 0x2000400, 0x2000020, 0x2000420);
    let pc2bytes6 = new Array(0, 0x10000000, 0x80000, 0x10080000, 0x2, 0x10000002, 0x80002, 0x10080002, 0, 0x10000000, 0x80000, 0x10080000, 0x2, 0x10000002, 0x80002, 0x10080002);
    let pc2bytes7 = new Array(0, 0x10000, 0x800, 0x10800, 0x20000000, 0x20010000, 0x20000800, 0x20010800, 0x20000, 0x30000, 0x20800, 0x30800, 0x20020000, 0x20030000, 0x20020800, 0x20030800);
    let pc2bytes8 = new Array(0, 0x40000, 0, 0x40000, 0x2, 0x40002, 0x2, 0x40002, 0x2000000, 0x2040000, 0x2000000, 0x2040000, 0x2000002, 0x2040002, 0x2000002, 0x2040002);
    let pc2bytes9 = new Array(0, 0x10000000, 0x8, 0x10000008, 0, 0x10000000, 0x8, 0x10000008, 0x400, 0x10000400, 0x408, 0x10000408, 0x400, 0x10000400, 0x408, 0x10000408);
    let pc2bytes10 = new Array(0, 0x20, 0, 0x20, 0x100000, 0x100020, 0x100000, 0x100020, 0x2000, 0x2020, 0x2000, 0x2020, 0x102000, 0x102020, 0x102000, 0x102020);
    let pc2bytes11 = new Array(0, 0x1000000, 0x200, 0x1000200, 0x200000, 0x1200000, 0x200200, 0x1200200, 0x4000000, 0x5000000, 0x4000200, 0x5000200, 0x4200000, 0x5200000, 0x4200200, 0x5200200);
    let pc2bytes12 = new Array(0, 0x1000, 0x8000000, 0x8001000, 0x80000, 0x81000, 0x8080000, 0x8081000, 0x10, 0x1010, 0x8000010, 0x8001010, 0x80010, 0x81010, 0x8080010, 0x8081010);
    let pc2bytes13 = new Array(0, 0x4, 0x100, 0x104, 0, 0x4, 0x100, 0x104, 0x1, 0x5, 0x101, 0x105, 0x1, 0x5, 0x101, 0x105);
    //how many iterations (1 for des, 3 for triple des)
    let iterations = key.length > 8 ? 3 : 1; //changed by Paul 16/6/2007 to use Triple DES for 9+ byte keys
    //stores the return keys
    let keys = new Array(32 * iterations);
    //now define the left shifts which need to be done
    let shifts = new Array(0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0);
    //other variables
    let lefttemp, righttemp, m = 0, n = 0, temp;
    for (let j = 0; j < iterations; j++) { //either 1 or 3 iterations
        let left = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);
        let right = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);
        temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;
        right ^= temp;
        left ^= (temp << 4);
        temp = ((right >>> -16) ^ left) & 0x0000ffff;
        left ^= temp;
        right ^= (temp << -16);
        temp = ((left >>> 2) ^ right) & 0x33333333;
        right ^= temp;
        left ^= (temp << 2);
        temp = ((right >>> -16) ^ left) & 0x0000ffff;
        left ^= temp;
        right ^= (temp << -16);
        temp = ((left >>> 1) ^ right) & 0x55555555;
        right ^= temp;
        left ^= (temp << 1);
        temp = ((right >>> 8) ^ left) & 0x00ff00ff;
        left ^= temp;
        right ^= (temp << 8);
        temp = ((left >>> 1) ^ right) & 0x55555555;
        right ^= temp;
        left ^= (temp << 1);
        //the right side needs to be shifted and to get the last four bits of the left side
        temp = (left << 8) | ((right >>> 20) & 0x000000f0);
        //left needs to be put upside down
        left = (right << 24) | ((right << 8) & 0xff0000) | ((right >>> 8) & 0xff00) | ((right >>> 24) & 0xf0);
        right = temp;
        //now go through and perform these shifts on the left and right keys
        for (let i = 0; i < shifts.length; i++) {
            //shift the keys either one or two bits to the left
            if (shifts[i]) {
                left = (left << 2) | (left >>> 26);
                right = (right << 2) | (right >>> 26);
            }
            else {
                left = (left << 1) | (left >>> 27);
                right = (right << 1) | (right >>> 27);
            }
            left &= -0xf;
            right &= -0xf;
            //now apply PC-2, in such a way that E is easier when encrypting or decrypting
            //this conversion will look like PC-2 except only the last 6 bits of each byte are used
            //rather than 48 consecutive bits and the order of lines will be according to
            //how the S selection functions will be applied: S2, S4, S6, S8, S1, S3, S5, S7
            lefttemp = pc2bytes0[left >>> 28] | pc2bytes1[(left >>> 24) & 0xf]
                | pc2bytes2[(left >>> 20) & 0xf] | pc2bytes3[(left >>> 16) & 0xf]
                | pc2bytes4[(left >>> 12) & 0xf] | pc2bytes5[(left >>> 8) & 0xf]
                | pc2bytes6[(left >>> 4) & 0xf];
            righttemp = pc2bytes7[right >>> 28] | pc2bytes8[(right >>> 24) & 0xf]
                | pc2bytes9[(right >>> 20) & 0xf] | pc2bytes10[(right >>> 16) & 0xf]
                | pc2bytes11[(right >>> 12) & 0xf] | pc2bytes12[(right >>> 8) & 0xf]
                | pc2bytes13[(right >>> 4) & 0xf];
            temp = ((righttemp >>> 16) ^ lefttemp) & 0x0000ffff;
            keys[n++] = lefttemp ^ temp;
            keys[n++] = righttemp ^ (temp << 16);
        }
    } //for each iterations
    //return the keys we've created
    return keys;
} //end of des_createKeys
function genkey(key, start, end) {
    //8 byte / 64 bit Key (DES) or 192 bit Key
    return {
        key: pad(key.slice(start, end)),
        vector: 1
    };
}
function pad(key) {
    for (let i = key.length; i < 24; i++) {
        key += "0";
    }
    return key;
}
var DES3IV = 'A1B2C3D4E5F6G7H8';
var DES3 = {
    //3DES加密，CBC/PKCS5Padding
    encrypt: function (key, input) {
        let genKey = genkey(key, 0, 24);
        return btoa(des(genKey.key, input, 1, 1, DES3IV, 1));
    },
    //3DES解密，CBC / PKCS5Padding
    decrypt: function (key, input) {
        let genKey = genkey(key, 0, 24);
        return des(genKey.key, atob(input), 0, 1, DES3IV, 1);
    }
};

// END DES3

var NORMAL = {
    encrypt: function(pwd, str) {
        if (pwd == null || pwd.length <= 0) {
            UI.alert.show("提示","Please enter a password with which to encrypt the message.");
            return null;
        }
        let prand = "";
        for (let i = 0; i < pwd.length; i++) {
            prand += pwd.charCodeAt(i).toString();
        }
        let sPos = Math.floor(prand.length / 5);
        let mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5));
        let incr = Math.ceil(pwd.length / 2);
        let modu = Math.pow(2, 31) - 1;
        if (mult < 2) {
            UI.alert.show("提示","Algorithm cannot find a suitable hash. Please choose a different password. \nPossible considerations are to choose a more complex or longer password.");
            return null;
        }
        let salt = Math.round(Math.random() * 1000000000) % 100000000;
        prand += salt;
        while (prand.length > 10) {
            prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
        }
        prand = (mult * prand + incr) % modu;
        let enc_chr = "";
        let enc_str = "";
        for (let i = 0; i < str.length; i++) {
            enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
            if (enc_chr < 16) {
                enc_str += "0" + enc_chr.toString(16);
            } else enc_str += enc_chr.toString(16);
            prand = (mult * prand + incr) % modu;
        }
        salt = salt.toString(16);
        while (salt.length < 8) salt = "0" + salt;
        enc_str += salt;
        return enc_str;
    },

    decrypt: function(pwd, str) {
        if (str == null || str.length < 8) {
            UI.alert.show("提示","A salt value could not be extracted from the encrypted message because it's length is too short. The message cannot be decrypted.");
            return;
        }
        if (pwd == null || pwd.length <= 0) {
            UI.alert.show("提示","Please enter a password with which to decrypt the message.");
            return;
        }
        let prand = "";
        for (let i = 0; i < pwd.length; i++) {
            prand += pwd.charCodeAt(i).toString();
        }
        let sPos = Math.floor(prand.length / 5);
        let mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5));
        let incr = Math.round(pwd.length / 2);
        let modu = Math.pow(2, 31) - 1;
        let salt = parseInt(str.substring(str.length - 8, str.length), 16);
        str = str.substring(0, str.length - 8);
        prand += salt;
        while (prand.length > 10) {
            prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
        }
        prand = (mult * prand + incr) % modu;
        let enc_chr = "";
        let enc_str = "";
        for (let i = 0; i < str.length; i += 2) {
            enc_chr = parseInt(parseInt(str.substring(i, i + 2), 16) ^ Math.floor((prand / modu) * 255));
            enc_str += String.fromCharCode(enc_chr);
            prand = (mult * prand + incr) % modu;
        }
        return enc_str;
    }
};

var __hexcase__ = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var __b64pad__  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var __chrsz__   = 16;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

function openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    let aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || '';
    // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    let event;
    if (window.MouseEvent) {
        event = new MouseEvent('click');
    } else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}

function getNow() {
    let date = new Date();
    return date.format("yyyy-MM-dd hh:mm:ss S")
}

String.prototype.toBoolean = function(){
    let str = this.toString().toLowerCase().trim();
    if (str == "true" || str == "false")
        return eval(str);
    else
        return false
};


String.prototype.Encrypt = function(key, mode){
    if (mode == 0){
        return NORMAL.encrypt(key,this);
    }
    if (mode == 1){
        return DES3.encrypt(key, this);
    }
};

String.prototype.Decrypt = function(key, mode){
    if (mode == 0){
        return NORMAL.decrypt(key,this);
    }
    if (mode == 1){
        return DES3.decrypt(key, this);
    }
};

function hex_md5(s) {
    return core_md5(s.str2binary(), s.length * __chrsz__).binary2hex();
}

function b64_md5(s) {
    return binl2b64(core_md5(s.str2binary(), s.length * __chrsz__));
}

function hex_hmac_md5(key, data) {
    return core_hmac_md5(key, data).binary2hex();
}

function b64_hmac_md5(key, data) {
    return binl2b64(core_hmac_md5(key, data));
}

function core_md5(x, len) {
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;
    for (let i = 0; i < x.length; i += 16) {
        let olda = a;
        let oldb = b;
        let oldc = c;
        let oldd = d;

        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);

}

function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}

function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function core_hmac_md5(key, data) {
    let bkey = key.str2binary();
    if (bkey.length > 16) bkey = core_md5(bkey, key.length * __chrsz__);

    let ipad = Array(16), opad = Array(16);
    for (let i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    let hash = core_md5(ipad.concat(data.str2binary()), 512 + data.length * __chrsz__);
    return core_md5(opad.concat(hash), 512 + 128);
}

function safe_add(x, y) {
    let lsw = (x & 0xFFFF) + (y & 0xFFFF);
    let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

String.prototype.str2binary = function(chrsz){
    //如需支持中文转换,chrsz = 16
    if (typeof chrsz === "undefined")
        chrsz = __chrsz__;
    let bin = Array();
    let mask = (1 << __chrsz__) - 1;
    for (var i = 0; i < this.length * chrsz; i += chrsz)
        bin[i >> 5] |= (this.charCodeAt(i / chrsz) & mask) << (i % 32);
    return bin;
}

Array.prototype.binary2str = function (chrsz){
    //如需支持中文转换,__chrsz__ = 16
    if (typeof chrsz === "undefined")
        chrsz = __chrsz__;
    let str = "";
    let mask = (1 << chrsz) - 1;
    for (var i = 0; i < this.length * 32; i += chrsz)
        str += String.fromCharCode((this[i >> 5] >>> (i % 32)) & mask);
    return str;

}

Array.prototype.getMap = function(ids){
    let data = [];
    for(let i = 0;i<this.length;i++){
        let source = this[i];
        let tmp = [];
        for (let index = 0;index<ids.length;index++){
            tmp.push(source[ids[index]]);
        }
        data.push(tmp);
    }
    return data;
}

Array.prototype.wash = function(){
    return this.reduce(function(array, item) {
        if (typeof item === "object")
            array.push(item);
        else if (item != null) {
            if (typeof item !== "string")
                array.push(item);
            else if (item.trim() != "")
                array.push(item);
        }
        return array;
    },[]);
}

function str2ab(str) {
    //使用UTF8编码规则,涉及中文的转换.
    let codes = [];
    for (let i = 0; i != str.length; ++i) {
        let code = str.charCodeAt(i);
        if (0x00 <= code && code <= 0x7f) {
            codes.push(code);
        } else if (0x80 <= code && code <= 0x7ff) {
            codes.push((192 | (31 & (code >> 6))));
            codes.push((128 | (63 & code)))
        } else if ((0x800 <= code && code <= 0xd7ff)
            || (0xe000 <= code && code <= 0xffff)) {
            codes.push((224 | (15 & (code >> 12))));
            codes.push((128 | (63 & (code >> 6))));
            codes.push((128 | (63 & code)))
        }
    }
    let buf = new ArrayBuffer(codes.length);
    let result = new Uint8Array(buf);
    for (let i = 0; i < codes.length; i++) {
        result[i] = codes[i] & 0xff;
    }
    return result;
}

function ab2str(array) {
    let out, i, len, c;
    let char2, char3;
    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
        c = array[i++];
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx
                out += String.fromCharCode(c);
                break;
            case 12:
            case 13:
                // 110x xxxx   10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}

Array.prototype.binary2hex = function() {
    let hex_tab = __hexcase__ ? "0123456789ABCDEF" : "0123456789abcdef";
    let str = "";
    for (let i = 0; i < this.length * 4; i++) {
        str += hex_tab.charAt((this[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
            hex_tab.charAt((this[i >> 2] >> ((i % 4) * 8)) & 0xF);
    }
    return str;
}

String.prototype.hex2binary = function () {
    //从 binary2hex 来，但回不去了，有待研究
    let i = 0, l = this.length-1, bytes = [];
    for (i; i < l; i += 2) {
        bytes.push(parseInt(this.substr(i, 2), 16))
    }
    return bytes;
}

function binl2b64(binarray) {
    let tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let str = "";
    for (let i = 0; i < binarray.length * 4; i += 3) {
        let triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16)
            | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8)
            | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
        for (let j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32) str += __b64pad__;
            else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
        }
    }
    return str;
}

String.prototype.hex_md5_hash = function(){
    return hex_md5(this.toString());
};

String.prototype.b64_md5_hash = function(){
    return b64_md5(this.toString());
};

String.prototype.hex_hmac_md5 = function(key){
    return hex_hmac_md5(key,this.toString());
};

String.prototype.b64_hmac_md5 = function(key){
    return b64_hmac_md5(key,this.toString());
};

Date.prototype.format = function(fmt) {
    //#######################################################################
    // 来自网络算法,用于日期格式定义，不支持yyyyMMdd格式
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    //#######################################################################
    let o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                     //日
        "h+": this.getHours(),                    //小时
        "m+": this.getMinutes(),                  //分
        "s+": this.getSeconds(),                  //秒
        "q+": Math.floor((this.getMonth() + 3) / 3),  //季度
        "S": this.getMilliseconds()              //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

String.prototype.isNumber = function(){
     //用于判断字符串是否是符合数字
    let str = this.toString();
    let reg = new RegExp(/^([-+])?\d+(\.[0-9]{1,19})?$/);
    //let result = reg.exec(str);
    let result = str.match(reg,"g");
    let re = false;
    if (result != null) {
        for (let i = 0; i < result.length; i++) {
            if (result[i] == str) {
                re = true;
                break;
            }
        }
    }
    return re;
};

String.prototype.isIDnumber = function(){
    //用于简单判断18位身份证号码
    //校验年份范围1900-2099
    let str = this.toString();
    let reg = RegExp(/^\d{6}((19|20)\d{2}(01|02|03|04|05|06|07|08|09|10|11|12)(01|02|03|04|05|06|07|08|09|10|11|12|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31)\d{3}[0-9xX])/,"g");
    let result = str.match(reg,"g");
    let re = false;
    if (result != null) {
        for (let i = 0; i < result.length; i++) {
            if (result[i] == str) {
                re = true;
                break;
            }
        }
    }
    return re;
};

String.prototype.isPhoneNumber = function(){
    //用于简单判断是否是手机号码
    let str = this.toString();
    let reg = RegExp(/^1[3|4|5|7|8]\d{9}/,"g");
    let result = str.match(reg,"g");
    let re = false;
    if (result != null) {
        for (let i = 0; i < result.length; i++) {
            if (result[i] == str) {
                re = true;
                break;
            }
        }
    }
    return re;
};

String.prototype.toDatetime = function () {
    let str = this.toString();
    let d = "Invalid Date";
    let a = str.split(" ");
    let b = [];
    let c = [];
    if (a.length == 2) {
        b = (a[0].split("-").length == 3 ? a[0].split("-") : (a[0].split("/").length == 3 ? a[0].split("/") : (a[0].split(".").length == 3 ? a[0].split(".") : [])));
        c = a[1].split(":");
        if (b.length == 3 && c.length == 3) {
            try {
                let t = new Date(Number(b[0]), Number(b[1]) - 1, Number(b[2]), Number(c[0]), Number(c[1]), Number(c[2]));
                if (t.toString() != "Invalid Date")
                    d = t
                    //d = t.format(format);
            } catch (e) {
            }
        }
    } else if (a.length == 1) {
        b = (a[0].split("-").length == 3 ? a[0].split("-") : (a[0].split("/").length == 3 ? a[0].split("/") : (a[0].split(".").length == 3 ? a[0].split(".") : [])));
        if (b.length == 3) {
            try {
                let t = new Date(Number(b[0]), Number(b[1]) - 1, Number(b[2]));
                if (t.toString() != "Invalid Date")
                    d = t;
                    //d = t.format(format);
            } catch (e) {
            }
        }
    }
    return d;
};

String.prototype.isDatetime = function () {
    let str = this.toString();
    let a = str.split(" ");
    let b = [];
    let c = [];
    if (a.length == 2) {
        b = (a[0].split("-").length == 3 ? a[0].split("-") : (a[0].split("/").length == 3 ? a[0].split("/") : (a[0].split(".").length == 3 ? a[0].split(".") : [])));
        c = a[1].split(":");
        if (b.length == 3 && c.length == 3) {
            try {
                let d = new Date(Number(b[0]), Number(b[1]) - 1, Number(b[2]), Number(c[0]), Number(c[1]), Number(c[2]));
                if (d.toString() == "Invalid Date")
                    return false;
                else
                    return true;
            } catch (e) {
                return false;
            }
        } else
            return false;
    } else if (a.length == 1) {
        b = (a[0].split("-").length == 3 ? a[0].split("-") : (a[0].split("/").length == 3 ? a[0].split("/") : (a[0].split(".").length == 3 ? a[0].split(".") : [])));
        if (b.length == 3) {
            try {
                let d = new Date(Number(b[0]), Number(b[1]) - 1, Number(b[2]));
                if (d.toString() == "Invalid Date")
                    return false;
                else
                    return true;
            } catch (e) {
                return false;
            }
        } else
            return false;
    } else
        return false;
};

String.prototype.replaceAll = function(search, replacement) {
    // 没有解决search参数中存在正则表达式符号的问题,
    // 不能采用replace(new RegExp(search, 'g'), replacement)方法;
    let target = this;
    try {
        while (target.includes(search)) {
            target = target.replace(search, replacement);
        }
    }catch (e) {
        __LOGS__.viewError(e);
    }
    return target;
};

String.prototype.getStringDataType = function(){
      //判断字符是否符合数字规则
     let str = this.toString().trim();
     try {
         if (str.isDatetime() && str.indexOf(":") == -1)
             return "date";
         else if (str.isDatetime() && str.indexOf(":") != -1)
             return "datetime";
         else if (str.isIDnumber() || str.isPhoneNumber())
             return "nvarchar";
         else if (str.isNumber() && isNaN(Number.parseInt(str)) == false && str.length < 18 && str.indexOf(".") == -1)
             return "int";
         else if (str.isNumber() && isNaN(Number.parseFloat(str)) == false && ((str.length < 18 && str.indexOf(".") == -1) || (str.indexOf(".") < 18 && str.indexOf(".")>=0)))
             return "float";
         else
             return "nvarchar"
     }
     catch (e){
         return "nvarchar"
     }
};

function getTypeOf(data) {
    //判断数据类型,可能是非字符类型
    //由于数据库在本地,数据没有经过通讯字符转换,数据全部为元类型.
    //通过元类型判断
     let type = typeof(data);
     if (type == "string") {
         if (data.isDatetime()) {
             if (data.indexOf(":") == -1)
                 type = "date";
             else if (data.indexOf(":") != -1)
                 type = "datetime";
         }
     }
     return type;
}

String.prototype.toArray = function(def,sep) {
    //def:默认值,所有转换尝试失败后返回值,如果没有设置返回[];
    //sep:如果JSON和eval转换尝试失败后,采用分隔符进行分隔;
    let str = this.trim();
    let tmp = [];
    try {
        tmp = JSON.parse(str);
        if (Array.isArray(tmp)) {
            return tmp;
        } else {
            throw new Error("err");
        }
    } catch (e) {
        try {
            tmp = eval(str.replaceAll("'", '"'));
            if (Array.isArray(tmp)) {
                return tmp;
            } else {
                throw new Error("err");
            }
        } catch (e) {
            try {
                if (typeof sep !== "undefined") {
                    str = str.split("[").join("");
                    str = str.split("[").join("");
                    return str.split(sep).reduce(function (tmp, item) {
                        if (item.getStringDataType() == "int" || item.getStringDataType() == "float") {
                            tmp.push(Number(item));
                        } else {
                            tmp.push(item);
                        }
                        return tmp;
                    }, []);
                } else {
                    throw new Error("err");
                }
            } catch (e) {
                console.log(e);
                if (typeof def != "undefined")
                    return def;
                else
                    return [];
            }
        }
    }
};

String.prototype.toHex = function() {
    return this.str2binary().binary2hex();
    //let val = "";
    //for (let i = 0; i < str.length; i++) {
    //    if (val == "") {
    //        val = str.charCodeAt(i).toString(16);
    //    } else {
    //        val += str.charCodeAt(i).toString(16);
    //    }
    //}
    //return val;
};

String.prototype.fromHextoAscii = function() {
    var symbols = " !\"#$%&'()*+,-./0123456789:;<=>?@";
    var loAZ = "abcdefghijklmnopqrstuvwxyz";
    symbols += loAZ.toUpperCase();
    symbols += "[\\]^_`";
    symbols += loAZ;
    symbols += "{|}~";

    valueStr = this.toString().toLowerCase();
    var hex = "0123456789abcdef";
    var text = "";
    var i = 0;

    for (i = 0; i < valueStr.length; i = i + 2) {
        var char1 = valueStr.charAt(i);
        if (char1 == ':') {
            i++;
            char1 = valueStr.charAt(i);
        }
        var char2 = valueStr.charAt(i + 1);
        var num1 = hex.indexOf(char1);
        var num2 = hex.indexOf(char2);
        var value = num1 << 4;
        value = value | num2;

        var valueInt = parseInt(value);
        var symbolIndex = valueInt - 32;
        var ch = '?';
        if (symbolIndex >= 0 && value <= 126) {
            ch = symbols.charAt(symbolIndex)
        }
        text += ch;
    }
    return text;
};

 String.prototype.encode = function() {
    let str = this.toString();
    let encodedStr = "" ;
    if (str == "")
        return encodedStr ;
    else {
        for (let i = 0 ; i < str.length ; i ++){
            encodedStr += "&#" + str.substring(i, i + 1).charCodeAt().toString(10) + ";" ;
        }
    }
    return encodedStr;
 };

String.prototype.decode = function() {
    let str = this.toString();
    let decodeStr = "";
    if (str == "")
        return decodeStr;
    let toParse = str.split(";");
    for (let i = 0; i < toParse.length - 1; i++) {
        let s = toParse[i];
        decodeStr += String.fromCharCode(parseInt(s.substring(2)))
    }
    return decodeStr;
}

String.prototype.getBytesSize =function() {
    let size = 0;
    for (let i = 0; i != this.length; ++i) {
        let code = this.charCodeAt(i);
        if (0x00 <= code && code <= 0x7f)
            size += 1;
        else
            size += 2;
    }
    return size;
}

Number.prototype.format = function(pattern) {
    // 用法
    // formatNumber(12345.999,'#,##0.0000') = 12,345.9990;
    // formatNumber(12345.999,'#,##0.##');
    // formatNumber(123,'000000');
    let num = this;
    let is = false;
    if (num < 0)
        is = true;
    num = Math.abs(num);
    let strarr = num ? num.toString().split('.') : ['0'];
    let fmtarr = pattern ? pattern.split('.') : [''];
    let retstr = '';
    // 整数部分
    let str = strarr[0];
    let fmt = fmtarr[0];
    let i = str.length - 1;
    let comma = false;
    for (let f = fmt.length - 1; f >= 0; f--) {
        switch (fmt.substr(f, 1)) {
            case '#':
                if (i >= 0) retstr = str.substr(i--, 1) + retstr;
                break;
            case '0':
                if (i >= 0) retstr = str.substr(i--, 1) + retstr;
                else retstr = '0' + retstr;
                break;
            case ',':
                comma = true;
                retstr = ',' + retstr;
                break;
        }
    }
    if (i >= 0) {
        if (comma) {
            let l = str.length;
            for (; i >= 0; i--) {
                retstr = str.substr(i, 1) + retstr;
                if (i > 0 && ((l - i) % 3) == 0) retstr = ',' + retstr;
            }
        }
        else retstr = str.substr(0, i + 1) + retstr;
    }
    retstr = retstr + '.';
    // 处理小数部分
    str = strarr.length > 1 ? strarr[1] : '';
    fmt = fmtarr.length > 1 ? fmtarr[1] : '';
    i = 0;
    for (let f = 0; f < fmt.length; f++) {
        switch (fmt.substr(f, 1)) {
            case '#':
                if (i < str.length) retstr += str.substr(i++, 1);
                break;
            case '0':
                if (i < str.length) retstr += str.substr(i++, 1);
                else retstr += '0';
                break;
        }
    }
    return is ? "-" + retstr.replace(/^,+/, '').replace(/\.$/, '') : retstr.replace(/^,+/, '').replace(/\.$/, '');
};

function isObj(object) {
    return object && typeof (object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
}

function isArray(object) {
    return object && typeof (object) == 'object' && object.constructor == Array;
}

function getLength(object) {
    let count = 0;
    for (let i in object) count++;
    return count;
}

function Compare(objA, objB) {
    if (!isObj(objA) || !isObj(objB)) return false; //判断类型是否正确
    if (getLength(objA) != getLength(objB)) return false; //判断长度是否一致
    return CompareObj(objA, objB, true);//默认为true
}

function CompareObj(objA, objB, flag) {
    if (!isObj(objA) && !isObj(objB)){
        flag = objA==objB;
    }
    else {
        for (let key in objA) {
            if (!flag) //跳出整个循环
                break;
            if (!objB.hasOwnProperty(key)) {
                flag = false;
                break;
            }
            if (!isArray(objA[key])) { //子级不是数组时,比较属性值
                if (objB[key] != objA[key]) {
                    flag = false;
                    break;
                }
            } else {
                if (!isArray(objB[key])) {
                    flag = false;
                    break;
                }
                let oA = objA[key], oB = objB[key];
                if (oA.length != oB.length) {
                    flag = false;
                    break;
                }
                for (let k in oA) {
                    if (!flag) //这里跳出循环是为了不让递归继续
                        break;
                    flag = CompareObj(oA[k], oB[k], flag);
                }
            }
        }
    }
    return flag;
}

function getFileSizeString(size, unit) {
    /*
        转换文件长度
        1DB = 1024NB；
        1NB = 1024BB，
        1BB = 1024YB；
        1YB = 1024ZB；
        1ZB = 1024EB；
        1EB = 1024PB；
        1PB = 1024TB；
        1TB = 1024GB；
        1GB = 1024MB；
        1MB = 1024KB；
        1KB = 1024B
        采用递归运算,形式参数为指针类型
    */
    if (size < 1024 || unit == "DB")
        return Math.round(size * 100) / 100  + unit;
    else {
        if (unit == " B") {
            unit = "KB";
        }
        else if (unit == "KB") {
            unit = "MB";
        }
        else if (unit == "MB") {
            unit = "GB";
        }
        else if (unit == "GB") {
            unit = "TB";
        }
        else if (unit == "TB") {
            unit = "PB";
        }
        else if (unit == "PB") {
            unit = "EB";
        }
        else if (unit == "EB") {
            unit = "ZB";
        }
        else if (unit == "ZB") {
            unit = "YB";
        }
        else if (unit == "YB") {
            unit = "BB";
        }
        else if (unit == "BB") {
            unit = "NB";
        }
        else {
            unit = "DB";
        }
        return getFileSizeString(size/1024, unit);
    }
}

function getTimesLength(timelength, unit) {
    if (unit == "毫秒") {
        if (timelength < 1000) {
            return {value: Math.floor(timelength * 100) / 100, unit: unit};
        } else {
            unit = "秒";
            return getTimesLength(timelength / 1000, unit);
        }
    }
    else if (unit == "秒") {
        if (timelength < 60) {
            return {value: Math.floor(timelength * 100) / 100, unit: unit};
        } else {
            unit = "分钟";
            return getTimesLength(timelength / 60, unit);
        }
    }
    else if (unit == "分钟") {
        if (timelength < 60) {
            return {value: Math.floor(timelength * 100) / 100, unit: unit};
        } else {
            unit = "小时";
            return getTimesLength(timelength / 60, unit);
        }
    }
    else if (unit == "小时") {
        if (timelength < 24) {
            return {value: Math.floor(timelength * 100) / 100, unit: unit};
        } else {
            unit = "天";
            return getTimesLength(timelength / 24, unit);
        }
    }
    else if (unit == "天") {
        return {value: Math.floor(timelength * 100) / 100, unit: unit};
    }
}

function getFileUrlByBase64(dataurl) {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    let blob = new Blob([u8arr], {type: mime});
    let url = URL.createObjectURL(blob);
    return url;
}

function requestFullScreen(element, style) {
    //全屏显示,
    if (document.fullscreen) {
        document.exitFullscreen();
    } else {
        element.requestFullscreen();
        __CONFIGS__.FULLSCREEN.element = element;
        if (element !== document.documentElement && element !== document.body) {
            if (typeof style !== "undefined") {
                for (let key in style) {
                    element.style[key] = style[key];
                }
                let mo = setInterval(function () {
                    if (!document.fullscreen) {
                        for (let key in style) {
                            element.style[key] = null;
                        }
                        clearInterval(mo);
                    }
                }, 500);
            }
        }
    }
}

function getEventIndex(index) {
    if (typeof index === "undefined")
        index = Math.floor(Math.random() * 1000);
    return new Date().format("yyyyMMddhhmmssS") + "-" + index;
}

function getAbsolutePosition(obj)
//获取控件绝对位置
{
    let position = {"left":0,"top":0,"width":0,"height":0};
    let w=0,h=0;
    position.width = obj.offsetWidth;
    position.height = obj.offsetHeight;
    while(obj.offsetParent)
    {
        w += obj.offsetLeft;
        h += obj.offsetTop;
        obj = obj.offsetParent;
    }
    position.left = w;
    position.top = h;
    return position;
}

function getUserConfig(key) {
    try {
        let storage = window.localStorage;
        if (storage.getItem(__CONFIGS__.STORAGE.CONFIGS) == null) {
            let th = {};
            storage.setItem(__CONFIGS__.STORAGE.CONFIGS, JSON.stringify(th));
        }
        let configs = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.CONFIGS));
        return configs[key];
    }catch (e) {
        __LOGS__.viewError("auto", e);
        return null;
    }
}

function setUserConfig(key,value) {
    try {
        let storage = window.localStorage;
        let configs = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.CONFIGS));
        configs[key] = value;
        storage.setItem(__CONFIGS__.STORAGE.CONFIGS, JSON.stringify(configs));
    } catch (e) {
        __LOGS__.viewError("auto", e);
    }
}

function getUserLogs() {
    try {
        let storage = window.localStorage;
        if (storage.getItem(__CONFIGS__.STORAGE.LOGS) == null) {
            let th = {};
            storage.setItem(__CONFIGS__.STORAGE.LOGS, JSON.stringify(th));
        }
        let configs = JSON.parse(storage.getItem(__CONFIGS__.STORAGE.LOGS));
        return configs;
    }catch (e) {
        __LOGS__.viewError("auto", e);
        return null;
    }
}

function setUserLogs(value) {
    try {
        let storage = window.localStorage;
        storage.setItem(__CONFIGS__.STORAGE.LOGS, JSON.stringify(value));
    } catch (e) {
        __LOGS__.viewError("auto", e);
    }
}

function getBrowserSize(){
    let winWidth = 0;
    let winHeight = 0;
    if (window.innerWidth) {
        winWidth = window.innerWidth;
    } else if ((document.body) && (document.body.clientWidth)) {
        winWidth = document.body.clientWidth;
    }

    if (window.innerHeight) {
        winHeight = window.innerHeight;
    } else if ((document.body) && (document.body.clientHeight)) {
        winHeight = document.body.clientHeight;
    }
    return {
        width: winWidth,
        height: winHeight
    };
};

function jsonParse(message) {
    try {
        //需要将所有Python数据集中的None转换为Null,如果JSON.parse转换失败,则采用eval转换,前提是定义None=null.
        message = message.substr(0, message.lastIndexOf("}") + 1);
        //因为最后一个'}'后可能有隐藏字符,强制抽取第一个'{'和最后一个'}'之间内容.
        let target = message;
        try {
            target = target.replaceAll("'", '"');
            //因JSON规范要求,强制替换字符串中所有单引号为双引号
            //需要检查WS服务中各交易数据格式...
            target = JSON.parse(target);
        } catch (e) {
            //如果JSON.parse失败,则采用eval转换.
            try {
                let None = null;
                //定义eval过程中针对 None的转换
                target = eval("(" + message + ")");
            } catch (e) {
                __LOGS__.viewError("auto", e);
                target = null;
            }
        }
        return target;
    }catch (e) {
        __LOGS__.viewError("auto", e);
        return null;
    }
}

//获取相关CSS属性
function getCss(element, key) {
    if (element)
        return element.currentStyle ? element.currentStyle[key] : document.defaultView.getComputedStyle(element, false)[key];
    else
        return null;
}

//用于处理对话框拖动
var dragControl = {
    configs: {
    },

    hook: function (control, target, id, callback) {
        control.onmousedown = function (event) {
            dragControl.configs[id] = {
                control: control,
                target: target,
                flag: true,
                left: getCss(target, "left"),
                top: getCss(target, "top"),
                currentX: 0,
                currentY: 0,
                callback: callback
            };
            target.style.zIndex = 99;
            if (!event) {
                event = window.event;
                //防止IE文字选中
                control.onselectstart = function () {
                    return false;
                }
            }
            dragControl.configs[id].currentX = event.clientX;
            dragControl.configs[id].currentY = event.clientY;
        };
        document.onmouseup = function () {
            for (let id in dragControl.configs) {
                if (dragControl.configs[id].flag) {
                    dragControl.configs[id].flag = false;
                    if (getCss(dragControl.configs[id].target, "left") !== "auto") {
                        dragControl.configs[id].left = getCss(dragControl.configs[id].target, "left");
                    }
                    if (getCss(dragControl.configs[id].target, "top") !== "auto") {
                        dragControl.configs[id].top = getCss(dragControl.configs[id].target, "top");
                    }
                }
            }
        };
        document.onmousemove = function (event) {
            let e = event ? event : window.event;
            for (let id in dragControl.configs) {
                if (dragControl.configs[id].flag) {
                    let nowX = e.clientX, nowY = e.clientY;
                    let disX = nowX - dragControl.configs[id].currentX;
                    let disY = nowY - dragControl.configs[id].currentY;
                    if (typeof dragControl.configs[id].callback == "function") {
                        dragControl.configs[id].callback(parseInt(dragControl.configs[id].left) + disX, parseInt(dragControl.configs[id].top) + disY);
                    }
                }
            }
        }
    }
};

//用于界面分区上下拖动
var splitControl = {
    configs: {
    },
    hook: function (control, target, id, callback) {
        control.onmousedown = function (event) {
            splitControl.configs[id] = {
                control: control,
                target: target,
                flag: true,
                height: getAbsolutePosition(target).height,
                currentY: 0,
                callback: callback,
            };
            if (!event) {
                event = window.event;
                control.onselectstart = function () {
                    return false;
                }
            }
            splitControl.configs[id].currentY = event.clientY;
        };

        document.documentElement.onmouseup = function (event) {
            for(let key in splitControl.configs) {
                if (splitControl.configs[key].flag) {
                    splitControl.configs[key].flag = false;
                    splitControl.configs.height = getAbsolutePosition(splitControl.configs[key].target).height;
                }
            }
        };

        document.documentElement.onmousemove = function (event) {
            let e = event ? event : window.event;
            for(let key in splitControl.configs) {
                if (splitControl.configs[key].flag) {
                    let nowY = e.clientY;
                    let disY = nowY - splitControl.configs[key].currentY;
                    if (typeof splitControl.configs[key].callback !== "undefined") {
                        splitControl.configs[key].callback(splitControl.configs[key].height + disY);
                    }
                }
            }
        }
    }
};

function getXmlFile(title, dataset, author) {
    let sheetNames = [];

    function removingRedundant(names, sheetName, index) {
        sheetName = sheetName.split("*").join("#").split("?").join("#").split("[").join("#").split("]").join("#").split("\\").join("#").split("\/").join("#");
        let x = (typeof index === "undefined" ? 0 : index);
        let name = (x == 0 ? sheetName : sheetName + "(" + x + ")");
        let exist = false;
        for (let i = 0; i < names.length; i++) {
            if (names[i].toUpperCase() == name.toUpperCase()) {
                exist = true;
                x++;
                break;
            }
        }
        if (exist) {
            return removingRedundant(names, sheetName, x);
        } else {
            names.push(name);
            return names
        }
    }

    function getBorders(doc, style) {
        let Borders = doc.createElement('Borders');
        for (let key in style) {
            let Border = doc.createElement('Border');
            Borders.appendChild(Border);
            Border.setAttribute('ss:Position', key);
            Border.setAttribute('ss:Weight', style[key].Weight);
            Border.setAttribute('ss:LineStyle', style[key].LineStyle);
            Border.setAttribute('ss:Color', style[key].Color);
        }
        return Borders;
    }

    let domparser = new DOMParser();
    let root = "<?xml version='1.0'?><?mso-application progid='Excel.Sheet'?><Workbook></Workbook>";
    let xmldoc = domparser.parseFromString(root, 'text/xml');
    let workbook = xmldoc.documentElement;
    workbook.setAttribute('xmlns', 'urn:schemas-microsoft-com:office:spreadsheet');
    workbook.setAttribute('xmlns:o', 'urn:schemas-microsoft-com:office:office');
    workbook.setAttribute('xmlns:x', 'urn:schemas-microsoft-com:office:excel');
    workbook.setAttribute('xmlns:ss', 'urn:schemas-microsoft-com:office:spreadsheet');
    workbook.setAttribute('xmlns:html', 'http://www.w3.org/TR/REC-html40');

    //文档属性定义

    let DocumentProperties = xmldoc.createElement('DocumentProperties');
    workbook.appendChild(DocumentProperties);
    DocumentProperties.setAttribute('xmlns', 'urn:schemas-microsoft-com:office:office');

    let Author = xmldoc.createElement('Author');
    DocumentProperties.appendChild(Author);
    Author.appendChild(xmldoc.createTextNode(author));

    let LastAuthor = xmldoc.createElement('LastAuthor');
    DocumentProperties.appendChild(LastAuthor);
    LastAuthor.appendChild(xmldoc.createTextNode(author));

    let Created = xmldoc.createElement('Created');
    DocumentProperties.appendChild(Created);
    Created.appendChild(xmldoc.createTextNode(new Date()));

    let Version = xmldoc.createElement('Version');
    DocumentProperties.appendChild(Version);
    Version.appendChild(xmldoc.createTextNode('1.0.0'));

    //文档格式定义
    //通用格式
    let Styles = xmldoc.createElement('Styles');
    workbook.appendChild(Styles);
    let Style = xmldoc.createElement('Style');
    Styles.appendChild(Style);
    Style.setAttribute('ss:ID', 'Default');
    Style.setAttribute('ss:Name', 'Normal');

    let Alignment = xmldoc.createElement('Alignment');
    Style.appendChild(Alignment);
    Alignment.setAttribute('ss:Vertical', 'Center');

    let Font = xmldoc.createElement('Font');
    Style.appendChild(Font);
    Font.setAttribute('ss:FontName', '宋体');
    Font.setAttribute('x:CharSet', '134');
    Font.setAttribute('ss:Size', '11');
    Font.setAttribute('ss:Color', '#000000');

    let Interior = xmldoc.createElement('Interior');
    Style.appendChild(Interior);

    let Protection = xmldoc.createElement('Protection');
    Style.appendChild(Protection);

    let NumberFormat = xmldoc.createElement('NumberFormat');
    Style.appendChild(NumberFormat);
    NumberFormat.setAttribute('ss:Format', '#,##0.00_ ');

    //数据格式-coloumn
    Style = xmldoc.createElement('Style');
    Styles.appendChild(Style);
    Style.setAttribute('ss:ID', 'columns');

    let style = {
        Top: {Weight: '1', LineStyle: 'Continuous', Color: '#D99795'},
        Bottom: {Weight: '3', LineStyle: 'Continuous', Color: '#D99795'},
        Left: {Weight: '1', LineStyle: 'Continuous', Color: '#D99795'},
        Right: {Weight: '1', LineStyle: 'Continuous', Color: '#D99795'}
    };
    Style.appendChild(getBorders(xmldoc, style));

    Alignment = xmldoc.createElement('Alignment');
    Style.appendChild(Alignment);
    Alignment.setAttribute('ss:Vertical', 'Center');
    Alignment.setAttribute('ss:Horizontal', 'Center');

    Font = xmldoc.createElement('Font');
    Style.appendChild(Font);
    Font.setAttribute('ss:Size', '12');
    Font.setAttribute('ss:Bold', '1');
    Font.setAttribute('ss:Color', '#FDE9D9');

    Interior = xmldoc.createElement('Interior');
    Style.appendChild(Interior);
    Interior.setAttribute('ss:Color', '#31849B');
    Interior.setAttribute('ss:Pattern', 'Solid');

    //数据格式-data
    Style = xmldoc.createElement('Style');
    Styles.appendChild(Style);
    Style.setAttribute('ss:ID', 'data');
    style = {
        Top: {Weight: '1', LineStyle: 'Continuous', Color: '#D99795'},
        Bottom: {Weight: '1', LineStyle: 'Continuous', Color: '#D99795'},
        Left: {Weight: '1', LineStyle: 'Continuous', Color: '#D99795'},
        Right: {Weight: '1', LineStyle: 'Continuous', Color: '#D99795'}
    };
    Style.appendChild(getBorders(xmldoc, style));

    //数据格式-data-alt
    Style = xmldoc.createElement('Style');
    Styles.appendChild(Style);
    Style.setAttribute('ss:ID', 'data-alt');
    Style.appendChild(getBorders(xmldoc, style));

    Interior = xmldoc.createElement('Interior');
    Style.appendChild(Interior);
    Interior.setAttribute('ss:Color', '#B6DDE8');
    Interior.setAttribute('ss:Pattern', 'Solid');

    //数据
    for (let d = 0; d < dataset.length; d++) {
        let sheet = dataset[d];
        sheetNames = removingRedundant(sheetNames, sheet.title[sheet.title.length - 1]);
        let Worksheet = xmldoc.createElement('Worksheet');
        workbook.appendChild(Worksheet);
        Worksheet.setAttribute('ss:Name', sheetNames[d]);

        let Table = xmldoc.createElement('Table');
        Worksheet.appendChild(Table);
        Table.setAttribute('ss:ExpandedColumnCount', sheet.columns.length);
        Table.setAttribute('ss:ExpandedRowCount', sheet.data.length + 1);
        Table.setAttribute('x:FullColumns', '1');
        Table.setAttribute('x:FullRows', '1');
        Table.setAttribute('ss:DefaultColumnWidth', '108');
        Table.setAttribute('ss:DefaultRowHeight', '18');

        let Row = xmldoc.createElement('Row');
        Table.appendChild(Row);
        for (let i = 0; i < sheet.columns.length; i++) {
            let Cell = xmldoc.createElement('Cell');
            Cell.setAttribute('ss:StyleID', 'columns');
            Row.appendChild(Cell);
            let Data = xmldoc.createElement('Data');
            Cell.appendChild(Data);
            Data.setAttribute('ss:Type', 'String');
            Data.appendChild(xmldoc.createTextNode(sheet.columns[i].name));
        }
        for (let i = 0; i < sheet.data.length; i++) {
            let row = sheet.data[i];
            Row = xmldoc.createElement('Row');
            Table.appendChild(Row);
            for (let c = 0; c < sheet.columns.length; c++) {
                let cell = row[sheet.columns[c].name];
                let Cell = xmldoc.createElement('Cell');
                if (i % 2 == 0)
                    Cell.setAttribute('ss:StyleID', 'data');
                else
                    Cell.setAttribute('ss:StyleID', 'data-alt');
                Row.appendChild(Cell);
                let Data = xmldoc.createElement('Data');
                Cell.appendChild(Data);
                Data.setAttribute('ss:Type', (cell.type == 'number' ? 'Number' : 'String'));
                Data.appendChild(xmldoc.createTextNode((cell.type == 'number' ? cell.value : (typeof cell.value !== 'undefined' ? cell.value : ''))));
            }
        }
    }
    let blob = new Blob([str2ab((new XMLSerializer()).serializeToString(xmldoc))], {type: 'text/xml'});
    openDownloadDialog(blob, title + '.report.xml');
}

function getSQLParameters(sql, history) {
    let reg = new RegExp(/\{[\[\]\s\:\,\-\"\'a-zA-Z0-9\u4e00-\u9fa5\(\)]+\}/, "g");
    let content = sql.match(reg);
    let style = {};
    if (content != null) {
        for (let i = 0; i < content.length; i++) {
            let param = content[i].replaceAll("'", '"');
            try {
                param = JSON.parse(param);
                let key;
                for (let k in param) {
                    key = k;
                    break;
                }
                style[key] = {
                    value: typeof param[key] !== "object" ? param[key] : param[key][0],
                    type: typeof param[key] === "object" ? "select" : "input",
                    options: typeof param[key] === "object" ? param[key] : null,
                };
            } catch (e) {
                console.log({"参数": param, "错误": e});
            }
        }
    }
    reg = new RegExp(/\{[\s\-a-zA-Z0-9\u4e00-\u9fa5\(\)]+\}/, "g");
    content = sql.match(reg);
    let parameter = null;
    if (content != null) {
        parameter = {};
        for (let i = 0; i < content.length; i++) {
            let key = content[i].substring(content[i].indexOf("{") + 1, content[i].indexOf("}"));
            parameter[key] = {
                value: typeof history[key] !== "undefined" ? history[key] : (typeof style[key] !== "undefined" ? style[key].value : ""),
                type: typeof style[key] !== "undefined" ? style[key].type : "input",
                options: typeof style[key] !== "undefined" ? style[key].options : null,
            };
        }
    }
    return parameter;
}


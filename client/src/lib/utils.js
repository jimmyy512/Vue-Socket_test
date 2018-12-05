import { totalmem } from "os";

/**
 * 存储localStorage
 */
const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 傳入字串，回傳正負號相反的字串
 */
const oppositeSign=str=>{
    return str.indexOf("-") !== -1 ? str.split("-").join("+") : str.split("+").join("-");
}

const buildQueryString=params=>{
    let esc = encodeURIComponent;
    let query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    return query;
}

const isMobile=()=>{
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
}

const factorial=num=>
{
    if (num < 0) {
        return -1;
    }
    else if (num == 0) {
        return 1;
    }
    else {
        return (num * factorial(num - 1));
    }
}

// C6取3=6！/（6-3）！*3！
// =6！/3！*3！=20
const combin=(C,get)=>
{
    let res=factorial(C)/(factorial(C-get)*factorial(get));
    if(res<0)
        res=0;
    return res;
}

//給予一個整數,產生一個由小到大的陣列
//ex: num=5  return:[0,1,2,3,4]
const ascArray=(num)=>{
    let array=[];
    for(let i=num;i>0;i--)
        array.unshift(i-1)
    return array;
}

//傳入一組陣列 和取出數量,回傳元素不重覆陣列
const noRepeatRandArray=(array,randNum)=>
{
    let resArray=[];
    for (let i = 0; i < randNum; i++) {
        let ran = Math.floor(Math.random() * array.length);
        resArray.push(array.splice(ran, 1)[0]);
    };
    return resArray;
}

//计算数组中某值的出现次数
const countArrayElementRepeat = (arr, value) => 
arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);

//累加陣列內所有數字
const arraySumElementNum=(arr)=>{
    return arr.reduce((total,num)=>{
        return total+num;
    })
}

//產生亂數ID
const makeId=()=> {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

  
export default{
    getStore,
    setStore,
    oppositeSign,
    buildQueryString,
    factorial,
    combin,
    ascArray,
    noRepeatRandArray,
    countArrayElementRepeat,
    arraySumElementNum,
    isMobile,
    makeId,
}
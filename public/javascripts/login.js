//用于存储图片顺序  
const imgArray = ['1', '2', '3', '4', '5'];

//获取箭头  
const leftArrow = document.getElementsByClassName('left-arrow')[0];
const rightArrow = document.getElementsByClassName('right-arrow')[0];

//获取用户名  
const userName = document.getElementsByClassName('user-name')[0];

//获取登录按钮  
const loginButton = document.getElementsByClassName('login-button')[0];

// 获取错误信息栏  
const errorMessage = document.getElementsByClassName('error-message')[0];

// 添加左箭头监听事件  
leftArrow.addEventListener('click', function () {
    imgArray.unshift(imgArray[imgArray.length - 1]); //把最后的元素放在第一位  
    imgArray.pop();
    carouselImg();

});

// 添加右箭头监听事件  
rightArrow.addEventListener('click', function () {
    imgArray.push(imgArray[0]); //把第一个元素放在最后  
    imgArray.shift();
    carouselImg();

});

// 切换图片  
function carouselImg() {
    for (let count = 0; count < imgArray.length; count++) {
        document.getElementsByTagName('img')[count].src = 'images/' + imgArray[count] + '.png';
        document.getElementsByTagName('img')[count].alt = imgArray[count] + '.png';
    };
};

// 添加登录按钮监听事件  
loginButton.addEventListener('click', function () {
    if (userName.value === '') {
        errorMessage.innerHTML = 'Please Type You Name';
        errorMessage.style.visibility = 'visible';
    } else if (userName.value.length > 8) {
        errorMessage.innerHTML = 'Your Name Cannot Over 8 Words';
        errorMessage.style.visibility = 'visible';
    } else {
        window.location.href =
            encodeURI('index?selectpicture=' + document.getElementsByClassName('p3')[0].alt +
                '&username=' + userName.value);
    }
});

// Enter按键绑定登录事件  
document.onkeydown = function (event) {
    let e = event || window.event;
    if (e && e.keyCode == 13) {
        loginButton.click();
    }
};
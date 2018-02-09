// 获取url里面的内容  
const url = decodeURI(location.href).split('?')[1].split('&');

// 获取聊天内容框  
const chatContent = document.getElementsByClassName('chat-content')[0];

// 获取聊天输入框  
const editBox = document.getElementsByClassName('edit-box')[0];

// 获取聊天输入框发送按钮  
const editButton = document.getElementsByClassName('edit-button')[0];

// 获取用户名栏  
const userName = document.getElementsByClassName('user-name')[0];

// 获取在线人数栏  
const onlineCount = document.getElementsByClassName('online-count')[0];

// 把登录页面的名称放在右侧  
userName.innerHTML = url[1].split('=')[1];
const userImg = document.getElementsByClassName('user-img')[0];

// 把登录页面的头像放在右侧  
userImg.src = 'images/' + url[0].split('=')[1];
const logOut = document.getElementsByClassName('log-out')[0];

// 发送按钮绑定点击事件  
editButton.addEventListener('click', sendMessage);

// 登出按钮绑定点击事件  
logOut.addEventListener('click', closePage);

// 绑定Enter键和发送事件  
document.onkeydown = function (event) {
    let e = event || window.event;
    if (e && e.keyCode === 13) {
        if (editBox.value !== '') {
            editButton.click();
        }
    }
};

// 关闭页面  
function closePage() {
    let userAgent = navigator.userAgent;
    if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) {
        window.location.href = "about:blank";
    } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
    }
}
// socket部分  
const socket = io();

// 当接收到消息并且不是本机时生成聊天气泡  
socket.on('message', function (information) {
    if (information.name !== userName.textContent) {
        createOtherMessage(information);
    }
});

// 当接收到有人连接进来
socket.on('connected', function (onlinecount) {
    console.log(onlinecount);
    onlineCount.innerHTML = 'Online:' + onlinecount;
});

// 当接收到有人断开后
socket.on('disconnected', function (onlinecount) {
    console.log(onlinecount);
    onlineCount.innerHTML = 'Online:' + onlinecount;
});

// 发送本机的消息
function sendMessage() {
    if (editBox.value != '') {
        let myInformation = {
            name: userName.textContent,
            chatContent: editBox.value,
            img: userImg.src
        };
        socket.emit('message', myInformation);
        createMyMessage();
        editBox.value = '';
    }
};

// 生成本机的聊天气泡
function createMyMessage() {
    let myMessageBox = document.createElement('div');
    myMessageBox.className = 'my-message-box';

    let messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    let text = document.createElement('span');
    text.innerHTML = editBox.value;
    messageContent.appendChild(text);
    myMessageBox.appendChild(messageContent);

    let arrow = document.createElement('div')
    arrow.className = 'message-arrow';
    myMessageBox.appendChild(arrow);

    let userInformation = document.createElement('div');
    userInformation.className = 'user-information';
    let userChatImg = document.createElement('img');
    userChatImg.className = 'user-chat-img';
    userChatImg.src = userImg.src;
    let userChatName = document.createElement('div');
    userChatName.className = 'user-chat-name';
    userChatName.innerHTML = userName.textContent;
    userInformation.appendChild(userChatImg);
    userInformation.appendChild(userChatName);
    myMessageBox.appendChild(userInformation);

    chatContent.appendChild(myMessageBox);

    chatContent.scrollTop = chatContent.scrollHeight;
}

// 生成其他用户的聊天气泡  
function createOtherMessage(information) {
    let otherMessageBox = document.createElement('div');
    otherMessageBox.className = 'other-message-box';

    let otherUserInformation = document.createElement('div');
    otherUserInformation.className = 'other-user-information';
    let userChatImg = document.createElement('img');
    userChatImg.className = 'user-chat-img';
    userChatImg.src = information.img;
    let userChatName = document.createElement('span');
    userChatName.className = 'user-chat-name';
    userChatName.innerHTML = information.name;
    otherUserInformation.appendChild(userChatImg);
    otherUserInformation.appendChild(userChatName);
    otherMessageBox.appendChild(otherUserInformation);

    let otherMessageArrow = document.createElement('div');
    otherMessageArrow.className = 'other-message-arrow';
    otherMessageBox.appendChild(otherMessageArrow);

    let otherMessageContent = document.createElement('div');
    otherMessageContent.className = 'other-message-content';
    let text = document.createElement('span');
    text.innerHTML = information.chatContent;
    otherMessageContent.appendChild(text);
    otherMessageBox.appendChild(otherMessageContent);

    chatContent.appendChild(otherMessageBox);

    chatContent.scrollTop = chatContent.scrollHeight;
} 
import { DialogItem, type DialogItemProps } from "./item";

const dialogs: DialogItemProps[] = [
  {
    user: {
      id: 1,
      isOnline: true,
      name: 'Федор Михайлович Достоевский',
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Fyodor_Mikhailovich_Dostoyevsky_1876.jpg/274px-Fyodor_Mikhailovich_Dostoyevsky_1876.jpg'
    },
    message: {
      isRead: false,
      senderId: 1,
      text: 'Мы все свидетельствуем Вам глубочайшее наше почтение и целуем Ваши ручки, дражайший папенька',
      time: new Date().toISOString()
    },
    notReadMessages: 121222
  }, 
  {
    user: {
      id: 1,
      isOnline: true,
      name: 'Федор Михайлович Достоевский',
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Fyodor_Mikhailovich_Dostoyevsky_1876.jpg/274px-Fyodor_Mikhailovich_Dostoyevsky_1876.jpg'
    },
    message: {
      isRead: true,
      senderId: 0,
      text: 'Мы все свидетельствуем Вам глубочайшее наше почтение и целуем Ваши ручки, дражайший папенька',
      time: new Date().toISOString()
    },
    notReadMessages: 0
  },
  
  {
    user: {
      id: 1,
      isOnline: false,
      name: 'Федор Михайлович Достоевский',
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Fyodor_Mikhailovich_Dostoyevsky_1876.jpg/274px-Fyodor_Mikhailovich_Dostoyevsky_1876.jpg'
    },
    message: {
      isRead: true,
      senderId: 1,
      text: 'Мы все свидетельствуем Вам глубочайшее наше почтение и целуем Ваши ручки, дражайший папенька',
      time: new Date().toISOString()
    },
    notReadMessages: 0
  }, {
    user: {
      id: 1,
      isOnline: false,
      name: 'Федор Михайлович Достоевский',
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Fyodor_Mikhailovich_Dostoyevsky_1876.jpg/274px-Fyodor_Mikhailovich_Dostoyevsky_1876.jpg'
    },
    message: {
      isRead: false,
      senderId: 2,
      text: 'Мы все свидетельствуем Вам глубочайшее наше почтение и целуем Ваши ручки, дражайший папенька',
      time: new Date().toISOString()
    },
    notReadMessages: 0
  }
];

export const DialogsList = () => {
  return <div>{dialogs.map((a, idx) => (<DialogItem key={idx} {...a} />))}</div>;
};

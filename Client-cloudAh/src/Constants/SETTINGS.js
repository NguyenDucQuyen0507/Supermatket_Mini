export const socketConfig = {
  secure: true,
  reconnection: true, //tự connect
  reconnectionDelay: 5000, //giây sau 5s nó tự động kết nối lại
  reconnectionAttempts: 20, //làm lại 20 lần, nếu 20 lần không được thì báo lỗi
  // transports: ['polling'],
};



export class userService {

  userAccount(){
    const userDataLocalStorage = localStorage.getItem('userInfo');
    let userInfo

    if (userDataLocalStorage != null) {
        userInfo = JSON.parse(userDataLocalStorage);
    } else {
      const userDataSessionStorage = sessionStorage.getItem('userInfo');

      if (userDataSessionStorage != null) {
          userInfo = JSON.parse(userDataSessionStorage);
      } else {
          userInfo = {};
      }
    }
    return userInfo
  }

}


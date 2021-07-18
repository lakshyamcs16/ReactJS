interface IUser {
    username: string | null;
}

class User {
    constructor(private username: string | null) {

    }

    getUserDetails(): IUser {
        return {
            username: this.username || window.localStorage.getItem('sessionId')
        };
    }

    setUserDetails(username: string) {
        this.username = username;
    }
}

class Authenticator {
    user: User = new User(null);;

    constructor(public authenticated: boolean) {
    }

    login(username: string, password: string, cb: Function) {
        if(username === 'foo' && password === 'bar') {
            this.authenticated = true;
            this.user.setUserDetails(username);
            window.localStorage.setItem('sessionId', username);
            cb();
        }else{
            window.alert('Incorrect Credentials');
        }
    }

    logout(cb: Function) {
        this.authenticated = false;
        window.localStorage.removeItem('sessionId');
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }

    getUser(): User {
        return this.user;
    }
}


export default new Authenticator(window.localStorage.getItem('sessionId')? true: false);
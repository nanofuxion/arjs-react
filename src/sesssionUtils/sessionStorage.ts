let sessType: string = "session"

const MySessionStorage: {
    getItem: (key: string) => string | null;
    setItem: (key: string, object: any) => void;
} = {
    getItem: (key: string) => {
        if (typeof window !== 'undefined') {
            // @ts-ignore
            let value: string | null = null;
            if (window.localStorage.getItem(key) != null) {
                value = window.localStorage.getItem(key)
            } else {
                value = window.sessionStorage.getItem(key)
            }
            return value;
        }
        return null;
    },
    setItem: (key: string, object: any) => {
        if (typeof window !== 'undefined')
            (sessType != "session") ?
                window.localStorage.setItem(key, object) :
                window.sessionStorage.setItem(key, object)
    },
},
    session: {
        getSession: (sessItem: string) => any;
        setSession: (sessItem: string, sess: any) => void;
        storageType: (setType: any) => void;
        delSession: (key: string) => void;
    } = {
        getSession: (sessItem: string) => {
            if (MySessionStorage.getItem(sessItem) != null) {
                let value = MySessionStorage.getItem(sessItem)
                return (typeof value == "string") ?
                    value :
                    // @ts-ignore
                    JSON.parse(value);
            } else return null;
        },
        setSession: (sessItem: string, sess: any) => {
            MySessionStorage.setItem(sessItem, sess);
        },
        storageType: (setType) => {
            sessType = setType;
        },
        delSession: (key: string) => {
            if(window.localStorage.getItem(key) != null){
                window.localStorage.removeItem(key)
            }

            if(window.sessionStorage.getItem(key) != null){
                window.sessionStorage.removeItem(key)
            }
    },
    };

export { session }
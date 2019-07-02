import * as KeyChain from 'react-native-keychain'

export default class NewE3ApiClient {

    static readonly API_URL = "https://e3new.nctu.edu.tw/webservice/rest/server.php?moodlewsrestformat=json"

    private post(data: object) {

    }

    async login(userId: string, password: string) {
        if (!userId || !password) throw new Error("Empty input")

        let formData = new FormData();
        formData.append('username', userId)
        formData.append('password', password)
        formData.append('service', 'moodle_mobile_app')

        return fetch('https://e3new.nctu.edu.tw/login/token.php', {
            method: 'POST',
            headers: {},
            body: formData,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if ('token' in responseJson) { // successful login
                KeyChain.setInternetCredentials("newE3", userId, responseJson.token)
            }
            else {
                throw new Error("Login failed")
            }
        }).catch((error) => {
            throw error
        })
    }
}


export default class FetchData {

    startUrl = 'https://api.spacexdata.com/v4'

    getResource = async url => {
        try {
            const res = await fetch(url)
            return await res.json()
        } catch (e) {
            console.error(e)
        }
    }

    getRocket = async () =>
        await this.getResource(this.startUrl + '/rockets')

    getLaunches = async () =>
        await this.getResource(this.startUrl + '/launches/past')

    getCompany = async () =>
        await this.getResource(this.startUrl + '/company')

}
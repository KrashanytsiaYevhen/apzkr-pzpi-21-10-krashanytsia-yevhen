import {makeAutoObservable} from "mobx";

export default class GuitarStore {
    constructor() {
        this._guitar = []
        this._totalCount = 0
        this._page = 1
        this._limit = 3
        makeAutoObservable(this)
    }

    setGuitar(guitar) {
        this._guitar = guitar
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    get guitars() {
        return this._guitar
    }

    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}
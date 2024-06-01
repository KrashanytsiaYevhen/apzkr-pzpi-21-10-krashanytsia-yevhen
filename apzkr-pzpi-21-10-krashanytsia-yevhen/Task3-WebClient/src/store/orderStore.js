import {makeAutoObservable} from "mobx";

export default class OrderStore {
    constructor() {
        this._order = []
        this._totalCount = 0
        this._page = 1
        this._limit = 3
        makeAutoObservable(this)
    }

    setOrder(order) {
        this._guitar = order
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    get orders() {
        return this._order
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
import {makeAutoObservable} from "mobx";

export default class SummaryStore {
    constructor() {
        this._summary = []
        this._totalCount = 0
        this._speciality = [
            {id: 1, speciality: "Програміст"},
            {id: 2, speciality: "Дизайн"},
            {id: 3, speciality: "DevOps"},
            {id: 4, speciality: "Фронт-энд"},
            {id: 5, speciality: "Бєк-єнд"},
        ]
        this._saveSummary =[]
        this._page = 1
        this._limit = 3
        this._selectedSpec = {}
        makeAutoObservable(this)
    }

    setSummary(summary) {
        this._summary = summary
    }
    setPage(page) {
        this._page = page
    }
    setSpeciality(speciality) {
        this._speciality = speciality
    }
    setSelectedSpeciality(speciality) {
        this._selectedSpec = speciality
    }

    setTotalCount(count) {
        this._totalCount = count
    }
    setSaveSummary(saveSummary) {
        this._saveSummary = saveSummary
    }
    get summarys() {
        return this._summary
    }
    get saveSummarys() {
        return this._saveSummary
    }
    get specialitys() {
        return this._speciality
    }

    get selectedSpec() {
        return this._selectedSpec
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
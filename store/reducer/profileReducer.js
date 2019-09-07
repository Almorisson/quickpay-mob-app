const initState = {
    photo: [],
    email: [],
    firstName: [],
    lastName: [],
    address: [],
    city: [],
    nameSociety: [],
    phoneNumber: [],
    postalCode: [],
    country: [],
    codeCountry: [],
    siretNumber: [],
    iban: []
}

const profileReducer = (state = initState, action) => {
    console.log("action : ", action.data);
    let nextState
    switch (action.type) {
        case "ADD_PHOTO":
            nextState = { ...state, photo: [...state.photo, action.data] }
            return nextState || state
        case "GET_PHOTO":
            return { ...state, photo: [...state.photo, action.data] }
        case "UPDATE_TRADER_PROFILE":
            nextState = {
                ...state,
                email: [...state.email, action.data.value.email],
                firstName: [...state.firstName, action.data.value.firstName],
                lastName: [...state.lastName, action.data.value.lastName],
                address: [...state.address, action.data.value.address],
                city: [...state.city, action.data.value.city],
                nameSociety: [...state.nameSociety, action.data.value.nameSociety],
                phoneNumber: [...state.phoneNumber, action.data.value.phoneNumber],
                postalCode: [...state.postalCode, action.data.value.postalCode],
                country: [...state.country, action.data.value.country],
                codeCountry: [...state.codeCountry, action.data.value.codeCountry],
                siretNumber: [...state.siretNumber, action.data.value.siretNumber],
                iban: [...state.iban, action.data.value.iban]
            }
            return nextState || state
        case "UPDATE_CUSTOMER_PROFILE":
            nextState = {
                ...state,
                email: [...state.email, action.data.value.email],
                firstName: [...state.firstName, action.data.value.firstName],
                lastName: [...state.lastName, action.data.value.lastName],
                phoneNumber: [...state.phoneNumber, action.data.value.phoneNumber],
                postalCode: [...state.postalCode, action.data.value.postalCode],
                address: [...state.address, action.data.value.address],
                city: [...state.city, action.data.value.city],
                country: [...state.country, action.data.value.country],
                codeCountry: [...state.codeCountry, action.data.value.codeCountry]
            }
            return nextState || state
        default:
            return state;
    }
}

export default profileReducer;
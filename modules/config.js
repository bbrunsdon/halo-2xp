// Initial data to send to the API
export const entryData = {
    "contactDetails": {
        "forename": "Master Chief",
        "email": null,
        "addressCountry": "GB",
        "addressPostcode": "MC11 7GG",
        "phoneNumber": "+447900000117"
    },
    "verificationCode": null,
    "recaptchaToken": null,
    "acceptTerms": true,
    "answers": [
        { "questionGuid": "c24798c7-b5b3-11ec-aba4-befa4c95df14", "answerGuid": "9bee3b81-b5bc-11ec-aba4-befa4c95df14" },
        { "questionGuid": "01251ab8-c08d-11ec-97c3-2ea081ad199a", "answerGuid": "474d76c8-c48a-11ec-97c3-2ea081ad199a" }
    ]
};

// Session storage key to retrieve entry GUID value from
export const entryGuidKey = "instantWinEntryGuid_407dd5bb-c08d-11ec-97c3-2ea081ad199a_primary";
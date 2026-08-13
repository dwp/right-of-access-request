//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

//Route for Have you changed your name?
router.post('/changed-your-name', function(request, response) {

    var knownAnotherName = request.session.data['changed-name']
    if (knownAnotherName == "yes"){
        response.redirect("/user-details/previous-name")
    } else {
        response.redirect("/user-details/dob")
    }
})

//Route for Do you live in UK?
router.post('/do-you-live-in-uk', function(request, response) {

    var liveInUk = request.session.data['live-in-uk']
    if (liveInUk == "yes"){
        response.redirect("/user-details/find-uk-address")
    } else {
        response.redirect("/user-details/address-abroad")
    }
})

//Route for Have you lived at another address in the last 5 years?
router.post('/lived-another-address', function(request, response) {

    var liveInUk = request.session.data['lived-another-address']
    if (liveInUk == "yes"){
        response.redirect("/user-details/is-the-address-in-the-uk")
    } else {
        response.redirect("/user-details/do-you-have-a-ni-number")
    }
})

//Route for Is the address in the UK?
router.post('/is-address-in-uk', function(request, response) {

    var liveInUk = request.session.data['live-in-uk']
    if (liveInUk == "yes"){
        response.redirect("/user-details/previous-find-uk-address")
    } else {
        response.redirect("/user-details/previous-address-abroad")
    }
})

//Route for Do you have a NI number?
router.post('/do-you-have-ni-number', function(request, response) {

    var liveInUk = request.session.data['do-you-have-ni-number']
    if (liveInUk == "yes"){
        response.redirect("/user-details/national-insurance-number")
    } else {
        response.redirect("/specificity/what-personal-information-do-you-need")
    }
})

//Specificity
//Route for What personal information do you need?
router.post('/what-personal-information-you-need', function(request, response) {

    var personalInformation = request.session.data['personalInformationYouNeed']
    if (personalInformation == "cctv-or-body-worn-camera-footage"){
        response.redirect("/specificity/cctv-or-body-worn-camera-footage/which-dwp-building-was-the-footage-recorded")
    } else {
        response.redirect("/specificity/benefits-or-services/which-benefits-or-services-is-your-request-related-to")
    }
})

//Specificity
//Route for Which benefit or service is your request about?
router.post('/benefits-or-services-list', function(request, response) {

    var benefitList = request.session.data['benefitsOrServicesList']
    if (benefitList == "universalCredit"){
        response.redirect("/specificity/benefits-or-services/one-or-two-benefits/types-of-information-uc")
    } else {
        response.redirect("/specificity/benefits-or-services/one-or-two-benefits/types-of-information-pip")
    }
})

//Route for How many calls is this request about?
router.post('/how-many-calls', function(request, response) {

    var numberOfCalls = request.session.data['numberOfCalls']
    if (numberOfCalls == "one"){
        response.redirect("/specificity/benefits-or-services/one-or-two-benefits/call-recordings/one/what-phone-number-did-you-use-for-the-call")
    } else {
        response.redirect("/specificity/benefits-or-services/one-or-two-benefits/call-recordings/two-or-more/did-you-use-different-phone-numbers-for-the-calls")
    }
})

//Route for contact preferences?
router.post('/contact-preferences', function(request, response) {

    var contactPreferences = request.session.data['contact-preferences']
    if (contactPreferences == "signingOrlipspeaking"){
        response.redirect("/specificity/benefits-or-services/spoken-communication-preferences/what-signing-or-lipspeaking-service-do-you-need")
    } else {
        response.redirect("/specificity/benefits-or-services/spoken-communication-preferences/do-you-need-any-other-help-when-we-contact-you")
    }
})

//Route for do you need any other help when we contact you?
router.post('/other-help-when-we-contact-you', function(request, response) {

    var contactPreferences = request.session.data['otherHelp']
    if (contactPreferences == "yes"){
        response.redirect("/specificity/benefits-or-services/spoken-communication-preferences/what-other-help-do-you-need-when-we-contact-you")
    } else {
        response.redirect("/user-details/wip")
    }
})

//Route for How many calls is this request about?
router.post('/how-many-calls', function(request, response) {

    var numberOfCalls = request.session.data['numberOfCalls']
    if (numberOfCalls == "one"){
        response.redirect("/specificity/benefits-or-services/one-or-two-benefits/call-recordings/one/what-phone-number-did-you-use-for-the-call")
    } else {
        response.redirect("/specificity/benefits-or-services/one-or-two-benefits/call-recordings/two-or-more/did-you-use-different-phone-numbers-for-the-calls")
    }
})

//Route for What phone number did you use for the calls?
router.post('/continue-or-add-phone-number', function (req, res) {

    const phoneNumber = req.session.data.phoneNumber

    if (!req.session.data.phoneNumbers) {
        req.session.data.phoneNumbers = []
    }

    // Prevent duplicates
    if (
        phoneNumber &&
        req.session.data.phoneNumbers[
            req.session.data.phoneNumbers.length - 1
        ] !== phoneNumber
    ) {
        req.session.data.phoneNumbers.push(phoneNumber)
    }

    if (req.session.data.oneOrMorePhoneNumber === 'one') {
        res.redirect('/specificity/benefits-or-services/one-or-two-benefits/call-recordings/two-or-more/give-a-detailed-description-of-the-call')
    } else {
        res.redirect('/specificity/benefits-or-services/one-or-two-benefits/call-recordings/two-or-more/add-another-phone-number')
    }
})

//Route for Do you want to add another phone number
router.post('/more-phone-numbers', function(request, response) {

    var morePhoneNumber = request.session.data['morePhoneNumbers']
    if (morePhoneNumber == "yes"){
        response.redirect("/specificity/benefits-or-services/one-or-two-benefits/call-recordings/two-or-more/what-phone-number-did-you-use-for-the-call")
    } else {
        response.redirect("/specificity/benefits-or-services/one-or-two-benefits/call-recordings/two-or-more/tell-us-more-about-the-calls")
    }
})

router.post('/remove-phone-number', function (req, res) {

    const index = Number(req.session.data.index)

    if (req.session.data.removePhoneNumber === 'yes') {
        req.session.data.phoneNumbers.splice(index, 1)
    }

    // If no phone numbers remain
    if (
        !req.session.data.phoneNumbers ||
        req.session.data.phoneNumbers.length === 0
    ) {
        return res.redirect('/specificity/benefits-or-services/one-or-two-benefits/call-recordings/two-or-more/what-phone-number-did-you-use-for-the-call')
    }

    // Otherwise go back to the list
    res.redirect('/specificity/benefits-or-services/one-or-two-benefits/call-recordings/two-or-more/add-another-phone-number')

})

//Route for Name a DWP payment you are currently receiving
router.post('/name-a-dwp-payment', function(request, response) {

    var benefitNameForPayment = request.session.data['benefit-name']
    if (benefitNameForPayment == "not-receiving-payment"){
        response.redirect("/application-complete")
    } else {
        response.redirect("/cyi/what-is-the-weekly-or-monthly-amount-of-the-benefit")
    }
})




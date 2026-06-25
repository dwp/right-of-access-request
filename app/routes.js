//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

//Route for Have you changed your name?
router.post('/known-another-name', function(request, response) {

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
        response.redirect("/user-details/uk-address")
    } else {
        response.redirect("/user-details/address-abroad")
    }
})

//Route for Have you lived at another address in the last 5 years?
router.post('/lived-another-address', function(request, response) {

    var liveInUk = request.session.data['lived-another-address']
    if (liveInUk == "yes"){
        response.redirect("/user-details/where-was-your-previous-address")
    } else {
        response.redirect("/user-details/national-insurance-number")
    }
})

//Route for adding multiple phone numbers

router.post('/which-phone-number', function (req, res) {

    let numbers = req.session.data.phoneNumbers || []
    let newNumber = req.body.phoneNumber

    if (newNumber) {
        numbers.push(newNumber)
    }

    req.session.data.phoneNumbers = numbers

    if (req.body.action === "add") {
        return res.redirect('/specificity/benefits-or-services/one-or-two-benefits/call-recordings/two-or-more/add-another-phone-number')
    }

    // Continue button
    res.redirect('/specificity/benefits-or-services/one-or-two-benefits/call-recordings/two-or-more/give-a-detailed-description')

})

//Remove functionality for removing the numbers
router.get('/remove-phone/:index', function (req, res) {

    let numbers = req.session.data.phoneNumbers || []

    // Convert index to number
    let index = parseInt(req.params.index)

    // Remove the item
    if (!isNaN(index)) {
        numbers.splice(index, 1)
    }

    // Save updated list
    req.session.data.phoneNumbers = numbers

    // Redirect back to the page
    res.redirect('/specificity/benefits-or-services/one-or-two-benefits/call-recordings/two-or-more/add-another-phone-number')

})


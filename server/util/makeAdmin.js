const admin = require('firebase-admin')
const makeAdmin = function (uid) {
    admin
        .auth()
        .setCustomUserClaims(uid, { admin: true })
        .then(() => {
            console.log(`Custom claim set for uid ${uid}`)
        });
}
// const uidToMakeAdmin = 'yUy3Uqzj2VPmAKqw6AHhIbEFhep2'
// makeAdmin(uidToMakeAdmin)
const Users = [
    {
        id: 'EuzZwRc4WUh2sDdpzDapKjKS0DR2',
        businessData: {},
        paymentMethods: [],
        userType: 'cruiser',
        cruiserData: {
            BoatNameLowerCase: 'gypsy blues',
            Crew: 'Cheryl',
            BoatName: 'Gypsy Blues',
            WhatsApp: {
                type: 'MOBILE',
                value: '+17215868647',
                valid: true
            },
            OwnerCaptainLowerCase: 'rene',
            StatusLowerCase: 'couple',
            CrewLowerCase: 'cheryl',
            Flag: {
                name: 'Canada',
                subregion: 'North America',
                currency: [
                    'CAD'
                ],
                callingCode: [
                    '1'
                ],
                region: 'Americas',
                cca2: 'CA',
                flag: 'flag-ca'
            },
            Status: 'Couple',
            OwnerCaptain: 'Rene',
            Telephone: {
                value: '+17215868647',
                valid: true,
                type: 'MOBILE'
            }
        },
        email: 'renetuer@gmail.com',
        fullName: 'Rene',
        fullName_lowercase: 'rene',
        subscription: null,
        invoices: []
    },
    {
        id: 'HM1qSaXU1hbwzfdjU38yleasNaW2',
        paymentMethods: [],
        invoices: [],
        cruiserData: {
            Telephone: {
                type: 'MOBILE',
                valid: true,
                value: '+923007006737'
            },
            StatusLowerCase: 'male',
            BoatNameLowerCase: 'phase 4 boat',
            Status: 'Male',
            CrewLowerCase: 'phase 4 batman, crew',
            OwnerCaptainLowerCase: 'phase 4 captain ',
            BoatName: 'Phase 4 boat',
            Flag: {
                callingCode: [
                    '92'
                ],
                subregion: 'Southern Asia',
                flag: 'flag-pk',
                currency: [
                    'PKR'
                ],
                cca2: 'PK',
                region: 'Asia',
                name: 'Pakistan'
            },
            WhatsApp: {
                valid: true,
                value: '+923007006737',
                type: 'MOBILE'
            },
            OwnerCaptain: 'Phase 4 captain ',
            Crew: 'Phase 4 batman, crew'
        },
        businessData: {},
        userType: 'cruiser',
        subscription: null,
        email: 'phase4user2@cruiserslink.com',
        fullName: 'Imran Niazi',
        fullName_lowercase: 'imran niazi'
    },
    {
        id: 'WWRfXm0TUwS9nI6lDEgxIHLrJUY2',
        invoices: [],
        fullName_lowercase: 'sohail aslam ',
        subscription: null,
        cruiserData: {
            WhatsApp: {
                value: '+923229499463',
                valid: true,
                type: 'MOBILE'
            },
            BoatName: 'SPL Lions Boat',
            Flag: {
                currency: [
                    'PKR'
                ],
                subregion: 'Southern Asia',
                callingCode: [
                    '92'
                ],
                cca2: 'PK',
                flag: 'flag-pk',
                name: 'Pakistan',
                region: 'Asia'
            },
            OwnerCaptainLowerCase: 'sohail aslam',
            CrewLowerCase: 'saqib, maueez, usama, waqas',
            StatusLowerCase: 'family',
            Telephone: {
                type: 'MOBILE',
                valid: true,
                value: '+923229499463'
            },
            OwnerCaptain: 'Sohail Aslam',
            Crew: 'Saqib, Maueez, Usama, Waqas',
            Status: 'Family',
            BoatNameLowerCase: 'spl lions boat'
        },
        fullName: 'Sohail Aslam ',
        paymentMethods: [],
        email: 'sohail@systemplus.co',
        businessData: {
            Telephone: {
                value: '+923229499463',
                type: 'MOBILE',
                valid: true
            },
            ContactEmailLowerCase: 'sohail@systemplus.co',
            Website: 'Https://systemplus.co',
            ContactEmail: 'sohail@systemplus.co',
            WEBLinkLowerCase: 'https://systemplus.co',
            BusinessNameLowerCase: 'bistro 201',
            WhatsApp: {
                type: 'MOBILE',
                value: '+923208800245',
                valid: true
            },
            ContactPersonLowerCase: 'sohail aslam ',
            ContactPerson: 'Sohail Aslam ',
            WEBLink: 'Https://systemplus.co',
            Country: {
                flag: 'flag-pk',
                callingCode: [
                    '92'
                ],
                name: 'Pakistan',
                cca2: 'PK',
                currency: [
                    'PKR'
                ],
                subregion: 'Southern Asia',
                region: 'Asia'
            },
            WebsiteLowerCase: 'https://systemplus.co',
            BusinessName: 'Bistro 201'
        },
        userType: 'cruiser'
    },
    {
        id: 'exrFJXVjZMbNx2Vu1eXuDiUq7PF3',
        cruiserData: {
            Flag: {
                region: 'Oceania',
                currency: [
                    'NZD'
                ],
                flag: 'flag-nz',
                callingCode: [
                    '64'
                ],
                name: 'New Zealand',
                cca2: 'NZ',
                subregion: 'Australia and New Zealand'
            },
            BoatNameLowerCase: 'pomalo',
            Crew: 'Kiki Dalgliesh ',
            Telephone: {
                type: 'MOBILE',
                valid: true,
                value: '+590690842431'
            },
            WhatsApp: {
                valid: true,
                value: '+590690842431',
                type: 'MOBILE'
            },
            Status: 'Couple',
            CrewLowerCase: 'kiki dalgliesh ',
            OwnerCaptainLowerCase: 'david rose',
            OwnerCaptain: 'David Rose',
            BoatName: 'Pomalo',
            StatusLowerCase: 'couple'
        },
        fullName_lowercase: 'david rose',
        email: 'drosenz@me.com',
        userType: 'cruiser',
        paymentMethods: [],
        invoices: [],
        subscription: null,
        businessData: {},
        fullName: 'David Rose'
    },
    {
        id: 'ojjlqky7PcVR7fik3JBbBDPtgCK2',
        email: 'phase4user1@cruiserslink.com',
        fullName: 'Saqib shahzad',
        cruiserData: {},
        paymentMethods: [
            {
                card: {
                    last4: '4242',
                    funding: 'credit',
                    brand: 'visa',
                    expMonth: 1,
                    expYear: 2022,
                    country: 'US'
                },
                billingDetails: {
                    address: {
                        line2: null,
                        state: null,
                        country: null,
                        line1: null,
                        postalCode: null,
                        city: null
                    },
                    phone: null,
                    email: 'phase4user1@cruiserslink.com',
                    name: 'Saqib Shahzad'
                },
                type: 'card',
                livemode: false,
                created: 1609790926,
                customerId: null,
                id: 'pm_1I5zMAGKPGvIOYQ3cRAxHEpA'
            }
        ],
        fullName_lowercase: 'saqib shahzad',
        userType: 'business',
        invoices: [
            {
                decription: '1x CruisersLINK Premium Monthly Recurring',
                date: 'Mon, 04 Jan 2021 20:08:45 GMT',
                currency: 'USD',
                payment: '9.99'
            }
        ],
        subscription: {
            currency: 'USD',
            interval: 'Month',
            name: 'CruisersLINK Premium Monthly Recurring',
            payment: '9.99'
        },
        businessData: {
            WhatsApp: {
                valid: true,
                value: '+923007006737',
                type: 'MOBILE'
            },
            ContactPersonLowerCase: 'phase 4 contact',
            ContactPerson: 'Phase 4 contact',
            WEBLinkLowerCase: 'https://www.google.com.pk',
            Telephone: {
                type: 'MOBILE',
                value: '+923007006737',
                valid: true
            },
            BusinessName: 'Phase 4 business edited again',
            ContactEmail: 'Phase4user1@cruiserslink.com',
            WEBLink: 'Https://www.google.com.pk',
            WebsiteLowerCase: 'https://www.google.com.pk',
            ContactEmailLowerCase: 'phase4user1@cruiserslink.com',
            BusinessNameLowerCase: 'phase 4 business ',
            Country: {
                currency: [
                    'PKR'
                ],
                callingCode: [
                    '92'
                ],
                region: 'Asia',
                subregion: 'Southern Asia',
                cca2: 'PK',
                name: 'Pakistan',
                flag: 'flag-pk'
            },
            Website: 'Https://www.google.com.pk'
        }
    },
    {
        id: 'qNRpADDbfiSmNOpl3P9ROBT6mwA3',
        fullName_lowercase: 'sohail aslam',
        cruiserData: {},
        email: 'phase3user1@cruiserslink.com',
        businessData: {
            WEBLink: 'HTTPS://www.google.com.pk/',
            Website: 'HTTPS://www.google.com.pk/',
            ContactEmailLowerCase: 'contact@person.com',
            ContactPerson: 'My contact person',
            BusinessName: 'My business',
            Telephone: {
                value: '+923007006737',
                type: 'MOBILE',
                valid: true
            },
            ContactPersonLowerCase: 'my contact person',
            BusinessNameLowerCase: 'my business',
            WEBLinkLowerCase: 'https://www.google.com.pk/',
            WebsiteLowerCase: 'https://www.google.com.pk/',
            WhatsApp: {
                value: '+923007006737',
                type: 'MOBILE',
                valid: true
            },
            ContactEmail: 'Contact@person.com',
            Country: {
                cca2: 'PK',
                region: 'Asia',
                name: 'Pakistan',
                callingCode: [
                    '92'
                ],
                flag: 'flag-pk',
                currency: [
                    'PKR'
                ],
                subregion: 'Southern Asia'
            }
        },
        fullName: 'Sohail Aslam',
        userType: 'business'
    },
    {
        id: 'rekhiA1PJNeB9VgB9TLWVlal6EL2',
        subscription: null,
        businessData: {},
        email: 'phase3user3@cruiserslink.com',
        paymentMethods: [],
        cruiserData: {
            CrewLowerCase: 'new crew',
            Flag: {
                currency: [
                    'CAD'
                ],
                region: 'Americas',
                name: 'Canada',
                cca2: 'CA',
                subregion: 'North America',
                callingCode: [
                    '1'
                ],
                flag: 'flag-ca'
            },
            Crew: 'New crew',
            Telephone: {
                valid: true,
                value: '+923007006737',
                type: 'MOBILE'
            },
            WhatsApp: {
                valid: true,
                value: '+923007006737',
                type: 'MOBILE'
            },
            Status: 'Couple',
            BoatName: 'New boat ',
            StatusLowerCase: 'couple',
            OwnerCaptainLowerCase: 'new captain ',
            BoatNameLowerCase: 'new boat ',
            OwnerCaptain: 'New captain '
        },
        fullName: 'Maueez Ahmad',
        userType: 'cruiser',
        fullName_lowercase: 'maueez ahmad',
        invoices: []
    },
    {
        id: 'sAlhMjjNvLOgqsVwzZDInsA54w43',
        paymentMethods: [],
        email: 'cheryltuer@gmail.com',
        userType: 'cruiser',
        fullName_lowercase: 'cheryl tuerlings',
        businessData: {},
        fullName: 'Cheryl Tuerlings',
        subscription: null,
        invoices: [],
        cruiserData: {
            BoatNameLowerCase: 'gypsy blues',
            BoatName: 'Gypsy Blues',
            Crew: 'Rene',
            Status: 'Couple',
            Flag: {
                flag: 'flag-ca',
                region: 'Americas',
                cca2: 'CA',
                callingCode: [
                    '1'
                ],
                name: 'Canada',
                subregion: 'North America',
                currency: [
                    'CAD'
                ]
            },
            WhatsApp: {
                valid: true,
                type: 'MOBILE',
                value: '+17215865524'
            },
            OwnerCaptainLowerCase: 'cheryl',
            StatusLowerCase: 'couple',
            CrewLowerCase: 'rene',
            OwnerCaptain: 'Cheryl',
            Telephone: {
                valid: true,
                value: '+17215865524',
                type: 'MOBILE'
            }
        }
    },
    {
        id: 'vmns3aKT5kei7Pozt3dX7YIkjoW2',
        fullName_lowercase: 'kirsten dalgliesh ',
        cruiserData: {
            Status: 'Couple',
            BoatName: 'Pomalo',
            BoatNameLowerCase: 'pomalo',
            StatusLowerCase: 'couple',
            CrewLowerCase: 'kirsten dalgliesh ',
            Telephone: {
                value: '+590690842431',
                valid: true,
                type: 'MOBILE'
            },
            WhatsApp: {
                value: '+590690842431',
                valid: true,
                type: 'MOBILE'
            },
            Flag: {
                cca2: 'NZ',
                flag: 'flag-nz',
                name: 'New Zealand',
                callingCode: [
                    '64'
                ],
                region: 'Oceania',
                subregion: 'Australia and New Zealand',
                currency: [
                    'NZD'
                ]
            },
            OwnerCaptain: 'David Rose',
            OwnerCaptainLowerCase: 'david rose',
            Crew: 'Kirsten Dalgliesh '
        },
        userType: 'cruiser',
        fullName: 'Kirsten Dalgliesh ',
        businessData: {},
        invoices: [],
        subscription: null,
        email: 'kirstd99@hotmail.com',
        paymentMethods: []
    },
    {
        id: 'xmyM0yDZnbOe3ZAGRMWg17gnqkB2',
        invoices: [],
        paymentMethods: [],
        subscription: null,
        userType: 'cruiser',
        email: 'phase3user2@cruiserslink.com',
        cruiserData: {
            BoatNameLowerCase: 'new boat',
            CrewLowerCase: 'new crew',
            Crew: 'New Crew',
            Telephone: {
                valid: true,
                value: '+923007006737',
                type: 'MOBILE'
            },
            OwnerCaptainLowerCase: 'new captain',
            OwnerCaptain: 'New Captain',
            Flag: {
                region: 'Africa',
                callingCode: [
                    '244'
                ],
                flag: 'flag-ao',
                name: 'Angola',
                subregion: 'Middle Africa',
                cca2: 'AO',
                currency: [
                    'AOA'
                ]
            },
            WhatsApp: {
                valid: true,
                type: 'MOBILE',
                value: '+923007006737'
            },
            Status: 'Couple',
            BoatName: 'New boat',
            StatusLowerCase: 'couple'
        },
        businessData: {},
        fullName_lowercase: 'imran ahmad khan',
        fullName: 'Imran Ahmad Khan'
    },
    {
        id: 'yUy3Uqzj2VPmAKqw6AHhIbEFhep2',
        invoices: [],
        subscription: null,
        paymentMethods: [],
        email: 'usamaimam1@gmail.com',
        fullName_lowercase: 'muhammad usama imam',
        userType: 'cruiser',
        businessData: {},
        cruiserData: {
            BoatNameLowerCase: 'my boat',
            StatusLowerCase: 'couple',
            Status: 'Couple',
            OwnerCaptain: 'My owner captain',
            WhatsApp: {
                value: '+923007006737',
                valid: true,
                type: 'MOBILE'
            },
            Telephone: {
                valid: true,
                type: 'MOBILE',
                value: '+923007006737'
            },
            Flag: {
                callingCode: [
                    '92'
                ],
                name: 'Pakistan',
                currency: [
                    'PKR'
                ],
                subregion: 'Southern Asia',
                cca2: 'PK',
                flag: 'flag-pk',
                region: 'Asia'
            },
            BoatName: 'My boat',
            Crew: 'My crew',
            CrewLowerCase: 'my crew',
            OwnerCaptainLowerCase: 'my owner captain'
        },
        fullName: 'Muhammad Usama Imam'
    }
]
const addAttribute = async function (ref, valueObj) {
    try {
        const userDocs = await admin.firestore().collection(ref).get()
        const newUsers = userDocs.docs.forEach(doc => {
            admin.firestore().collection(ref).doc(doc.id).update({
                disable: false
            })
        })
    } catch (err) {

    }
}
// addAttribute('Users',)
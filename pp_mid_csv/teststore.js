const request = require("request");


// async function test3(){
//     await xx
// }





async function test(){
    return new Promise((res, rej) => {
        request({

            method: "get",
            url: 'https://main-stg.bindo.co/api/v2/stores',
            headers: {
                "content-type": "application/json",
                "X-User-Access-Token": "30sidswu8nn7g4tldgcxza1dxoqua5z",
            },
            json: true

        },function(error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log()
                res(response.body)
                // JSON.parse(body)

            } else {
                rej(err)
                // console.log(error)
            }
        })
    })
}
// await test()


// function test2(res){
//
//     return new Promise((res, rej) => {
//         res(res)
//     })
// }
//
// test().then(test2).then(res=>{
//
// }).catch(err => {
//     console.log(err)
// })

let res = await test();

console.log(res)



//console.log("----",rep.body)



// const data= [ {
//     business_type: null,
//         business_mode: null,
//         address1: '77 Hoi Bun Road',
//         address2: '95',
//         business_name: 'Bindo Labs',
//         calling_code: '852',
//         chain: false,
//         city: 'Hong Kong',
//         compact_title: null,
//         country_code: 'HK',
//         currency: 'HKD',
//         deleted: false,
//         delivery: true,
//         delivery_desc: '',
//         delivery_fee: 0,
//         delivery_miles: 50,
//         description: '苑餐厅佳肴以欧陆菜系为灵感打造，海鲜更是重中之重',
//         delivery_min_amount: 0,
//         email: 'hagiangsan@gmail.com',
//         group: false,
//         group_parent_id: null,
//         highlight: 'Bindo Labs founded in 2010 with headquarter in New York, and APAC headquarter in Hong Kong. Our mission is to help businesses go beyond their brick and mortar stores by providing them with all the tools to adapt to the ever-changing world.',
//         homepage: 'bindolabs.com',
//         id: 4751,
//         iframe_active: true,
//         opening_hours: [Object],
//         parent_id: 5234,
//         phone: '98118278',
//         pickup_desc: null,
//         policy: 'Offline 4751',
//         pos_active: true,
//         reply_to_store: true,
//         report_time_zone: '+12:00',
//         reporting_token: '1591fefe4ca7915b',
//         slug: '95e',
//         soft_descriptor: null,
//         sort: 0,
//         state: '10665',
//         sync_inventory: false,
//         suspended: false,
//         time_segments: [Object],
//         title: 'Bindo Labs',
//         zipcode: null,
//         tax_rate: 1,
//         ipad_screensaver_url: '',
//         is_screensaver_on: false,
//         timezone: 'Hongkong',
//         store_credit_enabled: true,
//         logo_url: 'https://cdn-stg.bindo.co/store_pictures/2928/medium/resource.jpg?1644574153',
//         icon_url: null,
//         delivery_areas: [],
//         current_exchange_rates: [Array],
//         lat: 22.25,
//         lng: 114.1667,
//         tags: [],
//         open: true,
//         translation_info: null,
//         consumer_rate: null,
//         bookings: false,
//         queueings: false,
//         pickup: true,
//         associate_type: null,
//         is_default: false,
//         original_url: 'https://cdn-stg.bindo.co/store_pictures/2928/original/resource.jpg?2022-04-27',
//         tag: null,
//         customer_attributes: [Object],
//         avg_consumption: 0,
//         distance: 0,
//         price: null,
//         platform_id: null,
//         store_name: null,
//         store_audit: null,
//         platform_store_classification: null,
//         customer_attribute: null,
//         store_category: null,
//         store_brands: null,
//         store_id: null,
//         is_business: false,
//         dine_in: true,
//         dine_in_unassigned: false,
//         store_score: 45,
//         login_selection_for_customer_ordering_device: null,
//         safety_verification: false,
//         safety_verification_amount: '1',
//         logo: 'https://bindo-images-dev.s3.amazonaws.com/module/94ffcf7e0bc5ab66ce0f7b411a6fc71d/logo.png?v=0.8878975021017561',
//         external_id: 1,
//         master_terminal_ip: null,
//         store_pictures: null,
//         store_config: null,
//         store_module: null,
//         favorites: null,
//         modifier_set_list: null,
//         pick_up_locations: null,
//         tax_options: null,
//         tables: null
//
// },
// {
//     store: {
//         business_type: null,
//             business_mode: null,
//             address1: 'Forever Alone Street',
//             address2: '',
//             business_name: null,
//             calling_code: '852',
//             chain: false,
//             city: 'Hong Kong',
//             compact_title: null,
//             country_code: 'HK',
//             currency: 'USD',
//             deleted: false,
//             delivery: false,
//             delivery_desc: null,
//             delivery_fee: 0,
//             delivery_miles: 0,
//             description: null,
//             delivery_min_amount: 0,
//             email: 'tommy.ho@bindolabs.com',
//             group: null,
//             group_parent_id: null,
//             highlight: null,
//             homepage: null,
//             id: 4697,
//             iframe_active: false,
//             opening_hours: null,
//             parent_id: null,
//             phone: '61540828',
//             pickup_desc: null,
//             policy: null,
//             pos_active: true,
//             reply_to_store: true,
//             report_time_zone: null,
//             reporting_token: '726a43c1044d079c',
//             slug: 'mmx',
//             soft_descriptor: null,
//             sort: 0,
//             state: '',
//             sync_inventory: false,
//             suspended: false,
//             time_segments: [Object],
//             title: 'Tommy Super Bindo Restaurant',
//             zipcode: '',
//             tax_rate: null,
//             ipad_screensaver_url: 'https://cdn-stg.bindo.co/screensavers/107/medium/?1446091482',
//             is_screensaver_on: true,
//             timezone: 'Asia/Hong_Kong',
//             store_credit_enabled: true,
//             logo_url: null,
//             icon_url: null,
//             delivery_areas: [],
//             current_exchange_rates: [],
//             lat: 22.25,
//             lng: 114.1667,
//             tags: [],
//             open: true,
//             translation_info: null,
//             consumer_rate: null,
//             bookings: false,
//             queueings: false,
//             pickup: true,
//             associate_type: null,
//             is_default: false,
//             original_url: null,
//             tag: null,
//             customer_attributes: null,
//             avg_consumption: 0,
//             distance: 0,
//             price: null,
//             platform_id: null,
//             store_name: null,
//             store_audit: null,
//             platform_store_classification: null,
//             customer_attribute: null,
//             store_category: null,
//             store_brands: null,
//             store_id: null,
//             is_business: false,
//             dine_in: false,
//             dine_in_unassigned: false,
//             store_score: null,
//             login_selection_for_customer_ordering_device: null,
//             safety_verification: false,
//             safety_verification_amount: null,
//             logo: '',
//             external_id: null,
//             master_terminal_ip: null,
//             store_pictures: null,
//             store_config: null,
//             store_module: null,
//             favorites: null,
//             modifier_set_list: null,
//             pick_up_locations: null,
//             tax_options: null,
//             tables: null
//     }
// },
// {
//     store: {
//         business_type: null,
//             business_mode: null,
//             address1: 'Rosewood Hong Kong, Victoria Dockside, 18 Salisbury Road, Tsim Sha Tsui, Kowloon',
//             address2: '',
//             business_name: null,
//             calling_code: '852',
//             chain: false,
//             city: 'Hong Kong',
//             compact_title: null,
//             country_code: 'HK',
//             currency: 'HKD',
//             deleted: false,
//             delivery: false,
//             delivery_desc: null,
//             delivery_fee: 0,
//             delivery_miles: 0,
//             description: null,
//             delivery_min_amount: 0,
//             email: 'wilson.tam@bindo.com',
//             group: false,
//             group_parent_id: null,
//             highlight: null,
//             homepage: null,
//             id: 4722,
//             iframe_active: true,
//             opening_hours: null,
//             parent_id: 5234,
//             phone: '98118278',
//             pickup_desc: null,
//             policy: null,
//             pos_active: true,
//             reply_to_store: true,
//             report_time_zone: null,
//             reporting_token: '10512fd6c5c5658b',
//             slug: 'dml',
//             soft_descriptor: null,
//             sort: 0,
//             state: '',
//             sync_inventory: false,
//             suspended: false,
//             time_segments: {},
//         title: 'Wilson Shop',
//             zipcode: '',
//             tax_rate: null,
//             ipad_screensaver_url: '',
//             is_screensaver_on: false,
//             timezone: 'Asia/Hong_Kong',
//             store_credit_enabled: true,
//             logo_url: null,
//             icon_url: null,
//             delivery_areas: [],
//             current_exchange_rates: [Array],
//             lat: 22.25,
//             lng: 114.1667,
//             tags: [],
//             open: true,
//             translation_info: null,
//             consumer_rate: null,
//             bookings: false,
//             queueings: false,
//             pickup: true,
//             associate_type: null,
//             is_default: false,
//             original_url: null,
//             tag: null,
//             customer_attributes: null,
//             avg_consumption: 0,
//             distance: 0,
//             price: null,
//             platform_id: null,
//             store_name: null,
//             store_audit: null,
//             platform_store_classification: null,
//             customer_attribute: null,
//             store_category: null,
//             store_brands: null,
//             store_id: null,
//             is_business: false,
//             dine_in: false,
//             dine_in_unassigned: false,
//             store_score: null,
//             login_selection_for_customer_ordering_device: null,
//             safety_verification: false,
//             safety_verification_amount: null,
//             logo: '',
//             external_id: null,
//             master_terminal_ip: null,
//             store_pictures: null,
//             store_config: null,
//             store_module: null,
//             favorites: null,
//             modifier_set_list: null,
//             pick_up_locations: null,
//             tax_options: null,
//             tables: null
//     }
// }
// ]
//









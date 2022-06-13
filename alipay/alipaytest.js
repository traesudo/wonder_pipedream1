let request = require('request')
var sha1 = require("sha1");
const Config=
    {
        "url": "https://intlmapi.alipay.com/gateway.do",
        "partner_id": "2088721222565561",
        "md5_sign_key": "i8pkpttxmoqnb8x3x15ptepebp14q9ic",
        "partner_email": "online.payment@poslobster.com",
        "rsa_public_key": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnxj/9qwVfgoUh/y2W89L6BkRAFljhNhgPdyPuBV64bfQNN1PjbCzkIM6qRdKBoLPXmKKMiFYnkd6rAoprih3/PrQEB/VsW8OoM8fxn67UDYuyBTqA23MML9q1+ilIZwBC2AQ2UBVOrFXfFl75p6/B5KsiNG9zpgmLCUYuLkxpLQIDAQAB",
        "rsa_private_key": "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAN5GI4ENpOnEzEeySULGRTa08Xl1J6NLJgeeyyu+unasrjTneo61+S9tat59hvT9pMAd2ACMD2/OQkp2HEfJ3CH/QUlC9FNauT9h6jmRnT6hPEHHbo0bROIB9JdGmCRQ8hOkvEl1rG3eEXuXzjCc5VPRZy9RQTpH3QItoyRDVQ9JAgMBAAECgYAPnyJTqZ/Thi9NQqx/cuveYm0uOhulEF0F4BUrZ+Y2/P/pW/NzIDr5KFmAdZYMld8EWZSaxT04gGiMTyzBpuA/qebu3xTSVc/RQ26GwlaXTY4PPPDbBiSN3v2Ogku9MktTM+byqRjWcqi+yMn6gXB3vwWVSDnbStmfRAnDBIP8YQJBAPBHNvXvatVXf1n/jCXi4nbY0BISwaiu8eTlGsqSoQm3JfD2OMrcCX4tgYgvjfO4jjELOe2sawRiCsL7OcLnh0UCQQDs0VgbrnVvlgviIluPOVLuZdh5qSngqCrUukE+pdUzajL/WorwpmYuW7nyrQOfyI0vkdqcNZKkeLyh2FKkf7Y1AkAMLA9kthQ7aotRC9kVskC2tJUV1U1qNjKa3eBVksgFrfmGE3MdE7iHY9bEB2SxjA/n/CGbILjrJ+xTpFZwwTnhAkBPvh5hE9nPfUL7Hn6eN7tJM1o1fVTwpS/m+eDGa6ji6zvI6IAokJ+PtKtkoAW8ZBfGkOJ//zolz9IU3XbWlXqRAkAN4mUtBpbZ0xssaSPMO2/YPIReix83I8VwYZGbxNiYTQAKS1U9yAGjJwrBBLZ26wv5n/c7PwGq9nn4tb/41irg",
        "notify_private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC8wNbMpyJvp6TT\nkb/lireET7ZNGmT7xcU8osN3EwxcKaMrl0rmt5MvDNoRG2cnkgCK0gjfyZLbhP6+\nPsl7QHrZrteVOCJY0Lfi4bED2rQSI30tWVduiaWG/U3e8cgd/bH+FpTMWrw4nHFD\nMYgpKloIpW8S2kFEWWXkD1sIJspDjehwcFIx8DCOVa8LSEU++R9cBB6trM0BgmHv\nRibY1cBidqj02OdbC1UHDM1vZd7PXB/zBvTK8bcyrv/ZNj3QXmI5GsuW75AP5yzk\nBhkeB9YVNDioNzgUFmCQgvPXotwb2fcGLtlXvxHb5MXjUZljtOg7/j2pMSoCP8ii\nDbclbqNhAgMBAAECggEARnEJOLMfLOA5qSN5pCaSunQtKrUw/q0eILT1kZiwQizf\n0kLSFyxnZ2W6dCvv4VqhjS05VpsZjYcisskn1DGKJ3cSyYN7ff3WwntL3o5eKW7J\nJoVzFbOU7L3Xs94zus2VAahXu7QZDl+D/XmcwRAnLZbfzv9Y4DMkzWnVpUMktPS6\nLMoY12kU9YiS5SO0DvLZHxQ5JDGT/KOrDb6nNeqjXWyYGECx8VOR5QadplKIOy5Q\n4PzN38+Mp3iW8yKCRSxh5cMbzM0x5MTtLJxYGknBvPeDqTthPDkvmrWYhlSN1K05\neBilXytFsTQskGS67dcQkVpPkbQU9zEHHzX693n7yQKBgQDukI5G3cvJFbCmHbVf\nR1lDxFUhX/+uN6zmn3pti0EzCNYJAHu/gMS4b7bJaljJcx9fzj6P/pFvZIy4MCiq\n3bbGcZsoNmqf9a8ofEmX6VefO5hwgiFKGHcHGoGTWUTrTqFHwZS2e59VfPCLQzYw\nEuqVDh0Iuqj+ggU77UECS2GG4wKBgQDKjFVJ98hqwF5xA5xjxdrur1h9Du4Te1tF\n6mUzZ3oexuGxN1Kvy/utOjIrfbuaZdx0SWY/Mdk14ApOZ2j/k7EkpKzRaVfMGLlT\nf4WxQ2gDXbrXUWhncfpfIpel6TkTDrZes2H/RjW/zJCmLXW0xrCXy8ZGtFbn1FHt\n8QPIEyC76wKBgAZIbFbVdI6BMbvOQH6X5HPyccOFQbiW4sjYHmNQLZFohCqMhrXO\ncF/jIU9Aq8HydDsTtXYZYD8syL/5FLkbSbsENu/iLwCzeb95Nn73uEULTsJ3yuSm\nrEvVmOAGk9gWpAy9vmrn6pRXzAX+6Shu9xqh2oXmVJkPV4/yeanTzme9AoGAaoLX\nStlY9AIK58UtVS4zTba5grH6MhZ5Tc/PvfNZPZv6DPX5rmZHB7YFsechYzTTc/cx\nJGQzQ+h3ovkwNs3Upl9OXaTWvYX21tjFVg0LQlHksdumWleOgL6xHlcBY2smLbCJ\nBPNHyn9pRWm8bv7Y2EoZDw9AcBKvrr9B7NFaMlcCgYBsfFkY6UJFGYbVWoqYHHcl\nPypUm7bpQjWn+lnifTHylOGS2JRW5t3Zy2ARDOqRxtJ0h76tGgkoxkPXvhhRS6TE\nsjaSvLFm2weJEMwzQZGlnsnOztxYUG1hLbflvR6DQuOXVveY2MMDzcSMZvyDpiva\nRckMIV8CQSMnSMATjg++zw==\n-----END PRIVATE KEY-----",
        "return_url": ""


    }

const kyc={
    "merchant_name": "Taste New Limited",
    "merchant_id": "",
    "beneficial_name": "",
    "beneficial_card_front_image": null,
    "beneficial_card_back_image": null,
    "beneficial_passport_image": null,
    "beneficial_card_id": "",
    "beneficial_card_type": "",
    "beneficial_country": "",
    "beneficial_birth_date": "",
    "beneficial_first_name": "",
    "beneficial_last_name": "",
    "director_name": "queek",
    "director_card_id_front_image": null,
    "director_card_id_back_image": null,
    "director_passport_image": null,
    "director_card_id": "341126197709218377",
    "director_card_type": "",
    "director_country": "",
    "director_birth_date": "",
    "director_first_name": "",
    "director_last_name": "",
    "biz_country": "",
    "biz_state": "",
    "biz_city": "",
    "biz_addr": "testAddress",
    "biz_post_code": "518000",
    "biz_br_image": [
        "https://bindo-images-dev.s3.amazonaws.com/module/70ed2abe58cae46e8a5cad59765ce1db/iShot2022-03-10_16.54.34.png"
    ],
    "biz_ci_image": null,
    "biz_name": "",
    "biz_reg_num": "519723407213085723",
    "biz_structure": "ENTERPRISE",
    "biz_contact_num": "18276147057",
    "biz_industry_category": "656",
    "biz_sub_industry_category": "",
    "biz_operate_countries": null,
    "biz_website": "web url",
    "biz_contact_name": "stephanie yeung",
    "monthly_txn_amount": "",
    "service_website": "https://tastegourmet.gobindo.com/stores/kr1/menus",
    "service_tel": "",
    "service_email": "queek.he@antcosa.com",
    "settlement_bank": "平安银⾏行行借记卡",
    "settlement_account": "6216261000000000018",
    "store_address": "",
    "store_country": "",
    "register_address": "",
    "register_country": "",
    "corpman_id": "",
    "bank_code": "105",
    "bankaccount_name": "全渠道",
    "city_code": "5810",
    "br_date_of_expiry": "2021-06-18",
    "mcc": "5812",
    "br_name": "Dab-Pa Artisant",
    "registration_document_type": "N/A"
}
const OnBoardInfo={
    "id": 29,
    "created_at": "2022-03-03T09:23:17Z",
    "updated_at": "2022-03-03T09:37:29.549Z",
    "deleted_at": null,
    "KYCID": 24,
    "AcquirerID": 1,
    "PaymentMethods": ["alipay"],
    "EntryTypes": ["in_web"],
    "AcquirerRecordID": "",
    "Acq": {
        "id": 1,
        "created_at": "2021-03-03T03:45:41Z",
        "updated_at": "2021-07-19T10:13:06.337Z",
        "deleted_at": null,
        "name": "Alipay Online",
        "impl_name": "alipay",
        "gateway_id": "",
        "addition": "{\"url\":\"https://intlmapi.alipay.com/gateway.do\",\"partner_id\":\"2088721222565561\",\"md5_sign_key\":\"i8pkpttxmoqnb8x3x15ptepebp14q9ic\",\"partner_email\":\"online.payment@poslobster.com\",\"rsa_public_key\":\"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnxj/9qwVfgoUh/y2W89L6BkRAFljhNhgPdyPuBV64bfQNN1PjbCzkIM6qRdKBoLPXmKKMiFYnkd6rAoprih3/PrQEB/VsW8OoM8fxn67UDYuyBTqA23MML9q1+ilIZwBC2AQ2UBVOrFXfFl75p6/B5KsiNG9zpgmLCUYuLkxpLQIDAQAB\",\"rsa_private_key\":\"MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAN5GI4ENpOnEzEeySULGRTa08Xl1J6NLJgeeyyu+unasrjTneo61+S9tat59hvT9pMAd2ACMD2/OQkp2HEfJ3CH/QUlC9FNauT9h6jmRnT6hPEHHbo0bROIB9JdGmCRQ8hOkvEl1rG3eEXuXzjCc5VPRZy9RQTpH3QItoyRDVQ9JAgMBAAECgYAPnyJTqZ/Thi9NQqx/cuveYm0uOhulEF0F4BUrZ+Y2/P/pW/NzIDr5KFmAdZYMld8EWZSaxT04gGiMTyzBpuA/qebu3xTSVc/RQ26GwlaXTY4PPPDbBiSN3v2Ogku9MktTM+byqRjWcqi+yMn6gXB3vwWVSDnbStmfRAnDBIP8YQJBAPBHNvXvatVXf1n/jCXi4nbY0BISwaiu8eTlGsqSoQm3JfD2OMrcCX4tgYgvjfO4jjELOe2sawRiCsL7OcLnh0UCQQDs0VgbrnVvlgviIluPOVLuZdh5qSngqCrUukE+pdUzajL/WorwpmYuW7nyrQOfyI0vkdqcNZKkeLyh2FKkf7Y1AkAMLA9kthQ7aotRC9kVskC2tJUV1U1qNjKa3eBVksgFrfmGE3MdE7iHY9bEB2SxjA/n/CGbILjrJ+xTpFZwwTnhAkBPvh5hE9nPfUL7Hn6eN7tJM1o1fVTwpS/m+eDGa6ji6zvI6IAokJ+PtKtkoAW8ZBfGkOJ//zolz9IU3XbWlXqRAkAN4mUtBpbZ0xssaSPMO2/YPIReix83I8VwYZGbxNiYTQAKS1U9yAGjJwrBBLZ26wv5n/c7PwGq9nn4tb/41irg\",\"notify_private_key\":\"-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC8wNbMpyJvp6TT\\nkb/lireET7ZNGmT7xcU8osN3EwxcKaMrl0rmt5MvDNoRG2cnkgCK0gjfyZLbhP6+\\nPsl7QHrZrteVOCJY0Lfi4bED2rQSI30tWVduiaWG/U3e8cgd/bH+FpTMWrw4nHFD\\nMYgpKloIpW8S2kFEWWXkD1sIJspDjehwcFIx8DCOVa8LSEU++R9cBB6trM0BgmHv\\nRibY1cBidqj02OdbC1UHDM1vZd7PXB/zBvTK8bcyrv/ZNj3QXmI5GsuW75AP5yzk\\nBhkeB9YVNDioNzgUFmCQgvPXotwb2fcGLtlXvxHb5MXjUZljtOg7/j2pMSoCP8ii\\nDbclbqNhAgMBAAECggEARnEJOLMfLOA5qSN5pCaSunQtKrUw/q0eILT1kZiwQizf\\n0kLSFyxnZ2W6dCvv4VqhjS05VpsZjYcisskn1DGKJ3cSyYN7ff3WwntL3o5eKW7J\\nJoVzFbOU7L3Xs94zus2VAahXu7QZDl+D/XmcwRAnLZbfzv9Y4DMkzWnVpUMktPS6\\nLMoY12kU9YiS5SO0DvLZHxQ5JDGT/KOrDb6nNeqjXWyYGECx8VOR5QadplKIOy5Q\\n4PzN38+Mp3iW8yKCRSxh5cMbzM0x5MTtLJxYGknBvPeDqTthPDkvmrWYhlSN1K05\\neBilXytFsTQskGS67dcQkVpPkbQU9zEHHzX693n7yQKBgQDukI5G3cvJFbCmHbVf\\nR1lDxFUhX/+uN6zmn3pti0EzCNYJAHu/gMS4b7bJaljJcx9fzj6P/pFvZIy4MCiq\\n3bbGcZsoNmqf9a8ofEmX6VefO5hwgiFKGHcHGoGTWUTrTqFHwZS2e59VfPCLQzYw\\nEuqVDh0Iuqj+ggU77UECS2GG4wKBgQDKjFVJ98hqwF5xA5xjxdrur1h9Du4Te1tF\\n6mUzZ3oexuGxN1Kvy/utOjIrfbuaZdx0SWY/Mdk14ApOZ2j/k7EkpKzRaVfMGLlT\\nf4WxQ2gDXbrXUWhncfpfIpel6TkTDrZes2H/RjW/zJCmLXW0xrCXy8ZGtFbn1FHt\\n8QPIEyC76wKBgAZIbFbVdI6BMbvOQH6X5HPyccOFQbiW4sjYHmNQLZFohCqMhrXO\\ncF/jIU9Aq8HydDsTtXYZYD8syL/5FLkbSbsENu/iLwCzeb95Nn73uEULTsJ3yuSm\\nrEvVmOAGk9gWpAy9vmrn6pRXzAX+6Shu9xqh2oXmVJkPV4/yeanTzme9AoGAaoLX\\nStlY9AIK58UtVS4zTba5grH6MhZ5Tc/PvfNZPZv6DPX5rmZHB7YFsechYzTTc/cx\\nJGQzQ+h3ovkwNs3Upl9OXaTWvYX21tjFVg0LQlHksdumWleOgL6xHlcBY2smLbCJ\\nBPNHyn9pRWm8bv7Y2EoZDw9AcBKvrr9B7NFaMlcCgYBsfFkY6UJFGYbVWoqYHHcl\\nPypUm7bpQjWn+lnifTHylOGS2JRW5t3Zy2ARDOqRxtJ0h76tGgkoxkPXvhhRS6TE\\nsjaSvLFm2weJEMwzQZGlnsnOztxYUG1hLbflvR6DQuOXVveY2MMDzcSMZvyDpiva\\nRckMIV8CQSMnSMATjg++zw==\\n-----END PRIVATE KEY-----\",\"return_url\":\"\"}",
        "auto_settlement_time": "",
        "BatchNum": 0,
        "key_type": "",
        "CustomAttributes": null
    },
    "IsConfig": false,
    "Status": "failed",
    "ErrorMsg": "kyc.OnBoardInfo.StoreCountry is empty",
    "Detail": {
        "mid": "537261",
        "supported_payment_methods": null,
        "supported_entry_types": null
    }
}
const siteInfos={
        SiteType: "WEB",
        SiteUrl:  "https://tastegourmet.gobindo.com/stores/kr1/menus",
}
const timeone = new Date().getTime();

const key = 'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAN5GI4ENpOnEzEeySULGRTa08Xl1J6NLJgeeyyu+unasrjTneo61+S9tat59hvT9pMAd2ACMD2/OQkp2HEfJ3CH/QUlC9FNauT9h6jmRnT6hPEHHbo0bROIB9JdGmCRQ8hOkvEl1rG3eEXuXzjCc5VPRZy9RQTpH3QItoyRDVQ9JAgMBAAECgYAPnyJTqZ/Thi9NQqx/cuveYm0uOhulEF0F4BUrZ+Y2/P/pW/NzIDr5KFmAdZYMld8EWZSaxT04gGiMTyzBpuA/qebu3xTSVc/RQ26GwlaXTY4PPPDbBiSN3v2Ogku9MktTM+byqRjWcqi+yMn6gXB3vwWVSDnbStmfRAnDBIP8YQJBAPBHNvXvatVXf1n/jCXi4nbY0BISwaiu8eTlGsqSoQm3JfD2OMrcCX4tgYgvjfO4jjELOe2sawRiCsL7OcLnh0UCQQDs0VgbrnVvlgviIluPOVLuZdh5qSngqCrUukE+pdUzajL/WorwpmYuW7nyrQOfyI0vkdqcNZKkeLyh2FKkf7Y1AkAMLA9kthQ7aotRC9kVskC2tJUV1U1qNjKa3eBVksgFrfmGE3MdE7iHY9bEB2SxjA/n/CGbILjrJ+xTpFZwwTnhAkBPvh5hE9nPfUL7Hn6eN7tJM1o1fVTwpS/m+eDGa6ji6zvI6IAokJ+PtKtkoAW8ZBfGkOJ//zolz9IU3XbWlXqRAkAN4mUtBpbZ0xssaSPMO2/YPIReix83I8VwYZGbxNiYTQAKS1U9yAGjJwrBBLZ26wv5n/c7PwGq9nn4tb/41irg'

const sha1key=sha1(key);

const bs= {
    // "ConfigUrl":Config.url,
    // "OwnRsaPrivKey":
    "service":"alipay.overseas.secmerchant.online.maintain",
        "partner":Config.partner_id,
        "secondary_merchant_name":OnBoardInfo.Acq.name,
        "secondary_merchant_id":537261,
        //sotre
        "store_name":"Zip",
        "store_country":"CN",
        "store_address":"Test",
        "register_country":"CN",
        "register_address":"testAddress",
        "secondary_merchant_type":"ENTERPRISE",
        "registration_no":"18276147057",
        "contact_no":"18276147057",
        "contact_email":"queek.he@antcosa.com",
        "site_infos":siteInfos,
        "secondary_merchant_industry":"ENTERPRISE",//mcc
        "_input_charset":"UTF-8",
        "timestamp":timeone, //时间timestamp=fmt.Sprint(time.Now().In(loc).UnixNano()
        "sign":sha1key,
        "sign_type":"RSA",//sign, err := RsaSignArray(params, SIGN_RSA, OwnRsaPrivKey)






}

// const ps=encode(bs)
// console.log(ps)

request({
    timeout: 5000,
    method: "get",
    url: 'https://mapi.alipaydev.com/gateway.do/',
    headers: {
        "content-type": "application/json",
    },
    params:[
        {
            name:"service",
            value:"alipay.overseas.secmerchant.online.maintain",

        },
        {
            name:"partner",
            value:Config.partner_id,

        },
        {
           name: "secondary_merchant_name",
            value:OnBoardInfo.Acq.name,

        },
        {
            name:"secondary_merchant_id",
            value:537261,

        },
        {
            name:"store_name",
            value:"Zip"

        },
        {
            name:"store_country",
             value:"CN"

        },{
            name:"store_address",
             value:"Test"

        },{
            name:"register_country",
              value:"CN"
        },{
            name:"secondary_merchant_type",
             value:"ENTERPRISE"

        },
        {
           name: "registration_no",
            value:"18276147057",

        },
        {
           name: "contact_no",
            value:"18276147057"

        },{
            name: "contact_email",
            value:"queek.he@antcosa.com"

        },
        {
            name: "site_infos",
            value:siteInfos,

        },{
           name: "secondary_merchant_industry",
            value: "5812"


        },{
          name:"_input_charset",
          value:"UTF-8"

        },{
            name:"timestamp",
            value:timeone
        },{
            name:"sign",
            value:sha1key,
        },{
            name:"sign_type",
            value:"RSA"

        }
        ],












    json: true

}, (error, response, body) => {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }else{
        console.log(body);
        console.log(error);
        console.log(response)
        // console.log(response.statusCode)
        // console.log(body);


    }
})








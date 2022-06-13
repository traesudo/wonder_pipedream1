const rsa = require('js-crypto-rsa')
const request = require('request')
const { KEYUTIL, KJUR, hextob64 } =require( 'jsrsasign');
const uuid= require('node-uuid');
const axios = require('axios')
const rsaSign = require('rsasign')




const kyc = {
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

const config = {
    "url": "https://api.mch.weixin.qq.com",
    "CA_pem": "MIIDIDCCAomgAwIBAgIENd70zzANBgkqhkiG9w0BAQUFADBOMQswCQYDVQQGEwJVUzEQMA4GA1UEChMHRXF1aWZheDEtMCsGA1UECxMkRXF1aWZheCBTZWN1cmUgQ2VydGlmaWNhdGUgQXV0aG9yaXR5MB4XDTk4MDgyMjE2NDE1MVoXDTE4MDgyMjE2NDE1MVowTjELMAkGA1UEBhMCVVMxEDAOBgNVBAoTB0VxdWlmYXgxLTArBgNVBAsTJEVxdWlmYXggU2VjdXJlIENlcnRpZmljYXRlIEF1dGhvcml0eTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAwV2xWGcIYu6gmi0fCG2RFGiYCh7+2gRvE4RiIcPRfM6fBeC4AfBONOziipUEZKzxa1NfBbPLZ4C/QgKO/t0BCezhABRP/PvwDN1Dulsr4R+AcJkVV5MW8Q+XarfCaCMczE1ZMKxRHjuvK9buY0V7xdlfUNLjUA86iOe/FP3gx7kCAwEAAaOCAQkwggEFMHAGA1UdHwRpMGcwZaBjoGGkXzBdMQswCQYDVQQGEwJVUzEQMA4GA1UEChMHRXF1aWZheDEtMCsGA1UECxMkRXF1aWZheCBTZWN1cmUgQ2VydGlmaWNhdGUgQXV0aG9yaXR5MQ0wCwYDVQQDEwRDUkwxMBoGA1UdEAQTMBGBDzIwMTgwODIyMTY0MTUxWjALBgNVHQ8EBAMCAQYwHwYDVR0jBBgwFoAUSOZo+SvSspXXR9gjIBBPM5iQn9QwHQYDVR0OBBYEFEjmaPkr0rKV10fYIyAQTzOYkJ/UMAwGA1UdEwQFMAMBAf8wGgYJKoZIhvZ9B0EABA0wCxsFVjMuMGMDAgbAMA0GCSqGSIb3DQEBBQUAA4GBAFjOKer89961zgK5F7WF0bnj4JXMJTENAKaSbn+2kmOeUJXRmm/kEd5jhW6Y7qj/WsjTVbJmcVfewCHrPSqnI0kBBIZCe/zuf6IWUrVnZ9NA2zsmWLIodz2uFHdh1voqZiegDfqnc1zqcPGUIWVEX/r87yloqaKHee9570+sB3c4",
    "app_id": "wx31331a78e8a40eea",
    "serial_no": "57309C2E21D7D22688A6FC8A04245526E005A553",
    "client_key": "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCsD+mdN4HNCDlzQmhCQv9+9GHSS0Ee5TCx9Z8FSLpKiRYMH7/DBvQTPCIH299xyuChcZsQO4tA98njS70Ah6eVmOCn+iJmq08Fqk3kClMOEQTtAWT9CQHQl04BpTx4Tl9fKmLK263wcg1X/Y0PGxqTOSMw2DSoFn9frFBc8Z5X5e8bBZd9prDi+IFGKvMywvhpl2hCe0baghIP0Y2VWwHfcKM2OR4jQB8Yx7cBTV3kHMbOnVUiMHF+qQNnxZfJYgPVpp7DLClgGyHfWy+T0etPXyCwPYlnef+WHEbX1wh2IC9uzWWJQPuVnWXest9/GBgbpTol/jmXpzO+jmSKKCBLAgMBAAECggEAchhzL1+ZYR5tCjMk85t91O+01kA0xInySm+3rUdW0QoqZou/G1JHE2Iypsd0Wf7QCf5NduwlIUWuyFx2zh0mUZr4jireGPrMAdO2ptr5zEAY5higoPISFAHhJlIt0REXSQHQVPhrVSAsHQbzPOsaKjofTcpw0G1qtUSMXbWS7HFkTnr3D1VvRSN/Nb5LpxLourrErahxqPTxT+Is9Q1n48z3iSgdy+8NiGFZCCg/h45nPi3aVYA5auhfOBXOpggHKxp19jeDnINpRQIdDx4bgyVdkyV+rpDGjyogmdlokiLpAZtAD5RdTVO4PRjMSfoCBLjbQg8WkXSJrPXivJFtsQKBgQDR6FSg3MyGgK37CO95e6JjYFWLc4yqdCodEgDCQkoYCbKiasiyi5MTEisvVLbQBNixp55FTVwKifSDp+khAS+ly2YlkNalmaT+oZRLZuKL8XtE7GeE1mHknI4SNksfi8oMKNLNggQeMtXasLtDhlxhyQ04IlEURtxZyRN7peV6HwKBgQDR2CehF8uTltsIuUJM7QMzRoYjxwssXICjC9y2T5OcmaPICuJvmQ+pQ9KoWN+BzBkNSmewsxuXoV0yiuvAhfgQwjLM9YJhMkeXHBvq/WDKCm/FbJyAaddoFcSjME2DOGFPyuVppsS2QueOeTupqz6gziooSXrJuRxocnv7z17sVQKBgQCKKA+jfRBEqudYJg5wd/Zu0BYd3eTEwAaD8bh8I2NfJOrlScFk+sbHs5qm4WwdyELT004xsPQWn6xHBzpDFePFjPVjXkxY3KKjUbgoVMRhdYQ73hlYbj4qWPyNchzJ25kVnbz5tEx/j9f/w3jNvd6KIelIfBW/cdBQbC8doBhE4wKBgF5L7fL8CGU4IxFWfq6mywtdo6WsKh8zKjMaf4IFXGXAvNKF4Z8YfusnKSCxXy6qko9gYhwLQFjxEDpIJwyKpyCQw9dKc95Ng9IptXnxhm8EJZnn5qPl7AA/1+8lI4/V5BTBLjo90KO+iOODIwZph2kne9ZCvsSrRFLDL2fGlfdJAoGBAMGrnJeyB7OonAtoRvooaT26zem+ifLOQdAtVWzfyMIIwR0SXO+vFW7jxKM6jwVtKiTCFNsMus9ky4BlwUHjOaCFeQNhTm52jOHIMCPEWvEx3uhzVSef6Ky+pS3UWbVMSk/tbo0izdk60r6Axae4hJTxRIKfNN3DNiRbZcrkhEWI",
    "client_pem": "MIID3TCCAsWgAwIBAgIUVzCcLiHX0iaIpvyKBCRVJuAFpVMwDQYJKoZIhvcNAQELBQAwXjELMAkGA1UEBhMCQ04xEzARBgNVBAoTClRlbnBheS5jb20xHTAbBgNVBAsTFFRlbnBheS5jb20gQ0EgQ2VudGVyMRswGQYDVQQDExJUZW5wYXkuY29tIFJvb3QgQ0EwHhcNMTkwNTI0MDMwNzIzWhcNMjQwNTIyMDMwNzIzWjBvMRMwEQYDVQQDDAoxNTAxOTc3NDkxMRswGQYDVQQKDBLlvq7kv6HllYbmiLfns7vnu58xGzAZBgNVBAsMEkJpbmRvIExhYnMgTGltaXRlZDELMAkGA1UEBgwCQ04xETAPBgNVBAcMCFNoZW5aaGVuMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArA/pnTeBzQg5c0JoQkL/fvRh0ktBHuUwsfWfBUi6SokWDB+/wwb0EzwiB9vfccrgoXGbEDuLQPfJ40u9AIenlZjgp/oiZqtPBapN5ApTDhEE7QFk/QkB0JdOAaU8eE5fXypiytut8HINV/2NDxsakzkjMNg0qBZ/X6xQXPGeV+XvGwWXfaaw4viBRirzMsL4aZdoQntG2oISD9GNlVsB33CjNjkeI0AfGMe3AU1d5BzGzp1VIjBxfqkDZ8WXyWID1aaewywpYBsh31svk9HrT18gsD2JZ3n/lhxG19cIdiAvbs1liUD7lZ1l3rLffxgYG6U6Jf45l6czvo5kiiggSwIDAQABo4GBMH8wCQYDVR0TBAIwADALBgNVHQ8EBAMCBPAwZQYDVR0fBF4wXDBaoFigVoZUaHR0cDovL2V2Y2EuaXRydXMuY29tLmNuL3B1YmxpYy9pdHJ1c2NybD9DQT0xQkQ0MjIwRTUwREJDMDRCMDZBRDM5NzU0OTg0NkMwMUMzRThFQkQyMA0GCSqGSIb3DQEBCwUAA4IBAQCJkLxyBrOQti4/gHY6XM/Rr7x7tOE+d08B64aSeuVY7kTwbBRItXjl86VTrES4cOHF0cDTf+lCXvYECrIziVAbibRL0E9vI25PnUYV7gyGsciyfBNWYO31b3XRf/xU2fII8ioyqLgDatY31O8qTX3TNGM3dG9v9zAhqKSihpU/pi4tleMjT81n5ySIkIurGQdNayBQM9Ufx59ezIpoajXZjFISo9VfwMRTd41xEO7J8fJxG2Kznn7oEcVqjdvTLpNP9/ENVul+W8yNekhx3fae3gLGLONGpkdx+e97DCXV3PKpFc0IV7tDyLWuUI8CNb6Tl/9YebyGJDx5LIkZqH1e",
    "api_key": "bindo1501977491201806261600bindo",
    "custom_id": "1501977491"
}

const store = {
    "id": 537261,
    "name": "Zip",
    "country": "CN",
    "city": "Hongkong",
    "addr": "Test",
    "tel": "13152665206",
    "email": "sandy.jiang@bindo.com",
    "group_settlement_entity_id": 0,
    "currency": "AUD",
    "store_config": {
        "id": 537261,
        "created_at": "2021-10-21T07:00:05.676Z",
        "updated_at": "2021-10-21T07:00:05.676Z",
        "deleted_at": null,
        "GatewayFeeRuleID": 0,
        "SettlementCurrency": "AUD",
        "BRName": "",
        "SettlementAccount": "",
        "SettlementAccountName": "",
        "SettlementBankID": 0,
        "SettlementBankInfo": null,
        "Addition": null
    }
}

const str11 = {
    "sp_appid": config.app_id,
    "sp_mchid":"1501977491",//config.custom_id,
    "mchid":"1501977491",
    "name":"TASTE NEW LIMITED",
    "shortname":"DAB-PA ARTISAN",
    "office_phone":"+852 36112069",
    "contact":{"email":"303eHN0UNPa/6yUHLcWwJov6zCLoG+5KCnVqfUJWlm3+HN9EtnO1LyZ5d5boMSiE0kJ++2T7UdO67LrDRLJUQp7e8F3nRE1isQ8t7Qg4q1oHAp9ePszQs0qconJAZ0F/oEuSUMRkD/e3hkbNtSdP5wtETCLtCm28+oLNqclBxQ2vXPXmaXNennJVS9t/LOW6RRo3HBVJbB2L5hQMwxBzJNdaP0CSnrQyLmD29yZ2hKjGXQASR5G94vBf+Pspc3gSDWFsEnA/RRUlCobLsimp5hI5WFjyM0nYohCPTZg60B5m5fDHCTEqQlRFBQsVlrOvFdeGdUblK0+g5h2S5ST4wg==","name":"Dm9zN/CTg+/vOdqnP1wZ8CGRgFtBEkSCqDXQpW82PgjC37QHnMGK6MRRQA0oGWrGXWUy6sSFXFkp3NccJh9Gsf0AqSzGsddsuyaPGa4MrsvbrQEFoQgM+R8x3Ick7eMDLJV/Sc0MpM+qci7EVG31XyR4Nd0KcAr2s77hFNlw6J2rRwNnRfWtMWgW/4rkjxjeezjH/yABc2RbUUEu8Qn7Gs+WzVlocpZcHYJk60I01297hBUXyeWUFeWULBbP+KYV2s+xpwze8ZyX1tfmHl30jbUoAU1rsAZ062N08p0vxlG6OLzeT8WIdUOqALTMZwMMa5VNjCcTiJ7fypPskTS+qg==","phone":"a7v6m8HKI53jSvVjdkOyadZ7beAwfFJN5CdQHCo7HT/HnQbevUfb2TPgPa6ONB+tCWGwspySDM48XE8lObTNuHyd4fx5ddtx4Q81nmrpVPvKYFp074PUALV4H/fOQAZfl+CG6PhhdeFlShPImajTzBn9xA1fQVd+Yf8guFSfx7OrzG+ZvrGna34T+89PWPYqiQzXIkntDy+erK1mpkx/GbES4DgmjyjE7Jv4VhzYKj0IDLpRNSG7RHgcZsnu8OxCYer2XmHgSxuJTQSL8WQzGzvqUCKa7mTo5notXa/P/hu3TAdw+knWwKxXlvzDc+MjdAvFlHEYYRG35sFCgRNiOQ=="},
    "business_category": 343,//业务类别
    "merchant_country_code": "343",//商户代码从哪里获取？store.currency 对应的编码表
    "merchant_type": kyc.biz_structure,
    "registration_certificate_number": kyc.biz_reg_num,
    "registration_certificate_date": "2022-06-03",
    "settlement_bank_number": kyc.br_date_of_expiry,
    "business": {
        "business_type": "ONLINE",//商户类别
        "mcc": kyc.mcc,
        "mini_program": config.app_id,
        "store_address":store.addr
    },
    "director": {
        "name": "Tom",
        "number": "1234567890"
    }
}




//生成签名
const time1 =Math.floor(Date.now() / 1000);
console.log("请求时间戳=%d",time1);
// const time2= time1.toString()
// console.log("请求时间戳 time2=%d", time2)



const number1="C64984D1F1E262B1D7ECDF090A975A5B"
const mchid1="1501977491"
const serialvalue="57309C2E21D7D22688A6FC8A04245526E005A553"


// var data1 ="";
// var message = "POST" + "\n"
//     + "/hk/v3/merchants" + "\n"
//     + time1 + "\n"
//     + number1 + "\n"
//     + data1+"\n";
// var data={
//     "sp_appid":"wx31331a78e8a40eea",
//         "sp_mchid":"1501977491",
//         "name":"TASTE NEW LIMITED",
//         "shortname":"DAB-PA ARTISAN",
//         "office_phone":"+852 36112069",
//         "contact":{
//         "email":"1905235553@qq.com",
//             "name":"TASTE NEW LIMITED",
//             "phone":"+852 36112069"
//     },
//     "business_category":656,
//         "merchant_country_code":"344",
//         "merchant_type":"ENTERPRISE",
//         "registration_certificate_number":"5996903301406210",
//         "registration_certificate_date":"2021-06-18",
//         "settlement_bank_number":"",
//         "business":{"business_type":"ONLINE","mcc":"5812","mini_program":"flowerplus","store_address":"SHOP NO.B111 B1/F  K11 MUSEA VICTORIA DOCKSIDE 18 SALISBURY RD TSIM SHA TSUI KL"},
//     "director":{"name":"","number":""}
// }
var data1={
    "sp_appid":"wx31331a78e8a40eea",
    "sp_mchid":"1501977491",
    "name":"TASTE NEW LIMITED",
    "shortname":"DAB-PA ARTISAN",
    "office_phone":"+852 36112069",
    "contact":{
        "email":"1905235553@qq.com",
        "name":"TASTE NEW LIMITED",
        "phone":"+852 36112069"
    },
    "business_category":656,
    "merchant_country_code":"344",
    "merchant_type":"ENTERPRISE",
    "registration_certificate_number":"5996903301406210",
    "registration_certificate_date":"2021-06-18",
    "settlement_bank_number":"",
    "business":{"business_type":"ONLINE","mcc":"5812","mini_program":"flowerplus","store_address":"SHOP NO.B111 B1/F  K11 MUSEA VICTORIA DOCKSIDE 18 SALISBURY RD TSIM SHA TSUI KL"},
    "director":{"name":"","number":""}
}
var data2 = {"sp_appid":"wx31331a78e8a40eea","sp_mchid":"1501977491","name":"TASTE NEW LIMITED","shortname":"DAB-PA ARTISAN","office_phone":"+852 36112069","contact":{"email":"1905235553@qq.com","name":"TASTE NEW LIMITED","phone":"+852 36112069"},"business_category":656,"merchant_country_code":"344","merchant_type":"ENTERPRISE","registration_certificate_number":"5996903301406210","registration_certificate_date":"2021-06-18","settlement_bank_number":"","business":{"business_type":"ONLINE","mcc":"5812","mini_program":"flowerplus","store_address":"SHOP NO.B111 B1/F  K11 MUSEA VICTORIA DOCKSIDE 18 SALISBURY RD TSIM SHA TSUI KL"},"director":{"name":"","number":""}}
// var str2=''
var str1 = JSON.stringify(data1);
// var message = "POST" + "\n"
//     + "/hk/v3/merchants" + "\n"
//     + time1 + "\n"
//     + number1 + "\n"
//     + str1 + "\n";
//
// var data = "";
// var message = "POST" + "\n"
//     + "/hk/v3/merchants" + "\n"
//     + time1 + "\n"
//     + number1 + "\n"
//     + str1 + "\n";
var nullstr = "";
console.log(str1)
var message = `POST\n/hk/v3/merchants\n${time1}\n${number1}\n${str1}\n`
console.log("获取message+++++++++++")
console.log(message)

var OffLineprivatekey=
    `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCsD+mdN4HNCDlzQmhCQv9+9GHSS0Ee5TCx9Z8FSLpKiRYMH7/DBvQTPCIH299xyuChcZsQO4tA98njS70Ah6eVmOCn+iJmq08Fqk3kClMOEQTtAWT9CQHQl04BpTx4Tl9fKmLK263wcg1X/Y0PGxqTOSMw2DSoFn9frFBc8Z5X5e8bBZd9prDi+IFGKvMywvhpl2hCe0baghIP0Y2VWwHfcKM2OR4jQB8Yx7cBTV3kHMbOnVUiMHF+qQNnxZfJYgPVpp7DLClgGyHfWy+T0etPXyCwPYlnef+WHEbX1wh2IC9uzWWJQPuVnWXest9/GBgbpTol/jmXpzO+jmSKKCBLAgMBAAECggEAchhzL1+ZYR5tCjMk85t91O+01kA0xInySm+3rUdW0QoqZou/G1JHE2Iypsd0Wf7QCf5NduwlIUWuyFx2zh0mUZr4jireGPrMAdO2ptr5zEAY5higoPISFAHhJlIt0REXSQHQVPhrVSAsHQbzPOsaKjofTcpw0G1qtUSMXbWS7HFkTnr3D1VvRSN/Nb5LpxLourrErahxqPTxT+Is9Q1n48z3iSgdy+8NiGFZCCg/h45nPi3aVYA5auhfOBXOpggHKxp19jeDnINpRQIdDx4bgyVdkyV+rpDGjyogmdlokiLpAZtAD5RdTVO4PRjMSfoCBLjbQg8WkXSJrPXivJFtsQKBgQDR6FSg3MyGgK37CO95e6JjYFWLc4yqdCodEgDCQkoYCbKiasiyi5MTEisvVLbQBNixp55FTVwKifSDp+khAS+ly2YlkNalmaT+oZRLZuKL8XtE7GeE1mHknI4SNksfi8oMKNLNggQeMtXasLtDhlxhyQ04IlEURtxZyRN7peV6HwKBgQDR2CehF8uTltsIuUJM7QMzRoYjxwssXICjC9y2T5OcmaPICuJvmQ+pQ9KoWN+BzBkNSmewsxuXoV0yiuvAhfgQwjLM9YJhMkeXHBvq/WDKCm/FbJyAaddoFcSjME2DOGFPyuVppsS2QueOeTupqz6gziooSXrJuRxocnv7z17sVQKBgQCKKA+jfRBEqudYJg5wd/Zu0BYd3eTEwAaD8bh8I2NfJOrlScFk+sbHs5qm4WwdyELT004xsPQWn6xHBzpDFePFjPVjXkxY3KKjUbgoVMRhdYQ73hlYbj4qWPyNchzJ25kVnbz5tEx/j9f/w3jNvd6KIelIfBW/cdBQbC8doBhE4wKBgF5L7fL8CGU4IxFWfq6mywtdo6WsKh8zKjMaf4IFXGXAvNKF4Z8YfusnKSCxXy6qko9gYhwLQFjxEDpIJwyKpyCQw9dKc95Ng9IptXnxhm8EJZnn5qPl7AA/1+8lI4/V5BTBLjo90KO+iOODIwZph2kne9ZCvsSrRFLDL2fGlfdJAoGBAMGrnJeyB7OonAtoRvooaT26zem+ifLOQdAtVWzfyMIIwR0SXO+vFW7jxKM6jwVtKiTCFNsMus9ky4BlwUHjOaCFeQNhTm52jOHIMCPEWvEx3uhzVSef6Ky+pS3UWbVMSk/tbo0izdk60r6Axae4hJTxRIKfNN3DNiRbZcrkhEWI
-----END PRIVATE KEY-----`// var sign = crypto.createSign("RSA-SHA256");


//签名
function sha256withRSA(inputString){
    const key = KEYUTIL.getKey(OffLineprivatekey);
    // 创建 Signature 对象，设置签名编码算法
    const signature = new KJUR.crypto.Signature({ alg: 'SHA256withRSA' });
    // 初始化
    signature.init(key);
    // 传入待加密字符串
    signature.updateString(inputString);
    // 生成密文
    const originSign = signature.sign();
    const sign64 = hextob64(originSign);
    console.log('sign base64 =======', sign64);
    // const sign64u = hextob64u(originSign);
    // console.log('sign base64u=======', sign64u);
    return sign64;
}


//加密phone、name、eamil 这一步需要获取证书中的keys

const iu=uuid.v4()
console.log("iu++++++",iu)
var keysign= sha256withRSA(message)

var keyso="O10bxHbOKwZUAzuc9HTVhc+ERB0W7ezfQc4c6obFssw/FUcLnzGbnwbiMR5ptFiCs0BcOTvc5N0G1w4PYrJ67LoCX82PkFgMR+eQDGT5r7gFLYiqLmHzNwoqFvMtbS33QakBGV8P3y0mC4tRFuNCDMsGKRRnNcA68bF7FhXXGJWkHBKLLHDKKjM2stZSR1KbgiEiU+v9fGLE1Gj+i1mhmL3/hKvUctmvm2ZPcXUYKqb7puwRjlxSOlTW1l1U0Ln+qVgUhDn7MIFPabePO+EuA+Aqn1qBMUXGdwYZ10G+5Axu7qIRDbzPhweb/3SMXoZ4kQFvUx6I2LYBpktVsbf/bw=="

// var str = params2.join("&");//签名拼接字符串
var finstr =`WECHATPAY2-SHA256-RSA2048 mchid="${mchid1}",serial_no="${serialvalue}",nonce_str="${number1}",timestamp="${time1}",signature="${keysign}"`
console.log("get finstr info",finstr)
axios({
    method: "post",
    url: 'https://api.mch.weixin.qq.com/hk/v3/merchants',
    headers: {
        "content-type": "application/json",
        //"Accept": "application/json",
        "authorization": finstr,
        "User-Agent": "bindo",
        "Wechatpay-Serial": "7BB360C3537D73A05E75A9AF63EEEB2F11C33B07",
        "Idempotency-Key": iu,
        //"mchid":"1501977491"
    },
    data:data1,
}).then(function (response) {
    console.log(response)
}).catch((err)=>{
    console.log(err)
});

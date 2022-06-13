const uuid= require('node-uuid');
const request = require('request')




const iu=uuid.v4()

const data1={"sp_appid":"wx31331a78e8a40eea","sp_mchid":"1501977491","name":"TASTE NEW LIMITED","shortname":"DAB-PA ARTISAN","office_phone":"+852 36112069","contact":{"email":"303eHN0UNPa/6yUHLcWwJov6zCLoG+5KCnVqfUJWlm3+HN9EtnO1LyZ5d5boMSiE0kJ++2T7UdO67LrDRLJUQp7e8F3nRE1isQ8t7Qg4q1oHAp9ePszQs0qconJAZ0F/oEuSUMRkD/e3hkbNtSdP5wtETCLtCm28+oLNqclBxQ2vXPXmaXNennJVS9t/LOW6RRo3HBVJbB2L5hQMwxBzJNdaP0CSnrQyLmD29yZ2hKjGXQASR5G94vBf+Pspc3gSDWFsEnA/RRUlCobLsimp5hI5WFjyM0nYohCPTZg60B5m5fDHCTEqQlRFBQsVlrOvFdeGdUblK0+g5h2S5ST4wg==","name":"Dm9zN/CTg+/vOdqnP1wZ8CGRgFtBEkSCqDXQpW82PgjC37QHnMGK6MRRQA0oGWrGXWUy6sSFXFkp3NccJh9Gsf0AqSzGsddsuyaPGa4MrsvbrQEFoQgM+R8x3Ick7eMDLJV/Sc0MpM+qci7EVG31XyR4Nd0KcAr2s77hFNlw6J2rRwNnRfWtMWgW/4rkjxjeezjH/yABc2RbUUEu8Qn7Gs+WzVlocpZcHYJk60I01297hBUXyeWUFeWULBbP+KYV2s+xpwze8ZyX1tfmHl30jbUoAU1rsAZ062N08p0vxlG6OLzeT8WIdUOqALTMZwMMa5VNjCcTiJ7fypPskTS+qg==","phone":"a7v6m8HKI53jSvVjdkOyadZ7beAwfFJN5CdQHCo7HT/HnQbevUfb2TPgPa6ONB+tCWGwspySDM48XE8lObTNuHyd4fx5ddtx4Q81nmrpVPvKYFp074PUALV4H/fOQAZfl+CG6PhhdeFlShPImajTzBn9xA1fQVd+Yf8guFSfx7OrzG+ZvrGna34T+89PWPYqiQzXIkntDy+erK1mpkx/GbES4DgmjyjE7Jv4VhzYKj0IDLpRNSG7RHgcZsnu8OxCYer2XmHgSxuJTQSL8WQzGzvqUCKa7mTo5notXa/P/hu3TAdw+knWwKxXlvzDc+MjdAvFlHEYYRG35sFCgRNiOQ=="},"business_category":656,"merchant_country_code":"344","merchant_type":"ENTERPRISE","registration_certificate_number":"5996903301406210","registration_certificate_date":"2021-06-18","settlement_bank_number":"","business":{"business_type":"ONLINE","mcc":"5812","mini_program":"flowerplus","store_address":"SHOP NO.B111 B1/F  K11 MUSEA VICTORIA DOCKSIDE 18 SALISBURY RD TSIM SHA TSUI KL"},"director":{"name":"","number":""}}
const finter= `WECHATPAY2-SHA256-RSA2048 mchid="1501977491",nonce_str="59SUgTDANlU0MxvHeOOAYmO8a7fvA3hT",signature="fxJwmR9Fh1hBr1gk+2JWtZBieu15OJydcZeNJ+KWhL1iRGp4v48gqU3Wkk9pfTiA7zL3oLr9L1lCGGuTgjsnl2NUHiGUU182hQ7bVmD6l3/tIgRP8+Ixmw2ozn/jGT+li1NAmvSNnFT4tjfZMFq1jBwKwMXfXL1+If4Z5CSbAteeb3hkhPj6nROYzl0OtADdo84Ch4vR4LOSuVPLLCtnhfDFCQDMBSkCMGxGZ1OdM1dZASF69DrPGjCHHlIdVlNZ0hpsCtjSoGMhe2QVVj6sxIeVu9QcpgF4dEX+eaGndTIOSP7pYp56dv+uAht80rpmn96agAoRDIAa4pPNKe73RA==",timestamp="1651923480",serial_no="57309C2E21D7D22688A6FC8A04245526E005A553"`
request({
        method: "post",
        url: 'https://api.mch.weixin.qq.com/hk/v3/merchants',
        headers: {
            "content-type":"application/json",
            "Accept":"application/json",
            "authorization": finter,
            "User-Agent":"bindo",
            "Wechatpay-Serial":"7BB360C3537D73A05E75A9AF63EEEB2F11C33B07",
            "Idempotency-Key":iu,
            //"mchid":"1501977491"
        },
        data:data1,
    },function(err, httpResponse, data){
        if (err) {
            console.log(err);
            console.log(httpResponse)

        } else {
            console.log(`data:${data}`)
        }
    }
)

console.log(data1.sp_mchid,"++++++++++")
console.log()
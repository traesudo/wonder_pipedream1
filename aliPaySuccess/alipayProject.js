import  { KEYUTIL, KJUR, hextob64 } from 'jsrsasign';
import {axios} from '@pipedream/platform';
import  Aes from 'aes-256-gcm'
import uuid from 'node-uuid';
import crypto from 'crypto';
import fs from 'fs'
import  xml2js from 'xml2js'

const parseString = xml2js.parseString


const OffLineprivatekey = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCVHTS3Ol3iI/DhrSLg0hYPlXR5T32HX4M8shTt3tm0srEdsf3csgef9k6JvBdCZR2chRCCjyw2Ztb9zI/j1R/GeTmXGua/7nR0hiOsw+1jUEc/a1RAr2VG4qx+PzqY9aH/Xakak2W9A1kM8s17Rtn2CuSWXbVLus3ETFcSSTn16BuRJ4qJQvVsQ4nlQyKc23KXR+Y/g6nwNeikBffcuQFv7kZ7syEbZBhfn104zgIAcvEFPp2NjNL+IRYF7p+zQ95KDPI5gSpTRg998mOlv7gBzJNtY0cX8GeSr3/sCUmN1s2DiEBNwevyCPF61XNhPpvnySf4Fv9lbVieKZaeejxHAgMBAAECggEAE2ozE+xIjwoo8elOEkGoV60Y9jaQXJDmEIALU5FhfTKK9xfWuuZ/MaerQCm6SY3K1jdJGAa2Nfsb4P3CemKkeX4NLox1IOZWSVmxyWvVO8oXDL3XwXhU0m7vEJ0A7yuERTCXtPseEwcdkB8I/BUUigGPE7jtwwd2hSl/aMUaA9da3aBUxRFykaao7kmoDuipI7VzMtB45QLBKbzbhos0WlON98ZYIimAhso7X+2faAW8N9yO3M35S2nuBo1NdRVA3Ml+1NtFJ/jO3ddTevcybzEYQK19ecJennwfeuRw1YUeDkgibW9OXczklZNn4kMnNofnpO1d9xfAoKGokHSdCQKBgQDK0EKikNddcixWroAECRruSBBU3VJjHqHsj67+sr/QxPejReg5tflESEYrPHYY40ofQIuj/LDHy1c0k/eriaA51js6S1UQUJVHa9RPDR/yKLYmYM7qNyIkH64QpVi+hjeXsNTGEpXOSXMiHt1XzrYsKbKCoSr0iK9DwL0WUcYRRQKBgQC8N992y0MSrcLCYY5logp/juRRQ1x1AYfMiva4vUmJTiwuSSJM0J9XAe9Q8S7b5N99RGQM0NOzUDaIHgL0NgnT+RqK8rML5xcuLN9tqTHGy98HzVCV5yP+10b6eyn+/Eht+SgpJqEoCSa0QQ70bkpZjRfPhrasb06D+k5vIrJiGwKBgQCrPfK1XkRpYyhqvAXc4m85t+EKNqEEje28Vok0BmsM8/H/itwMNkjUTY3pnbA9TVPdVVtSR95fo6HrA/B/hsGhc/AoRUj6cH/KgRIO+Q77IULC3sR2X7zU8WbAKUvn+l1gF+9fmnugZMXwjkzngeKxITfXMguZ0vrg4xEEkmEBXQKBgBGMK/tJTAGLzaKNsdbr2oq16bdhzlbiQ6TgN8xVaWuxrBDMpLQApzpXZdZoBfReTC/DlohTV8lZ6xuZoLDf8N6gVMcrhWHQs6qMaHAy2/8qtqpli+PN3t89dtKXdPzezGnkVsgvX8r5v3ACuMA1IB1lOBkS+CjvX6SSS4m09GiNAoGAV6ViRwdXLqsxlK/S3jPYaG1SOClgRxa1gd07aLSFGC4MqfEN+cFS3k8LH9xLVl9h7Im7cMHVrJ9OvfCflpqdOVhn4Q+pfU00zGx7S3kTvVTuMYPx3/XpY1Nz24ucwt0aXdq6e/XY27PP4I8BvDDrlygks45yoRTxV9OGeCuNb7o=\n-----END PRIVATE KEY-----"



class ApplicationAlipay{
    async runTask($,key) {
        //step1 获取application 数据
        //var application_company='521256'
        var applicaiotnInfo =await this.getApplication($,key)
        console.log("查看applicaiotnInfo",applicaiotnInfo)
        var search_company=applicaiotnInfo.data.application_company

        //step2 获取company数据
        const companyInfo =  await this.getCompany($,search_company)
        console.log("查看获取的companyInfo",companyInfo)
        console.log("查看获取的companyInfo的id++++++++",companyInfo.data.id)
        var search_business=applicaiotnInfo.data.application_business
        console.log("查看search_business........",search_business)
        var search_br=companyInfo.data.hk_brs[0]
        console.log(typeof search_br)
        var businessInfo = await this.getBusiness($,search_business)
        console.log("查看获取的businessInfo",businessInfo)


        //console.log("查看search_business",search_business)

        //step3 getbusiness是否存在
        console.log(typeof search_br )
        //step4 获取hk_br
        var br =  await this.getHkBr($,search_br)
        //获取最新的BR
        var  brInfo   =  await this.getSelectHkBr($,br.data)
        console.log("查看获取的brInfo",brInfo)
        //console.log("查看brInfo长度",brInfo)
        if(companyInfo.data.id==null){
            return console.log("没有找到company")
        }else{
            //if
            if(businessInfo.data.id==null){
                //step5 company数据填充business
                var businessModel={

                    "business_phone": applicaiotnInfo.data.natural_person_phone,//application
                    "business_email": applicaiotnInfo.data.natural_person_email,
                    "merchant_contact_email": applicaiotnInfo.data.natural_person_email,
                    "business_name_dba": null,
                    "business_id": null,
                    "business_name": companyInfo.data.name_of_business_corporation_english,//name_of_business
                    "settlement_entity_type": "Individual2 Operating Entity",//company_type??
                    "omnichannel": "Offline",
                    "company": companyInfo.id,//id
                    "merchant_category": 109,//
                    "sales_marketing_campaign": 2,// 又是什么？
                    "fee_group": 12,
                    "partner_channel": "d315d99c-fd35-4a81-b27d-8f1d0d01f991",//applicaiotnInfo.data.partner_channel,//又是什么？
                    "country": companyInfo.data.country,//HK?
                    //"join_code": "08c23d31-e17e-11ec-b642-fa163e0f78f5",
                }
                console.log("打印businessModel",businessModel)
                var padStatus = await this.padBusiness($,businessModel)
                console.log("填充成功business",padStatus)
                console.log("查看padStatus.data.id",padStatus.data.id)
                var businessId=padStatus.data.id
                //回写
                var updateAppStatus = await this.updateApplication($,businessId,search_company)
                console.log("回写updateAppStatus",updateAppStatus)
                var updateAppStatus1=await this.updateApplicationBusiness($,businessId,key)
                console.log("查看key是否存在",key)
                console.log("回写updateAppStatus_business",updateAppStatus1)
                if(brInfo.id==null){



                    //存在BR
                }else{

                    //br数据写alipay request
                    console.log("存在brInfo,填充alipay request model")
                    const site_infos=[{
                        site_type: "WEB",
                        site_url: applicaiotnInfo.data.url,
                    }]
                    const stringsiteInfos = JSON.stringify(site_infos)
                    const time3=Math.floor(Date.now())
                    if(companyInfo.data.company_type=='Private unlimited company'){
                        var merchant_typeVal='INDIVIDUAL'
                    }
                    if(companyInfo.data.company_type=='Private company limited by shares' || companyInfo.data.company_type=='Company limited by guarantee' ||companyInfo.data.company_type=='Public unlimited company' ||companyInfo.data.company_type=='Public company limited by shares' ){
                        var merchant_typeVal='ENTERPRISE'
                    }

                    var dataobj = {
                        // "ConfigUrl":Config.url,
                        // "OwnRsaPrivKey":
                        //     "service":"alipay.overseas.secmerchant.online.maintain",
                        "secondary_merchant_name":padStatus.data.business_name,
                        "secondary_merchant_id":padStatus.data.id,
                        "store_name":padStatus.data.business_name,
                        "store_country":"HK",
                        "store_address":brInfo.company_address,
                        "register_country":"HK",
                        "register_address":brInfo.company_address,
                        "secondary_merchant_type":merchant_typeVal,//增加判断
                        "registration_no":brInfo.br_number_with_check_digit,
                        "site_infos":stringsiteInfos,
                        "contact_no":applicaiotnInfo.data.natural_person_phone,
                        "contact_email":applicaiotnInfo.data.natural_person_email,
                        "_input_charset":"UTF-8",
                        "store_id":padStatus.data.id,//ref_id
                        "timestamp":time3,


                    };
                    console.log("查看businessInfo.omnichannel,off or on",businessInfo.data.omnichannel)
                    console.log("查看applicaiotnInfo.website_url",)
                    if(businessInfo.data.omnichannel=='Offline'|| typeof applicaiotnInfo.website_url=="undefined"){
                        console.log("线下++++++++++++++++++")
                        var str1  = await this.createUrloff($,dataobj)
                        var appMidInfo  = await this.applicationMID($,str1)
                        //  console.log("off申请MID后信息",appMidInfo)
                        // var xml = "<root>Hello xml2js!</root>"
                        // appMidInfo="<alipay><is_success>F</is_success></alipay>"
                        parseString(appMidInfo, function (err, result) {
                            var sumStatus=result.alipay.is_success[0]
                            console.log(result.alipay.is_success[0]);
                            if(sumStatus=="F"){
                                try{
                                    console.log("申请MID失败,请查看",result.alipay.error)
                                }catch(err){
                                    console.log(err)
                                }
                            }else{
                                //写入MID
                                var subStatus = this.writeonbordInfo($,businessInfo)
                                console.log("写入成功",subStatus)

                            }
                        });

                        // // parseString(xml, function (err, result) {
                        // // console.log("result")
                        // // console.dir(result);
                    }

                    //线上
                    else{
                        var str2  = await this.createUrlon($,dataobj)
                        console.log("str2",str2)
                        var appMidInfo  = await this.applicationMID($,str2)
                        // console.log("on申请MID后信息",appMidInfo)
                        // appMidInfo="<alipay><is_success>F</is_success></alipay>"
                        parseString(appMidInfo, function (err, result) {
                            var sumStatus=result.alipay.is_success[0]
                            console.log(result.alipay.is_success[0]);
                            if(sumStatus=="F"){
                                console.log("申请MID失败,请查看",result.alipay.error)
                            }else{
                                //写入MID
                                var subStatus =  this.writeonbordInfo($,businessInfo)
                                console.log("写入成功",subStatus)

                            }
                        });

                    }


                    //区分br
                }
                //区分是否存在busines。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
            }else{
                //step7获取br，区分是否存在brInfo
                if(brInfo.id==null){

                }else{
                    //br数据写alipay request
                    console.log("存在brInfo,填充alipay request model")
                    const site_infos=[{
                        site_type: "WEB",
                        site_url: applicaiotnInfo.data.url,
                    }]
                    const stringsiteInfos = JSON.stringify(site_infos)
                    const time3=Math.floor(Date.now())
                    if(companyInfo.data.company_type=='Private unlimited company'){
                        var merchant_typeVal='INDIVIDUAL'
                    }
                    if(companyInfo.data.company_type=='Private company limited by shares' || companyInfo.data.company_type=='Company limited by guarantee' ||companyInfo.data.company_type=='Public unlimited company' ||companyInfo.data.company_type=='Public company limited by shares' ){
                        var merchant_typeVal='ENTERPRISE'
                    }

                    var dataobj = {
                        // "ConfigUrl":Config.url,
                        // "OwnRsaPrivKey":
                        //     "service":"alipay.overseas.secmerchant.online.maintain",
                        "secondary_merchant_name":businessInfo.data.business_name,
                        "secondary_merchant_id":businessInfo.data.id,
                        "store_name":businessInfo.data.business_name,
                        "store_country":"HK",
                        "store_address":brInfo.company_address,
                        "register_country":"HK",
                        "register_address":brInfo.company_address,
                        "secondary_merchant_type":merchant_typeVal,//增加判断
                        "registration_no":brInfo.br_number_with_check_digit,
                        "site_infos":stringsiteInfos,
                        "contact_no":applicaiotnInfo.data.natural_person_phone,
                        "contact_email":applicaiotnInfo.data.natural_person_email,
                        "_input_charset":"UTF-8",
                        "store_id":businessInfo.data.id,//ref_id
                        "timestamp":time3,


                    };
                    console.log("查看businessInfo.omnichannel,off or on",businessInfo.data.omnichannel)
                    if(businessInfo.data.omnichannel=='Offline'|| applicaiotnInfo.data.website_url==null){
                        var str1  = await this.createUrloff($,dataobj)
                        var appMidInfo  = await this.applicationMID($,str1)
                        //  console.log("off申请MID后信息",appMidInfo)
                        // var xml = "<root>Hello xml2js!</root>"

                        parseString(appMidInfo, function (err, result) {
                            var sumStatus=result.alipay.is_success[0]
                            console.log(result.alipay.is_success[0]);
                            if(sumStatus=="F"){
                                try{
                                    console.log("申请MID失败,请查看",result.alipay.error)
                                }catch(err){
                                    console.log(err)
                                }
                            }else{
                                //写入MID
                                var subStatus =  this.writeonbordInfo($,businessInfo)
                                console.log("写入成功",subStatus)

                            }
                        });

                        // // parseString(xml, function (err, result) {
                        // // console.log("result")
                        // // console.dir(result);
                    }


                    else{
                        var str2  = await this.createUrlon($,dataobj)
                        console.log("str2",str2)
                        // var appMidInfo  = await this.applicationMID($,str2)
                        console.log("on申请MID后信息",appMidInfo)
                        // appMidInfo="<alipay><is_success>F</is_success></alipay>"
                        parseString(appMidInfo, function (err, result) {
                            var sumStatus=result.alipay.is_success[0]
                            console.log(result.alipay.is_success[0]);
                            if(sumStatus=="F"){
                                console.log("申请MID失败,请查看",result.alipay.error)
                            }else{
                                //写入MID
                                var subStatus =  this.writeonbordInfo($,businessInfo)
                                console.log("写入成功",subStatus)

                            }
                        });

                    }

                    //申请

                }
                //step8申请MID
            }
        }


    }
    //step1
    async getApplication($,key){
        console.log("查看getApplication中的key",key)
        var applicaiotnInfo = await axios($,{
            method:"get",
            url:"https://wonder_registry.bindolabs.com/items/business_applications/"+key,
            headers:{authorization:"Bearer input_in"},

        });
        return applicaiotnInfo

    }

    //step2
    async getCompany($,application_company){
        var companyInfo = await axios($,{
            method:"get",
            url:"https://wonder_registry.bindolabs.com/items/companies/"+application_company,
            headers:{authorization:"Bearer input_in"},

        });
        return companyInfo

    }
    //step3
    async getBusiness($,search_business){
        try{
            var businessInfo = await  axios($,{
                method:"get",
                url:"https://wonder_registry.bindolabs.com/items/businesses/" +search_business,
                headers:{authorization:"Bearer input_in"},
            });
            return businessInfo

        }catch(err){
            return businessInfo={data:{}}
        }
    }
    //step4
    async getHkBr($,search_br){
        try{
            var brInfo = await axios($,{
                method:"get",
                url:"https://wonder_registry.bindolabs.com/items/hk_brs/"+search_br,
                headers:{authorization:"Bearer input_in"},
            });
            return brInfo
        }catch(err){
            return brInfo={data:{}}
        }
    }
    //post business
    async padBusiness($,businessModel){
        console.log("进入方法查看businessModel",businessModel)
        //console.log("查看padBusiness中的businessModel",businessModel)
        var padStatusInfo = await axios($,{
            method:"post",
            url:"https://wonder_registry.bindolabs.com/items/businesses",
            headers:{authorization:"Bearer input_in"},
            data:businessModel,
        });
        return padStatusInfo
    }
    //updateCompany
    async updateApplication($,businessId,search_company){
        console.log("是否进入？")
        var x=[businessId]
        var updateStatus = await axios($,{
            method:"patch",
            url:"https://wonder_registry.bindolabs.com/items/companies/"+search_company,
            headers:{authorization:"Bearer input_in"},
            data:{businesses:x},
        });
        return updateStatus
    }
    //updateapplication_business
    async updateApplicationBusiness($,businessId,key){
        console.log("businessId+++++++",businessId)
        console.log("key++++++++++++++",key)
        var updateStatus1 = await axios($,{
            method:"patch",
            url:"https://wonder_registry.bindolabs.com/items/business_applications/"+key,
            headers:{authorization:"Bearer input_in"},
            data:{application_business:businessId},
        });
        return updateStatus1
    }
    //crate str1 url on
    async createUrlon($,dataobj){
        dataobj.partner='2088721222565561',
            dataobj.secondary_merchant_industry="5812",//mcc
            dataobj.service = 'alipay.overseas.secmerchant.online.maintain'
        console.log("查看入参的完整性=========",dataobj)
        var keylist = Object.keys(dataobj)
            .sort();
        var params = [];//生成签名参数数组
        var params2 = [];//最终参数拼接字符串数组，所有一级 value（biz_content 作为一个 value）进行 encode
        for (var i = 0; i < keylist.length; i++) {
            var v = keylist[i];
            params.push(v + "=" + dataobj[v]);
            params2.push(v + "=" + encodeURIComponent(dataobj[v]));
        }
        console.log("排序")
        var str = params.join("&");//签名拼接字符串
        //key on line
        const privatekey = "-----BEGIN PRIVATE KEY-----\nMIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAN5GI4ENpOnEzEeySULGRTa08Xl1J6NLJgeeyyu+unasrjTneo61+S9tat59hvT9pMAd2ACMD2/OQkp2HEfJ3CH/QUlC9FNauT9h6jmRnT6hPEHHbo0bROIB9JdGmCRQ8hOkvEl1rG3eEXuXzjCc5VPRZy9RQTpH3QItoyRDVQ9JAgMBAAECgYAPnyJTqZ/Thi9NQqx/cuveYm0uOhulEF0F4BUrZ+Y2/P/pW/NzIDr5KFmAdZYMld8EWZSaxT04gGiMTyzBpuA/qebu3xTSVc/RQ26GwlaXTY4PPPDbBiSN3v2Ogku9MktTM+byqRjWcqi+yMn6gXB3vwWVSDnbStmfRAnDBIP8YQJBAPBHNvXvatVXf1n/jCXi4nbY0BISwaiu8eTlGsqSoQm3JfD2OMrcCX4tgYgvjfO4jjELOe2sawRiCsL7OcLnh0UCQQDs0VgbrnVvlgviIluPOVLuZdh5qSngqCrUukE+pdUzajL/WorwpmYuW7nyrQOfyI0vkdqcNZKkeLyh2FKkf7Y1AkAMLA9kthQ7aotRC9kVskC2tJUV1U1qNjKa3eBVksgFrfmGE3MdE7iHY9bEB2SxjA/n/CGbILjrJ+xTpFZwwTnhAkBPvh5hE9nPfUL7Hn6eN7tJM1o1fVTwpS/m+eDGa6ji6zvI6IAokJ+PtKtkoAW8ZBfGkOJ//zolz9IU3XbWlXqRAkAN4mUtBpbZ0xssaSPMO2/YPIReix83I8VwYZGbxNiYTQAKS1U9yAGjJwrBBLZ26wv5n/c7PwGq9nn4tb/41irg\n-----END PRIVATE KEY-----"
        //生成签名
        var sign = crypto.createSign("RSA-SHA1");
        sign.update(str);
        var signature = sign.sign(privatekey, "base64");
        var sign1 = encodeURIComponent(signature)
        var sign_type1 = encodeURIComponent('RSA')
        console.log(signature)
        params2.splice(12, 0, 'sign=' + sign1)
        params2.splice(13, 0, 'sign_type=' + sign_type1)
        var str2 = params2.join("&");//签名拼接字符串
        console.log("申请的线上")
        return str2;
    }



    //crate str1 url off
    async createUrloff($,dataobj){
        dataobj.partner ='2088721226070997',
            dataobj.service = 'alipay.overseas.secmerchant.offline.maintain'
        dataobj.store_industry='5812'
        console.log("查看入参的完整性=========",dataobj)
        var keylist = Object.keys(dataobj)
            .sort();

        var params = [];//生成签名参数数组
        var params2 = [];//最终参数拼接字符串数组，所有一级 value（biz_content 作为一个 value）进行 encode
        for (var i = 0; i < keylist.length; i++) {
            var v = keylist[i];
            params.push(v + "=" + dataobj[v]);
            params2.push(v + "=" + encodeURIComponent(dataobj[v]));
        }
        var str = params.join("&");
        console.log("签名拼接字符串")
        //key on line
        //生成签名
        var sign = crypto.createSign("RSA-SHA256");
        sign.update(str);
        var signature = sign.sign(OffLineprivatekey, "base64");
        var sign1 = encodeURIComponent(signature)
        var sign_type1 = encodeURIComponent('RSA2')
        params2.splice(12, 0, 'sign=' + sign1)
        params2.splice(13, 0, 'sign_type=' + sign_type1)
        var str1 = params2.join("&");
        console.log(str1)
        return str1
    }
    async  getSelectHkBr($,hkBr){
        console.log("Br.............Latest time  of  Br................")
        var number1 = [];
        for(var k=0;k<hkBr.length;k++){
            var  stringDate= hkBr[k].date_created
            var  date1   =new Date(stringDate)
            number1.push(date1)
        }
        console.log("是否进入")
        for(var i=0;i<number1.length-1;i++){
            for (var j = 0; j < number1.length - 1; j++) {
                if(number1[j]<number1[j+1]==true){
                    var temp = number1[j+1]
                    number1[j+1] = number1[j]
                    number1[j] = temp
                }
            }
        }
        for(var t=0;t<hkBr.length;t++){
            if(number1[0].toString() == new Date(hkBr[t].date_created) ){
                console.log("ok")
                return hkBr[t]
            }else {
            }
        }
        return  hkBr[t]
    }


    //申请MID请求
    async applicationMID($,str){
        console.log("查看str",str)
        var res = axios($,{
            timeout: 5000,
            method: "get",
            url: 'https://intlmapi.alipay.com/gateway.do?' + str,
            headers: {
                "content-type": "application/json",
            },
            json: true,
        });
        return res

    }
    //存储MID
    async writeonbordInfo($,businessInfo){
        var successMID =  await axios($,{
            method:"post",
            url:"https://wonder_registry.bindolabs.com/items/merchant_ids",
            headers:{authorization:"Bearer input_in"},
            body:{
                "MID": businessInfo.data.id,
                "payment_acquirer": "b5b150a0-4665-41fc-ba51-7d64470c37dc",
                "business": businessInfo.data.id

            },
        });
        return successMID



    }


}
export default defineComponent({
    async run({steps, $}) {
        var task = new ApplicationAlipay();
        var event =  steps.trigger.event.body
        console.log(event)
        var key= event.key
        console.log("key",key)
        let res = await task.runTask($,key);
        //console.log(res.data[0]['encrypt_certificate'])
    }
})

import {axios} from "@pipedream/platform"



const DOMAIN = 'https://wonder_registry.bindolabs.com';

const FILED_MAPPING = {
    // "business_name":"business_name",
    // "company":"business_email",
    // "fee_group":"phone",
    "fee_group" :"address1",
    "business_name" : "address2",
    "omnichannel" :"city",
    "updated_by_id":"country_code",
    "business_phone": "full_address",
    "company": "phone",
    "sales_marketing_campaign": "state",
    "status": "title",
    "todos":"user_id",
    "updated_at":"zipcode",
};

class UploadStoreId {

    async runTask($,event) {
        //获取businesse

        const businesse = await this.getBusinesse($,event);
        console.log(businesse)
        if(!businesse || businesse.length < 1) {
            console.log("no any new companies need to process,just exit task.");
            return;
        }

        console.log("看看长度的")
        console.log(businesse.length)
        const changeStore = this.generateStore(businesse);









        const StoreId = await this.postBindo($,changeStore);
        console.log(StoreId)
        console.log("++++++")
        await this.insertStoreId($,StoreId,event);


        // console.log("finsihed task.");
        // return true;
    }

    async getBusinesse($,event) {
        var ids=event;

        var resp = await axios($, {
            method: 'get',  //status
            url: DOMAIN  + '/items/businesses/'+ids,
        });
        return resp["data"] || [];
    }

    async postBindo($,changeStore) {
        console.log("changeStore+++++++")
        console.log(changeStore)
        const storeInfo={
            "store":changeStore,
        }
        console.log("storeInfo++++++++++aass",storeInfo)
        var resp = await axios($,{
            method: 'post',
            url: 'https://main-stg.bindo.co/api/v2/stores',
            headers: {
                "content-type": "application/json",
                "X-User-Access-Token": "idisfthnp710rjgsbgok9bcua7gbfb2",
            },
            data:storeInfo,

        });
        console.log(resp,"bindo 返回 store")
        return resp.store.id;
    }


    generateStore(data) {
        // console.log("data++")
        // console.log(data)
        // const apiKeys = Object.keys(data[0]);
        console.log("in generateStore Data__",data)
        const storetest = {
            "address1":data.business_name,
            "address2":"ww",
            "calling_code":data.company,
            "city":"ss",//
            "country_code":"CN",
            "full_address":data.settlement_entity_type,
            "phone":"186768777676",
            "state":"",
            "title":"Pipedream test" + (Date.now()),//
            "user_id":"1234567899",
            "zipcode":"",
            "lat":"64.78378",
            "lng":"54.78378",
        }






        return storetest

    }







    async  insertStoreId($,storeid,ids) {

        console.log("用户id",ids)
        console.log("进入")
        var idss=ids.toString();
        console.log("转换ids++++",idss)
        //var ids='0e8c6790-fda2-4801-8e5c-258e755de980'
        console.log("修改ref_id",storeid)
        console.log("storeid type++++")
        console.log(typeof storeid)

        var resp = await axios($,{
            method: 'patch',
            url:'https://wonder_registry.bindolabs.com/items/businesses/'+idss,
            data:{
                "ref_id":storeid,
            },
        });
        console.log(resp,"返回 ref")
    }

}


export default {


    async run({steps, $}) {
        const event = steps.trigger.event.keys
        console.log("webhook",event)

        var task = new UploadStoreId();
        await task.runTask($,event);


    }
}



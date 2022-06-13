import {axios} from "@pipedream/platform"

class MerchantProfileSyncer {

    async runTask($,event) {
        console.log("判断")
        console.log(event)

        //it's from bindo
        if(typeof event['platform'] !== 'undefined' && event['platform'] == 'bindo-cdc') {
            await this.startBindoToDirectus($,event);
        }else{
            await this.startDirectusToBindo($,event);
        }
    }

    // 将Directus 对象转换成Bindo的
    convertDirectusToBindo(data) {
        console.log("将Directus 对象转换成Bindo的",data)

        const store = {
            "address1":"data.business_name",
            "address2":"ww",
            "calling_code":"data.company",
            "city":"ss",//
            "country_code":"CN",
            "full_address":"data.business_phone",
            "phone":"data.business_phone",
            "state":"",
            "title":(Date.now()),//
            "user_id":"1234567899",
            "zipcode":"",
            "lat":"64.78378",
            "lng":"54.78378",
            "id":data.ref_id,
        }

        const storeinfo={
            "store":store
        }
        return storeinfo
    }

    convertBindoToDirectus(tobusiness) {
        var store=tobusiness
        console.log("转换BindoToDirectus前查看参数++++",store)
        const  business = {

            "business_name":"store1",
            "partner_channel":"d315d99c-fd35-4a81-b27d-8f1d0d01f991",
            "fee_group":12,
            "merchant_category":109,
            "omnichannel":"Offline",
            "ref_id":tobusiness.id,
            "sales_marketing_campaign":2,
            "settlement_entity_type":"Individual2 Operating Entity"

        }


        return business


    }


    async startDirectusToBindo($,event) {
        // 获取action
        //console.log(event.payload)
        const action = event.event
        const business_id = event.key

        console.log("打印keys________",business_id)
        console.log("打印action________",action)
        //const action ='items.insert'
        //const business = event.payload
        //console.log("打印 wonder创建的 ++++business",business)
        //开始获取business

        const business  =  await this.getBusinesse($,business_id)
        console.log("step1,获取business++++",business)
        //1 如果从wonder中更新。才会产生keys
        // const id =event.keys
        // console.log("获取wonder ++",id)
        // if ( typeof event.keys !=='undefined'){
        //
        //     console.log("打印buseiness-----",business)
        // }else{
        //     var business  = event.data
        //     console.log("打印buseiness+++++",business)
        // }
        //获取busuiness  从event中获取


        const store = this.convertDirectusToBindo(business);

        console.log("转换完成store+++",store)
        switch(action) {
            case "items.create":
                if(business.ref_id==null){
                    //如果business不存在或为空则表示在directus创建，需要在bindo去创建，如果存在则表示在bindo创建完成的
                    const remoteStore = await this.createStoreToBindo($,store);
                    //查看是否创建成功
                    console.log("查看是否创建成功",remoteStore)
                    // const updateData = {
                    //     //"business_id" : business["id"],
                    //     //"ref_id" : remoteStore["id"]
                    // };
                }else{
                    break;
                }
                console.log("打印store.ref_id,查看是否存在。。",store.ref_id)
             if(typeof store.ref_id=='undefined'||store.ref_id==null){
                 console.log("更新business_ref_id-----",store.ref_id)
             const ret = await this.updateBusinessToDirectus($,business,remoteStore);
             //console.log("更新directus ref_id=store_id",ret)

             }
             break;

            case "items.update":
             await this.updateStoreToBindo($,business["ref_id"],store);
        }
    }


    //这一步的数据 从webhokk触发获取 本身就是directus的格式
    async startBindoToDirectus($,event) {







        const business = this.convertBindoToDirectus(event.data);

        console.log("转换businessToDirectus",business)
        const action = event.action
        // const action = "update"

        switch(action) {
            case "insert" :
                const remoteBusiness = await this.getBusinessFromDirectusWithRefID($,business);
                if(remoteBusiness.length <= 1) {
                    console.log("不存在则创建++++++")
                    const ref=await this.createBusinessToDirectus($,business);
                    console.log("创建成功++++++",ref)
                    return;
                }
                break;
            case "update":
                await this.updateBusinessToDirectus($,business["ref_id"],business);
                break;
        }
    }

    async getBusinessFromDirectusWithRefID($,business) {
        console.log("获取business",business)
        console.log("根据ref_id查询",business["ref_id"])
        var ids=business["ref_id"]
        var resp = await axios($,{
            method: 'get',
            url: 'https://wonder_registry.bindolabs.com/items/businesses/?filter[ref_id][_eq] ='+ids,

        });
        console.log("根据business-ref_id查询是否存在business？",resp)
        if(resp.data.length < 1) {
            return null;
        }
        return resp.data[0];

    }
    async getBusinesse($,id) {
        console.log(id)

        var ids=id.toString();
        console.log("转换",ids)

        var resp = await axios($,{
            method: 'get',  //status
            url: 'https://wonder_registry.bindolabs.com/items/businesses/'+ids,
        });
        console.log("获取getbusinesse的数据",resp)
        return resp["data"] || [];
    }

    async createStoreToBindo($,store) {

        console.log("创建storeInfo++++++++++aass",store)
        var resp = await axios($,{
            method: 'post',
            url: 'https://main-stg.bindo.co/api/v2/stores',
            headers: {
                "content-type": "application/json",
                "X-User-Access-Token": "cc06y44buzizplkulmik1ab9xatajjb",
            },
            data:store,

        });
        console.log(resp,"bindo 返回 store")
        return resp.store;


    }

    async createBusinessToDirectus($,toDirectusdata) {
        console.log(JSON.stringify(toDirectusdata))
        var resp = await axios($,{
            method: 'post',
            url:'https://wonder_registry.bindolabs.com/items/businesses',
            data:toDirectusdata,
        });
        console.log("bindo的数据-创建business插入directus",resp)
    }





    async updateBusinessToDirectus($,business,store) {

        console.log("businessid",business)
        console.log("进入",store)
        var ids=business['id'].toString();
        console.log("转换ids++++",ids)
        //var ids='0e8c6790-fda2-4801-8e5c-258e755de980'
        // console.log("修改ref_id",storeid)
        // console.log("storeid type++++")
        // console.log(typeof storeid)

        var resp = await axios($,{
            method: 'patch',
            url:'https://wonder_registry.bindolabs.com/items/businesses/'+ids,
            data:{"ref_id":store.id},
        });
        console.log(" toDirectus更新返回 ref",resp)
    }





    //directus中更新操作 根据ref_id 去updata bindo-Store
    async updateStoreToBindo($,id,store) {
        console.log("更新updateStoreToBindo+++",id,store)
        //根据keys 去寻找到更新的
        var resp = await axios($,{
            method: 'put',
            url: 'https://main-stg.bindo.co/api/v2/stores/'+id,  //更新bindo的url
            headers: {
                "content-type": "application/json",
                "X-User-Access-Token": "cc06y44buzizplkulmik1ab9xatajjb",
            },
            data:store,

        });
        console.log("resp 更新bindo返回",resp)
        return  resp


    }



}

export default {


    async run({steps, $}) {
        const event = steps.trigger.event
        console.log("webhook")
        console.log(event)

        var task = new MerchantProfileSyncer();
        await task.runTask($,event);


    }
}



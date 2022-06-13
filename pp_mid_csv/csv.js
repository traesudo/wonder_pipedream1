import {axios} from "@pipedream/platform"
import fs from "fs"
import Client from 'ssh2-sftp-client'


const DOMAIN = 'https://wonder_registry.bindolabs.com';
const SFTP_BASIC_DIR = "/home/sftp/";
//const fields=['acquirer_id','acquirer_name','address','address2','agent_id','agent_name','alipay_mid','american_express_mid','backend_mid','bank_id','bank_name','city','corporate_business_name','corporate_url','country','cup_mid','cup_mid','date_created','date_updated','daylight_savings_observed','dba_name','default_final_authorization_indicator','dfi_routing_number','diners_mid:','eci_indicator','email','end_date','fax','foreign_product_type','gateway_id','gateway_name','gmt_offset','id','interac_mid','iso_id','jcb_mid','last_modified','level','maestro_mid','master_card_mid','mcc','merchant_status','mid','name','opt_in_logic','parent_id','phone','process_type','processor_id','processor_mame','processor_name','sales_id','settlement_currency','settlement_currency_code','start_date','state','statement_email','status','status_code','tax_id','timezone','type','type_code','user_created','user_updated','var_id','var_name','visa_mid','wechat_mid','zip']
//http://wonder_registry.bindolabs.com/admin/content/PP_importing_Mids

const FILED_MAPPING = {
    // "api_field_name" : "csv_field_name",
// "id": "CSVid",
//"status": "CSVstatus",
//": "CSVsort",
//"user_created": "CSVuser_created",
//"date_created": "CSVdate_created",
//"user_updated": "CSVuser_updated",
//"date_updated": "CSVdate_updated",
    "#Action_Code": "CSV#Action_Code",
    "Merchant_Clone_MID": "CSVMerchant_Clone_MID",
    "Merchant_Legal_Name": "CSVMerchant_Legal_Name",
    "Merchant_DBA_Name": "CSVMerchant_DBA_Name",
    "Merchant Steert Address(address 1)":"CSVMerchant Steert Address(address 1)",
    "Merchant Steert Address(address 2)":"CSVMerchant Steert Address(address 2)",
    "Merchant_City": "CSVMerchant_City",
    "Merchant_State/Province": "CSVMerchant_State/Province",
    "Merchant_Country_Code": "CSVMerchant_Country_Code",
    "Merchant_Zip": "CSVMerchant_Zip",
    "Merchant_Phone": "CSVMerchant_Phone",
    "Merchant_Currency": "CSVMerchant_Currency",
    "Customer_Service_Phone": "CSVCustomer_Service_Phone",
    "Chargeback_Statement_Email_Address": "CSVChargeback_Statement_Email_Address",
    "Email": "CSVEmail",
    "Primary_Phone_Is_SmsCapable": "CSVPrimary_Phone_Is_SmsCapable",
    "Merchant/Corporate_URL": "CSVMerchant/Corporate_URL",
    "Alternative_Authorization_Mode": "CSVAlternative_Authorization_Mode",
    "Alternative_Authorization_Currency_Code": "CSVAlternative_Authorization_Currency_Code",
    "TimeZone_ID": "CSVTimeZone_ID",
    "Merchant_ID_#": "CSVMerchant_ID_#",
    "Planet_Payment_MID": "CSVPlanet_Payment_MID",
    "Amex_Mid": "CSVAmex_Mid",
    "JCB_Mid": "CSVJCB_Mid",
    "Diners_Mid": "CSVDiners_Mid",
    "CUP_MID": "CSVCUP_MID",
    "Backend_Mid": "CSVBackend_Mid",
    "MCC": "CSVMCC",
    "Process_Type": "CSVProcess_Type",
    "Merchant_Fed_Tax_Id_or_Business_number": "CSVMerchant_Fed_Tax_Id_or_Business_number",
    "Report_Directory_Name": "CSVReport_Directory_Name",
    "Report_File_Prefix": "CSVReport_File_Prefix",
    "Chain_MID": "CSVChain_MID",
    "Mweb_User_ID": "CSVMweb_User_ID",
    "Contact_First_Name": "CSVContact_First_Name",
    "Contact_Last_Name": "CSVContact_Last_Name",
    "Contact_Phone_Number": "CSVContact_Phone_Number",
    "Contact_Email_address": "CSVContact_Email_address",
    "Role": "CSVRole",
    "Enable_Visa_Debit_Bin_Ranges": "CSVEnable_Visa_Debit_Bin_Ranges",
    "Business_Type": "CSVBusiness_Type",
    "Sales_ID": "CSVSales_ID",
    "Store_Number": "CSVStore_Number",
    "Auto_Batch_Cutoff_Time": "CSVAuto_Batch_Cutoff_Time",
    "Visa_Terminal_Capability": "CSVVisa_Terminal_Capability",
    "MC_Terminal_Capability": "CSVMC_Terminal_Capability",
    "Product_Types_Supported": "CSVProduct_Types_Supported",
    "PYC-MCP_Markup_Method": "CSVPYC-MCP_Markup_Method",
    "CardTypes-1": "CSVCardTypes-1",
    "Currencies-1": "CSVCurrencies-1",
    "CardTypes-2": "CSVCardTypes-2",
    "Currencies-2": "CSVCurrencies-2",
    "Merchant_Funding_Bank_Name": "CSVMerchant_Funding_Bank_Name",
    "Merchant_Bank_Account_Number_FUNDING": "CSVMerchant_Bank_Account_Number_FUNDING",
    "Merchant Bank Routing Number - FUNDING char (9)":"CSVMerchant Bank Routing Number - FUNDING char (9)",
    "Funding_Info_Template": "CSVFunding_Info_Template",
    "Fee_Info_Template_": "CSVFee_Info_Template_",
    "Merchant_Revenue_Sharing_Info_Template": "CSVMerchant_Revenue_Sharing_Info_Template",
    "Acquirer_Revenue_Sharing_Info_Template": "CSVAcquirer_Revenue_Sharing_Info_Template",
    "Agent_Bank_Revenue_Sharing_Info_Template": "CSVAgent_Bank_Revenue_Sharing_Info_Template",
    "Gateway_Revenue_Sharing_Info_Template": "CSVGateway_Revenue_Sharing_Info_Template",
    "Risk_Template": "CSVRisk_Template",
    "MasterCard_MID": "CSVMasterCard_MID",
    "Discover_MID": "CSVDiscover_MID",
    "Interac_MID": "CSVInterac_MID",
    "Maestro_MID": "CSVMaestro_MID",
    "Visa_MID": "CSVVisa_MID",
    "Visa_ATM_Mid":"CSVVisa_ATM_Mid",
    "Is_Split_Visa/MasterCard_MID": "CSVIs_Split_Visa/MasterCard_MID",
    "Merchant_Funding_Account_Type": "CSVMerchant_Funding_Account_Type",
    "Autobatch_Close_Time_Zone_ID": "CSVAutobatch_Close_Time_Zone_ID",
    "Mastercard_Assigned_ID": "CSVMastercard_Assigned_ID",
    "Allow_Surcharge_on_International_Transactions": "CSVAllow_Surcharge_on_International_Transactions",
    "Agent_Bank_Name": "CSVAgent_Bank_Name",
    "Sales_Agent_Name": "CSVSales_Agent_Name",
    "Gateway_Name": "CSVGateway_Name",
    "VAR_Name": "CSVVAR_Name",
    "Funding_Frequency": "CSVFunding_Frequency",
    "Funding_Day_1": "CSVFunding_Day_1",
    "Funding_Day_2": "CSVFunding_Day_2",
    "Funding_Day_3": "CSVFunding_Day_3",
    "PreSettlementFunding": "CSVPreSettlementFunding",
    "DelayChargebackFunding": "CSVDelayChargebackFunding",
    "Enable_Funding": "CSVEnable_Funding",
    "Enable_Fees": "CSVEnable_Fees",
    "ISO_ID": "CSVISO_ID",
    "Revenue_Frequency": "CSVRevenue_Frequency",
    "Revenue_Day_": "CSVRevenue_Day_",
    "Is_Fixed_Revenue_Share": "CSVIs_Fixed_Revenue_Share",
    "Revenue_Method": "CSVRevenue_Method",
    "Fixed_Basis_Points_RevenueShare": "CSVFixed_Basis_Points_RevenueShare",
    "Variable_Percent_Revenue_Share": "CSVVariable_Percent_Revenue_Share",
    "Late_Presentment_Fx_Gain_Percent": "CSVLate_Presentment_Fx_Gain_Percent",
    "Late_Presentment_Fx_Loss_Percent": "CSVLate_Presentment_Fx_Loss_Percent",
    "Settlement_Fx_Gain_Percent": "CSVSettlement_Fx_Gain_Percent",
    "Settlement_Fx_Loss_Percent": "CSVSettlement_Fx_Loss_Percent",
    "Chargeback_Fx_Gain_Percent": "CSVChargeback_Fx_Gain_Percent",
    "Chargeback_Fx_Loss_Percent": "CSVChargeback_Fx_Loss_Percent",
    "Representment_FX_Gain_Percent": "CSVRepresentment_FX_Gain_Percent",
    "Representment_FX_Loss_Percent": "CSVRepresentment_FX_Loss_Percent",
    "Interchange_Differential_Gain_Percent": "CSVInterchange_Differential_Gain_Percent",
    "Interchange_Differential_Loss_Percent": "CSVInterchange_Differential_Loss_Percent",
    "Refund_Markup_Method": "CSVRefund_Markup_Method",
    "Reserved_for_Future_Development_1": "CSVReserved_for_Future_Development_1",
    "Ignore_Fx_Gains_And_Losses": "CSVIgnore_Fx_Gains_And_Losses",
    "Merchant_Bank_Account_Number_Fees": "CSVMerchant_Bank_Account_Number_Fees",
    "Merchant_Bank_Routing_Number_Fees": "CSVMerchant_Bank_Routing_Number_Fees",
    "Reserved_for_future_development_2": "CSVReserved_for_future_development_2",
    "Reserved_for_future_development_3": "CSVReserved_for_future_development_3",
    "Exception_Check_Period": "CSVException_Check_Period",
    "Maximum_Txn_Amount": "CSVMaximum_Txn_Amount",
    "Max_Transaction_Age": "CSVMax_Transaction_Age",
    "Hold_Matching_Txns": "CSVHold_Matching_Txns",
    "Refund_Allowed_Flag": "CSVRefund_Allowed_Flag",
    "Projected_Average_Ticket_Amt": "CSVProjected_Average_Ticket_Amt",
    "Projected_Sales_Amount": "CSVProjected_Sales_Amount",
    "Projected_Sales_Count": "CSVProjected_Sales_Count",
    "Projected_Refund_Amount": "CSVProjected_Refund_Amount",
    "Project_Refund_Count": "CSVProject_Refund_Count",
    "Refund_To_Sales_Ratio": "CSVRefund_To_Sales_Ratio",
    "Chargeback_Count_Percent": "CSVChargeback_Count_Percent",
    "Chargeback_Amount_percent": "CSVChargeback_Amount_percent",
    "Retrieval_Count_Percent": "CSVRetrieval_Count_Percent",
    "Retrieval_Amount_Percent": "CSVRetrieval_Amount_Percent",
    "Projected_Key_Entered_Percent": "CSVProjected_Key_Entered_Percent",
    "Alerts_Emails": "CSVAlerts_Emails",
    "Reserved_for_future_development_4": "CSVReserved_for_future_development_4",
    "Maximum_Refund_Transaction_Amount": "CSVMaximum_Refund_Transaction_Amount",
    "Fee_Billing_Frequency": "CSVFee_Billing_Frequency",
    "Fee_Billing_Day": "CSVFee_Billing_Day",
    "Discount_Fee_Method": "CSVDiscount_Fee_Method",
    "Fee_Currency": "CSVFee_Currency",
    "Visa_Discount_Fee_Percent": "CSVVisa_Discount_Fee_Percent",
    "MC_Discount_Fee_Percent": "CSVMC_Discount_Fee_Percent",
    "Amex_Discount_Fee_Percent": "CSVAmex_Discount_Fee_Percent",
    "Diners_Discount_Fee_Percent": "CSVDiners_Discount_Fee_Percent",
    "Discover_Discount_Fee_Percent": "CSVDiscover_Discount_Fee_Percent",
    "JCB_Discount_Fee_Percent": "CSVJCB_Discount_Fee_Percent",
    "CUP_Discount_Fee_Percent": "CSVCUP_Discount_Fee_Percent",
    "Interac_Discount_Fee_Percent": "CSVInterac_Discount_Fee_Percent",
    "Maestro_Discount_Fee_Percent": "CSVMaestro_Discount_Fee_Percent",
    "Visa_Per_Item_Transaction_Fee": "CSVVisa_Per_Item_Transaction_Fee",
    "Mastercard_Per_Item_Transaction_Fee": "CSVMastercard_Per_Item_Transaction_Fee",
    "Amex_Per_Item_Transaction_Fee": "CSVAmex_Per_Item_Transaction_Fee",
    "Diners_Per_Item_Transaction_Fee": "CSVDiners_Per_Item_Transaction_Fee",
    "Discover_Per_Item_Transaction_Fee": "CSVDiscover_Per_Item_Transaction_Fee",
    "JCB_Per_Item_Transaction_Fee": "CSVJCB_Per_Item_Transaction_Fee",
    "Interac_Per_Item_Transaction_Fee": "CSVInterac_Per_Item_Transaction_Fee",
    "Maestro_Per_Item_Transaction_Fee": "CSVMaestro_Per_Item_Transaction_Fee",
    "Debit_Per_item_Transaction_Fee": "CSVDebit_Per_item_Transaction_Fee",
    "Visa_Per_Item_Authorization_Fee": "CSVVisa_Per_Item_Authorization_Fee",
    "MC_Per_Item_Authorization_Fee": "CSVMC_Per_Item_Authorization_Fee",
    "Amex_Per_Item_Authorization_Fee": "CSVAmex_Per_Item_Authorization_Fee",
    "Diners_Per_item_Authorization_Fee": "CSVDiners_Per_item_Authorization_Fee",
    "Discover_Per_Item_Authorization_Fee": "CSVDiscover_Per_Item_Authorization_Fee",
    "JCB_Per_Item_Authorization_Fee": "CSVJCB_Per_Item_Authorization_Fee",
    "Interac_Per_Item_Authorization_Fee": "CSVInterac_Per_Item_Authorization_Fee",
    "Maestro_Per_Item_Authorization_Fee": "CSVMaestro_Per_Item_Authorization_Fee",
    "Debit_Per_Item_Authorization_Fee": "CSVDebit_Per_Item_Authorization_Fee",
    "Authorization_Reversal_Fee": "CSVAuthorization_Reversal_Fee",
    "Authorization_Decline_Fee": "CSVAuthorization_Decline_Fee",
    "Visa_AVS_Transaction_Fee": "CSVVisa_AVS_Transaction_Fee",
    "MC_AVS_Transaction_Fee": "CSVMC_AVS_Transaction_Fee",
    "AVS_Only_Fee": "CSVAVS_Only_Fee",
    "Gateway_Per_Item_Fee": "CSVGateway_Per_Item_Fee",
    "Chargeback_Fee": "CSVChargeback_Fee",
    "Retrieval_Fee": "CSVRetrieval_Fee",
    "Batch_Fee": "CSVBatch_Fee",
    "Web_Fee": "CSVWeb_Fee",
    "Web_Plus_Fee": "CSVWeb_Plus_Fee",
    "Service_Fee": "CSVService_Fee",
    "Gateway_MonthlyFee": "CSVGateway_MonthlyFee",
    "Setup_Fee": "CSVSetup_Fee",
    "Monthly_Statement_Fee": "CSVMonthly_Statement_Fee",
    "Monthly_Fee": "CSVMonthly_Fee",
    "Recurring_Billing_Monthly_Fee": "CSVRecurring_Billing_Monthly_Fee",
    "Virtual_Terminal_Monthly_Fee": "CSVVirtual_Terminal_Monthly_Fee",
    "Annual_Fee": "CSVAnnual_Fee",
    "Monthly_Minimum_Fee": "CSVMonthly_Minimum_Fee",
    "Interchange_Pass_Thru_Indicator": "CSVInterchange_Pass_Thru_Indicator",
    "Visa_Planned_Interchange_Fee_Program_Indicator": "CSVVisa_Planned_Interchange_Fee_Program_Indicator",
    "MC_Planned_Interchange_Fee_Program_Indicator": "CSVMC_Planned_Interchange_Fee_Program_Indicator",
    "Visa_Qual_Tier_Id": "CSVVisa_Qual_Tier_Id",
    "MC_Qual_Tier_Id": "CSVMC_Qual_Tier_Id",
    "Visa_Mid_Qual_Tier_Id": "CSVVisa_Mid_Qual_Tier_Id",
    "MC_Mid_Qual_Tier_Id": "CSVMC_Mid_Qual_Tier_Id",
    "Non_Qual_Billing_Method": "CSVNon_Qual_Billing_Method",
    "Non_Qual_Per_Item_Fee": "CSVNon_Qual_Per_Item_Fee",
    "Non_Qual_Fee_Percent": "CSVNon_Qual_Fee_Percent",
    "MidQual_Per_Item_Fee": "CSVMidQual_Per_Item_Fee",
    "MidQual_Fee_Percent": "CSVMidQual_Fee_Percent",
    "Terminal_Maintenance_Monthly_Fee": "CSVTerminal_Maintenance_Monthly_Fee",
    "Admin_and_Push_Fund_Monthly_Fee": "CSVAdmin_and_Push_Fund_Monthly_Fee",
    "Amex_Connectivity_Monthly_Fee": "CSVAmex_Connectivity_Monthly_Fee",
    "Wireless_Monthly_Fee": "CSVWireless_Monthly_Fee",
    "Food_Voucher_Discount_Rate": "CSVFood_Voucher_Discount_Rate",
    "Food_Voucher_Per_Item_Transaction_Fee": "CSVFood_Voucher_Per_Item_Transaction_Fee",
    "Cirrus_MID": "CSVCirrus_MID",
    "Visa_ATM_Mid": "CSVVisa_ATM_Mid",
    "Food_Voucher_MID": "CSVFood_Voucher_MID",
    "Transfer_Mobile_Payment_MID": "CSVTransfer_Mobile_Payment_MID",
    "Transfer_Cash_In/Cash_Out_Descount_Fee_Percent": "CSVTransfer_Cash_In/Cash_Out_Descount_Fee_Percent",
    "Transfer_Mobile_Payment_Discount_Fee_Percent": "CSVTransfer_Mobile_Payment_Discount_Fee_Percent",
    "Food_Voucher_Card_MID_Edenred": "CSVFood_Voucher_Card_MID_Edenred",
    "Food_Voucher_Discount_Fee_Percent_Edenred": "CSVFood_Voucher_Discount_Fee_Percent_Edenred",
    "Aggregator_Name": "CSVAggregator_Name",
    "Seller_Account_ID": "CSVSeller_Account_ID",
    "PaymentfacilitatorID": "CSVPaymentfacilitatorID",
    "SubMerchantID": "CSVSubMerchantID",
    "SellerBusinessName": "CSVSellerBusinessName",
    "Reserved_for_future_development_5": "CSVReserved_for_future_development_5",
    "Reserved_for_future_development_6": "CSVReserved_for_future_development_6",
    "Terminal_Id_1": "CSVTerminal_Id_1",
    "Terminal_Name_1": "CSVTerminal_Name_1",
    "Terminal_Chain_Name_1": "CSVTerminal_Chain_Name_1",
    "Terminal_Id_2": "CSVTerminal_Id_2",
    "Terminal_Name_2": "CSVTerminal_Name_2",
    "Terminal_Chain_Name_2": "CSVTerminal_Chain_Name_2",
    "Terminal_Id_3": "CSVTerminal_Id_3",
    "Terminal_Name_3": "CSVTerminal_Name_3",
    "Terminal_Chain_Name_3": "CSVTerminal_Chain_Name_3",
    "Visa_Payment_Facilitator_ID": "CSVVisa_Payment_Facilitator_ID",
    "Visa_Sub_Merchant_ID": "CSVVisa_Sub_Merchant_ID",
    "Visa_ISO_ID": "CSVVisa_ISO_ID",
    "Product_Profile_Name": "CSVProduct_Profile_Name",
    "Priority_Checkout_Indicator": "CSVPriority_Checkout_Indicator",
    "Fee_Profile_Name": "CSVFee_Profile_Name",
//"Visa_Terminal_Capability_": "CSVVisa_Terminal_Capability_",
    "Loyalty_Card_MID":"CSVLoyalty_Card_MID",
    "Transfer_Cash_In/Cash_Out_MID":"CSVTransfer_Cash_In/Cash_Out_MID",
    "Payment_Profile_Name":"CSVPayment Profile Name"

};

class UploadCompanyInfoTask {

    async runTask($) {
        //step1: 获取需要上传的信息列表
        const companies = await this.getCompaniesWithStatus($,"draft");
        console.log(companies)
        if(!companies || companies.length < 1) {
            console.log("no any new companies need to process,just exit task.");
            return;
        }

        //step2: 生成本地csv文件
        const csvFilePath = this.generateCSV(companies);
        const remoteFilePath = this.generateRemoteFilePath();
        console.log(remoteFilePath)



        //step3: 上传文件到sftp
        const uploadStatus = await this.uploadCSVToSFTP(csvFilePath,remoteFilePath);


        //step4: 更新远程上传状态
        let newStatus = "upload_failed";
        console.log(uploadStatus);
        if(uploadStatus) {
            newStatus = "upload_success";
            //如果上传成功则更新为成功
        }
        console.log("starting update status to " + newStatus);
        for(var i=0;i < companies.length;i++) { //companies.length
            await this.updateCompanyStatus($,companies[i]["id"],newStatus);
        }

        console.log("finsihed task.");
        return true;
    }

    async getCompaniesWithStatus($,status) {
        console.log(status)
        var resp = await axios($, {
            method: 'get',  //status
            url: DOMAIN  + '/items/PP_importing_Mids/?filter[status][_eq] ='+status, //todo, 使用status 过滤
        });
        return resp["data"] || [];
    }

    async updateCompanyStatus($,id) {

        console.log("传入的id")
        console.log(id)

        await axios($,{
            method: 'PATCH',  //status
            headers:{
                'Content-Type': 'application/json'
            },
            url: DOMAIN  + '/items/PP_importing_Mids/'+ids,
            data:{
                "status":"upload_success"
            }
        });

    }


    generateCSV(data) {
        console.log(data)
        const apiKeys = Object.keys(data[0]);
        // console.log(apiKeys)
        // apiKeys.splice(4,0,"Merchant Steert Address(address 1)")
        // apiKeys.splice(5,0,"Merchant Steert Address(address 2)")
        // apiKeys.splice(54,0,"Merchant Bank Routing Number - FUNDING char (9)")

        // let keys = [];
        // console.log(apiKeys)

        let usedAPIKeys = [];
        for (var h in FILED_MAPPING){
            usedAPIKeys.push(h)
        }
        // for(var k in apiKeys) {
        //   // console.log(k)
        //     //apiKeys.length
        //         //console.log(apiKeys[j])
        //           if(FILED_MAPPING[apiKeys[k]]) {
        //             //console.log("ok")
        //         keys.push(FILED_MAPPING[apiKeys[k]]);
        //         usedAPIKeys.push(apiKeys[k]);
        //         // console.log(usedAPIKeys)

        //     }

        // }
        usedAPIKeys.splice(4,0,"Merchant Steert Address(address 1)")
        usedAPIKeys.splice(5,0,"Merchant Steert Address(address 2)")
        usedAPIKeys.splice(54,0,"Merchant Bank Routing Number - FUNDING char (9)")
        usedAPIKeys[225]="Priority Checkout Indicator"
        usedAPIKeys[226]="Product Profile Name"
        console.log(usedAPIKeys)
        // const values = [usedAPIKeys.join(",")];
        const values = [];

        for(let i=0;i < data.length;i++) {
            var val = [];
            for(var index in usedAPIKeys) {
                // console.log(index)
                val.push(data[0][usedAPIKeys[index]]);
            }
            // console.log("错误字段")
            // console.log(data[2][usedAPIKeys['CSVMerchant_Zip']])
            //console.log(val[3][4])
            values.push(val.join(","));
        }

        // values[0].splice(4,0,"Merchant Steert Address(address 1)")
        // values[0].splice(5,0,"Merchant Steert Address(address 2)")
        // values[0].splice(54,0,"Merchant Bank Routing Number - FUNDING char (9)")
        const csvContent = values.join("\n");
        console.log(csvContent)
        const tempFilePath = this.generateLocalCSVFilePath();
        fs.writeFileSync(tempFilePath,csvContent);
        //console.log(csvContent)
        return tempFilePath;
    }

    async uploadCSVToSFTP(localPath,remotePath) {
        console.log(localPath,remotePath);
        const  sftp = new Client();
        const  config= {
            host: "35.194.178.145",
            port: 22,
            username: "sftp",
            password: "upload",
        };
        await sftp.connect(config);
        return await sftp.put(localPath,SFTP_BASIC_DIR + remotePath,{autoClose:true});
    }


    generateLocalCSVFilePath() {
        //随机生成一个文件名，用随机函数
        return "/tmp/tmp.csv";
    }

    generateRemoteFilePath() {
        var myDate = new Date()

        var yy=myDate.getFullYear(); //获取完整的年份(4位,1970-????)
        var mm=myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
        var dd=myDate.getDate(); //获取当前日(1-31)
        //console.log(yy+"-"+mm+"-"+dd)
        //return "yy+"-"+mm+"-"+dd.csv";
        var remoteFilePath="MerchantBulkLoadV3_Bindo_"+yy+"-"+mm+"-"+dd+".csv"
        return remoteFilePath;
    }

}

//collection="pp_exported_mids"
export default {
    name: "PP MID Exchange",
    description: "upload pp mid to sftp server",
    //设置定时器
    props: {
        timer: {
            type: "$.interface.timer",
            default: {
                intervalSeconds: 15,
            },
        },
    },

//   dedupe: "unique",

    async run({steps, $}) {
        var task = new UploadCompanyInfoTask();
        await task.runTask($);


        //    function myFunc(arg) {


        //   setTimeout(myFunc, 1500, 'funky')
        //    //await task.updateCompanyStatus($,"123","failed");
        //    return;
        //    //await task.runTask($);
        // }
    }
}
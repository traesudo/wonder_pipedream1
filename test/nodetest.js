import { axios } from '@pipedream/platform'
import isEmpty from 'lodash.isempty'

/**
 * Object that represents Directus network endpoint
 *
 * @version 0.0.4
 * @author Eric Chan <eric.chan@bindo.com>
 */
export class Directus {
    constructor ($) {
        this.$ = $
        this.defaultConfig = {
            method: 'get',
            baseURL: process.env.WONDER_REGISTRY,
            timeout: 5000,
            headers: {
                Authorization: `Bearer ${process.env.directus_auth_token}`
            }
        }
    }

    /**
     * Access Item
     *
     * @param {string} name Collection name
     * @param {string} id Item Id
     * @param {AxiosRequest} config Axios config that override default axios config
     * @returns Item Data
     */
    async item (name, id, config) {
        return (await axios(this.$, { ...this.defaultConfig, ...config, url: `${this.defaultConfig.baseURL}/items/${name}/${id}` })).data
    }

    /**
     * Access File
     *
     * @param {string} id Asset Id
     * @param {AxiosRequest} config Axios config that override default axios config
     * @returns To be tested
     */
    async file (id, config) {
        return (await axios(this.$, { ...this.defaultConfig, ...config, url: `${this.defaultConfig.baseURL}/files/${id}` })).data
    }
}

/**
 * Check data if missing by supported type
 *
 * @param {string} payment MID application type. i.e. Alipay, WeChat Pay
 * @param {string} type Supported types in constructor.need. i.e. companies/businesses/hk_brs
 * @param {object} data Data object for checking missing_params
 * @returns object contain errors field and supported fields listed in AlipayMissingParams
 *
 * @version 0.0.1
 * @author Eric Chan <eric.chan@bindo.com>
 */
function check (payment, type, data) {
    const { errors, ...result } = type

    if (!Object.keys(result).includes(type)) {
        errors.push(`${type} not supported`)
    } else {
        Object.entries(payment).forEach(([supportType, needs]) => {
            if (supportType === type) {
                if (Object.keys(data).length === 0) {
                    errors.push(`${type} data is empty`)
                    return
                }

                Object.entries(data).forEach(
                    ([dataKey, dataValue]) => {
                        if (!needs.includes(dataKey) || isEmpty(dataValue)) {
                            errors.push(`${key} missing`)
                        }
                    }
                )
            }
        })
    }

    return {
        errors,
        missing_params: result
    }
}

/**
 * Object for represents Alipay MID application documents need
 *
 * @version 0.0.2
 * @author Eric Chan <eric.chan@bindo.com>
 * @author Trae Li <trae.li@bindo.com>
 */
export class AlipayNeed { }
AlipayNeed.online = {}
AlipayNeed.offline = {}

AlipayNeed.online.business_applications = [
    'natural_person_phone',
    'natural_person_email'
]
AlipayNeed.offline = AlipayNeed.online.business_applications.().push(
    'website_url'
)

AlipayNeed.online.companies = AlipayNeed.offline.companies = [
    'id',
    'name_of_business_corporation_english',
    'company_type',
    'business_address'
]

AlipayNeed.online.businesses = AlipayNeed.offline.businesses = [
    'id',
    'business_name'
]

AlipayNeed.online.hk_brs = AlipayNeed.offline.hk_brs = [
    'company_address',
    'br_number_with_check_digit'
]

export default defineComponent({
    name: 'Alipay Onboarding Check',
    description: '',
    key: 'alipay_onboarding_check',
    version: '0.0.1',
    type: 'action',
    props: {
        directus: {
            type: 'app',
            app: 'directus'
        }
    },
    async run ({ steps, $ }) {
        const directus = new Directus($)

        const items = []
        items.push(directus.item('business_applications', steps.key.$return_value?.key))

        if (items?.[0]) {
            items.push(directus.item('companies', items[0]?.application_company))
            items.push(directus.item('businesses', items[0]?.application_business))
        }

        if (items?.[1]) {
            const hk_brs = items?.[1]?.hk_brs
            const last_hk_br = hk_brs[hk_brs?.length - 1]
            items.push(directus.item('hk_brs', last_hk_br))
        }

        const checkeds = items.map((item) => check(AlipayNeed, collection, item))

        const body = Object.assign(
            {},
            ...checkeds
        )

        if (errors.length > 0) {
            $.respond({
                status: 400,
                body
            })

            $.flow.exit()
        }

        return body
    },
})

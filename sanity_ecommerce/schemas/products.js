const productVariant = {
    name: 'productVariant',
    title: 'Product Variant',
    type: 'object',
    fields: [
        {
            name: 'variantName',
            title: 'Variant Name',
            type: 'string',
            validation: Rule => Rule.required().error('Variant Name is required.')
        },
        {
            name: 'variantImages',
            title: 'Variant Images',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                hotspot: true,
            }
        }
    ],
    preview: {
        select: {
            title: 'variantName',
            media: 'variantImages.0.asset',
        },
    },
}

export default {
    name: 'products',
    title: 'Products',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: Rule => Rule.required().error('Product Name is required.')
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                hotspot: true,
            },
            validation: Rule => Rule.required().error('At least one image is required.')
        },
        {
            name: 'variantTitle',
            title: 'Variant Title (if necessary)',
            type: 'string'
        },
        {
            name: 'variants',
            title: 'Variants (if necessary)',
            type: 'array',
            of: [productVariant]
        },
        {
            name: 'showVariantImagesFirst',
            title: 'Show Variant Images First (if necessary)',
            type: 'boolean',
            description: 'Toggle ON to show variant images before product images. Toggle OFF to show product images first.',
            initialValue: false
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90,
            },
            validation: Rule => Rule.required().error('Slug is required.')
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: Rule => Rule.required().error('Price is required.')
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string',
            validation: Rule => Rule.required().error('Product Details are required.')
        },
        {
            name: 'productCategory',
            title: 'Product Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Earrings', value: 'earrings' },
                    { title: 'Resin', value: 'resin' },
                    { title: '3D Printed', value: '3d-printed' },
                    { title: 'Clay', value: 'clay' }
                ],
            },
            validation: Rule => Rule.required().error('Product Category is required.')
        },
        {
            name: 'isBestSeller',
            title: 'Is Best Seller',
            type: 'boolean',
            validation: Rule => Rule.required().error('Please specify if the product is a best seller.')
        }
    ]
}
